angular.module('app.directives', [])
    .directive('imagePicker', function($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                value: '=?'
            },
            link: function(scope) {
                //scope.value = '';
                scope.selectFile = function() {
                    navigator.camera.getPicture(function(data) {
                        scope.value = data;
                        scope.$apply();

                    }, new Function(), {
                        destinationType: 0,
                        sourceType: 2,
                        EncodingType: 0
                    });
                }
            },
            template: '<span ng-click="selectFile()" ng-transclude></span>'

        }
    })
