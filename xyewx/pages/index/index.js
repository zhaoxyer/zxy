//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '米拉多',
    userInfo: {},
    essays: [
],
    imgUrls: [
      'https://zhaoxiaoyuer.com/wximg/banner/chun.jpg',
      'https://zhaoxiaoyuer.com/wximg/banner/dong.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
     circular:true,
    interval: 5000,
    duration: 1000   
  },
  //事件处理函数
  praisenum: function(event) {
      console.log(event.currentTarget.dataset.essayid);             
     //点赞
     wx.request({
                      url: 'https://zhaoxiaoyuer.com/api/essay/praisenum',
                      data: {
                        essayId:event.currentTarget.dataset.essayid,
                        parentId:event.currentTarget.dataset.parentid,
                        uId:wx.getStorageSync('id')
                      }, 
                      method:'post',         
                      header: {
                          'content-type': 'application/json'
                      },
                      success: function(res) {
                                                                                          
                      }
      });
  },
 addEssay:function(){
   wx.navigateTo({
      url: '../addEssay/addEssay'
    }) 
 }, 
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });   
    //获取文章列表
     wx.request({
                      url: 'https://zhaoxiaoyuer.com/api/essay/findEssay',
                      data: {
                         page:0,
                         pagesize:20
                      }, 
                      method:'post',         
                      header: {
                          'content-type': 'application/json'
                      },
                      success: function(res) {
                            that.setData({
                               essays:res.data.con
                            })                                                                 
                      }
      });
      //
  }
})
