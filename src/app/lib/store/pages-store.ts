import {makeAutoObservable} from 'mobx'
import TypesPatent from "../models/typesPatent";
import services from "../services/services";
import {handlerError} from "../../../core/lib/api/common";
import Demand from "../models/demand";

interface IPagesStore {
    name: string
    creationDate: string
    typeFile: string
    creator: string
    typesFile: TypesPatent[]
    demand: Demand[]
}

class PagesStore implements IPagesStore {
    demand: Demand[] = []
    name = ''
    creationDate = ''
    creator = ''
    typeFile = null
    typesFile = [
        new TypesPatent({value: 0, description: 'Программа для ЭВМ'}),
        new TypesPatent({value: 1, description: 'База данных'})
    ]

    constructor() {
        makeAutoObservable(this)
    }

    setName(val: string) {
        this.name = val
    }

    setCreationDate(val: string) {
        this.creationDate = val
    }

    setType(val: string) {
        this.typeFile = val
    }

    setCreator(val: string) {
        this.creator = val
    }

    getPatent() {
        services.getApplication()
            .then()
            .catch(handlerError)
    }
}

export default new PagesStore()
