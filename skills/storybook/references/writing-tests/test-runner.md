# Test runner (Webpack; superseded by the Vitest addon)

Turns every story into an executable test, powered by Jest and Playwright. Stories without a play function are checked for render errors; stories with one also check play-function errors and assertions.

## Signature / Usage

```json
{
  "scripts": {
    "test-storybook": "test-storybook"
  }
}
```

```shell
npm install @storybook/test-runner --save-dev
```

Start Storybook (or point at a published one), then run `test-storybook` in a second terminal. The runner needs either a locally running or a published Storybook.

## Options / Props

CLI options (subset of Jest CLI options):

| Option | Description |
|--------|-------------|
| `-s`, `--index-json` | Run in index json mode (auto-detected; requires compatible Storybook) |
| `--no-index-json` | Disable index json mode |
| `-c`, `--config-dir [dir-name]` | Directory to load Storybook configuration from |
| `--watch` / `--watchAll` | Watch mode / rerun all tests on change |
| `--coverage` | Run coverage tests on stories and components |
| `--coverageDirectory` | Directory for coverage report output |
| `--url` | URL to run tests in (e.g. deployed Storybook) |
| `--browsers` | One or more of `chromium`, `firefox`, `webkit` |
| `--maxWorkers [amount]` | Max worker-pool size |
| `--testTimeout [amount]` | Max ms a test may run before failing |
| `--no-cache` / `--clearCache` | Disable the cache / delete Jest cache dir and exit |
| `--verbose` | Show individual results with suite hierarchy |
| `-u`, `--updateSnapshot` | Re-record failing snapshots |
| `--eject` | Create local `test-runner-jest.config.js` |
| `--json` / `--outputFile` | Print results as JSON / write them to a file (with `--json`) |
| `--junit` | Report in a junit file |
| `--ci` | Fail instead of auto-storing new snapshots |
| `--shard [index/count]` | Requires CI; split execution across machines (e.g. `--shard=1/8`) |
| `--failOnConsole` | Fail tests on browser console errors |
| `--includeTags` / `--excludeTags` / `--skipTags` | Experimental tag filters |

Test hook API (`.storybook/test-runner.js|ts`, experimental, may have breaking changes):

| Hook | Description |
|------|-------------|
| `prepare` | `async prepare({ page, browserContext, testRunnerConfig }) {}` prepares the browser for tests |
| `setup` | `setup() {}` runs once before all tests (the only non-async hook) |
| `preVisit` | `async preVisit(page, context) {}` before a story is first visited |
| `postVisit` | `async postVisit(page, context) {}` after the story is fully rendered |

`context` holds the story `id`, `title`, and `name`. Lifecycle: `setup` -> context generated -> Playwright navigates -> `preVisit` -> render + play function -> `postVisit`.

Tag filtering (`tags` in the config; requires test-runner `0.15`+):

```js
module.exports = {
  tags: {
    include: ['test-only', 'pages'],
    exclude: ['no-tests', 'tokens'],
    skip: ['skip-test', 'layout'],
  },
};
```

## Notes

- Superseded by the Vitest addon (Vitest browser mode) for React, Preact, Vue, Svelte, and Web Components projects; the docs recommend the Vitest addon for any Vite-powered Storybook framework. Keep the test runner for Webpack / RsPack builders or renderers such as Angular (the Webpack-based `@storybook/angular`). `@storybook/angular-vite` (10.6 preview) supports the Vitest addon; standalone runs use `storybookAngularVitest` from `@storybook/angular-vite/vitest`.
- `test-storybook --eject` generates `test-runner-jest.config.js`; `testEnvironmentOptions` can be extended because it uses jest-playwright.
- Deployed Storybook: use `--url` or the `TARGET_URL` environment variable (default target is local port `6006`).
- CLI tag flags take precedence over config-file tags. If the same tag appears in `include` and `exclude`, `exclude` wins and `include` is ignored. Tags must be set at component (`meta`) or story level; importing tags across stories is unsupported.
- `index.json` mode is not compatible with watch mode.
- Other config: `getHttpHeaders` for authenticated deployed Storybooks; helpers `getStoryContext` and `waitForPageReady`; `DEBUG_PRINT_LIMIT` env var changes the 1000-character error truncation.
- Snapshot testing: add a `postVisit` hook; customise snapshot directory via `snapshotResolver` and serialisation via `snapshotSerializers` in `test-runner-jest.config.js` (default serializer: `jest-serializer-html`).
- Coverage: pair with `@storybook/addon-coverage` (Istanbul; `istanbul-lib-instrument` for Webpack, `vite-plugin-istanbul` for Vite). Not supported with `--test` optimized builds unless `disabledAddons` is configured.
- Troubleshooting: timeouts (`Async callback was not invoked within the 15000 ms timeout`) -> reduce `--maxWorkers` (e.g. 2); Yarn PnP unsupported out of the box (switch `nodeLinker` to `node-modules` or install Playwright directly).
- CI recipes exist for `deployment_status` events (GitHub Actions) and for building then serving `storybook-static` with concurrently / http-server / wait-on.
- Source: https://storybook.js.org/docs/writing-tests/integrations/test-runner (Storybook v10.6.2).

## Related

- [Vitest addon](./vitest-addon.md)
- [Vitest addon migration guide](./vitest-addon-migration-guide.md)
- [Snapshot testing](./snapshot-testing.md)
- [Test coverage](./test-coverage.md)
- [Testing in CI](./in-ci.md)
