import './FormControlApp.scss'
import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import {IFormControlAppProps, init} from './extensions/form-control-app'
import validateForm from './extensions/validation-control-app'
import DatePickerApp from '../DatePickerApp/DatePickerApp'
import Select from 'react-select'

const FormControlApp = (props: IFormControlAppProps): JSX.Element => {
    const initState = init(props)
    const [validErrors, setValidErrors] = useState([])
    const [isInvalid, setIsInvalid] = useState(undefined)

    const onChange = (val) => {
        let value = val && val.currentTarget ? val.currentTarget.value : val

        if (initState.type === 'number') {
            value = Number(value)
        }

        const propsValidate = {
            value: value,
            type: initState.type,
            minLength: initState.minLength,
            maxLength: initState.maxLength,
            minValue: initState.minValue,
            maxValue: initState.maxValue,
            pattern: initState.pattern,
            required: initState.required,
            patternError: initState.patternError,
            isHardMinMaxValue: initState.isHardMinMaxValue,
        }

        const errors = validateForm(propsValidate)

        if (props.as !== 'select') {
            setValidErrors(errors)
            setIsInvalid(errors.length > 0 ? false : undefined)
        }

        initState.onChange(propsValidate.value)
    }

    return (
        <div className={initState.classes}>
            {initState.label ? (
                <Form.Label className={initState.classesLabel}>
                    {initState.label}
                    {initState.required ? <span style={{color: 'darkred'}}>*</span> : null}
                </Form.Label>
            ) : null}
            {initState.type === 'date' ? (
                <DatePickerApp
                    placeholderText={ initState.label}
                    id={initState.id}
                    type={initState.type}
                    style={initState.style}
                    required={initState.required}
                    onChange={onChange}
                    useWeekdaysShort={initState.useWeekdaysShort}
                    dateFormat={initState.dateFormat}
                    classes={initState.classesInput}
                    selected={String(initState.value)}
                    minDate={String(initState.minValue)}
                    maxDate={String(initState.maxValue)}
                    disabled={initState.disabled}
                    isInvalid={isInvalid}
                />
            ) : initState.as === 'select' ? (
                <Select
                    id={initState.id}
                    key={initState.id}
                    onChange={onChange}
                    type={initState.type}
                    // isInvalid={isInvalid}
                    value={initState.value}
                    style={initState.style}
                    required={initState.required}
                    disabled={initState.disabled}
                    defaultValue={initState.value}
                    autoFocus={initState.autoFocus}
                    className={initState.classesInput}
                    placeholder={initState.placeholder}
                    options={initState.selectProps.options}
                    isMulti={initState.selectProps.isMulti}
                    isClearable={initState.selectProps.isClearable}
                    noOptionsMessage={() => initState.emptyMessage}
                    // isValid={isInvalid === undefined ? isInvalid : !isInvalid}
                    closeMenuOnSelect={initState.selectProps.closeMenuOnSelect}
                />
            ) : (
                <Form.Control
                    id={initState.id}
                    as={initState.as}
                    key={initState.id}
                    type={initState.type}
                    autoFocus={initState.autoFocus}
                    style={initState.style}
                    rows={initState.rows}
                    required={initState.required}
                    placeholder={initState.placeholder?initState.placeholder:initState.label}
                    onChange={onChange}
                    onBlur={onChange}
                    min={initState.minValue}
                    max={initState.maxValue}
                    classes={initState.classesInput}
                    value={initState.value}
                    disabled={initState.disabled}
                    isInvalid={isInvalid}
                    // isValid={isInvalid === undefined ? isInvalid : !isInvalid}
                />
            )}

            {/* <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>*/}
            <Form.Text className={'form-errors'}>
                {validErrors.map((error, idx) => (
                    <div key={idx} className={'text-danger'}>
                        {error}
                    </div>
                ))}
            </Form.Text>
        </div>
    )
}
export default FormControlApp
