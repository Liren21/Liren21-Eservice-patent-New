import React from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Col,} from "react-bootstrap";
import './LinkDocForm.scss'
import coreUrls from "../../../../../../core/lib/core-urls";


interface ILinkDocForm {
    title: string
    url: string

}

export default observer(({title, url}: ILinkDocForm) => {


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
                            href={coreUrls.BACKEND + url}
                            style={{float: 'right'}}
                            title={'Скачать'}>
                            <i className="fa fa-cloud-download" aria-hidden="true"/>
                        </Button>
                    </Col>
                </div>

            </>
        </div>
    )
})


