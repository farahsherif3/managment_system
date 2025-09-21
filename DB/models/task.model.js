import {Types,Schema,model} from 'mongoose';


const taskSchema = new Schema({
  title: { 
    type: String,
     required: true
     },
  description: { 
    type: String
 },
  assignedToId: { type: Types.ObjectId,
     ref: "Employee"
     },
  assignedById: { 
    type: Types.ObjectId,
     ref: "Employee"
     },
  priority: { 
    type: String,
    enum: ["Low", "Medium", "High"]
  },
  dueDate: { 
    type: Date
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  completed: {
    type: Boolean,
    default: false
  },
    startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
  },
  category: {
    type: String
  },
});

const taskModel = model("Task", taskSchema);
export default taskModel;
