# Clock

The Clock API lets tests manipulate and control time in the browser, so that time-dependent behavior (rendering, timeouts, scheduled tasks) can be validated without waiting for real time to pass.

## What the Clock Overrides

Once installed, the clock replaces native time-related functions and objects:

- `Date` constructor and `Date.now()`
- `setTimeout` / `clearTimeout`
- `setInterval` / `clearInterval`
- `requestAnimationFrame` / `cancelAnimationFrame`
- `requestIdleCallback` / `cancelIdleCallback`
- `performance`
- `Event.timeStamp`

## setFixedTime

Fix `Date.now()` and `new Date()` to a constant value while timers (`setTimeout`, `setInterval`) keep firing naturally. This is the recommended approach for tests that only need a stable "current time":

```typescript
test("shows current date", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2024-02-02T10:00:00"));

  await page.goto("https://example.com");
  await expect(page.locator("#date")).toHaveText("2/2/2024");
});
```

## install

Initializes the clock for advanced, manual time control (pausing, fast-forwarding, running for a duration). It is suggested to install the clock before navigation:

```typescript
test("countdown timer", async ({ page }) => {
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
  await page.goto("https://example.com/timer");

  await page.clock.fastForward("01:00"); // advance 1 minute
});
```

## Consistent Time and Timers (install + fastForward)

Install the clock, navigate, then jump forward in time. `fastForward` fires due timers at most once, equivalent to closing a laptop lid and reopening it later:

```typescript
test("inactivity timeout", async ({ page }) => {
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
  await page.goto("https://example.com/dashboard");

  await page.clock.fastForward("30:00"); // 30 minutes of inactivity
  await expect(page.locator("#timeout-warning")).toBeVisible();
});
```

## Manually Ticking the Time (pauseAt + runFor)

Pause the clock at a specific moment, then advance it precisely with `runFor`, which fires all time-related callbacks along the way:

```typescript
test("animation completes", async ({ page }) => {
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
  await page.goto("https://example.com/animation");

  await page.clock.pauseAt(new Date("2024-02-02T10:00:00"));
  await page.clock.runFor(2000); // run exactly 2 seconds of timers

  await expect(page.locator("#progress")).toHaveText("100%");
});
```

## resume

Resumes natural time progression and timer execution after `pauseAt`:

```typescript
test("real-time after pause", async ({ page }) => {
  await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
  await page.goto("https://example.com");

  await page.clock.pauseAt(new Date("2024-02-02T10:00:00"));
  // ...checks at frozen time...

  await page.clock.resume();
});
```

## setSystemTime

Sets the system time without triggering timers. Useful for advanced scenarios such as testing responses to timezone changes or seasonal transitions:

```typescript
await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
await page.clock.setSystemTime(new Date("2024-06-15T14:00:00"));
```

## Methods Reference

| Method | Signature | Description |
|--------|-----------|--------------|
| `setFixedTime` | `clock.setFixedTime(time: number \| string \| Date): Promise<void>` | Fixes `Date.now()`/`new Date()`; timers keep running |
| `install` | `clock.install(options?: { time?: number \| string \| Date }): Promise<void>` | Installs fake time-related implementations |
| `pauseAt` | `clock.pauseAt(time: number \| string \| Date): Promise<void>` | Jumps forward and pauses time; timers stay inactive until resumed |
| `fastForward` | `clock.fastForward(ticks: number \| string): Promise<void>` | Jumps forward, firing due timers at most once |
| `runFor` | `clock.runFor(ticks: number \| string): Promise<void>` | Advances time, firing all due timer callbacks |
| `resume` | `clock.resume(): Promise<void>` | Resumes natural time flow after a pause |
| `setSystemTime` | `clock.setSystemTime(time: number \| string \| Date): Promise<void>` | Sets system time without triggering timers |

`ticks` accepts milliseconds or a human-readable string (`"08"`, `"01:00"`, `"02:34:10"`).

## Notes

- If `install` is called at any point in a test, it must occur before any other clock-related call; violating this order produces undefined behavior.
- For most tests, `setFixedTime` is sufficient and simplest. Use `install` + `fastForward` / `runFor` / `pauseAt` when timer-dependent logic (`setTimeout`, `setInterval`, `requestAnimationFrame`) itself needs to be exercised.
- The Clock API section in [Mock Browser APIs](./mock-browser-apis.md) covers the same `page.clock` methods from the angle of mocking browser behavior; this page is the dedicated time-control guide.

## Related

- [Mock Browser APIs](./mock-browser-apis.md)
- [Events](./events.md)
