# ARIA Snapshots

ARIA snapshots provide a YAML-based representation of a page's accessibility tree for structural validation through snapshot testing. The core assertion is `toMatchAriaSnapshot()`.

## Basic Usage

```typescript
import { test, expect } from "@playwright/test";

test("navigation structure", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page.locator("body")).toMatchAriaSnapshot(`
    - navigation:
      - link "Home"
      - link "About"
      - link "Contact"
  `);
});
```

## YAML Syntax

Each accessible element uses the format: `- role "name" [attribute=value]`

### Roles

Standard ARIA and HTML roles:

```yaml
- heading "Page Title" [level=1]
- button "Submit"
- link "Read more"
- textbox "Email"
- list:
  - listitem: "Item 1"
  - listitem: "Item 2"
- navigation
- checkbox "Remember me" [checked]
```

### Accessible Name

Use quoted strings for exact names:

```yaml
- heading "Welcome to Our Site"
- button "Sign In"
```

### Text Content

Use colon syntax for text content:

```yaml
- paragraph: This is the paragraph text
- listitem: Feature A
- text: Sample accessible name
```

Multiline text is normalized to a single line:

```yaml
- paragraph: Line 1 Line 2
```

### Attributes

Supported ARIA attributes in brackets:

```yaml
- heading "Title" [level=1]
- heading "Subtitle" [level=2]
- checkbox [checked]
- checkbox [checked=false]
- button "Toggle" [pressed=true]
- button "Menu" [expanded]
- option "Choice" [selected]
- textbox [disabled]
```

## Partial Matching (Default)

By default, matching is partial. Omit attributes or names to match flexibly:

```yaml
# Matches any button regardless of label
- button

# Matches any checkbox regardless of state
- checkbox

# Matches list containing "Feature B" among other items
- list:
  - listitem: Feature B
```

Specified children must appear in order, but additional children are allowed.

## Strict Matching with /children

Control child element matching with the `/children` directive:

```yaml
# Children must exactly match (no extras, same order)
- list:
  - /children: equal
  - listitem: Feature A
  - listitem: Feature B

# Default behavior (specified subset in order)
- list:
  - /children: contain
  - listitem: Feature A

# Exact match including all nested descendants
- list:
  - /children: deep-equal
  - listitem: Feature A
  - listitem: Feature B
```

| Mode | Behavior |
|------|----------|
| `contain` (default) | All specified children present in order; extras allowed |
| `equal` | Children exactly match the specified list in order |
| `deep-equal` | Exact match including nested children at all levels |

## Regular Expressions

Use regex for dynamic text:

```yaml
- heading /Issues \d+/
- link /View \w+ profile/
- text /Updated: \d{4}-\d{2}-\d{2}/
```

```typescript
await expect(page.locator("main")).toMatchAriaSnapshot(`
  - heading /Issues \\d+/
  - list:
    - listitem /Bug #\\d+: .*/
`);
```

## Generating Snapshots

### Programmatically

```typescript
const snapshot = await page.locator("body").ariaSnapshot();
console.log(snapshot);
```

### From Empty Template

Pass an empty string to auto-generate the snapshot on first run:

```typescript
await expect(page.locator("main")).toMatchAriaSnapshot("");
```

### Using Code Generator

The Playwright code generator provides an "Assert snapshot" action and an "Aria snapshot" tab for visual creation:

```bash
npx playwright codegen https://example.com
```

## Separate Snapshot Files

Store snapshots in dedicated `.aria.yml` files instead of inline:

```typescript
await expect(page.getByRole("main")).toMatchAriaSnapshot({
  name: "main.aria.yml",
});
```

Snapshot files are placed in `{testfile}-snapshots` directories by default.

### pathTemplate

Customize snapshot file locations in `playwright.config.ts`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  expect: {
    toMatchAriaSnapshot: {
      pathTemplate: "__snapshots__/{testFilePath}/{arg}{ext}",
    },
  },
});
```

Available template tokens: `{testFilePath}`, `{testFileDir}`, `{testFileName}`, `{arg}`, `{ext}`, `{snapshotDir}`.

## Updating Snapshots

### CLI Flag

```bash
npx playwright test --update-snapshots
```

Playwright waits for the maximum expect timeout to ensure the page is settled before taking the snapshot.

### Update Source Methods

Control how source code is modified when updating:

```bash
# Create unified diff files for git apply (default)
npx playwright test --update-snapshots --update-source-method=patch

# Generate merge conflict markers for manual resolution
npx playwright test --update-snapshots --update-source-method=3way

# Directly overwrite source code
npx playwright test --update-snapshots --update-source-method=overwrite
```

| Method | Behavior |
|--------|----------|
| `patch` (default) | Creates unified diff files for `git apply` |
| `3way` | Generates merge conflict markers |
| `overwrite` | Directly replaces inline snapshot strings |

## Comparison Behavior

- Case-sensitive matching
- Whitespace is collapsed (indentation and line breaks normalized)
- Elements are compared in order
- A single snapshot is saved across all browsers (not per-browser)

## When to Use ARIA Snapshots

Best for:

- Whole page or component structural testing
- Broad checks on complex UI components
- Regression testing for accessibility tree stability
- Verifying correct ARIA roles and attributes

Use standard assertions instead when:

- Validating computed values or core logic
- Checking precise dynamic conditions
- Testing frequently changing content

Combine both approaches for comprehensive coverage.
