import React from 'react'

import {observer} from 'mobx-react-lite'
import './PatentСontent.scss'
import {Button, Col, Nav, Row, Tab} from "react-bootstrap";
import InfoRID from "./InfoRID/InfoRID";
import InfoAuthors from "./InfoAuthors/InfoAuthors";
import InfoAbstract from "./InfoAbstract/InfoAbstract";
import pagesStore from "../../../lib/store/pages-store";





export default observer(() => {
    console.log(pagesStore.idPatent)

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="1"><i className="fa fa-info-circle" aria-hidden="true"/> Информация
                                    о РИД
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2"><i className="fa fa-users" aria-hidden="true"/> Сведения об
                                    авторах</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="3"><i className="fa fa-info-circle" aria-hidden="true"/> Сведения
                                    для реферата</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="4"> Ссылки на документы</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="5"> Статусы </Nav.Link>
                            </Nav.Item>
                            <br/>
                            <br/>
                            <Button style={{borderColor: '#fff', textAlign: "left"}} variant={"outline-danger"}
                                    href="/"><i style={{transform: 'rotate(180deg)', fontSize: '1rem',}}
                                                className="fa fa-sign-out" aria-hidden="true"/> Выход</Button>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="0"/>
                            <Tab.Pane eventKey="1">
                                <InfoRID/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="2">
                                <InfoAuthors/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="3">
                                <InfoAbstract/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
})
