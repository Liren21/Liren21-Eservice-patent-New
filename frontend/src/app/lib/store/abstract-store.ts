import {makeAutoObservable} from 'mobx'
import services from "../services/services";
import {handlerError} from "../../../core/lib/api/common";


interface IAbstract {
    pcType: string
    language: string
    OS: string
    annotation: string
    createDate: string
    size: number

}

class Abstract implements IAbstract {

    pcType = ''
    language = ''
    OS = ''
    annotation = ''
    createDate = ''
    size = 0

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

    setAnnotation(val: string) {
        this.annotation = val
    }


    setSize(val: number) {
        this.size = val
    }

    PostUpdDateRef() {
        services.postUpdDateRef(this.pcType, this.language, this.OS, this.annotation, this.size)
            .then((res) => res)
            .catch(handlerError)

    }

}

export default new Abstract()
