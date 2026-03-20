# Network

Playwright provides comprehensive control over browser network traffic. You can monitor, modify, mock, and abort HTTP requests, handle WebSockets, and replay traffic from HAR files.

## Route Interception

Use `page.route()` or `browserContext.route()` to intercept requests matching a URL pattern.

### Fulfill (Mock Response)

Return a custom response without contacting the server:

```typescript
import { test, expect } from "@playwright/test";

test("mock API response", async ({ page }) => {
  await page.route("**/api/v1/fruits", async (route) => {
    const json = [{ name: "Strawberry", id: 21 }];
    await route.fulfill({ json });
  });

  await page.goto("https://demo.playwright.dev/api-mocking");
  await expect(page.getByText("Strawberry")).toBeVisible();
});
```

`route.fulfill()` accepts: `status`, `headers`, `body`, `json`, `contentType`, `path` (serve from file), and `response` (base on a fetched response).

### Continue (Modify Request)

Let the request proceed to the server with modifications:

```typescript
await page.route("**/*", async (route) => {
  const headers = route.request().headers();
  delete headers["X-Secret"];
  await route.continue({ headers });
});
```

`route.continue()` accepts: `url`, `method`, `headers`, `postData`.

### Abort (Block Request)

Prevent requests from completing:

```typescript
await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());
```

### Fallback (Delegate to Next Handler)

When multiple handlers match, use `route.fallback()` to pass control to the next registered handler:

```typescript
// Handler added second runs first, falls back for non-matching
await page.route("**/*", async (route) => {
  if (route.request().resourceType() !== "image") {
    return route.fallback();
  }
  await route.abort();
});
```

## Modify Responses

Fetch the original response from the server, then modify it before returning:

```typescript
await page.route("**/title.html", async (route) => {
  const response = await route.fetch();
  let body = await response.text();
  body = body.replace("<title>", "<title>My prefix: ");
  await route.fulfill({ response, body });
});
```

Patch JSON API responses:

```typescript
await page.route("**/api/v1/fruits", async (route) => {
  const response = await route.fetch();
  const json = await response.json();
  json.push({ name: "Loquat", id: 100 });
  await route.fulfill({ response, json });
});
```

## URL Pattern Matching (Glob)

Playwright uses simplified glob patterns for URL matching:

| Pattern | Meaning |
|---------|---------|
| `*` | Matches any characters except `/` |
| `**` | Matches any characters including `/` |
| `?` | Matches a literal `?` character |
| `{}` | Comma-separated alternatives |
| `\` | Escapes special characters |

Examples:

```typescript
// All image requests
await page.route("**/*.{png,jpg,jpeg}", handler);

// Specific API endpoint
await page.route("**/api/v1/users", handler);

// Any API route
await page.route("**/api/**", handler);
```

You can also use `RegExp`:

```typescript
await page.route(/\/api\/v1\/users\/\d+/, handler);
```

## HTTP Credentials

Configure HTTP authentication in the browser context or config:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    httpCredentials: {
      username: "bill",
      password: "pa55w0rd",
    },
  },
});
```

## HTTP Proxy

Route traffic through a proxy server:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    proxy: {
      server: "http://myproxy.com:3128",
      username: "usr",
      password: "pwd",
    },
  },
});
```

## Network Events

### Listening to Requests and Responses

```typescript
// Log all requests
page.on("request", (request) =>
  console.log(">>", request.method(), request.url()),
);

// Log all responses
page.on("response", (response) =>
  console.log("<<", response.status(), response.url()),
);
```

### Waiting for Specific Network Activity

```typescript
// Wait for a specific request
const requestPromise = page.waitForRequest("**/api/v1/users");
await page.getByRole("button", { name: "Load" }).click();
const request = await requestPromise;

// Wait for response with predicate
const responsePromise = page.waitForResponse(
  (response) =>
    response.url().includes("/api/v1/users") && response.status() === 200,
);
await page.getByRole("button", { name: "Load" }).click();
const response = await responsePromise;
```

## WebSocket Monitoring

Listen to WebSocket connections and their frames:

```typescript
page.on("websocket", (ws) => {
  console.log(`WebSocket opened: ${ws.url()}`);
  ws.on("framesent", (event) => console.log("Sent:", event.payload));
  ws.on("framereceived", (event) => console.log("Received:", event.payload));
  ws.on("close", () => console.log("WebSocket closed"));
});
```

## WebSocket Mocking with routeWebSocket

### Full Mock (No Server Connection)

```typescript
await page.routeWebSocket("wss://example.com/ws", (ws) => {
  ws.onMessage((message) => {
    if (message === "request") {
      ws.send("response");
    }
  });
});
```

### Intercept and Modify (Proxy to Server)

```typescript
await page.routeWebSocket("wss://example.com/ws", (ws) => {
  const server = ws.connectToServer();

  ws.onMessage((message) => {
    if (message === "request") {
      server.send("modified-request");
    } else {
      server.send(message);
    }
  });

  server.onMessage((message) => {
    ws.send(message);
  });
});
```

## HAR Recording and Replay

### Record HAR via API

```typescript
await page.routeFromHAR("./hars/example.har", {
  url: "**/api/**",
  update: true, // Record mode
});

// Perform actions that generate network traffic
await page.goto("https://example.com");
// HAR file is saved when context closes
```

### Record HAR via CLI

```bash
npx playwright open --save-har=example.har --save-har-glob="**/api/**" https://example.com
```

### Replay from HAR

```typescript
test("replay from HAR", async ({ page }) => {
  await page.routeFromHAR("./hars/example.har", {
    url: "**/api/**",
    update: false, // Replay mode (default)
  });

  await page.goto("https://example.com");
  // Responses served from HAR file
});
```

### Modify HAR Responses

Edit the hashed `.txt` payload files in the HAR directory to change response data. HAR files ending in `.zip` contain compressed payloads as separate entries that can be extracted and edited.

### HAR Matching Behavior

- Matches URL and HTTP method strictly
- POST requests also compare payloads
- When multiple entries match, the one with the most matching headers wins
- Unmatched requests are aborted by default

## Context-Level vs Page-Level Routes

```typescript
// Applies to all pages in the context
await context.route("**/api/**", handler);

// Applies only to this page
await page.route("**/api/**", handler);
```

## Service Workers Note

If network events seem missing, service workers may be intercepting requests. Disable them with:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    serviceWorkers: "block",
  },
});
```
