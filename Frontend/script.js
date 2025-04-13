function fetchAndDisplayQuote() {
  fetch("https://cs4cc48o8wwskkwk8oss0884.hosting.codeyourfuture.io/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("quote").textContent = `"${data.quote}"`;
      document.getElementById("author").textContent = `– ${data.author}`;
    });
}

function setup() {
  document.getElementById("new-quote").addEventListener("click", () => {
    fetchAndDisplayQuote(); // Fetch new quote on button click
  });
}

setup();
