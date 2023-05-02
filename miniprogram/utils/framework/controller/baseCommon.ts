import methods from "../methods"
import { config, api, noPrefixApi } from "../../config"
import addEventListen from "./tools/addEventListen"
import watch from "./tools/watch"
import lifeCycle from "./tools/lifeCycle"

enum event {
    onTap = 'onTap',
    onEvent = 'onEvent'
}
export default class common {
    callerName: String
    eventListen: anyObj
    watch: anyObj
    funType: any[]
    constructor() {
        this.callerName = ''
        this.eventListen = {}
        this.watch = {}
        this.funType = [String, Boolean, Number, Object, Array]
    }

    createProxy(obj: Function, callback: (target: Function, thisArg: anyObj, argArray: any[]) => void) {
        return methods.newProxy(obj, {
            apply(target, thisArg, argArray) {
                callback && callback(target, thisArg, argArray)
            },
        })
    }

    reflect(target: Function, thisArg: anyObj, argArray: any[]) {
        Reflect.apply(target, thisArg, argArray)
    }

    addParam(methods: anyObj) {
        let self = this
        for (const key in methods) {
            if (typeof methods[key] == 'function') {
                if (this.funType.includes(methods[key])) {
                    continue
                }
                methods[key] = self.handleFun(methods[key], key)
            } else if (typeof methods[key] == 'object') {
                if (key == 'eventListen') {
                    self.eventListen = methods.eventListen
                    delete methods.eventListen
                }
                if (key == 'watch') {
                    self.watch = methods.watch
                    delete methods.watch
                }
                self.handleObj(methods[key])
            }
        }
    }

    handleFun(method: Function, methodName: string) {
        let self = this
        let configs = {app: getApp(), config, api, noPrefixApi}
        return self.createProxy(method, (target, thisArg, argArray) => {
            if (!(methodName in event)) {
                addEventListen.addListen(argArray[0], self.eventListen, thisArg)
                switch (this.callerName) {
                    case 'app':
                        lifeCycle.app(target, thisArg, argArray, self, configs, methodName, methods)
                        break;
                    case 'page':
                        new watch().addListenOfData(thisArg, self.watch)
                        lifeCycle.page(target, thisArg, argArray, self, configs, methodName, methods)
                        break
                    default:
                        self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                        break;
                }
                return
            }
            self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
        })
    }

    handleObj(obj: anyObj) {
        this.addParam(obj)
    }
}