const Koa=require('koa');
const path=require('path')
const bodyParser = require('koa-bodyparser');
const ejs=require('ejs');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default.js');
const router=require('koa-router')
const views = require('koa-views')
// const koaStatic = require('koa-static')
const staticCache = require('koa-static-cache')
const app = new Koa()

//session 存储配置
const seesionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}
//配置session中间件
app.use(session({
    key:'USER_SID',
    store: new MysqlStore(seesionMysqlConfig)
}))
// 配置静态资源加载中间件
// app.use(koaStatic(
//   path.join(__dirname , './public')
// ))
//缓存
app.use(staticCache(path.join(__dirname,'./public'),{
    dynamic:true
},{
    maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
  }))

  //配置服务端模板渲染引擎中间件

  app.use(views(path.join(__dirname,'./views'),{
      extension:'ejs'
  }))

  app.use(bodyParser({
      formLimit:'1mb'
  }))


  //路由
app.use(require('./routers/signin.js').routes())
app.use(require('./routers/signup.js').routes())
app.use(require('./routers/posts.js').routes())
app.use(require('./routers/signout.js').routes())
//增加页面用于上传和下载功能的测试
app.use(require('./routers/upload.js').routes())

app.listen(3000)

console.log(`VeraBlog back on ${config.port}`);