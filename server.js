const next = require("next");
const debug = require("debug")("backend:server");
const http = require("http");
const { normalizePort } = require("./server/util");
const handlers = require('./server/handlers');
const express = require('express');

// Setup Nextjs
const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Launch server
app.prepare().then(() => {

  // Setups the next server
  const server = express();

  // Catch API requests
  server.use('/api', handlers);

  // Catch all goes to nextJS
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});
