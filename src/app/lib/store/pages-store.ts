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
    idPatent: number

}

class PagesStore implements IPagesStore {
    demand: Demand[] = []
    patentContent: Demand[] = []
    name = ''
    creationDate = ''
    creator = ''
    typeFile = null
    idPatent = null
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
    setIdPatent(val: number) {
        this.idPatent = val
    }

    setDemand(val: Demand[]) {
        this.demand = val
    }
    setPatentContent(val: Demand[]) {
        this.patentContent = val
    }

    getPatent() {
        services.getApplication()
            .then((d) => this.setDemand(d))
            .catch(handlerError)
    }

    getPatentContent(row) {
        services.getApplicationById(row.id)
            .then((d) => {console.log(d)})
            .catch(handlerError)
    }
}

export default new PagesStore()
