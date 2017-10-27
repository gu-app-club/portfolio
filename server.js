const next = require("next");
const expressServer = require("./server/express");
const debug = require("debug")("backend:server");
const http = require("http");
const { normalizePort } = require("./server/util");

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Setup Nextjs
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
expressServer.get("*", (req, res) => {
  return handle(req, res);
});

// Setup port
const port = normalizePort(process.env.PORT || "3000");
expressServer.set("port", port);

// Launch server
app.prepare().then(() => {
  const server = http.createServer(expressServer);

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
  }

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
});
