# wx_mp_framework 微信小程序 基于原生写法的小架子和工具集合

## 开发初衷

### 自己在工作中需要使用原生方式来开发微信小程序 在开发过程中遇到了一些不太顺手的问题 比如： 
> 1. 我需要在用户打开小程序时自动执行登录操作然后在页面中的onload或者onshow生命周期方法中拿到登录接口返回的数据 这时生命周期方法总是会在登录接口返回之前执行 导致无法正确拿到数据
> 2. 在页面或者组件的方法中经常会碰到this指向错误
> 3. 微信小程序每个包有2M的限制 空间可以说寸土寸金 而我们在页面或者组件中如果需要使用某些工具类的话 就需要在每个需要使用的页面或组件中引入对应包 这就显得有些冗余

## 开发思路
> 1. 拦截（proxy）小程序本身的方法（App, Page, Component）获取这些方法的参数（options对象）
> 2. 拦截（proxy）参数（options）中所有的方法包括每一层对象中的方法
> 3. 给所有的方法注入三个参数 
>> 参数包括：
>>+ self: 当前页面或组件的this对象
>>+ methods: 所有工具类对象
>>+ config: 配置文件（包括config.js里的配置和getApp方法返回的对象）
>>
>> 这样就可以在每个方法中拿到全局的配置和工具类还可避免this指向问题
> 
> 4. 在拦截方法时判断是否是生命周期方法 
>>+ 在App方法的onlunch方法中执行登录操作
>>+ 在执行Page方法的onload和onshow方法时 在全局的app对象上建立对应的回调方法loginReadyOnLoad和loginReadyOnShow（我这里是建立在了我定义的store中）并且在两个方法中执行Reflect.apply操作（相当于将onload和onshow方法中的代码放进去）
>>+ 当登录接口返回后 执行loginReadyOnLoad和loginReadyOnShow
>>
>> 这样就可以在页面的生命周期方法中拿到登录接口返回的数据了

## 使用方式

### 第一步：把framework目录整体放到需要的目录中 我这里放到了utils目录下
### 第二步：在app.js文件中引入并初始化

```javascript
// app.js

import baseController from "./utils/framework/baseController";

new baseController()

```

## 工具类

+ 所有的工具类都可以单独拿出来使用

### 请求和响应

> 封装的`wx.require`方法

+ 发送请求

#### 示例代码：

```javascript
// 当前只写了三种请求 有需要的话可以在require.js中自行添加
// 发送请求
methods.DvRequest.get(url, data, [header]).then(res => {
    console.log(res);
}).catch(res => {
    console.log(res);
})

methods.DvRequest.post(url, data, [header]).then(res => {
    console.log(res);
}).catch(res => {
    console.log(res);
})

methods.DvRequest.put(url, data, [header]).then(res => {
    console.log(res);
}).catch(res => {
    console.log(res);
})
```

+ 拦截器

#### 示例代码：
```javascript
// 请求拦截器
methods.DvRequest.use({
    response: function (res) {
        return methods.DvRequest.getResult(success<bool>, [backerr]<Boolean>, [errorMsg]<string>, [fn])
    },
})
```
```javascript
// 响应拦截器
methods.DvRequest.use({
    request: function () {
        return methods.DvRequest.getResult(success<bool>,, [backerr]<Boolean>, [errorMsg]<string>, [fn])
    }
})
```
```javascript
// 添加配置
methods.DvRequest.use({
    setting: {
        response: {
            code: 20000, // 返回状态码
            runDefault: true // 是否执行默认的响应错误提示，默认true
        },
        request: {
            header: {}
        }
    }
})
```

+ 获取网络请求任务对象

```javascript
let getTask = methods.DvRequest.getTask()
```

### 路由

#### 示例代码：

```javascript
methods.DvRouter.navigateTo(path<string>, {
    // 一些参数
}, events)
methods.DvRouter.switchTab(path<string>, {
    // 一些参数
})
methods.DvRouter.reLaunch(path<string>, {
    // 一些参数
})
methods.DvRouter.redirectTo(path<string>, {
    // 一些参数
})
// 参数为返回的页数
methods.DvRouter.navigateBack(num<number>)
// 退出小程序（必须有点击事件）
methods.DvRouter.exit(option<Object>)
// 打开新的小程序
methods.DvRouter.openMini({appId, path, envVersion, ...})
// 或
methods.DvRouter.openMini(appId, path, envVersion)
// 获取路由信息
methods.router.getRouterInfo(type<string>, path?<string>)
```

+ `getRouterInfo`方法参数：
> currentPath： 获取当前页面的path
> 
> prevPath：获取上一个页面的path
> 
> pagePathList：获取所有页面的path列表
> 
> getParams：获取当前页面的所有参数（通过path带过来的）
> 
> pageObjList：获取所有页面的对象列表
>
> pageObj：获取指定path的页面对象（使用此参数时必须传入第二个参数）

### 各种提示框

```javascript
// 此方法返回一个promise
methods.modal(title<string>, content<string>, showCancel?<boolean>)
methods.showLoading(title<string>)
methods.hideLoading(noConflict<boolean>)
methods.showToast(title<string>, icon?<icon>, duration?<number>)
methods.hideToast()
```

# 代码下载后需要自行建立项目配置文件project.private.config.json和project.config.json