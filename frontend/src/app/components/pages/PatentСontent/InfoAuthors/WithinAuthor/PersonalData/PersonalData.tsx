import React, {useState} from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../../../lib/store/pages-store";
import ColApp from "../../../../../../../core/components/ColApp/ColApp";
import authorsStore from "../../../../../../lib/store/authors-store";

interface IPersonalData {
    row: any
    cell: any
}

export default observer(({cell, row}: IPersonalData) => {
    const [surName, setSurName] = useState(cell)
    console.log(row)
    return (
        <div style={{display: 'inline-block'}}>
            <Card.Title>Личная информация</Card.Title>
            <br/>
            <Row>
                <Col>
                    <div style={{padding: '0 1%'}}>
                        <Card style={{background: 'rgba(0,0,0,0.03)', borderColor: '#fff'}}>
                            <Card.Body> <Form.Check type="checkbox" label="Руководитель заявки"/></Card.Body>
                        </Card>
                        <br/>
                        <Card style={{background: 'rgba(0,0,0,0.03)', borderColor: '#fff'}}>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col sm>
                                            <FormControlApp
                                                classes={'home-from-control'}
                                                id={'surName'}
                                                label={'Фамилия'}
                                                value={authorsStore.surName}
                                                onChange={(val) => authorsStore.setSurName(val)}

                                            />
                                        </Col><Col sm>
                                        <FormControlApp
                                            classes={'home-from-control'}
                                            id={'Name'}
                                            label={'Имя'}
                                            value={authorsStore.name}
                                            onChange={(val) => authorsStore.setName(val)}

                                        />
                                    </Col><Col sm>
                                        <FormControlApp
                                            classes={'home-from-control'}
                                            id={'lastName'}
                                            label={'Отчество'}
                                            value={authorsStore.lastName}
                                            onChange={(val) => authorsStore.setLastName(val)}

                                        />
                                    </Col>


                                    </Row>
                                    <br/>
                                    <Row>
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'Birthday'}
                                                    label={'Дата рождения'}
                                                    value={authorsStore.birthday}
                                                    onChange={(val) => authorsStore.setBirthday(val)}

                                                />
                                            }
                                        />

                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'Number'}
                                                    label={'Номер телефона'}
                                                    value={authorsStore.number}
                                                    onChange={(val) => authorsStore.setNumber(val)}

                                                />
                                            }
                                        />
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    style={{width: '100%'}}
                                                    classes={'home-from-control'}
                                                    id={'formGridZip'}
                                                    label={'Почтовый адрес'}
                                                    value={authorsStore.formGridZip}
                                                    onChange={(val) => authorsStore.setFormGridZip(val)}
                                                />
                                            }
                                        />
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'email'}
                                                    label={'Электронный адрес'}
                                                    value={authorsStore.email}
                                                    onChange={(val) => authorsStore.setEmail(val)}
                                                    placeholder={'Создатель'}

                                                />
                                            }
                                        />

                                        <FormControlApp
                                            as={'textarea'}
                                            classes={'home-from-control'}
                                            id={'contAuthor'}
                                            label={'Вклад автора'}
                                            value={authorsStore.contAuthor}
                                            onChange={(val) => authorsStore.setContAuthor(val)}


                                        />

                                    </Row>
                                    <br/>
                                </Form>
                                <Button style={{float: "right"}}>Сохранить</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
})
