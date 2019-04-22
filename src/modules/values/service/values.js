import { GetCall } from '../../calls/services/calls';
import { GetPlan } from '../../plans/services/plans';

// eslint-disable-next-line import/prefer-default-export
export const GetValues = ({ _idCall, _idPlan }, query) => new Promise(async (resolve, reject) => {
  if (!_idCall || !_idPlan || !query) return reject('Parâmetros inválidos.');
  try {
    const call = await GetCall({ _id: _idCall });

    if (!Object.keys(call).length) {
      reject(call);
    }
    const { name, time } = await GetPlan({ _id: _idPlan });

    const values = [];

    const destinys = call.destinys.map((y) => {
      const priceWith = Number((y.price * (query.time - time) * 1.1).toFixed(2));
      return {
        destiny: y.destiny,
        priceWith: (priceWith < 0 ? 0 : priceWith),
        priceWithout: Number((y.price * query.time).toFixed(2)),
      };
    });

    for (const destiny of destinys) {
      values.push({
        name, time: Number(query.time), origin: call.origin, ...destiny,
      });
    }

    resolve(values);
  } catch (err) {
    reject(err);
  }
});
