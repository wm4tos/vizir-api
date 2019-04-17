import mongoose from 'mongoose';

export const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Number,
    required: true,
    unique: true,
  },
});

export default mongoose.model('plans', planSchema);
