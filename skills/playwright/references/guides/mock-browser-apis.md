# Mock Browser APIs

Playwright enables mocking of browser APIs and controlling time through `addInitScript`, `exposeFunction`, and the Clock API. This is useful for testing features that depend on experimental APIs, hardware sensors, or time-dependent behavior.

## addInitScript

Inject JavaScript before any page script runs. Since the page may call browser APIs very early during loading, mocks must be set up before navigation.

### Battery API Mock

```typescript
import { test, expect } from "@playwright/test";

test("battery status display", async ({ page }) => {
  await page.addInitScript(() => {
    const mockBattery = {
      level: 0.75,
      charging: true,
      chargingTime: 1800,
      dischargingTime: Infinity,
      addEventListener: () => {},
    };
    // Override the Battery API
    window.navigator.getBattery = async () => mockBattery;
  });

  await page.goto("https://example.com/battery");
  await expect(page.locator("#battery-level")).toHaveText("75%");
});
```

### Object.defineProperty for Read-Only Properties

Direct assignment fails for read-only browser properties. Use `Object.defineProperty` instead:

```typescript
await page.addInitScript(() => {
  // Mock navigator.cookieEnabled (read-only)
  Object.defineProperty(Object.getPrototypeOf(navigator), "cookieEnabled", {
    value: false,
  });
});
```

```typescript
await page.addInitScript(() => {
  // Mock navigator.languages
  Object.defineProperty(Object.getPrototypeOf(navigator), "languages", {
    value: ["ja-JP", "en-US"],
  });
});
```

### Dynamic Mock with State Updates

Create mocks that can be updated during the test:

```typescript
await page.addInitScript(() => {
  const batteryState = {
    level: 0.75,
    charging: true,
    chargingTime: 1800,
    dischargingTime: Infinity,
    _listeners: {} as Record<string, Array<() => void>>,
    addEventListener(event: string, cb: () => void) {
      (this._listeners[event] ??= []).push(cb);
    },
  };

  // Expose for test manipulation
  (window as any).__mockBattery = batteryState;
  (navigator as any).getBattery = async () => batteryState;
});

// Later in the test, change the battery state
await page.evaluate(() => {
  const battery = (window as any).__mockBattery;
  battery.level = 0.15;
  battery.charging = false;
  // Fire event listeners
  battery._listeners["levelchange"]?.forEach((cb: () => void) => cb());
});
```

## exposeFunction

Bridge page-side calls to Node.js test code. Useful for tracking when mocked APIs are invoked:

```typescript
const log: string[] = [];

await page.exposeFunction("logCall", (msg: string) => {
  log.push(msg);
});

await page.addInitScript(() => {
  const originalGetBattery = navigator.getBattery?.bind(navigator);
  (navigator as any).getBattery = async () => {
    (window as any).logCall("getBattery called");
    return originalGetBattery
      ? originalGetBattery()
      : { level: 1, charging: true };
  };
});

await page.goto("https://example.com/battery");
expect(log).toContain("getBattery called");
```

## Clock API

The Clock API controls time-dependent functions: `Date`, `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`, `requestAnimationFrame`, `cancelAnimationFrame`, `requestIdleCallback`, `cancelIdleCallback`, `performance`, and `Event.timeStamp`.

### setFixedTime

Fix `Date.now()` and `new Date()` to a constant value. Timers (`setTimeout`, `setInterval`) still fire naturally:

```typescript
test("shows current date", async ({ page }) => {
  // Fix time to a specific moment
  await page.clock.setFixedTime(new Date("2024-02-02T10:00:00"));

  await page.goto("https://example.com");
  await expect(page.locator("#date")).toHaveText("2/2/2024");
});
```

### install

Initialize the clock for manual control. Must be called before any other clock methods:

```typescript
test("countdown timer", async ({ page }) => {
  // Install clock at a specific time
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });

  await page.goto("https://example.com/timer");

  // Manually advance time
  await page.clock.fastForward("01:00"); // advance 1 minute
});
```

### pauseAt

Pause time at a specific moment after installing the clock:

```typescript
test("time-sensitive feature", async ({ page }) => {
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
  await page.goto("https://example.com");

  // Pause at a specific time
  await page.clock.pauseAt(new Date("2024-02-02T10:00:00"));

  // Time is frozen at 10:00:00
  await expect(page.locator("#clock")).toHaveText("10:00:00");
});
```

### fastForward

Advance time by a duration, firing any pending timers along the way:

```typescript
test("inactivity timeout", async ({ page }) => {
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
  await page.goto("https://example.com/dashboard");

  // Simulate 30 minutes of inactivity
  await page.clock.fastForward("30:00");

  await expect(page.locator("#timeout-warning")).toBeVisible();
});
```

Accepts milliseconds or `"HH:MM"` / `"HH:MM:SS"` string format.

### runFor

Run time for a specific duration with precise timer control:

```typescript
test("animation completes", async ({ page }) => {
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
  await page.goto("https://example.com/animation");

  // Run exactly 2 seconds of timer-based animation
  await page.clock.runFor(2000);

  await expect(page.locator("#progress")).toHaveText("100%");
});
```

### resume

Resume natural time progression after pausing:

```typescript
test("real-time after pause", async ({ page }) => {
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
  await page.goto("https://example.com");

  await page.clock.pauseAt(new Date("2024-02-02T10:00:00"));
  // Do some checks at frozen time...

  // Resume real-time progression
  await page.clock.resume();
});
```

### setSystemTime

Change the system time without affecting timer progression. For advanced scenarios only:

```typescript
test("timezone display", async ({ page }) => {
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
  await page.goto("https://example.com");

  // Jump to a different time
  await page.clock.setSystemTime(new Date("2024-06-15T14:00:00"));

  await expect(page.locator("#current-time")).toHaveText("2:00 PM");
});
```

### Clock Method Order

If you call `install` at any point in your test, it must occur before any other clock-related calls. Violating this order produces undefined behavior.

### Recommended Approach

For most tests, `setFixedTime` is sufficient and simplest:

```typescript
// Preferred for tests that just need a stable Date.now()
await page.clock.setFixedTime(new Date("2024-01-01T12:00:00"));
```

Use `install` + `fastForward` / `runFor` when you need to test timer-dependent logic (setTimeout, setInterval, requestAnimationFrame).
