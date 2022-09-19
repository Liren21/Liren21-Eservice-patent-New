import React, {useState} from 'react'

import {observer} from 'mobx-react-lite'
import './CustomModal.scss'
import {Button, Modal} from "react-bootstrap";
import CustomTabs from "../CustomTabs/CustomTabs";



export default observer(() => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className={'custom-modal'}>
            <Button variant="outline-primary" onClick={handleShow}>
                <i className="fa fa-user-plus" aria-hidden="true"/>Добавить автора
            </Button>

            <Modal  show={show} onHide={handleClose}>
                <Modal.Body className={'custom-modal-body'}><CustomTabs/></Modal.Body>
            </Modal>
        </div>
    )
})
