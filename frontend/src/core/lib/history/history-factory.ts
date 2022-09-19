

import history from './create-hash-history'

export const clearLocation = (): void => {
    location.pathname = ''
    location.hash = ''
}

export const pushUrl = (url: string): void => {
    clearLocation()
    location.href = ''
    location.pathname = ''
    location.hash = url
    history.go(-1)
}

export const backUrl = (): void => {
    clearLocation()
    history.go(-1)
    history.go(-1)
}
