// pages/main/main.js
Page({
  data:{
    tittle:'',
    content:''
  },
  onLoad:function(options){
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
  addEssay:function(){
    console.log(wx.getStorageSync('id'))
    if(this.data.tittle==''){
         return false;
    }
    if(this.data.content==''){
         return false;
    }
     wx.request({
                      url: 'https://zhaoxiaoyuer.com/api/essay/addEssay',
                      data: {
                          title:this.data.tittle,
                          content:this.data.content,
                          essayType:'1',
                          uId:wx.getStorageSync('id')
                      }, 
                      method:'post',         
                      header: {
                          'content-type': 'application/json'
                      },
                      success: function(res) {
                            that.setData({
                               essays:res.con
                          })                                                                 
                      }
      });
  },
  tittlebind:function(e){
      this.setData({
        tittle:e.detail.value
      })
  },
   contentbind:function(e){
      this.setData({
        content:e.detail.value
      })
  }
})