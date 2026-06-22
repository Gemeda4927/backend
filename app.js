const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");

const app = express();


app.use(cors());
app.use(express.json());


morgan.token("body", (req) => {
  const body = { ...req.body };
  if (body.password) body.password = "*****";
  if (body.token) body.token = "*****";

  return JSON.stringify(body);
});


app.use(
  morgan((tokens, req, res) => {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number(tokens.status(req, res)),
      responseTime: `${tokens["response-time"](req, res)} ms`,
      responseSize: `${tokens.res(req, res, "content-length") || 0} bytes`,
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      userAgent: tokens["user-agent"](req, res),
      requestBody: tokens.body(req, res),
    });
  })
);


// API Versioning
const API_V1 = "/api/v1";
const API_V2 = "/api/v2";
const API_V3 = "/api/v3";

// Current version routes
app.use(`${API_V1}/auth`, authRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});


module.exports = app;