function tvCtrl($scope, $http){
    $scope.name = '分类';
    $scope.colors = ['green', 'black', 'brown']

    $http({
        method: 'get',
        url: '/movie'
    }).success(function(data){
        var data = data.movies;
        for(var i = 0; i < data.length; i++){
            (function(){
                var index = parseInt(Math.random()*3);
                data[i].color = $scope.colors[index];
            })()
        }
        console.log(data);
        $scope.data_1 = data.slice(0,5);
        $scope.data_2 = data.slice(5,10);
        console.log($scope.data_1);
        console.log($scope.data_2);
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
}
