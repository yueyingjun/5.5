/*
*   link
*   script
*
*   a
*
*   img src
*
*   ajax({
*   url:"/tpl/main.html"})
*
* */
angular.module("Route",["ngRoute"])
.config(["$routeProvider",function(route){
        route.when("/",{
            templateUrl:"/tpl/main.html",
            controller:"main"
        }).when("/phone",{
            templateUrl:"/tpl/phone.html",
            controller:"phone"
        }).when("/todo",{
            templateUrl:"/tpl/todo.html",
            controller:"todo"
        }).when("/todocon",{
            templateUrl:"/tpl/todocon.html",
            controller:"todocon"
        }).when("/todoinfo/:id",{
            templateUrl:"/tpl/todoinfo.html",
            controller:"todoinfo"
        })

}])