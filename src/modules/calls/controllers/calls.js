import {
  GetCalls, NewCall, GetCall, UpdateCall,
} from '../services/calls';
import { Emitter, ErrorEmitter } from '../../../helpers/emitter';

class CallsController {
  /**
   * @description Pega todos as ligações do banco.
   * @param {Object} req
   * @param {Object} res
   */
  static async Get(req, res) {
    Object.keys(req.query).forEach(x => (req.query[x] ? null : delete req.query[x]));
    let response;
    try {
      const calls = await GetCalls(req.query);
      if (calls.length) {
        response = {
          status: 200,
          data: calls,
        };
      } else {
        return ErrorEmitter(res, 404);
      }
    } catch (err) {
      return ErrorEmitter(res, 500, err);
    }
    return Emitter(res, response);
  }

  /**
   * @description Pega uma ligação do banco.
   * @param {Object} req
   * @param {Object} res
   */
  static async GetOne(req, res) {
    const { _id } = req.params;
    try {
      const call = await GetCall({ _id });
      if ('origin' in call && 'destinys' in call && '_id' in call) {
        return Emitter(res, { status: 200, data: call });
      }
      return ErrorEmitter(res, 404);
    } catch (err) {
      return ErrorEmitter(res, 500, err);
    }
  }

  /**
   * @description Valida se a requisição enviada pelo usuário é válida.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  static async ValidateQuery(req, res, next) {
    const { body } = req;
    if (!('origin' in body)
    || !('destinys' in body)
    || !(typeof body.destinys === 'object')
    || !body.destinys.length) return ErrorEmitter(res, 400);
    const { origin } = req.body;
    const call = await GetCalls({ origin });
    if (call.length && req.url === '/call' && req.method === 'POST') {
      return ErrorEmitter(res, 409, 'Essa origem já tá cadastrada no banco. Pode tentar outra?');
    }
    return next();
  }

  /**
   * @description Busca valores para um autocomplete.
   * @param {Object} req
   * @param {Object} res
   */
  static async AutoComplete(req, res) {
    const { origin } = req.params;

    try {
      const calls = await GetCalls({ origin: { $regex: origin } });

      calls.splice(
        0,
        calls.length,
        ...calls.map(x => ({
          value: x.origin,
          label: `DDD: ${x.origin}`,
          _id: x._id,
          destinys: x.destinys,
        })),
      );

      return Emitter(res, { status: 200, data: calls });
    } catch (err) {
      return Emitter(res, { status: 200, err });
    }
  }

  /**
   * @description Atualiza ligação existente.
   * @param {Object} req
   * @param {Object} res
   */

  static async Update(req, res) {
    const { body } = req;
    try {
      if ('_id' in body && 'origin' in body && 'destinys' in body) {
        const callUpdated = await UpdateCall(body);

        return Emitter(res, { status: 200, data: callUpdated, message: 'Ligação salva com sucesso!' });
      }
      return ErrorEmitter(res, 400);
    } catch (err) {
      return ErrorEmitter(res, 500, 'Não deu pra salvar sua ligação agora :(\nPode tentar de novo depois?');
    }
  }

  /**
   * @description Cria novas ligações.
   * @param {Object} req
   * @param {Object} res
   */
  static async Create(req, res) {
    const { origin, destinys } = req.body;
    try {
      const newCall = await NewCall({ origin, destinys });
      return Emitter(res, { status: 200, data: newCall, message: 'Ligação cadastrada com sucesso!' });
    } catch (err) {
      return ErrorEmitter(res, 500, err);
    }
  }
}

export default CallsController;
