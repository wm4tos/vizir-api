import mongoose from 'mongoose';

import Plans from '../models/plans';

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/vizir', { useCreateIndex: true, useNewUrlParser: true });

export const GetPlans = async (filter = {}) => new Promise(async (resolve, reject) => {
  try {
    const plans = await Plans.find(filter);
    resolve(plans);
  } catch (err) {
    reject(err);
  }
});

export const GetPlan = async (filter = {}) => new Promise(async (resolve, reject) => {
  try {
    const plan = (await Plans.findOne(filter)) || {};
    resolve(plan);
  } catch (err) {
    reject(err);
  }
});
