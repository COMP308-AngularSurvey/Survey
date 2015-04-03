'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Answer Schema
 */

var AnswerSchema = new Schema({
	answer:{
		type: String,
		default: '',
		trim: true
	},
	surveyId:{
		type: Number,
		default: 0
	}
});

mongoose.model('Answer', AnswerSchema);