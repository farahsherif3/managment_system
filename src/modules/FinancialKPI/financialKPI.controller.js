import financialKPIModel from '../../../DB/models/financialKPI.model.js';
import { asyncHandler } from '../../utils/errorHandler.js';

export const createFinancialKPI = asyncHandler(async (req, res, next) => {
    const kpi = await financialKPIModel.create(req.body);
    res.status(201).json({ message: 'Financial KPI created', kpi });
});

export const getAllFinancialKPIs = asyncHandler(async (req, res, next) => {
    const kpis = await financialKPIModel.find();
    res.status(200).json({ kpis });
});

export const getFinancialKPIById = asyncHandler(async (req, res, next) => {
    const kpi = await financialKPIModel.findById(req.params.id);
    if (!kpi) {
        return next(new Error('Financial KPI not found', { cause: 404 }));
    }
    res.status(200).json({ kpi });
});

export const updateFinancialKPI = asyncHandler(async (req, res, next) => {
    const kpi = await financialKPIModel.findByIdAndUpdate(req.body.id || req.params.id, req.body, { new: true });
    if (!kpi) {
        return next(new Error('Financial KPI not found', { cause: 404 }));
    }
    res.status(200).json({ message: 'Financial KPI updated', kpi });
});

export const deleteFinancialKPI = asyncHandler(async (req, res, next) => {
    const kpi = await financialKPIModel.findByIdAndDelete(req.body.id || req.params.id);
    if (!kpi) {
        return next(new Error('Financial KPI not found', { cause: 404 }));
    }
    res.status(200).json({ message: 'Financial KPI deleted' });
});
