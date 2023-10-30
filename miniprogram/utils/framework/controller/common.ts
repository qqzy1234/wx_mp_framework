import methods from "../methods"
import { config, api, noPrefixApi } from "../../config"
import addEventListen from "./tools/addEventListen"
import watch from "./tools/watch"
import lifeCycle from "./tools/lifeCycle"
import { lifeCycleEnum } from './tools/lifeCycleEnum'

enum event {
    onTap = 'onTap',
    onEvent = 'onEvent'
}
export default class common {
    callerName: String
    eventListen: AnyObject
    watch: AnyObject
    funType: any[]
    constructor() {
        this.callerName = ''
        this.eventListen = {}
        this.watch = {}
        this.funType = [String, Boolean, Number, Object, Array]
    }

    createProxy(obj: Function, callback: (target: Function, thisArg: AnyObject, argArray: any[]) => any) {
        return new Proxy(obj, {
            apply(target, thisArg, argArray) {
                return callback && callback(target, thisArg, argArray)
            },
        })
    }

    reflect(target: Function, thisArg: AnyObject, argArray: any[]) {
        return Reflect.apply(target, thisArg, argArray)
    }

    addParam(methods: AnyObject) {
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
                let reflect
                switch (this.callerName) {
                    case 'app':
                        if (methodName in lifeCycleEnum) {
                            lifeCycle.app(target, thisArg, argArray, self, configs, methodName, methods)
                        } else {
                            reflect = self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                        }
                        break;
                    case 'page':
                        new watch().addListenOfData(thisArg, self.watch)
                        if (methodName in lifeCycleEnum) {
                            lifeCycle.page(target, thisArg, argArray, self, configs, methodName, methods)
                        } else {
                            reflect = self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                        }
                        break;
                    default:
                        reflect = self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                        break;
                }
                return reflect
            }
            return self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
        })
    }

    handleObj(obj: AnyObject) {
        this.addParam(obj)
    }

    chaining(obj: AnyObject) {
        enum methodName {
            methods = 'methods',
            lifetime = 'lifetime',
            pageLifetime = 'pageLifetime',
            observer = 'observer',
            data = 'data',
            property = 'property',
            relation = 'relation',
            init = 'init'
        }
        let self = this
            
        for (const key in methodName) {
            obj[key] = self.createProxy(obj[key], (target: Function, thisArg: AnyObject, argArray: any[]) => {
                if (argArray.length == 1) {
                    argArray[0] = self.add2(argArray[0])
                } else if (argArray.length == 2) {
                    argArray[1] = self.add2(argArray[1])
                }
                return self.reflect(target, thisArg, argArray)
            })
        }         
    }

    add2(obj: AnyObject | AnyFunction) {
        let self = this        
        let configs = {app: getApp(), config, api, noPrefixApi}
        if (typeof obj == 'object') {
            for (const key in obj) {
                if (typeof obj[key] == 'function' && this.funType.includes(obj[key])) {
                    continue
                }
                obj[key] = self.add2(obj[key])
            }
        } else if(typeof obj == 'function') {
            return self.createProxy(obj, (target: Function, thisArg: AnyObject, argArray: any[]) => {
                let reflect = self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                self.add2(reflect)
                return reflect
            }) 
        }
        return obj
    }
}