/*
 * Copyright (c) Kolyada Nikita Vladimirovich <nikita.nk16@yandex.ru>  30.08.2021, 12:12
 */

import { getProp, setProp } from './service-storage'

const parseName = (...strings: string[]): string => {
    return strings.join('_')
}
export const getPage = (tableName: string): number => {
    return Number(getProp(parseName(tableName, 'page')))
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setPage = (tableName: string, value: any): void => {
    setProp(parseName(tableName, 'page'), value)
}

export const getSizePerPage = (tableName: string): number => {
    return getProp(parseName(tableName, 'sizePerPage'))
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setSizePerPage = (tableName: string, value: any): void => {
    setProp(parseName(tableName, 'sizePerPage'), value)
}

export const getPaginationSize = (tableName: string): number => {
    return getProp(parseName(tableName, 'paginationSize'))
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setPaginationSize = (tableName: string, value: any): any => {
    setProp(parseName(tableName, 'paginationSize'), value)
}
