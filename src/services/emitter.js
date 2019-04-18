// eslint-disable-next-line import/prefer-default-export
export const Emitter = (res, response) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(response);
};
