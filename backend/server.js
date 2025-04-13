import express from "express";
import quotes from "./quotes.json" assert { type: "json" };

const app = express();
const port = 3000;

function pickRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
console.log(pickRandomQuote(quotes))

app.get("/", (req, res) => {
  console.error("Received a request for a quote");
  const quote = pickRandomQuote();
  res.send(`"${quote.quote}" -${quote.author}`);
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});