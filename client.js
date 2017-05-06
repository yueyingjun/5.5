var nodegrass=require("nodegrass")
var mysql=require("./mysql.js");
var async=require("async");
var cheerio=require("cheerio");
var read=require("./read");

read.readCategory("http://tech.qq.com/science.htm",function(data){
    console.log(data);
})
