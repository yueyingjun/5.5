
angular.module("Controllers",["services"])
.controller("main",["$scope","$http",function($scope,$http){

    var swiper = new Swiper('.swiper-container',{
        pagination : '.swiper-pagination',
        scrollbar:'.swiper-scrollbar',
        effect : 'flip',
        onTransitionEnd:function(){

        }

    });

    $http({url:"/indexData"}).then(function(data){
       $scope.data=data.data;

    })

    function myFun(result){
        var cityName = result.name;
        $scope.city=cityName;
        $scope.$apply();
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);








}]).controller("phone",["$scope","$http",function($scope,$http){

    $http({url:"/phone/select"}).then(function(data){
        $scope.data=data.data;

    })



}]).controller("index",["$scope",function($scope){

    $scope.active="one";
    $scope.change=function(name){
        $scope.active=name;
    }

}]).controller("todo",["$scope","Todo",function($scope,Todo){

    $scope.data=Todo;

    $scope.del=function(index){
         $scope.data.splice(index,1);
         localStorage.todo=JSON.stringify($scope.data);
    }
     var list=$(".mui-navigate-right");
     var currentLeft=0;
    touch.on(".mui-navigate-right","dragstart",function(e){
        currentLeft= parseInt($(this).css("left"))?parseInt($(this).css("left")):0;
    })

     touch.on("body","drag",".mui-navigate-right",function(e){

            if(e.direction=="left") {
                var left=currentLeft+e.x;

                if(left<-50){
                    left=-50
                }
                console.log(left);
                $(this).css("left",left);
            }else if(e.direction=="right"){
                var left=currentLeft+e.x;

                if(left>0){
                    left=0
                }
                console.log(left);
                $(this).css("left",left);
            }
     })
}]).controller("todocon",["$scope","Todo",function($scope,Todo){

      $scope.data=Todo;

      $scope.con="";

      $scope.add=function(){
            $scope.data.push($scope.con);
            $scope.con="";
            localStorage.todo=JSON.stringify($scope.data);
      }
}]).controller("todoinfo",["$scope","$routeParams","Todo",function($scope,$routeParams,Todo){
    let id=$routeParams.id;
    $scope.data=Todo;

    $scope.currentData=$scope.data[id];
    $scope.$watch("currentData",function(){
        $scope.data[id]=$scope.currentData;
    })

    $scope.edit=function(){
        localStorage.todo=JSON.stringify($scope.data);

    }

}]).controller("list",["$scope","$location","$http",function($scope,$location,$http){

    $http({url:"/getCon",params:{url:Object.keys($location.$$search)[0]},responseType:"text"}).then(function(e){
        $scope.data=e.data;
        document.querySelector(".con").innerHTML=($scope.data);
    })
}]).controller("log",["$scope","$location","$http",function($scope,$location,$http){

}]).controller("send",["$scope","$location","$http",function($scope,$location,$http){

           $http({url:"/log/selectSend"}).then(function(data){
            $scope.data=data.data;
           })



}]).controller("jieshou",["$scope","$location","$http",function($scope,$location,$http){


    $http({url:"/log/selectdu"}).then(function(data){
            $scope.du=data.data
    })

    $http({url:"/log/selectun"}).then(function(data){
            $scope.un=data.data;
    })

    $scope.allFun=function(){
        $http({url:"/log/selectdu"}).then(function(data){
            $scope.du=data.data
        })

        $http({url:"/log/selectun"}).then(function(data){
            $scope.un=data.data;
        })
    }

    $scope.duFun=function(){
        $http({url:"/log/selectdu"}).then(function(data){
            $scope.du=data.data;
            $scope.un=[];
        })
    }

    $scope.unFun=function(){
        $http({url:"/log/selectun"}).then(function(data){
            $scope.un=data.data;
            $scope.du=[];
        })
    }



}]).controller("write",["$scope","$http","userInfo",function($scope,$http,userInfo){

    $http({url:"/log/selectUser"}).then(function(data){
        $scope.user=data.data;
    })

    /*
    userInfo.then(function(data){
        $scope.uid=data.data.uid;

    })

    */

      $scope.jieshouid="";
      $scope.title="";
      $scope.con="";

    $scope.send=function(){

        $http({url:"/log/addLog",params:{jieshouid:$scope.jieshouid,title:$scope.title,con:$scope.con}}).then(function (data) {
            if(data.data>0){
                $scope.jieshouid="";
                $scope.title="";
                $scope.con="";
            }
        })
    }
}]).controller("logshow",["$scope","$routeParams","$http",function($scope,$routeParams,$http){
   var id=$routeParams.logid;
   $http({url:"/log/logshow",params:{id:id}}).then(function(data){
       $scope.data=data.data;
   })
}]).controller("setting",["$scope",function($scope){


}]).controller("reset",["$scope","$http",function($scope,$http){

    $scope.isshow=false;
    $scope.pass1="";
    $scope.pass2="";
    $scope.edit=function(){
        $http({url:"/editPass",params:{
            pass1:$scope.pass1,
            pass2:$scope.pass2
        }}).then(function(e){
            if(e.data=="no"){
                $scope.pass1="";
                $scope.pass2="";
                $scope.isshow=true;

                setTimeout(function(){
                    $scope.isshow=false;
                    $scope.$apply();
                },1000)
            }else if(e.data=="ok"){
                location.href="/login";
            }
        })
    }

}]).controller("dataview",["$scope","$http",function($scope,$http){


    $http({url:"/dataview/cat"}).then(function(data){


       var xAxis=data.data.map(function(a,b,c){
            return a.catname;
       })

        var catids=data.data.map(function(a,b,c){
            return a.catid;
        })




        $http({url:"/dataview/con"}).then(function(data1){


            var series=[];
            catids.forEach(function(catid,index){
                series.push(data1.data.filter(function(a,b,c){
                    return a.catid==catid;
                }).length)
            })




            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '新闻统计'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: xAxis
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'scatter',
                    data: series
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);


        })



    })









}])
