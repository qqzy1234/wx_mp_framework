/**
 * 此文件是Behavior 用来实现双向绑定及赋值
 */
import newPromise from '../methods/newPromise'
import Behavior from '../controller/behavior'

module.exports = Behavior({
    data: {},
    methods: {
        inputBind(e: AnyObject, self: AnyObject) {
            // 赋值之前的方法
            let beforeFun: string = e.currentTarget.dataset.beforefun
            // 赋值之后的方法
            let afterFun: string = e.currentTarget.dataset.afterfun
            let id = e.currentTarget.id
            if (!id) {
                console.error('输入框id值为空！');
                return
            }
            if (beforeFun && Object.getPrototypeOf(self).hasOwnProperty(beforeFun)) {
                let proto: AnyObject = Object.getPrototypeOf(self)
                newPromise(function (resolve) {
                    resolve(proto[beforeFun].call(proto))
                }).then((res: any) => {
                    res ? setInput(id, res, () => {}, self) : setInput(id, e.detail.value, proto[afterFun], self)
                })
            } else {
                setInput(id, e.detail.value, self[afterFun], self)
            }
        },

        /**
         * 给页面data中对应的变量赋值
         * @param name 变量名
         * @param value 变量值
         * @param fn 回调函数
         */
        set(name: string, ...args: any[]): void {
            if (typeof name == 'object') {
                if (typeof args[0] == 'function') {
                    setter(name, args[0], args[1])
                } else {
                    setter(name, () => {}, args[0])
                }
            } else {
                if (typeof args[1] == 'function') {
                    setter({
                        [name]: args[0]
                    }, args[1], args[2])
                } else {
                    setter({
                        [name]: args[0]
                    }, () => {}, args[1])
                }
            }
        },
    }
})

function setter(obj: AnyObject, fn: () => any, self: AnyObject) {
    self.setData(obj, () => {
        fn && fn()
    })
}

function setInput(id: any, value: any, afterFun: () => any, self: AnyObject) {
    setter({
        [id]: value
    }, () => {
        afterFun && afterFun.call(self)
    }, self)
}