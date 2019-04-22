import 'babel-polyfill';
import { expect } from 'chai';
import mongoUnit from 'mongo-unit';
import dotenv from 'dotenv';

import { GetCall, GetCalls, NewCall, UpdateCall } from '../src/modules/calls/services/calls';
import callsData from '../src/lib/calls.json';
import plansData from '../src/lib/plans.json';

dotenv.config();

const mongoURL = process.env.MONGO_URL;

describe('Testando service de ligações', () => {
  beforeEach(() => mongoUnit.initDb(mongoURL, { calls: callsData, plans: plansData }));
  afterEach(() => mongoUnit.drop());
  it('Deve receber a mensagem "Ei... Falta alguma coisa, né?"', () => NewCall({ origin: 23, destinys: []})
    .catch((err) => {
      expect(err).to.be.equal('Ei... Falta alguma coisa, né?');
    }));
  it('Deve receber um objeto com a ligação cadastrada', () => NewCall({
    origin: 20,
    destinys: [{ price: 0.80, destiny: 11 }, { price: 1.80, destiny: 18 }],
  })
  .then((call) => {
    expect(call).to.have.property('origin');
    expect(call).to.have.property('destinys').to.be.an('array').to.have.length(2);
  }));
  it('Deve receber a mensagem "Ei... Falta alguma coisa, né?"', () => NewCall({ origin: 23, destinys: [{ destiny: 11, price: 0 }]})
    .catch((err) => {
      expect(err).to.be.equal('Ei... Falta alguma coisa, né?');
    }));
  it('Deve receber a mensagem "Parâmetros inválidos."', () => NewCall({ origin: 23 })
    .catch((call) => {
      expect(call).to.be.equal('Parâmetros inválidos.');
    }));
  it('Deve receber a mensagem "Ei... Falta alguma coisa, né?"', () => NewCall({ origin: 23, destinys: [{ destiny: 0, price: 1.9 }]})
    .catch((err) => {
      expect(err).to.be.equal('Ei... Falta alguma coisa, né?');
    }));
  it('Deve receber a ligação modificada', () => {
    GetCall({ origin: 11 })
      .then((call) => {
        call.destinys.forEach(x => (x.price *= 1.5));
        UpdateCall(call)
          .then((updatedCall) => {
            expect(updatedCall).to.be.equal(call);
          });
      })
  })
  it('Deve receber a mensagem "Parâmetros inválidos."', () => UpdateCall({ origin: 23 })
    .catch((call) => {
      expect(call).to.be.equal('Parâmetros inválidos.');
    }));
  it('Deve receber todas as ligações', () => GetCalls()
    .then((calls) => {
      expect(calls).to.be.a('array').to.have.length(4);
    }));
  it('Deve receber um array vazio', () => GetCalls({ origin: 9999 })
    .then((calls) => {
      expect(calls).to.be.an('array');
      expect(calls).to.be.empty;
    }));
  it('Deve receber uma ligação', () => GetCall()
    .then((call) => {
      expect(call).to.have.property('origin');
      expect(call).to.have.property('destinys');
    }));
  it('Deve receber um objeto vazio', () => GetCall({ origin: 9999 })
    .then((call) => {
      expect(call).to.be.empty;
    }));
});
