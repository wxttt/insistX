'use strict';

/* App Module */

angular.module('tvApp',['ngRoute', 'videoEvents']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/tags/:tagId', {templateUrl: 'tags', controller: tagsCtrl}).
            when('/search/:keyword', {templateUrl: 'tags', controller: searchCtrl}).
            when('/play/:srcId', {templateUrl: 'play', controller: playCtrl}).
            otherwise({redirectTo: '/'});
    }]);