import { Global, IGlobal } from '../../../core/lib/models/global'

export interface ITypesPatent extends IGlobal {
    value: number
    description: string
}

export default class TypesPatent extends Global<ITypesPatent, TypesPatent> implements ITypesPatent {
    value: number
    description: string

    constructor(obj: ITypesPatent) {
        super(obj)
    }
}
