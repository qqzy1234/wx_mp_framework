import methods from "../../methods"
import { config, api, noPrefixApi } from "../../../config"

export default class watch {
    constructor() {

    }

    observer(data: any, key: string, val: any, fn: (newVal: any, val: any) => void) {
        Object.defineProperty(data, key, {
            configurable: true,
            get: function () {
                return val
            },
            set: function (newVal) {
                if (newVal === val) return
                fn && fn(newVal, val)
                val = newVal
            },
        })
    }

    addListenOfData(thisArg: anyObj, watch: anyObj) {
        let data = thisArg.data
        let self = this
        let configs = {app: getApp(), config, api, noPrefixApi}
        Object.keys(watch).forEach(res => {
            // 将watch中的属性以'.'切分成数组
            let key = res.split('.'); 
            // 将data赋值给nowData
            let nowData = data; 
            // 遍历key数组的元素，除了最后一个！
            for (let i = 0; i < key.length - 1; i++) { 
                // 将nowData指向它的key属性对象
                nowData = nowData[key[i]]; 
            }
            let lastKey = key[key.length - 1];
            let oldVal = nowData[lastKey]
            self.observer(nowData, lastKey, oldVal, function (newValue, oldValue) {
                watch[res].call(thisArg, newValue, oldValue, thisArg, methods, configs)
            })
        })
    }
}