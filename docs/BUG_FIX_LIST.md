# Bug Fix List

This document summarizes bugs found during a codebase scan and suggests concrete fixes.

## Critical

1. **Win condition is inconsistent with board size**
   - **Problem:** The game declares victory at box `50`, but the board clearly renders up to `100` (including `.box-100` as the end box).
   - **Impact:** Players can win halfway through the board, breaking gameplay rules.
   - **Suggested fix:** Set `state.endBox = 100` and validate all related movement logic against the full board.

2. **State is duplicated every time a new game starts**
   - **Problem:** `startDontGetMad()` always appends two new `Player` instances via `push()` and never clears previous players.
   - **Impact:** Re-starting can keep stale state in memory and produce unpredictable behavior over time.
   - **Suggested fix:** Reset `state.players` before creating new players (e.g., `state.players = [new Player(), new Player()]`) and reset all per-game state consistently.

## High

3. **Model/UI position mismatch after answering question correctly**
   - **Problem:** On correct answers, the code calls `increasePosition()` but does not render a matching board movement.
   - **Impact:** Internal position and visible token position can diverge, causing confusing jumps and incorrect collision/logic behavior.
   - **Suggested fix:** Add a dedicated render step when applying the post-question move so model and DOM stay in sync.

4. **Bonus jump updates model without immediate board render**
   - **Problem:** Landing on bonus boxes (`14`, `39`, `64`) increases player position by 11 in the model, but the UI update is deferred/incomplete.
   - **Impact:** Users may see token placement lag behind actual game state, then jump unexpectedly on a later turn.
   - **Suggested fix:** Animate or instantly render the bonus move right after applying it; avoid delaying icon cleanup to the next roll.

## Medium

5. **Question checkpoints are partly unreachable under current logic**
   - **Problem:** Question boxes include `82`, while current win condition is `50`.
   - **Impact:** Part of question content is effectively dead and never used.
   - **Suggested fix:** Align `endBox` and checkpoint definitions so all configured checkpoints can be reached.

6. **Unused/empty controller module**
   - **Problem:** `src/js/controller/dontGetMad.js` exists but has no implementation.
   - **Impact:** Increases maintenance cost and confuses project structure.
   - **Suggested fix:** Either remove the file or move controller logic into it and import from `index.js`.

## Low

7. **Production logging left in gameplay path**
   - **Problem:** `console.log` statements remain in answer and question flow.
   - **Impact:** Noisy console output in production and harder debugging signal-to-noise.
   - **Suggested fix:** Remove logs or gate behind development-only checks.

8. **Minor dead code / unused parameters**
   - **Problem:** `renderPlayerMovement(i, position, playerState)` accepts `i` but does not use it.
   - **Impact:** Small readability issue.
   - **Suggested fix:** Remove unused parameter and update call sites.

---

## Suggested Fix Order

1. Fix win condition + start-state reset.
2. Fix model/UI synchronization (question movement + bonus movement).
3. Reconcile checkpoints with board path and end condition.
4. Cleanup architecture and low-priority code hygiene issues.
