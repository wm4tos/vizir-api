export const Emitter = (res, response) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(response);
};

export const ErrorEmitter = (res, error, message) => {
  const response = {};
  switch (error) {
    case 400:
      response.status = 400;
      response.message = 'Parâmetros inválidos! Por favor, corrija-os e tente novamente!';
      break;
    case 404:
      response.status = 404;
      response.message = 'Nenhum registro encontrado :/';
      break;
    case 409:
      response.status = 409;
      response.message = 'Houve um conflito.';
      break;
    case 500:
      response.status = 500;
      response.message = 'Houve um erro interno. Por favor, tente novamente mais tarde :(';
      break;
    default:
      response.status = 500;
      response.message = 'Não foi possível completar sua chamada. Por favor, tente novamente mais tarde :(';
  }
  if (message) {
    response.message = message;
  }
  res.send(response);
};
