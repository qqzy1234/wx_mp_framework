import common from "./baseCommon"

class behavior extends common {
    static self: anyObj
    constructor() {
        super()
        behavior.self = this
    }

    static Behavior(options: anyObj) {
        behavior.self.addParam(options)
        return Behavior(options)
    }
}

new behavior()

export default behavior.Behavior