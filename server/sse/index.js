const SSE = require("express-sse");
const sse = new SSE(["test data"]);
// console.log(sse);
module.exports = sse;
