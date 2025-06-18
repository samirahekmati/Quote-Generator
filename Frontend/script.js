function fetchAndDisplayQuote() {
  //Send a GET request to /api/quotes endpoint
  fetch("https://cs4cc48o8wwskkwk8oss0884.hosting.codeyourfuture.io/api/quotes")
    .then((res) => res.json()) //Parses the JSON from the response
    .then((data) => { //Update the HTML with the quote and author from the response
      document.getElementById("quote").textContent = `"${data.quote}"`;
      document.getElementById("author").textContent = `– ${data.author}`;
    });
}


document.addEventListener("DOMContentLoaded", () => { //Runs the enclosed code after the HTML has fully loaded — so all DOM elements can safely be accessed
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

    
    const addedQuote = quoteInput.value.trim();
    const addedAuthor = authorInput.value.trim();
    

    if (addedAuthor === "" || addedQuote === "") {
      validation.textContent = "You should fill out the form before submition";
      validation.style.color = "red";
      return; //stop the fetch if validation fails
    }

    //Send the user-provided quote and author to the backend in a POST request.
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
      .then((res) => { // Handling Response
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
