const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

let quotes = [
  { text: 'The only way to do great work is to love what you do.', category: 'Inspiration' },
  { text: 'Life is what happens while you\'re busy making other plans.', category: 'Humor' },
  // Add more quotes here
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = randomQuote.text;
}

function createAddQuoteForm() {
  const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" id="newQuoteText" placeholder="Enter quote text">
    <input type="text" id="newQuoteCategory" placeholder="Enter quote category">
    <button type="submit">Add Quote</button>
  `;
  quoteDisplay.appendChild(form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      form.remove();
      showRandomQuote();
    }
  });
}

newQuoteButton.addEventListener('click', showRandomQuote);
createAddQuoteForm();

