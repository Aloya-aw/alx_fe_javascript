const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const categoryFilterInput = document.getElementById('categoryFilter');
const categoryList = document.getElementById('categoryList');

newQuoteTextInput.type = 'text';
newQuoteTextInput.placeholder = 'Enter a new quote';
newQuoteCategoryInput.type = 'text';
newQuoteCategoryInput.placeholder = 'Enter quote category';
addQuoteBtn.textContent = 'Add Quote';

addQuoteForm.appendChild(newQuoteTextInput);
addQuoteForm.appendChild(newQuoteCategoryInput);
addQuoteForm.appendChild(addQuoteBtn);
quoteDisplay.appendChild(addQuoteForm);


let quotes = [
  "The early bird catches the worm", "You reap what you sow"
];
let categories = [];

// Simulate server data (replace with actual server API)
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

//Import JSON
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

//EXPORT
document.getElementById('exportButton').addEventListener('click', exportToJsonFile);
function exportToJsonFile() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

function loadQuotesFromStorage() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
    populateCategories();
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
    saveQuotesToStorage();
    showRandomQuote();
    syncQuotesToServer();
  } else {
    alert('Please enter both quote text and category.');
  }
}

function populateCategories() {
  categories = quotes.map(quote => quote.category).filter((category, index, arr) => arr.indexOf(category) === index);
  categoryList.innerHTML = '';
  categories.forEach(category => {
    const categoryOption = document.createElement('option');
    categoryOption.value = category;
    categoryOption.textContent = category;
    categoryList.appendChild(categoryOption);
  });
}
function filterQuotesByCategory(selectedCategory) {
  if (selectedCategory === 'All') {
    showRandomQuote();
  } else {
    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    if (filteredQuotes.length > 0) {
      showRandomQuote(filteredQuotes);
    } else {
      alert('No quotes found for that category.');
    }
  }
}

async function syncQuotesToServer() {
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quotes)
    });

    const serverQuotes = await response.json();

    // Handle potential conflicts
    if (serverQuotes.length !== quotes.length) {
      alert('Conflict detected! Server data may have changed. Updating local quotes.');
      quotes = serverQuotes;
      saveQuotesToStorage();
    }
    else {
      alert("Quotes synced with server!");
    }
  } catch (error) {
    console.error('Error syncing quotes:', error);
  }
}

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverUrl);
    const serverQuotes = await response.json();

    // Handle potential conflicts
    if (serverQuotes.length !== quotes.length) {
      alert('Conflict detected! Server data may have changed. Updating local quotes.');
      quotes = serverQuotes;
      saveQuotesToStorage();
    }
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
}

// Periodically fetch quotes from the server
setInterval(fetchQuotesFromServer, 5000); // Adjust the interval as needed
  
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
categoryFilterInput.addEventListener('change', () => filterQuotesByCategory(categoryFilterInput.value));
exportButton.addEventListener('click', exportToJsonFile);

loadQuotesFromStorage();
showRandomQuote();
populateCategories();
