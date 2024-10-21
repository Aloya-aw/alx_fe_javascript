const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
const addQuoteBtn = document.getElementById('addQuoteBtn');



let quotes = [
  { text: 'The only way to do great work is to love what you do.', category: 'Inspiration' },
  { text: 'Life is what happens while you\'re busy making other plans.', category: 'Humor' },
  // Add more quotes here
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}"`; // Use innerHTML to set the quote text
}


function createAddQuoteForm() {
  addQuoteForm.style.display = 'block';
}

function addQuote() {
  const newQuoteText = newQuoteTextInput.value.trim();
  const newQuoteCategory = newQuoteCategoryInput.value.trim();
  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    newQuoteTextInput.value = '';
    newQuoteCategoryInput.value = '';
    showRandomQuote();
  } else {
    alert('Please enter both quote text and category.');
  }
}

newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);


