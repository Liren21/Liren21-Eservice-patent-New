import React from 'react'
import DataUser from "../WithinAuthor/WithinAuthor ";
import authorsStore from "../../../../../lib/store/authors-store";



export default (): any => {

    const formatterIcons = (cell) => {
        let icon = 'fa fa-pencil'
        let title = 'Статус "Черновик"'

        switch (cell) {
            case 0:
                icon = ''
                title = 'Создатель'
                break
            case 1:
                icon = 'fa fa-check'
                title = 'Создатель'
                break
            case 2:
                icon = 'fa fa-pencil-square-o'
                title = 'На редактировании'
                break
            case 3:
                icon = 'fa fa-lock'
                title = 'Утверждено'
                break
        }

        return <i className={icon} title={title}/>
    }
    const contentUser = (cell,row) => {
        authorsStore.setAuthorsData(row)
      return <DataUser row={row} cell={cell}/>
        // authorsStore.setSurName()
    }


    return [
        {
            dataField: "surname",
            text: "Фамилия",

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: '150px', verticalAlign: 'middle'},
            isLocked: true,

            formatter: contentUser

        },
        {
            dataField: "name",
            text: "Имя",

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: '250px', verticalAlign: 'middle'},
            editable: false,
        },
        {
            dataField: "lastname",
            text: "Отчество",

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: 'auto', verticalAlign: 'middle'},
            editable: false,
        },
        {
            dataField: "birthday",
            text: "Дата рождения ",

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: 'auto', verticalAlign: 'middle'},
            editable: false,
        },
        {
            dataField: "isCreator",
            text: "Статус",

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: 'auto', verticalAlign: 'middle'},
            editable: false,

            formatter: formatterIcons
        },
    ]

}