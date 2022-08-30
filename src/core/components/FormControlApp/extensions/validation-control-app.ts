

import { toDatePicker } from '../../../lib/date'

interface IValidationFormProps {
    value: string | number
    type?: string
    minLength?: number
    maxLength?: number
    minValue?: number | string
    maxValue?: number | string
    pattern?: string
    patternError?: string
    required?: boolean
    isHardMinMaxValue?: boolean
}

export default (props: IValidationFormProps): string[] => {
    const controlTypes = { TEXT: 'text', NUMBER: 'number', PASSWORD: 'password', EMAIL: 'email', DATE: 'date' }
    const errors: string[] = []
    const templatesErrors = {
        requiredError: 'Обязательное поле!',
        minLengthError: `Поле должно содержать минимум ${props.minLength} символов!`,
        maxLengthError: `Поле должно содержать максимум ${props.maxLength} символов!`,
        minValueError: `Поле должно содержать значение не менее (${props.minValue})!`,
        maxValueError: `Поле должно содержать значение не более (${props.maxValue})!`,
        emailError: 'Поле не соответствует типу электронной почты!',
    }

    props.required && String(props.value).length === 0 && errors.push(templatesErrors.requiredError)

    if (controlTypes.EMAIL === props.type) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        !re.test(String(props.value).toLowerCase()) && errors.push(templatesErrors.emailError)
    }

    if (controlTypes.DATE === props.type) {
        const date = toDatePicker(String(props.value))
        props.minValue && date < toDatePicker(String(props.minValue)) && errors.push(templatesErrors.minValueError)
        props.minValue && date > toDatePicker(String(props.maxValue)) && errors.push(templatesErrors.maxValueError)
    }

    if ('text number password'.includes(props.type)) {
        props.minLength && String(props.value).length < props.minLength && errors.push(templatesErrors.minLengthError)
        props.maxLength && String(props.value).length > props.maxLength && errors.push(templatesErrors.maxLengthError)

        if (typeof props.minValue === 'number' && props.value < props.minValue) {
            errors.push(templatesErrors.minValueError)
            props.isHardMinMaxValue && (props.value = props.minValue)
        }

        if (typeof props.maxValue === 'number' && props.value > props.maxValue) {
            errors.push(templatesErrors.maxValueError)
            props.isHardMinMaxValue && (props.value = props.maxValue)
        }
    }

    if (props.pattern && String(props.value).length > 0) {
        const regExp = new RegExp(props.pattern)
        regExp.test(String(props.value))

        if (!regExp.test(String(props.value))) errors.push(props.patternError)
    }

    return errors
}
