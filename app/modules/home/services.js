'use strict';

angular.module('CloudServices')

    .factory('Datacenter', function ($http, $rootScope) {

        // Some real static testing data
        var sample = {
            "datacenter": [
                {
                    "displayName": "LAB01 US - East (vmwareDC1/10.156.81.50)",
                    "city": "Ashburn",
                    "country": "US",
                    "vpnUrl": "https://vpnlabash01.opsourcecloud.net",
                    "ftpsHost": "10.157.0.54",
                    "networking": {
                        "property": [
                            {
                                "name": "MAX_SERVER_TO_VIP_CONNECTIONS",
                                "value": "10"
                            }
                        ],
                        "type": "1",
                        "maintenanceStatus": "NORMAL"
                    },
                    "hypervisor": {
                        "diskSpeed": [
                            {
                                "displayName": "Archive Disk Speed",
                                "abbreviation": "ARC",
                                "description": "Archive Disk Speed",
                                "unavailableReason": "replaced by ECONOMY",
                                "id": "ARCHIVE",
                                "available": false,
                                "default": false
                            },
                            {
                                "displayName": "Fast Disk Speed",
                                "abbreviation": "FAST",
                                "description": "Fast Disk Speed",
                                "unavailableReason": "replaced by HIGHPERFORMANCE",
                                "id": "FAST",
                                "available": false,
                                "default": false
                            },
                            {
                                "displayName": "High Performance",
                                "abbreviation": "HPF",
                                "description": "Faster than Standard. Uses 15000 RPM disk with Fast Cache.",
                                "id": "HIGHPERFORMANCE",
                                "available": true,
                                "default": false
                            },
                            {
                                "displayName": "Standard Speed",
                                "abbreviation": "STD",
                                "description": "Standard Disk Speed",
                                "id": "STANDARD",
                                "available": true,
                                "default": true
                            },
                            {
                                "displayName": "Economy",
                                "abbreviation": "ECN",
                                "description": "Slower than Standard. Uses 7200 RPM disk without Fast Cache.",
                                "id": "ECONOMY",
                                "available": true,
                                "default": false
                            }
                        ],
                        "property": [
                            {
                                "name": "MIN_DISK_SIZE_GB",
                                "value": "10"
                            },
                            {
                                "name": "MAX_DISK_SIZE_GB",
                                "value": "1000"
                            },
                            {
                                "name": "MAX_TOTAL_ADDITIONAL_STORAGE_GB",
                                "value": "750"
                            },
                            {
                                "name": "MAX_TOTAL_IMAGE_STORAGE_GB",
                                "value": "2600"
                            },
                            {
                                "name": "MAX_CPU_COUNT",
                                "value": "8"
                            },
                            {
                                "name": "MIN_MEMORY_MB",
                                "value": "1024"
                            },
                            {
                                "name": "MAX_MEMORY_MB",
                                "value": "65536"
                            }
                        ],
                        "type": "VMWARE",
                        "maintenanceStatus": "NORMAL"
                    },
                    "id": "LAB01_NA1",
                    "type": "MCP 1.0"
                },
                {
                    "displayName": "LAB01 US - West (vmwareDC2/10.156.81.80)",
                    "city": "Ashcisco",
                    "state": "California",
                    "country": "US",
                    "vpnUrl": "https://vpnlabash02.cloud-vpn.net/lab01",
                    "ftpsHost": "10.157.0.54",
                    "networking": {
                        "property": [
                            {
                                "name": "MAX_SERVER_TO_VIP_CONNECTIONS",
                                "value": "10"
                            }
                        ],
                        "type": "1",
                        "maintenanceStatus": "NORMAL"
                    },
                    "hypervisor": {
                        "diskSpeed": [
                            {
                                "displayName": "Fast Disk Speed",
                                "abbreviation": "FAST",
                                "description": "Fast Disk Speed",
                                "unavailableReason": "replaced by HIGHPERFORMANCE",
                                "id": "FAST",
                                "available": false,
                                "default": false
                            },
                            {
                                "displayName": "Standard Speed",
                                "abbreviation": "STD",
                                "description": "Standard Disk Speed",
                                "id": "STANDARD",
                                "available": true,
                                "default": true
                            },
                            {
                                "displayName": "Economy",
                                "abbreviation": "ECN",
                                "description": "Slower than Standard. Uses 7200 RPM disk without Fast Cache.",
                                "id": "ECONOMY",
                                "available": true,
                                "default": false
                            },
                            {
                                "displayName": "High Performance",
                                "abbreviation": "HPF",
                                "description": "Faster than Standard. Uses 15000 RPM disk with Fast Cache.",
                                "id": "HIGHPERFORMANCE",
                                "available": true,
                                "default": false
                            }
                        ],
                        "property": [
                            {
                                "name": "MIN_DISK_SIZE_GB",
                                "value": "10"
                            },
                            {
                                "name": "MAX_DISK_SIZE_GB",
                                "value": "1000"
                            },
                            {
                                "name": "MAX_TOTAL_ADDITIONAL_STORAGE_GB",
                                "value": "750"
                            },
                            {
                                "name": "MAX_TOTAL_IMAGE_STORAGE_GB",
                                "value": "2600"
                            },
                            {
                                "name": "MAX_CPU_COUNT",
                                "value": "16"
                            },
                            {
                                "name": "MIN_MEMORY_MB",
                                "value": "1024"
                            },
                            {
                                "name": "MAX_MEMORY_MB",
                                "value": "65536"
                            }
                        ],
                        "type": "VMWARE",
                        "maintenanceStatus": "NORMAL"
                    },
                    "id": "LAB01_NA2",
                    "type": "MCP 1.0"
                },
                {
                    "displayName": "LAB01 Hosted Private MCP (vmwareDC2/10.156.81.80)",
                    "city": "Ashcisco",
                    "state": "California",
                    "country": "US",
                    "vpnUrl": "https://vpnlabash02.cloud-vpn.net/lab01",
                    "ftpsHost": "10.157.0.54",
                    "networking": {
                        "property": [
                            {
                                "name": "MAX_SERVER_TO_VIP_CONNECTIONS",
                                "value": "10"
                            }
                        ],
                        "type": "1",
                        "maintenanceStatus": "NORMAL"
                    },
                    "hypervisor": {
                        "diskSpeed": [],
                        "property": [
                            {
                                "name": "MIN_DISK_SIZE_GB",
                                "value": "10"
                            },
                            {
                                "name": "MAX_DISK_SIZE_GB",
                                "value": "1000"
                            },
                            {
                                "name": "MAX_TOTAL_ADDITIONAL_STORAGE_GB",
                                "value": "750"
                            },
                            {
                                "name": "MAX_TOTAL_IMAGE_STORAGE_GB",
                                "value": "2600"
                            },
                            {
                                "name": "MAX_CPU_COUNT",
                                "value": "4"
                            },
                            {
                                "name": "MIN_MEMORY_MB",
                                "value": "1024"
                            },
                            {
                                "name": "MAX_MEMORY_MB",
                                "value": "65536"
                            }
                        ],
                        "type": "VMWARE",
                        "maintenanceStatus": "NORMAL"
                    },
                    "id": "LAB01_HPMCP_1",
                    "type": "MCP 1.0"
                },
                {
                    "displayName": "New Lab 1 (Backup-enabled/vmwarelabdc1/10.161.221.51)",
                    "city": "Ashburn",
                    "state": "Virginia",
                    "country": "US",
                    "vpnUrl": "https://na1lab.cloud-vpn.net/lab01",
                    "ftpsHost": "10.157.0.54",
                    "networking": {
                        "property": [
                            {
                                "name": "MAX_SERVER_TO_VIP_CONNECTIONS",
                                "value": "10"
                            }
                        ],
                        "type": "1",
                        "maintenanceStatus": "NORMAL"
                    },
                    "hypervisor": {
                        "diskSpeed": [
                            {
                                "displayName": "Standard Speed",
                                "abbreviation": "STD",
                                "description": "Standard Disk Speed",
                                "id": "STANDARD",
                                "available": true,
                                "default": true
                            }
                        ],
                        "property": [
                            {
                                "name": "MIN_DISK_SIZE_GB",
                                "value": "10"
                            },
                            {
                                "name": "MAX_DISK_SIZE_GB",
                                "value": "1000"
                            },
                            {
                                "name": "MAX_TOTAL_ADDITIONAL_STORAGE_GB",
                                "value": "750"
                            },
                            {
                                "name": "MAX_TOTAL_IMAGE_STORAGE_GB",
                                "value": "2600"
                            },
                            {
                                "name": "MAX_CPU_COUNT",
                                "value": "8"
                            },
                            {
                                "name": "MIN_MEMORY_MB",
                                "value": "1024"
                            },
                            {
                                "name": "MAX_MEMORY_MB",
                                "value": "65536"
                            }
                        ],
                        "type": "VMWARE",
                        "maintenanceStatus": "NORMAL"
                    },
                    "backup": {
                        "property": [],
                        "type": "COMMVAULT",
                        "maintenanceStatus": "NORMAL"
                    },
                    "id": "LABDC1",
                    "type": "MCP 1.0"
                },
                {
                    "displayName": "LAB01 US - Hyper-v",
                    "city": "Ashburn",
                    "country": "US",
                    "vpnUrl": "https://vpnlabash01.cloud-vpn.net/lab01",
                    "ftpsHost": "10.157.0.54",
                    "networking": {
                        "property": [
                            {
                                "name": "MAX_SERVER_TO_VIP_CONNECTIONS",
                                "value": "10"
                            }
                        ],
                        "type": "1",
                        "maintenanceStatus": "NORMAL"
                    },
                    "hypervisor": {
                        "diskSpeed": [
                            {
                                "displayName": "High Performance",
                                "abbreviation": "HPF",
                                "description": "Faster than Standard. Uses 15000 RPM disk with Fast Cache.",
                                "id": "HIGHPERFORMANCE",
                                "available": true,
                                "default": false
                            },
                            {
                                "displayName": "Standard Speed",
                                "abbreviation": "STD",
                                "description": "Standard Disk Speed",
                                "id": "STANDARD",
                                "available": true,
                                "default": true
                            }
                        ],
                        "property": [
                            {
                                "name": "MIN_DISK_SIZE_GB",
                                "value": "10"
                            },
                            {
                                "name": "MAX_DISK_SIZE_GB",
                                "value": "250"
                            },
                            {
                                "name": "MAX_TOTAL_ADDITIONAL_STORAGE_GB",
                                "value": "2500"
                            },
                            {
                                "name": "MAX_TOTAL_IMAGE_STORAGE_GB",
                                "value": "2600"
                            },
                            {
                                "name": "MAX_CPU_COUNT",
                                "value": "8"
                            },
                            {
                                "name": "MIN_MEMORY_MB",
                                "value": "1024"
                            },
                            {
                                "name": "MAX_MEMORY_MB",
                                "value": "65536"
                            }
                        ],
                        "type": "HYPERV",
                        "maintenanceStatus": "NORMAL"
                    },
                    "id": "LAB01_NA3",
                    "type": "MCP 1.0"
                },
                {
                    "displayName": "NLab 2(vmwarelabdc2/10.161.229.51)",
                    "city": "Ashburn",
                    "state": "Virginia",
                    "country": "US",
                    "vpnUrl": "https://na1lab.cloud-vpn.net/lab01",
                    "ftpsHost": "10.157.0.54",
                    "networking": {
                        "property": [
                            {
                                "name": "MAX_SERVER_TO_VIP_CONNECTIONS",
                                "value": "10"
                            }
                        ],
                        "type": "1",
                        "maintenanceStatus": "NORMAL"
                    },
                    "hypervisor": {
                        "diskSpeed": [
                            {
                                "displayName": "Economy",
                                "abbreviation": "ECN",
                                "description": "Slower than Standard. Uses 7200 RPM disk without Fast Cache.",
                                "id": "ECONOMY",
                                "available": true,
                                "default": false
                            },
                            {
                                "displayName": "Standard Speed",
                                "abbreviation": "STD",
                                "description": "Standard Disk Speed",
                                "id": "STANDARD",
                                "available": true,
                                "default": true
                            },
                            {
                                "displayName": "High Performance",
                                "abbreviation": "HPF",
                                "description": "Faster than Standard. Uses 15000 RPM disk with Fast Cache.",
                                "id": "HIGHPERFORMANCE",
                                "available": true,
                                "default": false
                            }
                        ],
                        "property": [
                            {
                                "name": "MIN_DISK_SIZE_GB",
                                "value": "10"
                            },
                            {
                                "name": "MAX_DISK_SIZE_GB",
                                "value": "1000"
                            },
                            {
                                "name": "MAX_TOTAL_ADDITIONAL_STORAGE_GB",
                                "value": "750"
                            },
                            {
                                "name": "MAX_TOTAL_IMAGE_STORAGE_GB",
                                "value": "2600"
                            },
                            {
                                "name": "MAX_CPU_COUNT",
                                "value": "8"
                            },
                            {
                                "name": "MIN_MEMORY_MB",
                                "value": "1024"
                            },
                            {
                                "name": "MAX_MEMORY_MB",
                                "value": "65536"
                            }
                        ],
                        "type": "VMWARE",
                        "maintenanceStatus": "NORMAL"
                    },
                    "id": "LABDC2",
                    "type": "MCP 1.0"
                },
                {
                    "displayName": "N2 Lab1 Vmware (vmwareN2DC1/10.159.81.51)",
                    "city": "Ashburn",
                    "state": "Virginia",
                    "country": "US",
                    "vpnUrl": "https://na1lab.cloud-vpn.net/lab01",
                    "ftpsHost": "10.157.0.54",
                    "networking": {
                        "property": [
                            {
                                "name": "MAX_NODE_CONNECTION_LIMIT",
                                "value": "100000"
                            },
                            {
                                "name": "MAX_NODE_CONNECTION_RATE_LIMIT",
                                "value": "4000"
                            },
                            {
                                "name": "MAX_VIRTUAL_LISTENER_CONNECTION_LIMIT",
                                "value": "100000"
                            },
                            {
                                "name": "MAX_VIRTUAL_LISTENER_CONNECTION_RATE_LIMIT",
                                "value": "4000"
                            }
                        ],
                        "type": "2",
                        "maintenanceStatus": "NORMAL"
                    },
                    "hypervisor": {
                        "diskSpeed": [
                            {
                                "displayName": "Standard Speed",
                                "abbreviation": "STD",
                                "description": "Standard Disk Speed",
                                "id": "STANDARD",
                                "available": true,
                                "default": true
                            },
                            {
                                "displayName": "High Performance",
                                "abbreviation": "HPF",
                                "description": "Faster than Standard. Uses 15000 RPM disk with Fast Cache.",
                                "id": "HIGHPERFORMANCE",
                                "available": true,
                                "default": false
                            }
                        ],
                        "property": [
                            {
                                "name": "MIN_DISK_SIZE_GB",
                                "value": "10"
                            },
                            {
                                "name": "MAX_DISK_SIZE_GB",
                                "value": "1000"
                            },
                            {
                                "name": "MAX_TOTAL_ADDITIONAL_STORAGE_GB",
                                "value": "750"
                            },
                            {
                                "name": "MAX_TOTAL_IMAGE_STORAGE_GB",
                                "value": "2500"
                            },
                            {
                                "name": "MAX_CPU_COUNT",
                                "value": "8"
                            },
                            {
                                "name": "MIN_MEMORY_MB",
                                "value": "1024"
                            },
                            {
                                "name": "MAX_MEMORY_MB",
                                "value": "65535"
                            }
                        ],
                        "type": "VMWARE",
                        "maintenanceStatus": "NORMAL"
                    },
                    "backup": {
                        "property": [],
                        "type": "COMMVAULT",
                        "maintenanceStatus": "NORMAL"
                    },
                    "consoleAccess": {
                        "property": [],
                        "maintenanceStatus": "NORMAL"
                    },
                    "id": "LAB01_N2_VMWARE_1",
                    "type": "MCP 2.0"
                }
            ],
            "pageNumber": 1,
            "pageCount": 7,
            "totalCount": 7,
            "pageSize": 250
        };

        return {
            all: function (region) {
                var promise = $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.globals.currentUser.orgId + '/infrastructure/datacenter',
                    headers: {'Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response);
                    return response;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error while received data.");
                    return response;
                });
                return promise;
            },

            get: function (networkId) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === networkId) {
                        return data[i];
                    }
                }
                return null;
            },

            getHttp: function (region) {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.globals.currentUser.orgId + '/infrastructure/datacenter',
                    headers: {'Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}
                })
            }
        }
    })
    .factory('Network', function ($http, $rootScope) {
        // Some real static testing data
        var domainsample = {
            "networkDomain": [{
                "name": "JBs First Domain Deployment",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.35",
                "createTime": "2015-04-23T16:04:25.000Z",
                "state": "NORMAL",
                "id": "e3b5c08a-a74e-41c2-b6a8-186cbaa86299",
                "datacenterId": "NA9"
            }, {
                "name": "Ben's Network Domain",
                "description": "Green Machine :)\n",
                "type": "ADVANCED",
                "snatIpv4Address": "168.128.2.38",
                "createTime": "2015-04-24T13:05:13.000Z",
                "state": "NORMAL",
                "id": "2709df9f-d07e-4627-8042-e4cfa316a963",
                "datacenterId": "NA9"
            }, {
                "name": "Cisco Network Domain",
                "description": "Delete Anytime",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.43",
                "createTime": "2015-04-24T13:22:30.000Z",
                "state": "NORMAL",
                "id": "3fce94ce-7237-494b-abeb-0bb8dbfc37a9",
                "datacenterId": "NA9"
            }, {
                "name": "Greg's First Network Domain",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.45",
                "createTime": "2015-04-24T14:10:18.000Z",
                "state": "NORMAL",
                "id": "11b87069-4958-4d7b-b0b2-1520f731e01f",
                "datacenterId": "NA9"
            }, {
                "name": "deenesh test - can delete",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.57",
                "createTime": "2015-04-27T07:50:51.000Z",
                "state": "NORMAL",
                "id": "396dbe06-02f3-4649-8e6f-66cee0c68138",
                "datacenterId": "NA9"
            }, {
                "name": "John-Test",
                "description": "DO Not Delete - Demo on 7/20/15",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.62",
                "createTime": "2015-04-27T14:00:47.000Z",
                "state": "NORMAL",
                "id": "e7630d6b-4de4-4f9a-aaba-7f057f2aeb20",
                "datacenterId": "NA9"
            }, {
                "name": "TEST AV",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.63",
                "createTime": "2015-04-27T14:15:29.000Z",
                "state": "NORMAL",
                "id": "b1e72abb-b57b-496f-afaf-2022d7b151db",
                "datacenterId": "NA9"
            }, {
                "name": "My Demo Domain",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.64",
                "createTime": "2015-04-27T18:32:07.000Z",
                "state": "NORMAL",
                "id": "2680394d-c641-49ca-a471-2add57a8f395",
                "datacenterId": "NA9"
            }, {
                "name": "Indaba Table7 Domain",
                "description": "Indaba Table 7",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.76",
                "createTime": "2015-04-29T21:28:13.000Z",
                "state": "NORMAL",
                "id": "483ba887-daaa-4909-92d4-4395b940a839",
                "datacenterId": "NA9"
            }, {
                "name": "Troy Indaba Network Domain",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.77",
                "createTime": "2015-04-29T21:28:49.000Z",
                "state": "NORMAL",
                "id": "3ebc07de-4bac-4ccd-990e-275a32c9b4fd",
                "datacenterId": "NA9"
            }, {
                "name": "EMC test",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.31",
                "createTime": "2015-05-05T15:02:32.000Z",
                "state": "NORMAL",
                "id": "53206c98-dd27-4f86-8b3d-34b8679e1e09",
                "datacenterId": "NA9"
            }, {
                "name": "Josh's Network",
                "description": "test network",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.81",
                "createTime": "2015-05-06T16:07:46.000Z",
                "state": "NORMAL",
                "id": "7ccd6987-4338-48f4-826e-c43ada2657ca",
                "datacenterId": "NA9"
            }, {
                "name": "Demo",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.83",
                "createTime": "2015-05-06T16:33:49.000Z",
                "state": "NORMAL",
                "id": "ce4473dd-1ae9-4df9-9b2a-5dde55fa4cdf",
                "datacenterId": "NA9"
            }, {
                "name": "KC Hadoop",
                "description": "This is for Hadoop project. PLEASE DO NOT DELETE OR MODIFY THIS NETWORK",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.67",
                "createTime": "2015-05-10T23:42:36.000Z",
                "state": "NORMAL",
                "id": "b6c2afb2-07a9-4d9e-a118-b0c949a1e8f5",
                "datacenterId": "NA9"
            }, {
                "name": "Resolve Systems Demo",
                "description": "Demo",
                "type": "ADVANCED",
                "snatIpv4Address": "168.128.2.92",
                "createTime": "2015-05-12T17:25:27.000Z",
                "state": "NORMAL",
                "id": "633ff927-e29b-41f2-afa0-c3ad797e05ff",
                "datacenterId": "NA9"
            }, {
                "name": "Demotest",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.96",
                "createTime": "2015-05-14T13:05:01.000Z",
                "state": "NORMAL",
                "id": "88b0a9eb-5e5e-4e89-924a-178357a32c56",
                "datacenterId": "NA9"
            }, {
                "name": "RJax_Domain",
                "description": "",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.52",
                "createTime": "2015-06-03T21:12:42.000Z",
                "state": "NORMAL",
                "id": "006ea1be-6746-4e3f-abae-5270594e6bf3",
                "datacenterId": "NA9"
            }, {
                "name": "Do Not Delete!  Dave Edwards Demo Network Domain for SAP HANA",
                "description": "",
                "type": "ADVANCED",
                "snatIpv4Address": "168.128.2.73",
                "createTime": "2015-06-17T17:51:05.000Z",
                "state": "NORMAL",
                "id": "f4937b8f-6ce9-4138-a270-18e5dd8e3a23",
                "datacenterId": "NA9"
            }, {
                "name": "Brantley's Test Domain",
                "description": "This is Brantley Richbourg's test domain",
                "type": "ADVANCED",
                "snatIpv4Address": "168.128.2.110",
                "createTime": "2015-06-18T01:55:04.000Z",
                "state": "NORMAL",
                "id": "2be9104d-ce19-4634-bd11-d6173eaae18f",
                "datacenterId": "NA9"
            }, {
                "name": "DoubleTake test",
                "description": "",
                "type": "ADVANCED",
                "snatIpv4Address": "168.128.2.125",
                "createTime": "2015-06-24T11:35:44.000Z",
                "state": "NORMAL",
                "id": "a48fd2f8-bb3c-4200-85ba-20d19421f199",
                "datacenterId": "NA9"
            }, {
                "name": "DavidTestDomain",
                "description": "",
                "type": "ADVANCED",
                "snatIpv4Address": "168.128.2.140",
                "createTime": "2015-07-16T14:23:08.000Z",
                "state": "NORMAL",
                "id": "cac425da-a92e-4f1b-81b9-d250b617717c",
                "datacenterId": "NA9"
            }, {
                "name": "testtesttest",
                "description": "the test domain",
                "type": "ESSENTIALS",
                "snatIpv4Address": "168.128.2.141",
                "createTime": "2015-07-22T16:36:20.000Z",
                "state": "NORMAL",
                "id": "e136cce7-e9dd-49b0-b53e-117ecb705f83",
                "datacenterId": "NA9"
            }], "pageNumber": 1, "pageCount": 22, "totalCount": 22, "pageSize": 250
        };
        var vlansample = {
            "vlan": [{
                "networkDomain": {
                    "id": "e3b5c08a-a74e-41c2-b6a8-186cbaa86299",
                    "name": "JBs First Domain Deployment"
                },
                "name": "JB's First VLAN",
                "description": "",
                "privateIpv4Range": {"address": "10.0.0.0", "prefixSize": 24},
                "ipv4GatewayAddress": "10.0.0.1",
                "ipv6Range": {"address": "2607:f480:111:1151:0:0:0:0", "prefixSize": 64},
                "ipv6GatewayAddress": "2607:f480:111:1151:0:0:0:1",
                "createTime": "2015-04-23T16:05:26.000Z",
                "state": "NORMAL",
                "id": "526a4ac4-a7d4-45ed-8da4-4a5076b3d1ee",
                "datacenterId": "NA9"
            }, {
                "networkDomain": {"id": "e3b5c08a-a74e-41c2-b6a8-186cbaa86299", "name": "JBs First Domain Deployment"},
                "name": "JB 2nd VLAN",
                "description": "",
                "privateIpv4Range": {"address": "10.0.1.0", "prefixSize": 24},
                "ipv4GatewayAddress": "10.0.1.1",
                "ipv6Range": {"address": "2607:f480:111:1152:0:0:0:0", "prefixSize": 64},
                "ipv6GatewayAddress": "2607:f480:111:1152:0:0:0:1",
                "createTime": "2015-04-23T16:14:32.000Z",
                "state": "NORMAL",
                "id": "126a9a9f-451f-4313-ad7a-052a286e5225",
                "datacenterId": "NA9"
            }], "pageNumber": 1, "pageCount": 2, "totalCount": 2, "pageSize": 250
        };
        return {
            all: function (datacenterId, region, mcpType, page) {
                var promise = $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.orgId + '/network/networkDomain?pageNumber=' + page,
                    headers: {'Authorization': 'Basic ' + $rootScope.encodedCredentials}
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response);
                    return response;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error while received data.");
                    return response;
                });
                return promise;
            },

            getvlan: function (networkId, region) {
                var promise = $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.orgId + '/network/vlan?networkDomainId=' + networkId,
                    headers: {'Authorization': 'Basic ' + $rootScope.encodedCredentials}
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response);
                    return response;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error while received data.");
                    return response;
                });
                return promise;
            },

            deletevlan: function (vlanId, region) {
                // Define the string
                var string = $rootScope.username + ":" + $rootScope.password;

                // Encode the String
                var encodedString = btoa(string);
                var promise = $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.orgId + '/network/vlan?vlan?id=' + vlanId,
                    headers: {'Authorization': 'Basic ' + encodedString}
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response);
                    return response;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error while received data.");
                    return response;
                });
                return promise;
            },

            getHttp: function (datacenterId, region) {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.globals.currentUser.orgId + '/network/networkDomain?datacenterId=' + datacenterId,
                    headers: {'Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}
                })
            },

            getVlanHttp: function (networkDomainId, region) {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.globals.currentUser.orgId + '/network/vlan?networkDomainId=' + networkDomainId,
                    headers: {'Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}
                })
            }
        }
    })
    .factory('Server', function ($http, $rootScope) {

        return {
            all: function (region) {
                var promise = $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.globals.currentUser.orgId + '/server/server?pageNumber=' + page,
                    headers: {'Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response);
                    return response;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error while received data.");
                    return response;
                });
                return promise;
            },

            getserver: function (vlanId, region) {
                var promise = $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.globals.currentUser.orgId + '/server/server?vlanId=' + vlanId,
                    headers: {'Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response);
                    return response;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error while received data.");
                    return response;
                });
                return promise;
            },
            getserversWithNetworkDomainId: function (networkdomainId, region) {
                console.log("ID received: " + networkdomainId);
                var promise = $http({
                    method: 'GET',
                    url: 'http://localhost:8080/v24/' + region + "/" + $rootScope.globals.currentUser.orgId + '/server/server?networkDomainId=' + networkdomainId,
                    headers: {'Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response);
                    return response;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error while received data.");
                    return response;
                });
                return promise;
            }

        }
    })
    .factory('Accounts', function ($http, $rootScope) {
        // Some real static testing data
        var sample = {
            "data": {
                "Account": {
                    "userName": {"__prefix": "ns14", "__text": "andrew.das"},
                    "fullName": {"__prefix": "ns14", "__text": "Andrew Das"},
                    "firstName": {"__prefix": "ns14", "__text": "Andrew"},
                    "lastName": {"__prefix": "ns14", "__text": "Das"},
                    "emailAddress": {"__prefix": "ns14", "__text": "andrew.das@itaas.dimensiondata.com"},
                    "department": {"__prefix": "ns14"},
                    "customDefined1": {"__prefix": "ns14", "__text": "ITaaS Integration Architect"},
                    "customDefined2": {"__prefix": "ns14"},
                    "orgId": {"__prefix": "ns14", "__text": "6ea2bab8-afd5-4ebf-baf5-7e3f82d50e85"},
                    "roles": {
                        "role": [{
                            "name": {"__prefix": "ns14", "__text": "network"},
                            "__prefix": "ns14"
                        }, {
                            "name": {"__prefix": "ns14", "__text": "reports"},
                            "__prefix": "ns14"
                        }, {
                            "name": {"__prefix": "ns14", "__text": "create image"},
                            "__prefix": "ns14"
                        }, {
                            "name": {"__prefix": "ns14", "__text": "storage"},
                            "__prefix": "ns14"
                        }, {"name": {"__prefix": "ns14", "__text": "server"}, "__prefix": "ns14"}, {
                            "name": {
                                "__prefix": "ns14",
                                "__text": "backup"
                            }, "__prefix": "ns14"
                        }], "__prefix": "ns14"
                    },
                    "_xmlns:ns16": "http://oec.api.opsource.net/schemas/reset",
                    "_xmlns": "http://oec.api.opsource.net/schemas/server",
                    "_xmlns:ns14": "http://oec.api.opsource.net/schemas/directory",
                    "_xmlns:ns15": "http://oec.api.opsource.net/schemas/multigeo",
                    "_xmlns:ns9": "http://oec.api.opsource.net/schemas/storage",
                    "_xmlns:ns5": "http://oec.api.opsource.net/schemas/serverbootstrap",
                    "_xmlns:ns12": "http://oec.api.opsource.net/schemas/datacenter",
                    "_xmlns:ns13": "http://oec.api.opsource.net/schemas/manualimport",
                    "_xmlns:ns6": "http://oec.api.opsource.net/schemas/backup",
                    "_xmlns:ns7": "http://oec.api.opsource.net/schemas/whitelabel",
                    "_xmlns:ns10": "http://oec.api.opsource.net/schemas/network",
                    "_xmlns:ns8": "http://oec.api.opsource.net/schemas/support",
                    "_xmlns:ns11": "http://oec.api.opsource.net/schemas/general",
                    "_xmlns:ns2": "http://oec.api.opsource.net/schemas/organization",
                    "_xmlns:ns4": "http://oec.api.opsource.net/schemas/admin",
                    "_xmlns:ns3": "http://oec.api.opsource.net/schemas/vip",
                    "__prefix": "ns14"
                }
            },
            "status": 200,
            "config": {
                "method": "GET",
                "transformRequest": [null],
                "transformResponse": [null],
                "url": "/oec/0.9/myaccount",
                "headers": {
                    "Accept": "application/json",
                    "ContentType": "application/json",
                    "Authorization": "Basic YW5kcmV3LmRhczpKODJhcHJhJnBhbkVicmFD"
                }
            },
            "statusText": "OK"
        };

        return {
            details: function () {

                var promise = $http({
                    method: 'GET', url: 'http://localhost:8080/v09',
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.encodedCredentials,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).
                    then(function (data) {
                        console.log(JSON.stringify(data));
                        return data;
                    },
                    function (data) {
                        console.log(data);
                        return sample;
                    });
                return promise;
            },

            get: function (networkId) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === networkId) {
                        return data[i];
                    }
                }
                return null;
            }
        }
    }).service('Util', function () {

        return {
            ExportToCsv: function (JSONData, JSONData2, ReportTitle, ShowLabel) {
                //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                var arrData2 = typeof JSONData2 != 'object' ? JSON.parse(JSONData2) : JSONData2;

                var CSV = '';
                //Set Report title in first row or line

                CSV += ReportTitle + '\r\n\n';

                //This condition will generate the Label/Header
                if (ShowLabel) {
                    var row = "";

                    //This loop will extract the label from 1st index of on array
                    for (var index in arrData[0]) {

                        //Now convert each value to string and comma-seprated
                        row += index + ',';
                    }

                    row = row.slice(0, -1);

                    //append Label row with line break
                    CSV += row + '\r\n';
                }

                //1st loop is to extract each row
                for (var i = 0; i < arrData.length; i++) {
                    var row = "";

                    //2nd loop will extract each column and convert it in string comma-seprated
                    for (var index in arrData[i]) {
                        row += '"' + arrData[i][index] + '",';
                    }

                    row.slice(0, row.length - 1);

                    //add a line break after each row
                    CSV += row + '\r\n';
                }

                CSV += "\n\n\rB-End\r\n\n";

                if (ShowLabel) {
                    var row = "";

                    //This loop will extract the label from 1st index of on array
                    for (var index in arrData2[0]) {

                        //Now convert each value to string and comma-seprated
                        row += index + ',';
                    }

                    row = row.slice(0, -1);

                    //append Label row with line break
                    CSV += row + '\r\n';
                }

                //1st loop is to extract each row
                for (var i = 0; i < arrData2.length; i++) {
                    var row = "";

                    //2nd loop will extract each column and convert it in string comma-seprated
                    for (var index in arrData2[i]) {
                        row += '"' + arrData2[i][index] + '",';
                    }

                    row.slice(0, row.length - 1);

                    //add a line break after each row
                    CSV += row + '\r\n';
                }

                if (CSV == '') {
                    alert("Invalid data");
                    return;
                }

                //Generate a file name
                var fileName = "MCPExport";
                //this will remove the blank-spaces from the title and replace it with an underscore
                // fileName += ReportTitle.replace(/ /g, "_");

                //Initialize file format you want csv or xls
                var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

                // Now the little tricky part.
                // you can use either>> window.open(uri);
                // but this will not work in some browsers
                // or you will not get the correct file extension

                //this trick will generate a temp <a /> tag
                var link = document.createElement("a");
                link.href = uri;

                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";

                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    });
