import React from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormControlApp from "../../../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../../../lib/store/pages-store";
import ColApp from "../../../../../../../core/components/ColApp/ColApp";


export default observer(() => {

    return (
        <div style={{display: 'inline-block'}}>
                  <Card.Title>Личная информация</Card.Title>
                  <br/>
            <Row>
                <Col>
                  <div style={{padding:'0 1%'}}>
                      <Card style={{ background: 'rgba(0,0,0,0.03)', borderColor: '#fff'}}>
                          <Card.Body> <Form.Check type="checkbox" label="Руководитель заявки"/></Card.Body>
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
                                              value={pagesStore.name}
                                              onChange={(val) => pagesStore.setName(val)}
                                              placeholder={'Название'}
                                          />
                                      </Col><Col sm>
                                      <FormControlApp
                                          classes={'home-from-control'}
                                          id={'Name'}
                                          label={'Имя'}
                                          value={pagesStore.name}
                                          onChange={(val) => pagesStore.setName(val)}
                                          placeholder={'Название'}
                                      />
                                  </Col><Col sm>
                                      <FormControlApp
                                          classes={'home-from-control'}
                                          id={'lastName'}
                                          label={'Отчество'}
                                          value={pagesStore.name}
                                          onChange={(val) => pagesStore.setName(val)}
                                          placeholder={'Название'}
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
                                                  id={'Number'}
                                                  label={'Номер телефона'}
                                                  value={pagesStore.name}
                                                  onChange={(val) => pagesStore.setName(val)}
                                                  placeholder={'Название'}
                                              />
                                          }
                                      />
                                      <ColApp
                                          body={
                                              <FormControlApp
                                                  style={{width: '100%'}}
                                                  classes={'home-from-control'}
                                                  id={'formGridZip'}
                                                  label={'Почтовый адрес'}
                                                  value={pagesStore.creationDate}
                                                  onChange={(val) => pagesStore.setCreationDate(val)}
                                              />
                                          }
                                      />
                                      <ColApp
                                          body={
                                              <FormControlApp
                                                  classes={'home-from-control'}
                                                  id={'email'}
                                                  label={'Электронный адрес'}
                                                  value={pagesStore.creator}
                                                  onChange={(val) => pagesStore.setCreator(val)}
                                                  placeholder={'Создатель'}

                                              />
                                          }
                                      />

                                  </Row>
                                  <br/>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                      <Form.Label>Вклад автора</Form.Label>
                                      <Form.Control style={{borderRadius: '15px'}} as="textarea" rows={3}/>
                                  </Form.Group>
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
