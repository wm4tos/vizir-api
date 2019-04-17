import express from 'express';

import CallsController from '../modules/calls/controllers/calls';
import PlansController from '../modules/plans/controllers/plans';
import { Emitter } from '../services/emitter';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'API funcionando!',
  });
});

router.route('/calls')
  .get(async (req, res) => {
    let response;
    try {
      const calls = await CallsController.Get(req.query);
      if (calls.length) {
        response = {
          status: 200,
          data: calls,
        };
      } else {
        response = {
          status: 404,
          data: calls,
          message: 'Nenhum registro encontrado :/',
        };
      }
    } catch (err) {
      response = {
        status: 500,
        message: err,
      };
    }
    return Emitter(res, response);
  });

router.route('/plans')
  .get(async (req, res) => {
    let response;
    try {
      const plans = await PlansController.Get(req.query);
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
      response = {
        status: 500,
        message: err,
      };
    }
    return Emitter(res, response);
  });

export default router;
