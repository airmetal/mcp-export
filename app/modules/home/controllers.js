'use strict';

angular.module('DC')

    .controller('RegionController',
    function ($scope, $rootScope, $timeout, $q, $log, REGIONS) {

        var self = this;

        self.selectedItem = $rootScope.globals.currentUser.region;
        self.regions = loadAll();
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;

        /**
         * Build `regions` list of key/value pairs
         */
        function loadAll() {
            return REGIONS
                .split(',').map(function (region) {
                    return {
                        value: region.toLowerCase(),
                        display: region
                    };
                });
        }

        function querySearch(query) {
            var results = query ? self.states.filter(createFilterFor(query)) : self.regions;
            return results;
        }

        function selectedItemChange(item) {
            console.log(item);
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(region) {
                console.log(region.display);
                return (region.value.indexOf(lowercaseQuery) === 0);
            };
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            $rootScope.$broadcast('region', {name: item.display});
        }
    })
    .controller('DCController',
    function ($rootScope, $scope, Datacenter, $timeout, $q, $log, REGIONSMAP) {

        var self = this;
        var dcs = [];
        var region = REGIONSMAP[$rootScope.globals.currentUser.region];
        self.queryResults = [];
        self.transformedQueryResults = transformResults();
        self.selectedItem = null;
        self.searchText = "";
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;

        $scope.$on('region', function (event, data) {
            region = REGIONSMAP[data.name];
            transformResults();
        });


        function querySearch(query) {
            //console.log(query);
            var results = query ? self.transformedQueryResults.filter(createFilterFor(query)) : self.transformedQueryResults;
            //console.log(self.queryResults);
            return $q.when(results);
        }

        function selectedItemChange(item) {
            console.log(item);
        }

        function transformResults() {
            Datacenter.getHttp(region).then(function (response) {
                var transformedResults = [];
                var results = dcs = response.data.datacenter;
                results.forEach(function (item) {
                    var transformedItem = parseItem(item);
                    transformedResults.push(transformedItem);
                });
                // queryResults get the items with all the informations, it is usefull
                // for the implementation of the selectedItemChange method (send mail, call number.. etc)
                self.queryResults = results;
                // here, only the objects i want to save
                self.transformedQueryResults = transformedResults;
            });
        }

        // the value is important to filter the results
        function parseItem(item) {
            switch (item.type) {
                // case 'software':
                //   return {
                //     "display" : item.infos.name,
                //     "value": angular.lowercase(item.infos.name),
                //     "icon" : item.infos.icon,
                //   }
                // break;
                // case 'customer':
                //   return {
                //     "display" : item.infos.name,
                //     "value": angular.lowercase(item.infos.name),
                //     "icon" : item.infos.icon,
                //   }
                // break;
                case 'contributor':
                    return {
                        "display": item.infos.company + ', ' + item.infos.name,
                        "value": angular.lowercase(item.infos.company + ', ' + item.infos.name),
                        "icon": item.infos.icon,
                    };
                    break;
                default:
                    return {
                        "display": item.displayName,
                        "value": angular.lowercase(item.displayName)
                        //  "icon" : item.infos.icon,
                    };
                    break;
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(dc) {
                console.log(dc.display);
                return (dc.value.indexOf(lowercaseQuery) === 0);
            };
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            if (item) {
                for (var i = 0; i < dcs.length; i++) {
                    if (item.display === dcs[i]['displayName']) {
                        $rootScope.$broadcast('datacenter', {item: dcs[i], region: region, id: dcs[i]['id']});
                    }
                }
            }
        }

    }).controller('NetController',
    function ($scope, $rootScope, Network, $timeout, $q, $log) {

        var self = this;
        var nds = [];
        var eventdc = {};
        var region = "";
        self.queryResults = [];
        self.transformedQueryResults = [];
        self.selectedItem = null;
        self.searchText = "";
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;

        $scope.$on('datacenter', function (event, data) {
            eventdc = data.item;
            region = data.region;
            transformResults(data.id);
        });

        function querySearch(query) {
            //console.log(query);
            var results = query ? self.transformedQueryResults.filter(createFilterFor(query)) : self.transformedQueryResults;
            //console.log(self.queryResults);
            return $q.when(results);
        }

        function selectedItemChange(item) {
            console.log(item);
        }

        function transformResults(id) {
            Network.getHttp(id, region).then(function (response) {
                var transformedResults = [];
                console.log(JSON.stringify(response));
                var results = nds = response.data.networkDomain;
                results.forEach(function (item) {
                    var transformedItem = parseItem(item);
                    transformedResults.push(transformedItem);
                });
                // queryResults get the items with all the informations, it is usefull
                // for the implementation of the selectedItemChange method (send mail, call number.. etc)
                self.queryResults = results;
                // here, only the objects i want to save
                self.transformedQueryResults = transformedResults;
            });
        }

        // the value is important to filter the results
        function parseItem(item) {
            switch (item.type) {
                // case 'software':
                //   return {
                //     "display" : item.infos.name,
                //     "value": angular.lowercase(item.infos.name),
                //     "icon" : item.infos.icon,
                //   }
                // break;
                // case 'customer':
                //   return {
                //     "display" : item.infos.name,
                //     "value": angular.lowercase(item.infos.name),
                //     "icon" : item.infos.icon,
                //   }
                // break;
                case 'contributor':
                    return {
                        "display": item.infos.company + ', ' + item.infos.name,
                        "value": angular.lowercase(item.infos.company + ', ' + item.infos.name),
                        "icon": item.infos.icon,
                    };
                    break;
                default:
                    return {
                        "display": item.name,
                        "value": angular.lowercase(item.name)
                        //  "icon" : item.infos.icon,
                    };
                    break;
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                console.log(state.display);
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            if (item) {
                for (var i = 0; i < nds.length; i++) {
                    if (item.display === nds[i]['name']) {
                        $rootScope.$broadcast('networkdomain', {
                            items: {dc: eventdc, nd: nds[i]},
                            region: region,
                            id: nds[i]['id']
                        });
                    }
                }
            }
        }
    })
    .controller('VlanController',
    function ($scope, Network, $rootScope, $timeout, $q, $log) {

        var self = this;
        var vlans = [];
        var eventdc = {};
        var eventnd = {};
        var region = "";

        self.baseIp = "";
        self.queryResults = [];
        self.transformedQueryResults = [];
        self.selectedItem = null;
        self.searchText = "";
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;

        $scope.$on('networkdomain', function (event, data) {
            console.log("event: " + event + data.id);
            eventdc = data.items.dc;
            eventnd = data.items.nd;
            region = data.region;
            transformResults(data.id);
        });

        function querySearch(query) {
            //console.log(query);
            var results = query ? self.transformedQueryResults.filter(createFilterFor(query)) : self.transformedQueryResults;
            //console.log(self.queryResults);
            return $q.when(results);
        }

        function selectedItemChange(item) {
            console.log(item);
        }

        function transformResults(id) {
            Network.getVlanHttp(id, region).then(function (response) {
                var transformedResults = [];
                var results = vlans = response.data.vlan;
                results.forEach(function (item) {
                    var transformedItem = parseItem(item);
                    transformedResults.push(transformedItem);
                });
                // queryResults get the items with all the informations, it is usefull
                // for the implementation of the selectedItemChange method (send mail, call number.. etc)
                self.queryResults = results;
                // here, only the objects i want to save
                self.transformedQueryResults = transformedResults;
            });
        }

        // the value is important to filter the results
        function parseItem(item) {
            switch (item.type) {
                // case 'software':
                //   return {
                //     "display" : item.infos.name,
                //     "value": angular.lowercase(item.infos.name),
                //     "icon" : item.infos.icon,
                //   }
                // break;
                // case 'customer':
                //   return {
                //     "display" : item.infos.name,
                //     "value": angular.lowercase(item.infos.name),
                //     "icon" : item.infos.icon,
                //   }
                // break;
                case 'contributor':
                    return {
                        "display": item.infos.company + ', ' + item.infos.name,
                        "value": angular.lowercase(item.infos.company + ', ' + item.infos.name),
                        "icon": item.infos.icon,
                    };
                    break;
                default:
                    return {
                        "display": item.name,
                        "value": angular.lowercase(item.name)
                        //  "icon" : item.infos.icon,
                    };
                    break;
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                console.log(state.display);
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            if (item) {
                for (var i = 0; i < vlans.length; i++) {
                    if (item.display === vlans[i]['name']) {
                        self.baseIp = vlans[i]['privateIpv4Range']['address'] + "/" + vlans[i]['privateIpv4Range']['prefixSize'];
                        $rootScope.$broadcast('vlan', {
                            region: region,
                            items: {dc: eventdc, nd: eventnd, vlan: vlans[i]},
                            id: vlans[i]['id']
                        });
                    }
                }
            } else {
                //Setting id to zero to clear out server list
                $rootScope.$broadcast('vlan', {
                    items: {dc: eventdc, nd: eventnd, vlan: vlans[i]},
                    region: region,
                    id: 0
                });
            }
        }
    })
    .controller('VlanMultipleController', function ($timeout, $rootScope, Network, $scope) {

        var self = this;
        $scope.vlans = [];
        $scope.presetVlan = "";
        var eventdc = {};
        var eventnd = {};
        var region = "";
        var allVlans = "";

        $scope.$on('networkdomain', function (event, data) {
            console.log("event: " + event + data.id);
            eventdc = data.items.dc;
            eventnd = data.items.nd;
            region = data.region;
            Network.getVlanHttp(data.id, region).then(function (response) {
                var transformedResults = [];
                var results = allVlans = response.data.vlan;
                results.forEach(function (item) {
                    var transformedItem = parseItem(item);
                    transformedResults.push(transformedItem);
                });
                // $scope.presetVlan = transformedResults[0];
                // queryResults get the items with all the informations, it is usefull
                // for the implementation of the selectedItemChange method (send mail, call number.. etc)
                $scope.vlans = transformedResults;
            });

        });

        $scope.$watch("presetVlan", function () {
            if ($scope.presetVlan) {
                var vlanSelected = JSON.stringify($scope.presetVlan).split(',');
                console.log("preset: " + vlanSelected);

                $rootScope.$broadcast('vlan', {
                    region: region,
                    items: {dc: eventdc, nd: eventnd, vlanArray: allVlans},
                    vlans: $scope.presetVlan
                });
            }
        });

        function parseItem(item) {
            switch (item.type) {
                // case 'software':
                //   return {
                //     "display" : item.infos.name,
                //     "value": angular.lowercase(item.infos.name),
                //     "icon" : item.infos.icon,
                //   }
                // break;
                // case 'customer':
                //   return {
                //     "display" : item.infos.name,
                //     "value": angular.lowercase(item.infos.name),
                //     "icon" : item.infos.icon,
                //   }
                // break;
                case 'contributor':
                    return {
                        "display": item.infos.company + ', ' + item.infos.name,
                        "value": angular.lowercase(item.infos.company + ', ' + item.infos.name),
                        "icon": item.infos.icon,
                    };
                    break;
                default:
                    return {
                        "display": item.name,
                        "value": item.name
                        //  "icon" : item.infos.icon,
                    };
                    break;
            }
        }

    })

    .controller('ServersController',
    function ($scope, $rootScope, Util, Server, $mdDialog, $log) {

        var eventdata = {};
        var servers = [];
        var region = "";
        var networkdomain = "";
        var vlans = [];
        $scope.vlanSelected = [];
        $scope.isDisabled = true;


        $scope.$on('vlan', function (event, data) {
            console.log("event: " + event + data.id);
            eventdata = data.items;
            vlans = data.items.vlanArray;
            networkdomain = data.items.nd;
            $scope.vlanSelected = angular.copy(data.vlans);
            console.log(" $scope.vlanSelected: " + JSON.stringify($scope.vlanSelected));
            console.log("vlans: " + JSON.stringify(vlans));
            region = data.region;
            $scope.messages = [];
            if (data.vlans) {
                Server.getserversWithNetworkDomainId(networkdomain.id, region).then(function (d) {
                    servers = d.data.server;
                    if (servers) {
                        for (var i = 0; i < d.data.server.length; i++) {
                            if (($scope.vlanSelected.indexOf(d.data.server[i]['networkInfo']['primaryNic']['vlanName']) !== -1)) {
                                var vlanObj = getVlan(d.data.server[i]['networkInfo']['primaryNic']['vlanName']);
                                $scope.messages.push({
                                    id: i,
                                    name: d.data.server[i]['name'],
                                    title: d.data.server[i]['name'] + " - " + d.data.server[i]['networkInfo']['primaryNic']['privateIpv4'],
                                    selected: true,
                                    vlan: d.data.server[i]['networkInfo']['primaryNic']['vlanName'],
                                    ipv4: d.data.server[i]['networkInfo']['primaryNic']['privateIpv4'],
                                    ipv6: d.data.server[i]['networkInfo']['primaryNic']['ipv6'],
                                    baseip: vlanObj['privateIpv4Range']['address'] + "/" + vlanObj['privateIpv4Range']['prefixSize'],
                                    networkdomain: vlanObj['networkDomain']['name']
                                });
                            }
                        }
                    }

                });

            }
            $scope.isDisabled = false;

        });

        /* $scope.$watch("messages", function(oldv, newv){
         if(oldv !== newv) {
         $scope.updates = [];
         console.log("update: ", JSON.stringify($scope.messages));
         for (var i = 0; i < $scope.messages.length; i++) {
         $scope.updates.push({id: i + 1, title: $scope.messages[i]['title'], selected: $scope.messages[i]['selected']});
         }
         console.log("update2: ", JSON.stringify($scope.updates));

         }
         }, true);*/

        $scope.doExportToCSV = function (data) {
            console.log("messages1: " + JSON.stringify($scope.messages));
            console.log("vlans Selected: " + JSON.stringify($scope.vlanSelected));
            var csvData = [];
            for (var i = 0; i < $scope.messages.length; i++) {
                for (var j = 0; j < $scope.vlanSelected.length; j++) {
                    if ($scope.messages[i]['selected']) {
                        if ($scope.vlanSelected[j] == $scope.messages[i]['vlan']) {
                            csvData.push({
                                server: $scope.messages[i]['name'],
                                vlan: $scope.messages[i]['vlan'],
                                ipv4: $scope.messages[i]['ipv4'],
                                ipv6: $scope.messages[i]['ipv6'],
                                baseip: $scope.messages[i]['baseip'],
                                networkdomain: $scope.messages[i]['networkdomain']
                            })
                        }
                    }
                }
            }
            console.log("csv: " + JSON.stringify(csvData));
            Util.ExportToCsv(csvData, "This CPNC DCS will configure any traffic destined to these VLANS (list VLANS) in (list network domain) to route via the CPNC connection.", true);
        };

        function getVlan(name) {
            for (var i = 0; i < vlans.length; i++) {
                if (name === vlans[i]['name']) {
                    return vlans[i];
                }
            }
        }

        $scope.doSecondaryAction = function (id) {
            console.log("event: " + JSON.stringify(id));
            $mdDialog.show(
                $mdDialog.alert()
                    .title(servers[id].name + " Details")
                    .textContent(JSON.stringify(flattenObject(servers[id])))
                    .ariaLabel(servers[id].name + " Details")
                    .ok('Close')
                    .targetEvent(event)
            );
        };

        var flattenObject = function (ob) {
            var toReturn = {};

            for (var i in ob) {
                if (!ob.hasOwnProperty(i)) continue;

                if ((typeof ob[i]) == 'object') {
                    var flatObject = flattenObject(ob[i]);
                    for (var x in flatObject) {
                        if (!flatObject.hasOwnProperty(x)) continue;

                        toReturn[i + '.' + x] = flatObject[x];
                    }
                } else {
                    toReturn[i] = ob[i];
                }
            }
            return toReturn;
        };

    })/*.controller('CsvController',
 function ($scope, $rootScope) {
 $scope.data = {};
 $scope.data.myInputArray = [{
 id: '0001',
 name: 'Jetson, George'
 }, {
 id: '0002',
 name: 'Jetson, Jane',
 alt: 'Jane, his wife.'
 }, {
 id: '0003',
 name: 'Jetson, Judith',
 alt: 'Daughter Judy'
 }, {
 id: '0004',
 name: 'Jetson, Elroy',
 alt: 'Boy Elroy'
 }, {
 id: 'THX1138',
 name: 'Rosie The Maid',
 alt: 'Rosie'
 }];

 $scope.data.exportFilename = 'MCPExportData.csv';
 $scope.data.displayLabel = 'Export to CSV';
 $scope.data.myHeaderData = {
 name: 'Server',
 ipv4: 'IPv4',
 ipv6: 'IPv6',
 vlan: 'VLAN'
 };

 $scope.$on('servers', function(event, data) {
 console.log("event: "+event);
 $scope.data.myInputArray = data.items.selection;
 console.log("input: "+JSON.stringify($scope.data.myInputArray));
 });


 })*/;
