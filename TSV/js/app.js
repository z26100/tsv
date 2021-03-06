// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //if(window.cordova && window.cordova.plugins.Keyboard) {
    //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //}
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
    })

    // Each tab has its own nav history stack:

    .state('tab.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-partial.html',
          controller: 'NewsCtrl'
        }
      }
    })
    .state('tab.article', {
      url: '/article/:id',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-article.html',
          controller: 'ArticleCtrl'
        }
      }
    })

    .state('tab.teams', {
        url: '/teams/:client',
      views: {
        'tab-teams': {
          templateUrl: 'templates/tab-partial.html',
          controller: 'TeamsCtrl'
        }
      }
    })
    .state('tab.team-detail', {
        url: '/team/:client/:teamId',
      views: {
        'tab-teams': {
          templateUrl: 'templates/team-detail.html',
          controller: 'TeamDetailCtrl'
        }
      }
    })
    .state('tab.livescores', {
      url: '/livescores',
      views: {
        'tab-livescores': {
          templateUrl: 'templates/tab-livescores.html',
          controller: 'LivescoresCtrl'
        }
      }
    })
    
    .state('partial', {
        url: '/p/:partial',
 		templateUrl: 'templates/partial.html',
 		controller: 'PartialCtrl'
    })
    .state('hbv', {
    	url: '/hbv',
       	templateUrl: 'templates/hbv.html',
		controller: 'HBVCtrl'
 	})
    .state('hbv-details', {
      url: '/hbv/:ligaId',
      templateUrl: 'templates/hbv-details.html',
      controller: 'HBVDetailsCtrl'
    })
    .state('beitrag', {
      url: '/beitrag-verfassen',
      templateUrl: 'templates/beitrag-verfassen.html',
      controller: 'BeitragVerfassenCtrl'
    })
    ;
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/news');

  $sceDelegateProvider.resourceUrlWhitelist([
     // Allow same origin resource loads.
     'self',
     // Allow loading from our assets domain.  Notice the difference between * and **.
     'http://arnheiter.eu/**'
   ]);
});

