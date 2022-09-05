import {CSSProperties, ElementType} from 'react'
import {appendStr, listToOptions} from '../../../lib/common'

export interface IFormControlAppProps {
    id?: string
    rows?: number
    type?: string
    label?: string
    as?: ElementType
    pattern?: string
    minValue?: number | string
    maxValue?: number | string
    minLength?: number
    maxLength?: number
    autoFocus?: boolean
    placeholder?: string
    style?: CSSProperties
    patternError?: string
    classesLabel?: string
    emptyMessage?: string
    classesInput?: string
    placeholderText?: string
    dateFormat?: string
    useWeekdaysShort?: boolean
    validErrors?: string[]
    isHardMinMaxValue?: boolean
    value: any
    selectProps?: {
        options: any[]
        idFiled?: string
        keyField?: string
        valueField?: string
        idField?: string
        textField?: string
        icon?: string
        isMulti?: boolean
        isClearable?: boolean
        closeMenuOnSelect?: boolean
    }
    classes?: string
    isValid?: boolean
    disabled?: boolean
    required?: boolean
    onChange?: (val: any) => void
}

export const init = (props: IFormControlAppProps): IFormControlAppProps => {
    let options = []
    let value = props.value

    if (props.as === 'select') {
        props.selectProps.idFiled = props.selectProps.idFiled ? props.selectProps.idFiled : 'id'
        props.selectProps.keyField = props.selectProps.keyField ? props.selectProps.keyField : 'id'
        props.selectProps.textField = props.selectProps.textField
            ? props.selectProps.textField
            : props.selectProps.valueField

        const filtered = props.selectProps.options.filter((o) => !o.isColumnsExpander)

        options = listToOptions(
            filtered,
            props.selectProps.valueField,
            props.selectProps.textField,
            props.selectProps.icon,
            props.selectProps.idField,
        )

        if (props.selectProps.isMulti) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const filtered = props.value.filter((o) => !o.isColumnsExpander)

            value = listToOptions(
                filtered,
                props.selectProps.valueField,
                props.selectProps.textField,
                props.selectProps.icon,
                props.selectProps.idField,
            )
        } else {
            value = options.find((o) => o.value === value)
        }
    }

    if (props.type === 'number' && props.minValue && props.maxValue) {
        value = Number(value)
        props.minValue = Number(props.minValue)
        props.maxValue = Number(props.maxValue)
    }

    const selectedProps = props.selectProps ? Object.assign(props.selectProps, {options}) : undefined

    const emptyState = {
        as: 'input',
        type: 'text',
        emptyMessage: 'Нет данных',
        placeholder: props.as === 'select' ? 'Выбрать...' : '',
        onChange: () => {
            return ''
        },
    }

    return Object.assign(emptyState, props, {
        value,
        selectProps: selectedProps,
        classes: appendStr(props.classes, ' form-control-app'),
    })
}
