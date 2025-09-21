import productivityKPIModel from '../../../DB/models/productiveKPI.model.js';
import { asyncHandler } from '../../utils/errorHandler.js';
import employeeModel from '../../../DB/models/employee.model.js';
import taskModel from '../../../DB/models/task.model.js';

export const createProductivityKPI = asyncHandler(async (req, res, next) => {
  const { employeeId, day, month, year } = req.body;

  // role check
  if (req.user.role !== "admin" && req.user.role !== "manager") {
    return next(new Error("Not Allowed", { cause: 403 }));
  }

  // check if employee exists
  if (!(await employeeModel.findById(employeeId))) {
    return next(new Error("Employee not found", { cause: 404 }));
  }

  // حدد نطاق اليوم
  const kpiYear = year || new Date().getFullYear();
  const startOfDay = new Date(kpiYear, month - 1, day, 0, 0, 0);
  const endOfDay = new Date(kpiYear, month - 1, day, 23, 59, 59);

  // aggregation
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
        tasksCompleted: {
          $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] },
        },
        tasksCompletedOnTime: {
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
        featuresDelivered: {
          $sum: {
            $cond: [{ $eq: ["$category", "Feature"] }, 1, 0],
          },
        },
      },
    },
  ]);

  const stats = result[0] || {
    tasksCompleted: 0,
    tasksCompletedOnTime: 0,
    featuresDelivered: 0,
  };

  const kpi = await productivityKPIModel.create({
    employeeId,
    day,
    month,
    tasksCompleted: stats.tasksCompleted,
    tasksCompletedOnTime: stats.tasksCompletedOnTime,
    featuresDelivered: stats.featuresDelivered,
  });

  res.status(201).json({ message: "Productivity KPI created", kpi });
});

export const getAllProductivityKPIs = asyncHandler(async (req, res, next) => {
    const kpis = await productivityKPIModel.find();
    res.status(200).json({ kpis });
});

export const getProductivityKPIById = asyncHandler(async (req, res, next) => {
    const kpi = await productivityKPIModel.findById(req.params.id);
    if (!kpi) {
        return next(new Error('Productivity KPI not found', { cause: 404 }));
    }
    res.status(200).json({ kpi });
});

export const updateProductivityKPI = asyncHandler(async (req, res, next) => {
    if(req.user.role!=="admin"&& req.user.role!=="manager"){
        return next(new Error('Not Allowed', { cause: 403 }));
    }
    const kpi = await productivityKPIModel.findByIdAndUpdate({_id: req.body.id}, req.body, { new: true });
    if (!kpi) {
        return next(new Error('Productivity KPI not found', { cause: 404 }));
    }
    res.status(200).json({ message: 'Productivity KPI updated', kpi });
});

export const deleteProductivityKPI = asyncHandler(async (req, res, next) => {
    if(req.user.role!=="admin"&& req.user.role!=="manager"){
        return next(new Error('Not Allowed', { cause: 403 }));
    }
    const kpi = await productivityKPIModel.findByIdAndDelete({_id: req.body.id });
    if (!kpi) {
        return next(new Error('Productivity KPI not found', { cause: 404 }));
    }
    res.status(200).json({ message: 'Productivity KPI deleted' });
});
