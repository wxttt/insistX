
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

function playCtrl($scope, $http, $routeParams, $sce){
    var srcId = $routeParams.srcId,src, srcList, index;
    $scope.noSrc = false;
    $scope.noVideo = false;
    $scope.hasMp4 = false;
    $scope.loading = true;


    $scope.canPlayThrough = function($event){
        $scope.loading = false;
    }

    $scope.ended = function($event){
        console.log( 'end end');
        if(!srcList)
            return;
        if(index <= (srcList.length - 2)){
            index++;
            $scope.playSrc1 = $sce.trustAsResourceUrl(srcList[index]);
            $scope.playSrc2 = $sce.trustAsResourceUrl(srcList[index + 1]);
        }

    }

    $http({
        method: 'get',
        url: '/mdata?id='+srcId+'/'
    })
    .success(function(data){
        var data = data;


        if(data.play_list.length == 0){
            $scope.noSrc = true;
            $scope.loading = false;
            return;
        }


        for(var i = 0; i < data.play_list.length; i++){
            if(data.play_list[i].name == 'PPS')   continue;
            if(data.play_list[i].sources.length == 0) continue;
            if(data.play_list[i].sources.length == 1){
                src = data.play_list[i].sources[0];
                break;
            }
            if(data.play_list[i].sources.length > 1){
                srcList = data.play_list[i].sources;
                break;
            }
        }

        if(src){
            console.log('src', src);
            $scope.hasMp4 = true;
            $scope.playSrc1 = $sce.trustAsResourceUrl(src);
        }else if(srcList){
            index = 0;
            $scope.hasMp4 = true;
            $scope.playSrc1 = $sce.trustAsResourceUrl(srcList[0]);
            $scope.playSrc2 = $sce.trustAsResourceUrl(srcList[1]);
        }else{
            $scope.noVideo = true;
        }
    })

}


window.onload = function(){

    //给猪头的全局方法
    window.turnLeft = function(){
        var list1 = document.getElementsByClassName('m-list-1')[0],
            list2 = document.getElementsByClassName('m-list-2')[0];

        list1.style["-webkit-transform"] = 'translate3d(-500px, 0, 0)';
        list2.style["-webkit-transform"] = 'translate3d(-500px, 0, 0)';
    }

    window.turnRight = function(){
        var list1 = document.getElementsByClassName('m-list-1')[0],
            list2 = document.getElementsByClassName('m-list-2')[0];

        list1.style["-webkit-transform"] = 'translate3d(0, 0, 0)';
        list2.style["-webkit-transform"] = 'translate3d(0, 0, 0)';
    }

    window.play = function(index){
        if(!window.movieData)   return;
        if(index >= window.movieData)   return;
        var srcId = movieData[index].id;
        location.href = '#/play/' + srcId;
    }

    window.pause = function(){
        var video = document.getElementsByTagName('video')[0];
        if(!video)  return;
        video.pause();
    }

    window.fastForward = function(){
        var video = document.getElementsByTagName('video')[0];
        if(!video)  return;

        video.currentTime = video.currentTime + 10;
    }

    window.fastRewind = function(){
        var video = document.getElementsByTagName('video')[0];
        if(!video)  return;

        video.currentTime = (video.currentTime - 10) > 0?
            (video.currentTime - 10) : 0;
    }

    window.resume = function(){
        playVideo();
    }

    window.playVideo = function(){
        var video = document.getElementsByTagName('video')[0];
        if(!video)  return;

        video.play();
    }
}
