
function tagsCtrl($scope, $http, $routeParams){
    var tagId = $routeParams.tagId;

    $scope.name = '分类';
    $scope.colors = ['green', 'black', 'brown'];

    $scope.playVideo = function($event){
        var el = $event.srcElement;
        var id = el.dataset.id;
        console.log(id);
    }

    $http({
        method: 'get',
        url: '/movie?id='+ tagId
    })
    .success(function(data){
        var data = data.movies;
        window.movieData = data;
        for(var i = 0; i < data.length; i++){
            (function(){
                var index = parseInt(Math.random()*3);
                data[i].color = $scope.colors[index];
            })()
        }
        $scope.data_1 = data.slice(0,5);
        $scope.data_2 = data.slice(5,10);
    })
}

function searchCtrl($scope){

}

function playCtrl($scope, $http, $routeParams){
    var srcId = $routeParams.srcId;
    console.log('srcId is', srcId);

    $http({
        method: 'get',
        url: '/mdata?id='+srcId+'/'
    })
    .success(function(data){
        console.log('data ', data);
        var data = data;
        var src;
        if(data.play_list.length == 0){
            console.log('no src');
        }

        for(var i = 0; i < data.play_list.length; i++){
            if(data.play_list[i].name == 'PPS')   continue;
            if(data.play_list[i].sources.length == 0) continue;
            src = data.play_list[i].sources[0];
            break;
        }
        $scope.playSrc = src;
        console.log('playSrc', src);
    })
}


window.onload = function(){
    var list1 = document.getElementsByClassName('m-list-1')[0],
        list2 = document.getElementsByClassName('m-list-2')[0];


    //给猪头的全局方法
    window.turnLeft = function(){
        list1.style["-webkit-transform"] = 'translate3d(-500px, 0, 0)';
        list2.style["-webkit-transform"] = 'translate3d(-500px, 0, 0)';
    }

    window.turnRight = function(){
        list1.style["-webkit-transform"] = 'translate3d(0, 0, 0)';
        list2.style["-webkit-transform"] = 'translate3d(0, 0, 0)';
    }

    window.play = function(index){
        if(!window.movieData)   return;
        if(index >= window.movieData)   return;
        var srcId = movieData[index].id;
        location.href = '#/play/' + srcId;
    }
}
