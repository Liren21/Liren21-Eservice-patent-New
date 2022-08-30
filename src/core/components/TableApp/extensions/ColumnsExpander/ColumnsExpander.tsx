/*
 * Copyright (c) Kolyada Nikita Vladimirovich <nikita.nk16@yandex.ru>  06.09.2021, 16:34
 */
import './ColumnsExpander.scss'
import FormControlApp from '../../../FormControlApp/FormControlApp'
import React, { useState } from 'react'
import { fieldsToOptions, IColumnDescription } from '../table-app-model'

interface IColumnsExpanderProps {
    columns: IColumnDescription[]
    selectedColumns: IColumnDescription[]
    setSelectedColumns: (selectedColumns: IColumnDescription[]) => void
}

const ColumnsExpander = (props: IColumnsExpanderProps): JSX.Element => {
    const [show, setShow] = useState(false)

    const genCols = () => {
        return props.selectedColumns.filter((c) => !c.hidden)
    }

    return (
        <div onBlur={() => setShow(false)}>
            <div onClick={() => setShow(!show)}>
                <i className={'fa fa-plus'}></i>
            </div>
            {show ? (
                <FormControlApp
                    as={'select'}
                    classes={'columns-expander-selector'}
                    value={genCols()}
                    onChange={props.setSelectedColumns}
                    selectProps={{
                        isMulti: true,
                        isClearable: false,
                        closeMenuOnSelect: false,
                        valueField: fieldsToOptions.valueField,
                        textField: fieldsToOptions.textField,
                        idField: fieldsToOptions.idField,
                        options: props.columns,
                    }}
                />
            ) : null}
        </div>
    )
}
export default ColumnsExpander
