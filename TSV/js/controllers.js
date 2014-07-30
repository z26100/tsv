angular
		.module('starter.controllers', [])
		
        .controller('TabCtrl',	function($scope, $ionicSideMenuDelegate, MongoDBResource ) {
            
            $scope.client = '0001';
            
		/***************************
    		Left and Right Sidemenu
    	****************************/
            MongoDBResource.query('leftMenu', {client:$scope.client}).then( function(response) {
            	$scope.leftMenu = response;    
            });
   			MongoDBResource.query('rightMenu', {client:$scope.client}).then( function(response) {
            	$scope.rightMenu = response;    
            })
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
		.controller('NewsCtrl',	function($scope, MongoDBResource) {
            $scope.partial = {id:'news', name:'News'};
            MongoDBResource.query('beitraege',{client:'0001', isNews:'true'}).then(function(d) {
                $scope.news = d;
        	 });	
		})
		.controller('ArticleCtrl', function($scope, $stateParams, MongoDBResource) {
            
            MongoDBResource.loadById('0001', 'beitraege',$stateParams.id).then(function(d) {
                $scope.article = d;
                console.log("article = " + JSON.stringify($scope.article));
            });	
		
//             $scope.partial = PartialResource.load($stateParams.newsId);
//           JSONResource.get('articles/' + $stateParams.newsId).then(function(d) {
//    	          $scope.article = d;
//	    	 });	
		})
		
		/***********
			Teams
		*************/
		.controller('TeamsCtrl', function($scope, MongoDBResource, $stateParams) {
            MongoDBResource
            $scope.partial = {id:'teams', name:'Teams'};
            JSONResource.get('teams').then(function(d) {
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
		.controller('KontaktCtrl', function($scope, JSONResource) {
            $scope.partial = {id:'kontakt', name:'Kontakt'};
            JSONResource.get('kontakte').then(function(d) {
                $scope.kontakte = d;
                console.log(d);
            });
		})
		.controller('PartialCtrl', function($scope, $stateParams, MongoDBResource) {
            var id = $stateParams.partial;
            var name = id.charAt(0).toUpperCase() + id.slice(1);
            $scope.partial = {id: id, name: name};
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
;