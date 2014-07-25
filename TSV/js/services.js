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
.factory('MongoDBResource', function(JSONResource) {
    return {
        init : function(client, type) {
            var _id = client + '-' + type;
            return { "_id": _id, "client": client, "type": type, "name" : type.charAt(0).toUpperCase() + type.slice(1) };
        },
        load : function(collection, data) {
            var resource = data.client + '/' + collection;
            var request = { 'operation': 'findOneByQuery', data:data};
            return JSONResource.post(resource, request);
        },
        loadById : function(client, collection,id) {
            var resource = client + '/' + collection;
            var data = { _id: id};
            var request = { 'operation': 'findOneByQuery', data:data};
            return JSONResource.post(resource, request);
        },
        query : function(collection, data) {
            var resource = data.client + '/' + collection;
            var request = { 'operation': 'findAll', data:data};
            return JSONResource.post(resource, request);
        },
        save : function(collection, data) {
            var resource = data.client + '/' + collection;
            data.timestamp = new Date().getTime();
            var request = { "operation": "save", "data":data};
            JSONResource.post(resource, request).then( function(response) {
                return response;
            });            
        },
        remove : function(collection, data) {
            var resource = data.client + '/' + collection;
            var request = { "operation": "remove", "data":data};
            JSONResource.post(resource, request).then( function(response) {
                return response;
            });            
        }
    };
})
.factory('JSONResource', function($http) {
	 var result = {
         get: function(resource) {
                    var uri = 'http://arnheiter.eu/mongodb/'+resource+'?q='+new Date().getTime();
                    console.log('Get ' + uri);
                    var promise = $http.get(uri).then(function (response, status) {
			        	return response.data;
			      });
			      return promise;
			    },
         post: function(resource, data) {
                    var uri = 'http://arnheiter.eu/mongodb/'+resource+'?q='+new Date().getTime();
                    console.log('Post ' + uri + ' with body ' + JSON.stringify(data));
                    var promise = $http.post(uri, data).then(function (response) {
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