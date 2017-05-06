var async=require("async");
var arr=[1,2,3,4];

async.eachSeries(arr,function(item,callback){
     setTimeout(function(){
         console.log(item);
         callback();
     },1000)
})
