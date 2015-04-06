'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Survey Schema
 */


var SurveySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Survey name',
		trim: true
	},
	createDate: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    startDate: {
        type: Date,
        default: Date.now
    },
	expireDate: {
		type: Date,
		default: Date.now
	},
    isValid : {
        type: Boolean,
        default: false
    }
});

mongoose.model('Survey', SurveySchema);