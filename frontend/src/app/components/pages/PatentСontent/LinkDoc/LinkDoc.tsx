import React, { useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Card, Form, Row} from "react-bootstrap";
import pagesStore from "../../../../lib/store/pages-store";
import './LinkDoc.scss'
import LinkDocForm from "./LinkDocForm/LinkDocForm";
import {application, dataLink} from "./Data/Data";


export default observer(() => {
    const [count, setCount] = useState(0)
    const changeSetCount = () => {
        setCount(count + 1)
    }

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
                                dataLink.map((d) => (
                                    <>
                                        {
                                            d.title ?
                                                <LinkDocForm title={d.title}
                                                             url={d.link + pagesStore.patentContent['id']}/>
                                                :
                                                null
                                        }
                                    </>
                                ))
                            }
                            {
                                application.map((d, k) => (
                                    <>

                                        {
                                            pagesStore.authors.map((data) => (
                                              <>

                                                  <LinkDocForm title={d.title + ' ' + data.surname}
                                                               url={d.link + `${count}&appid=${pagesStore.patentContent['id']}`}/>

                                              </>
                                            ))
                                        }

                                    </>
                                ))
                            }
                        </Row>
                    </Form>
                </Card.Text>
            </Card.Body>
        </>
    )
})


