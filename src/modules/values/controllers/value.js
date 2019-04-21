import { Emitter, ErrorEmitter } from '../../../helpers/emitter';
import { GetValues } from '../service/values';

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
      const data = await GetValues({ _idCall, _idPlan }, query);

      return Emitter(res, { status: 200, data });
    } catch (err) {
      return ErrorEmitter(res, 500, err);
    }
  }
}

export default ValueController;
