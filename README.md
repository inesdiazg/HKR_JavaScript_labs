# HKR_JavaScript_labs
Lab assignments of the course Javascript for web development (HKR)

# Portfolio Website - Lab 2

## Project Information
*   **Name:** Inés Díaz García
*   **Course:** DA558A HT26 Javascript for web development
*   **Target Grade:** Grade 4
*   **Repository:** https://github.com/inesdiazg/HKR_JavaScript_labs

## Implemented Features

### Grade 3: Feedback form
*   **Accessible form:** Includes fields for Full name, Email, Topic of Interest, Comments, and an optional Website URL.
*   **Live character counter:** The comments field includes a live counter that turns red if the text is under 15 characters, and green when it meets the minimum.
*   **Real-time validation:** The form validates input as the user types, showing error messages directly below the fields with red borders. Valid fields get a green border.
*   **Success message:** With a successful submission, a personalized message appears and disappears automatically after 4 seconds.
*   **Clear button:** Restores the form to its initial state, clearing all values, errors, and counters.

### Grade 4: Interactive skills showcase
*   The skills section is generated dynamically from a JavaScript array of objects, instead of being coded in the HTML.
*   **Filtering:** Users can filter skills by category (Data analysis, Programming, Tools, Creative, Fieldwork) using dynamically generated buttons.
*   **Sorting:** Users can sort the skills by Proficiency (high to low), Experience (high to low), or Name (A-Z).
*   **Combined state:** Filtering and sorting work together seamlessly. The UI updates to show the active filter and the number of visible skills.
*   **Accessibility:** Includes `aria-live` on the results counter and `aria-pressed` on filter buttons.

## How to run the site
This is a browser-only project. There is no backend or database required.
1. Clone or download this repository.
2. Open the `index.html` file in any modern web browser (Chrome, Firefox, Edge, Safari).
3. Navigate the different sections

## Project structure
*   `index.html`, `about.html`, `projects.html`, `contact.html`: The main HTML pages.
*   `css/`: Contains the stylesheets (`styles.css`, `feedback.css` and `skills.css`).
*   `js/`: Contains the JavaScript files (`feedback.js` and `skills.js`).
*   `imgs/`: Contains all the images and icons.