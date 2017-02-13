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
                '<ul class="tf-tabs bastan-tabs">' +
                '   <li tf-go="/main" ng-class="{active: active==0}"> <i class="fa fa-home"></i> <span class="hidden-xs">خانه</span> </li>' +
                '   <li tf-go="/get-all/products/group=1" ng-class="{active: active==1}"> <i class="fa fa-gears"></i> <span class="hidden-xs">ماشین‌آلات</span> </li>' +
                '   <li tf-go="/get-all/products/group=2" ng-class="{active: active==2}"> <i class="fa fa-legal"></i> <span class="hidden-xs">ابزارآلات</span> </li>' +
                '   <li tf-go="/get-all/messages/type=5&confirmed=1" ng-class="{active: active==3}"> <i class="fa fa-cubes"></i> <span class="hidden-xs">آگهی‌ها</span> </li>' +
                '   <li tf-go="/get-all/services" ng-class="{active: active==5}"> <i class="fa fa-cog"></i> <span class="hidden-xs">خدمات</span> </li>' +
                '</ul>'
        }
    })