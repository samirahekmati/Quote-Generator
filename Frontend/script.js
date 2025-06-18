function fetchAndDisplayQuote() {
  fetch("https://cs4cc48o8wwskkwk8oss0884.hosting.codeyourfuture.io/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("quote").textContent = `"${data.quote}"`;
      document.getElementById("author").textContent = `– ${data.author}`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  //selecting html elements
  const form = document.getElementById("quote-form");
  const quoteInput = document.getElementById("quoteForm");
  const authorInput = document.getElementById("authorForm");
  const validation = document.getElementById("validation");
  const newQuoteBtn = document.getElementById("new-quote");

  // Attach listener for new quote button
  newQuoteBtn.addEventListener("click", () => {
    fetchAndDisplayQuote(); // Fetch a new quote on click
  });

  //form submit handler
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // <-- IMPORTANT! Stop the form from reloading the page

    console.log("quoteInput:", quoteInput);
    console.log("authorInput:", authorInput);
    const addedQuote = quoteInput.value.trim();
    console.log("added quote-->", addedQuote);

    const addedAuthor = authorInput.value.trim();
    console.log("added author-->", addedAuthor);

    if (addedAuthor === "" || addedQuote === "") {
      validation.textContent = "You should fill out the form before submition";
      validation.style.color = "red";
      return; //stop the fetch if validation fails
    }

    fetch(
      "https://cs4cc48o8wwskkwk8oss0884.hosting.codeyourfuture.io/api/quotes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote: addedQuote,
          author: addedAuthor,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add quote");
        return res.json();
      })
      .then((data) => {
        validation.textContent = data.message; // show message from backend
        validation.style.color = "green";
        form.reset();
      })
      .catch((err) => {
        validation.textContent = "Error saving quote." + err.message; //err msg from the backend
        validation.style.color = "red";
        console.error(err);
      });
  });
});
