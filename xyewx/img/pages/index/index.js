//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    essays: '',
    page:0,
    pagesize:10,
    imgUrls: [
      'https://zhaoxiaoyuer.com/wximg/banner/chun.jpg',
      'https://zhaoxiaoyuer.com/wximg/banner/dong.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
     circular:true,
    interval: 5000,
    duration: 1000,
    stop:false,
    scoolheight:''  
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
  //添加文章
 addEssay:function(){
   wx.navigateTo({
      url: '../addEssay/addEssay'
    }) 
 },
 //详情
 essayInf:function(event){
   console.log(event.currentTarget.dataset.essayid)
    wx.navigateTo({
      url: '../essayInf/essayInf?essayId='+event.currentTarget.dataset.essayid
    }) 
 } ,
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    wx.getSystemInfo({
      success: function(res) {
        var scoolheight=res.windowHeight-150;
        that.setData({
            scoolheight:scoolheight
        })   
      }
    })   
   this.lower();
      //
  },
  //上拉加载
  lower:function(){
     var that = this;
     if(that.data.stop){
       return;
     }
          //获取文章列表
        wx.request({
                          url: 'https://zhaoxiaoyuer.com/api/essay/findEssay',
                          data: {
                            page:that.data.page,
                            pagesize:that.data.pagesize
                          }, 
                          method:'post',         
                          header: {
                              'content-type': 'application/json'
                          },
                          success: function(res) {                         
                              if(!that.data.essays){
                                  that.setData({
                                    essays:res.data.con
                                  }) 
                              }else{
                                  console.log(that.data.essays)
                                  var essays=that.data.essays;
                                var essays=essays.concat(res.data.con);
                                that.setData({
                                    essays:essays
                                  }) 
                                  console.log(that.data.essays)
                              }                                                                                                                                  if(res.data.con.length<that.data.pagesize){
                                  that.setData({
                                    stop:true
                                  }) 
                              }else{                                
                                 that.data.page+=1;
                              }
                          }
          });
  }
})
