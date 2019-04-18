import Plans from '../models/plans';
import { Emitter } from '../../../services/emitter';

class PlansController {
  static async Get(req, res) {
    let response;
    try {
      const plans = await Plans.find(req.query);
      if (plans.length) {
        response = {
          status: 200,
          data: plans,
        };
      } else {
        response = {
          status: 404,
          data: plans,
          message: 'Nenhum registro encontrado :/',
        };
      }
    } catch (err) {
      res.status(500);
      response = {
        status: 500,
        message: err,
      };
    }
    return Emitter(res, response);
  }
}

export default PlansController;
