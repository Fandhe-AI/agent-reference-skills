# Emulation

Playwright can emulate real devices by simulating browser behavior including user agents, screen sizes, viewports, touch capability, geolocation, locale, timezone, permissions, and more. Configuration can be applied globally in `playwright.config.ts` or per-test.

## Devices

Playwright provides a registry of predefined device descriptors that configure viewport, user agent, device scale factor, isMobile, and more.

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 13"] },
    },
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
```

Device descriptors include: `Desktop Chrome`, `Desktop Firefox`, `Desktop Safari`, `Pixel 5`, `iPhone 13`, `iPhone 13 Pro Max`, `iPad (gen 7)`, and many others.

## Viewport

### Global Configuration

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    viewport: { width: 1280, height: 720 },
  },
});
```

### Per-Test Override

```typescript
import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 1600, height: 1200 } });

test("wide viewport", async ({ page }) => {
  await page.goto("https://example.com");
});
```

### Runtime Viewport Change

```typescript
test("dynamic viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1200 });
  // Page will re-layout
  await page.goto("https://example.com");
});
```

## Device Scale Factor (High DPI)

Emulate high-DPI / Retina displays.

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    viewport: { width: 2560, height: 1440 },
    deviceScaleFactor: 2,
  },
});
```

## isMobile

Controls whether the `viewport` meta tag is respected and touch events are enabled.

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  use: {
    ...devices["Desktop Chrome"],
    isMobile: false,
  },
});
```

Per-test:

```typescript
test.use({ isMobile: true });

test("mobile behavior", async ({ page }) => {
  await page.goto("https://example.com");
});
```

## Locale and Timezone

### Global Configuration

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    locale: "en-GB",
    timezoneId: "Europe/Paris",
  },
});
```

### Per-Test Override

```typescript
import { test, expect } from "@playwright/test";

test.use({
  locale: "de-DE",
  timezoneId: "Europe/Berlin",
});

test("German locale", async ({ page }) => {
  await page.goto("https://example.com");
  // Date.toLocaleDateString() will use de-DE
  // Intl APIs will reflect the German locale
});
```

The `timezoneId` only affects the browser timezone, not the test runner process. To set the test runner timezone, use the `TZ` environment variable.

## Permissions

### Global Configuration

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    permissions: ["notifications"],
  },
});
```

### Per-Context

```typescript
test("grant and revoke permissions", async ({ context, page }) => {
  // Grant for specific origin
  await context.grantPermissions(["notifications"], {
    origin: "https://skype.com",
  });

  await page.goto("https://skype.com");

  // Revoke all permissions
  await context.clearPermissions();
});
```

Available permissions include: `geolocation`, `midi`, `midi-sysex`, `notifications`, `camera`, `microphone`, `background-sync`, `ambient-light-sensor`, `accelerometer`, `gyroscope`, `magnetometer`, `accessibility-events`, `clipboard-read`, `clipboard-write`, `payment-handler`.

## Geolocation

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    permissions: ["geolocation"],
  },
});
```

### Per-Test

```typescript
import { test, expect } from "@playwright/test";

test.use({
  geolocation: { longitude: 12.492507, latitude: 41.889938 },
  permissions: ["geolocation"],
});

test("geolocation in Rome", async ({ page }) => {
  await page.goto("https://maps.example.com");
});
```

### Change Geolocation During Test

```typescript
test("change location mid-test", async ({ context, page }) => {
  await context.grantPermissions(["geolocation"]);

  // Set initial location
  await context.setGeolocation({
    longitude: 12.492507,
    latitude: 41.889938,
  });
  await page.goto("https://maps.example.com");

  // Move to a different location
  await context.setGeolocation({
    longitude: 48.858455,
    latitude: 2.294474,
  });
  // Geolocation change applies to all pages in the context
});
```

## Color Scheme and Media

### Color Scheme

Emulate `prefers-color-scheme` media feature.

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    colorScheme: "dark", // 'light' | 'dark' | 'no-preference'
  },
});
```

Per-test:

```typescript
test.use({ colorScheme: "dark" });

test("dark mode", async ({ page }) => {
  await page.goto("https://example.com");
});
```

Change at runtime:

```typescript
test("toggle color scheme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  // Verify dark mode styles applied
  await page.emulateMedia({ colorScheme: "light" });
});
```

### Reduced Motion

Emulate `prefers-reduced-motion` media feature.

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    reducedMotion: "reduce", // 'reduce' | 'no-preference'
  },
});
```

### Forced Colors

Emulate `forced-colors` media feature.

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    forcedColors: "active", // 'active' | 'none'
  },
});
```

### Media Type

Emulate CSS media type (e.g., `print`).

```typescript
test("print media", async ({ page }) => {
  await page.emulateMedia({ media: "print" });
  // Page now renders as if media type is "print"
  await page.goto("https://example.com");
});
```

## User Agent

Override the browser's user agent string.

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    userAgent: "My custom user agent",
  },
});
```

Per-test:

```typescript
test.use({ userAgent: "My custom user agent" });

test("custom user agent", async ({ page }) => {
  await page.goto("https://example.com");
  const ua = await page.evaluate(() => navigator.userAgent);
  expect(ua).toBe("My custom user agent");
});
```

## Offline Mode

Emulate network being disconnected.

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    offline: true,
  },
});
```

Per-test:

```typescript
test.use({ offline: true });

test("offline mode", async ({ page }) => {
  // Network requests will fail
  await page.goto("https://example.com").catch(() => {
    console.log("Network request failed as expected");
  });
});
```

## JavaScript Enabled/Disabled

Test behavior when JavaScript is disabled.

```typescript
test.use({ javaScriptEnabled: false });

test("no JavaScript", async ({ page }) => {
  await page.goto("https://example.com");
  // Only server-rendered or static content is available
  // Client-side JavaScript will not execute
});
```

Library API:

```typescript
test("disable JS via context", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("https://example.com");
  await context.close();
});
```
