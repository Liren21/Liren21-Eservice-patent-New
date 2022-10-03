import React, {useState} from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../lib/store/pages-store";
import ridStore from "../../../../lib/store/rid-store";
import Toaster from "../../../../../core/lib/toaster/toaster";
import {toast} from "react-toastify";


export default observer(() => {
    const [status, setStatus] = useState(true)
    const changeStatus = (val) => {
        setStatus(!val)
        new Toaster({ msg: 'Измените информацию', type: toast.TYPE.WARNING })
    }
    const changeSaveInfo = () => {
        setStatus(true)
        ridStore.PostUpdRid()
    }

        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title><strong> <i className="fa fa-info-circle" aria-hidden="true"/> Информация о
                            РИД</strong>
                            {
                                status
                                    ?
                                    <Button
                                        onClick={changeStatus}
                                        variant={'outline-primary'}
                                        style={{float: "right"}}><i
                                        className="fa fa-pencil" aria-hidden="true"/></Button> :
                                    <Button
                                        onClick={changeSaveInfo}
                                        variant={'outline-success'}
                                        style={{float: "right"}}><i
                                        className="fa fa-save" aria-hidden="true"/></Button>
                            }
                          </Card.Title>
                        <br/><br/>
                        <Card.Text>
                            <Form>
                                <Row>
                                    <FormControlApp
                                        disabled={status}
                                        classes={'home-from-control'}
                                        id={'name'}
                                        label={'Название объекта'}
                                        value={ridStore.name.length ? ridStore.name : pagesStore.patentContent['name']}
                                        onChange={(val) => ridStore.setName(val)}
                                        placeholder={pagesStore.patentContent['name']}
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
                                        label={'Заявитель'}
                                        value={ridStore.owner}
                                        onChange={(val) => ridStore.setOwner(val)}
                                        placeholder={pagesStore.patentContent['owner'] == '' ? pagesStore.patentContent['owner'] : 'Заявитель'}
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
    }
)
