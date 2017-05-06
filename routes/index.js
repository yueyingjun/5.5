var express=require("express");
var path=require("path");
var nodegrass=require("nodegrass")
var mysql=require("../mysql");
var router=express.Router();

router.get("/",function(req,res){
   res.render("index")
})

router.get("/indexData",function(req,res){
        mysql.query("select * from shows where catid=2 limit 0,10",function(error,result){
            res.send(result);
        });
})
router.get("/welcome",function(req,res){
    res.render("welcome")
})
router.get("/tpl/:name",function(req,res){


   res.sendFile(path.join(process.cwd(),"public/tpl/"+req.params.name))
})

router.get("/getCon",function(req,res){
    var url=req.query.url;
    console.log(url);
    nodegrass.get(url,function(body){
        //console.log(body);
        res.send(body);
    },"gbk");

})

module.exports=router;