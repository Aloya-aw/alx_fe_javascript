const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
const addQuoteBtn = document.getElementById('addQuoteBtn');

newQuoteTextInput.type = 'text';
newQuoteTextInput.placeholder = 'Enter a new quote';
newQuoteCategoryInput.type = 'text';
newQuoteCategoryInput.placeholder = 'Enter quote category';
addQuoteBtn.textContent = 'Add Quote';

addQuoteForm.appendChild(newQuoteTextInput);
addQuoteForm.appendChild(newQuoteCategoryInput);
addQuoteForm.appendChild(addQuoteBtn);
quoteDisplay.appendChild(addQuoteForm);


let quotes = [];

function loadQuotesFromStorage() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

function saveQuotesToStorage() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

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
    const newQuoteListItem = document.createElement('li');
    newQuoteListItem.textContent = `${newQuoteText} - ${newQuoteCategory}`;
    quoteDisplay.appendChild(newQuoteListItem);
    showRandomQuote();
  } else {
    alert('Please enter both quote text and category.');
  }
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotesToStorage();
    alert('Quotes imported successfully!');
    showRandomQuote(); // Update displayed quote after import
  };
  fileReader.readAsText(event.target.files[0]);
}

newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
importFile.addEventListener('change', importFromJsonFile);

loadQuotesFromStorage();
showRandomQuote();

