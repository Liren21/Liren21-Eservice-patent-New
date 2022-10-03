import {makeAutoObservable} from 'mobx'
import services from "../services/services";
import {handlerError} from "../../../core/lib/api/common";


interface IAddUser {
    newName: string
    newSurname: string
    newLastname: string
    newBirthday: string
    existingName: string
    existingSurname: string
    existingLastname: string
    existingBirthday: string
    foundAuthor: []

}

class AddUser implements IAddUser {
    newName = ''
    newSurname = ''
    newLastname = ''
    newBirthday = ''
    existingName = ''
    existingSurname = ''
    existingLastname = ''
    existingBirthday = ''
    foundAuthor: [] = []


    constructor() {
        makeAutoObservable(this)
    }

    setNewName(val: string) {
        this.newName = val
    }

    setNewSurname(val: string) {
        this.newSurname = val
    }

    setNewLastname(val: string) {
        this.newLastname = val
    }

    setNewBirthday(val: string) {
        this.newBirthday = val
    }

    setExistingName(val: string) {
        this.existingName = val
    }

    setExistingSurname(val: string) {
        this.existingSurname = val
    }

    setExistingLastname(val: string) {
        this.existingLastname = val
    }

    setExistingBirthday(val: string) {
        this.existingBirthday = val
    }

    setFoundAuthor(val: []) {
        this.foundAuthor = val
    }


    postAddExisting() {
        services.postSearchUser(this.existingName, this.existingSurname, this.existingLastname, this.existingBirthday)
            .then(() => {
            })
            .catch(handlerError)
    }

    postAddNew() {
        services.postAddNewUser(this.newName, this.newSurname, this.newLastname)
            .then(() => {
            })
            .catch(handlerError)
    }

    postAddEx() {
        // @ts-ignore
        services.postAddExAuthor( this.foundAuthor[0]['id'],this.foundAuthor[0]['peopleId'])
            .then(() => {

            })
            .catch(handlerError)
    }
    UpdateAuthorPersonal(dataPerson) {
        // @ts-ignore
        services.postUpdateAuthorPersonalInfo(dataPerson)
            .then(() => {

            })
            .catch(handlerError)
    }
    UpdateAuthorPassport(dataPassport) {
        // @ts-ignore
        services.postUpdateAuthorPassport(dataPassport)
            .then(() => {

            })
            .catch(handlerError)
    }
    UpdateAuthorJob(dataJob) {
        // @ts-ignore
        services.postUpdateAuthorJob(dataJob)
            .then(() => {

            })
            .catch(handlerError)
    }
}

export default new AddUser()
