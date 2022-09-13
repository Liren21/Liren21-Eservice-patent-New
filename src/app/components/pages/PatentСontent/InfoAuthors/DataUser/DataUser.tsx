import React, {useState} from 'react'

import {observer} from 'mobx-react-lite'
import './DataUser.scss'
import {Button,  Modal,  Tabs, Tab} from "react-bootstrap";

interface IDataUser {
    row: any
    cell: any
}

export default observer(({row, cell}: IDataUser) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    console.log(row)
    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                {cell}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Tabs defaultActiveKey="PersonalInformation" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="PersonalInformation" title="Личная Информация ">

                        </Tab>
                        <Tab eventKey="PassportData" title="Паспортные данные">

                        </Tab>
                        <Tab eventKey="JobInfo" title="Работа">

                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    )
})
