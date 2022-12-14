import React from 'react'
import {Link} from "react-router-dom";
import routes from "../../../../../lib/routes";
import pagesStore from "../../../../../lib/store/pages-store";


export default (): any => {

    const formatterAuthors = (cell) => {
        const surnameZero = cell[0].surname
        const nameOne = cell[0].name[0]
        const lastnameTree = cell[0].lastname[0]
        return surnameZero + " " + nameOne + "." + lastnameTree + ". "
    }

    const iconRoutine = (cell) => {
        let icon = 'fa fa-pencil'
        let title = 'Статус "Черновик"'

        switch (cell) {
            case 0:
                icon = 'fa fa-pencil-square-o'
                title = 'Статус "Ожидает проверки"'
                break
            case 1:
                icon = 'fa fa-check'
                title = 'Статус "Ожидает проверки"'
                break
            case 2:
                icon = 'fa fa-pencil-square-o'
                title = 'Статус "Ожидает проверки"'
                break
            case 3:
                icon = 'fa fa-lock'
                title = 'Статус "Ожидает проверки"'
                break
        }
        pagesStore.setStatus(cell)
        console.log(cell)

        return <i className={icon}/>
    }

    const insideLink = (cell, row) => {
        pagesStore.setIdPatent(row.id)
        return (
            <Link style={{textDecoration: 'none'}} to={`${routes.PATENT_CONTENT}/${row.id}`}
                  onClick={() => pagesStore.getPatentContent(row.id)}>
                <div className={'link-patent'}>{cell}</div>
            </Link>

        )

    }
    return [
        {
            dataField: 'name',
            text: 'Название',

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: '150px', verticalAlign: 'middle'},
            isLocked: true,
            formatter: insideLink
        },
        {
            dataField: 'objType',
            text: 'Тип заявки',

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: '250px', verticalAlign: 'middle'},
            editable: false,
        },
        {
            dataField: 'createDate',
            text: 'Дата создания РИД',

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: 'auto', verticalAlign: 'middle'},
            editable: false,
        },
        {
            dataField: 'authors',
            text: 'Создатель',

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: 'auto', verticalAlign: 'middle'},
            editable: false,

            formatter: formatterAuthors,
        },
        {
            dataField: 'status',
            text: 'Статус',

            align: 'center',
            style: {verticalAlign: 'middle'},

            headerAlign: 'center',
            headerStyle: {width: 'auto', verticalAlign: 'middle'},
            editable: false,
            formatter: iconRoutine
        },
    ]

}