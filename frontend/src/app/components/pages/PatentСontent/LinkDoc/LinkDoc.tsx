import React from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import pagesStore from "../../../../lib/store/pages-store";



export default observer(() => {
        console.log(pagesStore.authors)
        console.log(pagesStore.patentContent)
        // const dataLink = [
        //     {
        //         title: 'Заявление',
        //         link: `document.docx?demandId=${pagesStore.patentContent['id']}`,
        //
        //     },
        //     {
        //         title: 'Обратная стороная заявления',
        //         link: `documentRev.docx?id=${pagesStore.patentContent['id']}`,
        //     },
        //     {
        //         title: 'Реферат',
        //         link: `report.docx?id=${pagesStore.patentContent['id']}`,
        //     },
        //     {
        //         title: 'Дополнительное заявление №1',
        //         link: `documentDop.docx?id=${pagesStore.patentContent['id']}`,
        //         status: 1
        //     },
        // ]
        // const data = [].concat(dataLink,pagesStore.authors)

        return (
            <>
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
                                    pagesStore.authors.map((d, k) => (
                                        <BodyLinkDoc d={d} k={k}/>
                                    ))
                                }
                            </Row>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </>
        )
    }
)
const BodyLinkDoc = (d) => {
    const data = d

    return (
        <div key={1}>


            <div
                style={{
                    background: 'rgba(0,0,0,0.09)',
                    padding: '1rem',
                    marginBottom: '.5rem',
                    borderRadius: '20px'
                }}
            >
                <Col style={{
                    textAlign: 'left',
                    verticalAlign: 'top',
                    display: 'inline-block',
                    fontSize: '1.2rem'
                }} md={11}>
                    Согласие на обработку сведений {data.d.surname}
                </Col>
                <Col style={{display: 'inline-block'}} md={1}>
                    <Button
                        href={`/patent/backend/agreementInfo.docx?id=${data.k}&appid=${pagesStore.patentContent['id']}`}
                        style={{float: 'right'}}
                        title={'Скачать'}>
                        <i className="fa fa-cloud-download" aria-hidden="true"/>
                    </Button>
                </Col>
            </div>

            <div
                style={{
                    background: 'rgba(0,0,0,0.09)',
                    padding: '1rem',
                    marginBottom: '.5rem',
                    borderRadius: '20px'
                }}
            >
                <Col style={{
                    textAlign: 'left',
                    verticalAlign: 'top',
                    display: 'inline-block',
                    fontSize: '1.2rem'
                }} md={6}>
                    Согласие {data.surname}
                </Col>
                <Col style={{display: 'inline-block'}} md={6}>
                    <Button
                        href={`/patent/backend/agreement.docx?id=${data.id}&appid=${pagesStore.patentContent['id']}`}
                        style={{float: 'right'}}
                        title={'Скачать'}>
                        <i className="fa fa-cloud-download" aria-hidden="true"/>
                    </Button>
                </Col>
            </div>

        </div>
    )
}