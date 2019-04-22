import 'babel-polyfill';
import { expect } from 'chai';
import mongoUnit from 'mongo-unit';
import dotenv from 'dotenv';

import { GetValues } from '../src/modules/values/service/values';
import { GetCall } from '../src/modules/calls/services/calls';
import { GetPlan } from '../src/modules/plans/services/plans';
import callsData from '../src/lib/calls.json';
import plansData from '../src/lib/plans.json';

dotenv.config();

const mongoURL = process.env.MONGO_URL;

describe('Testando service de planos', () => {
  beforeEach(() => mongoUnit.initDb(mongoURL, { calls: callsData, plans: plansData }));
  afterEach(() => mongoUnit.drop());
  it('Deve receber a mensagem "Parâmetros inválidos."', () => GetValues({}, {})
    .catch((message) => {
      expect(message).to.be.equal('Parâmetros inválidos.');
    }));
  it('Deve receber um valor igual ao esperado', () => GetCall({ origin: '11' })
    .then((call) => {
      GetPlan({ time: 30 })
        .then((plan) => GetValues({ _idCall: call._id, _idPlan: plan._id }, { time: 80 })
          .then((values) => {
            const valuesExample = [
              {
                  name: "FaleMais 30",
                  time: 80,
                  origin: "11",
                  destiny: 16,
                  priceWith: 104.5,
                  priceWithout: 152
              },
              {
                  name: "FaleMais 30",
                  time: 80,
                  origin: "11",
                  destiny: 17,
                  priceWith: 93.5,
                  priceWithout: 136
              },
              {
                  name: "FaleMais 30",
                  time: 80,
                  origin: "11",
                  destiny: 18,
                  priceWith: 49.5,
                  priceWithout: 72
              }
          ];
            expect(values).to.have.deep.members(valuesExample);
          }));
    }));
});
