# Projects Structure

This folder contains all your portfolio projects. Each project has its own folder with the following structure:

## Folder Structure

```
projects/
├── netflix-clone/
│   ├── project.json       # Project metadata and links
│   ├── cover.jpg/mp4      # Cover image or video
│   └── README.md          # Instructions
├── hand-gesture-controller/
│   ├── project.json
│   ├── cover.jpg/mp4
│   └── README.md
└── README.md              # This file
```

## Adding a New Project

1. Create a new folder with your project name (use kebab-case, e.g., `my-awesome-project`)
2. Add a `project.json` file with the following structure:

```json
{
  "title": "Project Title",
  "description": "Brief description of your project",
  "coverImage": "projects/your-project-folder/cover.jpg",
  "links": {
    "website": "https://your-live-demo-url.com",
    "github": "https://github.com/username/repo",
    "linkedin": "https://linkedin.com/posts/your-post-url"
  }
}
```

3. Add your cover image or video (name it `cover.jpg`, `cover.png`, `cover.mp4`, etc.)
4. Update `projects-loader.js` in the root folder to include your new project folder name

## Field Descriptions

### project.json fields:

- **title**: The name of your project (displayed as heading)
- **description**: A short description of what the project does
- **coverImage**: Relative path to your cover image/video
- **links.website**: Live demo URL (leave empty `""` if no live demo - button won't appear)
- **links.github**: GitHub repository URL (leave empty `""` if no repo)
- **links.linkedin**: LinkedIn post URL (leave empty `""` if no post)

## Supported Media Formats

### Images:

- .jpg / .jpeg
- .png
- .gif
- .webp

### Videos:

- .mp4 (recommended)
- .webm
- .ogg

**Recommended dimensions**: 1200x800px or 16:9 aspect ratio

## Example: Adding "Calculator App" Project

1. Create folder: `projects/calculator-app/`
2. Create `project.json`:

```json
{
  "title": "Calculator App",
  "description": "A modern calculator built with JavaScript",
  "coverImage": "projects/calculator-app/cover.jpg",
  "links": {
    "website": "https://mysite.com/calculator",
    "github": "https://github.com/userabhijit/calculator",
    "linkedin": ""
  }
}
```

3. Add `cover.jpg` to the folder
4. Edit `projects-loader.js` and add `'calculator-app'` to the `projectFolders` array:

```javascript
const projectFolders = [
  "netflix-clone",
  "hand-gesture-controller",
  "calculator-app", // Add this line
];
```

That's it! Your new project will automatically appear on your portfolio website.
