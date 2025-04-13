import express from "express";
import quotes from "./quotes.json" assert { type: "json" };
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Required for __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("file name-->", __filename);
console.log("dir name-->", __dirname)

// Serve static files from Frontend folder
app.use(express.static(path.join(__dirname, "../Frontend")));

function pickRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
console.log(pickRandomQuote(quotes))


// API route to get a random quote (frontend will fetch this)
app.get("/api/quotes", (req, res) => {
  console.error("Received a request for a quote");
  const quote = pickRandomQuote();
  res.json(quote);
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});