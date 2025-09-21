import qualityKPIModel from '../../../DB/models/qualityKPI.model.js';
import { asyncHandler } from '../../utils/errorHandler.js';
import employeeModel from '../../../DB/models/employee.model.js';
import taskModel from '../../../DB/models/task.model.js';

export const createQualityKPI = asyncHandler(async (req, res, next) => {
  const { employeeId, day, month, year } = req.body;

  // role check
  if (req.user.role !== "admin" && req.user.role !== "manager") {
    return next(new Error("Not Allowed", { cause: 403 }));
  }

  // check if employee exists
  if (!(await employeeModel.findById(employeeId))) {
    return next(new Error("Employee not found", { cause: 404 }));
  }

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
        totalTasks: { $sum: 1 },
        errors: {
          $sum: {
            $cond: [{ $gt: ["$errors", 0] }, "$errors", 0],
          },
        },
        accurateTasks: {
          $sum: {
            $cond: [
              { $or: [{ $eq: ["$errors", 0] }, { $not: ["$errors"] }] },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  const stats = result[0] || {
    totalTasks: 0,
    errors: 0,
    accurateTasks: 0,
  };

  const successfulPercentage =
    stats.totalTasks > 0
      ? (stats.accurateTasks / stats.totalTasks) * 100
      : 0;

  const kpi = await qualityKPIModel.create({
    employeeId,
    day,
    month,
    errors: stats.errors,
    accurateTasks: stats.accurateTasks,
    successfulPercentage,
  });

  res
    .status(201)
    .json({ message: "Quality KPI created successfully", kpi });
});

export const getAllQualityKPIs = asyncHandler(async (req, res, next) => {
    const kpis = await qualityKPIModel.find();
    res.status(200).json({ kpis });
});

export const getQualityKPIById = asyncHandler(async (req, res, next) => {
    const kpi = await qualityKPIModel.findById(req.params.id);
    if (!kpi) {
        return next(new Error('Quality KPI not found', { cause: 404 }));
    }
    res.status(200).json({ kpi });
});

export const updateQualityKPI = asyncHandler(async (req, res, next) => {
    const kpi = await qualityKPIModel.findByIdAndUpdate(req.body.id || req.params.id, req.body, { new: true });
    if (!kpi) {
        return next(new Error('Quality KPI not found', { cause: 404 }));
    }
    res.status(200).json({ message: 'Quality KPI updated', kpi });
});

export const deleteQualityKPI = asyncHandler(async (req, res, next) => {
    const kpi = await qualityKPIModel.findByIdAndDelete(req.body.id || req.params.id);
    if (!kpi) {
        return next(new Error('Quality KPI not found', { cause: 404 }));
    }
    res.status(200).json({ message: 'Quality KPI deleted' });
});
