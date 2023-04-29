class apiJoin {
    private static _instance: apiJoin
    apiPrefix: string
    host: string
    constructor() {
        this.apiPrefix = ''
        this.host = ''
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new apiJoin()
        }
        return this._instance
    }

    join(apiList: anyObj) {
        for (const key in apiList) {
            apiList[key] = this.host + this.apiPrefix + apiList[key]
        }
        return apiList
    }

    noPrefix(apiList: anyObj) {
        for (const key in apiList) {
            apiList[key] = this.host + apiList[key]
        }
        return apiList
    }
}

export default apiJoin.getInstance()