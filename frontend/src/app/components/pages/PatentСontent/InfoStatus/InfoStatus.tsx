import React from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form} from "react-bootstrap"
import FormControlApp from "../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../lib/store/pages-store";


export default observer(() => {
    const dataInfoStatus = [
        {
            title: 'Редактирование',
            icon: 'fa fa-pencil-square-o',
            status: 0
        },
        {
            title: 'Ожидание проверки',
            icon: 'fa fa-check-square-o',
            status: 1
        },
        {
            title: 'Контроль',
            icon: 'fa fa-eye',
            status: 2
        },
        {
            title: 'Утверждено',
            icon: 'fa fa-lock',
            status: 3
        },
    ]


    // @ts-ignore
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

                                {
                                    dataInfoStatus.map((data) => (
                                        <Col md={3} style={{display: 'inline-block', paddingRight: '10px'}}>
                                            <Button disabled={data.status} value={0}
                                                    style={{width: '100%'}}
                                                    variant={data.status == pagesStore.patentContent['status'] ? "secondary" : "primary"}><i
                                                className={data.icon}
                                                aria-hidden="true"/>{data.title}</Button>
                                        </Col>
                                    ))
                                }
                            </Form>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Текущий статус</Card.Title>

                                </Card.Body>
                            </Card>
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
