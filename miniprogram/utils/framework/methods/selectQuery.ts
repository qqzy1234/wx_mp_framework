export default class selectQuery {
    constructor() {
        
    }

    getQueryObj(obj?: AnyObject) {
        let object = obj ? obj : wx
        return object.createSelectorQuery()
    }

    getQuery(element: string, obj?: AnyObject) {
        return this.getQueryObj(obj).select(element)
    }

    getQueryAll(element: string, obj?: AnyObject) {
        return this.getQueryObj(obj).selectAll(element)
    }

    getQueryIn(component: AnyObject, obj?: AnyObject) {
        return this.getQueryObj(obj).in(component)
    }

    getQueryViewport(obj?: AnyObject) {
        return this.getQueryObj(obj).selectViewport()
    }
}