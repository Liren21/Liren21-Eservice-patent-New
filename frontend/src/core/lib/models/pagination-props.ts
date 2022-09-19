/*
 * Copyright (c) Kolyada Nikita Vladimirovich <nikita.nk16@yandex.ru>  31.08.2021, 9:50
 */
import { Init } from './init'
import { getProp, setProp } from '../local-storage/service-storage'

interface IPaginationProps {
    id?: string
    alwaysShowAllBtns?: boolean
    tableName?: string
    custom?: boolean
    firstPageText?: string | JSX.Element
    firstPageTitle?: string
    hidePageListOnlyOnePage?: boolean
    hideSizePerPage?: boolean
    lastPageText?: string | JSX.Element
    lastPageTitle?: string
    nextPageText?: string | JSX.Element
    nextPageTitle?: string

    page?: number
    pageStartIndex?: number
    paginationSize?: number
    prePageText?: string | JSX.Element
    prePageTitle?: string
    showTotal?: boolean
    sizePerPage?: number
    sizePerPageList?: number[] | Array<{ text: string; value: number }>

    totalSize?: number
    withFirstAndLast?: boolean
}

export default class PaginationProps extends Init<IPaginationProps, PaginationProps> implements IPaginationProps {
    tableName?: string
    id?: string
    alwaysShowAllBtns?: boolean
    custom?: boolean
    firstPageText?: string | JSX.Element
    firstPageTitle?: string
    hidePageListOnlyOnePage?: boolean
    hideSizePerPage?: boolean
    lastPageText?: string | JSX.Element
    lastPageTitle?: string
    nextPageText?: string | JSX.Element
    nextPageTitle?: string

    page?: number
    pageStartIndex?: number
    paginationSize?: number
    prePageText?: string | JSX.Element
    prePageTitle?: string
    showTotal?: boolean
    sizePerPage?: number
    sizePerPageList?: number[] | Array<{ text: string; value: number }>

    totalSize?: number
    withFirstAndLast?: boolean

    constructor(obj: IPaginationProps) {
        super(obj)
        //
        // this.tableName = obj.tableName
        // this.alwaysShowAllBtns = obj.alwaysShowAllBtns
        // this.custom = obj.custom
        // this.firstPageText = obj.firstPageText
        // this.firstPageTitle = obj.firstPageTitle
        // this.hidePageListOnlyOnePage = obj.hidePageListOnlyOnePage
        // this.hideSizePerPage = obj.hideSizePerPage
        // this.lastPageText = obj.lastPageText
        // this.lastPageTitle = obj.lastPageTitle
        // this.nextPageText = obj.nextPageText
        // this.nextPageTitle = obj.nextPageTitle
        // this.page = obj.page
        // this.pageStartIndex = obj.pageStartIndex
        // this.paginationSize = obj.paginationSize
        // this.prePageText = obj.prePageText
        // this.prePageTitle = obj.prePageTitle
        // this.showTotal = obj.showTotal
        // this.sizePerPage = obj.sizePerPage
        // this.sizePerPageList = obj.sizePerPageList
        // this.totalSize = obj.totalSize
        // this.withFirstAndLast = obj.withFirstAndLast
    }

    load(): void {
        const temp = getProp(this.tableName)
        temp && this.resetInit(temp)
    }

    save(): void {
        const obj = Object.assign(this)
        delete obj.data
        delete obj.columns

        setProp(this.tableName, obj)
    }

    reset(obj: IPaginationProps): void {
        Object.keys(this).map((key) => {
            if (typeof this[key] !== 'function') {
                this[key] = obj[key]
            }
        })
    }
}
