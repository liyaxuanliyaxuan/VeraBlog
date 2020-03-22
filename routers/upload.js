const router = require('koa-router')();
const userModel = require('../lib/mysql.js');
const md5 = require('md5')
const checkNotLogin = require('../middlewares/check.js').checkNotLogin
const checkLogin = require('../middlewares/check.js').checkLogin
const moment = require('moment');
const fs = require('fs')
const path = require('path')
const { uploadFile } = require('../util/uploadFile')

//注册页面
router.get('/upload',async(ctx, next) => {
    // await checkNotLogin(ctx)
     await ctx.render('upload',{
         session: ctx.session,
     })
})
router.post('/upload',async(ctx, next)=>{
    let result = { success: false }
    let serverFilePath = path.join( __dirname, 'upload-files' )

    // 上传文件事件
    result = await uploadFile( ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })

    ctx.body = result
})

module.exports = router