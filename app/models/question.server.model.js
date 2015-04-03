'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */


var QuestionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Question name',
		trim: true
	},
	type: {
		type: Number, //0 multiple choice 1 for shor answer
		default: 0
	},
	firstQ: {
		type: String,
		default: '',
		trim: true
	},
	secondQ: {
		type: String,
		default: '',
		trim: true
	},
	thirdQ: {
		type: String,
		default: '',
		trim: true
	},
	forthQ: {
		type: String,
		default: '',
		trim: true
	},
	questionId: {
		type: Number, 
		default: 1
	},
	preId: {
		type: Number, //if pre == 0 means first question
		default: 0
	},
	nextId: {
		type: Number, 
		default: 0 //if next == 0 means last one of
	}
});

mongoose.model('Question', QuestionSchema);