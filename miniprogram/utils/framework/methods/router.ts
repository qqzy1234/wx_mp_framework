import newPromise from './newPromise'
import routeGuard from '../routeGuard'

/**
 * 封装路由类
 */
export default class router {
    jumpRoute: Array<any>
    record: boolean

    constructor() {
        this.jumpRoute = []
        this.record = false
    }

    router(url: string, mode: keyof typeof wx, events?: any) {
        let that = this
        return newPromise(function (resolve, reject) {
            if (typeof mode == 'undefined') {
                mode = 'navigateTo'
            }
            (wx as AnyObject)[mode]({
                url: routeGuard(url) === true ? url : routeGuard(url),
                events: events,
                success: function (res: success | fail) {
                    if (that.record) {
                        that.jumpRoute.push(url.indexOf('?') != -1 ? url.split("?")[0] : url)
                    }
                    resolve(res)
                },
                fail: function (res: fail) {
                    reject(res)
                }
            })
        })
    }

    switchTab(url: string, param: object) {
        let newUrl = this.spliceParam(url, param)
        return this.router(newUrl, 'switchTab')
    }

    reLaunch(url: string, param: object) {
        let newUrl = this.spliceParam(url, param)
        return this.router(newUrl, 'reLaunch')
    }

    redirectTo(url: string, param: object) {
        let newUrl = this.spliceParam(url, param)
        return this.router(newUrl, 'redirectTo')
    }

    navigateTo(url: string, param: object = {}, events: any) {
        let newUrl = this.spliceParam(url, param)
        return this.router(newUrl, 'navigateTo', events)
    }

    navigateBack(num: number) {
        let that = this
        return newPromise(function (resolve, reject) {
            if (that.record) {
                that.jumpRoute.push(that.getRouterInfo('prevPage'))
            }
            wx.navigateBack({
                delta: num,
                success: function (res) {
                    resolve(res)
                },
                fail: function (res) {
                    reject(res)
                }
            })
        })
    }

    exit(option: AnyObject = {}) {
        return wx.exitMiniProgram(option)
    }

    openMini(...args: any[]) {
        if (args.length == 1 && typeof args[0] == 'object') {
            wx.navigateToMiniProgram(args[0])
        } else {
            newPromise(function (resolve, reject) {
                wx.navigateToMiniProgram({
                    appId: args[0],
                    path: args[1],
                    envVersion: args[2],
                    success(res) {
                        resolve(res)
                    },
                    fail(res) {
                        reject(res)
                    }
                })
            })
        }
    }

    // 拼接参数
    spliceParam(url: string, param: AnyObject) {
        let newUrl = url.indexOf('?') != -1 ? url : url + '?'
        for (const key in param) {
            let str = key + '=' + param[key]
            if (newUrl[newUrl.length - 1] == '?') {
                newUrl += str
            } else {
                newUrl += '&' + str
            }
        }
        return newUrl
    }

    // 获取路由信息
    getRouterInfo(type: string, path?: string) {
        let pages = getCurrentPages(),
            result
        switch (type) {
            case 'currentPath':
                let currentPage = pages[pages.length - 1] //获取当前页面的对象
                result = currentPage.route //当前页面url
                break;
            case 'prevPath':
                let prevPage = pages[pages.length - 2] //获取当前页面的对象
                result = prevPage.route
                break;
            case 'pagePathList':
                result = []
                pages.forEach(res => {
                    result.push(res.route)
                });
                break;
            case 'getParams':
                currentPage = pages[pages.length - 1]
                result = currentPage.options
                break;
            case 'pageObjList':
                result = pages
                break;
            case 'pageObj':
                if (path) {
                    for (let i = 0; i < pages.length; i++) {
                        if (pages[i].route == path) {
                            result = pages[i]
                            break
                        }
                    }
                } else {
                    console.error('请输入页面path！');
                }
                break
            default:
                result = ''
                break;
        }
        return result
    }

    // 开始记录跳转路线
    onRecordRoute(recordCurrentPage: boolean) {
        // 是否记录当前页面
        if (recordCurrentPage) {
            this.jumpRoute.push(this.getRouterInfo('currentPage'))
        }
        this.record = true
    }

    // 获取跳转路线
    getRoute() {
        return this.jumpRoute
    }

    // 停止记录跳转路线
    offRecordRoute() {
        this.record = false
    }
}