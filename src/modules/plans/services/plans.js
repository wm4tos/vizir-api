import Plans from '../models/plans';

export const GetPlans = async (filter = {}) => await Plans.find(filter);

export const GetPlan = async (filter = {}) => await Plans.findOne(filter)
