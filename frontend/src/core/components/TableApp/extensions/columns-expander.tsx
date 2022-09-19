import React from 'react'
import ColumnsExpander from './ColumnsExpander/ColumnsExpander'
import { IColumnDescription } from './table-app-model'
import { nanoid } from 'nanoid'

export const columnsExpander = (
    selectedColumns: IColumnDescription[],
    setSelectedColumns: (selectedColumns: IColumnDescription[]) => void,
    columns: IColumnDescription[],
): IColumnDescription => ({
    isColumnsExpander: true,
    dataField: '',
    text: '',
    isDummyField: true,
    id: nanoid(),
    title: true,
    headerTitle: true,

    classes: 'table-app-columns-content ',
    headerClasses: ' columns-expander-header table-app-columns-header',
    headerAlign: 'center',
    headerStyle: { width: '50px', verticalAlign: 'middle' },
    // eslint-disable-next-line react/display-name
    headerFormatter: (): JSX.Element => {
        return (
            <ColumnsExpander
                selectedColumns={selectedColumns}
                setSelectedColumns={setSelectedColumns}
                columns={columns}
            />
        )
    },
})
