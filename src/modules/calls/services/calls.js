import Random from 'meteor-random';

import Calls from '../models/calls';

export const GetCalls = async (filter = {}) => await Calls.find(filter);

export const NewCall = (call) => new Promise(async (resolve, reject) => {
  call.destinys.forEach(x => x.id = Random.id(24));
  try {
    const newCall = new Calls(call);
    await newCall.save();
    resolve(newCall);
  } catch (err) {
    reject(err);
  }
});

export const GetCall = async (filter = {}) => await Calls.findOne(filter);
