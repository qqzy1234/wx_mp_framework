/// <reference path="./types/index.d.ts" />
/// <reference path="./customtypes/index.d.ts" />

type IAnyObject = WechatMiniprogram.IAnyObject

type anyObj = {
    [key: string]: any
}

type AccountInfo = WechatMiniprogram.AccountInfo

type resolve = (value?: unknown) => void
type reject = (reason?: any) => void

type success = WechatMiniprogram.NavigateToSuccessCallbackResult
type fail = WechatMiniprogram.GeneralCallbackResult

type icon = 'success' | 'error' | 'loading' | 'none'

interface customWx extends WechatMiniprogram.Wx {
    qy: anyObj,
}

interface customSysInfo extends WechatMiniprogram.SystemInfo {
    environment: string
}