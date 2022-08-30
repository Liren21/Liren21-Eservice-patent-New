

import './LoaderOverlay.scss'
import 'react-overlay-loader/styles.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Loader, LoadingOverlay } from 'react-overlay-loader'
import React from 'react'

interface ILoaderOverlayProps {
    loading: boolean
}

export const LoaderOverlay = (props: ILoaderOverlayProps): JSX.Element => {
    return (
        <div>
            <LoadingOverlay className={'overlay-loader'}>
                <Loader text={'Загрузка'} loading={props.loading} />
            </LoadingOverlay>
        </div>
    )
}
