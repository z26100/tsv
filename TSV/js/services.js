angular.module('starter.services', [])

.factory('JSONResource', function($http) {
	 var result = {
			    load: function(resource) {
                    console.log('Load ' + resource);
                    var promise = $http.get('http://arnheiter.eu/tsv/data/'+resource+'.json').then(function (response) {
                        console.log(resource + " loaded");
			        	return response.data;
			      });
			      return promise;
			    }
			  };
			  return result;
})
.factory('PartialResource', function() {
    return {
		load : function(name) { 
            var partialSrc = "http://arnheiter.eu/tsv/partials/" + name + ".html";
            var partial =  {"src":partialSrc, "random": new Date().getTime()};
            console.log("Partial = " + partialSrc);
            return partial;
        }
	};
})
.factory('Camera', function($q) {
    var deferred = $q.defer();
    return {
        getPic: function() {
            console.log(navigator.camera);
        }
    }
})
;