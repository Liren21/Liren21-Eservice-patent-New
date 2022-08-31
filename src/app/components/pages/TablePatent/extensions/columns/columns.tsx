import React from 'react'



export default (): any => {


    return [
        {
            dataField: 'name',
            text: 'Название',

            align: 'center',
            style: { verticalAlign: 'middle' },

            headerAlign: 'center',
            headerStyle: { width: '150px', verticalAlign: 'middle' },
            isLocked: true,

            // formatExtraData: modifiedCounter,
        },
        {
            dataField: 'assignment.discipline',
            text: 'Тип заявки',

            align: 'center',
            style: { verticalAlign: 'middle' },

            headerAlign: 'center',
            headerStyle: { width: '250px', verticalAlign: 'middle' },
            editable: false,
        },
        {
            dataField: 'assignment.faculty',
            text: 'Дата создания РИД',

            align: 'center',
            style: { verticalAlign: 'middle' },

            headerAlign: 'center',
            headerStyle: { width: 'auto', verticalAlign: 'middle' },
            editable: false,
        },
        {
            dataField: 'assignment.studyForm',
            text: 'Создатель',

            align: 'center',
            style: { verticalAlign: 'middle' },

            headerAlign: 'center',
            headerStyle: { width: 'auto', verticalAlign: 'middle' },
            editable: false,
        },
        {
            dataField: 'assignment.studyLevel',
            text: 'Статус',

            align: 'center',
            style: { verticalAlign: 'middle' },

            headerAlign: 'center',
            headerStyle: { width: 'auto', verticalAlign: 'middle' },
            editable: false,
        },
    ]
}
