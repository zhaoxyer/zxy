//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    if(wx.getStorageSync('id')){
      console.log(wx.getStorageSync('userInfo'))
        that.globalData.userInfo = wx.getStorageSync('userInfo');
         typeof cb == "function" && cb(that.globalData.userInfo)
        console.log( that.globalData.userInfo)
        return true;
    }
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{      
      //调用登录接口
      wx.login({
        success: function (data) {
          console.log(data.code)
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
               wx.setStorageSync('userInfo',res.userInfo);
              console.log(res.userInfo)
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });         
          //获取用户标识
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              js_code: data.code,
              secret:'e40f422826aa08d3118b2f8e37ba33b9',
              grant_type:'authorization_code',
              appid:'wx372930edab6958c2'
            },          
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              //微信注册            
                     wx.request({
                      url: 'https://zhaoxiaoyuer.com/users/wxRegister',
                      data: {
                        openid:res.data.openid,
                        nickname: that.globalData.userInfo.nickName,
                        avatarUrl:that.globalData.userInfo.avatarUrl
                      }, 
                      method:'post',         
                      header: {
                          'content-type': 'application/json'
                      },
                      success: function(res) {
                        console.log(res.data.id)
                          wx.setStorageSync('id',res.data.id);                                                                  
                      }
                    });
            }
          });
        //  
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})