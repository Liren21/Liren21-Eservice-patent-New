import React from 'react'
import './PassportData.scss'
import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../../../lib/store/pages-store";
import ColApp from "../../../../../../../core/components/ColApp/ColApp";


export default observer(() => {

    return (
        <div style={{display: 'inline-block'}}>
            <Card.Title>Паспортные данные</Card.Title>
            <br/>
            <Row>
                <Col>
                    <div style={{padding: '0 1%'}}>
                        <Card style={{background: 'rgba(0,0,0,0.03)', borderColor: '#fff'}}>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'PassportSeries'}
                                                    label={'Серия паспорта'}
                                                    value={pagesStore.name}
                                                    onChange={(val) => pagesStore.setName(val)}
                                                />
                                            }
                                        />

                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'passportNumber'}
                                                    label={'Номер паспорта'}
                                                    value={pagesStore.name}
                                                    onChange={(val) => pagesStore.setName(val)}
                                                />
                                            }
                                        />
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    style={{width: '100%'}}
                                                    classes={'home-from-control'}
                                                    id={'nationality'}
                                                    label={'Гражданство'}
                                                    value={pagesStore.creationDate}
                                                    onChange={(val) => pagesStore.setCreationDate(val)}
                                                />
                                            }
                                        />
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'whenIssued'}
                                                    label={'Когда выдан паспорт'}
                                                    value={pagesStore.creator}
                                                    onChange={(val) => pagesStore.setCreator(val)}

                                                />
                                            }
                                        />

                                    </Row>
                                    <br/>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Кем выдан паспорт</Form.Label>
                                        <Form.Control style={{borderRadius: '15px'}} as="textarea" rows={3}/>
                                    </Form.Group>
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
