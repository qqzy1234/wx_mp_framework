export default function next(callback: () => void) {
    wx.nextTick(callback)
}