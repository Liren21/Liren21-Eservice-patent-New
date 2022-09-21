import React, {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../../core/components/FormControlApp/FormControlApp";
interface IJobData {
    row: any
}

export default observer(({row}:IJobData) => {
    const [work,setWork] = useState(row.work)
    const [position,setPosition] = useState(row.position)
    const [department,setDepartment] = useState(row.department)
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
                                            value={work}
                                            onChange={(val) => setWork(val)}
                                        />
                                        <FormControlApp
                                            classes={'home-from-control'}
                                            id={'position'}
                                            label={'Должность'}
                                            value={position}
                                            onChange={(val) => setPosition(val)}
                                        />
                                        <FormControlApp
                                            style={{width: '100%'}}
                                            classes={'home-from-control'}
                                            id={'department'}
                                            label={'Кафедра'}
                                            value={department}
                                            onChange={(val) => setDepartment(val)}
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
