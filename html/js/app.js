function tableNameToItem(tableName) {
    switch (tableName) {
        case 'brands':
            return 'brand';
        case 'companies':
            return 'company';
        case 'importers':
            return 'importer';
        case 'industries':
            return 'industry';
        case 'products':
            return 'product';
        case 'messages':
            return 'message';
        case 'users':
            return 'user';
        case 'services':
            return 'service';
        case 'ads':
            return 'ad';
        default:
            return tableName;
    }
}

function findTemplate(templateName) {
    return 'templates/' + templateName + '.html';
}

function findItemsTemplate(urlattr) {
    var template = urlattr.table;
    return 'templates/' + template + '.html';
}

function findItemTemplate(urlattr) {
    var template = tableNameToItem(urlattr.table);
    return 'templates/' + template + '.html';
}

function findNewItemTemplate(urlattr) {
    var template = 'new-' + tableNameToItem(urlattr.table);
    return 'templates/' + template + '.html';
}
function findFilesTemplate(urlattr) {
    var template = tableNameToItem(urlattr.table);
    return 'templates/' + template + '-files.html';
}

function tableItemsResolve() {
    return {
        searching: function($route) {
            return $route.current.params.filters ? true : false;
        },
        searchTitle: function($route) {
            return $route.current.params.searchTitle ? $route.current.params.searchTitle : false;
        },
        filters: function($route) {
            if ($route.current.params.filters) {
                var spl = $route.current.params.filters.split('&');
                var filters = {};
                var keyval;
                for (var i in spl) {
                    keyval = spl[i].split('=');
                    if (keyval.length == 2) {
                        filters[keyval[0]] = keyval[1];
                    }
                }
                return filters;
            }
            return {};
        },
        items: function($q, $timeout, $theFramework, $tfHttp, $route) {
            $theFramework.loading();
            var defer = $q.defer();
            $tfHttp.get(
                '/get-all/' + $route.current.params.table + '/' + ($route.current.params.filters ? $route.current.params.filters : '')
            ).then(function(res) {
                $theFramework.loading(false);
                defer.resolve(res.data);
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
                defer.reject(err.data);
            });
            return defer.promise;
        }
    }
}

function tableItemResolve() {
    return {
        item: function($q, $timeout, $theFramework, $tfHttp, $route) {
            $theFramework.loading();
            var defer = $q.defer();
            $tfHttp.get(
                '/get/' + $route.current.params.table + '/' + $route.current.params.id
            ).then(function(res) {
                $theFramework.loading(false);
                defer.resolve(res.data);
            }).catch(function(err) {
                $theFramework.loading(false);
                $theFramework.toast(err.data);
                defer.resolve(err.data);
            });
            return defer.promise;
        }
    }
}

function tableNewItemResolve(type) {
    return {
        data: function($q, $theFramework, $tfHttp, $route) {
            var defer = $q.defer();
            var data = { options: {}, inputs: {} };
            if ($route.current.params.inputs) {
                var spl = $route.current.params.inputs.split('&');
                var inputs = {};
                var keyval;
                for (var i in spl) {
                    keyval = spl[i].split('=');
                    if (keyval.length == 2) {
                        inputs[keyval[0]] = keyval[1];
                    }
                }
                data.inputs = inputs;
            }

            var nextAfterFetchDeps = function(){
                if( type == 'insert' ){
                    $theFramework.loading(false);
                    defer.resolve(data);
                }
                else{
                    // set data.inputs
                    $tfHttp.get(
                         '/get/' + $route.current.params.table + '/' + $route.current.params.id
                    ).then(function(res) {
                        data.inputs = res.data;
                        delete data.inputs.file;
                        $theFramework.loading(false);
                        defer.resolve(data);
                    }).catch(function(err) {
                        $theFramework.toast(err.data);
                        $theFramework.loading(false);
                        defer.resolve(data);
                    });

                }
            }

            if ($route.current.params.table == 'products') {
                $theFramework.loading();
                var c = 0;

                function endOfStory() {
                    if (++c === 6) {
                        nextAfterFetchDeps();
                    }
                }
                $tfHttp.get('/get-all/countries').then(function(res) {
                    data.options.countries = res.data;
                    endOfStory();
                }).catch(function(err) {
                    $theFramework.toast(err.data);
                    endOfStory();
                });
                $tfHttp.get('/get-all/industries').then(function(res) {
                    data.options.industries = [];
                    for (var i = 0; i < res.data.length; i++) {
                        data.options.industries.push({
                            text: res.data[i].alias,
                            value: res.data[i].id
                        });
                    }
                    endOfStory();
                }).catch(function(err) {
                    $theFramework.toast(err.data);
                    endOfStory();
                });
                $tfHttp.get('/get-all/brands').then(function(res) {
                    data.options.brands = [];
                    for (var i = 0; i < res.data.length; i++) {
                        data.options.brands.push({
                            text: res.data[i].alias,
                            value: res.data[i].id
                        });
                    }
                    endOfStory();
                }).catch(function(err) {
                    $theFramework.toast(err.data);
                    endOfStory();
                });
                $tfHttp.get('/get-all/importers').then(function(res) {
                    data.options.importers = [];
                    for (var i = 0; i < res.data.length; i++) {
                        data.options.importers.push({
                            text: res.data[i].alias,
                            value: res.data[i].id
                        });
                    }
                    endOfStory();
                }).catch(function(err) {
                    $theFramework.toast(err.data);
                    endOfStory();
                });
                $tfHttp.get('/get-all/groups').then(function(res) {
                    data.options.groups = [];
                    for (var i = 0; i < res.data.length; i++) {
                        data.options.groups.push({
                            text: res.data[i].alias,
                            value: res.data[i].id
                        });
                    }
                    endOfStory();
                }).catch(function(err) {
                    $theFramework.toast(err.data);
                    endOfStory();
                });
                $tfHttp.get('/get-all/subgroups').then(function(res) {
                    data.options.subgroups = [];
                    for (var i = 0; i < res.data.length; i++) {
                        data.options.subgroups.push({
                            text: res.data[i].alias,
                            value: res.data[i].id
                        });
                    }
                    endOfStory();
                }).catch(function(err) {
                    $theFramework.toast(err.data);
                    endOfStory();
                });
            } else if ($route.current.params.table == 'messages') {
                data.options.types = [
                    //{text: 'خرید محصولات سایت', value: 1},
                    {text: 'فروش محصول به سایت', value: 2},
                    {text: 'سفارش محصول', value: 3},
                    {text: 'پیام عادی', value: 4},
                    {text: 'آگهی', value: 5}
                ];
                nextAfterFetchDeps();
            } else if ($route.current.params.table == 'users') {
                data.options.types = [
                    {text: 'ادمین اصلی', value: 1},
                    {text: 'مصرف کننده', value: 2},
                    {text: 'تولید کننده', value: 3},
                    {text: 'وارد کننده', value: 4},
                    {text: 'کارگاه خدماتی', value: 5},
                    {text: 'فروشگاه', value: 6}
                ];
                nextAfterFetchDeps();
            } else {
                nextAfterFetchDeps()
            }
            return defer.promise;
        },
        submit: function($q, $timeout, $theFramework, $tfHttp, $route) {
            return function(inputs, cb) {
                cb = typeof cb != 'undefined' ? cb : function() {};
                $theFramework.loading();
                if( typeof inputs.file == 'undefined' || inputs.file == '' || !inputs.file || inputs.file === null ){
                    delete inputs.file;
                }
                for( var i in inputs ){
                    if( i.indexOf('_alias')!=-1){
                        delete inputs[i];
                    }
                }
                delete inputs.files;
                var id = null;
                if( type == 'update' ){
                    id = inputs.id;
                    delete inputs.id;
                }
                console.log(inputs)
                $tfHttp.post(
                    '/'+type+'/' + $route.current.params.table + (type=='update'?'/id='+id:''), inputs
                ).then(function(res) {
                    $theFramework.loading(false);
                    $theFramework.toast('با موفقیت ثبت شد!');
                    cb();
                }).catch(function(err) {
                    $theFramework.loading(false);
                    $theFramework.toast(err.data);
                });
            }
        }
    }
}

function tableFilesResolve() {
    return {
        files: function($q, $theFramework, $tfHttp, $route) {
            var defer = $q.defer();
            $tfHttp.get(
                    '/get-files/' + $route.current.params.table + '/' + $route.current.params.id
            ).then(function(res) {
                $theFramework.loading(false);
                defer.resolve(res.data);
            }).catch(function(err) {
                $theFramework.toast(err.data);
                $theFramework.loading(false);
                defer.resolve([]);
            });
            return defer.promise;
        },
        add: function($q, $theFramework, $tfHttp, $route) {
            return function(file, cb) {
                cb = typeof cb != 'undefined' ? cb : function() {};
                $theFramework.loading();
                var table = $route.current.params.table;
                var id = $route.current.params.id;

                $tfHttp.post(
                    '/add-file/' + table + '/' + id, file
                ).then(function(res) {
                    $theFramework.loading(false);
                    $theFramework.toast(res.data);
                    cb(true);
                }).catch(function(err) {
                    $theFramework.loading(false);
                    $theFramework.toast(err.data);
                    cb(false);
                });
            }
        },
        del: function($q, $theFramework, $tfHttp, $route) {
            return function(fileUrl, cb) {
                var fileIndex = fileUrl.split('/');
                fileIndex = fileIndex[fileIndex.length-1] == ''? fileIndex[fileIndex.length-2]: fileIndex[fileIndex.length-1];


                cb = typeof cb != 'undefined' ? cb : function() {};
                $theFramework.loading();
                var table = $route.current.params.table;
                var id = $route.current.params.id;

                $tfHttp.post(
                    '/delete-file/' + table + '/' + id + '/' + fileIndex, {}
                ).then(function(res) {
                    $theFramework.loading(false);
                    $theFramework.toast(res.data);
                    cb(true);
                }).catch(function(err) {
                    $theFramework.loading(false);
                    $theFramework.toast(err.data);
                    cb(false);
                });
            }
        }
    }
}


function mainResolve() {
    return {
        unreadMessages: function($tfHttp, $q, $theFramework){
            var defer = $q.defer();
            $theFramework.loading();
            $tfHttp.get(
                '/get-all/messages/read=0'
            ).then(function(res) {
                $theFramework.loading(false);
                defer.resolve(res.data);
            }).catch(function(err) {
                $theFramework.loading(false);
                //$theFramework.toast(err.data);
                defer.resolve({});
            });
            return defer.promise;
        },
        ads: function($tfHttp, $q, $theFramework){
            var defer = $q.defer();
            $theFramework.loading();
            $tfHttp.get(
                '/get-all/ads'
            ).then(function(res) {
                $theFramework.loading(false);
                defer.resolve(res.data);
            }).catch(function(err) {
                $theFramework.loading(false);
                //$theFramework.toast(err.data);
                defer.resolve({});
            });
            return defer.promise;
        }
    }
}
angular.module('app', ['theFramework', 'app.services', 'app.directives', 'app.controllers'])
    .config(function($routeProvider, $tfHttpProvider) {
        /* ajax config */
        $tfHttpProvider.address = serverConfig.address + ':' + serverConfig.port;
        $tfHttpProvider.sid = _sid;

        $routeProvider
            .when('/login', {
                templateUrl: findTemplate('login'),
                controller: 'LoginCtrl'
            })
            .when('/main', {
                templateUrl: findTemplate('main'),
                controller: 'MainCtrl',
                resolve: mainResolve()
            })
            .when('/get-all/:table/:filters?/:searchTitle?', {
                controller: 'TableItemsCtrl',
                templateUrl: findItemsTemplate,
                resolve: tableItemsResolve()
            })
            .when('/get/:table/:id', {
                controller: 'TableItemCtrl',
                templateUrl: findItemTemplate,
                resolve: tableItemResolve()
            })
            .when('/files/:table/:id', {
                controller: 'TableFilesCtrl',
                templateUrl: findFilesTemplate,
                resolve: tableFilesResolve()
            })
            .when('/update/:table/:id', {
                controller: 'TableNewItemCtrl',
                templateUrl: findNewItemTemplate,
                resolve: tableNewItemResolve('update')
            })
            .when('/insert/:table/:inputs?', {
                controller: 'TableNewItemCtrl',
                templateUrl: findNewItemTemplate,
                resolve: tableNewItemResolve('insert')
            })
            .otherwise({
                redirectTo: '/main'
            });
    })