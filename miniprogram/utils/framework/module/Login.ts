import methods from '../methods'
import { api } from '../../config'

let { newPromise, request, showLoading, hideLoading } = methods

/**
 * 封装wx登陆方法
 */
export default new class DvLogin {
    constructor() {
        
    }

    wxLogin(app: AnyObject) {
        return newPromise(function (resolve: resolve, reject: reject) {
            // 判断是哪个环境
            wx.getSystemInfo({
                success(res) {
                    if (!(res as customSysInfo).environment) {
                        app.env = 'wx';
                        // 登录
                        wx.login({
                            success(res) {
                                resolve(res)
                            },
                            fail(res) {
                                reject(res)
                            }
                        })
                    } else {
                        app.env = 'qy_wx';
                        (wx as customWx).qy.login({
                            success(res: success) {
                                resolve(res)
                            },
                            fail(res: fail) {
                                reject(res)
                            }
                        })
                    }
                }
            })
        })
    }
    // 调起登录接口
    userLogin(app: AnyObject, code: any, fn: () => void) {
        showLoading()
        request.get(api.login, {
            loginCode: code
        }).then((res: any) => {
            // 登录接口返回逻辑
        }).catch((r: any) => {
            console.error(r);
        }).finally(() => {
            fn && fn()
            hideLoading()
        })
    }
}