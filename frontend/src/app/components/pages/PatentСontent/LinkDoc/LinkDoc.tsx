import React from 'react'
import {observer} from 'mobx-react-lite'
import { Card, Form, Row} from "react-bootstrap";
import pagesStore from "../../../../lib/store/pages-store";
import './LinkDoc.scss'
import LinkDocForm from "./LinkDocForm/LinkDocForm";
import {dataLink} from "./Data/Data";


export default observer(() => {


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
                                    <>
                                        {
                                            d.title ?
                                                <LinkDocForm title={d.title} url={d.link}/>
                                                :
                                                null
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


