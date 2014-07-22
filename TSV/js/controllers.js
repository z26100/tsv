angular
		.module('starter.controllers', [])
		.controller('DefaultCtrl',	function($scope) {
			$scope.client = '0001';
        })
        .controller('TabCtrl',	function($scope, $ionicSideMenuDelegate, JSONResource) {
		/***************************
    		Left and Right Sidemenu
    	****************************/
            JSONResource.get('leftMenu').then(function(d) {
                $scope.leftMenu = d;
            });		
			JSONResource.get('rightMenu').then(function(d) {
                $scope.rightMenu = d;
            });
            $scope.toggleLeftSideMenu = function() {
			      $ionicSideMenuDelegate.toggleLeft(false);			
			};
			$scope.toggleRightSideMenu = function() {
			      $ionicSideMenuDelegate.toggleRight(false);			
			};
		})
		.controller('ContentController',
				function($scope, $ionicSideMenuDelegate) {
					$scope.toggleLeft = function() {
						$ionicSideMenuDelegate.toggleLeft();
					};
				}
		)

		/****************************
			Neuigkeiten und Artikel
		*****************************/
		.controller('NewsCtrl',	function($scope, JSONResource) {
             JSONResource.get('news').then(function(d) {
                $scope.news = d;
        	 });	
		})
		.controller('ArticleCtrl', function($scope, $stateParams, JSONResource, PartialResource) {
             $scope.partial = PartialResource.load($stateParams.newsId);
             JSONResource.get('articles/' + $stateParams.newsId).then(function(d) {
    	          $scope.article = d;
	    	 });	
		})
		
		/***********
			Teams
		*************/
		.controller('TeamsCtrl', function($scope, JSONResource) {
            JSONResource.load('teams').then(function(d) {
                $scope.teams = d;
            });	
		})
		.controller('TeamDetailCtrl', function($scope, $stateParams, JSONResource, PartialResource) {
            $scope.partial = PartialResource.load('teamdetails');
            JSONResource.load('teams/' + $stateParams.teamId).then(function(d) {
                $scope.team = d;
            });	
  			JSONResource.load('tabellen/' + $stateParams.teamId).then(function(d) {
                $scope.tabelle = d;
            });
  			JSONResource.load('ergebnisse/' + $stateParams.teamId).then(function(d) {
                $scope.ergebnisse = d;
            });			
		})

		.controller('LivescoresCtrl', function($scope, JSONResource, PartialResource) {
            
            JSONResource.load('livescores').then(function(d) {
                $scope.liveScores = d;
            });	
            $scope.partialLiveScores = PartialResource.load('livescores');
            JSONResource.load('upcomingmatches').then(function(d) {
                $scope.upComing = d;
            });	
            $scope.partialUpcomingMatches = PartialResource.load('upcomingmatches');
        })

		.controller('VersionCtrl', function($scope) {
		})

		.controller('KontaktCtrl', function($scope, PartialResource, JSONResource) {
            $scope.partial = PartialResource.load('kontakt');
            JSONResource.load('kontakte').then(function(d) {
                $scope.kontakte = d;
            });
		})
		.controller('LinksCtrl', function($scope, $sce, JSONResource) {            
            JSONResource.get('partials/links').then(function(d) {
                 $scope.partial = d;
            });
             JSONResource.get('links').then(function(d) {
                 $scope.links = d;
            });
		})
		.controller('ImpressumCtrl', function($scope, $sce, JSONResource) {
            JSONResource.get('partials/impressum').then(function(d) {
                 $scope.html = $sce.trustAsHtml(d.html);
            });
		})
		.controller('AnfahrtCtrl', function($scope, PartialResource) {
       		 $scope.partial = PartialResource.load('anfahrt');
		})
		.controller('MitgliedschaftCtrl', function($scope, PartialResource) {
       		 $scope.partial = PartialResource.load('mitgliedschaft');
		})
		/*********
        	HBV
        **********/
		.controller('HBVCtrl', function($scope, JSONResource) {
            JSONResource.load('hbvligen').then(function(d) {
                $scope.ligen  = d;
            });
		})
		.controller('HBVDetailsCtrl', function($scope, JSONResource, PartialResource, $stateParams) {
            $scope.partial = PartialResource.load('teamdetails');
			$scope.ligaId = $stateParams.ligaId;
          	$scope.team = {'name':'TSV Grünberg'};
			console.log($scope.ligaId);
            JSONResource.load('hbvteams').then(function(d) {
                $scope.teams  = d;
            });
            JSONResource.load('tabellen/' + $scope.ligaId).then(function(d) {
                $scope.tabelle = d;
            });
  			JSONResource.load('ergebnisse/' + $scope.ligaId).then(function(d) {
                $scope.ergebnisse = d;
            });			
		})


		.controller('BeitragVerfassenCtrl', function($scope, $location, $window, JSONResource, Camera, $filter) {
             JSONResource.load('news').then(function(d) {
                $scope.news = d;
        	 });	
			var today = $filter('date')(new Date(),'dd.MM.yyyy HH:mm:ss');
			$scope.beitrag = {'id':'1', 'author':'Christian Arnheiter', 'date': today} ;
			
	        $scope.takePicture = function() {
    		    Camera.getPic();
    		};
            
			$scope.save = function () {
				console.log($scope.beitrag);			
				News.add($scope.beitrag);
				$location.path('/news' );
			};
			$scope.cancel = function () {	
				 $location.path('/news' );
			};
			$scope.help = function () {	
				$location.path('#' );
			};
		})
		.directive('partial', function($http, $compile) {
  		return {
       restrict: 'AE',
    	link: function( scope, element, attrs ) {
            console.log(attrs);
     	var tpl, url = 'http://arnheiter.eu/mongodb/tsv/partials/'+attrs.id;
        showTheDirective();
     
      function showTheDirective () {
        if ( !tpl ) {
          $http.get( url ).then( function ( response ) {
            tpl = $compile( response.data.html )( scope );
            console.log(tpl);
            element.append(tpl);
          });
        }
      }
    }
  };
})
;