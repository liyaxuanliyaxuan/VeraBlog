const router = require('koa-router')();
const userModel = require('../lib/mysql.js');
const md5 = require('md5')
const checkNotLogin = require('../middlewares/check.js').checkNotLogin
const checkLogin = require('../middlewares/check.js').checkLogin
const moment = require('moment');
const fs = require('fs')

//注册页面
router.get('/signup',async(ctx, next) => {
     await checkNotLogin(ctx)
     await ctx.render('signup',{
         session: ctx.session,
     })
})
//注册表单
//1、获取表单中的各个字段信息
//2、数据库查询
//3、写请求体
router.post('/signup',async(ctx, next) => {
    let {name, password, repeatpass, avator} = {...ctx.request.body}
    await userModel.findDataByName(name)
    .then(async (res) => {
        console.log(res);
        if(res.length){
            try{

                throw Error('用户已经存在')
            }catch(err){
                console.log(err);

            }
            ctx.body = {
                data: 1
            }
        }else if(password !== repeatpass || password === ''){
            ctx.body = {
                data: 2
            }

        }else{
            let base64Data = avator.replace(/^data:image\/\w+;base64,/, "");
            let dataBuffer = new Buffer(base64Data, 'base64');
            let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now()

            await fs.writeFile('./public/images/' + getName + '.png', dataBuffer, err => {
                if(err) throw(err);
                console.log('头像上传成功');
            });
            await userModel.insertData([name, md5(password), getName, moment().format('YYYY-MM-DD HH:mm:ss')])
            .then(res => {
                console.log('注册成功');
                ctx.body = {
                    data: 3
                }
            })

        }
    })

})

module.exports = router