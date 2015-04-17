'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Surveys',
	function($scope, Authentication,Surveys) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		// Find a active Surveys
		$scope.find = function() {
			$scope.surveys = Surveys.query();
		};
	}
]);