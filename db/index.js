import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://coderifft:6hOjyeakRZ4O0nto@rift-com.u0qjmdx.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('Successfully Connected to Database..');
  } catch (error) {
    console.log('DB connection error', error.message);
  }
};

export default connectDB;
