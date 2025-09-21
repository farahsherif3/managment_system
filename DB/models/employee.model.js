
import {Types,Schema,model} from 'mongoose';

const employeeSchema = new Schema({
  nationalId: { 
    type: String,
     required: [true, 'National ID is required'],
      unique: true 
    },
  fullName: {
     
    type: String,
    required: [true, 'Full name is required']
  },
  role:{
    type:String,
    enum:["admin","user","manager"],
    default:"user"
  },
  password: { 
    type: String,
    required: true
  },
  nationalIdPicture: { 
    type: Object
  }, 
  createdAt: { 
    type: Date,
    default: Date.now
  },
  country: { 
    type: String
  },
  department: { 
    type: String
  },
  jobTitle: { 
    type: String
  },
  managerId: { 
    type: Types.ObjectId, 
    ref: "Employee" ,
    required: false
  },
});


const employeeModel = model("Employee", employeeSchema);
export default employeeModel;