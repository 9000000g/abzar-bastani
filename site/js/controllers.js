angular.module('app.controllers', [])
    .run(function($rootScope, $timeout, $window, $theFramework, $tfHttp) {
        /* ajax config */
        $tfHttp.address = serverConfig.address + ':' + serverConfig.port;
        $tfHttp.sid = _sid;

        $rootScope.me = false;
        $rootScope.desided = false;
        $rootScope.deside = function() {
            if ($rootScope.desided == false) {
                $theFramework.loading();
                $tfHttp.get('/users/me').then(function(res) {
                    $theFramework.loading(false);
                    $rootScope.desided = true;
                    $rootScope.me = res.data;
                }).catch(function(err) {
                    $theFramework.loading(false);
                    $theFramework.toast(err.data);
                });
            }
        }
    })
    .controller('MainCtrl', function($scope, $rootScope, $theFramework, $timeout, $http, $tfHttp) {
        $rootScope.deside(); // check logged in or not

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
            $theFramework.loading();
            $timeout(function() {
                $theFramework.loading(false);
                $theFramework.toast('خطا در برقراری ارتباط با سرور!')
            }, 1300);

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


.controller('CompaniesCtrl', function($scope, $rootScope, $theFramework, $tfHttp) {
        $rootScope.deside(); // check logged in or not
        $scope.items = [];
        $scope.fetch = function(next) {
            $theFramework.loading();
            $tfHttp.get('/table/companies').then(function(res) {
                $theFramework.loading(false);
                $scope.items = res.data;
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
            });
        }
        $scope.fetch();
    })
    .controller('BrandsCtrl', function($scope, $rootScope, $theFramework, $tfHttp) {
        $rootScope.deside(); // check logged in or not
        $scope.items = [];
        $scope.fetch = function(next) {
            $theFramework.loading();
            $tfHttp.get('/table/brands').then(function(res) {
                $theFramework.loading(false);
                $scope.items = res.data;
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
            });
        }
        $scope.fetch();
    })
    .controller('IndustriesCtrl', function($scope, $rootScope, $theFramework, $tfHttp) {
        $rootScope.deside(); // check logged in or not
        $scope.items = [];
        $scope.fetch = function(next) {
            $theFramework.loading();
            $tfHttp.get('/table/industries').then(function(res) {
                $theFramework.loading(false);
                $scope.items = res.data;
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
            });
        }
        $scope.fetch();
    })
    .controller('ProductsCtrl', function($scope, $rootScope, $theFramework, $tfHttp) {
        $rootScope.deside(); // check logged in or not
        $scope.items = [];
        $scope.fetch = function(next) {
            $theFramework.loading();
            $tfHttp.get('/table/products').then(function(res) {
                $theFramework.loading(false);
                $scope.items = res.data;
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
            });
        }
        $scope.fetch();
    })
    .controller('ProductCtrl', function($scope, $rootScope, $theFramework, $tfHttp, $routeParams) {
        $rootScope.deside(); // check logged in or not
        $scope.item = {};
        $scope.fetch = function(next) {
            $theFramework.loading();
            $tfHttp.get('/table/products/' + $routeParams.id).then(function(res) {
                $theFramework.loading(false);
                $scope.item = res.data;
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
            });
        }
        $scope.fetch();
    })
    .controller('NewProductCtrl', function($scope, $rootScope, $theFramework, $tfHttp) {
        $rootScope.deside(); // check logged in or not
        $scope.inputs = {}
        $scope.options = {}
        $scope.vars = {}
        $scope.submit = function() {
            $theFramework.loading();
            $scope.inputs.used = typeof $scope.inputs.used != 'undefined' && $scope.inputs.used ? 1 : 0;
            $scope.inputs.year = typeof $scope.inputs.year != 'undefined' && !isNaN(parseInt($scope.inputs.year)) ? parseInt($scope.inputs.year) : 2000;
            $tfHttp.post('/table/products/insert', $scope.inputs, true).then(function(res) {
                $theFramework.loading(false);
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
            });
        }

        $scope.fetch = function(next) {
            $theFramework.loading();

            var c = 0;

            function endOfStory() {
                if (++c === 5) {
                    $theFramework.loading(false);
                }
            }
            $tfHttp.get('/table/countries').then(function(res) {
                $scope.options.countries = res.data;
                endOfStory();
            }).catch(function(err) {
                $theFramework.toast(err.data);
                endOfStory();
            });
            $tfHttp.get('/table/industries').then(function(res) {
                $scope.options.industries = [];
                for (var i = 0; i < res.data.length; i++) {
                    console.log(res.data[i])
                    $scope.options.industries.push({
                        text: res.data[i].alias,
                        value: res.data[i].id
                    });
                }
                endOfStory();
            }).catch(function(err) {
                $theFramework.toast(err.data);
                endOfStory();
            });
            $tfHttp.get('/table/brands').then(function(res) {
                $scope.options.brands = [];
                for (var i = 0; i < res.data.length; i++) {
                    $scope.options.brands.push({
                        text: res.data[i].alias,
                        value: res.data[i].id
                    });
                }
                endOfStory();
            }).catch(function(err) {
                $theFramework.toast(err.data);
                endOfStory();
            });
            $tfHttp.get('/table/companies').then(function(res) {
                $scope.options.companies = [];
                for (var i = 0; i < res.data.length; i++) {
                    $scope.options.companies.push({
                        text: res.data[i].alias,
                        value: res.data[i].id
                    });
                }
                endOfStory();
            }).catch(function(err) {
                $theFramework.toast(err.data);
                endOfStory();
            });
            $tfHttp.get('/table/groups').then(function(res) {
                $scope.options.groups = [];
                for (var i = 0; i < res.data.length; i++) {
                    $scope.options.groups.push({
                        text: res.data[i].alias,
                        value: res.data[i].id
                    });
                }
                endOfStory();
            }).catch(function(err) {
                $theFramework.toast(err.data);
                endOfStory();
            });
        }
        $scope.fetch();
    })

.controller('Forms', function($scope, $rootScope, $theFramework) {
    $rootScope.deside(); // check logged in or not
    $scope.inputs = {

    };
    $scope.options = {};

    $scope.options.one = [
        { text: '1 - ایکس شماره یک', value: 1 },
        { text: '2 - ایکس شماره دو', value: 2 },
        { text: '3 - ایکس شماره سه', value: 3 }
    ];
});