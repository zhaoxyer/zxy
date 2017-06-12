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
    wx.showLoading({
      title: '正在提交'
    })
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
                         wx.hideLoading();
                         if(res.data.code==0){
                             wx.showToast({
                                title: '添加成功',
                                icon: 'success',
                                duration: 2000,
                                color:'green'
                              });
                              setTimeout(function(){
                                  wx.navigateBack();
                              },3000)                          
                              return;
                         }
                           wx.showToast({
                                title: '添加失败',
                                icon: 'success',
                                color:'red',
                                duration: 4000
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