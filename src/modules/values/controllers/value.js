import { GetCall } from '../../calls/services/calls';
import { GetPlan } from '../../plans/services/plans';
import { Emitter, ErrorEmitter } from '../../../helpers/emitter';

class ValueController {
  /**
   * @description Pega uma ligação do banco.
   * @param {Object} req
   * @param {Object} res
   */
  static async GetValues(req, res) {
    const { _idCall, _idPlan } = req.params;
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
      const { name, time } = await GetPlan({ _id: _idPlan });

      const data = [];

      const destinys = call.destinys.map((y) => {
        const priceWith = Number((y.price * (query.time - time) * 1.1).toFixed(2));
        return {
          destiny: y.destiny,
          priceWith: (priceWith < 0 ? 0 : priceWith),
          priceWithout: Number((y.price * query.time).toFixed(2)),
        };
      });

      for (const destiny of destinys) {
        data.push({
          name, time: Number(query.time), origin: call.origin, ...destiny,
        });
      }

      return Emitter(res, { status: 200, data });
    } catch (err) {
      return ErrorEmitter(res, 500, err);
    }
  }
}

export default ValueController;
