import {makeAutoObservable} from 'mobx'


interface IAbstract {
    pcType: string
    language: string
    OS: string

}

class Abstract implements IAbstract {

    pcType: string
    language: string
    OS: string

    constructor() {
        makeAutoObservable(this)
    }

    setPcType(val: string) {
        this.pcType = val
        console.log(val)
    }

    setLanguage(val: string) {
        this.language = val
    }

    setOS(val: string) {
        this.OS = val
    }

}

export default new Abstract()
