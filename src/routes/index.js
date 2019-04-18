import express from 'express';

import CallsController from '../modules/calls/controllers/calls';
import PlansController from '../modules/plans/controllers/plans';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'API funcionando!',
  });
});

router.route('/calls')
  .get(CallsController.Get);

router.route('/plans')
  .get(PlansController.Get);

export default router;
