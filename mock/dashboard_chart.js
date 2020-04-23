// import random from "lodash/random";
var random = require(`lodash/random`);

function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [
        random(100),
        random(100),
        random(100),
        random(100),
        random(100),
        random(100)
      ];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
