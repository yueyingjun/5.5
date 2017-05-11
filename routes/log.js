var express=require("express");
var path=require("path");
var mysql=require("../mysql");
var router=express.Router();

router.get("/selectUser",function(req,res){
    mysql.query("select * from user where uid>0",function(error,result){
        res.send(result);
    })
})

router.get("/addLog",function(req,res){
    var title=req.query.title;
    var con=req.query.con;
    var jieshouid=req.query.jieshouid;
    var sendid=req.session.user.uid;
    var state=1;
    mysql.query(`insert into logs (title,con,jieshouid,sendid,state) values ('${title}','${con}','${jieshouid}','${sendid}','${state}')`,function(error,result){
        res.send(result.affectedRows.toString());
    })
})

router.get("/selectSend",function(req,res){
    var uid=req.session.user.uid;
    mysql.query("select * from logs where sendid="+uid,function(error,result){
       res.send(JSON.stringify(result));
    })
})



module.exports=router;