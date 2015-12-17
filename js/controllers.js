var pointApp = angular.module('pointApp', []);

pointApp.controller('PointController', function($scope) {
    $scope.maxTurn = 21;

    $scope.turns = [
        {points: [0, 0, 0, 0]},
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
        if ($scope.turns.length >= $scope.maxTurn) {
            alert("Turns limited !");
            return ;
        }
        $scope.turns.push({points: []});
    }

    $scope.clearTurn = function() {
        $scope.maxTurn = 21;
        $scope.turns = [
            {points: [0, 0, 0, 0]},
            {points: [0, 0, 0, 0]},
        ];
        $scope.listUsers = [
            {name: 'User1', total: 0},
            {name: 'User2', total: 0},
            {name: 'User3', total: 0},
            {name: 'User4', total: 0},
        ];
    }

    $scope.getTotal = function() {
        if ($scope.turns.length != $scope.maxTurn) {
            $scope.alertTurn();
            return ;
        }
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

    $scope.addListValues = function(number) {
        number = angular.isNumber(number) ? parseInt(number) : 0;
        if ($scope.listValues.indexOf(number) == -1) {
            $scope.listValues.push(number);
        }
        return number
    }

    $scope.makeStatistics = function() {
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

        $scope.listValues = [];
        return statistic;
    }

    $scope.alertTurn = function() {
        alert("Please complete game !");
        $scope.statistics = [];
        angular.forEach($scope.listUsers, function(user, key) {
            user.total = 0;
        });
    }
});
