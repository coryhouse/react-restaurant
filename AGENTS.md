This is React a restaurant management app.

For frontend tasks, see /frontend/AGENTS.md
For backend tasks, see /backend/AGENTS.md

## Output Formatting

In responses, sacrifice grammar for concision.

## Long-term Memory

Use LEARNINGS.md as an external memory to ensure a continuous cycle of improvement. Track your mistakes, new insights, and what I like or dislike. Automatically update this file after each interaction, and review it before starting new tasks to avoid repeating past mistakes.

## Notifications

Play terminal bell (`echo -e '\a'`) when:

- Completing a significant task
- Encountering an issue that needs user attention

## Playwright Locators

Never use `xpath` CSS selectors, or `getById`. Only use Playwright's recommended accessible locators such as `getByRole`, `getByLabel`, `getByText`, and `getByPlaceholder`. Enhance the HTML if necessary to support these locators.

## Bug Fixes: Prove It Pattern

When given a bug report, first spawn a subagent to write a test that reproduces the issue. Proceed once reproduction succeeds.

Test level hierarchy — Reproduce at the lowest level that can capture the bug:

1. **Unit test** — Pure logic bugs, isolated functions (lives next to the code)
2. **Integration test** — Component interactions, API boundaries (lives next to the code)
3. **UX spec test** — Full user flows, browser-dependent behavior (lives in `tests/`)

For every bug fix:

1. **Reproduce with subagent** — Spawn a subagent to write a test that demonstrates the bug. The test should _fail_ before the fix.
2. **Fix** — Apply the fix.
3. **Confirm** — The test now _passes_, proving the fix works.

If the bug is environment-specific or transient, document why a test isn't possible rather than skipping.
