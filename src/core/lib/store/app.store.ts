

import { makeAutoObservable } from 'mobx'

class AppStore {
    loading = false
    countEvent = 0

    constructor() {
        makeAutoObservable(this)
    }

    setLoading(val: boolean) {
        this.countEvent += val ? 1 : -1
        this.loading = this.countEvent > 0
    }
}

export default new AppStore()
