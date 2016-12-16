angular.module('app.controllers', [])
    .run(function($rootScope, $timeout, $window, $theFramework, $tfHttp) {


        $rootScope.me = false;
        $rootScope.deside = function() {
            $theFramework.loading();
            $tfHttp.get('/users/me').then(function(res) {
                $theFramework.loading(false);
                $rootScope.me = res.data;
                // alert($rootScope.me);
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
            });
        }
        $rootScope.log = function(msg){
            console.log(msg);
        }
        $rootScope.messageType = function(t){
            switch( t ){
                case 1:
                    return 'خرید محصولات سایت';
                case 2:
                    return 'فروش محصول به سایت';
                case 3:
                    return 'درخواست خرید محصول جدید';
                case 4:
                    return 'پیام عادی';
            }
        }
        $rootScope.deside(); // check logged in or not
    })
    .controller('MainCtrl', function($scope, $rootScope, $theFramework, $timeout, $http, $tfHttp, unreadMessages) {
        //alert('we are here');
        $scope.sidebar = false;
        $scope.searchbar = false;
        $scope.images = [{
            src: 'images/1.jpg'
        }, {
            src: 'images/2.jpg'
        }, {
            src: 'images/3.jpg'
        }, {
            src: 'images/4.jpg'
        }];

        $scope.unreadMessages = unreadMessages;
        $scope.search = function(text) {
            $theFramework.go('/get-all/products/name='+text);
        }
        $scope.notYet = function(){
            $theFramework.toast('این بخش از برنامه هنوز راه‌اندازی نشده‌است!');
        }
        console.log( $rootScope.me );
    })
    .controller('LoginCtrl', function($scope, $rootScope, $theFramework, $timeout, $tfHttp) {
        $scope.inputs = {};

        $scope.login = function() {
            $theFramework.loading();
            $tfHttp.post('/login', $scope.inputs).then(function(res) {
                $theFramework.loading(false);
                $rootScope.me = res.data;
                $theFramework.go('/main');
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
            });
        }

        //init
        $theFramework.loading();
        $tfHttp.post('/logout').then(function(res) {
            $theFramework.loading(false);
            $rootScope.me = false;
        }).catch(function(err) {
            $theFramework.go('back');
            $theFramework.loading(false);
            $theFramework.toast(err.data);
        });
    })
    .controller('TableItemsCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $route, $routeParams, items, searching, searchTitle, filters) {
        $scope.bars = true;
        $scope.items = items;
        $scope.filters = filters;
        $scope.searching = searching;
        $scope.searchTitle = searchTitle;

        $scope._bottomSheet = false;
        $scope.hovered = {};
        $scope.bottomSheet = function(item) {
            $scope._bottomSheet = true;
            $scope.hovered = item;
        }
        if( $routeParams.table == 'products' && $rootScope.me !== false && $rootScope.me.type == 1){
            $scope.deleteItem = function(id){
                if( !confirm('آیا مطمئنید؟') ){
                    return;
                }
                $tfHttp.post('/delete/products/id=' + id, {}).then( function(){
                    $route.reload();  
                });
            }
            
        }
    })
    .controller('TableItemCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $routeParams, item) {
        $scope.item = item;
        if( $routeParams.table == 'messages' && $rootScope.me !== false && $rootScope.me.type == 1){
            var id = $routeParams.id;
            $tfHttp.post('/update/messages/id=' + $routeParams.id, {read: 1});
        }
    })
    .controller('TableNewItemCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $timeout, $routeParams, data, submit) {
        $scope.options = data.options;
        $scope.inputs = data.inputs;
        console.log( data.options)

        $scope.log = function(){
            console.log($scope.inputs)
        }
        $scope.temp = {};
        $scope.submit = function() {
            if (typeof $scope.inputs.used != 'undefined') {
                $scope.inputs.used = $scope.inputs.used ? 1 : 0;
            }
            submit($scope.inputs, function() {
                $theFramework.go('/main');
            })
        }
    });