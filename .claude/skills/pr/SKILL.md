---
name: pr
description: Commits changes, pushes to remote, and creates a pull request with a focused summary. Creates a regular PR by default, or a draft PR if "draft" argument is provided. Use when the user asks to create a PR, open a pull request, or mentions "pr".
user-invocable: true
---

# PR

Commit all changes, push to remote, and create a pull request with a focused, intent-driven summary.

## Quick Start

When invoked, this skill will:

1. Analyze changed files to understand the intent
2. Create a new branch if currently on main
3. Create a commit following the repository's style
4. Push the branch to remote
5. Open a PR with a concise, meaningful description

**Arguments:**
- No argument (default): Creates a regular PR ready for review
- `draft`: Creates a draft PR (e.g., `/pr draft`)

## Instructions

Follow these steps in order:

### 1. Understand the Changes

Run these commands in parallel:

```bash
git status
git diff
git log -5 --oneline
```

Analyze the output to understand:

- What files changed
- The nature of the changes (feature, fix, refactor, etc.)
- The repository's commit message style

### 2. Create Branch (if on main)

Check if currently on the main branch. If so, create a new branch with a descriptive name based on the changes:

```bash
git rev-parse --abbrev-ref HEAD
```

If the output is `main` or `master`, create a new branch:

```bash
git checkout -b descriptive-branch-name
```

Branch naming guidelines:
- Use kebab-case (lowercase with hyphens)
- Be descriptive but concise (2-4 words)
- Examples: `add-avatar-upload`, `fix-duplicate-submissions`, `refactor-date-utils`

### 3. Create Commit

Stage relevant files and create a commit:

- Follow the repository's commit message style from git log
- Write a concise message focused on the "why", not the "what"

Example:

```bash
git add src/components/Button.tsx src/components/Button.test.tsx
git commit -m "$(cat <<'EOF'
Add loading state to Button component
EOF
)"
```

### 4. Push to Remote

Push the current branch with upstream tracking:

```bash
git push -u origin HEAD
```

### 5. Create PR

Use gh CLI to create a PR with a focused description.

**Default (regular PR):**
```bash
gh pr create --title "Brief, clear title" --body "$(cat <<'EOF'
## Problem / Intent

[1-2 sentences explaining WHY this change exists - the problem being solved or feature being added]

## Approach

[1-3 sentences describing the HIGH-LEVEL concept of the solution - NOT a list of file changes]
EOF
)"
```

**With "draft" argument:**
If the user passes "draft" as an argument (e.g., `/pr draft`), add the `--draft` flag:
```bash
gh pr create --draft --title "Brief, clear title" --body "$(cat <<'EOF'
## Problem / Intent

[1-2 sentences explaining WHY this change exists - the problem being solved or feature being added]

## Approach

[1-3 sentences describing the HIGH-LEVEL concept of the solution - NOT a list of file changes]
EOF
)"
```

## PR Content Guidelines

### Title

- Keep it succinct and clear (under 60 characters)
- Use sentence case
- Only use "fix:" prefix for bug fixes
- Do NOT use "feat:", "chore:", or other prefixes for features

**Good titles:**

- "Add loading state to Button component"
- "fix: Prevent race condition in user login"
- "Improve error handling in API client"

**Bad titles:**

- "feat: Add new button component"
- "Update files"
- "WIP changes"

### Body Structure

The PR body should have exactly two sections:

**Problem / Intent** - Answer "why does this change exist?"

- Focus on the user problem or business need
- Explain the gap being filled
- Keep it to 1-2 sentences

**Approach** - Answer "what's the high-level solution?"

- Describe the conceptual approach, not implementation details
- Explain key architectural decisions if relevant
- Keep it to 1-3 sentences

### What NOT to Include

- ❌ List of files modified
- ❌ Summary of code changes
- ❌ Test plan with checkboxes
- ❌ "Generated with Claude Code" footer
- ❌ Detailed implementation notes
- ❌ Line-by-line change descriptions

## Examples

**Example 1: Feature Addition**

Title: "Add user avatar upload"

Body:

```markdown
## Problem / Intent

Users need a way to personalize their profiles with custom avatars instead of using the default placeholder image.

## Approach

Add a file upload component to the profile settings page that handles image validation, resizing, and upload to S3. The component provides immediate visual feedback and gracefully handles upload failures.
```

**Example 2: Bug Fix**

Title: "fix: Prevent duplicate form submissions"

Body:

```markdown
## Problem / Intent

Users could accidentally submit forms multiple times by clicking the submit button repeatedly, leading to duplicate orders in the system.

## Approach

Disable the submit button immediately on click and re-enable it only after the request completes or fails. The button shows a loading state to provide clear feedback to the user.
```

**Example 3: Refactor**

Title: "Extract reusable date formatting utilities"

Body:

```markdown
## Problem / Intent

Date formatting logic was duplicated across multiple components, making it hard to maintain consistent formatting and timezone handling.

## Approach

Create a centralized date utilities module with functions for common formatting patterns. Components now import these utilities instead of implementing their own formatting logic.
```

## Error Handling

If any step fails:

- Don't automatically retry without understanding the error
- Check for common issues (uncommitted changes, network problems, gh CLI not installed)
- Ask the user for guidance if the issue is unclear

## Guidelines

- Always use HEREDOC syntax for multi-line commit messages and PR bodies
- Preserve the exact formatting shown in the examples
- Focus on intent and approach, not implementation details
- Keep both PR sections concise - 1-3 sentences each
- Let the code diff speak for itself - don't summarize file changes
- Create regular PRs by default; only create draft PRs when user specifies "draft" argument
