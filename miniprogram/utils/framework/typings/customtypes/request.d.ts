declare interface responseSetting {
    code?: number,
    runDefault?: boolean
}

declare interface interceptors {
    request?: () => object
    response?: () => object
    setting?: {
        request?: object,
        response?: object
    }
}

declare type requestMethod = "GET" | "POST" | "PUT" | "OPTIONS" | "HEAD" | "DELETE" | "TRACE" | "CONNECT" | undefined

declare type RequestOption = WechatMiniprogram.RequestOption<string | IAnyObject | ArrayBuffer>

declare type requestSucc = WechatMiniprogram.RequestSuccessCallbackResult<string | WechatMiniprogram.IAnyObject | ArrayBuffer>