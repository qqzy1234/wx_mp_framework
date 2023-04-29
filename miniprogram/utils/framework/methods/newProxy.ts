/**
 * 
 * @param {*} target 要拦截的对象
 * @param {*} handler 要进行的操作
 */
 export default function newProxy(target: any, handler: ProxyHandler<any>) {
    return new Proxy(target, handler)
}