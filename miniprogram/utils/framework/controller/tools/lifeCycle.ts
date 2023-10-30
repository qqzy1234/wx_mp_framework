import Login from "../../module/Login"
import store from "../../store/store"
import { lifeCycleEnum } from './lifeCycleEnum'

export default class lifeCycle {
    constructor() {

    }

    static app(target: Function, thisArg: AnyObject, argArray: any[], self: AnyObject, configs: AnyObject, key: string, methods: AnyObject) {
        switch (key) {
            case lifeCycleEnum.onLaunch:
                methods.store = new store(thisArg)
                Login.wxLogin(thisArg).then((res: any) => {
                    Login.userLogin(thisArg, res.code, () => {
                        for (const key in methods.store.Login) {
                            methods.store.Login[key](thisArg)
                        }
                    })
                })
                self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                break;
            case lifeCycleEnum.onShow:
                self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                break
            default:
                self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                break;
        }
    }
    
    static page(target: Function, thisArg: AnyObject, argArray: any[], self: AnyObject, configs: AnyObject, key: string, methods: AnyObject) {
        switch (key) {
            case lifeCycleEnum.onLoad:
                if (!methods.store.getGlobal('token')) {
                    methods.store.Login.loginReadyOnLoad = (app: AnyObject) => {
                        self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                    }
                    return
                }
                self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                break;
            case lifeCycleEnum.onShow:
                if (!methods.store.getGlobal('token')) {
                    methods.store.Login.loginReadyOnShow = (app: AnyObject) => {
                        self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                    }
                    return
                }
                self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                break
            default:
                self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                break;
        }
    }
}