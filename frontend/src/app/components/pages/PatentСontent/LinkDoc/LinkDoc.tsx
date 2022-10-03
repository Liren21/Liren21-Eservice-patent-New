import React from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import pagesStore from "../../../../lib/store/pages-store";


export default observer(() => {

        console.log(pagesStore.authors)
    const data = [
        {
            title:'Заявление',
            link:`document.docx?demandId=${pagesStore.patentContent['id']}`
        },
    ]
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <strong>
                                <i className="fa fa-file-code-o" aria-hidden="true"/> Ссылки на документ
                            </strong>
                        </Card.Title>
                        <br/><br/>
                        <Card.Text>
                            <Form>
                                <Row>
                                    {
                                        data.map((d) => (
                                            <div key={1}>
                                                <div style={{
                                                    background: 'rgba(0,0,0,0.09)',
                                                    padding: '1rem',
                                                    margin: '.5rem',
                                                    borderRadius:'20px'
                                                }}>
                                                    <Col style={{
                                                        textAlign:'left',verticalAlign: 'top',display:'inline-block',fontSize:'1.2rem'}} md={6}>
                                                        {d.title}
                                                    </Col>
                                                    <Col style={{ display:'inline-block'}} md={6}>
                                                        <Button href={`/patent/backend/${d.link}`} style={{float: 'right'}} title={'Скачать'}>
                                                            <i className="fa fa-cloud-download"   aria-hidden="true"/>
                                                        </Button>
                                                    </Col>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Row>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    }
)
