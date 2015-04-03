'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
	function($scope, $stateParams, $location, Authentication, Questions) {
		$scope.authentication = Authentication;

//template type
 		$scope.template = {
        name: 'blue'
      };
      
//numbers of questions 
      $scope.numberOfQuestions = [
      {name:'1', value:'1'},
      {name:'2', value:'2'},
      {name:'3', value:'3'},
      {name:'4', value:'4'},
      {name:'5', value:'5'},
      {name:'6', value:'6'},
      {name:'7', value:'7'},
      {name:'8', value:'8'},
      {name:'9', value:'9'},
      {name:'10', value:'10'}
    ];

//choices.

    var counter=0;
    $scope.questionelemnt = [ {id:counter, question : 'Question-Click on me to edit!', answer : '',inline:true} ];

    $scope.newItem = function($event){
        counter++;
        $scope.questionelemnt.push(  { id:counter, question : 'Question-Click on me to edit!', answer : '',inline:true} );
        $event.preventDefault();
    }
    $scope.inlinef= function($event,inlinecontrol){
        var checkbox = $event.target;
        if(checkbox.checked){
            $('#'+ inlinecontrol).css('display','inline');
        }else{
            $('#'+ inlinecontrol).css('display','');
        }

    }
    $scope.showitems = function($event){
        $('#displayitems').css('visibility','none');
    }

	//default
		// Create new Question
		$scope.create = function() {
			// Create new Question object
			var question = new Questions ({
				name: this.name
			});

			// Redirect after save
			question.$save(function(response) {
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