angular.module('app', ['theFramework', 'app.services', 'app.directives', 'app.controllers'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .when('/main', {
                templateUrl: 'templates/main.html',
                controller: 'MainCtrl'
            })
            .when('/companies', {
                templateUrl: 'templates/companies.html',
                controller: 'CompaniesCtrl'
            })
            .when('/brands', {
                templateUrl: 'templates/brands.html',
                controller: 'BrandsCtrl'
            })
            .when('/industries', {
                templateUrl: 'templates/industries.html',
                controller: 'IndustriesCtrl'
            })
            .when('/products', {
                templateUrl: 'templates/products.html',
                controller: 'ProductsCtrl'
            })
            .when('/products/new', {
                templateUrl: 'templates/new-product.html',
                controller: 'NewProductCtrl'
            })
            .when('/products/:id', {
                templateUrl: 'templates/product.html',
                controller: 'ProductCtrl'
            })
            .when('/forms', {
                templateUrl: 'templates/forms.html',
                controller: 'Forms'
            })
            .otherwise({
                redirectTo: '/main'
            });
    })