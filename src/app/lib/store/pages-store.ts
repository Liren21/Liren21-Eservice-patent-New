import {makeAutoObservable} from 'mobx'
import routes from '../routes'
import TypesPatent from "../models/typesPatent";

interface IPagesStore {
    name: string
    creationDate: string
    typeFile: string
    creator: string
    typesFile: TypesPatent[]
}

class PagesStore implements IPagesStore {
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
}

export default new PagesStore()
