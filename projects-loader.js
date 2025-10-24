// List of project folders
const projectFolders = [
    'amazon-clone',
    'netflix-clone'
];

// Function to load and display projects
async function loadProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    
    if (!projectsContainer) return;
    
    // Clear existing content
    projectsContainer.innerHTML = '';
    
    // Load each project
    for (const folder of projectFolders) {
        try {
            const response = await fetch(`projects/${folder}/project.json`);
            const project = await response.json();
            
            // Create project card
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        } catch (error) {
            console.error(`Error loading project ${folder}:`, error);
        }
    }
}

// Function to create a project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Determine if cover is image or video
    const coverExtension = project.coverImage.split('.').pop().toLowerCase();
    const isVideo = ['mp4', 'webm', 'ogg'].includes(coverExtension);
    
    let coverHTML;
    if (isVideo) {
        coverHTML = `
            <video autoplay loop muted playsinline>
                <source src="${project.coverImage}" type="video/${coverExtension}">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        coverHTML = `<img src="${project.coverImage}" alt="${project.title}">`;
    }
    
    // Build buttons HTML
    let buttonsHTML = '';
    
    // Add Live Demo button only if website link exists
    if (project.links.website && project.links.website.trim() !== '') {
        buttonsHTML += `<a href="${project.links.website}" target="_blank" class="btn btn-demo">Live Demo</a>`;
    }
    
    // Add View Code button
    if (project.links.github && project.links.github.trim() !== '') {
        buttonsHTML += `<a href="${project.links.github}" target="_blank" class="btn btn-primary">View Code</a>`;
    }
    
    // Add LinkedIn Post button
    if (project.links.linkedin && project.links.linkedin.trim() !== '') {
        buttonsHTML += `<a href="${project.links.linkedin}" target="_blank" class="btn btn-linkedin">LinkedIn Post</a>`;
    }
    
    card.innerHTML = `
        <div class="project-image">
            ${coverHTML}
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                ${buttonsHTML}
            </div>
        </div>
    `;
    
    return card;
}

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', loadProjects);
