'use strict';


var Answersitems = angular.module('Answers', []);


var app = angular.module('answers', []);

app.service('sharedProperties', function() {
    var stringValue = 'test string value';
    var objectValue = {
        data: 'test object value'
    };
    
    return {
        getString: function() {
            return stringValue;
        },
        setString: function(value) {
            stringValue = value;
        },
        getObject: function() {
            return objectValue;
        }
    }
});

app.controller('myController1', function($scope, $timeout, sharedProperties) {
    $scope.stringValue = sharedProperties.getString();
    $scope.objectValue = sharedProperties.getObject().data;    
});

app.controller('myController2', function($scope, sharedProperties) {
    $scope.stringValue = sharedProperties.getString;
    $scope.objectValue = sharedProperties.getObject();
    $scope.setString = function(newValue) {
        $scope.objectValue.data = newValue;
        sharedProperties.setString(newValue);
    };
});

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
    $scope.questionsWithId = [];
	$scope.testParameter = $location.url();
	 $scope.arraytemp = $scope.testParameter.split('=');
	 if($scope.arraytemp.length >=2)
	 {
	 	$scope.testParameter = $scope.arraytemp[1];
	 }
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
				surveyId: $scope.testParameter,
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
				surveyId: $scope.testParameter,
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

		$scope.findById = function()
		{
			// $scope.questions = Questions.get({ 
			// 	surveyId: '55209d8d4416313c18bceb20'
			// });
			$scope.questions = Questions.query();
			for (var j in $scope.questions) {
					
						$scope.questionsWithId.push(($scope.questions[j])._id);
				//	}
				}
				for(var k =0; k<=$scope.questions.length;k++)
				{
					$scope.questionsWithId.push(($scope.questions[k])._id);
				}
			//$scope.questions = Questions.query(surveyId:$scope.testParameter);
		};

		// Find a list of Questions
		$scope.find = function() {
			$scope.questions = Questions.query();
		};

		// Find existing Question
		$scope.findTest = function() {
			$scope.questions = [
			{
				name: 'Question1',
				type: '',
				surveyId: '',
				secondQ:'Second Answer',
				thirdQ:'Third Answer',
				fourthQ: 'Forth Answer',
				firstQ: 'First Answer'
				},
				{
				name: 'question2',
				type: '',
				surveyId: '',
				secondQ:'Second Answer',
				thirdQ:'Third Answer',
				fourthQ: 'Forth Answer',
				firstQ: 'First Answer'
				}
			];
		};

		// Find existing Question
		$scope.findOne = function() {
			$scope.question = Questions.get({ 
				questionId: $stateParams.questionId
			});
		};

			//'55209d8d4416313c18bceb20'
			$scope.questionslist = [];
		$scope.findQuestions = function()
		{
			$scope.questionslist = Questions.get({ 
				surveyId: $stateParams.surveyid
			});
		};

$scope.doneAnswering = function()
		{
			var questionid = $scope.questionslist[0]._id;
			var surveyId = $scope.questionslist[0].surveyId;

			console.log(questionid + '  ' + surveyId);
			var newAnswer = new Answersitems ({
				answer: '1',
				questionId: questionid,
				surveyId: surveyId
			});

			newAnswer.$save(function(response) {
				//$location.path('questions/' + response._id);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
	};

	}
]);
