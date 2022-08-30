

import BootstrapTable, {
    ColumnDescription,
    ExpandRowProps,
    SelectRowProps,
    SortOrder,
} from 'react-bootstrap-table-next'
import React from 'react'
import { checkAndInsert } from '../../../lib/common'
import filterFactory, { FilterFactoryProps } from 'react-bootstrap-table2-filter'
import PaginationProps from '../../../lib/models/pagination-props'

interface IAttrs {
    'data-label'?: string
}

export interface IColumnDescription extends ColumnDescription {
    title?: boolean
    headerTitle?: boolean
    attrs?: IAttrs
}

export interface ITableAppProps {
    id: string
    data: any[]
    columns: IColumnDescription[]

    hover?: boolean
    striped?: boolean
    condensed?: boolean
    hasSearch?: boolean
    hasFilter?: boolean
    hasPagination?: boolean
    isFlexibleIPad?: boolean
    isFirstRowBold?: boolean
    isFlexibleIPhone?: boolean
    hasColumnsHeader?: boolean

    classes?: string
    paginationProps?: PaginationProps
    filter?: FilterFactoryProps
    headerClasses?: string
    selectRow?: SelectRowProps<any>
    expandRow?: ExpandRowProps<any, number>
    cellEdit?: any
    defaultSorted?: [{ dataField: string; order: SortOrder }]
    tableRef?: React.LegacyRef<BootstrapTable<any, number>>
    rowClasses?: string
    noDataIndication?: string | JSX.Element | (() => string | JSX.Element)
    rowStyle?: React.CSSProperties | ((row: any, rowIndex: number) => React.CSSProperties)
    sort?: {
        dataField?: any
        order: SortOrder
        sortFunc?: any
        sortCaret?: any
    }
    defaultSortDirection?: SortOrder | undefined
    overlay?: any
    onTableChange?: any
    onSort?: any
    onFilter?: any
    onExternalFilter?: any
}

export const init = (props: ITableAppProps): ITableAppProps => {
    const emptyState = {
        data: [],
        hover: false,
        striped: false,
        loading: false,
        condensed: false,
        hasSearch: true,
        hasFilter: false,
        hasPagination: true,
        isFlexibleIPad: true,
        isFirstRowBold: false,
        hasColumnsHeader: true,
        isFlexibleIPhone: true,
        paginationProps: new PaginationProps({
            sizePerPageList: [
                {
                    text: '5',
                    value: 5,
                },
                {
                    text: '10',
                    value: 10,
                },
                {
                    text: '15',
                    value: 15,
                },
                {
                    text: '20',
                    value: 20,
                },
                {
                    text: '30',
                    value: 30,
                },
                {
                    text: '40',
                    value: 40,
                },
                {
                    text: '50',
                    value: 50,
                },
                { text: 'Все', value: props.data.length },
            ],
        }),
        noDataIndication: 'Нет данных',
        defaultSorted: [
            {
                dataField: '',
                order: 'desc',
            },
        ],
    }

    const replacedProps = Object.assign(emptyState, props)

    let classes = replacedProps.classes ? replacedProps.classes : 'table-app'

    classes = checkAndInsert(replacedProps.isFlexibleIPad, classes, ' table-flex-ipad')
    classes = checkAndInsert(replacedProps.isFlexibleIPhone, classes, ' table-flex-iphone')

    if (replacedProps.hasColumnsHeader) {
        classes = checkAndInsert(replacedProps.isFlexibleIPhone, classes, ' columns-header-iphone')
        classes = checkAndInsert(replacedProps.isFlexibleIPad, classes, ' columns-header-ipad')
    }

    const columns = replacedProps.columns
    columns.forEach((column) => {
        column.title = true
        column.headerTitle = true
        column.classes = 'table-app-columns-content'
        column.headerClasses = 'table-app-columns-header'
        column.attrs = { 'data-label': column.text }
        column.sort = true
        // column.filter = textFilter()
    })

    const filter = replacedProps.hasFilter ? filterFactory() : undefined
    const rowClasses = checkAndInsert(replacedProps.isFirstRowBold, replacedProps.rowClasses, ' first-bold')

    return Object.assign(emptyState, replacedProps, {
        classes,
        columns,
        filter,
        rowClasses,
    })
}
