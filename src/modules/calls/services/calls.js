import Calls from '../models/calls';

export const GetCalls = async (filter = {}) => await Calls.find(filter);

export const NewCall = (call) => new Promise(async (resolve, reject) => {
  try {
    const newCall = new Calls(call);
    await newCall.save();
    resolve(newCall);
  } catch (err) {
    reject(err);
  }
});
