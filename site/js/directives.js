angular.module('app.directives', [])
    .directive('abzarTabs', function($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                active: '=?'
            },
            template: '' +
                '<ul class="tf-tabs">' +
                '   <li tf-go="/main" ng-class="{active: active==0}"> <i class="fa fa-home"></i> خانه </li>' +
                '   <li tf-go="/get-all/products/group=1" ng-class="{active: active==1}"> <i class="fa fa-gears"></i> ماشین‌آلات </li>' +
                '   <li tf-go="/get-all/products/group=2" ng-class="{active: active==2}"> <i class="fa fa-legal"></i> ابزارآلات </li>' +
                '   <li tf-go="/get-all/messages/type=5&confirmed=1" ng-class="{active: active==3}"> <i class="fa fa-cubes"></i> آکهی‌ها </li>' +
                '</ul>'
        }
    })