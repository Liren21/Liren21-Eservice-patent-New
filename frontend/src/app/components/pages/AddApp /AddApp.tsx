import React, {useState} from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Form, Modal, Row,} from "react-bootstrap";
import FormControlApp from "../../../../core/components/FormControlApp/FormControlApp";
import ridStore from "../../../lib/store/rid-store";
import pagesStore from "../../../lib/store/pages-store";







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
                                id={'name'}
                                label={'Название объекта'}
                                value={ridStore.name.length ? ridStore.name : pagesStore.patentContent['name']}
                                onChange={(val) => ridStore.setName(val)}
                                placeholder={pagesStore.patentContent['name']}
                            />
                            <br/>
                            <FormControlApp
                                classes={'home-from-control'}
                                id={'objType'}
                                label={'Вид объекта'}
                                value={ridStore.objType.length ? ridStore.objType : pagesStore.patentContent['objType']}
                                onChange={(val) => ridStore.setObjType(val)}
                                placeholder={pagesStore.patentContent['objType']}
                            />
                            <br/>

                            <FormControlApp
                                style={{width: '100%'}}
                                classes={'home-from-control'}
                                id={'createDate'}
                                type={'date'}
                                label={'Дата создания'}
                                value={ridStore.createDate}
                                onChange={(val) => ridStore.setCreateDate(val)}
                                placeholder={pagesStore.patentContent['createDate']}
                            />

                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary">Отправить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
})
