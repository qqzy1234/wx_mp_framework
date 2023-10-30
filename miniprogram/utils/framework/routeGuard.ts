/**
 * 路由拦截器(路由守卫)
 * 此处可以对跳转事件进行拦截（比如用户身份需满足什么条件才能跳转或者配置路由黑白名单）
 * @param url 要跳转到的目标页面path
 */
 export default function routeGuard(url: string): boolean | String {
    return true
}