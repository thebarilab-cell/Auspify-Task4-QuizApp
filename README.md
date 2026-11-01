# Webcraft — The Web Development Quiz

A responsive, offline-friendly quiz app built for the Auspify Technologies Web Development Internship, Task 4. It uses original multiple-choice questions about HTML, CSS, JavaScript, and web fundamentals. There is no backend or API key.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To make a production build, run `npm run build`; to preview it, run `npm run preview`.

## Play

Choose **Start the quiz**, select an answer, then use **Check answer** to see feedback and **Next question** to continue. Keyboard users can Tab through controls or select options with 1–4 / A–D. The quiz prevents unanswered questions from advancing. At the end, review each response or start a freshly shuffled attempt.

## Project structure

- `index.html` — app entry point and document metadata
- `src/main.js` — screen rendering and interaction flow
- `src/quiz.js` — question bank, shuffle, and score calculation
- `src/style.css` — responsive styles, focus states, and reduced-motion support
- `favicon.svg` — custom app icon

## Checks

`npm run check` runs JavaScript syntax checks. `npm test` runs unit tests for score calculation and question shuffling. `npm run build` creates the production bundle in `dist/`.
