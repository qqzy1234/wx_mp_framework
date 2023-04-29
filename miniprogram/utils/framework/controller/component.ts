import common from "./baseCommon"
import addBehaviors from "./tools/addBehaviors"

export default class component extends common {
    constructor() {
        super()
        this.callerName = 'component'
    }

    addProxy(): any {
        let self = this
        return this.createProxy(Component, (target: Function, thisArg: anyObj, argArray: any[]) => {
            addBehaviors(argArray)
            self.addParam(argArray[0])
            self.reflect(target, thisArg, argArray)
        })
    }
}