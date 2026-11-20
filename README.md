# Ssempala Harrison Solomon, Portfolio v5

A responsive personal portfolio built with React, Vite, Three.js, and Lucide icons. A dark stage with a 3D sensor grid hero, a floating nav, a pinned scroll story, a phone product view, a filterable project list, and a globe footer centred on Kampala.

## Structure

- `src/data.js`: projects, capabilities, story chapters, and contact details. Edit content here.
- `src/three/sensorGrid.js`: the hero scene (a grid of points moved by a vertex shader).
- `src/three/globe.js`: the footer globe.
- `src/components/`: one file per section (Hero, Story, Product, Work, About, Contact) plus FloatingNav, CursorRing, and Reveal.
- `src/styles.css`: all styling, with colours and fonts defined as variables at the top.

The 3D code loads on demand, so the text appears before Three.js arrives. If WebGL is unavailable the page still works without the 3D scenes.

## Run locally

1. Extract this folder.
2. Open the folder in VS Code (the folder that contains `package.json`).
3. In the VS Code terminal run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL Vite prints in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Personal details included

- Email: ssempa3666@gmail.com
- Phone: +256 750 937 488
- GitHub: https://github.com/harrison-maps
- LinkedIn: https://www.linkedin.com/in/ssempala-undefined-a829813a7

## Images

- `public/harrison-portrait.webp`: portrait used in the about section.
- `public/harrison-editorial.webp`: social share image (Open Graph).

## Project accuracy

Public repositories are linked directly where verified: `fire_project`, `fire_incident_prediction`, and `aibos_todo_app`. MamaSave, SimplyBridge, and the livestock risk predictor are presented as prototypes or project work without inventing repository URLs. Project status and model validation notes are deliberately conservative.

## Before deployment

Review your LinkedIn profile URL to make sure it is the public profile address you want recruiters to use. Then deploy the project to Vercel or another static hosting service.
