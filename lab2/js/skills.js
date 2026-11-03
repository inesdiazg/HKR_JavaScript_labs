// 1. SKILLS DATA ARRAY
// I wrote new aptitudes but then decided to go back (more or less) to the ones I had in the Lab1 version of the page
const skillsData = [
    { id: 1, name: "Data analysis", category: "Data analysis", proficiency: 4, yearsExperience: 3, description: "Experience with data wrangling and visualization, and statistical analyses." },
    { id: 2, name: "R", category: "Data analysis", proficiency: 3, yearsExperience: 3, description: "Statistical analysis and data wrangling for ecological datasets." },
    { id: 3, name: "Python", category: "Programming", proficiency: 2, yearsExperience: 1, description: "Data automation, processing, and bioacoustic analysis." },
    
    { id: 4, name: "Microsoft Office", category: "Tools", proficiency: 5, yearsExperience: 10, description: "20 years using Office, with academic and laboral experience, including advanced use of Excel." },
    { id: 5, name: "QGIS", category: "Tools", proficiency: 4, yearsExperience: 3, description: "Experience from courses, work and personal projects creating maps and analyzing spacial data." },
    { id: 6, name: "git/GitHub", category: "Tools", proficiency: 2, yearsExperience: 1, description: "Recent experience for version control and deploying web pages." },
    { id: 7, name: "GIMP", category: "Creative", proficiency: 2, yearsExperience: 5, description: "Experience editing illustrations for personal projects." },

    { id: 8, name: "HTML", category: "Programming", proficiency: 3, yearsExperience: 1, description: "Building semantic and accessible structures for web pages." },
    { id: 9, name: "CSS", category: "Programming", proficiency: 3, yearsExperience: 1, description: "Creating responsive layouts, custom properties, and designs." },

    { id: 10, name: "Illustration", category: "Creative", proficiency: 4, yearsExperience: 10, description: "Experience of a whole life drawing and painting." },
    { id: 11, name: "Bird identification", category: "Fieldwork", proficiency: 5, yearsExperience: 10, description: "Birdwatcher for more than 10 years, participation in monitoring programs and census." },
];

// 2. RENDER FUNCTION

// Refer to the container where the cards will go
const skillsContainer = document.getElementById("skills-container");

// Refer to the results counter container
const resultsCounter = document.getElementById("results-counter");

// Refer to the sorting selector
const sortSelect = document.getElementById("sort-select");

// Store the current state of the skills here, starting with a copy of the original data so we don't destroy the original array
let currentSkills = [...skillsData]; 

// Function to draw the cards on the screen
const renderSkills = () => {
    
    // Use .map() to loop through the array and create an HTML string for each skill
    const cardsHTML = currentSkills.map(skill => {
        // Calculate word based on number of years
        const yearWord = skill.yearsExperience > 1 ? "years" : "year";
        return `
            <div class="skill-card">
                <h3>${skill.name}</h3>
                <span class="category-label">${skill.category}</span>
                <p><strong>Level:</strong> ${skill.proficiency} / 5</p>
                <p><strong>Experience:</strong> ${skill.yearsExperience} ${yearWord}</p>
                <p class="skill-description">${skill.description}</p>
            </div>
        `;
    }).join(""); // use .join("") to turn the array of strings into one single block of HTML

    // Insert the generated HTML into the container
    skillsContainer.innerHTML = cardsHTML;
};

// Call the function once so the cards appear when the page loads
renderSkills();

// 3. FILTERING BUTTONS

// Get the reference to the controls container in the HTML
const skillsControls = document.getElementById("skills-controls");

// Extract unique categories from the original array using Set (https://dev.to/bytebodger/de-dupe-js-arrays-with-set-full-stop-29j0) and store them in an array using [...]
const categories = [...new Set(skillsData.map(skill => skill.category))];

// Function to generate the filter buttons
const renderFilters = () => {
    // Start with the "All" button
    let buttonsHTML = `<button class="filter-btn active" onclick="filterSkills('All')">All</button>`;
    
    // Loop through the categories and create a button for each
    categories.forEach(category => {
        buttonsHTML += `<button class="filter-btn" onclick="filterSkills('${category}')">${category}</button>`;
    });
    
    // Insert the buttons into the HTML
    skillsControls.innerHTML = buttonsHTML;
};

// 4. ONE FUNCTION TO UPDATE UI

// Keep track of the current filter and sort states
let activeCategory = "All";
let activeSort = "default";

// Function that applies the filter, then the sort, and then updates everything on screen
const updateUI = () => {
    // 1. Start with a copy of the original data
    let filteredSkills = [...skillsData];

    // 2. Apply filter (if not "All")
    if (activeCategory !== "All") {
        filteredSkills = filteredSkills.filter(skill => skill.category === activeCategory);
    }

    // 3. Apply sort (if not "default")
    switch (activeSort) {
        case "proficiency":
            filteredSkills.sort((a, b) => b.proficiency - a.proficiency); // sort high to low (b - a)
            break;
        case "experience":
            filteredSkills.sort((a, b) => b.yearsExperience - a.yearsExperience); // sort high to low (b - a)
            break;
        case "name":
            filteredSkills.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically (https://wfernandoaugusto01.medium.com/sorting-data-alphabetically-localecompare-sort-e3d314708f8c)
            break;
    }

    // 4. Update the global state variable with the result
    currentSkills = filteredSkills;

    // 5. Update the counter text
    resultsCounter.textContent = `Showing ${currentSkills.length} of ${skillsData.length} skills`;

    // 6. Update the active button visual state
    const allButtons = document.querySelectorAll('.filter-btn');  // get all buttons
    allButtons.forEach(btn => {
        btn.classList.remove('active');  // remove the 'active' class
        // If the button text matches the active category, set it as active
        if (btn.textContent === activeCategory) {
            btn.classList.add('active');
        }
    });

    // 7. Render the cards
    renderSkills();
};


// 5. EVENT LISTENERS

// Function to handle filter clicks
const filterSkills = (selectedCategory) => {
    activeCategory = selectedCategory;
    updateUI(); // Tell the function to update everything
};

// Function to handle sort changes
const handleSortChange = () => {
    activeSort = sortSelect.value;
    updateUI(); // Tell the function to update everything
};

// Listen for the 'change' event on the select dropdown
sortSelect.addEventListener("change", handleSortChange);

// Start the page
renderFilters();
updateUI(); // Initial render