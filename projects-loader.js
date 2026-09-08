// List of project folders
const projectFolders = ["bullsy"];

// Function to load and display projects
async function loadProjects() {
  const projectsContainer = document.querySelector(".projects-container");

  if (!projectsContainer) {
    console.error("Projects container not found");
    return;
  }

  // Clear existing content
  projectsContainer.innerHTML = "";

  // Load each project
  for (const folder of projectFolders) {
    try {
      const response = await fetch(`projects/${folder}/project.json`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const project = await response.json();

      // Validate project data
      if (!project.title) {
        throw new Error("Invalid project data: missing required fields");
      }

      // Create project card
      const projectCard = createProjectCard(project);
      projectsContainer.appendChild(projectCard);
    } catch (error) {
      console.error(`Error loading project ${folder}:`, error);
      // Create error card to show which project failed
      const errorCard = document.createElement("div");
      errorCard.className = "project-card";
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
  const card = document.createElement("div");
  card.className = "project-card";

  // Build buttons HTML
  let buttonsHTML = "";

  // Add Live Demo button only if website link exists
  if (project.links.website && project.links.website.trim() !== "") {
    buttonsHTML += `<a href="${project.links.website}" target="_blank" rel="noopener noreferrer" class="btn btn-demo">Live Demo</a>`;
  }

  // Add View Code button
  if (project.links.github && project.links.github.trim() !== "") {
    buttonsHTML += `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Code</a>`;
  }

  // Add LinkedIn Post button
  if (project.links.linkedin && project.links.linkedin.trim() !== "") {
    buttonsHTML += `<a href="${project.links.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-linkedin">LinkedIn Post</a>`;
  }

  card.innerHTML = `
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                ${buttonsHTML}
            </div>
        </div>
    `;

  // Make the entire card clickable, except for the link buttons
  card.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");

    // If the click is on any other button, don't redirect to project.html
    if (btn) return;

    // Otherwise redirect
    window.location.href = `project.html?id=${folder}`;
  });

  return card;
}

// Load projects when DOM is ready
document.addEventListener("DOMContentLoaded", loadProjects);
