import baseCommon from "./baseCommon"
import addBehaviors from "./tools/addBehaviors"

export default class page extends baseCommon {
    constructor() {
        super()
        this.callerName = 'page'
    }

    addProxy(): any {
        let self = this
        return this.createProxy(Page, (target: Function, thisArg: anyObj, argArray: any[]) => {
            addBehaviors(argArray)
            self.addParam(argArray[0])
            self.reflect(target, thisArg, argArray)
        })
    }
}