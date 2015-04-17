'use strict';

angular.module('questions').factory('Questions', ['$resource',
	function($resource) {
		return $resource('getsurveyquestion/:surveyId', { surveyId: '@surveyId'
		}, {
			update: {
				method: 'put', multi: true
			},
			get: {
				method: 'get', isArray:true
			},
			updates: {
				method:'updates', multi: true
			}
		});
	}
]);


//Questions service used to communicate Questions REST endpoints
// angular.module('questions').factory('Questions', ['$resource',
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
// ]);

// http://localhost:3000/#!/getsurveyquestion/55209da64416313c18bceb21
//.