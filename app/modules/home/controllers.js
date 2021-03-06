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
            if (item) {
                $rootScope.$broadcast('region', {name: item.display});
            } else {
                $rootScope.$broadcast('region', {name: "none"});
            }
        }
    })
    .controller('DCController',
    function ($rootScope, $scope, Datacenter, $timeout, $q, $log, REGIONSMAP) {

        var self = this;
        self.activated = false;
        var dcs = [];
        var region = REGIONSMAP[$rootScope.globals.currentUser.region];
        self.queryResults = [];
        self.transformedQueryResults = transformResults();
        self.selectedItem = null;
        self.searchText = "";
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;

        $scope.$on('region', function (event, data) {
            if (data.name == "none") {
                self.transformedQueryResults = [];
            } else {
                region = REGIONSMAP[data.name];
                transformResults();
            }
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
            self.activated = true;
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
                self.activated = false;
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
        self.activated = false;
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
            self.activated = true;
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
                self.activated = false;
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
    .controller('VlanMultipleController', function ($timeout, $rootScope, Network, $scope) {

        var self = this;
        self.activated = false;
        $scope.vlans = [];
        $scope.presetVlan = "";
        var eventdc = {};
        var eventnd = {};
        var region = "";
        var allVlans = "";

        $scope.$on('networkdomain', function (event, data) {
            console.log("event: " + event + data.id);
            self.activated = true;
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
                self.activated = false;
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

        var self = this;
        self.activated = false;

        var eventdata = {};
        var servers = [];
        var region = "";
        var networkdomain = "";
        var vlans = [];
        var bends = [];
        var labelString = "";
        $scope.vlanSelected = [];
        $scope.isDisabled = true;

        $scope.$on('bends', function (event, data) {
            console.log("bends data: " + JSON.stringify(data.data));
            bends = angular.copy(data.data);
        });

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
                self.activated = true;
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
                                    selected: false,
                                    vlan: d.data.server[i]['networkInfo']['primaryNic']['vlanName'],
                                    ipv4: d.data.server[i]['networkInfo']['primaryNic']['privateIpv4'],
                                    ipv6: d.data.server[i]['networkInfo']['primaryNic']['ipv6'],
                                    baseip: vlanObj['privateIpv4Range']['address'] + "/" + vlanObj['privateIpv4Range']['prefixSize'],
                                    networkdomain: vlanObj['networkDomain']['name'],
                                    datacenter: vlanObj['datacenterId']
                                });
                            }
                        }
                    }
                    self.activated = false;
                });

            }
            $scope.isDisabled = false;

        });

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

        $scope.showConfirm = function (ev) {
            doVerifyCSV();
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'modules/home/views/confirmdialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    data: {a: $scope.csvData, b: bends, label: labelString}
                },
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                    console.log("here");
                    doExportToCSV();
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog, data) {
            $scope.csvData = data.a;
            $scope.bendData = data.b;
            $scope.label = data.label;
            console.log("Csv A-end dialog: " + $scope.csvData);
            console.log("Csv B-End dialog: " + $scope.bendData);
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

        function doVerifyCSV() {
            $scope.csvData = [];
            for (var j = 0; j < $scope.vlanSelected.length; j++) {
                var testVM = "";
                for (var i = 0; i < $scope.messages.length; i++) {
                    if ($scope.vlanSelected[j] == $scope.messages[i]['vlan']) {
                        if ($scope.messages[i]['selected']) {
                            testVM = $scope.messages[i]['ipv4'];
                        }
                        break;
                    }
                }
                for (var i = 0; i < $scope.messages.length; i++) {
                    if ($scope.vlanSelected[j] == $scope.messages[i]['vlan']) {
                        $scope.csvData.push({
                            vlan: $scope.messages[i]['vlan'],
                            'test VM': testVM,
                            'ipv4 range': $scope.messages[i]['baseip'],
                            networkdomain: $scope.messages[i]['networkdomain'],
                            datacenter: $scope.messages[i]['datacenter']
                        });
                        break;
                    }
                }

            }
            var aSubnets = "";
            var bSubnets = "";
            for (var i = 0; i < $scope.csvData.length; i++) {
                aSubnets += $scope.csvData[i]['ipv4 range'];
                if (i != $scope.csvData.length - 1) {
                    aSubnets += "; ";
                }

            }
            for (var i = 0; i < bends.length; i++) {
                bSubnets += bends[i]['iprange'];
                if (i != bends.length - 1) {
                    bSubnets += "; ";
                }
            }
            labelString = "This CPNC DCS will configure any traffic between A-end subnets " + aSubnets + " and B-end subnets " + bSubnets + " to route via the CPNC connection.";
            console.log("verify csv: " + JSON.stringify($scope.csvData));
        }

        function doExportToCSV() {
            console.log("messages1: " + JSON.stringify($scope.messages));
            console.log("vlans Selected: " + JSON.stringify($scope.vlanSelected));
            console.log("vlans Selected: " + JSON.stringify(bends));
            var csvData = [];
            for (var j = 0; j < $scope.vlanSelected.length; j++) {
                var testVM = "";
                for (var i = 0; i < $scope.messages.length; i++) {
                    if ($scope.vlanSelected[j] == $scope.messages[i]['vlan']) {
                        if ($scope.messages[i]['selected']) {
                            testVM = $scope.messages[i]['ipv4'];
                        }
                        break;
                    }
                }
                for (var i = 0; i < $scope.messages.length; i++) {
                    if ($scope.vlanSelected[j] == $scope.messages[i]['vlan']) {
                        csvData.push({
                            vlan: $scope.messages[i]['vlan'],
                            'test VM': testVM,
                            'ipv4 range': $scope.messages[i]['baseip'],
                            networkdomain: $scope.messages[i]['networkdomain'],
                            datacenter: $scope.messages[i]['datacenter']
                        });
                        break;
                    }
                }

            }

            for (var k = 0; k < bends.length; k++) {
                delete bends[k]['$$hashKey'];
            }
            console.log("csv: " + JSON.stringify(csvData));
            Util.ExportToCsv(csvData, bends, labelString, true);
        }

        function getVlan(name) {
            for (var i = 0; i < vlans.length; i++) {
                if (name === vlans[i]['name']) {
                    return vlans[i];
                }
            }
        }

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
    })
    .controller("FormController", ['$rootScope', '$scope', function ($rootScope, $scope) {
        $scope.bends = [];

        $scope.addNew = function (bends) {
            $scope.bends.push({
                'iprange': "",
                'mask': "",
                'vm': ""
            });
        };

        $scope.$watch("bends", function () {
            console.log("bends form: " + JSON.stringify($scope.bends));
            $rootScope.$broadcast('bends', {data: angular.copy($scope.bends)});
        }, true);

        $scope.remove = function () {
            var newDataList = [];
            $scope.selectedAll = false;
            angular.forEach($scope.bends, function (selected) {
                if (!selected.selected) {
                    newDataList.push(selected);
                }
            });
            $scope.bends = newDataList;
        };

        $scope.checkAll = function () {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.bends, function (bends) {
                bends.selected = $scope.selectedAll;
            });
        };
    }]);