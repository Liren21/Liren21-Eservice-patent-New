import React from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../../../lib/store/pages-store";
import ColApp from "../../../../../../../core/components/ColApp/ColApp";


export default observer(() => {

    return (
        <div style={{display: 'inline-block'}}>
            <Card.Title>Работа</Card.Title>
            <br/>
            <Row>
                <Col>
                    <div style={{padding: '0 1%'}}>
                        <Card style={{background: 'rgba(0,0,0,0.03)', borderColor: '#fff'}}>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <FormControlApp
                                            classes={'home-from-control'}
                                            id={'workplace'}
                                            label={'Место работы'}
                                            value={pagesStore.name}
                                            onChange={(val) => pagesStore.setName(val)}
                                        />
                                        <FormControlApp
                                            classes={'home-from-control'}
                                            id={'position'}
                                            label={'Должность'}
                                            value={pagesStore.name}
                                            onChange={(val) => pagesStore.setName(val)}
                                        />
                                        <FormControlApp
                                            style={{width: '100%'}}
                                            classes={'home-from-control'}
                                            id={'department'}
                                            label={'Кафедра'}
                                            value={pagesStore.creationDate}
                                            onChange={(val) => pagesStore.setCreationDate(val)}
                                        />
                                    </Row>
                                </Form>
                                <br/>
                                <Button style={{float: "right"}}>Сохранить</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
})
