/// <reference path="./types/index.d.ts" />

interface IAppOption {
  [key: string]: any
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    [key: string]: any
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}