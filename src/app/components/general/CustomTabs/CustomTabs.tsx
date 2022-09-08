import React from 'react'

import {observer} from 'mobx-react-lite'
import './CustomTabs.scss'
import {Tabs, Tab} from "react-bootstrap";
import NewUser from "../../pages/PatentСontent/InfoAuthors/NewUser/NewUser";
import ExistingUser from "../../pages/PatentСontent/InfoAuthors/ExistingUser/ExistingUser";


export default observer(() => {

    return (
        <>
            <Tabs
                defaultActiveKey="0"
                id="fill-tab-example"
                className="mb-3"
                fill
            >
                <Tab eventKey="0" title="Существующий">
                    <ExistingUser/>
                </Tab>
                <Tab eventKey="1" title="Новый">
                    <NewUser/>
                </Tab>
            </Tabs>
        </>
    )
})
