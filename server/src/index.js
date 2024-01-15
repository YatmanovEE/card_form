const ErrorMSG = () => ({ message: "Bad request", code: 110143 });
const PORT = process.env.PORT || 2050;
const bodyParser = require("body-parser"),
  { isString, getRandomRange } = require("./utils"),
  express = require("express"),
  jayson = require("jayson"),
  app = express(),
  uuid = require("uuid");

let pid = null;
let callCount = 0;
let randomCall = getRandomRange(2, 5);

const paymentSession = (args, cb) => {
  const { pan, expire, cardholder, cvc } = args,
    keys = Object.keys(args);
  callCount = 0;
  pid = uuid.v4();

  if (pan && expire && cardholder && cvc) {
    keys.map((el) => {
      return !isString(args[el]) ? cb(ErrorMSG()) : ""
    });
    cb(null, { pid });
  } else cb(ErrorMSG());
};

const EmployeeServices = jayson.server({
  pay: (args, cb) => {
    console.log({args})
    return args ? paymentSession(args, cb) : cb(ErrorMSG())
  }
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.post("/api", EmployeeServices.middleware());

app.get("/pay/check/*", (request, response) => {
  if (request.params[0] === pid) {
    callCount++;

    switch (true) {
      case callCount < randomCall:
        response.send({ status: "process", pid });
        break;
      case callCount === randomCall:
        response.send({ status: "ok", pid });
        break;
      case callCount === 5:
        response.send({ status: "fail", pid });
        break;
      default:
        response.send({ message: "err" });
    }
  } else response.send({ message: "invalid pid" });
});

const server = app.listen(PORT, () => {
  console.log(`Start ${PORT} port`);
});
server.keepAliveTimeout = 1000;
