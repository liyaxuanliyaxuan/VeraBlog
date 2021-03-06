var mysql = require('mysql');
var config = require('../config/default.js')

//建立数据库连接池
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})
//建立表示查询的promise
// firstParam:sql指令
//secondParam:指令包含的其他参数，通常用于插入修改操作
let query = (sql, values) => {
    return new Promise((resolve, reject) => {

        pool.getConnection((err, connection) => {
            err ? (reject(err)) : (connection.query(sql, values, (err, rows) => {
                err ? (reject(err)) : (resolve(rows));
                connection.release();
            }))
        })
    })
}

//建表
let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     pass VARCHAR(100) NOT NULL,
     avator VARCHAR(100) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`
let posts =
    `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     title TEXT(0) NOT NULL,
     content TEXT(0) NOT NULL,
     md TEXT(0) NOT NULL,
     uid VARCHAR(40) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     comments VARCHAR(200) NOT NULL DEFAULT '0',
     pv VARCHAR(40) NOT NULL DEFAULT '0',
     avator VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`
let comment =
    `create table if not exists comment(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     content TEXT(0) NOT NULL,
     moment VARCHAR(40) NOT NULL,
     postid VARCHAR(40) NOT NULL,
     avator VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`

let createTable = (sql) => {
    return query(sql, [])
}

//执行建表
createTable(users)
createTable(posts)
createTable(comment)

//对数据库的基本操作

//注册用户
let insertData = (val) => {
    let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
    return query(_sql,val)
}

//删除用户
let deleteUserData = (name) =>{
    let _sql = `delete from users where name="${name}";`
    return query(_sql)
}

//查找用户
let findUserData = (name) => {
    let _sql = `select * from users where name="${name}";`
    return query( _sql )
}

//发表文章
let insertPost = (val) => {
    let _sql = "insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;"
    return query( _sql, val )
}
//更新文章评论数
let updatePostComment = (val) => {
    let _sql = `update posts set comments=? where id=?;`

    return query(_sql, val)
}
//更新浏览数据
let updatePostPv = (val) => {
    let _sql = `update posts set pv=? where id=?;`
    return query(_sql, val)
}
//发表评论
let insertComment = (val) => {
    let _sql = `insert into comment set name=?,content=?,moment=?,postid=?,avator=?;`
    return query(_sql, val)
}
//通过名字查找用户
let findDataByName = (name) => {
    let _sql = `select * from users where name="${name}";`
    return query(_sql)
}

//通过文章名字查找用户
let findDataByUser = (name) => {
    let _sql = `select * from posts where name="${name}";`
    return query(_sql)
}

//通过文章id查找
let findDataById = (id) => {
    let _sql = `select * from posts where id=${id};`
    return query(_sql)
}
//通过评论id查找
let findCommentById = (id) => {
    let _sql = `select * FROM comment where postid=${id};`
    return query(_sql)
}

//查询所有文章
let findAllPost = () => {
    let _sql =  `select * FROM posts;`
    return query(_sql)
}
//查询分页文章
let findPostByPage = (page) => {
    let _sql = `select * FROM posts limit ${(page-1)*10},10;`
    return query(_sql, page)
}
//查询个人分页文章
let findPostByUserPage = (name, page) =>{
    let _sql = `select * FROM posts where name="${name}" order by id desc limit ${(page-1)*10},10;`
    return query(_sql)
}

//修改文章
let updatePost = (val) => {
    let _sql = `update posts set title=?,content=?,md=? where id=?;`
    return query(_sql, val)
}
//删除文章
let deletePost = (id) => {
    let _sql = `delete from posts where id = ${id};`
    return query(_sql)
}
//删除评论
let deleteComment = (id) => {
    let _sql = `delete from comment where id=${id};`
    return query(_sql)
}
//删除所有评论
let deleteAllPostComment = (id) => {
    let _sql = `delete from comment where postid=${id};`
    return query(_sql)
}
//查找评论数
let findCommentLength = (id) => {
    let _sql = `select content from comment where postid in (select id from posts where id=${id})`
    return query(_sql)
}
//滚动无限加载数据
let findPageById = (page) => {
    let _sql = `select * from posts limit ${(page-1)*5},5;`
    return query(_sql)
}
//评论分页
let findCommentByPage = (page, postId) => {
    let _sql = `select * from comment where postid=${postId} order by id desc limit ${(page-1)*10},10;`
    return query(_sql)
}
module.exports = {
	query,
	createTable,
	insertData,
  	deleteUserData,
  	findUserData,
	findDataByName,
  	insertPost,
  	findAllPost,
  	findPostByPage,
	findPostByUserPage,
	findDataByUser,
	findDataById,
	insertComment,
	findCommentById,
	updatePost,
	deletePost,
	deleteComment,
	findCommentLength,
	updatePostComment,
	deleteAllPostComment,
	updatePostPv,
	findPageById,
	findCommentByPage
}