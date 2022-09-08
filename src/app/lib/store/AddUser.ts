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
    getAddExisting() {
        services.addExistingUser(this.newName, this.newSurname,this.newLastname,this.newBirthday)
            .then(() => {})
            .catch(handlerError)
    }
}

export default new AddUser()
