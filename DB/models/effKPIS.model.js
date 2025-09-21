import {Types,Schema,model} from 'mongoose';
const efficiencyKPISchema = new Schema({
  employeeId: { 
    type: Types.ObjectId,
     ref: "Employee",
      required: true
    },
  taskId: { 
    type: Types.ObjectId,
    ref: "Task",
    required: false
  },
  day: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  numberAssignedTasks: {
    type: Number,
    required: true
  },
  numberFinishedTasks: {
    type: Number,
    required: true
  },
  beforeDeadline: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const efficiencyKPIModel = model("EfficiencyKPI", efficiencyKPISchema);
export default efficiencyKPIModel;
