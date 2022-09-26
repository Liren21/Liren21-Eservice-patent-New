

// eslint-disable-next-line prettier/prettier
import * as React from 'react'
import { useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import headerStore from '../../lib/store/header-app'
import './HeaderApp.scss'
import coreUrls from '../../lib/core-urls'
import { handlerError } from '../../lib/api/common'

const HeaderApp = observer(() => {
    useEffect(() => {
        headerStore.checkAuthorized().catch(handlerError)
    }, [])

    return (
        <div className={'header-app'}>
            <Navbar expand={'sm'}>
                <Navbar.Brand className={'title'} href={coreUrls.DOMAIN}>
                    <strong>{headerStore.title} { headerStore.username }</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
                <Navbar.Collapse className={'justify-content-end'} id={'basic-navbar-nav'}>
                    <Nav>
                        {headerStore.legend.length ? (
                            <Nav.Link href={'#'} onClick={() => headerStore.setShowModalLegend(true)}>
                                <i className={'fa fa-quora'} title={'Легенда'} /> Легенда
                            </Nav.Link>
                        ) : null}
                        <Nav.Link style={{color:'#fff'}} href={'/'}>
                            <i className={'fa fa-star'} title={'Все сервисы'} /> Все сервисы
                        </Nav.Link>
                        {headerStore.isAuthorized ? (
                            <Nav.Link  style={{color:'#fff'}} href={coreUrls.LOGOUT}>
                                <i className={'fa fa-power-off'} title={'Выход'} /> Выход
                            </Nav.Link>
                        ) : (
                            <Nav.Link href={coreUrls.BACKEND}>
                                <i className={'fa fa-power-off'} title={'Вход'} /> Вход
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
})

export default HeaderApp
