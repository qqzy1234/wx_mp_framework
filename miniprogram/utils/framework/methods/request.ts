import newPromise from './newPromise'
import { config } from '../../config'
import errorPrompt from '../globalRequesterrorPrompt'
/**
 * 封装wx.request方法
 */
class Request {
    interceptors: Array<object>
    requestSetting: object
    responseSetting: responseSetting
    requestTask: AnyObject

    constructor() {
        this.interceptors = []
        this.requestSetting = {}
        this.responseSetting = {}
        this.requestTask = {}
    }
    // 注入拦截器
    use(obj: interceptors) {
        let interceptors: AnyObject = {}
        if (obj.request) {
            interceptors['request'] = obj.request
        }
        if (obj.response) {
            interceptors['response'] = obj.response
        }
        let arr = Object.keys(interceptors);
        if (arr.length != 0) {
            this.interceptors.push(interceptors)
        }
        if (obj.setting && obj.setting.request) {
            this.requestSetting = Object.assign(this.requestSetting, obj.setting.request)
        }
        if (obj.setting && obj.setting.response) {
            this.responseSetting = Object.assign(this.responseSetting, obj.setting.response)
        }
    }

    getToken() {
        let app = getApp()
        return app.globalData.token
    }
    get(url = '', data = {}, header = {}) {
        return this.request('GET', header, url, data)
    }
    post(url = '', data = {}, header = {}) {
        return this.request('POST', header, url, data)
    }
    put(url = '', data = {}, header = {}) {
        return this.request('PUT', header, url, data)
    }
    getTask() {
        return this.requestTask
    }

    // 使用拦截器
    useInterceptors(type: string, promise: Promise<unknown>) {
        this.interceptors.forEach((fun: any) => {
            promise = promise.then(value => {
                if (fun[type]) {
                    let result = fun[type](value)
                    if (result && !result.success) {
                        return newPromise().reject(result)
                    }
                    if (result && result.success) {
                        return newPromise().resolve(value)
                    }
                } else {
                    return newPromise().resolve(value)
                }
            })
        });
        return promise
    }

    // 返回结果和提示信息
    getResult(success: boolean, backerr: boolean = true, errorMsg: string = '', fn?: () => void) {
        return {
            success: success,
            errorMsg: errorMsg,
            backerr: backerr,
            fn: fn
        }
    }

    // 请求
    request(method: requestMethod, header = {}, url: string, data: object, tips?: string) {
        const that = this
        // 合并拦截器中的请求配置
        let requestObj: RequestOption = Object.assign({
            url: url,
            //在header中统一封装报文头，这样不用每个接口都写一样的报文头定义的代码
            header: Object.assign({
                "Content-Type": "application/json",
                "Pandora-Token": that.getToken()
            }, header),
            data,
            method,
            timeout: config.overtime,
        }, this.requestSetting)

        let promise = newPromise().resolve()

        // 执行请求拦截器
        promise = this.useInterceptors('request', promise)

        // 执行http请求
        promise = promise.then(() => {
            return newPromise(function (resolve, reject) {
                // 请求成功
                requestObj['success'] = (res: requestSucc) => {resolve(res)}
                // 请求失败
                requestObj['fail'] = (res: fail) => {reject(
                    errorPrompt.getInstance().failError(res, tips)
                )}
                requestObj['complete'] = () => {
                    // 清空拦截器
                    that.interceptors = []
                    that.requestSetting = {}
                    that.responseSetting = {}
                }
                // 发起请求
                that.requestTask = wx.request(requestObj)
            })
        })

        // 执行响应拦截器
        promise = this.useInterceptors('response', promise)
        
        // 执行默认操作
        promise = promise.then((value: any) => {
            let code = config.reqCode
            let runDefault = true
            // 配置拦截器中的响应配置
            if (that.responseSetting) {
                code = that.responseSetting.code ? that.responseSetting.code : code
                runDefault = that.responseSetting.runDefault ? that.responseSetting.runDefault : runDefault
            }
            
            let temp = url.split('/')
            let apiName = temp[temp.length - 2] + '/' + temp[temp.length - 1]
            
            if (value.statusCode == 200) {
                // 这里的判断条件可以根据实际接口返回的数据结构自定义
                if (runDefault) {
                    if (value.data.code === code) {
                        if (value.data.success) {
                            return newPromise().resolve(value.data)
                        } else {
                            return errorPrompt.getInstance().successError(value, apiName)
                        }
                    } else {
                        return errorPrompt.getInstance().codeError(value, apiName, url, data)
                    }
                }
            } else {
                return errorPrompt.getInstance().statusError(value, apiName, url, data)
            }
        })

        // 捕获错误
        promise = promise.catch((res: any) => {
            res.fn && res.fn()
            if (res.backerr) {
                console.error(res);
            }
        })

        return promise
    }
}

export default Request