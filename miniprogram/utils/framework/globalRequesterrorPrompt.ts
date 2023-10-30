// 全局请求错误提示
import newPromise from "./methods/newPromise"
import tips from "./methods/tips"

let { modal } = tips

class errorPrompt {
    private static _instance: errorPrompt

    constructor() {
        
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new errorPrompt()
        }
        return this._instance
    }

    // 本地网络链接失败错误
    failError(res: any, tips?: string) {
        return {
            backerr: true,
            errorCode: res.error,
            errorMsg: res,
            fn: () => {
                modal('提示', tips ? tips : "当前网络不稳，请刷新重试")
            }
        }
    }

    // code匹配success为false时的错误提示
    successError(value: any, apiName: string) {
        return newPromise().reject({
            backerr: true,
            errorCode: value.data.errCode,
            errorMsg: value.data.exception,
            fn: () => {
                modal('服务端提示', 'msg: ' + value.data.exception + ', api: ' + apiName)
            }
        });
    }

    // code不匹配时的错误提示
    codeError(value: any, apiName: string, url: string, data: AnyObject) {
        return newPromise().reject({
            backerr: true,
            errorCode: value.data.code,
            errorMsg: value.data.message,
            url: url,
            fn: () => {
                modal('服务端提示', 'code: ' + value.data.code + ', msg: ' + value.data.message + ', api: ' + apiName)
            }
        });
    }

    // 请求状态码非200时的错误提示（此提示不受拦截器限制）
    statusError(value: any, apiName: string, url: string, data: AnyObject) {
        return newPromise().reject({
            backerr: true,
            info: value,
            url: url,
            fn: () => {
                let msg = ''
                switch (value.statusCode) {
                    case 404:
                        msg = value.data.error
                        break;
                    case 500:
                        msg = value.data.message
                        break;
                    default:
                        msg = '服务端发生错误'
                        break;
                }
                modal('服务端提示', 'statusCode: ' + value.statusCode + ', msg: ' + msg + ', api: ' + apiName)
            }
        });
    }
}

export default errorPrompt