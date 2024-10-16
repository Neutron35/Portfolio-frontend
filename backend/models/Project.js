import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const projectSchema = mongoose.Schema({
  projectId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulties: { type: String, required: true },
  skills: { type: String, required: true },
  linkToCode: { type: String, required: true },
});

projectSchema.plugin(uniqueValidator);

export default mongoose.model('Project', projectSchema);
