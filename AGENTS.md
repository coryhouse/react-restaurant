This is React a restaurant management app.

For frontend tasks, see /frontend/AGENTS.md
For backend tasks, see /backend/AGENTS.md

## Output Formatting

In responses, sacrifice grammar for concision.

## Long-term Memory

Use LEARNINGS.md as external memory for durable, reusable guidance. Review it before starting new tasks.

Write to LEARNINGS.md only when at least one applies:
- A repeated preference/workflow style I stated (formatting, process, tooling).
- A mistake you made and corrective rule to prevent repeat.
- A project-specific insight likely to matter in future tasks.

Do NOT write to LEARNINGS.md for:
- One-off factual Q&A responses.
- Routine explanations with no new preference/rule.
- Temporary context that won’t help future turns.

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
