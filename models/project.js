import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['poster', 'branding', 'social', 'logo', 'uiux', 'other'], // adjust as needed
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project',projectSchema);

export default Project;