// List of project folders
const projectFolders = [
    'amazon-clone',
    'netflix-clone'
];

// Function to load and display projects
async function loadProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }
    
    // Clear existing content
    projectsContainer.innerHTML = '';
    
    // Load each project
    for (const folder of projectFolders) {
        try {
            const response = await fetch(`projects/${folder}/project.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const project = await response.json();
            
            // Validate project data
            if (!project.title || !project.coverImage) {
                throw new Error('Invalid project data: missing required fields');
            }
            
            // Create project card
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        } catch (error) {
            console.error(`Error loading project ${folder}:`, error);
            // Create error card to show which project failed
            const errorCard = document.createElement('div');
            errorCard.className = 'project-card';
            errorCard.innerHTML = `
                <div class="project-content">
                    <h3>Error Loading Project</h3>
                    <p>Failed to load ${folder}. Check console for details.</p>
                </div>
            `;
            projectsContainer.appendChild(errorCard);
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
        coverHTML = `<img src="${project.coverImage}" alt="${project.title}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImage not found%3C/text%3E%3C/svg%3E'">`;
    }
    
    // Build buttons HTML
    let buttonsHTML = '';
    
    // Add Live Demo button only if website link exists
    if (project.links.website && project.links.website.trim() !== '') {
        buttonsHTML += `<a href="${project.links.website}" target="_blank" rel="noopener noreferrer" class="btn btn-demo">Live Demo</a>`;
    }
    
    // Add View Code button
    if (project.links.github && project.links.github.trim() !== '') {
        buttonsHTML += `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Code</a>`;
    }
    
    // Add LinkedIn Post button
    if (project.links.linkedin && project.links.linkedin.trim() !== '') {
        buttonsHTML += `<a href="${project.links.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-linkedin">LinkedIn Post</a>`;
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
