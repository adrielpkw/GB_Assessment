const https = require("https");
const fs = require("fs");
const path = require("path");
const { calculate } = require("./calculate.js");
const SECRET_API_KEY = process.env.SECRET_API_KEY;
const PORT = process.env.PORT;
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

const server = https.createServer(options, (req, res) => {
  // Serve index.html for as homepage
  if (req.url === "/" && req.method === "GET") {
    const filePath = path.join(__dirname, "..", "client", "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Error loading homepage");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
    return;
  }

  // Serve any file from the client folder if it exists
  const filePath = path.join(__dirname, "..", "client", req.url);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    let contentType = "text/plain";
    if (req.url.endsWith(".css")) contentType = "text/css";
    if (req.url.endsWith(".js")) contentType = "application/javascript";
    if (req.url.endsWith(".html")) contentType = "text/html";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Error loading file");
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle POST /calculate (API)
  if (req.url === "/calculate" && req.method === "POST") {
    const apiKey = req.headers["x-api-key"];
    if (apiKey != SECRET_API_KEY || !apiKey) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Unauthorized access! API key is obviously invalid or missing.",
        })
      );
      return;
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const { expression } = JSON.parse(body);
        if (!expression) {
          throw new Error("Expression is required");
        }

        const result = calculate(expression);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ result }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Not found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
  console.log("Server is running on " + process.env.API_URL);
});
