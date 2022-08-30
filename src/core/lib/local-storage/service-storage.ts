/*
 * Copyright (c) Kolyada Nikita Vladimirovich <nikita.nk16@yandex.ru>  30.08.2021, 12:13
 */
import settingsService from '../../../app/settings-service'

const mainStorageName = '__' + settingsService.name
const SPACER = '_'

export const getProp = (name: string): any => {
    const temp = localStorage.getItem(mainStorageName + SPACER + name)

    return JSON.parse(temp)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setProp = (name: string, value: any): void => {
    localStorage.setItem(mainStorageName + SPACER + name, JSON.stringify(value))
}
