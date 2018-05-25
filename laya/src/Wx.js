var WX = {
    _globalData: {},
    tunnelUrl: "",
}

var host = 'https://efbuv06s.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

WX.Init = (_globalData) => {
    WX._globalData = _globalData
    try {
        WX.tunnelUrl = config.service.tunnelUrl
    } catch (error) {
        console.log(error)
    }
}

WX.getOpenDataContext = () => {
    try {
        let ctx = wx.getOpenDataContext()
        return ctx
    } catch (e) {
        return null
    }
}

WX.uploadScore = (score) => {
    try {
        // let openDataContext = WX.getOpenDataContext()
        // if (openDataContext == null) return
        WX._globalData.openDataContext.postMessage({
            type: 'set_score',
            score: score
        })
    } catch (error) {
        return
    }
}

WX.getRank = () => {
    try {
        // let openDataContext = WX.getOpenDataContext()
        // if (openDataContext == null) return
        WX._globalData.openDataContext.postMessage({
            type: 'rank',
        })
    } catch (error) {
        return
    }
}

WX.openTunnel = () => {
    try {
        if (WX._globalData.tunnelStatus == 'connected') return

        console.log('WebSocket 信道连接中...', " tunnelUrl:", WX.tunnelUrl)
        // 创建信道，需要给定后台服务地址
        var tunnel = WX._globalData.tunnel = new qcloud.Tunnel(WX.tunnelUrl)

        // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
        tunnel.on('connect', () => {
        //util.showSuccess('信道已连接')
            console.log('WebSocket 信道已连接')
            WX._globalData.tunnelStatus = 'connected'
        })

        tunnel.on('close', () => {
        //util.showSuccess('信道已断开')
            console.log('WebSocket 信道已断开')
            WX._globalData.tunnelStatus = 'closed'
        })

        tunnel.on('reconnecting', () => {
        //util.showBusy('信道正在重连')
            console.log('WebSocket 信道正在重连...')
        })

        tunnel.on('reconnect', () => {
        //util.showSuccess('重连成功')
            console.log('WebSocket 信道重连成功')
        })

        tunnel.on('error', error => {
        //util.showModel('信道发生错误', error)
            console.error('信道发生错误：', error)
        })

        // 监听自定义消息（服务器进行推送）
        tunnel.on('rscore', msg => {
            console.log('收到榜单刷新', msg)
        // updateRealTimeRank(msg.who.nickName, msg.score)
        })

        // 监听自定义消息，用户上线下线（服务器进行推送）
        tunnel.on('people', msg => {
        if (msg.online){
            console.log('用户上线,', msg.who)
            if (msg.who.nickName != WX._globalData.userInfo.nickName){
            // util.showSuccess(msg.who.nickName + '上线')
            }
        }
        else if (msg.offline){
            console.log('用户下线,', msg.who)
            // removeRealTimeRank(msg.who.nickName)
        }
        else{
            console.log('未识别的消息,', msg)
        }
        })

        // 打开信道
        tunnel.open()

        WX._globalData.tunnelStatus = 'connecting'
    } catch (error) {
        console.log(error)
    }
}


WX.sendMessage = (cmd, msg) => {
    try {
        if (!window._globalData.tunnelStatus || !window._globalData.tunnelStatus === 'connected'){
            console.log("未连接信道，信道当前状态:", window._globalData.tunnelStatus)
            return
        }
        // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
        if (window._globalData.tunnel && window._globalData.tunnel.isActive()) {
            // 使用信道给服务器推送消息
            window._globalData.tunnel.emit(cmd, msg);
        }
        
    } catch (error) {
        
    }
}


WX.login = (callback) => {
    try {
        if (window._globalData.isLogin) return
        WX.showBusy('登录中...')
        qcloud.login({
            success: (result) => {
            if (result) {
                // util.showSuccess('登录成功')
                window._globalData.isLogin = true
                window._globalData.userInfo = result
                // console.log("登录成功")
            } else {
                // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                qcloud.request({
                url: config.service.requestUrl,
                login: true,
                success: (result) => {
                    // util.showSuccess('登录成功')
                    window._globalData.isLogin = true
                    window._globalData.userInfo = result.data.data
                    if (callback != undefined){
                        callback()
                    }
                },

                fail(error) {
                    // util.showModel('请求失败', error)
                    console.log('request fail', error)
                },
                complete () {
                    WX.closeShow()
                }
                })
            }
            },

            fail: (error) => {
            // util.showModel('登录失败', error)
                console.log('登录失败', error)
            }, 
            complete() {
                // util.closeShow()
            }
        })
    } catch (error) {
        
    }
}

WX.showBusy = text => {
    if (!IN_WX){
        return
    }
    wx.showToast({
        title: text,
        icon: 'loading',
        duration: 3000
    })
}

WX.closeShow = () => { 
    if (!IN_WX){
        return
    }
    wx.hideToast({})
}