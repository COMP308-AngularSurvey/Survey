'use strict';

// Surveys controller
angular.module('surveys').controller('SurveysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Surveys',
	function($scope, $stateParams, $location, Authentication, Surveys) {
		$scope.authentication = Authentication;

		$scope.surveyname = 'some name';
		$scope.surveyId = '';
        $scope.createDate = new Date(2015,3,5);
        $scope.startDate = new Date();
        
        var today = new Date();
        var expire = new Date();
        expire.setDate(today.getDate()+30);
        $scope.expireDate = expire;

        $scope.isValid = true;
        
		// Create new Survey
		$scope.create = function() {
			// Create new Survey object
			var survey = new Surveys ({
				name: this.name,
                createDate: this.createDate,
                startDate: this.startDate,
                expireDate: this.expireDate,
                isValid: this.isValid
			});
console.log(survey.name + ' '  + survey.createDate + ' ' + survey.expireDate + ' ' + survey.isValid);
			// Redirect after save
			survey.$save(function(response) {
				$location.path('questions/create' + '').search({param: response._id});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Survey
		$scope.remove = function(survey) {
			if ( survey ) { 
				survey.$remove();

				for (var i in $scope.surveys) {
					if ($scope.surveys [i] === survey) {
						$scope.surveys.splice(i, 1);
					}
				}
			} else {
				$scope.survey.$remove(function() {
					$location.path('surveys');
				});
			}
		};

		// Update existing Survey
		$scope.update = function() {
			var survey = $scope.survey;
            survey.startDate = this.startDate;
            survey.expireDate = this.expireDate;
            
            
            console.log($scope.survey.startDate + '  ' + this.startDate);

			survey.$update(function() {
				$location.path('surveys/' + survey._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Surveys
		$scope.find = function() {
			$scope.surveys = Surveys.query();
		};

		// Find existing Survey
		$scope.findOne = function() {
			$scope.survey = Surveys.get({ 
				surveyId: $stateParams.surveyId
			});
		};
        // pop up calander
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };
        
	}
]);