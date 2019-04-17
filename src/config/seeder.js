import mongoose from 'mongoose';

import CallModel from '../db/models/calls';
import PlanModel from '../db/models/plans';

import callsArray from '../lib/calls';
import plansArray from '../lib/plans';

const seedCalls = async () => {
  const callsDb = await CallModel.find();
  if (callsDb.length) {
    return process.stdout.write('O banco já tem as ligações!');
  }
  return callsArray.forEach(async (call) => {
    const newCall = new CallModel(call);
    try {
      await newCall.save();
    } catch (err) {
      throw new Error(err);
    }
  });
};

const seedPlans = async () => {
  const plansDb = await PlanModel.find();
  if (plansDb.length) {
    return process.stdout.write('O banco já tem os planos!');
  }
  return plansArray.forEach(async (plan) => {
    const newPlan = new PlanModel(plan);
    try {
      await newPlan.save();
    } catch (err) {
      throw new Error(err);
    }
  });
};

const seed = async () => {
  await seedCalls();
  await seedPlans();
  console.log('Dados salvos e banco conectado :D');
};

mongoose.connect('mongodb://127.0.0.1:27017/vizir', { useCreateIndex: true, useNewUrlParser: true }, (err, db) => {
  if (err) throw new Error(err);
  seed(db);
});
