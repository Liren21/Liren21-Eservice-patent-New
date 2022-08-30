import { Global, IGlobal } from '../../../core/lib/models/global'



export interface IDemandAuthor extends IGlobal {
    address: string
    email: string
    phone: string
    work: string
    position: string
    department: string
    series: string
    number: string
    whoGave: string
    date: string
    citizenship: string
    contribution: string
    isCreator: number
    isLeader: number
}

export default class DemandAuthor extends Global<IDemandAuthor, DemandAuthor> implements IDemandAuthor {
    address: string
    email: string
    phone: string
    work: string
    position: string
    department: string
    series: string
    number: string
    whoGave: string
    date: string
    citizenship: string
    contribution: string
    isCreator: number
    isLeader: number

    constructor(obj: IDemandAuthor) {
        super(obj)

    }


}
