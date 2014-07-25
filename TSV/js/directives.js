angular
.module('starter.directives', [])
	
.directive('partial', function(MongoDBResource, $compile) {
  		return {
        restrict: 'AE',
    	link: function( scope, element, attrs ) {
	       var tpl;
	       showTheDirective();
    	   function showTheDirective () {
           if ( !tpl ) {
               MongoDBResource.loadById('0001', 'partials',attrs.id).then(function(response) {
                tpl = $compile( response.html )( scope );
            	element.append(tpl);
           });
        }
        }
        }
        }
})     
;