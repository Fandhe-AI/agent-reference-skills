# Playwright Test Agents

Playwright Test Agents are AI-powered agents that automatically generate and maintain end-to-end tests. Three agents work independently or sequentially: the Planner explores the application, the Generator writes test code, and the Healer repairs failing tests.

## Overview

| Agent | Input | Output |
| --- | --- | --- |
| **Planner** | User request + seed test + optional PRD | Markdown test plan in `specs/` |
| **Generator** | Markdown plan from `specs/` | Playwright test files in `tests/` |
| **Healer** | Failing test name | Passing test (or skipped if broken) |

## Initialization

Initialize agents with the `init-agents` command, specifying your AI coding tool:

```bash
# For VS Code Copilot
npx playwright init-agents --loop=vscode

# For Claude Code
npx playwright init-agents --loop=claude

# For OpenCode
npx playwright init-agents --loop=opencode
```

Requirements:

- VS Code v1.105+ (October 2025) for VS Code loop.
- Agent definitions are regenerated whenever Playwright updates to access new tools and instructions.

## Project Structure

After initialization, the project is organized as follows:

```text
repo/
  .github/                              # Agent definitions and MCP tool configs
  specs/
    basic-operations.md                 # Human-readable test plans
  tests/
    seed.spec.ts                        # Environment setup (seed) test
    tests/create/add-valid-todo.spec.ts # Generated test files
  playwright.config.ts
```

Key directories:

- **`.github/`** -- agent definitions (instructions and MCP tools provided by Playwright).
- **`specs/`** -- structured, human-readable test plans written by the Planner.
- **`tests/`** -- generated Playwright tests, one-to-one with spec entries.

## Seed Tests

A seed test establishes the starting environment for all generated tests. It sets up the page context, authentication, fixtures, and any prerequisite state.

```typescript
import { test, expect } from "./fixtures";

test("seed", async ({ page }) => {
  // Navigate to the app entry point
  await page.goto("/");

  // Perform any setup (login, data seeding, etc.)
  await page.getByRole("textbox", { name: "Username" }).fill("testuser");
  await page.getByRole("textbox", { name: "Password" }).fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Verify setup succeeded
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
```

The seed test:

- Uses custom fixtures from `./fixtures` for reusable setup logic.
- Provides the ready-to-use page context that all generated tests will build upon.
- Must pass before the Generator or Healer can work.

## The Planner Agent

The Planner explores the application and produces a Markdown test plan.

### Inputs

- A clear user request (e.g., "Generate a plan for the guest checkout flow").
- The seed test establishing the application environment.
- Optionally, a Product Requirement Document (PRD) for domain context.

### Output

A structured Markdown file saved in `specs/`:

```markdown
# Application Test Plan

## Test Scenarios

### 1. Adding New Todos

**Seed:** `tests/seed.spec.ts`

#### 1.1 Add Valid Todo

**Steps:**

1. Click the input field
2. Type "Buy groceries"
3. Press Enter

**Expected Results:**

- Todo item appears in the list with unchecked checkbox
- Todo text reads "Buy groceries"
- Counter shows "1 item left"
- Input field is cleared

#### 1.2 Add Empty Todo

**Steps:**

1. Click the input field
2. Press Enter without typing

**Expected Results:**

- No new todo item is created
- Counter remains unchanged
```

Each scenario includes steps, expected results, and a reference to the seed test.

## The Generator Agent

The Generator reads Markdown plans from `specs/` and produces executable Playwright test files.

### How It Works

1. Reads a spec file from `specs/`.
2. Runs the seed test to establish the page context.
3. Performs each scenario's steps in a live browser, verifying selectors and assertions.
4. Writes test files to `tests/`, organized by feature.

### Generated Test Example

```typescript
// spec: specs/basic-operations.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";

test.describe("Adding New Todos", () => {
  test("Add Valid Todo", async ({ page }) => {
    const todoInput = page.getByRole("textbox", {
      name: "What needs to be done?",
    });
    await todoInput.click();
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");

    await expect(page.getByText("Buy groceries")).toBeVisible();
    const todoCheckbox = page.getByRole("checkbox", {
      name: "Toggle Todo",
    });
    await expect(todoCheckbox).not.toBeChecked();
    await expect(page.getByText("1 item left")).toBeVisible();
    await expect(todoInput).toHaveValue("");
  });
});
```

Features:

- The `// spec:` and `// seed:` comments link generated tests back to their source plan.
- The Generator supports generation hints and assertion catalogs for complex scenarios.
- Initial test output may contain errors that the Healer will fix.

## The Healer Agent

The Healer takes failing tests and automatically repairs them.

### Repair Process

1. Runs the failing test to reproduce the error.
2. Inspects the current UI state at the point of failure.
3. Identifies the cause (changed locator, missing wait, stale data).
4. Applies a patch (updates locators, adds wait conditions, adjusts test data).
5. Re-runs the test to verify the fix.
6. Repeats until the test passes or guardrails prevent further iterations.

### Inputs

A failing test name or file path.

### Outputs

- A **passing test** with minimal changes to fix the failure.
- A **skipped test** if the underlying application functionality appears broken (not a test issue).

## Agentic Loop

The three agents work together in a sequential loop to build comprehensive test coverage:

1. **Planner** -- the user provides a request, and the Planner generates a structured test plan.
2. **Generator** -- reads the plan and produces test code, verifying against the live application.
3. **Healer** -- runs the generated tests and repairs any failures.

This loop can be driven by your AI coding tool (VS Code Copilot, Claude Code, OpenCode). The user triggers the workflow, and the agents orchestrate automatically.

```text
User Request
    |
    v
 Planner  -->  specs/feature.md
    |
    v
 Generator  -->  tests/feature/scenario.spec.ts
    |
    v
 Healer  -->  Passing tests (or skipped if app is broken)
```

## Agent Definitions

Agent definitions are collections of instructions and MCP tools provided by Playwright. They are stored in `.github/` and regenerated when Playwright is updated.

- Do not manually edit agent definitions -- they are managed by `init-agents`.
- Re-run `npx playwright init-agents --loop=<tool>` after updating Playwright to get the latest agent capabilities.
