const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Production Request Logger
morgan.token("body", (req) => {
  const body = { ...req.body };

  // Hide sensitive data
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

      responseSize: `${tokens.res(
        req,
        res,
        "content-length"
      ) || 0} bytes`,

      ip:
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress,

      userAgent: tokens["user-agent"](req, res),

      requestBody: tokens.body(req, res),
    });
  })
);


// Routes
app.use("/api/auth", authRoutes);




// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});


module.exports = app;