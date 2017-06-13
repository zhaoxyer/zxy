// pages/main/main.js
Page({
  data:{
    essayId:'',
    con:'',
    comment:'',
    pushcontent:'',
    comshow:false,
    userBid:''
  },
  onLoad:function(options){
      var that = this;
    that.setData({ 
       essayId:options.essayId 
     });
      wx.request({
                    url: 'https://zhaoxiaoyuer.com/api/essay/findEssayInf',
                      data: {
                          essayId:options.essayId
                      }, 
                      method:'post',         
                      header: {
                          'content-type': 'application/json'
                      },
                      success: function(res) {
                            that.setData({
                               con:res.data.con
                          })                                                              
                      }
      });
      //
       wx.request({
                    url: 'https://zhaoxiaoyuer.com/api/essay/getComment',
                      data: {
                          essayId:options.essayId
                      }, 
                      method:'post',         
                      header: {
                          'content-type': 'application/json'
                      },
                      success: function(res) {
                        console.log(res.data.con.length)
                            that.setData({
                               comment:res.data.con
                          })                                                              
                      }
      });  
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){   
    // 页面关闭
    wx.navigateBack();
  },
   contentbind:function(e){
      this.setData({
        pushcontent:e.detail.value
      })
      console.log(this.data.pushcontent)
  },
  addCom:function(){
    var that=this;
    console.log(this.data.userBidt)
    
    if(this.data.pushcontent==''){
         return false;
    }
    var parm={
                          essayId:this.data.essayId,
                          content:this.data.pushcontent,
                          userBid:this.data.userBid,
                          parentId:this.data.con.uId._id,
                          uId:wx.getStorageSync('id')
                };
     wx.request({
                      url: 'https://zhaoxiaoyuer.com/api/essay/addComment',
                      data:parm, 
                      method:'post',         
                      header: {
                          'content-type': 'application/json'
                      },
                      success: function(res) {
                         that.setData({
                              comshow:!that.data.comshow
                          })   
                          wx.showToast({
                                title:res.data.msg ,
                                icon: 'success',
                                duration: 2000,
                                color:'green'
                              });                                                               
                      }
      });
  },
  comshow:function(){
     this.setData({
          comshow:!this.data.comshow
      })   
  },
  setuserBid:function(event){
    console.log(event)
    this.setData({
          userBid:event.currentTarget.dataset.userbid,
          comshow:true
      })  
  },
  comhide:function(){
    this.setData({
          comshow:false
      })  
  }
})