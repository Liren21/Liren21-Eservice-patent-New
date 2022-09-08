import React from 'react'

import {observer} from 'mobx-react-lite'
import './ExistingUser.scss'
import {Button, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../core/components/FormControlApp/FormControlApp";
import addUser from "../../../../../lib/store/AddUser";
import pagesStore from "../../../../../lib/store/pages-store";



export default observer(() => {
    console.log(pagesStore.authors)
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
                        <Button onClick={()=>addUser.getAddExisting()} style={{float: 'right'}} variant={'outline-primary'}>Найти</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
})
