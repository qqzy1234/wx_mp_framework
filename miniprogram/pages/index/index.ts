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
        onTap(e: anyObj) {
            console.log('点击了');
        }
    },

    navigateTo(e: anyObj, self: anyObj, methods: anyObj) {
        methods.router.navigateTo('/pages/logs/logs')
    },
    redirectTo(e: anyObj, self: anyObj, methods: anyObj) {
        methods.router.redirectTo('/pages/logs/logs')
    },
    reLaunch(e: anyObj, self: anyObj, methods: anyObj) {
        methods.router.reLaunch('/pages/logs/logs')
    }
})
