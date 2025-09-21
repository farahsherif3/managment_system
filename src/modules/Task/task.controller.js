import employeeModel from '../../../DB/models/employee.model.js';
import taskModel from '../../../DB/models/task.model.js';
import { asyncHandler } from '../../utils/errorHandler.js';



// Create Task
export const createTask = asyncHandler(async (req, res, next) => {
    const{assignedToId}=req.body
	if (req.user.role !== 'admin'&&  req.user.role !== 'manager') {
		return next(new Error('Not Allowed', { cause: 403 }));
	}
    const user= await employeeModel.findOne({_id:assignedToId})
    if(!user){
        return next(new Error('Employee not found', { cause: 404 }));
    }

	const task = await taskModel.create(req.body);
	res.status(201).json({ message: 'Task created', task });
});

// Get all Tasks
export const getAllTasks = asyncHandler(async (req, res, next) => {
	
	const tasks = await taskModel.find().populate('assignedToId');
	res.status(200).json({ tasks });
});

// Get Task by ID
export const getTaskById = asyncHandler(async (req, res, next) => {
	const{taskId}=req.body
	const task = await taskModel.findById({_id:taskId}).populate('assignedToId');
	if (!task) {
		return next(new Error('Task not found', { cause: 404 }));
	}
	res.status(200).json({ task });
});

// Update Task
export const updateTask = asyncHandler(async (req, res, next) => {
	if (req.user.role !== 'admin' && req.user.role !== 'manager') {
		return next(new Error('Not Allowed', { cause: 403 }));
	}
	const task = await taskModel.findByIdAndUpdate({_id:req.body.taskId}, req.body, { new: true });
	if (!task) {
		return next(new Error('Task not found', { cause: 404 }));
	}
	res.status(200).json({ message: 'Task updated', task });
});

// Delete Task
export const deleteTask = asyncHandler(async (req, res, next) => {
	if (req.user.role !== 'admin' && req.user.role !== 'manager') {
		return next(new Error('Not Allowed', { cause: 403 }));
	}
	const task = await taskModel.findByIdAndDelete({_id:req.body.taskId});
	if (!task) {
		return next(new Error('Task not found', { cause: 404 }));
	}
	res.status(200).json({ message: 'Task deleted' });
});
