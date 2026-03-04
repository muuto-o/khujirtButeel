# Feature List

This document summarizes the currently implemented features in the codebase.

## Core gameplay
- **Two-player turn-based board game** (“Та битгий уурлаарай”) with separate dice controls for each player.
- **Dice-based movement**: players roll a six-sided die and move step-by-step with animation.
- **Alternating turns**: only one player can roll at a time; controls are enabled/disabled automatically.
- **Win condition**: the first player to reach the configured end tile is shown a winner modal with a retry action.

## Board mechanics
- **Question checkpoints** at specific board positions: `7`, `32`, `57`, `82`.
- **Bonus/skip tiles** at positions: `14`, `39`, `64`; landing on one advances the player by `11` extra spaces.
- **Start positioning**: both players begin on the start tile.

## Quiz mechanics
- **Question modal flow**: landing on a question checkpoint shows an overlay with one random question.
- **Multiple-choice answers**: each question has four options (`A`–`D`).
- **Answer validation**:
  - Correct answer highlights green, marks that checkpoint as passed for that player, closes modal, and advances the player by one tile.
  - Incorrect answer highlights red, closes modal, and does not grant the extra step.
- **Per-player progress tracking**: each player tracks which question checkpoints they have already passed.

## UI/UX features
- **Game state transitions**: start menu -> game board -> question/winner overlays.
- **Dice animation**: rolling adds a shake effect and updates the dice face image.
- **Board token rendering**: player icons are moved between numbered board cells via class updates.
- **Visual dim/filter state** while question or winner overlays are open.

## Content and assets
- **Built-in question bank** with 10 Mongolian-language trivia questions.
- **Bundled static assets** for dice faces and player icons.

## Build and run support
- **Webpack-based workflow** with scripts for development build, production build, and dev server.
- **Babel transpilation** configured via `babel-loader` and `@babel/preset-env`.
