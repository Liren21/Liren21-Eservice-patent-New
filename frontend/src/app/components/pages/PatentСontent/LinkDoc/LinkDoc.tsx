import React from 'react'
import {observer} from 'mobx-react-lite'
import {Card, Form, Row} from "react-bootstrap";
import './LinkDoc.scss'
import DocLink from "./DocFactory/DocLink";
import DocAdditStatement from "./DocFactory/DocAdditStatement";
import DocApplication from "./DocFactory/DocApplication";
import DocAppReverse from "./DocFactory/DocAppReverse";
import DocAdditStatementRev from "./DocFactory/DocAdditStatementRev";


export default observer(() => {

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
                            <DocLink/>
                            <DocAdditStatement/>
                            <DocAdditStatementRev/>
                            <DocApplication/>
                            <DocAppReverse/>
                        </Row>
                    </Form>
                </Card.Text>
            </Card.Body>
        </>
    )
})


