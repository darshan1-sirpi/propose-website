# Proposal Website

A playful React app that asks a proposal-style question with interactive buttons, animated celebration effects, and a surprise horror-style overlay.

Built with React + Vite for fast development and easy deployment.

## Features

- Interactive proposal card UI
- Moving "No" button that avoids being clicked
- "Yes" flow with:
	- typed roast-text animation
	- confetti-style visual effect
	- dancing panda GIF
- Fallback media picker if the default GIF is missing
- Timed scary overlay with sound effect
- Responsive layout for desktop and mobile

## Tech Stack

- React 19
- Vite 8
- Plain CSS (custom animations + responsive styles)
- ESLint 9

## Project Structure

```text
propsal-website/
	public/
		ghost.mp3
		panda_dance.gif
		scary.gif
	src/
		App.jsx
		App.css
		main.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm (comes with Node.js)

### Installation

```bash
npm install
```

[O### Run in Development

```bash
npm run dev
```

Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production files into `dist/`
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint checks

## Customization

You can easily personalize this project before sharing:

- Update question text, messages, and button labels in `src/App.jsx`
- Change colors, spacing, and animations in `src/App.css`
- Replace media files in `public/`:
	- `panda_dance.gif`
	- `scary.gif`
	- `ghost.mp3`

## Build for Production

```bash
npm run build
```

The optimized output is generated in `dist/`, ready for deployment on platforms like Vercel, Netlify, or GitHub Pages.

## Deployment Notes

- For Vercel/Netlify, use:
	- Build command: `npm run build`
	- Output directory: `dist`
- Make sure static files in `public/` are included in your repo.






