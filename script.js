/**
 * Created by Moshi on 12/7/2015.
 */
angular.module('app', ['ngJsTree'])
    .controller('Ctrl', function ($scope) {

        $scope.search = null;
        /**
         * This constant is the AWS Available services actions that can be used in the policy document
         * Follow this link to get the updated list: http://run.plnkr.co/plunks/6u8tlJXjis1XW2f3AZYZ/
         * Read this for further information:  https://github.com/Dome9/webapp/wiki/Aws-Policy-Generator
         * @type {*[]}
         */
            var servicesActions = [{
                "name": "User",
                "actions": ["create", 'delete', 'update']
            },
            {
                "name": "Product",
                "actions": ["create", 'delete', 'update']
            },
            {
                "name": "Order",
                "actions": ["create", 'delete', 'update']
            }
        ];

        $scope.treeConfig = {
            "core" : {
                "themes" : {
                    variant: "large",
                    icons: false
                }
            },
            search: {
                show_only_matches: true,
                show_only_matches_children: true,
            },
            "checkbox" : {
                "keep_selected_style" : false
            },
            types:{

            },
            "plugins" : [ 'wholerow', 'checkbox', 'search' ]
        };

        $scope.tree = _.chain(servicesActions)
            .map(function(service){
                var rootNode = {
                    id: service.name,
                    parent: '#',
                    text: service.name
                };

                var childNodes = _.map(service.actions, function(action){


                    return {
                        id: service.name + '#' + action,
                        parent: service.name,
                        text: action,
                        data: action
                    };
                });

                return [rootNode].concat(childNodes);

            })
            .flatten()
            .value();

        $scope.treeInstance = null;

        $scope.selected = function(){
            console.log($scope.treeInstance.jstree(true).get_selected(true));
        };

        $scope.handleSearchChanged = function(){
            $scope.treeInstance.jstree(true).search($scope.search)
        };
        $scope.handleSelectionChanged = function(node, selected, event){
            console.log($scope.treeInstance.jstree(true).get_selected(true));
        }
    });