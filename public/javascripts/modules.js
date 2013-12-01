/*
 * angular-hammer v1.0.1
 * (c) 2013 Monospaced http://monospaced.com
 * License: MIT
 */

(function(window, angular){
    var videoEvents = angular.module('videoEvents', []),
        Events = [
            'ngCanPlayThrough:canplaythrough',
            'ngEnded:ended'
        ];

    angular.forEach(Events, function(name){
        var directive = name.split(':'),
            directiveName = directive[0],
            eventName = directive[1];

        videoEvents.directive(directiveName, ['$parse', '$window', function($parse, $window){
            return {
                restrict: 'A, C',
                link: function(scope, element, attr) {
                    var expr = $parse(attr[directiveName]),
                        fn = function(event){
                            scope.$apply(function() {
                                expr(scope, {$event: event});
                            });
                        };

                    element.bind(eventName, fn);

                    // unbind Hammer touch event
                    //scope.$on('$destroy', function(){
                    //    hammer.off(eventName, fn);
                    //});

                }
            };
        }]);
    });

})(window, window.angular);












