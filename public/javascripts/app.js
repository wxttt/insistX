//给猪头的全局方法
window.turnLeft = function(){
    alert('turn left');
}

window.turnRight = function(){
    alert('turn right');
}



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
