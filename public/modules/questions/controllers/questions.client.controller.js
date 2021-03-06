'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
	function($scope, $stateParams, $location, Authentication, Questions, Answers) {
		$scope.authentication = Authentication;

//template type
 	$scope.template = {
        choice: 1
      };
      
    var counter=0;
    $scope.questionName = '';
    $scope.questionTitle = '';
    $scope.questionelemnt = [];
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

    	if($scope.questionelemnt.length <= 0)
    	{
			$location.path('getsurveyquestion/' + $scope.testParameter);
		}

    //	$scope.questionelemnt.length = 0;
    	var question = new Questions ({
				name: $scope.questionName,
				surveyId: $scope.testParameter,
				type: $scope.template.choice,
				firstQ: ($scope.questionelemnt[0]).question,
				secondQ: $scope.questionelemnt.length > 1 ? ($scope.questionelemnt[1]).question : '',
				thirdQ: $scope.questionelemnt.length > 2 ? ($scope.questionelemnt[2]).question : '',
				fourthQ: $scope.questionelemnt.length > 3 ? ($scope.questionelemnt[3]).question : ''
			});

			// Redirect after save
			question.$save(function(response) {
				$location.path('getsurveyquestion/' + $scope.testParameter);

				// Clear form fields
				$scope.questionName = '';
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
    	//http://localhost:3000/#!/questions/create?param=552ee91ab82ffb141e7bed0e
    	var question = new Questions ({
				name: $scope.questionName,
				type: $scope.template.choice,
				surveyId: $scope.testParameter,
				firstQ: ($scope.questionelemnt[0]).question,
				secondQ: $scope.questionelemnt.length > 1 ? ($scope.questionelemnt[1]).question : '',
				thirdQ: $scope.questionelemnt.length > 2 ? ($scope.questionelemnt[2]).question : '',
				fourthQ: $scope.questionelemnt.length > 3 ? ($scope.questionelemnt[3]).question : ''
			});

			// Redirect after save
			question.$save(function(response) {

				$scope.questionName = '';
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
        console.log('======' + $scope.questionelemnt);
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

		$scope.questionslist = [];
		$scope.findQuestions = function()
		{
			console.log($stateParams.surveyid);
			$scope.questionslist = Questions.get({ 
				surveyId: $stateParams.surveyid
			});
			console.log($scope.questionslist.length);

		};

	$scope.doneAnswering = function()
		{
			var questionid = $scope.questionslist[0]._id;
			var surveyId = $scope.questionslist[0].surveyId;

			for(var k =0; k<$scope.questionslist.length;k++)
				{
					if($scope.questionslist[k].select === 'question.firstQ')
					{
						$scope.questionslist[k].firstCount++;
					}
					else if($scope.questionslist[k].select === 'question.secondQ')
					{
						$scope.questionslist[k].secondCount++;
					}
					else if($scope.questionslist[k].select === 'question.thirdQ')
					{
						$scope.questionslist[k].thirdCount++;
					}
					else if($scope.questionslist[k].select === 'question.fourthQ')
					{
						$scope.questionslist[k].fourthCount++;
					}
					else
					{
						console.log($scope.questionslist[k].secondCount);
					}

				}

					var questionUpdate = $scope.questionslist[0];
					console.log($scope.questionslist[0]);
					questionUpdate.$update(function() {
				//$location.path('questions/' + question._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
	};

	}
]);
