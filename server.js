const express = require("express");
const { createBareServer } = require("@titaniumnetwork-group/bare-server-node");
const http = require("http");
const path = require("path");

const app = express();
const bareServer = createBareServer("/bare/");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// SPA fallback
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = http.createServer((req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`✅ Nova Hub running → http://localhost:${PORT}`)
);
