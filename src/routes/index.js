import express from 'express';

import CallsController from '../modules/calls/controllers/calls';
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

export default router;
