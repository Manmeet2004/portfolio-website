
// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 50, // Adjust scroll position to avoid header overlap
            behavior: 'smooth'
        });
    });
});

// Adding hover effect on navbar links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
        this.style.color = '#ffbf35';  // Change color on hover
    });
    link.addEventListener('mouseout', function() {
        this.style.color = '';  // Reset color when not hovering
    });
});

// Simple form validation and submission
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting in the traditional way

        // You can perform validation here if needed

        // Display a message upon form submission
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && message) {
            alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        } else {
            alert('Please fill out all fields before submitting.');
        }

        // Optionally, reset the form after submission
        contactForm.reset();
    });
}

// Scroll to top button functionality
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = '↑';
scrollToTopButton.style.position = 'fixed';
scrollToTopButton.style.bottom = '20px';
scrollToTopButton.style.right = '20px';
scrollToTopButton.style.padding = '10px';
scrollToTopButton.style.fontSize = '20px';
scrollToTopButton.style.backgroundColor = '#ffbf35';
scrollToTopButton.style.border = 'none';
scrollToTopButton.style.cursor = 'pointer';
document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission behavior
  
    const form = e.target;
  
    // Use fetch to send form data to Formspree or your email service
    fetch(form.action, {
      method: form.method, // Ensure it's 'POST'
      body: new FormData(form), // Send form data
      headers: {
        Accept: "application/json", // Let server know we're expecting JSON response
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you for your message!"); // Success message
          form.reset(); // Reset form fields after successful submission
        } else {
          alert("Something went wrong. Please try again."); // Error handling
        }
      })
      .catch((error) => {
        alert("Error: " + error.message); // Catch network or fetch errors
      });
  });
  let board = document.getElementById('game-board');
let flippedCards = [];
let moveCount = 0;
let cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function startGame() {
  moveCount = 0;
  flippedCards = [];
  document.getElementById('moves').textContent = `Moves: ${moveCount}`;
  
  // Shuffle and create cards
  let shuffledValues = [...cardValues, ...cardValues].sort(() => 0.5 - Math.random());
  board.innerHTML = '';
  
  shuffledValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
      moveCount++;
      document.getElementById('moves').textContent = `Moves: ${moveCount}`;
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.dataset.value === card2.dataset.value) {
    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

startGame();
