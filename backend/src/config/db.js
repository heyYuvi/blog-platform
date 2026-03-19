import mongoose from 'mongoose';

const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connetion ${conn.connection.host}`);
    } catch (error) {
        console.error(`Databse Connetion Error ${error.message}`);
        process.exit(1);
    }
}

export default mongoDB;