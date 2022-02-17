let apiQuotes = [];
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

//Show Loader
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

//Show Quote
const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
const newQuote = () => {
    loading();
    //Pick a randome quote index from apiQuotes array
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   
    //Change styling for long quotes
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set unknown auther quote to Unknown
    if (!quote.author) {
        quote.author = "Unknown";
    };

    //Set quoteText
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;

    //Hide loader
    complete();

}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //alert error here
    }
};


//On Load
getQuotes();

//Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');
};

twitterBtn.addEventListener('click', () => {
    tweetQuote();
})
//On newQuoteBtn Press
newQuoteBtn.addEventListener('click', () => {
    newQuote();
})