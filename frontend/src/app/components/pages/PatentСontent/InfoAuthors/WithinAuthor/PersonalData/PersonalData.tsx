import React, {useState} from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../../core/components/FormControlApp/FormControlApp";
import ColApp from "../../../../../../../core/components/ColApp/ColApp"
import addUser from "../../../../../../lib/store/addUser";

interface IPersonalData {
    row: any
    cell: any
}

export default observer(({ row}: IPersonalData) => {
    const [surName, setSurName] = useState(row.surname)
    const [name, setName] = useState(row.name)
    const [lastName, setLastName] = useState(row.lastname)
    const [birthday, setBirthday] = useState(row.birthday)
    const [phone, setPhone] = useState(row.phone)
    const [address, setAddress] = useState(row.address)
    const [email, setEmail] = useState(row.email)
    const [contribution, setContribution] = useState(row.contribution)
    const [isCreator, setIsCreator] = useState(row.isCreator)

    const dataPerson = {
        surName: surName,
        name: name,
        lastName: lastName,
        birthday: birthday,
        phone: phone,
        address: address,
        email: email,
        contribution: contribution,
        isCreator: isCreator,
        isLeader: row.isLeader
    }

    const changeIsCreator = (val) => {
        val ? setIsCreator(1) : setIsCreator(0)
    }
    return (
        <div style={{display: 'inline-block'}}>
            <Card.Title>Личная информация</Card.Title>
            <br/>
            <Row>
                <Col>
                    <div style={{padding: '0 1%'}}>
                        <Card style={{background: 'rgba(0,0,0,0.03)', borderColor: '#fff'}}>
                            <Card.Body> <Form.Check checked={isCreator == 1} onClick={() => changeIsCreator(!isCreator)}
                                                    type="checkbox"
                                                    label="Руководитель заявки"/></Card.Body>
                        </Card>
                        <br/>
                        <Card style={{background: 'rgba(0,0,0,0.03)', borderColor: '#fff'}}>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col sm>
                                            <FormControlApp
                                                classes={'home-from-control'}
                                                id={'surName'}
                                                label={'Фамилия'}
                                                value={surName}
                                                onChange={(val) => setSurName(val)}

                                            />
                                        </Col><Col sm>
                                        <FormControlApp
                                            classes={'home-from-control'}
                                            id={'Name'}
                                            label={'Имя'}
                                            value={name}
                                            onChange={(val) => setName(val)}

                                        />
                                    </Col><Col sm>
                                        <FormControlApp
                                            classes={'home-from-control'}
                                            id={'lastName'}
                                            label={'Отчество'}
                                            value={lastName}
                                            onChange={(val) => setLastName(val)}

                                        />
                                    </Col>


                                    </Row>
                                    <br/>
                                    <Row>
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'Birthday'}
                                                    label={'Дата рождения'}
                                                    value={birthday}
                                                    onChange={(val) => setBirthday(val)}

                                                />
                                            }
                                        />

                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'phone'}
                                                    label={'Номер телефона'}
                                                    value={phone}
                                                    onChange={(val) => setPhone(val)}

                                                />
                                            }
                                        />
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    style={{width: '100%'}}
                                                    classes={'home-from-control'}
                                                    id={'address'}
                                                    label={'Почтовый адрес'}
                                                    value={address}
                                                    onChange={(val) => setAddress(val)}
                                                />
                                            }
                                        />
                                        <ColApp
                                            body={
                                                <FormControlApp
                                                    classes={'home-from-control'}
                                                    id={'email'}
                                                    label={'Электронный адрес'}
                                                    value={email}
                                                    onChange={(val) => setEmail(val)}
                                                    placeholder={'Создатель'}

                                                />
                                            }
                                        />

                                        <FormControlApp
                                            as={'textarea'}
                                            classes={'home-from-control'}
                                            id={'contribution'}
                                            label={'Вклад автора'}
                                            value={contribution}
                                            onChange={(val) => setContribution(val)}


                                        />

                                    </Row>
                                    <br/>
                                </Form>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Button
                            onClick={() => addUser.UpdateAuthorPersonal(dataPerson)}
                            style={{float: "right"}}>Сохранить</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
})
