(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {


        var api = {
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            removeWebsite: removeWebsite
        };
        return api;

        function createWebsite(uid, website) {
            var url = "/api/user/"+uid+"/website";
            return $http.post(url, website);
        }

        function findWebsitesForUser(uid) {
            var url = "/api/user/"+uid+"/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }

        function updateWebsite(website) {
            var url = "/api/website/"+website._id;
            return $http.put(url, website);
        }

        function removeWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.delete(url);
        }

    }
})();