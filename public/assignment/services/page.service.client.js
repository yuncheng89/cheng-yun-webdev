(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": 321, "name": "Post 1", "websiteId": 456, "description": "Lorem" },
            { "_id": 432, "name": "Post 2", "websiteId": 456, "description": "Lorem" },
            { "_id": 543, "name": "Post 3", "websiteId": 456, "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var id = parseInt(Math.random() * 1000);
            while (findPageById(id)!=null) {
                id = parseInt(Math.random() * 1000);
            }
            page._id = id;

            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var p in pages) {
                if(pages[p].websiteId == websiteId) {
                    result.push(pages[p]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return pages[p];
                }
            }
        }

        function updatePage(pageId, page) {

            console.log(pages);

            for(var p in pages) {
                pageToReplace = pages[p];
                if(pageToReplace._id === pageId) {
                    var start_index = p;
                    var number_of_elements_to_remove = 1;
                    pages.splice(start_index, number_of_elements_to_remove, page);
                }
            }

            console.log(pages);
            return null;
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);

            console.log("Page to be deleted is at index "+index);

            if (index > -1) {
                pages.splice(index, 1);
            }
        }

    }
})();