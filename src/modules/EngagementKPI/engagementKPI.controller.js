import engagementKPIModel from '../../../DB/models/engagementKPI.model.js';
import { asyncHandler } from '../../utils/errorHandler.js';

export const createEngagementKPI = asyncHandler(async (req, res, next) => {
    const kpi = await engagementKPIModel.create(req.body);
    res.status(201).json({ message: 'Engagement KPI created', kpi });
});

export const getAllEngagementKPIs = asyncHandler(async (req, res, next) => {
    const kpis = await engagementKPIModel.find().populate('employeeId');
    res.status(200).json({ kpis });
});

export const getEngagementKPIById = asyncHandler(async (req, res, next) => {
    const kpi = await engagementKPIModel.findById(req.params.id).populate('employeeId');
    if (!kpi) {
        return next(new Error('Engagement KPI not found', { cause: 404 }));
    }
    res.status(200).json({ kpi });
});

export const updateEngagementKPI = asyncHandler(async (req, res, next) => {
    if(req.user.role!=="admin"&& req.user.role!=="manager"){
        return next(new Error('Not Allowed', { cause: 403 }));
    }
    const kpi = await engagementKPIModel.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
    if (!kpi) {
        return next(new Error('Engagement KPI not found', { cause: 404 }));
    }
    res.status(200).json({ message: 'Engagement KPI updated', kpi });
});

export const deleteEngagementKPI = asyncHandler(async (req, res, next) => {
    if(req.user.role!=="admin"&& req.user.role!=="manager"){
        return next(new Error('Not Allowed', { cause: 403 }));
    }
    const kpi = await engagementKPIModel.findByIdAndDelete({ _id: req.body.id || req.params.id });
    if (!kpi) {
        return next(new Error('Engagement KPI not found', { cause: 404 }));
    }
    res.status(200).json({ message: 'Engagement KPI deleted' });
});
