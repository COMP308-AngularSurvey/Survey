'use strict';

//Questions service used to communicate Questions REST endpoints
angular.module('questions').factory('Questions', ['$resource',
	function($resource) {
		return $resource('getsurveyquestion/:surveyId', { surveyId: '@surveyId'
		}, {
			update: {
				method: 'PUT'
			},
			get: {
				method: 'get', isArray:true
			}
		});
	}
]);

<<<<<<< HEAD
		// return $resource('getsurveyquestion/:surveyId', { surveyId: '@_id'
=======
// http://localhost:3000/#!/getsurveyquestion/55209da64416313c18bceb21

// factory('Questions', ['$resource',
// 	function($resource) {
// 		return $resource('questions/:questionId', { questionId: '@_id'
// 		}, {
// 			update: {
// 				method: 'PUT'
// 			},
// 			get: {
// 				method: 'get', isArray:true
// 			}
// 		});
// 	}
// ]).
>>>>>>> 1d087daa143e4af5096f4aa5a27f2e052dcd336d
