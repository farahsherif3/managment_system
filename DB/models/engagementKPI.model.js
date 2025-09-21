import {Types,Schema,model} from 'mongoose';
const engagementKPISchema = new Schema({
  employeeId: { 
    type: Types.ObjectId,
     ref: "Employee", 
     required: true 
    },
  day: { 
    type: Number,
     required: true },
  month: {
     type: Number,
      required: true
     },
  year: {
     type: Number,
     required: true
  },
  attendanceRate: {
     type: Number,
     required: true
  },
  meetingParticipation: {
     type: Number,
     required: true
  },
  collaborationScore: {
     type: Number,
     required: true
  },
  createdAt: {
     type: Date,
     default: Date.now
  },
});

const engagementKPIModel = model("EngagementKPI", engagementKPISchema);
export default engagementKPIModel;
