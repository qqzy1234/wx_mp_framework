import common from "./common"
import addBehaviors from "./tools/addBehaviors"

export default class page extends common {
    constructor() {
        super()
        this.callerName = 'page'
    }

    addProxy(): any {
        let self = this
        return this.createProxy(Page, (target: Function, thisArg: AnyObject, argArray: any[]) => {
            addBehaviors(argArray)
            self.addParam(argArray[0])
            return self.reflect(target, thisArg, argArray)
        })
    }
}