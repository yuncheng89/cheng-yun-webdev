(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": 123, "name": "Facebook",    "developerId": 456, "description": "Lorem" },
            { "_id": 234, "name": "Tweeter",     "developerId": 456, "description": "Lorem" },
            { "_id": 456, "name": "Gizmodo",     "developerId": 456, "description": "Lorem" },
            { "_id": 567, "name": "Tic Tac Toe", "developerId": 123, "description": "Lorem" },
            { "_id": 678, "name": "Checkers",    "developerId": 123, "description": "Lorem" },
            { "_id": 789, "name": "Chess",       "developerId": 234, "description": "Lorem" }
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            //TODO
        }

        function findWebsitesForUser(userId) {
            var result = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                console.log(websites[w]._id);
                if(websites[w]._id === websiteId) {
                    console.log(websites[w].name);
                    return websites[w];
                }
            }
            console.log(websites[w].name);
        }

        function updateWebsite(websiteId, website) {
            //TODO
        }

        function deleteWebsite(websiteId) {
            //TODO
        }

    }
})();