import './Home.scss'

import React, {useEffect} from 'react'
import {Button, Card, Form, Row} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import pagesStore from "../../lib/store/pages-store";
import ColApp from "../../../core/components/ColApp/ColApp";
import FormControlApp from "../../../core/components/FormControlApp/FormControlApp";
import TablePatent from "../pages/TablePatent/TablePatent";


export default observer(() => {
    const kok = () => {
        pagesStore.getPatent()
        console.log(pagesStore.demand)
    }
    useEffect(()=>{
        kok()
    },[])
    return (
        <Card className={'home-card'}>
            <Card.Body className={'home-card-body'}>
                <Card.Title><strong>Поиск по заявкам</strong></Card.Title>
                <br/>

                <Form>
                    <Row>
                        <ColApp
                            body={
                                <FormControlApp
                                    classes={'home-from-control'}
                                    id={'Name'}
                                    label={'Название'}
                                    value={pagesStore.name}
                                    onChange={(val) => pagesStore.setName(val)}
                                    placeholder={'Название'}
                                />
                            }
                        />

                        <ColApp
                            body={
                                <FormControlApp
                                    classes={'home-from-control'}
                                    id={'type'}
                                    label={'Тип'}
                                    value={pagesStore.typeFile}
                                    onChange={(val) => pagesStore.setType(val)}
                                    placeholder={'Тип'}
                                    as={'select'}
                                    selectProps={{
                                        valueField: 'value',
                                        textField: 'description',
                                        options: pagesStore.typesFile
                                    }
                                    }
                                />
                            }
                        />
                        <ColApp
                            body={
                                <FormControlApp
                                    style={{width: '100%'}}
                                    classes={'home-from-control'}
                                    id={'creationDate'}
                                    type={'date'}
                                    label={'Дата создания'}
                                    value={pagesStore.creationDate}
                                    onChange={(val) => pagesStore.setCreationDate(val)}
                                />
                            }
                        />
                        <ColApp
                            body={
                                <FormControlApp
                                    classes={'home-from-control'}
                                    id={'creator'}
                                    label={'Создатель'}
                                    value={pagesStore.creator}
                                    onChange={(val) => pagesStore.setCreator(val)}
                                    placeholder={'Создатель'}

                                />
                            }
                        />
                    </Row>
                    <Button onClick={kok} className={'home-search-btn'}
                            variant="outline-primary">Найти</Button>{' '}
                </Form>

            </Card.Body>
            <Card.Body className={'home-card-body'}>
                <Card.Title><strong>Текущие заявки</strong></Card.Title>
                <br/>
                <TablePatent/>
            </Card.Body>
        </Card>
    )
})
