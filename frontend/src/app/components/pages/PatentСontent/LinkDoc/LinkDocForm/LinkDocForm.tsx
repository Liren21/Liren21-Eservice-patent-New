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


                <div
                    className={'link-doc-form'}
                >
                    <Col className={'col-name'} md={11}>
                        {title}
                    </Col>
                    <Col className={'col-name'} md={1}>
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



    )
})


