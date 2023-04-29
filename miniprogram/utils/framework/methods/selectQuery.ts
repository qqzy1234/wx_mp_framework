export default class selectQuery {
    constructor() {
        
    }

    getQueryObj(obj?: anyObj) {
        let object = obj ? obj : wx
        return object.createSelectorQuery()
    }

    getQuery(element: string, obj?: anyObj) {
        return this.getQueryObj(obj).select(element)
    }

    getQueryAll(element: string, obj?: anyObj) {
        return this.getQueryObj(obj).selectAll(element)
    }

    getQueryIn(component: anyObj, obj?: anyObj) {
        return this.getQueryObj(obj).in(component)
    }

    getQueryViewport(obj?: anyObj) {
        return this.getQueryObj(obj).selectViewport()
    }
}