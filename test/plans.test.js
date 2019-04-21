import 'babel-polyfill';
import { expect } from 'chai';
import mongoUnit from 'mongo-unit';
import dotenv from 'dotenv';

import { GetPlan, GetPlans } from '../src/modules/plans/services/plans';
import callsData from '../src/lib/calls.json';
import plansData from '../src/lib/plans.json';

dotenv.config();

const mongoURL = process.env.MONGO_URL;

describe('Testando service de planos', () => {
  beforeEach(() => mongoUnit.initDb(mongoURL, { calls: callsData, plans: plansData }));
  afterEach(() => mongoUnit.drop());
  it('Deve receber todos os planos disponíveis', () => GetPlans()
    .then((plans) => {
      expect(plans).to.be.an('array').to.have.length(4);
    }));
  it('Deve receber um array vazio', () => GetPlans({ name: 'Fale Mais 800' })
    .then((plans) => {
      expect(plans).to.be.an('array').to.have.length(0);
    }));
  it('Deve receber um plano', () => GetPlan()
    .then((plan) => {
      expect(plan).to.have.property('name');
      expect(plan).to.have.property('time');
    }));
  it('Deve receber um objeto vazio', () => GetPlan({ name: 'Fale Mais 800' })
    .then((plan) => {
      expect(plan).to.be.empty;
    }));
});
