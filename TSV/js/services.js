angular.module('starter.services', [])
.factory('PartialResource', function() {
    return {
        get : function(partial, client) {
           return { id:partial, _id: partial.charAt(0).toUpperCase() + '-' + client, name: partial.charAt(0).toUpperCase() + partial.slice(1), client:client };
        }
    };
})
.factory('PartialService', function() {
    return '<div></div>';
})
.factory('JSONResource', function($http) {
	 var result = {
	    load: function(resource) {
                    console.log('Load ' + resource);
                    var promise = $http.get('http://arnheiter.eu/tsv/data/'+resource+'.json').then(function (response) {
                        console.log(resource + " loaded");
			        	return response.data;
			      });
			      return promise;
			    },
         get: function(resource) {
                    console.log('Load ' + resource);
                    var promise = $http.get('http://arnheiter.eu/mongodb/tsv/'+resource+'?q='+new Date().getTime()).then(function (response) {
                        console.log(resource + " loaded");
			        	return response.data;
			      });
			      return promise;
			    },
         post: function(resource, data) {
                    console.log('Post ' + resource);
                    var promise = $http.post('http://arnheiter.eu/mongodb/tsv/'+resource, data).then(function (response) {
                        console.log(resource + " loaded");
			        	return response.data;
			      });
			      return promise;
			 
         }

			  };
			  return result;
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