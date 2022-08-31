import BootstrapTable, {
    ColumnDescription,
    ExpandRowProps,
    SelectRowProps,
    SortOrder,
} from 'react-bootstrap-table-next'
import React, {Dispatch} from 'react'
import {checkAndInsert, listToOptions} from '../../../lib/common'
import filterFactory, {FilterFactoryProps} from 'react-bootstrap-table2-filter'
import PaginationProps from '../../../lib/models/pagination-props'
import {columnsExpander} from './columns-expander'
import {nanoid} from 'nanoid'
import {getProp, setProp} from '../../../lib/local-storage/service-storage'
import {OptionSelect} from '../../../lib/models/option-select'

interface IAttrs {
    'data-label'?: string
}

export interface IColumnDescription extends ColumnDescription {
    id?: string
    isLocked?: boolean
    title?: boolean
    headerTitle?: boolean
    isColumnsExpander?: boolean
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
    loading?: boolean
    hasFilter?: boolean
    hasPagination?: boolean
    isFlexibleIPad?: boolean
    isFirstRowBold?: boolean
    isFlexibleIPhone?: boolean
    hasColumnsHeader?: boolean
    hasColumnsExpander?: boolean

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
    resetColumns?: any
    onTableChange?: any
    onSort?: any
    onFilter?: any
    onExternalFilter?: any
}

interface ITableApp {
    props: ITableAppProps
    options?: OptionSelect[]
    setSelectedColumns?: Dispatch<any>
}

export const fieldsToOptions = {
    idField: 'id',
    textField: 'text',
    valueField: 'dataField',
}

class TableAppModel implements ITableApp {
    props: ITableAppProps
    options?: OptionSelect[]
    setSelectedColumns?: Dispatch<any>

    constructor() {
    }

    init(
        props: ITableAppProps,
        selectedColumns: IColumnDescription[],
        setSelectedColumns: React.Dispatch<any>,
    ): ITableAppProps {
        this.props = props
        this.setSelectedColumns = setSelectedColumns

        const addCssClasses = (field: string, classes: string): string => {
            if (field === 'undefined') {
                return classes
            } else if (field.includes(classes)) {
                return field
            } else {
                return field + ` ${classes}`
            }
        }

        this.props = Object.assign(this.getEmptyState(), this.props)
        this.props.columns.forEach((column) => {
            column.id = nanoid()
            column.title = true
            column.headerTitle = true
            column.classes = addCssClasses(String(column.classes), 'table-app-columns-content')
            column.headerClasses = addCssClasses(String(column.headerClasses), 'table-app-columns-header')
            column.attrs = {'data-label': column.text}
            column.sort = true
            // column.filter = textFilter()
        })

        if (this.props.hasColumnsExpander) {
            if (!this.hasColumnsExpander()) {
                this.props.columns.push(this.genExpanderColumns(this.props.columns.filter((c) => !c.isLocked)))
            }

            if (!this.options)
                this.options = listToOptions(
                    this.props.columns,
                    fieldsToOptions.valueField,
                    fieldsToOptions.textField,
                    fieldsToOptions.idField,
                )
        }

        const savedColumns = getProp(`${props.id}_selectedColumns`)
        this.resetColumns(savedColumns)

        return this.getState()
    }

    getState(): ITableAppProps {
        return Object.assign(this.getEmptyState(), this.props, {
            classes: this.getCssClasses(),
            filter: this.getFilter(),
            rowClasses: this.getCssRowClasses(),
            columns: this.props.columns.filter((c) => !c.hidden),
            resetColumns: this.resetColumns,
        })
    }

    handleChangeSelectedColumns(selectedOptions: OptionSelect[]): void {
        this.props.columns.forEach((c) => {
            const obj = selectedOptions.find((o) => o.label === c.text)
            obj && (c.hidden = false)
            !obj && !c.isColumnsExpander && !c.isLocked && (c.hidden = true)
        })

        const propName = `${this.props.id}_selectedColumns`
        const propVal = this.props.columns.filter((c) => !c.hidden)

        setProp(propName, propVal)

        this.setSelectedColumns([...propVal])
    }

    getFilter(): unknown {
        return this.props.hasFilter ? filterFactory() : undefined
    }

    hasColumnsExpander(columns = this.props.columns): boolean {
        return !!columns.find((c) => c.isColumnsExpander)
    }

    genExpanderColumns(selectedColumns: IColumnDescription[]): IColumnDescription {
        return columnsExpander(
            selectedColumns,
            this.handleChangeSelectedColumns.bind(this),
            this.props.columns.filter((c) => !c.isLocked),
        )
    }

    resetColumns = (selectedColumns: IColumnDescription[]): void => {
        if (selectedColumns) {
            this.props.columns.forEach((col) => {
                const obj = selectedColumns.find((c) => c.dataField === col.dataField)
                obj && (col.hidden = false)
                !obj && !col.isColumnsExpander && (col.hidden = true)
            })

            if (this.props.hasColumnsExpander && !this.hasColumnsExpander()) {
                this.props.columns.push(this.genExpanderColumns(selectedColumns))
            }
        }
    }

    getCssClasses(): string {
        let classes = this.props.classes ? this.props.classes : 'table-app'

        classes = checkAndInsert(this.props.isFlexibleIPad, classes, ' table-flex-ipad')
        classes = checkAndInsert(this.props.isFlexibleIPhone, classes, ' table-flex-iphone')

        if (this.props.hasColumnsHeader) {
            classes = checkAndInsert(this.props.isFlexibleIPhone, classes, ' columns-header-iphone')
            classes = checkAndInsert(this.props.isFlexibleIPad, classes, ' columns-header-ipad')
        }

        return classes
    }

    getCssRowClasses(): string {
        return checkAndInsert(this.props.isFirstRowBold, this.props.rowClasses, ' first-bold')
    }

    getEmptyState(): ITableAppProps {
        return {
            id: this.props.id,
            data: this.props.data,
            columns: this.props.columns,

            hover: false,
            striped: false,
            hasSearch: true,
            hasFilter: false,
            condensed: false,
            hasPagination: true,
            isFlexibleIPad: true,
            isFirstRowBold: false,
            hasColumnsHeader: true,
            isFlexibleIPhone: true,
            hasColumnsExpander: false,
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
                    {text: 'Все', value: this.props.data.length},
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
    }
}

export default TableAppModel
