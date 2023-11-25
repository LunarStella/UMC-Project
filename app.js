import express from "express";
import tempRouter from "./src/routes/tempRoutes.js";

import { response } from "./src/config/response.js";

const app = express();

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/temp", tempRouter);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send(err.stack);
// });

// error handling
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.data.status).send(response(err.data));
});

export default app;
