# Tracing

`Tracing` (since v1.12) collects and saves Playwright traces, openable in Trace Viewer. Accessed as `context.tracing`.

## Signature / Usage

```ts
const browser = await chromium.launch();
const context = await browser.newContext();
await context.tracing.start({ screenshots: true, snapshots: true });
const page = await context.newPage();
await page.goto('https://playwright.dev');
await context.tracing.stop({ path: 'trace.zip' });
```

Multiple chunks on one context:

```ts
await context.tracing.start({ screenshots: true, snapshots: true });
await context.tracing.startChunk();
await page.getByText('Get Started').click();
await context.tracing.stopChunk({ path: 'trace1.zip' });
```

HAR recording:

```ts
await context.tracing.startHar('trace.har');
await page.goto('https://playwright.dev');
await context.tracing.stopHar();
```

## Methods

| Method | Description |
|--------|-------------|
| `start(options?)` | Start tracing. Returns a `Disposable`; disposing stops tracing without saving |
| `stop({ path? })` | Stop tracing; `path` exports the trace file |
| `startChunk({ title?, name? })` | Start a new trace chunk (v1.15). Returns a `Disposable`; disposing stops without saving |
| `stopChunk({ path? })` | Stop the chunk; `path` exports the trace collected since the last `startChunk` |
| `startHar(path, options?)` | Record a HAR of network activity (v1.60). Written on `stopHar()` or disposal. One HAR recording at a time per `Tracing` |
| `stopHar()` | Stop HAR recording and save to the `startHar` path |
| `group(name, { location? })` | Start a named group in the trace (v1.49); returns `Disposable`. Groups nest |
| `groupEnd()` | Close the last group |

## Options / Props

### start

| Name | Type | Description |
|------|------|-------------|
| `name` | string | Prefix for intermediate trace files in `BrowserType.launch` `tracesDir`. Final zip name comes from `stop({ path })` |
| `screenshots` | boolean | Capture screenshots for the timeline preview |
| `snapshots` | `boolean \| { dom?: boolean; aria?: boolean; screen?: boolean }` | JS only. Snapshots on every action; `true` is shorthand for `{ dom: true }` |
| `ariaSnapshots` | boolean | Java/Python/C# only (v1.63). Aria snapshot on every action |
| `screenSnapshots` | boolean | Java/Python/C# only (v1.63). Screenshot on every action |
| `sources` | boolean | Include source files for trace actions (Java: dirs via `PLAYWRIGHT_JAVA_SRC`) |
| `title` | string | Trace name shown in Trace Viewer |
| `live` | boolean | Write an unarchived trace updated in real time instead of zipping at the end (v1.59) |

### startHar

| Name | Type | Description |
|------|------|-------------|
| `path` | string | HAR file path; `.zip` saves an archive with response bodies as separate files |
| `content` | `"omit" \| "embed" \| "attach"` | Content handling. Default `attach` for `.zip`, `embed` otherwise |
| `mode` | `"full" \| "minimal"` | `minimal` records only what routing from HAR needs. Default `full` |
| `urlFilter` | string \| RegExp | Glob/regex filter for stored requests |
| `resourcesDir` | string | JS only. With `content: 'attach'`, directory for response bodies; incompatible with `.zip` |

## Notes

- Prefer enabling tracing in the Playwright Test config (`trace` test option): `context.tracing` captures browser operations and network activity but not test assertions such as `expect` calls.
- `group` is marked caution in the docs: use `test.step` instead when available.
- `snapshots` shape differs by language: JS accepts an object (`dom` / `aria` / `screen`); other languages use `snapshots` plus `ariaSnapshots` / `screenSnapshots`.
- Source: https://playwright.dev/docs/api/class-tracing (microsoft/playwright v1.64.1 `docs/src/api/class-tracing.md`)

## Related

- [screencast.md](./screencast.md)
- [browser-context.md](./browser-context.md)
