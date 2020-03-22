## 搭建个人博客

#引用模块

1. koa-node框架
2. koa-bodyparser表单解析中间件
3. koa-mysql-session、koa-session-minimal处理数据库的中间件
4. koa-router路由中间件
5. koa-static静态资源中间件
6. ejs模板引擎
7. md5密码加密
8. MySQL数据库
9. markdown-it md文件语法
10. koa-views模板呈现中间件
11. chai mocha 测试
12. koa-static-cache文件缓存

#配置数据库默认信息（config/default.js）

#配置KOA基本的入口文件

- session配置：使用中间件，自动在数据库中建立一个名为`_mysql_session_store`的表，储存sessions；设置发送给请求方的_id
- 缓存配置：koa-static基于核心模块server-static，根据传入指定的文件目录比对请求资源的url，如果文件不存在，直接跳转到下一个中间件
- 使用post数据解析中间件：把koa2上下文的formData数据解析到ctx.request.body中
- 模板引擎配置：
  - 读入模板所在目录
  - 配合路由，在特定的`url`下使用`render`方法
  - 向模板传入参数

#数据库的基本配置

1. 建立数据库连接的数据池
   - 使用数据池pool：`getConnection`
   - pool.connection :`release``query`
2. 建表
   - users
   - posts
   - comment
3. 导出对数据库的操作函数

#后端路由（routers）

- 对具体的请求响应
  1. 获取请求
  2. 数据库操作
  3. 写body
     - 如果是请求页面，进行页面渲染，使用render
     - 如果是请求数据，直接给body赋值，如提交注册表单的操作
- 

#自定义中间件

- 检查session，判断登录状态，redirect相应页面

#视图模板

#静态样式



#tip

- node 环境对es6[的支持性](https://node.green/)
- promise语法：new promise，进行一个未知结果的操作，根据操作结果可能出现的情况，使用分支语句判断，对应处理的`resolve` 或是`reject`
- EJS[模板语法解析](https://ejs.bootcss.com/#install)
- 使用staticCache 后， 静态资源如样式表在引入ejs模板中的路径是相对于放置静态资源目录的路径
- 未解决ejs模板引擎渲染的一个bug
- 未解决发表文章字符串不合法的bug
- SQL查询语句，不用区分关键字大小写，不用区分有无分号结尾。可以通过`Promise`打印数据库交互中的错误
- 处理文章：replace方法
  1. pattern：regexp|substr
  2. replacement：newSubStr|function（函数默认参数是模式匹配下的命中目标）
- 数据库插入中文时编码错误，修改数据表的编码为utf8![1584520735098](C:\Users\liyax\AppData\Roaming\Typora\typora-user-images\1584520735098.png)
- 在使用const，let给函数表达式赋值，没有function所具有的变量声明的提升过程
- 

#### TODO

- 上传和下载
- 样式布局
- 更多的性能优化点