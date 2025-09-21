import {Types,Schema,model} from 'mongoose';



const productivityKPISchema = new Schema({
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
  tasksCompleted: {
    type: Number,
    required: true
  },
  tasksCompletedOnTime: {
    type: Number,
    required: true
  },
  featuresDelivered: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const productivityKPIModel = model("ProductivityKPI", productivityKPISchema);
export default productivityKPIModel;
