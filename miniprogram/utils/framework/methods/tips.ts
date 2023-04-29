/**
 * 各种提示框/模态框
 */
import newPromise from './newPromise'

let tips = {
    modal: function (title: string, content: string, showCancel?: boolean) {
        return newPromise(function (resolve, reject) {
            wx.showModal({
                title: title ? title : '提示',
                content: content ? content : '',
                showCancel: showCancel ? showCancel : false,
                success(res) {
                    if (res.confirm) {
                        resolve('confirm')
                    } else if (res.cancel) {
                        resolve('cancel')
                    }
                }
            })
        })
    },
    showLoading: function (title: string = '加载中') {
        wx.showLoading({
            title: title,
        })
    },
    showToast: function (title: string, icon?: icon, duration?: number) {
        wx.showToast({
            title: title,
            icon: icon ? icon : 'success',
            duration: duration ? duration : 2000
        })
    },
    hideToast: function () {
        wx.hideToast()
    },
    hideLoading: function (noConflict = false) {
        wx.hideLoading({
            noConflict
        })
    }
}

export default tips