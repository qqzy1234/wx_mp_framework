// 需要在页面onLoad里执行登陆的页面
import apiJoin from './framework/methods/apiJoin'
import getEnv from './framework/methods/getEnv'

// 根据当前环境使用对用域名
apiJoin.host = getEnv() == 'dev' ? '' : ''
// 接口域名后的前缀
apiJoin.apiPrefix = ''

// 拼接前缀的api
export let api = apiJoin.join({
    login: 'open/login'
})

// 不拼接前缀的api
export let noPrefixApi = apiJoin.noPrefix({

})

// 其它配置
export let config = {
    host: apiJoin.host,
    // 接口返回的状态码（不是响应状态码）
    reqCode: 20000,
    // 接口超时时间
    overtime: 3000
}