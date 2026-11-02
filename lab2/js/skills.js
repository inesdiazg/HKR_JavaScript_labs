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

// Store the current state of the skills here, starting with a copy of the original data so we don't destroy the original array
let currentSkills = [...skillsData]; 

// Function to draw the cards on the screen
const renderSkills = () => {
    
    // Use .map() to loop through the array and create an HTML string for each skill
    const cardsHTML = currentSkills.map(skill => {
        return `
            <div class="skill-card">
                <h3>${skill.name}</h3>
                <span class="category-label">${skill.category}</span>
                <p><strong>Level:</strong> ${skill.proficiency} / 5</p>
                <p><strong>Experience:</strong> ${skill.yearsExperience} years</p>
                <p class="skill-description">${skill.description}</p>
            </div>
        `;
    }).join(""); // use .join("") to turn the array of strings into one single block of HTML

    // Insert the generated HTML into the container
    skillsContainer.innerHTML = cardsHTML;
};

// Call the function once so the cards appear when the page loads
renderSkills();