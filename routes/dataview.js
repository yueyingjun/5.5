var express=require("express");
var path=require("path");
var mysql=require("../mysql");
var router=express.Router();

router.get("/cat",function(req,res){
    mysql.query("select * from category",function(error,result){
       res.send(JSON.stringify(result));
    })
})

router.get("/con",function(req,res){
    mysql.query("select * from shows",function(error,result){
        res.send(JSON.stringify(result));
    })
})

module.exports=router;