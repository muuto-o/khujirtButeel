# Future Feature Milestones & Tasks

This roadmap converts planned enhancements into actionable milestones and implementation tasks for **Та битгий уурлаарай (Don’t Get Mad)**.

## Milestone 1 — Core Gameplay Expansion (v1.1)
**Goal:** Add replay variety while keeping the current two-player local experience stable.

### Tasks
- [ ] Add configurable game length presets (short/standard/long).
- [ ] Add optional quick-match mode with fewer question checkpoints.
- [ ] Implement penalty tile behavior (move backward by configurable amount).
- [ ] Implement teleport tiles with fixed source/target mapping.
- [ ] Implement shield tiles with one-time penalty immunity.
- [ ] Add configuration constants for tile rules in one shared module.
- [ ] Update UI hints/legend so players can understand each tile type.
- [ ] Add gameplay validation tests for each new tile behavior.

### Exit criteria
- [ ] A game can start in at least 2 different board-length modes.
- [ ] New tile effects are visible, deterministic, and tested.
- [ ] Existing win/restart flow remains unchanged.

## Milestone 2 — Quiz & Scoring System (v1.2)
**Goal:** Improve educational value and progression feedback.

### Tasks
- [ ] Expand question bank size and split by category.
- [ ] Add question difficulty metadata (beginner/intermediate/advanced).
- [ ] Move questions into external JSON data files.
- [ ] Add score model (correct, incorrect, streak, total points).
- [ ] Add bonus points for fast answers (time-based multiplier).
- [ ] Display live score panel during gameplay.
- [ ] Display end-game summary (accuracy, streak, checkpoints passed).
- [ ] Add tests for answer validation and scoring rules.

### Exit criteria
- [ ] Questions are loaded from external data files, not hardcoded only.
- [ ] Score changes correctly on both right and wrong answers.
- [ ] End-game summary appears for both players.

## Milestone 3 — UX, Accessibility, and Localization (v1.3)
**Goal:** Make the game easier to use, more inclusive, and language-ready.

### Tasks
- [ ] Add settings panel (sound toggle, animation speed).
- [ ] Add theme switcher (light/dark/high-contrast).
- [ ] Add complete keyboard navigation for all controls and modals.
- [ ] Add ARIA labels/roles to key interactive elements.
- [ ] Improve color contrast for answer feedback and overlays.
- [ ] Externalize all user-facing strings into locale files.
- [ ] Add language toggle (Mongolian/English).
- [ ] Add accessibility and locale regression checks.

### Exit criteria
- [ ] Game is playable without mouse input.
- [ ] Language can be switched at runtime.
- [ ] UI remains readable in high-contrast theme.

## Milestone 4 — Progress Persistence & Replayability (v1.4)
**Goal:** Encourage repeat play and long-term engagement.

### Tasks
- [ ] Add player profile data model (name, avatar, stats).
- [ ] Save player profile and history using localStorage.
- [ ] Add achievements (wins, streaks, perfect quiz checkpoints).
- [ ] Add save/resume for unfinished game sessions.
- [ ] Add profile selection/start flow in the start menu.
- [ ] Add “recent matches” panel with outcomes.
- [ ] Add data migration/versioning strategy for saved schema.
- [ ] Add tests for persistence and restore behavior.

### Exit criteria
- [ ] A player can quit and resume a game later on the same browser.
- [ ] Historical wins/losses persist between sessions.
- [ ] At least 5 achievements are unlockable in normal play.

## Milestone 5 — Engineering Quality & Performance (v1.5)
**Goal:** Improve maintainability and reliability as features grow.

### Tasks
- [ ] Refactor game-state updates into dedicated state utilities.
- [ ] Reduce direct DOM mutations by centralizing render updates.
- [ ] Add unit tests for core model logic.
- [ ] Add integration tests for full turn lifecycle.
- [ ] Add UI smoke test for start -> play -> quiz -> winner flow.
- [ ] Add lightweight debug logging behind a feature flag.
- [ ] Profile and optimize expensive DOM update paths.
- [ ] Document coding/testing standards in `docs/`.

### Exit criteria
- [ ] Core logic has meaningful automated coverage.
- [ ] Main gameplay flow has at least one passing integration test.
- [ ] Performance bottlenecks are measured and reduced.

## Milestone 6 — Stretch Goals (Backlog)
**Goal:** Explore larger-scope features after core roadmap completion.

### Tasks
- [ ] Prototype online multiplayer architecture (WebSocket-based).
- [ ] Add spectator mode for live matches.
- [ ] Add cosmetic skins/themes for boards and tokens.
- [ ] Evaluate anti-cheat/state-sync requirements for online mode.
- [ ] Draft deployment plan for hosted multiplayer services.

### Exit criteria
- [ ] Technical feasibility is validated through at least one prototype.
- [ ] Scope and cost are documented before implementation.

## Suggested Delivery Order
1. Milestone 1 -> 2 -> 3 -> 4 -> 5.
2. Milestone 6 only after milestone 5 quality targets are met.

## Notes
- Task checkboxes are intended for issue tracking and sprint planning.
- Milestone versions are placeholders and can be adjusted based on team capacity.
