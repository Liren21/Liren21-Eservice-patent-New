import React, {useState} from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Form, Modal, Row,} from "react-bootstrap";
import FormControlApp from "../../../../core/components/FormControlApp/FormControlApp";
import './AddPatent.scss'

import addPatentStore from "../../../lib/store/addPatent-store";







export default observer(() => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-primary"  onClick={handleShow}>
                <i className="fa fa-user-plus" aria-hidden="true"/>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавить заявку</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <FormControlApp
                                classes={'home-from-control'}
                                id={'Name'}
                                label={'Название'}
                                value={addPatentStore.name}
                                onChange={(val) => addPatentStore.setName(val)}
                                placeholder={'Название'}
                            />
                            <br/>
                            <FormControlApp
                                classes={'home-from-control'}
                                id={'type'}
                                label={'Тип'}
                                value={addPatentStore.typeFile}
                                onChange={(val) => addPatentStore.setType(val)}
                                placeholder={'Тип'}
                                as={'select'}
                                selectProps={{
                                    valueField: 'value',
                                    textField: 'description',
                                    options: addPatentStore.typesFile
                                }
                                }
                            />
                            <br/>

                            <FormControlApp
                                style={{width: '100%'}}
                                classes={'home-from-control'}
                                id={'creationDate'}
                                type={'date'}
                                label={'Дата создания '}
                                value={addPatentStore.creationDate}
                                onChange={(val) => addPatentStore.setCreationDate(val)}
                            />

                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button onClick={()=>addPatentStore.AddPatent()} variant="primary">Отправить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
})
