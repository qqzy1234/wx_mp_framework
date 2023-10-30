import common from "./common"

export default class app extends common {
    constructor() {
        super()
        this.callerName = 'app'
    }

    addProxy(): any {
        let self = this
        return this.createProxy(App, (target: Function, thisArg: AnyObject, argArray: any[]) => {
            self.addParam(argArray[0])
            self.reflect(target, thisArg, argArray)
        })
    }
}