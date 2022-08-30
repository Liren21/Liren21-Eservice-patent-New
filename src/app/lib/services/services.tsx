/* eslint-disable @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-unsafe-call*/

import axios from 'axios'

import urls from '../urls'
import {handlerError} from '../../../core/lib/api/common'
import Demand from "../models/demand";
import appStore from "../../../core/lib/store/app.store";


export default {
    async getApplication(name, creationDate,creator,typeFile): Promise<Demand[]> {
        appStore.setLoading(true)
        let result: Demand[]

        await axios
            .get(urls.GET_APPLICATION, {params: {name, creationDate,creator,typeFile}})
            .then((res) =>
                {console.log(res)}
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))

        return result
    }
}
