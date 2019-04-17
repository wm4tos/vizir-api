import Calls from '../models/calls';

class CallsController {
  static All(filter = {}) {
    try {
      return Calls.find(filter);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default CallsController;
