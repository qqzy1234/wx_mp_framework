import Login from "../../module/Login"
import store from "../../store/store"

enum applifeCycleName {
    onLaunch = 'onLaunch',
    onShow = 'onShow'
}
enum pagelifeCycleName {
    onLoad = 'onLoad',
    onShow = 'onShow'
}
export default class lifeCycle {
    constructor() {

    }

    static app(target: Function, thisArg: anyObj, argArray: any[], self: anyObj, configs: anyObj, key: string, methods: anyObj) {
        switch (key) {
            case applifeCycleName.onLaunch:
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
            case applifeCycleName.onShow:
                self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                break
            default:
                self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                break;
        }
    }
    
    static page(target: Function, thisArg: anyObj, argArray: any[], self: anyObj, configs: anyObj, key: string, methods: anyObj) {
        switch (key) {
            case pagelifeCycleName.onLoad:
                if (!methods.store.getGlobal('token')) {
                    methods.store.Login.loginReadyOnLoad = (app: anyObj) => {
                        self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                    }
                    return
                }
                self.reflect(target, thisArg, [...argArray, thisArg, methods, configs])
                break;
            case pagelifeCycleName.onShow:
                if (!methods.store.getGlobal('token')) {
                    methods.store.Login.loginReadyOnShow = (app: anyObj) => {
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