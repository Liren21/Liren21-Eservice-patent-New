

import { makeAutoObservable } from 'mobx'

interface ISimpleFormStore {
    userName: string
    info: string
}

class SimpleFormStore implements ISimpleFormStore {
    userName = ''
    info = ''

    constructor() {
        makeAutoObservable(this)
    }

    setUserName(val: string) {
        this.userName = val
    }

    setInfo(val: string) {
        this.info = val
    }

    handlerSubmit() {
        this.setInfo(this.userName)
    }
}

export default new SimpleFormStore()
