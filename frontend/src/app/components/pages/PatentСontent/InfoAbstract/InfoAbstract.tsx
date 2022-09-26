import React, {useState} from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../lib/store/pages-store";
import ridStore from "../../../../lib/store/rid-store";

import abstractStore from "../../../../lib/store/abstract-store";


export default observer(() => {

    // const [pcType, setPcType] = useState('')
    // const [language, setLanguage] = useState(pagesStore.patentContent['language'])
    // const [OS, setOS] = useState(pagesStore.patentContent['OS'])
    const [status, setStatus] = useState(true)

    // const [size, setSize] = useState()
    // const [OS, setOS] = useState()

    // const dataJob = {
    //     work: work,
    //     position: position,
    //     department: department,
    //     isLeader: row.isLeader,
    //     isCreator: row.isCreator,
    //
    // }
    const changeStatus = (val) => {
        setStatus(!val)
    }
    const changeSaveInfo = (val) => {
        setStatus(true)
        ridStore.PostUpdInfoRid()
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <strong>
                            <i className="fa fa-info-circle" aria-hidden="true"/> Сведения для реферата
                            {
                                status
                                    ?
                                    <Button
                                        onClick={changeStatus}
                                        variant={'primary'}
                                        style={{float: "right"}}><i
                                        className="fa fa-pencil" aria-hidden="true"/></Button> :
                                    <Button
                                        onClick={changeSaveInfo}
                                        variant={'success'}
                                        style={{float: "right"}}><i
                                        className="fa fa-save" aria-hidden="true"/></Button>
                            }
                        </strong>
                    </Card.Title>
                    <br/><br/>
                    <Card.Text>
                        <Form>
                            <Row>
                                <FormControlApp
                                    disabled={status}
                                    classes={'pcType'}
                                    id={'pcType'}
                                    label={'Тип ЭВМ'}
                                    value={abstractStore.pcType}
                                    onChange={(val) => abstractStore.setPcType(val)}
                                />
                                <br/>
                                <FormControlApp
                                    disabled={status}
                                    classes={'home-from-control'}
                                    id={'objType'}
                                    label={'Вид объекта'}
                                    value={ridStore.objType.length ? ridStore.objType : pagesStore.patentContent['objType']}
                                    onChange={(val) => ridStore.setObjType(val)}
                                    placeholder={pagesStore.patentContent['objType']}
                                />
                                <br/>

                                <FormControlApp
                                    disabled={status}
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
                                    disabled={status}
                                    classes={'home-from-control'}
                                    id={'owner'}
                                    label={'Аннотация'}
                                    value={ridStore.owner}
                                    onChange={(val) => ridStore.setOwner(val)}
                                    as={'textarea'}
                                />
                                <br/>
                                <FormControlApp
                                    disabled={status}
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
