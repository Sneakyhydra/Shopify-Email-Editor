// Imports
import mongoose from 'mongoose';
import config from 'config';
const db = process.env.MONGO_URI || config.get('mongoURI');

const connectDB = () => {
	try {
		// Connect to mongoDB
		mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		// Exit process with failure
		console.log(err.message);
		process.exit(1);
	}
};

export default connectDB;
