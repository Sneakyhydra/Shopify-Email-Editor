/**
 * Imports
 */
import mongoose from 'mongoose';

/**
 * Schema
 */
const TemplateSchema = new mongoose.Schema({
	body: {
		type: Object,
		required: true,
	},
	counters: {
		type: Object,
		required: true,
	},
	schemaVersion: {
		type: Number,
		required: true,
	},
});

const Template = mongoose.model('Template', TemplateSchema);

export default Template;
