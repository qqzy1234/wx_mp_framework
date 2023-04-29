import app from "./controller/app"
import page from "./controller/page"
import component from "./controller/component"

export default class {
    constructor() {
        this.rewrite()
    }

    rewrite() {
        App = new app().addProxy()
        Page = new page().addProxy()
        Component = new component().addProxy()
    }
}