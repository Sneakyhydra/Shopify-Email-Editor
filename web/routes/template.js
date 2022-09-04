/**
 * Imports
 */
import express from 'express';
import { check, validationResult } from 'express-validator';
import Template from '../models/Template.js';

/**
 * Initialize router
 */
const templateRouter = express.Router();

/** Endpoints **\
 * Save Template
 * Get Templates
 * Load Template
 */

/**
 * @route   POST api/template/save
 * @desc    Save Template
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

		try {
			// Destructure request body
			const { body, counters, schemaVersion } = req.body;
			const templateId = body.id;

			// Remove old template if it exists
			await Template.deleteOne({ templateId });

			const newTemplate = new Template({
				templateId,
				body,
				counters,
				schemaVersion,
			});

			// Save new template
			await newTemplate.save();

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
 */
templateRouter.get('/save', async (req, res) => {
	try {
		// Find template by id
		const templates = await Template.find({}, { templateId: 1 });
		return res.send(templates);
	} catch (err) {
		// Return error
		return res.status(500).send({ errors: [{ msg: err.message }] });
	}
});

/**
 * @route   GET api/template/load/{id}
 * @desc    Load saved template
 */
templateRouter.get('/load/:id', async (req, res) => {
	const templateId = req.params.id;
	try {
		// Find template by id
		const template = await Template.findOne({ templateId });
		return res.send(template);
	} catch (err) {
		// Return error
		return res.status(500).send({ errors: [{ msg: err.message }] });
	}
});

export default templateRouter;
