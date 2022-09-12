import React from 'react'

import {observer} from 'mobx-react-lite'
import './ExistingUser.scss'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../core/components/FormControlApp/FormControlApp";
import addUser from "../../../../../lib/store/AddUser";
import AddUser from "../../../../../lib/store/AddUser";


export default observer(() => {

    return (
        <>
            <Form>
                <Row>
                    <Col>
                        <FormControlApp
                            id={'typeDoc'}
                            label={'Фамилия'}
                            value={addUser.existingSurname}
                            onChange={(val) => addUser.setExistingSurname(val)}
                        />
                        <br/>
                        <FormControlApp
                            id={'typeDoc'}
                            label={'Имя'}
                            value={addUser.existingName}
                            onChange={(val) => addUser.setExistingName(val)}
                        />
                        <br/>
                        <FormControlApp
                            id={'typeDoc'}
                            label={'Отчество'}
                            value={addUser.existingLastname}
                            onChange={(val) => addUser.setExistingLastname(val)}
                        />
                        <br/>
                        <FormControlApp
                            style={{width: '100%'}}
                            id={'creationDate'}
                            type={'date'}
                            label={'Дата создания'}
                            value={addUser.existingBirthday}
                            onChange={(val) => addUser.setExistingBirthday(val)}

                        />
                        <br/>

                        {
                            addUser.foundAuthor.map((d) => (
                                <Card>
                                    <Card.Body>
                                        {d['surname']} {d['name']} {d['lastname']}
                                        <br/>
                                        {d['birthday']}
                                        <Button onClick={() => AddUser.postAddEx(d['authId'], d['id'], d['peopleId'])}
                                                variant="outline-success" style={{float: "right"}}><i
                                            className="fa fa-user-plus" aria-hidden="true"/>Добавить </Button>
                                    </Card.Body>
                                </Card>
                            ))
                        }
                        <br/>
                        <Button onClick={() => addUser.postAddExisting()} style={{float: 'right'}}
                                variant={'outline-primary'}><i
                            className="fa fa-search" aria-hidden="true"/> Найти</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
})
