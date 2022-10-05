import React from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import pagesStore from "../../../../lib/store/pages-store";
import './LinkDoc.scss'



export default observer(() => {

    const dataLink = [
        {
            title: 'Заявление',
            link: `document.docx?demandId=${pagesStore.patentContent['id']}`,

        },
        {
            title: 'Обратная стороная заявления',
            link: `documentRev.docx?id=${pagesStore.patentContent['id']}`,
        },
        {
            title: 'Реферат',
            link: `report.docx?id=${pagesStore.patentContent['id']}`,
        },
        {
            title: 'Дополнительное заявление №1',
            link: `documentDop.docx?id=${pagesStore.patentContent['id']}authorId=`,
            status: 1
        },
    ]
    const data = [].concat(dataLink, pagesStore.authors)

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
                                data.map((d) => (
                                    <MyComponent title={d.title} url={d.link}/>
                                ))
                            }
                        </Row>
                    </Form>
                </Card.Text>
            </Card.Body>
        </>
    )
})
const MyComponent = observer(({title, url}: any) => {
    return (
        <div>
            <>
                <div
                    style={{marginBottom: '.8rem',}}
                >
                    <Col style={{
                        textAlign: 'left',
                        verticalAlign: 'top',
                        display: 'inline-block',
                        fontSize: '1.2rem'
                    }} md={11}>
                        {title}
                    </Col>
                    <Col style={{display: 'inline-block'}} md={1}>
                        <Button
                            className={'btn-download-doc'}
                            variant={"outline-primary"}
                            href={url}
                            style={{float: 'right'}}
                            title={'Скачать'}>
                            <i className="fa fa-cloud-download" aria-hidden="true"/>
                        </Button>
                    </Col>
                </div>

            </>
        </div>
    );
})

