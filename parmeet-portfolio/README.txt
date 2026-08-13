# Parmeet Kaur Portfolio

A responsive personal portfolio built with only:
- HTML
- CSS
- JavaScript

## Folder structure

portfolio/
├── index.html
├── style.css
├── script.js
├── images/
└── assets/

## Add your own files

Put:
- `images/profile.jpg` — home profile picture
- `images/about.jpg` — about-page image
- `assets/resume.pdf` — your CV

The site still works if these files are missing because it shows a placeholder.

## How to run

Simplest:
1. Extract the folder.
2. Open `index.html` in a browser.

Recommended:
Use VS Code + Live Server, or any simple local static server.

## What to edit

Search for `EDIT THIS` in `index.html` and `script.js`.

You should replace:
- name
- tagline
- About text
- education
- experience
- skills
- project descriptions
- project links
- blog text
- email
- LinkedIn
- GitHub
- Behance

## Theme

The website starts in dark mode. The moon/sun button switches between dark and light mode.
The selected theme is saved in localStorage.

## Navigation

Home, About, Resume, Portfolio, Blog and Contact are single-page sections with animated panel/page transitions.

## Important

The contact form does not need a backend. It opens the visitor's email application using `mailto:`. Replace `your@email.com` with your real email in both `index.html` and `script.js`.

## External dependency

The CSS imports Google Fonts (DM Sans and Playfair Display). If you want a completely offline website, remove the `@import` line and use system fonts.
