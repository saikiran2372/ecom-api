import logger from "./logger.middleware.js";

const errorHandlingMiddleware = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`, { stack: err.stack, url: req.url, body: req.body });
    res.status(503).send("Something went wrong, please try later.");
};

export default errorHandlingMiddleware;
