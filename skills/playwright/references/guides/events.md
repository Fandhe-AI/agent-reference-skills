# Events

Playwright provides event-based APIs for monitoring and reacting to browser activity including network requests, popups, dialogs, and more.

## Waiting for Events

### waitForRequest

Wait for a specific network request by URL pattern, RegExp, or predicate:

```typescript
import { test, expect } from "@playwright/test";

test("wait for API request", async ({ page }) => {
  // Start waiting before the action that triggers the request
  const requestPromise = page.waitForRequest("**/api/v1/users");
  await page.getByRole("button", { name: "Load users" }).click();
  const request = await requestPromise;

  expect(request.method()).toBe("GET");
});
```

With predicate:

```typescript
const requestPromise = page.waitForRequest(
  (request) =>
    request.url().includes("/api/search") && request.method() === "POST",
);
await page.getByRole("button", { name: "Search" }).click();
const request = await requestPromise;
```

### waitForResponse

Wait for a specific network response:

```typescript
// By URL pattern
const responsePromise = page.waitForResponse("**/api/v1/users");
await page.getByRole("button", { name: "Load" }).click();
const response = await responsePromise;
expect(response.status()).toBe(200);

// By predicate
const responsePromise = page.waitForResponse(
  (response) =>
    response.url().includes("/api/v1/users") && response.status() === 200,
);
await page.getByRole("button", { name: "Load" }).click();
const response = await responsePromise;
const data = await response.json();
```

### waitForEvent

Wait for any named event on `Page` or `BrowserContext`:

```typescript
// Wait for a popup window
const popupPromise = page.waitForEvent("popup");
await page.getByText("Open the popup").click();
const popup = await popupPromise;
await expect(popup).toHaveTitle("Popup Window");
```

```typescript
// Wait for a download
const downloadPromise = page.waitForEvent("download");
await page.getByText("Download file").click();
const download = await downloadPromise;
```

```typescript
// Wait for a new page in context
const pagePromise = context.waitForEvent("page");
await page.getByRole("link", { name: "Open in new tab" }).click();
const newPage = await pagePromise;
```

## Event Listeners

### on (Subscribe)

Register a persistent listener for an event:

```typescript
// Log all network requests
page.on("request", (request) => {
  console.log(`>> ${request.method()} ${request.url()}`);
});

// Log all responses
page.on("response", (response) => {
  console.log(`<< ${response.status()} ${response.url()}`);
});

// Track console messages
page.on("console", (msg) => {
  console.log(`Console [${msg.type()}]: ${msg.text()}`);
});

// Track page errors
page.on("pageerror", (error) => {
  console.error(`Page error: ${error.message}`);
});
```

### off (Unsubscribe)

Remove a previously registered listener:

```typescript
const requestListener = (request: Request) => {
  console.log(`Request: ${request.url()}`);
};

page.on("request", requestListener);

// Later, remove the listener
page.off("request", requestListener);
```

### once (One-Time Listener)

Handle an event exactly once, then automatically unsubscribe:

```typescript
// Handle a single dialog
page.once("dialog", (dialog) => dialog.accept("2024"));
await page.getByRole("button", { name: "Enter year" }).click();
```

## Common Page Events

| Event | Description |
|-------|-------------|
| `"request"` | Fired for every network request |
| `"requestfinished"` | Fired when a request completes successfully |
| `"requestfailed"` | Fired when a request fails |
| `"response"` | Fired for every network response |
| `"console"` | Fired for `console.log()` and similar calls |
| `"pageerror"` | Fired for uncaught exceptions |
| `"dialog"` | Fired for alert, confirm, prompt, beforeunload |
| `"popup"` | Fired when a new popup window opens |
| `"download"` | Fired when a download starts |
| `"filechooser"` | Fired when a file input is activated |
| `"websocket"` | Fired when a WebSocket connection is created |
| `"close"` | Fired when the page closes |
| `"crash"` | Fired when the page crashes |
| `"frameattached"` | Fired when a frame is attached |
| `"framedetached"` | Fired when a frame is detached |
| `"framenavigated"` | Fired when a frame navigates |
| `"load"` | Fired when the `load` event is dispatched |
| `"domcontentloaded"` | Fired when `DOMContentLoaded` fires |

## Common BrowserContext Events

| Event | Description |
|-------|-------------|
| `"page"` | Fired when a new page is created in the context |
| `"close"` | Fired when the context closes |
| `"request"` | Fired for requests from any page in the context |
| `"requestfinished"` | Fired when any request completes |
| `"requestfailed"` | Fired when any request fails |
| `"response"` | Fired for responses from any page in the context |

## Event Pattern: Wait Before Action

Always set up event waiting before performing the action that triggers the event:

```typescript
// Correct: set up promise first, then act
const responsePromise = page.waitForResponse("**/api/data");
await page.getByRole("button", { name: "Fetch" }).click();
const response = await responsePromise;

// Wrong: the response may arrive before we start waiting
await page.getByRole("button", { name: "Fetch" }).click();
const response = await page.waitForResponse("**/api/data"); // may miss it
```

## Combining Multiple Events

Wait for multiple events in parallel:

```typescript
const [request, response] = await Promise.all([
  page.waitForRequest("**/api/submit"),
  page.waitForResponse("**/api/submit"),
  page.getByRole("button", { name: "Submit" }).click(),
]);

expect(request.method()).toBe("POST");
expect(response.status()).toBe(200);
```

## WebSocket Events

```typescript
page.on("websocket", (ws) => {
  console.log(`WebSocket opened: ${ws.url()}`);

  ws.on("framesent", (event) => {
    console.log(`Sent: ${event.payload}`);
  });

  ws.on("framereceived", (event) => {
    console.log(`Received: ${event.payload}`);
  });

  ws.on("close", () => {
    console.log("WebSocket closed");
  });
});
```
