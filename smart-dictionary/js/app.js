var app = angular.module('app', ['wordService']);
app.controller('DictionaryController', function($scope, Word) {
    $scope.showErr = false;

  $scope.findWord = function() {
    Word.get($scope.searchWord.toLowerCase()).then(function(res) {
        console.log(res.data.definitions);

        if (res.data.definitions.length > 0) {
            $scope.results = res.data.definitions;
            $scope.showErr = false;
        } else {
            $scope.showErr = true;
        }
    });
  }  
});

angular.module('wordService', []).factory('Word', function($http) {
    return {
        get: function(word) {
            var request = {
                method: 'GET',
                url: 'https://montanaflynn-dictionary.p.mashape.com/define?word=' + word,
                headers: {
                    "X-Mashape-Key": "g21bRiLZW7msheDU7gVZ0ZF47eZvp1GaIT8jsnZrLDLsZiGAw5"
                },
            }

            return $http(request);
        }

    }
});

    app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
