# Page Object Model (POM)

The Page Object Model pattern represents parts of a web application as classes, providing higher-level APIs and centralizing element selectors. This reduces duplication across tests and simplifies maintenance when UI changes.

## Benefits

- **Authoring**: Creates abstraction layers tailored to your application's structure
- **Maintenance**: Captures element selectors in one place; when UI changes, update the POM class, not every test

## Basic Structure

A POM class takes a `Page` object in its constructor, defines locator properties for page elements, and exposes async methods for user interactions.

```typescript
import { type Locator, type Page, expect } from "@playwright/test";

export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly gettingStartedHeader: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator("a", { hasText: "Get started" });
    this.gettingStartedHeader = page.locator("h1", {
      hasText: "Installation",
    });
    this.tocList = page.locator("article div.markdown ul > li > a");
  }

  async goto() {
    await this.page.goto("https://playwright.dev");
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.page
      .getByRole("link", { name: "Page Object Model", exact: true })
      .click();
  }
}
```

## Usage in Tests

Instantiate the POM with the `page` fixture and use its methods:

```typescript
import { test, expect } from "@playwright/test";
import { PlaywrightDevPage } from "./playwright-dev-page";

test("getting started should contain table of contents", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);

  await playwrightDev.goto();
  await playwrightDev.getStarted();

  await expect(playwrightDev.tocList).toHaveText([
    "How to install Playwright",
    "What's Installed",
    "How to run the example test",
    "How to open the HTML test report",
    "Write tests using web first assertions, page fixtures and locators",
    "Run single test, multiple tests, headed mode",
    "Generate tests with Codegen",
    "See a trace of your tests",
  ]);
});

test("should show Page Object Model article", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);

  await playwrightDev.goto();
  await playwrightDev.pageObjectModel();

  await expect(
    page.locator("article h1", { hasText: "Page Object Model" }),
  ).toBeVisible();
});
```

## Practical Example: Login Page

```typescript
import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.errorMessage = page.getByRole("alert");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
```

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";

test("successful login redirects to dashboard", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("admin", "password123");

  await expect(page).toHaveURL("/dashboard");
});

test("invalid credentials show error", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("wrong", "wrong");

  await expect(loginPage.errorMessage).toHaveText("Invalid credentials");
});
```

## POM as Fixtures

Register POM classes as Playwright fixtures for automatic instantiation:

```typescript
import { test as base } from "@playwright/test";
import { LoginPage } from "./login-page";
import { DashboardPage } from "./dashboard-page";

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect } from "@playwright/test";
```

Usage:

```typescript
import { test, expect } from "./fixtures";

test("login and view dashboard", async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login("admin", "password123");

  await expect(dashboardPage.welcomeMessage).toHaveText("Welcome, Admin");
});
```

## POM with Multiple Contexts (Multi-Role)

Combine POM with separate browser contexts for multi-role testing:

```typescript
import { test as base, type Page, type Locator } from "@playwright/test";

class AdminDashboard {
  readonly page: Page;
  readonly userList: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userList = page.getByRole("list", { name: "Users" });
    this.deleteButton = page.getByRole("button", { name: "Delete" });
  }
}

class UserProfile {
  readonly page: Page;
  readonly profileName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileName = page.locator("#profile-name");
  }
}

export const test = base.extend<{
  adminDashboard: AdminDashboard;
  userProfile: UserProfile;
}>({
  adminDashboard: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/admin.json",
    });
    const page = await context.newPage();
    await use(new AdminDashboard(page));
    await context.close();
  },
  userProfile: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/user.json",
    });
    const page = await context.newPage();
    await use(new UserProfile(page));
    await context.close();
  },
});
```

## Guidelines

- Define locators in the constructor, not in methods (locators are lazy and do not perform element lookup until used)
- Use role-based and accessible locators (`getByRole`, `getByLabel`, `getByText`) over CSS/XPath
- Keep methods focused on user-visible actions
- Include assertions within POM methods only when they represent inherent navigation or state transitions
- Name methods after user actions, not implementation details
