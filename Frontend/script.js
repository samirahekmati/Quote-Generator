function fetchAndDisplayQuote() {
  fetch("/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("quote").textContent = `"${data.quote}"`;
      document.getElementById("author").textContent = `– ${data.author}`;
    });
}


