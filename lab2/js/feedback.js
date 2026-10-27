// 1. DOM ELEMENTS SELECTION (storing references once)

// Form and status area
const form = document.getElementById("feedback-form");
const statusArea = document.getElementById("status-area");

// Form fields
const inputFullname = document.getElementById("fullname");
const inputEmail = document.getElementById("email");
const inputTopic = document.getElementById("topic");
const inputComments = document.getElementById("comments");
const inputWebsite = document.getElementById("website");

// Error message spans
const errorFullname = document.getElementById("error-fullname");
const errorEmail = document.getElementById("error-email");
const errorTopic = document.getElementById("error-topic");
const errorComments = document.getElementById("error-comments");
const errorWebsite = document.getElementById("error-website");

// Character counter
const charCounter = document.getElementById("char-counter");

// Buttons
const clearBtn = document.getElementById("clear-btn");

// 2. LIVE CHARACTER COUNTER

// Function that updates text and color of the counter
const updateCounter = () => {
    // Get current text length
    const length = inputComments.value.length;
    
    // Update text
    charCounter.textContent = `${length} characters (minimum 15)`;

    // Change color if it reaches the minimum or not
    if (length < 15) {
        charCounter.style.color = "red";
    } else {
        charCounter.style.color = "green";
    }
};

// Listen 'input' event (the counter is triggered when the user writes or deletes)
inputComments.addEventListener("input", updateCounter);