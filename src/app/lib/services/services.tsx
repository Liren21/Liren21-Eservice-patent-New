/* eslint-disable @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-unsafe-call*/

import axios from 'axios'

import urls from '../urls'
import {handlerError, handlerSuccess} from '../../../core/lib/api/common'
import Demand from "../models/demand";
import appStore from "../../../core/lib/store/app.store";
import pagesStore from "../store/pages-store";


export default {
    async getApplication(): Promise<Demand[]> {
        appStore.setLoading(true)
        let result: Demand[]

        await axios
            .get(urls.GET_APPLICATION)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    result = data ? data.map((d) => new Demand(d)) : []
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))

        return result
    },
    async getApplicationById(row): Promise<Demand[]> {
        appStore.setLoading(true)
        let result: Demand[]
        const url = `${urls.GET_APPLICATION_BY_ID}?id=${row}`

        await axios
            .get(url)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    pagesStore.setPatentContent(data)
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))

        return result
    }
}
