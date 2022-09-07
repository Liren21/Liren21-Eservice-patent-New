import React from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../lib/store/pages-store";
import ridStore from "../../../../lib/store/rid-store";


export default observer(() => {


    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title><strong>Информация о РИД</strong> <Button
                        onClick={() => ridStore.PostUpdInfoRid()}
                        variant={'outline-primary'}
                        style={{float: "right"}}><i
                        className="fa fa-save" aria-hidden="true"/>Сохранить</Button></Card.Title>
                    <br/><br/>
                    <Card.Text>
                        <Form>
                            <Row>
                                <FormControlApp
                                    classes={'home-from-control'}
                                    id={'name'}
                                    label={'Название объекта'}
                                    value={ridStore.name.length ? ridStore.name : pagesStore.patentContent['name']}
                                    onChange={(val) => ridStore.setName(val)}
                                    placeholder={pagesStore.patentContent['name']}
                                />
                                <br/>
                                <FormControlApp
                                    classes={'home-from-control'}
                                    id={'objType'}
                                    label={'Вид объекта'}
                                    value={ridStore.objType.length ? ridStore.objType : pagesStore.patentContent['objType']}
                                    onChange={(val) => ridStore.setObjType(val)}
                                    placeholder={pagesStore.patentContent['objType']}
                                />
                                <br/>

                                <FormControlApp
                                    style={{width: '100%'}}
                                    classes={'home-from-control'}
                                    id={'createDate'}
                                    type={'date'}
                                    label={'Дата создания'}
                                    value={ridStore.createDate}
                                    onChange={(val) => ridStore.setCreateDate(val)}
                                    placeholder={pagesStore.patentContent['createDate']}
                                />
                                <br/>
                                <FormControlApp
                                    classes={'home-from-control'}
                                    id={'owner'}
                                    label={'Заявитель'}
                                    value={ridStore.owner}
                                    onChange={(val) => ridStore.setOwner(val)}
                                    placeholder={pagesStore.patentContent['owner'] == '' ? pagesStore.patentContent['owner'] : 'Заявитель'}
                                    as={'textarea'}
                                />
                                <br/>
                                <FormControlApp
                                    classes={'home-from-control'}
                                    id={'addressDemand'}
                                    label={'Адрес заявителя'}
                                    value={ridStore.addressDemand}
                                    onChange={(val) => ridStore.setAddressDemand(val)}
                                    placeholder={pagesStore.patentContent['addressDemand'] == '' ? pagesStore.patentContent['addressDemand'] : "Адрес заявителя"}
                                />
                            </Row>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
})
