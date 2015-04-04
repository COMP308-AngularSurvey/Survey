'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
	function($scope, $stateParams, $location, Authentication, Questions) {
		$scope.authentication = Authentication;

//template type
 	$scope.template = {
        choice: 1
      };
      
    var counter=0;
    $scope.questionName = '';
    $scope.questionTitle = '';
    $scope.questionelemnt = [];
    $scope.questionArray = [];

    $scope.change = function($event) {
        $scope.questionTitle = $event;
      };

// redirect to survey list,
    $scope.doneQuestion = function($event)
    {
    	counter = 0;
    	//push/add current to array.
    	//creat a new question object.
    	//clean all boxes,,,
    	$scope.questionelemnt.length = 0;
    	var question = new Questions ({
				name: $scope.questionName,
				surveyId: 1142,
				type: $scope.template.choice,
				firstQ: ($scope.questionelemnt[0]).question,
				secondQ: $scope.questionelemnt.length > 2 ? ($scope.questionelemnt[1]).question : '',
				thirdQ: $scope.questionelemnt.length > 3 ? ($scope.questionelemnt[2]).question : '',
				fourthQ: $scope.questionelemnt.length > 4 ? ($scope.questionelemnt[3]).question : ''
			});

			// Redirect after save
			question.$save(function(response) {
				$location.path('questions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
    	//$event.preventDefault();
    	$scope.questionelemnt.length = 0;
    };
	//reset + insert
    $scope.newQuestion = function($event)
    {
    	counter = 0;
    	//push/add current to array.
    	//creat a new question object.
    	//clean all boxes,,,
    	var question = new Questions ({
				name: $scope.questionName,
				type: $scope.template.choice,
				surveyId: 1142,
				firstQ: ($scope.questionelemnt[0]).question,
				secondQ: $scope.questionelemnt.length > 2 ? ($scope.questionelemnt[1]).question : '',
				thirdQ: $scope.questionelemnt.length > 3 ? ($scope.questionelemnt[2]).question : '',
				fourthQ: $scope.questionelemnt.length > 4 ? ($scope.questionelemnt[3]).question : ''
			});

			// Redirect after save
			question.$save(function(response) {
				//$location.path('questions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
    	//$event.preventDefault();

    	$scope.questionelemnt.length = 0;
    };

    $scope.newItem = function($event){
        counter++;
        $scope.questionelemnt.push(  
        	{ id:counter, question : 'please input a new choice'} );
        $event.preventDefault();
    };
   
	//default
		// Create new Question
		$scope.create = function() {
			// Create new Question object

			// Redirect after save
			$scope.questionelemnt.$save(function(response) {
				$location.path('questions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Question
		$scope.remove = function(question) {
			if ( question ) { 
				question.$remove();

				for (var i in $scope.questions) {
					if ($scope.questions [i] === question) {
						$scope.questions.splice(i, 1);
					}
				}
			} else {
				$scope.question.$remove(function() {
					$location.path('questions');
				});
			}
		};

		// Update existing Question
		$scope.update = function() {
			var question = $scope.question;

			question.$update(function() {
				$location.path('questions/' + question._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Questions
		$scope.find = function() {
			$scope.questions = Questions.query();
		};

		// Find existing Question
		$scope.findOne = function() {
			$scope.question = Questions.get({ 
				questionId: $stateParams.questionId
			});
		};
	}
]);