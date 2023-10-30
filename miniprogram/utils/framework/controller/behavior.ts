import common from "./common"

class behavior extends common {
    static self: AnyObject
    constructor() {
        super()
        behavior.self = this
    }

    static Behavior(options: AnyObject) {
        behavior.self.addParam(options)
        return Behavior(options)
    }
}

new behavior()

export default behavior.Behavior