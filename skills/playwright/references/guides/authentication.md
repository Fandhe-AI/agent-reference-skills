# Authentication

Playwright executes tests in isolated browser contexts. To avoid repeated login flows, authenticate once, save browser state via `storageState`, and reuse it across tests. State files are stored in `playwright/.auth/` (add to `.gitignore`).

## Setup Project with storageState

Create `tests/auth.setup.ts` to perform login once and persist cookies/localStorage:

```typescript
import { test as setup, expect } from "@playwright/test";
import path from "node:path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("https://example.com/login");
  await page.getByLabel("Username").fill("user");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Wait for redirect or element confirming login
  await page.waitForURL("https://example.com/dashboard");
  await expect(
    page.getByRole("button", { name: "View profile" }),
  ).toBeVisible();

  // Save signed-in state
  await page.context().storageState({ path: authFile });
});
```

## Project Dependencies Configuration

In `playwright.config.ts`, declare the setup project as a dependency so it runs first. Every dependent project automatically uses the saved `storageState`:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    // Setup project - runs first
    { name: "setup", testMatch: /.*\.setup\.ts/ },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
```

Tests start pre-authenticated without any login code.

## Worker Isolation (One Account Per Parallel Worker)

When tests modify server-side state, each parallel worker should use its own account. Define a worker-scoped fixture:

```typescript
import { test as baseTest, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

export * from "@playwright/test";
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use worker storage state for each test
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker
  workerStorageState: [
    async ({ browser }, use) => {
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`,
      );

      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      // Create a fresh page without existing state
      const page = await browser.newPage({ storageState: undefined });
      const account = await acquireAccount(id); // your account pool

      await page.goto("https://example.com/login");
      await page.getByLabel("Username").fill(account.username);
      await page.getByLabel("Password").fill(account.password);
      await page.getByRole("button", { name: "Sign in" }).click();
      await page.waitForURL("https://example.com/dashboard");

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
```

## Authenticating via API Request

Skip the browser UI entirely for faster auth using `request`:

```typescript
import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ request }) => {
  await request.post("https://example.com/api/login", {
    form: {
      user: "username",
      password: "password",
    },
  });
  // Save cookies obtained from API response
  await request.storageState({ path: authFile });
});
```

## Multiple Signed-In Roles

Save separate state files for different roles:

```typescript
// tests/auth.setup.ts
import { test as setup } from "@playwright/test";

const adminFile = "playwright/.auth/admin.json";

setup("authenticate as admin", async ({ page }) => {
  await page.goto("https://example.com/login");
  await page.getByLabel("Username").fill("admin");
  await page.getByLabel("Password").fill("admin-pass");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("https://example.com/admin");
  await page.context().storageState({ path: adminFile });
});

const userFile = "playwright/.auth/user.json";

setup("authenticate as user", async ({ page }) => {
  await page.goto("https://example.com/login");
  await page.getByLabel("Username").fill("user");
  await page.getByLabel("Password").fill("user-pass");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("https://example.com/home");
  await page.context().storageState({ path: userFile });
});
```

Use `test.use()` to select a role per test or describe block:

```typescript
import { test, expect } from "@playwright/test";

test.use({ storageState: "playwright/.auth/admin.json" });

test("admin can manage users", async ({ page }) => {
  await page.goto("https://example.com/admin/users");
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
});
```

### Testing Multiple Roles Together

Create multiple contexts in a single test:

```typescript
import { test } from "@playwright/test";

test("admin and user interact", async ({ browser }) => {
  const adminContext = await browser.newContext({
    storageState: "playwright/.auth/admin.json",
  });
  const adminPage = await adminContext.newPage();

  const userContext = await browser.newContext({
    storageState: "playwright/.auth/user.json",
  });
  const userPage = await userContext.newPage();

  // Interact with both pages simultaneously
  await adminPage.goto("https://example.com/admin");
  await userPage.goto("https://example.com/home");

  await adminContext.close();
  await userContext.close();
});
```

## POM Fixtures for Multiple Roles

Combine Page Object Models with auth fixtures for clean multi-role tests:

```typescript
import { test as base, type Page, type Locator } from "@playwright/test";

class AdminPage {
  readonly page: Page;
  readonly greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    this.greeting = page.locator("#greeting");
  }
}

class UserPage {
  readonly page: Page;
  readonly greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    this.greeting = page.locator("#greeting");
  }
}

type MyFixtures = {
  adminPage: AdminPage;
  userPage: UserPage;
};

export const test = base.extend<MyFixtures>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/admin.json",
    });
    const adminPage = new AdminPage(await context.newPage());
    await use(adminPage);
    await context.close();
  },
  userPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/user.json",
    });
    const userPage = new UserPage(await context.newPage());
    await use(userPage);
    await context.close();
  },
});

export { expect } from "@playwright/test";
```

Usage:

```typescript
import { test, expect } from "./fixtures";

test("admin and user greetings", async ({ adminPage, userPage }) => {
  await expect(adminPage.greeting).toHaveText("Welcome, Admin");
  await expect(userPage.greeting).toHaveText("Welcome, User");
});
```

## Session Storage

`storageState` covers cookies and localStorage but not sessionStorage. Persist and restore it manually:

```typescript
// Save session storage after login
const sessionStorage = await page.evaluate(() =>
  JSON.stringify(sessionStorage),
);
fs.writeFileSync(
  "playwright/.auth/session.json",
  sessionStorage,
  "utf-8",
);

// Restore session storage before test via addInitScript
const sessionData = JSON.parse(
  fs.readFileSync("playwright/.auth/session.json", "utf-8"),
);
await context.addInitScript((storage) => {
  if (window.location.hostname === "example.com") {
    for (const [key, value] of Object.entries(storage)) {
      window.sessionStorage.setItem(key, value as string);
    }
  }
}, sessionData);
```

## Bypassing Authentication (Unauthenticated Tests)

Reset storage state to empty for tests that require no authentication:

```typescript
import { test } from "@playwright/test";

// Override storage state with empty cookies/origins
test.use({ storageState: { cookies: [], origins: [] } });

test("login page is visible when not signed in", async ({ page }) => {
  await page.goto("https://example.com/login");
  // Runs without authentication
});
```
