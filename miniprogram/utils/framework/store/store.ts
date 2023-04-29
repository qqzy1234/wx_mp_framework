export default class store {
    private _app: anyObj
    Login: anyObj
    constructor(app: anyObj) {
        this._app = app
        this.Login = {
            loginReadyOnLoad: function () {},
            loginReadyOnShow: function () {}
        }
        app['store'] = {}
    }

    get(key: string, data: anyObj) {
        let keyArr = key.split('.'),
            result: any
        if (data.hasOwnProperty(keyArr[0])) {
            result = data[keyArr[0]]
        } else {
            return null
        }
        keyArr.forEach((res: any, i: number) => {
            if (i != 0) {
                if (!result.hasOwnProperty(res)) {
                    result = null
                } else {
                    result = result[res]
                }
            }
        });
        return result
    }

    set(key: string, data: anyObj, value: any) {
        let keyArr = key.split('.'),
            result: any
        if (!data.hasOwnProperty(keyArr[0])) {
            if (keyArr.length == 1) {
                data[keyArr[0]] = value
            } else {
                data[keyArr[0]] = {}
            }
        }
        result = data[keyArr[0]]
        keyArr.forEach((res: any, i: number) => {
            if (i != 0) {
                if (i == keyArr.length - 1) {
                    result[res] = value
                } else {
                    if (!result.hasOwnProperty(res)) {
                        result[res] = {}
                    } else {
                        result = result[res]
                    }
                }
            }
        });
    }

    /**
     * 获取globalData
     * @param key 键值
     * @returns 
     */
    getGlobal(key: string) {
        return this.get(key, this._app.globalData)
    }

    setGlobal(key: string, value: any) {
        this.set(key, this._app.globalData, value)
    }

    getStore(key: string) {
        return this.get(key, this._app.store)
    }

    setStore(key: string, value: any) {
        this.set(key, this._app.store, value)
    }

    getStorage(key: string) {
        return wx.getStorageSync(key)
    }

    setStorage(key: string, value: any) {
        wx.setStorageSync(key, value)
    }
}