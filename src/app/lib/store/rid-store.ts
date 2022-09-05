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
        console.log(val)
    }

    setObjType(val: string): void {
        this.objType = val
    }

    setCreateDate(val: string): void {
        this.createDate = val
    }

    setOwner(val: string): void {
        this.owner = val
        console.log(val)
    }

    setAddressDemand(val: string): void {
        this.addressDemand = val
        console.log(val)
    }

    PostUpdInfoRid(name, addressDemand, objType, owner, createDate) {
        services.UpdInfoRid(name, addressDemand, objType, owner, createDate)
            .then((res) => console.log(res))
            .catch(handlerError)
    }

}

export default new RidStore()
