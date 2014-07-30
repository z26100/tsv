angular
.module('starter.directives', [])
	
.directive('partial', function(MongoDBResource, $compile) {
  		return {
        restrict: 'AE',
    	link: function( scope, element, attrs ) {
	       var tpl;
	       showTheDirective();
    	   function showTheDirective () {
               try{
                   if ( !tpl ) {
                        MongoDBResource.loadById('0001', 'partials',attrs.id).then(function(response) {
                            if (response.collections.length > 0) {
                            try {
                                var collections = response.collections.split(",");
                                var count  = collections.length;  
								console.log("Collections = " + collections + ", count=" + count);
                                for (var i = 0; i < count; i++) {
                                    loadData(collections[i]).then( function() {
                                    })       
                                };
                            }  catch (err) {  
                            } 
                            }
                            tpl = $compile( response.html )( scope );
                            element.append(tpl);
                            
                        });
                    }
               } catch (err) {}
           };

        function loadData(collection) {
             console.log("loading data ");
            	MongoDBResource.query(collection,{client:'0001'}).then(function(r) {
                    scope[collection] = r;
                    console.log("loadData: "  +collection+ "=" + r);                    
                });
       	}
                }
        }
})
.directive('backButton', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                console.log("++++++++++++++++++++++++++++++BACK");
                elem.bind('click', function () {
                    console.log("BACK");
                    $window.history.back();
                });
            }
        };
    }]);
;
