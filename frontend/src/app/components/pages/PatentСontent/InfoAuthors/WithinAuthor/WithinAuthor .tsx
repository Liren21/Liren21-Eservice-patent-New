import React, {useState} from 'react'

import {observer} from 'mobx-react-lite'
import './WithinAuthor .scss'
import {Button, Modal, Tabs, Tab} from "react-bootstrap";
import PersonalInf from "./PersonalData/PersonalData";
import PassportData from "./PassportData/PassportData";
import JobData from "./JobData/JobData";

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
        <div style={{textAlign: 'center'}}>
            <Button variant="outline-primary" onClick={handleShow}>
                {cell}
            </Button>

            <Modal size={"lg"} show={show} onHide={handleClose}>
                <Modal.Body>
                    <Tabs defaultActiveKey="PersonalInformation" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="PersonalInformation" title="Личная Информация ">
                            <PersonalInf row={row} cell={cell}/>
                        </Tab>

                        <Tab eventKey="PassportData" title="Паспортные данные">
                            <PassportData/>
                        </Tab>
                        <Tab eventKey="JobInfo" title="Работа">
                            <JobData/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </div>
    )
})
