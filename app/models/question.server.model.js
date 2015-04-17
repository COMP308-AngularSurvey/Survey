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
	surveyId:
	{
		type: String,
		trim: true,
		default: ''
	},
	type: {
		type: Number, //0 multiple choice 1 for short answer
		default: 0
	},
	firstQ: {
		type: String,
		default: '',
		trim: true,
	},
	firstCount : {
		type : Number,
		default : 0,
	},
	secondQ: {
		type: String,
		default: '',
		trim: true
	},
	secondCount : {
		type : Number,
		default : 0
	},
	thirdQ: {
		type: String,
		default: '',
		trim: true
	},
	thirdCount : {
		type : Number,
		default : 0
	},
	fourthQ: {
		type: String,
		default: '',
		trim: true
	},
	fourthCount : {
		type : Number,
		default : 0
	},
	select:{
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Question', QuestionSchema);