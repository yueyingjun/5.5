var express=require("express");
var path=require("path");
var nodegrass=require("nodegrass")
var mysql=require("../mysql");
var md5=require("../md5");
var router=express.Router();

function  middle (req,res,next){


    if(!req.session.user){
        res.redirect("/login");
    }else {

        next();
    }



}


router.get("/",middle,function(req,res,next){
    next();
},function(req,res){

   res.render("index")
})

router.get("/login",middle,function(req,res){
    res.render("login")
})


router.get("/indexData",middle,function(req,res){
        mysql.query("select * from shows where catid=2 order by id asc limit 0,10",function(error,result){
            res.send(result);
        });
})
router.get("/welcome",middle,function(req,res){
    res.render("welcome")
})
router.get("/tpl/:name",middle,function(req,res){


   res.sendFile(path.join(process.cwd(),"public/tpl/"+req.params.name))
})

router.get("/getCon",middle,function(req,res){
    var url=req.query.url;
    console.log(url);
    nodegrass.get(url,function(body){
        //console.log(body);
        res.send(body);
    },"gbk");

})

router.get("/userInfo",middle,function(req,res){
      console.log(req.session.user)
      res.send(JSON.stringify(req.session.user));
})

router.get("/editPass",function(req,res){
    var pass1=md5(req.query.pass1||"");
    var pass2=md5(req.query.pass2||"");
    var uid=req.session.user.uid;
    mysql.query("select upass from user where uid="+uid,function(error,result){
        if(result[0].upass==pass1){

             mysql.query(`update user set upass='${pass2}' where uid=${uid}`,function(error){
                 if(!error) {
                    req.session.user=null;
                    res.send("ok");
                 }else{
                     console.log(error);
                 }
             })

        }else{
            res.send("no");
        }
    })
})

router.get("/logout",function(req,res){
   req.session.user=null;
   res.redirect("/login");
   res.end();
})

module.exports=router;