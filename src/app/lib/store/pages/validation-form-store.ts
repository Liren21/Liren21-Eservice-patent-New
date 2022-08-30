

import { makeAutoObservable } from 'mobx'

interface IValidationFormStore {
    login: string
    password: string
    age: number
    email: string
    date: string
    result: string
    validated: boolean
}

class ValidationFormStore implements IValidationFormStore {
    login = ''
    password = ''
    age = 0
    email = ''
    date = ''
    result = ''
    validated = false

    constructor() {
        makeAutoObservable(this)
    }

    setLogin(val: string) {
        this.login = val
    }

    setPassword(val: string) {
        this.password = val
    }

    setAge(val: number) {
        this.age = val
    }

    setEmail(val: string) {
        this.email = val
    }

    setDate(val: string) {
        this.date = val
    }

    setResult(val: string) {
        this.result = val
    }

    setValidated(val: boolean) {
        this.validated = val
    }
}

export default new ValidationFormStore()
