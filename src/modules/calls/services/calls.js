import Random from 'meteor-random';
import mongoose from 'mongoose';

import Calls from '../models/calls';

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/vizir',
  { useCreateIndex: true, useNewUrlParser: true });

export const GetCalls = async (filter = {}) => new Promise(async (resolve, reject) => {
  try {
    const calls = await Calls.find(filter);
    resolve(calls);
  } catch (err) {
    reject(err);
  }
});

export const NewCall = call => new Promise(async (resolve, reject) => {
  if (!('origin' in call) || !('destinys' in call)) return reject('Parâmetros inválidos.');
  call.destinys.forEach(x => x.id = Random.id(24));
  try {
    const newCall = new Calls(call);
    await newCall.save();
    resolve(newCall);
  } catch (err) {
    reject(err);
  }
});

export const GetCall = async (filter = {}) => new Promise(async (resolve, reject) => {
  try {
    const call = (await Calls.findOne(filter)) || {};
    resolve(call);
  } catch (err) {
    reject(err);
  }
});
