import Plans from '../models/plans';

class PlansController {
  static Get(filter = {}) {
    try {
      return Plans.find(filter);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default PlansController;
