import {Types,Schema,model} from 'mongoose';

const timesheetSchema = new Schema({
  employeeId: {
    type: Types.ObjectId,
    ref: "Employee",
    required: true
  },
  category: {
    type: String
  },
  description: {
    type: String
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  durationMinutes: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const timesheetModel = model("Timesheet", timesheetSchema);
export default timesheetModel;
