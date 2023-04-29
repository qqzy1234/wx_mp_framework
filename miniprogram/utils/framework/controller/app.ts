import baseCommon from "./baseCommon"

export default class app extends baseCommon {
    constructor() {
        super()
        this.callerName = 'app'
    }

    addProxy(): any {
        let self = this
        return this.createProxy(App, (target: Function, thisArg: anyObj, argArray: any[]) => {
            self.addParam(argArray[0])
            self.reflect(target, thisArg, argArray)
        })
    }
}