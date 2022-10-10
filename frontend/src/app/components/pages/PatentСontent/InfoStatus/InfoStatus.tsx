import React from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form} from "react-bootstrap"
import FormControlApp from "../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../lib/store/pages-store";


export default observer(() => {


    return (
        <>
            <>
                <Card>
                    <Card.Body>
                        <Card.Title><strong> <i className="fa fa-cog" aria-hidden="true"/> Статусы</strong>
                        </Card.Title>
                        <br/><br/>
                        <Card.Text>
                            <Form>
                                <Col md={3} style={{display: 'inline-block', paddingRight: '10px'}}>
                                    <Button value={0} style={{width: '100%'}}
                                            variant={pagesStore.status == 0 ? "primary" : "outline-primary"}><i
                                        className="fa fa-pencil-square-o"
                                        aria-hidden="true"/>Редактирование</Button>
                                </Col>
                                <Col md={3} style={{display: 'inline-block', paddingRight: '10px'}}>
                                    <Button value={1} style={{width: '100%'}}
                                            variant={pagesStore.status == 1 ? "primary" : "outline-primary"}><i className="fa fa-check-square-o"
                                                                         aria-hidden="true"/>Ожидание проверки</Button>
                                </Col>
                                <Col md={3} style={{display: 'inline-block', paddingRight: '10px'}}>
                                    <Button value={2} style={{width: '100%'}}
                                            variant={pagesStore.status == 2 ? "primary" : "outline-primary"}><i className="fa fa-eye" aria-hidden="true"/>Контроль</Button>
                                </Col>
                                <Col md={3} style={{display: 'inline-block', paddingRight: '10px'}}>
                                    <Button value={3} style={{width: '100%'}}
                                            variant={pagesStore.status == 3 ? "primary" : "outline-primary"}><i className="fa fa-lock" aria-hidden="true"/>Утверждено</Button>
                                </Col>
                            </Form>
                            <Card>
                                <Card.Body>
                                    <Card.Title> Замечания к заявке</Card.Title>
                                    <FormControlApp
                                        disabled={true}
                                        as={"textarea"}
                                        classes={'home-from-control'}
                                        id={'addressDemand'}
                                        value={'Ку-ку'}
                                    />
                                </Card.Body>
                            </Card>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        </>
    )
})
