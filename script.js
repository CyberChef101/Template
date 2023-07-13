const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote
function newQuote() {
    loading();
    //pick a random quote from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if the author feild is blank and replace with 'Unknwon'
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }

    //check the quote length to determining the styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set the quote , hide loader
    quoteText.textContent = quote.text;
    complete();
}

// get quotes from api
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(eroor){
        alert(error)
        //catch handled here
    }
}

//Tweet Quote

function tweetQuote() {
    const twitterUrl = `https:\\twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


//Event Listners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//on load
getQuotes();
