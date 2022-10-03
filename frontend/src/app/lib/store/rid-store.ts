import {makeAutoObservable} from 'mobx'
import services from "../services/services";
import {handlerError} from "../../../core/lib/api/common";


interface IRidStore {
    name: string
    objType: string
    createDate: string
    owner: string
    addressDemand: string
}

class RidStore implements IRidStore {
    name = ''
    objType = ''
    owner = ''
    addressDemand = ''
    createDate = ''

    constructor() {
        makeAutoObservable(this)
    }

    setName(val: string): void {
        this.name = val
    }

    setObjType(val: string): void {
        this.objType = val
    }

    setCreateDate(val: string): void {
        this.createDate = val
    }

    setOwner(val: string): void {
        this.owner = val
    }

    setAddressDemand(val: string): void {
        this.addressDemand = val
    }

    PostUpdRid() {
        services.postUpdInfoRid(this.name, this.addressDemand, this.objType, this.owner, this.createDate)
            .then((res) => res)
            .catch(handlerError)

    }

}

export default new RidStore()
