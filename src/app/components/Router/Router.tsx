

import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import React from 'react'

import { observer } from 'mobx-react-lite'
import routes from '../../lib/routes'
import Home from '../Home/Home'
import SimpleForm from '../pages/SimpleForm/SimpleForm'
import SelectForm from '../pages/SelectForm/SelectForm'
import ValidationForm from '../pages/ValidationForm/ValidationForm'
import SimpleTable from '../pages/SimpleTable/SimpleTable'
import EditTable from '../pages/EditTable/EditTable'
import ExpandableTable from '../pages/ExpandableTable/ExpandableTable'

const Router = observer(() => {
    return (
        <HashRouter basename={routes.HOME}>
            <Switch>
                <Route exact path={routes.HOME} component={Home} />
                <Redirect from="*" to={routes.HOME} />
            </Switch>
        </HashRouter>
    )
})

export default Router
