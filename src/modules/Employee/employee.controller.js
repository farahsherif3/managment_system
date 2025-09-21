import employeeModel from '../../../DB/models/employee.model.js';
import { asyncHandler } from '../../utils/errorHandler.js';
import {GenerateToken} from '../../../src/utils/Generate_Varify.js'
// Create employee
export const signUp = asyncHandler(async (req, res, next) => {
  const { nationalId } = req.body;

  const isExist = await employeeModel.findOne({ nationalId });
  if (isExist) {
    return next(new Error('Employee already exists', { cause: 409 }));
  }

  
  const employee = await employeeModel.create(req.body);
  res.status(201).json({ message: 'Employee created', employee });
});

 


export const logIn = asyncHandler(async (req, res, next) => {
  const { nationalId } = req.body;

  const userExist = await employeeModel.findOne({ nationalId });
  if (!userExist) {
    return next(new Error("User does not exist", { cause: 404 }));
  }


  const token = GenerateToken({
    payload: { _id: userExist._id, nationalId: userExist.nationalId },
    signature: process.env.SIGNUP_SIGNATURE,
    expiresIn: 60 * 60,
  });

  const ref_token = GenerateToken({
    payload: { _id: userExist._id, nationalId: userExist.nationalId },
    signature: process.env.SIGNUP_SIGNATURE,
    expiresIn: 60 * 60,
  });

   return res.status(200).json({ message: "Login successful", token, ref_token });
});


// Get all employees
export const getAllEmployees = asyncHandler(async (req, res, next) => {
	const employees = await employeeModel.find();
	res.status(200).json({ employees });
});

// Get employee by ID
export const getEmployeeById = asyncHandler(async (req, res, next) => {
	const employee = await employeeModel.findById(req.params.id);
	if (!employee) {
		return next(new Error("Employee not found", { cause: 404 }));
	}
	res.status(200).json({ employee });
});

// Update employee
export const updateEmployee = asyncHandler(async (req, res, next) => {
    
    if (req.user.role !== 'admin'|| req.user.role!=="manager") {
        return next(new Error("Not Allowed", { cause: 403 }));
    }
	const employee = await employeeModel.findOne({nationalId:req.body.nationalId});
	if (!employee) {
		return next(new Error("Employee not found", { cause: 404 }));
	}
    const updateEmployee=await employeeModel.findOneAndUpdate({nationalId:req.body.nationalId}, req.body, { new: true });
	res.status(200).json({ message: 'Employee updated', updateEmployee });
});

// Delete employee
export const deleteEmployee = asyncHandler(async (req, res, next) => {

    if (req.user.role !== 'admin') {
        return next(new Error("Not Allowed", { cause: 403 }));
    }
	const employee = await employeeModel.findOne({nationalId:req.body.nationalId});
	if (!employee) {
		return next(new Error("Employee not found", { cause: 404 }));
	}
    const deleteEmployee=await employeeModel.findOneAndDelete({nationalId:req.body.nationalId}, req.body, { new: true });
	res.status(200).json({ message: 'Employee deleted', deleteEmployee });
});
