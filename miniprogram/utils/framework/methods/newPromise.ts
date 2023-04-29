/**
 * 封装promise方法并添加finally
 * @param {*} callback 要在promise里运行的方法
 * @returns 返回promise对象
 */

type callBack = (resolve: resolve, reject: reject) => void

function newPromise(callback?: callBack): any {
    if (callback) {
        return new Promise((resolve, reject) => {
            callback(resolve, reject)
        });
    } else {
        return Promise
    }
}

export default newPromise