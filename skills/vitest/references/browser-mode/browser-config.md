# Browser Config (browser.*)

All `test.browser.*` options in one place: enabling, providers (`playwright` / `webdriverio` / `preview`), instances, UI, locators, screenshots, tracing and commands.

## Signature / Usage

```ts
// vitest.config.js
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: { slowMo: 50, channel: 'chrome-beta' },
        actionTimeout: 5_000,
      }),
      instances: [
        { browser: 'chromium' },
        {
          browser: 'firefox',
          // overriding options only for a single instance; this will NOT merge with the parent one
          provider: playwright({
            launchOptions: { firefoxUserPrefs: { 'browser.startup.homepage': 'https://example.com' } },
          }),
        },
      ],
    },
  },
})
```

```sh
vitest --browser.enabled --browser.headless
```

Provider factories: `playwright()` from `@vitest/browser-playwright`, `webdriverio()` from `@vitest/browser-webdriverio`, `preview()` from `@vitest/browser-preview`.

Custom provider (highly experimental, may change between patches):

```ts
export interface BrowserProvider {
  name: string
  mocker?: BrowserModuleMocker
  readonly initScripts?: string[]
  /** @experimental opt-in into file parallelisation */
  supportsParallelism: boolean
  getCommandsContext: (sessionId: string) => Record<string, unknown>
  openPage: (sessionId: string, url: string) => Promise<void>
  getCDPSession?: (sessionId: string) => Promise<CDPSession>
  close: () => Awaitable<void>
}
```

Playwright remote server:

```ts
provider: playwright({
  connectOptions: {
    wsEndpoint: 'ws://127.0.0.1:6677/',
    exposeNetwork: '<loopback>',
  },
}),
```

Custom screenshot comparator and path resolvers:

```ts
type Comparator<Options> = (
  reference: { metadata: { height: number; width: number }; data: TypedArray },
  actual: { metadata: { height: number; width: number }; data: TypedArray },
  options: { createDiff: boolean } & Options
) => Promise<{ pass: boolean; diff: TypedArray | null; message: string | null }>
  | { pass: boolean; diff: TypedArray | null; message: string | null }

expect: {
  toMatchScreenshot: {
    comparatorName: 'pixelmatch',
    comparatorOptions: { threshold: 0.2, allowedMismatchedPixels: 100 },
    resolveScreenshotPath: ({ arg, browserName, ext, testFileName }) =>
      `custom-screenshots/${testFileName}/${arg}-${browserName}${ext}`,
  },
}
```

BrowserScript shape for `orchestratorScripts`:

```ts
export interface BrowserScript {
  id?: string      // default `injected-${index}.js`
  content?: string // processed by Vite plugins if type is "module"
  src?: string     // resolved by Vite
  async?: boolean
  type?: string    // default 'module'
}
```

## Options / Props

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| browser.enabled | boolean | `false` | Run all tests in a browser. CLI `--browser`, `--browser.enabled=false`. Requires `provider` and at least one `instance` |
| browser.instances | BrowserConfig[] | `[]` | Multiple browser setups; each needs a `browser` field |
| browser.provider | BrowserProviderOption | | Provider factory result |
| browser.headless | boolean | `process.env.CI` | Headless mode. CLI `--browser.headless` |
| browser.ui | boolean | `!isCI` | Inject Vitest UI into the page. CLI `--browser.ui=false` |
| browser.detailsPanelPosition | `'right' \| 'bottom'` | `'right'` | Default Vitest UI details panel position. CLI `--browser.detailsPanelPosition=<v>` |
| browser.viewport | `{ width, height }` | `414x896` | Default iframe viewport |
| browser.connectTimeout | number | `60_000` | ms allowed for the browser WebSocket connection to Vitest |
| browser.testerHtmlPath | string | | HTML entry point (relative to project root), processed with `transformIndexHtml` |
| browser.orchestratorScripts | BrowserScript[] | `[]` | Scripts injected into the orchestrator HTML before test iframes start |
| browser.dependencySourcemaps | boolean | `true` | Serve `node_modules` sourcemaps to the browser in headless runs |
| browser.trackUnhandledErrors | boolean | `true` | Track uncaught errors; `false` removes all Vitest error handlers |
| browser.screenshotDirectory | string | `__screenshots__` in the test file directory | Screenshots directory relative to `root` |
| browser.screenshotFailures | boolean | `!browser.ui` | Take screenshots when a test fails |
| browser.commands | Record<string, BrowserCommand> | `{ readFile, writeFile, ... }` | Custom commands importable from `vitest/browser` |
| browser.locators.testIdAttribute | string | `data-testid` | Attribute used by `getByTestId` |
| browser.locators.exact | boolean | `true` | Default exact (case-sensitive, whole-string) text matching; per-call `exact` overrides |
| browser.locators.errorFormat (5.0.0) | `'html' \| 'aria' \| 'all'` | `'all'` | What is printed when a locator finds nothing (HTML subtree, ARIA snapshot, or ARIA then HTML) |
| browser.expect.toMatchScreenshot | object | | Default options for `toMatchScreenshot` plus `resolveScreenshotPath`, `resolveDiffPath`, `screenshotDirectory`, `comparators` |
| browser.expect.toMatchScreenshot.screenshotDirectory | string | `__screenshots__` | Reference screenshot directory name |
| browser.expect.toMatchScreenshot.resolveScreenshotPath | `(data: PathResolveData) => string` | path.resolve(root, testFileDirectory, screenshotDirectory, testFileName, arg-browserName-platform + ext) | Where reference screenshots are stored |
| browser.expect.toMatchScreenshot.resolveDiffPath | `(data: PathResolveData) => string` | path.resolve(root, attachmentsDir, testFileDirectory, testFileName, arg-browserName-platform + ext) | Where diff images are stored |
| browser.expect.toMatchScreenshot.comparators | Record<string, Comparator> | | Register custom comparison algorithms |
| browser.trace | `'on' \| 'off' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure' \| object` | `'off'` | Playwright trace capture (Playwright only). CLI `--browser.trace=on` |
| browser.trace (object) | `{ mode, tracesDir?, screenshots?: boolean (true), snapshots?: boolean (true) }` | | `tracesDir` defaults to `__traces__` next to the test file |
| browser.traceView (5.0.0, experimental) | `boolean \| { enabled?, recordCanvas?, inlineImages? }` | `false` | Built-in trace view. CLI `--browser.traceView`, `--browser.traceView.enabled`, `--browser.traceView.inlineImages`, `--browser.traceView.recordCanvas`; each sub-option defaults to `false` |

`PathResolveData` fields: `arg`, `ext`, `browserName`, `platform`, `screenshotDirectory`, `root`, `testFileDirectory`, `testFileName`, `testName`, `attachmentsDir`, `project` (4.1.6, experimental).

Playwright provider options:

| Option | Default | Description |
|--------|---------|-------------|
| launchOptions | | Passed to `playwright[browser].launch`; `launch.headless` is ignored (use `browser.headless`); `channel: 'chromium'` opts into new Chromium headless mode |
| connectOptions | | Passed to `playwright[browser].connect`; `wsEndpoint` connects to an existing Playwright server (e.g. `playwright run-server`) |
| contextOptions | | Passed to `browser.newContext()` (one context per test file); `ignoreHTTPSErrors: true` and `serviceWorkers: 'allow'` are always set |
| actionTimeout | no timeout | Default wait for accessibility checks and the action; per action via `{ timeout }` |
| persistentContext (4.1.0) | `false` | `boolean \| string`; `true` stores user data in `./node_modules/.cache/vitest-playwright-user-data`, a string is a custom directory; ignored when running in parallel |

## Notes

- Every instance inherits root config options (e.g. `setupFile` arrays are combined; `testerHtmlPath` is inherited). `globalSetup` of the config defining `instances` runs once for all instances; those defined in an instance run only for it. Instances become separate test projects sharing one Vite server. Available instance `browser` options: `browser`, `headless`, `locators`, `viewport`, `testerHtmlPath`, `screenshotDirectory`, `screenshotFailures`, `provider`.
- Provider options on an instance override the parent and are NOT merged.
- Playwright: Vitest opens a single page for all tests in a file, so isolation is per test file. Prefer `browser.viewport` over `contextOptions.viewport` (lost in headless). `connectOptions` forwards `launchOptions` via the `x-playwright-launch-options` header (works with `playwright run-server`).
- WebdriverIO provider (`@vitest/browser-webdriverio`) is community-maintained (vitest-community). It accepts the `remote` function parameters; test runner options and nested capabilities are ignored; `capabilities.browserName` is ignored (use `instances.browser`). Headful Chrome on Linux CI needs a display: `xvfb-run npm test`, otherwise a misleading `session not created: probably user data directory is already in use` can appear.
- Preview provider: no headless mode, no multiple instances of the same browser, only the browser name can be specified, no CDP; `userEvent` is re-exported from `@testing-library/user-event`.
- `browser.trace` is Playwright only and `'on'` is performance heavy; `'retain-on-failure'` deletes traces of passing tests.
- `browser.dependencySourcemaps: false` speeds up runs if you do not debug into dependencies; reported test errors are unaffected.
- Custom commands run in the Vitest Node process and must validate browser-provided input themselves.
- Source: https://vitest.dev/config/browser/enabled and sibling pages `instances`, `headless`, `provider`, `playwright`, `webdriverio`, `preview`, `locators`, `viewport`, `screenshotdirectory`, `screenshotfailures`, `expect`, `trace`, `traceview`, `ui`, `commands`, `connecttimeout`, `dependencysourcemaps`, `detailspanelposition`, `orchestratorscripts`, `testerhtmlpath`, `trackunhandlederrors` (Vitest v5.0.5)

## Related

- [Browser Mode (Getting Started)](./overview.md)
- [Multiple Setups](./multiple-setups.md)
- [Trace View](./trace-view.md)
- [Playwright Traces](./playwright-traces.md)
- [Commands](./commands.md)
- [Visual Regression Testing](./visual-regression-testing.md)
