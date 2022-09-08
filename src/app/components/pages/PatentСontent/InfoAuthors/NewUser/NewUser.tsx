import React from 'react'

import {observer} from 'mobx-react-lite'
import './NewUser.scss'
import {Button, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../core/components/FormControlApp/FormControlApp";
import addUser from "../../../../../lib/store/AddUser";



export default observer(() => {

    return (
        <>
            <Form>
                <Row>
                    <Col>
                        <FormControlApp
                            id={'typeDoc'}
                            label={'Фамилия'}
                            value={addUser.newSurname}
                            onChange={(val) => addUser.setNewSurname(val)}
                        />
                        <br/>
                        <FormControlApp
                            id={'typeDoc'}
                            label={'Имя'}
                            value={addUser.newName}
                            onChange={(val) => addUser.setNewName(val)}
                        />
                        <br/>
                        <FormControlApp
                            id={'typeDoc'}
                            label={'Отчество'}
                            value={addUser.newLastname}
                            onChange={(val) => addUser.setNewLastname(val)}
                        />
                        <br/>
                        <FormControlApp
                            style={{width: '100%'}}
                            id={'creationDate'}
                            type={'date'}
                            label={'Дата создания'}
                            value={addUser.newBirthday}
                            onChange={(val) => addUser.setNewBirthday(val)}

                        />
                        <br/>
                        <Button onClick={()=>addUser.getAddExisting()} style={{float: 'right'}} variant={'outline-primary'}>Найти</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
})
