/**
 * 获取当前账号信息
 */
class accountInfo {
    private static _instance: accountInfo
    public accountInfo: AccountInfo

    constructor() {
        this.accountInfo = wx.getAccountInfoSync();
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new accountInfo()
        }
        return this._instance
    }

    getAccountInfo() {
        return this.accountInfo
    }
    // 获取appid
    getAppId() {
        return this.accountInfo.miniProgram.appId;
    }
    // 获取公众平台当前线上版本的版本号
    getVersion() {
        return this.accountInfo.miniProgram.version;
    }

    getVersionDev() {
        return '0.0.1'
    }
}

export default accountInfo.getInstance()