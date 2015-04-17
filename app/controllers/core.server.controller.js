'use strict';

/**
 * Mongoose dependencies.
 */

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Survey = mongoose.model('Survey'),
	_ = require('lodash');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};


exports.listActive = function(req,res){
	Survey.find().sort('-created').exec(function(err, surveys) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(surveys);
		}
	});
};