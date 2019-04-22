import Random from 'meteor-random';
import mongoose from 'mongoose';

import Calls from '../models/calls';

mongoose.set('useFindAndModify', false);
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
  if (call.destinys.find(x => !x.destiny)) return reject('Ei... Falta alguma coisa, né?');
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

export const UpdateCall = async callToUpdate => new Promise(async (resolve, reject) => {
  if (!('origin' in callToUpdate)
  || !('destinys' in callToUpdate)
  || !('_id' in callToUpdate)) return reject('Parâmetros inválidos.');
  if (callToUpdate.destinys.find(x => !x.destiny)) return reject('Ei... Falta alguma coisa, né?');
  const { _id } = callToUpdate;
  callToUpdate.destinys.forEach(x => (x.id ? null : x.id = Random.id(24)));
  try {
    await Calls.findOneAndUpdate({ _id }, callToUpdate);
    resolve(callToUpdate);
  } catch (err) {
    reject(err);
  }
});
