import {makeAutoObservable} from 'mobx'
import TypesPatent from "../models/typesPatent";
import services from "../services/services";
import {handlerError} from "../../../core/lib/api/common";


interface IPagesStore {
    name: string
    creationDate: string
    typeFile: string

    typesFile: TypesPatent[]


}

class PagesStore implements IPagesStore {

    name = ''
    creationDate = ''

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

    AddPatent() {
        services.postUpdateAuthorJob(this.name,this.creationDate,this.typeFile.label)
            .then(() => {
            })
            .catch(handlerError)
    }
}

export default new PagesStore()
