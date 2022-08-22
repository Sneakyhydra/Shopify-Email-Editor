/**
 * Imports
 */
import express from 'express';
import config from 'config';
import { check, validationResult } from 'express-validator';
import Template from '../models/Template.js';

/**
 * Initialize router
 */
const templateRouter = express.Router();

/** Endpoints **\
 * Save Template
 */

/**
 * @route   POST api/template/save
 * @desc    Save Template
 * @access  Public
 */
templateRouter.post(
	'/save',
	[
		// Validate input
		check('body', 'Please include body').exists(),
		check('counters', 'Please include counters').exists(),
		check('schemaVersion', 'Please include schemaVersion').exists(),
	],
	async (req, res) => {
		// Validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).send({ errors: errors.array() });
		}

		// Destructure request body
		const { body, counters, schemaVersion } = req.body;

		try {
			const newTemplate = new Template({
				body,
				counters,
				schemaVersion,
			});

			await newTemplate.save();
			console.log('saved');

			// Send success message to client
			return res.send('Saved');
		} catch (err) {
			// Return error
			return res.status(500).send({ errors: [{ msg: err.message }] });
		}
	}
);

/**
 * @route   GET api/template/save
 * @desc    Get saved templates
 * @access  Public
 */
templateRouter.get('/save', async (req, res) => {
	try {
		// Find user by id
		const templates = await Template.find();
		console.log(templates);
		return res.send(templates);
	} catch (err) {
		// Return error
		return res.status(500).send({ errors: [{ msg: err.message }] });
	}
});

export default templateRouter;
