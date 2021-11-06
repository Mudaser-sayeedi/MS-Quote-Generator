// Dom manipulating
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#autor');
const newQuoteButton = document.querySelector('#new-qoute');
const tweetButton = document.querySelector('#twitter');
const qNo = document.querySelector('#qNo');
const allQno = document.querySelector('#allQno');

//global variable
let quotesList = [];

// show quotes function
const showQuotes = () => {
    const quoteNumber = Math.floor(Math.random() * quotesList.length);
    const quote = quotesList[quoteNumber];

    qNo.textContent = `( ${quoteNumber} )`;
    allQno.textContent = `( ${quotesList.length} )`;

    // check if the author field is null (blank) replace it with unknown author.
    if (!quote.author) {
        quoteAuthor.textContent = 'Unknown Author';
    } else {
        quoteAuthor.textContent = quote.author;
    }

    // check if the quote is too long reduce this fontsize of its text.
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
}

// geting quotes from api
const getQuote = async () => {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const res = await fetch(apiUrl);
        quotesList = await res.json();
        showQuotes();
    } catch (error) {
        alert('Some Thing Went Wrong With The Api OR Your Connection is Losted! Try again Letter. THANKS');
        console.log(error);
    }
}

// create tweet with this quote text.
const tweet = () => {
    const tweetURl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(tweetURl, '_blank');
}

// button click listners.
newQuoteButton.addEventListener('click', showQuotes);
tweetButton.addEventListener('click', tweet);

//onLoad this js file
getQuote();