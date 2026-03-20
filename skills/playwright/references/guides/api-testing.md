# API Testing

Playwright can test REST APIs directly via `APIRequestContext` without loading a browser page. This is useful for testing server endpoints, setting up preconditions before UI tests, and validating postconditions after user actions.

## Configuration

Set `baseURL` and common headers in `playwright.config.ts`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "https://api.github.com",
    extraHTTPHeaders: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${process.env.API_TOKEN}`,
    },
  },
});
```

### Proxy Configuration

```typescript
export default defineConfig({
  use: {
    proxy: {
      server: "http://my-proxy:8080",
      username: "user",
      password: "secret",
    },
  },
});
```

## The request Fixture

The built-in `request` fixture provides an `APIRequestContext` that respects config settings:

```typescript
import { test, expect } from "@playwright/test";

test("should create a bug report", async ({ request }) => {
  const newIssue = await request.post("/repos/user/repo/issues", {
    data: {
      title: "[Bug] report 1",
      body: "Bug description",
    },
  });
  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get("/repos/user/repo/issues");
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(
    expect.objectContaining({
      title: "[Bug] report 1",
      body: "Bug description",
    }),
  );
});
```

## HTTP Methods

```typescript
// GET
const response = await request.get("/api/users");

// POST with JSON body
const response = await request.post("/api/users", {
  data: { name: "Alice", role: "admin" },
});

// POST with form data
const response = await request.post("/api/login", {
  form: { username: "user", password: "pass" },
});

// PUT
const response = await request.put("/api/users/1", {
  data: { name: "Updated" },
});

// PATCH
const response = await request.patch("/api/users/1", {
  data: { role: "editor" },
});

// DELETE
const response = await request.delete("/api/users/1");
```

## Setup and Teardown

Use `beforeAll` / `afterAll` hooks for test infrastructure:

```typescript
import { test, expect } from "@playwright/test";

const REPO = "test-repo";
const USER = "test-user";

test.beforeAll(async ({ request }) => {
  // Create a test repository
  const response = await request.post("/user/repos", {
    data: { name: REPO },
  });
  expect(response.ok()).toBeTruthy();
});

test("should create a bug report", async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: { title: "[Bug] report 1", body: "Bug description" },
  });
  expect(newIssue.ok()).toBeTruthy();
});

test("should create a feature request", async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: { title: "[Feature] request 1", body: "Feature description" },
  });
  expect(newIssue.ok()).toBeTruthy();
});

test.afterAll(async ({ request }) => {
  // Delete test repository
  const response = await request.delete(`/repos/${USER}/${REPO}`);
  expect(response.ok()).toBeTruthy();
});
```

## Preconditions: API Setup Before UI Tests

Create server-side state before running browser tests:

```typescript
import { test, expect } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";

const REPO = "test-repo";
const USER = "test-user";

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: "https://api.github.com",
    extraHTTPHeaders: {
      Authorization: `token ${process.env.API_TOKEN}`,
    },
  });
});

test("last created issue should be first in the list", async ({ page }) => {
  // Precondition: create issue via API
  const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
    data: { title: "[Feature] request 1" },
  });
  expect(newIssue.ok()).toBeTruthy();

  // Verify in UI
  await page.goto(`https://github.com/${USER}/${REPO}/issues`);
  const firstIssue = page.locator("a[data-hovercard-type='issue']").first();
  await expect(firstIssue).toHaveText("[Feature] request 1");
});

test.afterAll(async () => {
  await apiContext.dispose();
});
```

## Postconditions: API Validation After UI Actions

Verify that UI actions correctly modified server state:

```typescript
test("issue created in UI exists on server", async ({ page }) => {
  // Perform action via UI
  await page.goto(`https://github.com/${USER}/${REPO}/issues`);
  await page.getByText("New Issue").click();
  await page.getByRole("textbox", { name: "Title" }).fill("Bug report 1");
  await page.getByRole("textbox", { name: "Comment body" }).fill("Description");
  await page.getByText("Submit new issue").click();

  // Postcondition: verify via API
  const issueId = new URL(page.url()).pathname.split("/").pop();
  const newIssue = await apiContext.get(
    `https://api.github.com/repos/${USER}/${REPO}/issues/${issueId}`,
  );
  expect(newIssue.ok()).toBeTruthy();
  expect(await newIssue.json()).toEqual(
    expect.objectContaining({ title: "Bug report 1" }),
  );
});
```

## Reusing Authentication State

Share auth state between API and browser contexts using `storageState()`:

```typescript
import { request } from "@playwright/test";

// Authenticate via API
const requestContext = await request.newContext({
  httpCredentials: {
    username: "user",
    password: "passwd",
  },
});
await requestContext.get("https://api.example.com/login");

// Save state for browser reuse
await requestContext.storageState({ path: "state.json" });

// Browser context uses the same auth
const context = await browser.newContext({ storageState: "state.json" });
```

## Context Request vs Global Request

### Context-Associated Request (`page.request`, `context.request`)

Automatically shares cookies with the browser context:

```typescript
test("context request shares cookies", async ({ page, context }) => {
  await page.goto("https://example.com/login");
  // After page login, page.request has the same cookies
  const response = await page.request.get("/api/user/profile");
  expect(response.ok()).toBeTruthy();
});
```

- Populates `Cookie` header from the browser context
- Updates browser cookies from `Set-Cookie` in responses

### Isolated Request (`playwright.request.newContext()`)

Maintains its own separate cookie storage:

```typescript
test("isolated request has separate cookies", async ({
  page,
  context,
  playwright,
}) => {
  const apiRequest = await playwright.request.newContext();

  await context.route("https://example.com/", async (route) => {
    const response = await apiRequest.fetch(route.request());
    // apiRequest cookies are independent from browser context
    const contextCookies = await context.cookies();
    expect(contextCookies.length).toBe(0);
    await route.fulfill({ response });
  });

  await page.goto("https://example.com/");
  await apiRequest.dispose();
});
```

## Manual Request Context (Outside Tests)

For scripts or custom setup outside the test runner:

```typescript
import { request } from "@playwright/test";

const context = await request.newContext({
  baseURL: "https://api.github.com",
});

const response = await context.post("/user/repos", {
  headers: {
    Authorization: `token ${process.env.API_TOKEN}`,
  },
  data: { name: "test-repo" },
});
expect(response.ok()).toBeTruthy();

await context.dispose();
```
