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
        $rootScope.deside(); // check logged in or not
    })
    .controller('MainCtrl', function($scope, $rootScope, $theFramework, $timeout, $http, $tfHttp) {
        //alert('we are here');

        $scope.sidebar = false;
        $scope.images = [{
            src: 'images/1.jpg'
        }, {
            src: 'images/2.jpg'
        }, {
            src: 'images/3.jpg'
        }, {
            src: 'images/4.jpg'
        }];
        $scope.fetch = function() {
            //alert('we are here');
        }
        $scope.itemClick = function() {
            $theFramework.toast('این آیتم فعلا غیر فعال است!')
        }

        $scope.fetch();
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
    .controller('TableItemsCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $routeParams, items, searching, searchTitle, filters) {
        $scope.bars = true;
        $scope.items = items;
        $scope.filters = filters;
        $scope.searching = searching;
        $scope.searchTitle = searchTitle;
    })
    .controller('TableItemCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $routeParams, item) {
        console.log(item);
        $scope.item = item;
    })
    .controller('TableNewItemCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $timeout, $routeParams, data, insert) {
        $scope.options = data.options;
        $scope.inputs = data.inputs;
        console.log('aaa');
        $scope.submit = function() {
            if (typeof $scope.inputs.used != 'undefined') {
                $scope.inputs.used = $scope.inputs.used ? 1 : 0;
            }
            insert($scope.inputs, function() {
                $theFramework.go('/main');
            })
        }


    });