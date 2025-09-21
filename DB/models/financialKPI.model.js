import {Types,Schema,model} from 'mongoose';

const financialKPISchema = new Schema({
  employeeId: { 
    type: Types.ObjectId, 
    ref: "Employee",
     required: true 
  },
  day: { type: Number },
  month: { type: Number },
  revenuePerEmployee: { type: Number },
  costEffectiveness: { type: Number },
  createdAt: { 
    type: Date, 
    default: Date.now
 },
});

const financialKPIModel = model("FinancialKPI", financialKPISchema);
export default financialKPIModel;
