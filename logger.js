const express = require("express");
const res = require("express/lib/response");
const app = express();
const path = require("path");
const fs = require("fs");
const winston = require("winston");

const excludeErrorLevel = winston.format((info) => {
  if (info.level === "error") {
    return false; // Exclude error messages from this format
  }
  return info; // Include other log messages
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculate-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({
      filename: "combined.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        excludeErrorLevel() // Exclude error messages from this format
      ),
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}




app.use(express.static(path.join(__dirname, "public_html")));

app.get("/", (req, res) => {
  res.sendFile("calculator.html", { root: "public_html" });
});

app.get("/add", (req, res) => {
  console.log(req.query);
  try {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    if (isNaN(Number(n1))) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    logger.info("Parameters " + n1 + " and " + n2 + " received for addition");
    const result = n1 + n2;
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

app.get("/sub", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    logger.info(
      "Parameters " + n1 + " and " + n2 + " received for substraction"
    );
    const result = n1 - n2;
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

app.get("/mul", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    logger.info(
      "Parameters " + n1 + " and " + n2 + " received for multiplication"
    );
    const result = n1 * n2;
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

app.get("/div", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    logger.info("Parameters " + n1 + " and " + n2 + " received for division");
    const result = n1 / n2;
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

app.get("/expo", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    logger.info("Parameters " + n1 + " and " + n2 + " received for addition");
    const result = n1 ^ n2;
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

app.get("/squre", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    logger.info("Parameters " + n1 + " and " + n2 + " received for addition");
    const result = n1 * n1;
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

app.get("/mod", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    logger.info("Parameters " + n1 + " and " + n2 + " received for addition");
    const result = Math.pow(n1, 2 / root);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

app.get("/root", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    logger.info("Parameters " + n1 + " and " + n2 + " received for addition");
    const result = n1 % n2;
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

const port = 3040;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
