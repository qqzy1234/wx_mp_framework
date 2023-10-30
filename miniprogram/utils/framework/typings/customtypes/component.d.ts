interface customOptions extends WechatMiniprogram.Component.Options<
    WechatMiniprogram.Component.DataOption,
    WechatMiniprogram.Component.PropertyOption,
    WechatMiniprogram.Component.MethodOption,
    WechatMiniprogram.IAnyObject,
    false
> {
    eventListen: {
        onTap?: () => void,
        onEvent?: () => void,
        [key: string]: any
    }
}