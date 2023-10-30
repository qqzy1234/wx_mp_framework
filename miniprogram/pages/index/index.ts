// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
    data: {
        motto: 'Hello World'
    },
    onLoad() {
        
    },
    watch: {
        motto() {
            console.log(arguments);
            
        }
    },

    eventListen: {
        // 监听全部事件
        onEvent() {},
        // 监听点击事件
        onTap(e: AnyObject) {
            console.log('点击了');
        }
    },

    navigateTo(e: AnyObject, self: AnyObject, methods: AnyObject) {
        // methods.router.navigateTo('/pages/logs/logs')
        console.log(self.a());
        
    },
    redirectTo(e: AnyObject, self: AnyObject, methods: AnyObject) {
        methods.router.redirectTo('/pages/logs/logs')
    },
    reLaunch(e: AnyObject, self: AnyObject, methods: AnyObject) {
        methods.router.reLaunch('/pages/logs/logs')
    },

    a() {
        return 111
    }
})
