import {Types,Schema,model} from 'mongoose';
const qualityKPISchema = new Schema({
  employeeId: {
    type: Types.ObjectId,
    ref: "Employee",
    required: true
  },
  taskId: {
    type: Types.ObjectId,
    ref: "Task",
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  errors: {
    type: Number,
    required: true
  },
  accurateTasks: {
    type: Number,
    required: true
  },
  successfulPercentage: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
});
const qualityKPIModel = model("QualityKPI", qualityKPISchema);
export default qualityKPIModel;
