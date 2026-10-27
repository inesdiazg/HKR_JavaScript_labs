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

// 3. VALIDATION FUNCTIONS

// Validates full name
const validateFullName = () => {
    // Regular expression and minimum 2 characters
    const regexName = /^[a-zA-ZÀ-ÿ\s'-]{2,}$/;
    const value = inputFullname.value;
    if (value === "") {
        return "Full name is required.";
    } else if (!regexName.test(value)) { // if the text does NOT (!) follow the rule
        return "Please enter a valid name (at least 2 characters, letters only).";
    } else {
        return ""; // If there are not errors, return the string empty
    }
};

const validateEmail = () => {
    const value = inputEmail.value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
        return "Email is required.";
    } else if (!regexEmail.test(value)) { 
        return "Please enter a valid email address (e.g., name@domain.com).";
    } else {
        return "";
    }
};

const validateTopic = () => {
    const value = inputTopic.value;
    if (value === "") {
        return "Please select a topic of interest.";
    } else {
        return "";
    }
};

const validateComments = () => {
    const value = inputComments.value;
    if (value === "") {
        return "Comments are required.";
    } else if (value.length < 15) {
        return "Comments must be at least 15 characters long.";
    } else {
        return "";
    }
}

// 4. UI FEEDBACK FUNCTIONS

const showFieldError = (inputElement, errorElement, message) => {
    // Show error message
    errorElement.textContent = message;

    // Add or remove CSS class for border color
    inputElement.classList.add("input-error");
    inputElement.classList.remove("input-valid");
};

const clearFieldError = (inputElement, errorElement, isValid = true) => {
    // Clear error message
    errorElement.textContent = "";
    
    // If the field is valid, give green border and remove red
    if (isValid) {
        inputElement.classList.remove("input-error");
        inputElement.classList.add("input-valid");
    } else {
        // If the field is not valid yet, remove both borders
        inputElement.classList.remove("input-error", "input-valid");
    }
};