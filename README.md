# Та битгий уурлаарай (Don’t Get Mad)

A two-player browser board game built with JavaScript and bundled with Webpack.

## Features

- Turn-based two-player gameplay with animated dice rolls
- Question checkpoints with multiple-choice quiz modals
- Bonus tiles that move players forward
- Winner modal and restart flow
- Mongolian-language question bank and bundled image assets

For a detailed list, see [`docs/FEATURE_LIST.md`](docs/FEATURE_LIST.md).

Planned milestones and implementation tasks are tracked in [`docs/FUTURE_FEATURE_LIST.md`](docs/FUTURE_FEATURE_LIST.md).

## Tech Stack

- JavaScript (ES6 modules)
- Webpack + webpack-dev-server
- Babel (`@babel/preset-env`)

## Project Structure

- `src/` – source code (HTML, CSS, JS, and assets)
- `docs/` – project documentation and static assets mirror
- `webpack.config.js` – bundling and dev-server configuration

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install dependencies

```bash
npm install
```

### Run development build

```bash
npm run dev
```

### Run dev server

```bash
npm start
```

### Create production build

```bash
npm run build
```

## Available Scripts

- `npm run dev` – creates a development bundle
- `npm run build` – creates a production bundle
- `npm start` – starts webpack dev server and opens the app

## Notes

- The default `npm test` script is not implemented in this project.
- Quiz, board, and UI logic are organized under `src/js/` using MVC-like folders (`model`, `view`, `controller`).
