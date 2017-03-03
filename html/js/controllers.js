angular.module('app.controllers', [])
    .run(function($rootScope, $timeout, $window, $theFramework, $tfHttp) {


        $rootScope.me = false;
        $rootScope.deside = function() {
            $theFramework.loading();
            $tfHttp.post('/views/'+moment.utc().format('jYYYY-jMM-jDD')).then(function(res) {
                $tfHttp.get('/users/me').then(function(res) {
                    $theFramework.loading(false);
                    $rootScope.me = res.data;
                    // alert($rootScope.me);
                }).catch(function(err) {
                    $theFramework.loading(false);
                    $theFramework.toast(err.data);
                });
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
                    return 'سفارش محصول';
                case 4:
                    return 'پیام عادی';
                case 5:
                    return 'آگهی';
            }
        }
        $rootScope.isCordova = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;

        $rootScope.deside(); // check logged in or not
    })
    .controller('MainCtrl', function($scope, $rootScope, $theFramework, $timeout, $http, $tfHttp, unreadMessages, ads, slides, lastProducts) {
        //alert('we are here');
        $scope.sidebar = false;
        $scope.searchbar = false;
        $scope.slides = slides;
        $scope.lastProducts = lastProducts;

        $scope.unreadMessages = unreadMessages;
        $scope.ads = ads;
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
    .controller('ViewsCtrl', function($scope, $rootScope, $theFramework, $timeout, $interval, $tfHttp) {
        $scope.inputs = {};
        $scope.result = null;
        $scope.get = function() {
            $theFramework.loading();
            $scope.result = 0;
            var promise = $interval(function(){
                $scope.result = parseInt( Math.random() * 100 );
            }, 50);

            $tfHttp.get('/views/'+$scope.inputs.date).then(function(res) {
                $theFramework.loading(false);
                $interval.cancel(promise);
                $scope.result = res.data;
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
            });
        }
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
        if( $rootScope.me !== false && $rootScope.me.type == 1){
            $scope.deleteItem = function(id){
                if( !confirm('آیا مطمئنید؟') ){
                    return;
                }
                $tfHttp.post('/delete/'+$routeParams.table+'/id=' + id, {}).then( function(){
                    $route.reload();  
                });
            }
            
        }
    })
    .controller('TableItemCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $routeParams, item) {
        $scope.item = item;
        $scope.temp = {};
        if( ['products', 'messages'].indexOf($routeParams.table) != -1 && $rootScope.me !== false && $rootScope.me.type == 1){
            var id = $routeParams.id;
            if( $routeParams.table == 'messages' ){
                $tfHttp.post('/update/messages/id=' + $routeParams.id, {read: 1});
            }
            $scope.$watch('item.confirmed', function(val){
                $tfHttp.post('/update/'+$routeParams.table+'/id=' + $routeParams.id, {confirmed: val});
            });

            //if( item.type == 5 ){

            //}
        }

    })
    .controller('TableNewItemCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $timeout, $routeParams, data, submit) {
        $scope.options = data.options;
        $scope.inputs = data.inputs;

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
    })
    .controller('TableFilesCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $route, $routeParams, files, add, del) {
        
        $scope.file = null;

        $scope.files = files;

        $scope.add = function(){
            add( $scope.file, function(){
                $scope.file = null;
                $route.reload();  
            });
        }
        $scope.del = function(fileUrl){
            if( !confirm('آیا مطمئنید؟') ){
                return false;
            }
            del( fileUrl, function(){
                $scope.file = null;
                $route.reload();  
            } );
        }

    })
    ;