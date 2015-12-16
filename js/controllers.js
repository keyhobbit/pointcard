var pointApp = angular.module('pointApp', []);

pointApp.controller('PointController', function($scope) {
    $scope.maxTurn = 21;

    $scope.turns = [
        {points: [1, 1, 3, 1]},
        {points: [2, 2, 2, 2]},
        {points: [3, 3, 3, 3]},
        {points: [0, 0, 0, 0]},
    ];
    
    $scope.listUsers = [
        {name: 'User1', total: 0},
        {name: 'User2', total: 0},
        {name: 'User3', total: 0},
        {name: 'User4', total: 0},
    ];

    $scope.listValues = [];

    $scope.addTurn = function() {
        $scope.turns.push({points: []});
    }

    $scope.clearTurn = function() {
        $scope.turns = [];
        $scope.listUsers = [];
    }

    $scope.getTotal = function() {
        angular.forEach($scope.listUsers, function(user, key) {
            user.total = user.total != 0 ? 0 : 0;

            angular.forEach($scope.turns, function(value) {
                number = $scope.addListValues(value.points[key]);

                if (angular.isNumber(number)) {
                    user.total += number;
                }
            });
        });

        $scope.statistics = $scope.makeStatistics();
    }

    $scope.alertTurn = function() {
        alert("Please complete game !");
        $scope.statistics = [];
        angular.forEach($scope.listUsers, function(user, key) {
            user.total = 0;
        });
    }

    $scope.addListValues = function(number) {
        number = parseInt(number);

        if ($scope.listValues.indexOf(number) == -1) {
            $scope.listValues.push(number);
        }
        return number
    }

    $scope.makeStatistics = function() {
        if ($scope.turns.length != $scope.maxTurn) {
            $scope.alertTurn();
            return ;
        }

        var statistic = [];
        angular.forEach($scope.listValues, function(value) {
            var statisticUser = [];
            angular.forEach($scope.listUsers, function(user, k) {
                var count = 0;
                angular.forEach($scope.turns, function(points) {
                    if (points.points[k] == value) {
                        count += 1;
                    } 
                });
                statisticUser.push(count);
            });
            statistic.push({number: value, values: statisticUser});
        });
        return statistic;
    }



});



