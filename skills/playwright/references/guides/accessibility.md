# Accessibility Testing

Playwright integrates with `@axe-core/playwright` to run automated accessibility scans using the axe engine. Automated tests catch common issues but should be combined with manual testing for comprehensive WCAG compliance.

## Setup

Install the axe-core integration:

```bash
pnpm add -D @axe-core/playwright
```

## Basic Usage

```typescript
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage should not have accessibility violations", async ({ page }) => {
  await page.goto("https://example.com");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## AxeBuilder.analyze()

The `.analyze()` method executes the accessibility scan on the page in its current state. Always ensure the page is in the desired state before calling it:

```typescript
test("form page accessibility", async ({ page }) => {
  await page.goto("https://example.com/form");
  // Wait for dynamic content to load
  await page.locator("#form-container").waitFor();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

## include / exclude

### Scan Specific Sections

```typescript
const results = await new AxeBuilder({ page })
  .include("#main-content")
  .analyze();
```

### Exclude Known Problem Areas

```typescript
const results = await new AxeBuilder({ page })
  .exclude("#third-party-widget")
  .analyze();
```

Note: `.exclude()` removes the specified elements and all their descendants from the scan. Avoid using it with components that contain many children.

### Combine include and exclude

```typescript
const results = await new AxeBuilder({ page })
  .include("#main-content")
  .exclude("#main-content .legacy-component")
  .analyze();
```

## withTags (WCAG Criteria)

Filter scans to specific WCAG success criteria:

```typescript
const results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  .analyze();
```

Common tag values:

| Tag | Description |
|-----|-------------|
| `wcag2a` | WCAG 2.0 Level A |
| `wcag2aa` | WCAG 2.0 Level AA |
| `wcag21a` | WCAG 2.1 Level A |
| `wcag21aa` | WCAG 2.1 Level AA |
| `best-practice` | axe best practice rules |

## disableRules

Suppress specific rules with known violations:

```typescript
const results = await new AxeBuilder({ page })
  .disableRules(["color-contrast", "duplicate-id"])
  .analyze();
```

Use rule IDs from violation objects (`violation.id`) or the axe-core rule documentation.

## Test Attachments for CI

Attach full scan results to test reports for debugging in CI:

```typescript
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("page accessibility", async ({ page }, testInfo) => {
  await page.goto("https://example.com");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  await testInfo.attach("accessibility-scan-results", {
    body: JSON.stringify(accessibilityScanResults, null, 2),
    contentType: "application/json",
  });

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## Violation Fingerprinting

Instead of snapshotting the entire violations array (which breaks on unrelated changes), create stable fingerprints:

```typescript
function violationFingerprints(
  results: Awaited<ReturnType<AxeBuilder["analyze"]>>,
) {
  return JSON.stringify(
    results.violations.map((v) => ({
      rule: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
    null,
    2,
  );
}

test("no new violations beyond known ones", async ({ page }) => {
  await page.goto("https://example.com");
  const results = await new AxeBuilder({ page }).analyze();
  expect(violationFingerprints(results)).toMatchSnapshot(
    "a11y-violations.json",
  );
});
```

## Reusable Fixtures

Create a shared `AxeBuilder` factory fixture to standardize configuration across all tests:

```typescript
import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .exclude("#known-issue-element");
    await use(makeAxeBuilder);
  },
});

export { expect } from "@playwright/test";
```

Usage in tests:

```typescript
import { test, expect } from "./a11y-fixtures";

test("homepage accessibility", async ({ page, makeAxeBuilder }) => {
  await page.goto("https://example.com");
  const results = await makeAxeBuilder().analyze();
  expect(results.violations).toEqual([]);
});

test("about page accessibility", async ({ page, makeAxeBuilder }) => {
  await page.goto("https://example.com/about");
  // Additional include on top of shared config
  const results = await makeAxeBuilder().include("#main").analyze();
  expect(results.violations).toEqual([]);
});
```

## Integrating into Existing Functional Tests

Run accessibility checks alongside functional assertions:

```typescript
test("user can submit contact form", async ({ page, makeAxeBuilder }) => {
  await page.goto("https://example.com/contact");

  // Functional test
  await page.getByLabel("Name").fill("Alice");
  await page.getByLabel("Email").fill("alice@example.com");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Thank you")).toBeVisible();

  // Accessibility check on the result page
  const results = await makeAxeBuilder().analyze();
  expect(results.violations).toEqual([]);
});
```
