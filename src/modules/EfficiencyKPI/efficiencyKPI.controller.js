import efficiencyKPIModel from '../../../DB/models/effKPIS.model.js';
import { asyncHandler } from '../../utils/errorHandler.js';
import employeeModel from '../../../DB/models/employee.model.js';
import taskModel from '../../../DB/models/task.model.js';

export const createEfficiencyKPI = asyncHandler(async (req, res, next) => {
  const { employeeId, day, month, year } = req.body;

  // check roles
  if (req.user.role !== "admin" && req.user.role !== "manager") {
    return next(new Error("Not Allowed", { cause: 403 }));
  }

  // check employee exists
  if (!(await employeeModel.findById(employeeId))) {
    return next(new Error("Employee not found", { cause: 404 }));
  }

  // حساب التاسكات من الداتابيز
  const kpiYear = year || new Date().getFullYear();
  const startOfDay = new Date(kpiYear, month - 1, day, 0, 0, 0);
  const endOfDay = new Date(kpiYear, month - 1, day, 23, 59, 59);

  const result = await taskModel.aggregate([
    {
      $match: {
        assignedToId: employeeId,
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      },
    },
    {
      $group: {
        _id: null,
        numberAssignedTasks: { $sum: 1 },
        numberFinishedTasks: {
          $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] },
        },
        beforeDeadline: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$completed", true] },
                  { $lte: ["$endTime", "$dueDate"] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  const stats = result[0] || {
    numberAssignedTasks: 0,
    numberFinishedTasks: 0,
    beforeDeadline: 0,
  };

  // create KPI document
  const kpi = await efficiencyKPIModel.create({
    employeeId,
    day,
    month,
    numberAssignedTasks: stats.numberAssignedTasks,
    numberFinishedTasks: stats.numberFinishedTasks,
    beforeDeadline: stats.beforeDeadline,
  });

  res.status(201).json({ message: "Efficiency KPI created", kpi });
});

// Get all Efficiency KPIs
export const getAllEfficiencyKPIs = asyncHandler(async (req, res, next) => {
  const kpis = await efficiencyKPIModel.find().populate('employeeId').populate('taskId');
  res.status(200).json({ kpis });
});

// Get Efficiency KPI by ID
export const getEfficiencyKPIById = asyncHandler(async (req, res, next) => {
  const kpi = await efficiencyKPIModel.findById(req.params.id).populate('employeeId').populate('taskId');
  if (!kpi) {
    return next(new Error('Efficiency KPI not found', { cause: 404 }));
  }
  res.status(200).json({ kpi });
});

// Update Efficiency KPI
export const updateEfficiencyKPI = asyncHandler(async (req, res, next) => {
  const { employeeId, taskId } = req.body;

  if (req.user.role !== "admin" && req.user.role !== "manager") {
    return next(new Error('Not Allowed', { cause: 403 }));
  }
  if (!await employeeModel.findById(employeeId)) {
    return next(new Error('Employee not found', { cause: 404 }));
  }
  if (!await taskModel.findById(taskId)) {
    return next(new Error('Task not found', { cause: 404 }));
  }
  const kpi = await efficiencyKPIModel.findByIdAndUpdate(req.body.id || req.params.id, req.body, { new: true });
  if (!kpi) {
    return next(new Error('Efficiency KPI not found', { cause: 404 }));
  }
  res.status(200).json({ message: 'Efficiency KPI updated', kpi });
});

// Delete Efficiency KPI
export const deleteEfficiencyKPI = asyncHandler(async (req, res, next) => {
  const { employeeId, taskId } = req.body;
  if (req.user.role !== "admin" && req.user.role !== "manager") {
    return next(new Error('Not Allowed', { cause: 403 }));
  }
  if (!await employeeModel.findById(employeeId)) {
    return next(new Error('Employee not found', { cause: 404 }));
  }
  if (!await taskModel.findById(taskId)) {
    return next(new Error('Task not found', { cause: 404 }));
  }
  const kpi = await efficiencyKPIModel.findByIdAndDelete(req.body.id || req.params.id);
  if (!kpi) {
    return next(new Error('Efficiency KPI not found', { cause: 404 }));
  }
  res.status(200).json({ message: 'Efficiency KPI deleted' });
});
