import '../../../core/components/imports'
import './App.scss'
import * as React from 'react'
import HeaderApp from '../../../core/components/HeaderApp/HeaderApp'
import Router from '../Router/Router'
import { registerLocale } from 'react-datepicker'
import { ToastContainer } from 'react-toastify'
import ru from 'date-fns/locale/ru'
import { LoaderOverlay } from '../../../core/components/LoaderOverlay/LoaderOverlay'
import { Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite' // the locale you want
import appStore from '../../../core/lib/store/app'

export const App = observer((): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    registerLocale('ru', ru)

    const optionsToaster = {
        autoClose: 8000,
        toastClassName: 'toast-style',
    }

    return (
        <div className={'app'}>
            <HeaderApp />
            <Container>
                <LoaderOverlay loading={appStore.loading} />
                <Router />
            </Container>
            <ToastContainer {...optionsToaster} />
            <LoaderOverlay loading={appStore.loading} />
        </div>
    )
})
