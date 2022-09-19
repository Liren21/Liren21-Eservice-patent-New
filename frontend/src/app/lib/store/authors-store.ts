import {makeAutoObservable} from 'mobx'
import services from "../services/services";
import {handlerError} from "../../../core/lib/api/common";


interface IAuthors {
    surName: string
    name: string
    lastName: string
    birthday: string
    formGridZip: string
    email: string
    contAuthor: string
    number: number
    authorData: []

}

class Authors implements IAuthors {
    surName: string
    name: string
    lastName: string
    birthday: string
    formGridZip: string
    email: string
    contAuthor: string
    number: number
    authorData:[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setSurName(val: string) {
        this.surName = val
    }
    setName(val: string) {
        this.name = val
    }
    setLastName(val: string) {
        this.lastName = val
    }
    setBirthday(val: string) {
        this.birthday = val
    }
    setFormGridZip(val: string) {
        this.formGridZip = val
    }
    setEmail(val: string) {
        this.email = val
    }
    setContAuthor(val: string) {
        this.contAuthor = val
    }
    setNumber(val: number) {
        this.number = val
    }
    setAuthorsData(val: []) {
        this.authorData = val
    }
}

export default new Authors()
