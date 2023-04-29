import getAppId from './getAppId'

/**
 * 获取环境变量
 */
export default function getEnv() {
    let env: string = '',
        appid = getAppId.getAppId()
    if (appid == '') {
        env = 'dev'
    } else if (appid == '') {
        env = 'pro'
    }
    return env
}