function fetchAndDisplayQuote() {
  fetch("https://cs4cc48o8wwskkwk8oss0884.hosting.codeyourfuture.io/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("quote").textContent = `"${data.quote}"`;
      document.getElementById("author").textContent = `– ${data.author}`;
    });
}


  
  //selecting html elements
const form = document.getElementById("quote-form")
const quoteInput = document.getElementById("quoteForm");
const authorInput = document.getElementById("authorForm");
const validation = document.getElementById("validation")


//adding event listener to the form
form.addEventListener("submit", function(event){
  event.preventDefault(); // <-- IMPORTANT! Stop the form from reloading the page

  const addedQuote = quoteInput.value.trim()
  console.log("added quote-->", addedQuote)

  const addedAuthor = authorInput.value.trim()
  console.log("added author-->", addedAuthor)

  if(addedAuthor === "" || addedQuote === ""){
    validation.textContent = "You should fill out the form before submition"
  validation.style.color = "red"
  }


  fetch("https://cs4cc48o8wwskkwk8oss0884.hosting.codeyourfuture.io/api/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      quote: addedQuote,
      author: addedAuthor
    })
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to add quote");
      return res.json();
    })
    .then((data) => {
      validation.textContent = "Quote successfully saved!";
      validation.style.color = "green";
      form.reset();
    })
    .catch((err) => {
      validation.textContent = "Error saving quote.";
      validation.style.color = "red";
      console.error(err);
    });

  
  
})



function setup() {
  document.getElementById("new-quote").addEventListener("click", () => {
    fetchAndDisplayQuote(); // Fetch new quote on button click
  });
}

setup();
