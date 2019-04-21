import express from 'express';

import CallsController from '../modules/calls/controllers/calls';
import PlansController from '../modules/plans/controllers/plans';
import ValueController from '../modules/values/controllers/value';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'API funcionando!',
  });
});

router.route('/calls')
  .get(CallsController.Get)
  .post(CallsController.ValidateQuery, CallsController.Create);

router.get('/calls/:origin', CallsController.AutoComplete);

router.route('/call/:_id', CallsController.GetOne);

router.get('/value/:_idCall/:_idPlan', ValueController.GetValues);

router.get('/plans', PlansController.Get);

export default router;
