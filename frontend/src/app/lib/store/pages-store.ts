import {makeAutoObservable} from 'mobx'
import TypesPatent from "../models/typesPatent";
import services from "../services/services";
import {handlerError} from "../../../core/lib/api/common";
import Demand from "../models/demand";
import abstractStore from "./abstract-store";
import Authors from "../models/authors";


interface IPagesStore {
    name: string
    creationDate: string
    typeFile: string
    creator: string
    typesFile: TypesPatent[]
    demand: Demand[]
    authors: Authors[]
    idPatent: number
    status: number

}

class PagesStore implements IPagesStore {
    demand: Demand[] = []
    patentContent: Demand[] = []
    authors: Authors[] = []
    name = ''
    creationDate = ''
    creator = ''
    typeFile = null
    idPatent = null
    status = 0
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

    setAuthors(val: Authors[]) {
        this.authors = val
    }

    setIdPatent(val: number) {
        this.idPatent = val
    }

    setStatus(val: number) {
        this.status = val
        console.log(val)
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
        services.getApplicationById(row)
            .then(() => {
            })
            .catch(handlerError)
    }

    UpdStatus() {
        console.log(this.patentContent)
        abstractStore.setPcType(this.patentContent['pcType'])
    }
}

export default new PagesStore()
