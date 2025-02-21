// Cart functionality
let cartItems = [];

// Initialize cart from sessionStorage
function initializeCart() {
    const stored = sessionStorage.getItem('cartItems');
    if (stored) {
        cartItems = JSON.parse(stored);
    }
}

// Save cart to sessionStorage
function saveCart() {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add item to cart
function addToCart(itemName) {
    cartItems.push(itemName);
    saveCart();
    alert("Item added to the cart");
}

// View cart modal
function viewCart() {
    const modal = document.getElementById('cartModal');
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
    } else {
        let itemsList = '<ul>';
        cartItems.forEach((item, index) => {
            itemsList += `
                <li>
                    <span>${item}</span>
                    <button onclick="removeItem(${index})" 
                            style="background: none; border: none; color: #742C36; cursor: pointer; padding: 5px;">
                        <i class="fas fa-times"></i>
                    </button>
                </li>`;
        });
        itemsList += '</ul>';
        cartItemsDiv.innerHTML = itemsList;
    }
    
    modal.style.display = "block";
}

// Add remove item functionality
function removeItem(index) {
    cartItems.splice(index, 1);
    saveCart();
    viewCart(); // Refresh the cart display
}

// Clear cart
function clearCart() {
    if (cartItems.length === 0) {
        alert("No items to clear");
    } else {
        cartItems = [];
        saveCart();
        alert("Cart cleared");
        if (document.getElementById('cartModal')) {
            viewCart(); // Refresh cart view if modal is open
        }
    }
}

// Process order
function processOrder() {
    if (cartItems.length === 0) {
        alert("Cart is empty");
    } else {
        alert("Thank you for your order");
        cartItems = [];
        saveCart();
        if (document.getElementById('cartModal')) {
            viewCart(); // Refresh cart view if modal is open
        }
    }
}

// Contact form functionality
function handleContactForm(event) {
    event.preventDefault();
    const form = document.querySelector('.contact-form');
    const formSection = document.querySelector('.contact-section');
    
    // Save form data to localStorage
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        message: form.querySelector('#message').value,
        timestamp: new Date().toISOString()
    };
    
    // Get existing messages or initialize empty array
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push(formData);
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
    
    // Hide the form
    form.style.display = 'none';
    
    // Create and show thank you message
    const thankYouMessage = document.createElement('div');
    thankYouMessage.className = 'thank-you-message';
    thankYouMessage.innerHTML = `
        <h3 class="title">Thank You!</h3>
        <p class="body-large">Thank you for your message</p>
    `;
    
    formSection.appendChild(thankYouMessage);
    
    // Reset form for future use
    form.reset();
}

// Subscribe functionality
function handleSubscribe() {
    const emailInput = document.getElementById('subscribeEmail');
    const email = emailInput.value;

    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Thank you for subscribing.");
    emailInput.value = '';
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize all event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();

    // Close modal when clicking X
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            document.getElementById('cartModal').style.display = "none";
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('cartModal');
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Subscribe button
    const subscribeButton = document.querySelector('.subscribe-btn');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', handleSubscribe);
    }

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});