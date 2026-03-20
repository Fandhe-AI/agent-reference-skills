# APIRequestContext, Request, Response, and Route

## APIRequestContext

`APIRequestContext` allows sending HTTP requests directly without a browser page. Useful for API testing, setting up test data, or validating server state. In `@playwright/test`, use the `request` fixture or `context.request`.

```ts
import { test, expect } from "@playwright/test";

test("API test", async ({ request }) => {
  const response = await request.get("https://api.example.com/users");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveLength(3);
});
```

### Methods

| Method | Signature |
|--------|-----------|
| `get` | `(url: string, options?: RequestOptions) => Promise<APIResponse>` |
| `post` | `(url: string, options?: RequestOptions) => Promise<APIResponse>` |
| `put` | `(url: string, options?: RequestOptions) => Promise<APIResponse>` |
| `patch` | `(url: string, options?: RequestOptions) => Promise<APIResponse>` |
| `delete` | `(url: string, options?: RequestOptions) => Promise<APIResponse>` |
| `head` | `(url: string, options?: RequestOptions) => Promise<APIResponse>` |
| `fetch` | `(urlOrRequest: string \| Request, options?: RequestOptions & { method?: string }) => Promise<APIResponse>` |
| `dispose` | `(options?: { reason?: string }) => Promise<void>` |
| `storageState` | `(options?: { path?: string }) => Promise<StorageState>` |

### RequestOptions

| Option | Type | Description |
|--------|------|-------------|
| `data` | `string \| Buffer \| Serializable` | Request body (sets `application/json` for objects) |
| `form` | `Record<string, string \| number \| boolean>` | Form data (`application/x-www-form-urlencoded`) |
| `multipart` | `FormData \| Record<string, string \| { name: string; mimeType: string; buffer: Buffer }>` | Multipart form data |
| `headers` | `Record<string, string>` | Request headers |
| `params` | `Record<string, string \| number \| boolean> \| URLSearchParams \| string` | Query parameters |
| `failOnStatusCode` | `boolean` | Throw on non-2xx/3xx status (default: `false`) |
| `ignoreHTTPSErrors` | `boolean` | Ignore HTTPS errors |
| `maxRedirects` | `number` | Maximum redirects to follow (default: `20`) |
| `maxRetries` | `number` | Maximum retries on network errors (default: `0`) |
| `timeout` | `number` | Request timeout in ms (default: `30000`) |

```ts
// GET with query params
const resp = await request.get("/api/users", {
  params: { page: 1, limit: 10 },
});

// POST JSON
const created = await request.post("/api/users", {
  data: { name: "Alice", email: "alice@example.com" },
});
expect(created.status()).toBe(201);

// POST form data
const login = await request.post("/login", {
  form: { username: "admin", password: "secret" },
});

// POST multipart (file upload)
const upload = await request.post("/api/upload", {
  multipart: {
    file: {
      name: "report.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("pdf content"),
    },
    description: "Monthly report",
  },
});

// PUT
await request.put("/api/users/1", {
  data: { name: "Alice Updated" },
});

// PATCH
await request.patch("/api/users/1", {
  data: { email: "newemail@example.com" },
});

// DELETE
await request.delete("/api/users/1");

// HEAD
const head = await request.head("/api/health");
expect(head.ok()).toBeTruthy();

// Generic fetch with custom method
const resp2 = await request.fetch("/api/resource", {
  method: "OPTIONS",
  headers: { "Access-Control-Request-Method": "POST" },
});

// Fail on non-2xx status
const resp3 = await request.get("/api/data", { failOnStatusCode: true });

// Save/restore storage state for authentication reuse
await request.storageState({ path: "auth.json" });

// Dispose when done (if created manually, not needed for fixtures)
await request.dispose();
```

### Using with Authentication

```ts
import { test as setup } from "@playwright/test";

setup("authenticate", async ({ request }) => {
  // Log in via API
  await request.post("/api/login", {
    data: { username: "admin", password: "password" },
  });
  // Save signed-in state
  await request.storageState({ path: ".auth/admin.json" });
});
```

---

## Request

The `Request` class represents a network request made by a page. Obtained from `page.on("request")`, `route.request()`, or `page.waitForRequest()`.

### Methods

| Method | Signature |
|--------|-----------|
| `allHeaders` | `() => Promise<Record<string, string>>` |
| `failure` | `() => { errorText: string } \| null` |
| `frame` | `() => Frame` |
| `headerValue` | `(name: string) => Promise<string \| null>` |
| `headers` | `() => Record<string, string>` |
| `headersArray` | `() => Promise<Array<{ name: string; value: string }>>` |
| `isNavigationRequest` | `() => boolean` |
| `method` | `() => string` |
| `postData` | `() => string \| null` |
| `postDataBuffer` | `() => Buffer \| null` |
| `postDataJSON` | `() => Serializable \| null` |
| `redirectedFrom` | `() => Request \| null` |
| `redirectedTo` | `() => Request \| null` |
| `resourceType` | `() => string` |
| `response` | `() => Promise<Response \| null>` |
| `serviceWorker` | `() => Worker \| null` |
| `sizes` | `() => Promise<{ requestBodySize: number; requestHeadersSize: number; responseBodySize: number; responseHeadersSize: number }>` |
| `timing` | `() => { startTime: number; domainLookupStart: number; domainLookupEnd: number; connectStart: number; secureConnectionStart: number; connectEnd: number; requestStart: number; responseStart: number; responseEnd: number }` |
| `url` | `() => string` |

```ts
// Capture requests
page.on("request", (request) => {
  console.log(`${request.method()} ${request.url()}`);
  console.log("Resource type:", request.resourceType());

  if (request.method() === "POST") {
    console.log("Post data:", request.postDataJSON());
  }
});

// Wait for a specific request
const requestPromise = page.waitForRequest(
  (req) => req.url().includes("/api/submit") && req.method() === "POST",
);
await page.getByRole("button", { name: "Submit" }).click();
const request = await requestPromise;
console.log("Submitted:", request.postDataJSON());

// Check request failure
page.on("requestfailed", (request) => {
  const failure = request.failure();
  console.log(`${request.url()} failed: ${failure?.errorText}`);
});

// Redirect chain
const response = await page.goto("http://example.com"); // redirects to https
const request2 = response!.request();
const redirectedFrom = request2.redirectedFrom();
console.log("Redirected from:", redirectedFrom?.url());

// Request timing
const timing = request.timing();
console.log("Time to first byte:", timing.responseStart - timing.startTime);

// Request sizes
const sizes = await request.sizes();
console.log("Response body size:", sizes.responseBodySize);
```

---

## Response

The `Response` class represents a network response received by a page. Obtained from `page.on("response")`, `request.response()`, `page.goto()`, or `page.waitForResponse()`.

### Methods

| Method | Signature |
|--------|-----------|
| `allHeaders` | `() => Promise<Record<string, string>>` |
| `body` | `() => Promise<Buffer>` |
| `finished` | `() => Promise<Error \| null>` |
| `frame` | `() => Frame` |
| `fromServiceWorker` | `() => boolean` |
| `headerValue` | `(name: string) => Promise<string \| null>` |
| `headerValues` | `(name: string) => Promise<string[]>` |
| `headers` | `() => Record<string, string>` |
| `headersArray` | `() => Promise<Array<{ name: string; value: string }>>` |
| `json` | `() => Promise<Serializable>` |
| `ok` | `() => boolean` |
| `request` | `() => Request` |
| `securityDetails` | `() => Promise<{ issuer: string; protocol: string; subjectName: string; validFrom: number; validTo: number } \| null>` |
| `serverAddr` | `() => Promise<{ ipAddress: string; port: number } \| null>` |
| `status` | `() => number` |
| `statusText` | `() => string` |
| `text` | `() => Promise<string>` |
| `url` | `() => string` |

```ts
// Wait for response and inspect
const responsePromise = page.waitForResponse("**/api/data");
await page.getByRole("button", { name: "Load" }).click();
const response = await responsePromise;

console.log("Status:", response.status(), response.statusText());
console.log("OK:", response.ok()); // true if 200-299
console.log("URL:", response.url());

// Parse response body
const json = await response.json();
const text = await response.text();
const buffer = await response.body();

// Headers
const contentType = await response.headerValue("content-type");
const allHeaders = await response.allHeaders();
const setCookies = await response.headerValues("set-cookie");

// Check when response finished
const error = await response.finished();
if (error) {
  console.log("Response error:", error.message);
}

// Security details (HTTPS)
const security = await response.securityDetails();
if (security) {
  console.log("Protocol:", security.protocol);
  console.log("Issuer:", security.issuer);
}

// Server address
const addr = await response.serverAddr();
console.log(`Server: ${addr?.ipAddress}:${addr?.port}`);

// Navigate and check response
const navResponse = await page.goto("https://example.com");
expect(navResponse?.status()).toBe(200);
```

---

## Route

The `Route` class represents an intercepted network request. Used within `page.route()` or `context.route()` handlers. Each route must be fulfilled, continued, aborted, or passed to fallback.

### Methods

| Method | Signature |
|--------|-----------|
| `abort` | `(errorCode?: string) => Promise<void>` |
| `continue` | `(options?: { headers?: Record<string, string>; method?: string; postData?: string \| Buffer \| Serializable; url?: string }) => Promise<void>` |
| `fallback` | `(options?: { headers?: Record<string, string>; method?: string; postData?: string \| Buffer \| Serializable; url?: string }) => Promise<void>` |
| `fetch` | `(options?: { headers?: Record<string, string>; maxRedirects?: number; maxRetries?: number; method?: string; postData?: string \| Buffer \| Serializable; timeout?: number; url?: string }) => Promise<APIResponse>` |
| `fulfill` | `(options?: { body?: string \| Buffer; contentType?: string; headers?: Record<string, string>; json?: Serializable; path?: string; response?: APIResponse; status?: number }) => Promise<void>` |
| `request` | `() => Request` |

### Error Codes for abort()

`aborted`, `accessdenied`, `addressunreachable`, `blockedbyclient`, `blockedbyresponse`, `connectionaborted`, `connectionclosed`, `connectionfailed`, `connectionrefused`, `connectionreset`, `internetdisconnected`, `namenotresolved`, `timedout`, `failed`

```ts
// Fulfill with mock data
await page.route("**/api/users", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    json: [{ id: 1, name: "Alice" }],
  });
});

// Fulfill from a file
await page.route("**/api/config", async (route) => {
  await route.fulfill({ path: "./fixtures/config.json" });
});

// Modify request and continue
await page.route("**/api/**", async (route, request) => {
  await route.continue({
    headers: { ...request.headers(), "x-test": "true" },
  });
});

// Abort requests
await page.route("**/*.{png,jpg,gif}", async (route) => {
  await route.abort();
});

// Fetch, modify, and fulfill (intercept response)
await page.route("**/api/users", async (route) => {
  const response = await route.fetch();
  const json = await response.json();
  // Modify the response
  json.push({ id: 99, name: "Injected User" });
  await route.fulfill({
    response,
    json,
  });
});

// Fallback to other handlers (handler chaining)
// Handlers are evaluated in reverse registration order.
// fallback() passes to the next handler; continue() sends to network.
await page.route("**/api/**", async (route) => {
  // Second handler: add auth header to all API requests
  await route.fallback({
    headers: { ...route.request().headers(), Authorization: "Bearer token" },
  });
});

await page.route("**/api/users", async (route) => {
  // First handler (registered later, runs first): mock /api/users
  await route.fulfill({ json: [{ id: 1, name: "Mock" }] });
});

// Conditional routing
await page.route("**/api/**", async (route) => {
  if (route.request().method() === "GET") {
    await route.fulfill({ json: { mocked: true } });
  } else {
    await route.continue();
  }
});
```
