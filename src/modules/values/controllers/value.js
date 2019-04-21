import { GetCall } from '../../calls/services/calls';
import { GetPlans } from '../../plans/services/plans';
import { Emitter, ErrorEmitter } from '../../../helpers/emitter';

class ValueController {
  /**
   * @description Pega uma ligação do banco.
   * @param {Object} req
   * @param {Object} res
   */
  static async GetValues(req, res) {
    const { _idCall } = req.params;
    const { query } = req;
    Object.keys(query).forEach(x => (req.query[x] ? null : delete req.query[x]));

    if (!('time' in query)) {
      return ErrorEmitter(res, 400);
    }

    try {
      const call = await GetCall({ _id: _idCall });
      if (!Object.keys(call).length) {
        return ErrorEmitter(res, 404);
      }
      const plans = await GetPlans();
      const data = [];
      data.push(...plans.map((x) => {
        const destinys = call.destinys.map((y) => {
          const priceWith = Number((y.price * (query.time - x.time) * 1.1).toFixed(2));
          return {
            destiny: y.destiny,
            priceWith: (priceWith < 0 ? 0 : priceWith),
            priceWithout: y.price * query.time,
          };
        });
        return {
          name: x.name, time: x.time, origin: call.origin, destinys,
        };
      }));
      return Emitter(res, { status: 200, data });
    } catch (err) {
      return ErrorEmitter(res, 500, err);
    }
  }
}

export default ValueController;
