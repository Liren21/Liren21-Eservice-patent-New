import React, { useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Card, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../lib/store/pages-store";


import abstractStore from "../../../../lib/store/abstract-store";
import Toaster from "../../../../../core/lib/toaster/toaster";
import {toast} from "react-toastify";


export default observer(() => {


    const [status, setStatus] = useState(true)


    const changeStatus = (val) => {
        setStatus(!val)
        new Toaster({msg: 'Измените информацию', type: toast.TYPE.INFO})
    }
    const changeSaveInfo = () => {
        abstractStore.PostUpdDateRef()
        setStatus(true)
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
                                    value={abstractStore.pcType.length ? abstractStore.pcType : pagesStore.patentContent['pcType']}
                                    onChange={(val) => abstractStore.setPcType(val)}
                                />
                                <br/>
                                <FormControlApp
                                    disabled={status}
                                    classes={'home-from-control'}
                                    id={'language'}
                                    label={'Язык'}
                                    value={abstractStore.language.length ? abstractStore.language : pagesStore.patentContent['language']}
                                    onChange={(val) => abstractStore.setLanguage(val)}

                                />
                                <br/>
                                <FormControlApp
                                    disabled={status}
                                    classes={'home-from-control'}
                                    id={'size'}
                                    label={'Объем программы'}
                                    value={abstractStore.size ? abstractStore.size : pagesStore.patentContent['size']}
                                    onChange={(val) => abstractStore.setSize(val)}

                                />
                                <br/>
                                <FormControlApp
                                    disabled={status}
                                    classes={'home-from-control'}
                                    id={'OS'}
                                    label={'Операционная система\n'}
                                    value={abstractStore.OS.length ? abstractStore.OS : pagesStore.patentContent['OS']}
                                    onChange={(val) => abstractStore.setOS(val)}
                                />
                                <br/>
                                <FormControlApp
                                    disabled={status}
                                    classes={'home-from-control'}
                                    id={'annotation'}
                                    label={'Анотации'}
                                    value={abstractStore.annotation.length ? abstractStore.annotation : pagesStore.patentContent['annotation']}
                                    onChange={(val) => abstractStore.setAnnotation(val)}
                                    as={'textarea'}
                                />
                            </Row>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
})
