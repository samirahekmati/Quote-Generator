import express from "express";
import cors from "cors";
import quotes from "./quotes.json" assert { type: "json" };
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;

app.use(express.json()); // parsing JSON bodies

// Required for __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("file name-->", __filename);
console.log("dir name-->", __dirname)

// Allow requests from your frontend domain
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://qw8ows84gokgoccccg00kcgg.hosting.codeyourfuture.io",
      "http://127.0.0.1:5500"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// Serve static files from Frontend folder
app.use(express.static(path.join(__dirname, "../Frontend")));

function pickRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get('/', (req, res) => {
  res.send('Backend is running.');
});

// API route to get a random quote (frontend will fetch this)
app.get("/api/quotes", (req, res) => {
  console.error("Received a request for a quote");
  const quote = pickRandomQuote();
  res.json(quote);
});


app.post("/api/quotes", (req, res) => {
  const { quote, author } = req.body;

  if (!quote || !author) {
    return res.status(400).json({ error: "Quote and author are required." });
  }

  // Optional: Save the quote somewhere (e.g., to memory or to a file if learning file I/O)
  console.log("New quote received:", quote, "by", author);

  res.status(201).json({ message: "Quote saved successfully." });
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});