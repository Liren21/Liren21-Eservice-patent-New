

import './DatePickerApp.scss'
import React from 'react'
import DatePicker from 'react-datepicker'
import { IDatePickerProps, init } from './extensions/date-picker-app'

const DatePickerApp = (props: IDatePickerProps): JSX.Element => {
    const initState = init(props)
    return (
        <div className={initState.classes}>
            <DatePicker
                required={initState.required}
                type={initState.type}
                locale={initState.locale}
                style={initState.style}
                disabled={initState.disabled}
                placeholderText={initState.placeholderText}
                selected={initState.dateInFormat(initState.selected)}
                onChange={initState.onChange}
                useWeekdaysShort={true}
                formatWeekDay={initState.formatWeekDay}
                dateFormat={initState.dateFormat}
                className={initState.classesDatepicker}
                minDate={initState.dateInFormat(initState.minDate)}
                maxDate={initState.dateInFormat(initState.maxDate)}
                adjustDateOnChange={true}
                isInvalid={initState.isInvalid}
                isValid={initState.isInvalid === undefined ? initState.isInvalid : !initState.isInvalid}
            />
        </div>
    )
}
export default DatePickerApp
