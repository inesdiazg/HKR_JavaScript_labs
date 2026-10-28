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
const validateFullname = () => {
    // Regular expression and minimum 2 characters
    const regexName = /^[a-zA-ZÀ-ÿ\s'-]{2,}$/;
    const value = inputFullname.value;
    if (value === "") {
        return "Full name is required.";
    } else if (!regexName.test(value)) { // if the text does NOT follow the rule
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

// 5. RESET FORM FUNCTION

const resetForm = () => {
    // 1. Reset all input values
    form.reset();
    
    // 2. Clear all error messages
    errorFullname.textContent = "";
    errorEmail.textContent = "";
    errorTopic.textContent = "";
    errorComments.textContent = "";
    errorWebsite.textContent = "";
    
    // 3. Remove all validation classes (red or green borders) using a loop to avoid repeating the same lines
    const allInputs = [inputFullname, inputEmail, inputTopic, inputComments, inputWebsite];
    allInputs.forEach(input => {
        input.classList.remove("input-error", "input-valid");
    });
    
    // 4. Reset the character counter
    charCounter.textContent = "0 characters (minimum 15)";
    charCounter.style.color = "black";
};

// 6. FORM SUBMISSION AND GLOBAL VALIDATION

// Function that validates a single field and updates the UI accordingly.
const validateAndUpdateUI = (inputElement, errorElement, validationFunction) => {
    const errorMessage = validationFunction(); // The specific function to run (e.g.: validateEmail) that will return an error message or an empty string
    
    if (errorMessage !== "") {
        showFieldError(inputElement, errorElement, errorMessage);
        return false; // There is an error (show it on the screen)
    } else {
        clearFieldError(inputElement, errorElement, true);
        return true; // Everything is fine (show it on the screen)
    }
};

// Listen for the 'submit' event (user clicks on the button)
form.addEventListener("submit", (event) => {
    // 1. Prevent the page from reloading
    event.preventDefault();

    // 2. Validate all required fields by calling the previous function, and store the results (true/false) in variables to check them later
    const isFullnameValid = validateAndUpdateUI(inputFullname, errorFullname, validateFullname);
    const isEmailValid = validateAndUpdateUI(inputEmail, errorEmail, validateEmail);
    const isTopicValid = validateAndUpdateUI(inputTopic, errorTopic, validateTopic);
    const isCommentsValid = validateAndUpdateUI(inputComments, errorComments, validateComments);

    // 3. Validate the optional Website field (using native browser validation) only if the user typed something
    let isWebsiteValid = true; // start assuming the field is valid
    if (inputWebsite.value !== "" && !inputWebsite.checkValidity()) {
        showFieldError(inputWebsite, errorWebsite, "Please enter a valid URL (e.g., https://example.com).");
        isWebsiteValid = false;
    } else {
        // If it's empty or valid, clear error, but only apply the valid green border if the user actually wrote something (not "")
        clearFieldError(inputWebsite, errorWebsite, inputWebsite.value !== "");
    }

    // 4. If all fields are valid, show the success message
    if (isFullnameValid && isEmailValid && isTopicValid && isCommentsValid && isWebsiteValid) {
        // Get the user's name to personalize the message
        const userName = inputFullname.value();

        // Show the success message in the status area
        statusArea.textContent = 'All fields are valid! Form submitted successfully. Thanks for your feedback, ${userName}';

        // Set a timer to remove the message automatically after 4 seconds
        setTimeout(() => {
            statusArea.textContent = "";
            statusArea.classList.remove("status-success");
        }, 4000);

        // Reset the form
        resetForm();

    } else {
        console.log("There are errors in the form. Please check the fields.");
    }
});


// Listen for the 'click' event on the Clear button
clearBtn.addEventListener("click", resetForm);