const changeCase = require("change-case");

exports.changeObjToSnake = (body) => {
  return Object.keys(body).reduce((acc, key) => {
    acc[changeCase.snakeCase(key)] = body[key];
    return acc;
  }, {});
};

const objToCamel = (body) => {
  // Null Check for undefined
  if (!body) return body;
  return Object.keys(body).reduce((acc, key) => {
    acc[changeCase.camelCase(key)] = body[key];
    return acc;
  }, {});
};

exports.changeObjToCamel = (body) => objToCamel(body);

exports.changeObjArrToCamel = (body) => body.map((item) => objToCamel(item));
