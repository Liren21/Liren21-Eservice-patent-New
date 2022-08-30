

import { makeAutoObservable } from 'mobx'
import rawGroups from '../../../../../test-data/groups'
import Group from '../../models/group'

interface IExpandTableStore {
    groups: Group[]
}

class ExpandTableStore implements IExpandTableStore {
    groups: Group[] = rawGroups.map((u) => new Group(u))

    constructor() {
        makeAutoObservable(this)
    }
}

export default new ExpandTableStore()
