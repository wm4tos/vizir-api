import Plans from '../models/plans';

export const GetPlans = async (filter = {}) => await Plans.find(filter);
