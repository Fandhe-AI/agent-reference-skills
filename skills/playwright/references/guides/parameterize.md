# Parameterize Tests

Playwright Test supports parameterizing tests at the test level with `forEach`, at the project level with custom options, and via external data sources like environment variables and CSV files.

## Test-Level Parameterization with forEach

The simplest approach iterates over a data array:

```typescript
import { test, expect } from "@playwright/test";

const people = [
  { name: "Alice", expected: "Hello, Alice!" },
  { name: "Bob", expected: "Hello, Bob!" },
  { name: "Charlie", expected: "Hello, Charlie!" },
];

for (const { name, expected } of people) {
  test(`greeting for ${name}`, async ({ page }) => {
    await page.goto(`https://example.com/greet?name=${name}`);
    await expect(page.getByRole("heading")).toHaveText(expected);
  });
}
```

This generates three separate test cases, each with its own name in reports.

## Hook Placement with forEach

### Hooks Outside forEach (Run Once)

```typescript
import { test, expect } from "@playwright/test";

// Runs once before all parameterized tests
test.beforeEach(async ({ page }) => {
  await page.goto("https://example.com");
});

const items = ["Apple", "Banana", "Cherry"];

for (const item of items) {
  test(`select ${item}`, async ({ page }) => {
    await page.getByRole("option", { name: item }).click();
    await expect(page.locator("#selected")).toHaveText(item);
  });
}
```

### Hooks Inside describe (Run Per Iteration)

```typescript
import { test, expect } from "@playwright/test";

const users = [
  { role: "admin", url: "/admin" },
  { role: "editor", url: "/editor" },
];

for (const { role, url } of users) {
  test.describe(`${role} role`, () => {
    test.beforeEach(async ({ page }) => {
      // Runs before each test in this describe block
      await page.goto(`https://example.com${url}`);
    });

    test(`${role} can see dashboard`, async ({ page }) => {
      await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    });

    test(`${role} can see profile`, async ({ page }) => {
      await page.getByRole("link", { name: "Profile" }).click();
      await expect(page.getByRole("heading", { name: "Profile" })).toBeVisible();
    });
  });
}
```

## Project-Level Parameterization

Use `test.extend()` with `{ option: true }` to create custom options configurable per project.

### Define Custom Options

```typescript
// my-test.ts
import { test as base } from "@playwright/test";

export type TestOptions = {
  person: string;
};

export const test = base.extend<TestOptions>({
  // Default value; { option: true } marks it as configurable
  person: ["John", { option: true }],
});

export { expect } from "@playwright/test";
```

### Use Options in Tests

```typescript
// example.spec.ts
import { test, expect } from "./my-test";

test("greeting uses person name", async ({ page, person }) => {
  await page.goto("/index.html");
  await expect(page.locator("#node")).toContainText(person);
});
```

### Configure Projects

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";
import type { TestOptions } from "./my-test";

export default defineConfig<TestOptions>({
  projects: [
    {
      name: "alice",
      use: { person: "Alice" },
    },
    {
      name: "bob",
      use: { person: "Bob" },
    },
  ],
});
```

Each project runs the full test suite with its own option values.

### Override the page Fixture with Options

Custom options can modify built-in fixtures:

```typescript
import { test as base } from "@playwright/test";

export type TestOptions = {
  defaultItem: string;
};

export const test = base.extend<TestOptions>({
  defaultItem: ["Item 1", { option: true }],

  // Override page fixture to navigate with the option
  page: async ({ page, defaultItem }, use) => {
    await page.goto(`https://example.com/items/${defaultItem}`);
    await use(page);
  },
});
```

## Environment Variables

Pass configuration and secrets via environment variables:

```bash
USER_NAME=admin PASSWORD=secret npx playwright test
```

Access in tests:

```typescript
test("login with env vars", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill(process.env.USER_NAME!);
  await page.getByLabel("Password").fill(process.env.PASSWORD!);
  await page.getByRole("button", { name: "Sign in" }).click();
});
```

Access in config:

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    baseURL: process.env.STAGING === "1"
      ? "https://staging.example.com"
      : "https://example.com",
  },
});
```

### .env File Support

Use the `dotenv` package for cleaner environment management:

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
  },
});
```

`.env` file:

```
BASE_URL=https://staging.example.com
API_TOKEN=abc123
```

## CSV-Driven Tests

Generate tests dynamically from CSV data:

```typescript
// tests/data-driven.spec.ts
import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(
  fs.readFileSync(path.join(__dirname, "input.csv"), "utf-8"),
  {
    columns: true,
    skip_empty_lines: true,
  },
);

for (const record of records) {
  test(`test case: ${record.test_case}`, async ({ page }) => {
    await page.goto(record.url);
    await expect(page.locator(record.selector)).toHaveText(record.expected);
  });
}
```

Example `input.csv`:

```csv
test_case,url,selector,expected
homepage title,https://example.com,h1,Welcome
about heading,https://example.com/about,h1,About Us
```

## JSON-Driven Tests

```typescript
import { test, expect } from "@playwright/test";
import testData from "./test-data.json";

for (const { name, input, expected } of testData) {
  test(`${name}`, async ({ page }) => {
    await page.goto("/calculator");
    await page.getByLabel("Input").fill(input);
    await page.getByRole("button", { name: "Calculate" }).click();
    await expect(page.locator("#result")).toHaveText(expected);
  });
}
```
