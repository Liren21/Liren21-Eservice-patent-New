import {Global, IGlobal} from '../../../core/lib/models/global'
import Authors from "./authors";
import DemandAuthor from "./demandAuthor";


export interface IDemand extends IGlobal {
    id?: string
    objType?: string
    name?: string
    surname?: string
    owner?: string
    createDate?: string
    pcType?: string
    language?: string
    annotation?: string
    OS?: string
    size?: number
    addressDemand?: string
    status?: number
    authors?: Authors[]
    existAuths?: DemandAuthor[]
    createAppDate?: string
    comment?: string
    // people_id: number,
    //people_date: string
}

export default class Demand extends Global<IDemand, Demand> implements IDemand {
    id?: string
    objType?: string
    name?: string
    surname?: string
    owner?: string
    createDate?: string
    pcType?: string
    language?: string
    annotation?: string
    OS?: string
    size?: number
    addressDemand?: string
    status?: number
    authors?: Authors[]
    existAuths?: DemandAuthor[]
    createAppDate?: string
    comment?: string
    // people_id: number,
    //people_date: string
    constructor(obj: IDemand) {
        super(obj)
        this.authors = obj.authors.map((e) => new Authors(e))
        // this.existAuths = obj.existAuths.map((e) => new DemandAuthor(e))


    }


}
