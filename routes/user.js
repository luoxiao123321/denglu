var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'zhanghu'
})


router.post('/zen',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var user = req.body['user']
	var pass = req.body.pass
	
	 	pool.query(`INSERT INTO user (user,pass) VALUES ('${user}','${pass}')`,function(err,rows){
		if(err) throw err
		
		if(rows != ''||rows != null){
			pool.query('SELECT * FROM user',function(err,rows){
				if(err) throw err;
				res.send(rows)
			})
		}
	})
})

router.post('/sou',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.query(`SELECT * FROM user WHERE user='${req.body.user}'`,function(err,rows){
		if(err) throw err
		if(rows.length == 0){
			res.send('没有搜索到您要的东西')
		}else{
			res.send(rows)
		}
	})
})

router.post('/cha',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.query(`SELECT * FROM user WHERE user='${req.body.user}' AND pass='${req.body.pass}'`,function(err,rows){
		if(err) throw err
		if(rows.length == 0){
			res.send('没有搜索到您要的东西')
		}else{
			res.send(rows)
		}
	})
})

module.exports = router;
