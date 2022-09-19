

import './TableApp.scss'
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'

import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import TableAppModel, { ITableAppProps } from './extensions/table-app-model'
import { SearchTableApp } from './extensions/SearchTableApp/SearchTableApp'
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator'
import PaginationProps from '../../lib/models/pagination-props'
import { getProp } from '../../lib/local-storage/service-storage'

export const TableApp = (props: ITableAppProps): JSX.Element => {
    const [selectedColumns, setSelectedColumns] = useState([])
    const initState = new TableAppModel().init(props, selectedColumns, setSelectedColumns)
    const paginationProps = new PaginationProps(Object.assign(initState.paginationProps, { tableName: props.id }))

    paginationProps.load()

    useEffect(() => {
        if (initState.hasColumnsExpander) {
            const savedColumns = getProp(`${props.id}_selectedColumns`)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            initState.resetColumns(savedColumns)
        }
    }, [])

    useEffect(() => {
        // handleChangePaginationProps()
    }, [selectedColumns, props.data])

    const contentTable = (props) => {
        !initState.hasPagination && (props.paginationTableProps.pagination = undefined)
        paginationProps.reset(props.paginationProps)
        paginationProps.save()

        return (
            <ToolkitProvider
                keyField={'id'}
                columns={initState.columns.filter((c) => !c.hidden)}
                data={initState.data}
                search
            >
                {(toolkitprops) => {
                    return (
                        <div>
                            {initState.hasSearch ? <SearchTableApp {...toolkitprops.searchProps} /> : null}
                            <BootstrapTable
                                keyField={'id'}
                                id={initState.id}
                                data={initState.data}
                                hover={initState.hover}
                                ref={initState.tableRef}
                                filter={initState.filter}
                                columns={initState.columns.filter((c) => !c.hidden)}
                                classes={initState.classes}
                                striped={initState.striped}
                                rowStyle={initState.rowStyle}
                                selectRow={initState.selectRow}
                                expandRow={initState.expandRow}
                                condensed={initState.condensed}
                                rowClasses={initState.rowClasses}
                                headerClasses={initState.headerClasses}
                                defaultSorted={initState.defaultSorted}
                                sort={initState.sort}
                                defaultSortDirection={initState.defaultSortDirection}
                                loading={initState.loading}
                                overlay={initState.overlay}
                                onTableChange={initState.onTableChange}
                                onSort={initState.onSort}
                                onFilter={initState.onFilter}
                                onExternalFilter={initState.onExternalFilter}
                                noDataIndication={initState.noDataIndication}
                                {...toolkitprops.baseProps}
                                {...props.paginationTableProps}
                            />
                        </div>
                    )
                }}
            </ToolkitProvider>
        )
    }

    return (
        <div className={'table-app'}>
            <PaginationProvider pagination={paginationFactory(paginationProps)}>{contentTable}</PaginationProvider>
        </div>
    )
}
