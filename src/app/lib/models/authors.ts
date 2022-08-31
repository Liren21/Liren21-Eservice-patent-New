import { Global, IGlobal } from '../../../core/lib/models/global'


export interface IAuthor extends IGlobal {

    peopleId: number | string
    peopleDate: string,
    surname: string,
    name: string,
    lastname: string,
    birthday: string,
    address: string,
    email: string,
    phone: string,
    work: string,
    position: string,
    department: string,
    series: string,
    number: string,
    whoGave: string,
    date: string,
    citizenship: string,
    contribution: string,
    isCreator: number,
    isLeader: number
}

export default class Authors extends Global<IAuthor, Authors> implements IAuthor {
    peopleId: number | string
    peopleDate: string
    surname: string
    name: string
    lastname: string
    birthday: string
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

    constructor(obj: IAuthor) {
        super(obj)
        console.log(this.address)
    }


}
