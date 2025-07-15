import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
