import common from "./common"
import addBehaviors from "./tools/addBehaviors"

export default class component extends common {
    constructor() {
        super()
        this.callerName = 'component'
    }

    addProxy(): any {
        let self = this
        return this.createProxy(Component, (target: Function, thisArg: AnyObject, argArray: any[]) => {
            let reflect = self.reflect(target, thisArg, argArray)
            if (argArray.length != 0) {
                addBehaviors(argArray)
                self.addParam(argArray[0])
            } else {
                self.chaining(reflect)
            }
            return reflect
        })
    }
}