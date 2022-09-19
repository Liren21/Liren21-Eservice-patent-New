

import './ContainerApp.scss'
import React from 'react'
import Col from 'react-bootstrap/Col'
import { Row } from 'react-bootstrap'

interface IFormApp {
    lg?: number
    body: string | JSX.Element | (() => string | JSX.Element)
}

const ContainerApp = (props: IFormApp): JSX.Element => {
    return (
        <div className={'container-app'}>
            <Row>
                <Col />
                <Col lg={props.lg ? props.lg : 7}>{props.body}</Col>
                <Col />
            </Row>
        </div>
    )
}
export default ContainerApp
