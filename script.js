const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

// Show loading animation
function showLoadingAnimation() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading animation
function HideLoadingAnimation() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Show new Quote
function newQuote() {
    showLoadingAnimation();
    //  To pick random quote from the API array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // To check if author is not blank
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // To apply css style if lenght exceeds
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    HideLoadingAnimation();
}

// Get Quotes from API
async function getQuotes() {
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        showLoadingAnimation();
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch error here
        alert(error);
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();