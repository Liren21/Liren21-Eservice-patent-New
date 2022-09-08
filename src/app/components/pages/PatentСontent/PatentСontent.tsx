import React from 'react'

import {observer} from 'mobx-react-lite'
import './PatentСontent.scss'
import {Col, Nav, Row, Tab} from "react-bootstrap";
import InfoRID from "./InfoRID/InfoRID";
import InfoAuthors from "./InfoAuthors/InfoAuthors";


export default observer(() => {

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link href="/"> <i className="fa fa-arrow-left" aria-hidden="true"/> Вернуться к
                                    списку </Nav.Link>
                            </Nav.Item>
                            <br/>
                            <br/>
                            <Nav.Item>
                                <Nav.Link eventKey="1"> Информация о РИД</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2"> Сведения об авторах</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="3"> Сведения для реферата</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="4"> Ссылки на документы</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="5"> Статусы </Nav.Link>
                            </Nav.Item>
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
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
})
