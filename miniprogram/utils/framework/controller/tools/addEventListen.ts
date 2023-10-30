import { config, api, noPrefixApi } from "../../../config"
import globalEventListen from '../../globalEventListen'
import methods from "../../methods"

// 添加事件监听
export default new class addEventListen {
    thisArg: AnyObject
    configs: AnyObject
    constructor() {
        this.thisArg = {}
        this.configs = {}
    }

    addListen(event: AnyObject, eventListen: AnyObject, thisArg: AnyObject) {
        this.configs = {app: getApp(), config, api, noPrefixApi}
        this.thisArg = thisArg
        if (event && event.type) {
            this.loop(globalEventListen.constructor.prototype, event)
            this.loop(eventListen, event)
        }
    }

    loop(listen: AnyObject, event: AnyObject) {
        let keys = Reflect.ownKeys(listen),
            self = this
        keys.forEach((res: any) => {
            if (res == 'onEvent') {
                listen[res].apply(self.thisArg, [event, self.thisArg, methods, self.configs])
            }
            if (res == 'on' + self.titleCase5(event.type)) {
                listen[res].apply(self.thisArg, [event, self.thisArg, methods, self.configs])
            }
        });
    }

    titleCase5(str: string) {  
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L: string) => L.toUpperCase());  
    }  
}