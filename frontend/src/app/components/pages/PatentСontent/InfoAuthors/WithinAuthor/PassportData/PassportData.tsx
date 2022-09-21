import React, {useState} from 'react'
import './PassportData.scss'
import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../../core/components/FormControlApp/FormControlApp";
import ColApp from "../../../../../../../core/components/ColApp/ColApp";

interface IPassportData {
    row: any
}

export default observer(({row}: IPassportData) => {
    const [series, setSeries] = useState(row.series)
    const [number, setNumber] = useState(row.number)
    const [whoGave, setWhoGave] = useState(row.whoGave)
    const [date, setDate] = useState(row.date)
    const [citizenship, setCitizenship] = useState(row.citizenship)
    console.log(row)
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
                                                    value={series}
                                                    onChange={(val) => setSeries(val)}
                                                />
                                            }
                                        />

                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'passportNumber'}
                                                    label={'Номер паспорта'}
                                                    value={number}
                                                    onChange={(val) => setNumber(val)}
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
                                                    value={citizenship}
                                                    onChange={(val) => setCitizenship(val)}
                                                />
                                            }
                                        />
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'whenIssued'}
                                                    label={'Когда выдан паспорт'}
                                                    value={date}
                                                    onChange={(val) => setDate(val)}

                                                />
                                            }
                                        />
                                        <FormControlApp
                                            as={"textarea"}
                                            classes={'home-from-control'}
                                            id={'whenIssued'}
                                            label={'Кем выдан паспорт'}
                                            value={whoGave}
                                            onChange={(val) => setWhoGave(val)}

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
