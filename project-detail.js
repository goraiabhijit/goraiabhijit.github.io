// Get the project ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

const container = document.getElementById('project-container');

async function loadProjectDetails() {
  if (!projectId) {
    showError("No project ID specified in the URL.");
    return;
  }

  try {
    // 1. Fetch project.json
    const jsonResponse = await fetch(`projects/${projectId}/project.json`);
    if (!jsonResponse.ok) throw new Error("Could not find project data.");
    const project = await jsonResponse.json();

    // 2. Fetch details.md (graceful failure if it doesn't exist)
    let markdownContent = "*No detailed description available yet.*";
    try {
      const mdResponse = await fetch(`projects/${projectId}/details.md`);
      if (mdResponse.ok) {
        markdownContent = await mdResponse.text();
      }
    } catch (e) {
      console.warn("Markdown details not found, using placeholder.");
    }

    // Parse Markdown to HTML
    const htmlContent = marked.parse(markdownContent);

    // Build the buttons HTML
    let buttonsHTML = "";
    if (project.links.website && project.links.website.trim() !== "") {
      buttonsHTML += `<a href="${project.links.website}" target="_blank" rel="noopener noreferrer" class="btn btn-demo">Live Demo</a>`;
    }
    if (project.links.github && project.links.github.trim() !== "") {
      buttonsHTML += `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Code</a>`;
    }
    if (project.links.linkedin && project.links.linkedin.trim() !== "") {
      buttonsHTML += `<a href="${project.links.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-linkedin">LinkedIn Post</a>`;
    }

    // Determine cover media
    const coverExtension = project.coverImage.split('.').pop().toLowerCase();
    const isVideo = ['mp4', 'webm', 'ogg'].includes(coverExtension);
    let coverHTML = '';
    if (isVideo) {
      coverHTML = `<video class="project-cover" autoplay loop muted playsinline>
                    <source src="${project.coverImage}" type="video/${coverExtension}">
                   </video>`;
    } else {
      coverHTML = `<img class="project-cover" src="${project.coverImage}" alt="${project.title}">`;
    }

    // Render the final page
    container.innerHTML = `
      <a href="index.html#projects" class="back-btn">&larr; Back to Projects</a>
      <div class="project-header">
        <h1 class="project-title">${project.title}</h1>
        <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.1rem;">${project.description}</p>
        <div class="project-meta project-links" style="justify-content: center;">
          ${buttonsHTML}
        </div>
      </div>
      
      ${coverHTML}

      <div class="project-content">
        ${htmlContent}
      </div>
    `;

    // Make sure dynamically loaded buttons styling stays consistent
    document.querySelectorAll('.project-meta .btn').forEach(btn => {
      btn.style.border = "1px solid #333";
      btn.style.backgroundColor = "#1a1a1a";
      btn.style.color = "#dedede";
      btn.style.padding = "0.75rem 1.5rem";
      btn.style.fontSize = "0.95rem";
    });

  } catch (error) {
    console.error(error);
    showError(error.message);
  }
}

function showError(message) {
  container.innerHTML = `
    <a href="index.html#projects" class="back-btn">&larr; Back to Projects</a>
    <div style="text-align:center; padding: 4rem;">
      <h2 style="color:var(--text-main); margin-bottom:1rem;">Error Loading Project</h2>
      <p style="color:var(--text-muted);">${message}</p>
    </div>
  `;
}

// Initialize
document.addEventListener('DOMContentLoaded', loadProjectDetails);
