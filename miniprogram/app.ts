// app.ts
import baseController from "./utils/framework/baseController";

new baseController()

App<IAppOption>({
    // 当前小程序模式（小程序模式和企业微信模式）
    env: '',
    globalData: {},
    onLaunch() {
        
    },
})