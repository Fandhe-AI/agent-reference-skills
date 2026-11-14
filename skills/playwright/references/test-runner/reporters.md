# Reporters

Playwright Test includes several built-in reporters and supports custom reporter implementations. Multiple reporters can run simultaneously.

## Built-in Reporters

### List Reporter (default for local)

Prints one line per test with a status indicator.

```typescript
export default defineConfig({
  reporter: 'list',
});
```

Options:
- `printSteps: true` -- render individual test steps
- `omitTags: true` -- omit test tags that are automatically appended to test titles (default `false`)

Environment variables:
- `PLAYWRIGHT_LIST_PRINT_STEPS=1` -- enable step rendering
- `PLAYWRIGHT_LIST_OMIT_TAGS` -- `omitTags`
- `PLAYWRIGHT_FORCE_TTY=1` -- force TTY output
- `FORCE_COLOR=1` -- force colored output

### Line Reporter

Compact single-line output showing the last completed test. Good for large test suites.

```typescript
export default defineConfig({
  reporter: 'line',
});
```

Options and environment variables:
- `omitTags` / `PLAYWRIGHT_LINE_OMIT_TAGS` -- whether to omit test tags that are automatically appended to test titles (default `false`)

### Dot Reporter (default for CI)

Minimal output using a single character per test.

| Character | Meaning |
|-----------|---------|
| `·` | Passed |
| `F` | Failed |
| `x` | Failed/timeout with retry remaining |
| `±` | Flaky (failed then passed on retry) |
| `T` | Timed out |
| `°` | Skipped |

```typescript
export default defineConfig({
  reporter: 'dot',
});
```

Options and environment variables:
- `omitTags` / `PLAYWRIGHT_DOT_OMIT_TAGS` -- whether to omit test tags that are automatically appended to test titles (default `false`)

### Failures Reporter

Prints failures and successful retries as they occur, followed by a summary, without progress output (v1.65).

```bash
npx playwright test --reporter=failures
```

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'failures',
});
```

Use `TestConfig.quiet` to suppress test stdout and stderr. Options and environment variables:
- `omitTags` / `PLAYWRIGHT_FAILURES_OMIT_TAGS` -- whether to omit test tags appended to test titles (default `false`)
- `PLAYWRIGHT_FORCE_TTY` -- whether to produce output suitable for a live terminal (default `true` in TTY mode)
- `FORCE_COLOR` / `NO_COLOR` -- force or disable colored output

### HTML Reporter

Generates a self-contained web-based report with filtering and drill-down.

```typescript
export default defineConfig({
  reporter: [['html', {
    // 'always' | 'never' | 'on-failure' (default: 'on-failure')
    open: 'on-failure',

    // Output directory (default: 'playwright-report')
    outputFolder: 'my-report',

    // Host for serving (default: 'localhost')
    host: '0.0.0.0',

    // Port for serving (default: 9323)
    port: 9323,

    // Base URL for externally stored attachments
    attachmentsBaseURL: 'https://storage.example.com/',
  }]],
});
```

View a previously generated report:

```bash
npx playwright show-report
```

Environment variables:
- `PLAYWRIGHT_HTML_OPEN` -- override `open` option
- `PLAYWRIGHT_HTML_OUTPUT_DIR` -- override `outputFolder`
- `PLAYWRIGHT_HTML_TITLE` -- set report title
- `PLAYWRIGHT_HTML_ONLY_FAILURES` -- `onlyFailures` (v1.65): see [Report only failures](#report-only-failures)
- `PLAYWRIGHT_HTML_MERGE_FILES` -- `mergeFiles` (v1.62): if true, tests are grouped by their top-level `test.describe()` title instead of the file they belong to. Supports `true`, `1`, `false`, and `0` (default `false`)

### Blob Reporter

Stores all test details in `.zip` files for later report merging. Primary use case: combining sharded CI results.

```typescript
export default defineConfig({
  reporter: [['blob', {
    // Output directory (default: 'blob-report')
    outputDir: 'my-blob-report',

    // Custom file name
    fileName: 'report.zip',
  }]],
});
```

Merge blob reports:

```bash
npx playwright merge-reports --reporter html ./all-blob-reports
```

Environment variables:
- `PLAYWRIGHT_BLOB_OUTPUT_DIR`
- `PLAYWRIGHT_BLOB_OUTPUT_NAME`

Since v1.65 the blob reporter again deletes the content of its output directory before it writes the report (v1.64 kept reports with other names).

### JSON Reporter

Outputs structured JSON with complete test execution data.

```typescript
export default defineConfig({
  reporter: [['json', { outputFile: 'test-results.json' }]],
});
```

Environment variables:
- `PLAYWRIGHT_JSON_OUTPUT_NAME` or `PLAYWRIGHT_JSON_OUTPUT_FILE`
- `PLAYWRIGHT_JSON_ONLY_FAILURES` -- `onlyFailures` (v1.65): see [Report only failures](#report-only-failures)

```bash
PLAYWRIGHT_JSON_OUTPUT_NAME=results.json npx playwright test --reporter=json
```

### JUnit Reporter

XML output compatible with CI/CD systems (Jenkins, GitLab, etc.).

```typescript
export default defineConfig({
  reporter: [['junit', {
    outputFile: 'results.xml',

    // Remove ANSI control sequences from output
    stripANSIControlSequences: true,

    // Include project name in test name
    includeProjectInTestName: true,

    // Custom suite ID
    suiteId: 'my-suite',

    // Custom suite name
    suiteName: 'Playwright Tests',

    // Omit test tags automatically appended to failure details (default: false)
    omitTags: true,
  }]],
});
```

Environment variables:
- `PLAYWRIGHT_JUNIT_OUTPUT_NAME`
- `PLAYWRIGHT_JUNIT_STRIP_ANSI`
- `PLAYWRIGHT_JUNIT_OMIT_TAGS` -- `omitTags`
- `PLAYWRIGHT_JUNIT_ONLY_FAILURES` -- `onlyFailures` (v1.65): see [Report only failures](#report-only-failures); retains every attempt regardless of `includeRetries`

### Report only failures

Since v1.65 the HTML, JSON and JUnit reporters accept `onlyFailures`. It keeps only tests with unexpected outcomes (including unexpected passes), flaky tests (included even when they pass on retry) and interrupted tests. Every attempt of an included test is retained, including successful retries.

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['failures'],
    ['html', { onlyFailures: true }],
  ],
});
```

Configure `onlyFailures` independently for each reporter. To use it when merging blob reports, pass the configuration file: `npx playwright merge-reports --config=playwright.config.ts ./blob-report`.

### Perfetto Reporter

Produces a Trace Event Format JSON file that can be opened in the Perfetto UI (`https://ui.perfetto.dev`) or in `chrome://tracing`. It renders the test run as a timeline with a lane per worker, where every test is a slice containing its before/after hooks, fixtures and steps as nested slices. Every slice carries the details of the test or step in its trace event arguments, including source locations, `TestStep.params`, tags, annotations, errors, stdio and paths to the attachment files.

```bash
npx playwright test --reporter=perfetto
```

By default the report is written to `test-results/perfetto.json`. When the output file name ends with `.gz`, the report is gzipped on the fly, which both viewers accept and which is worth it for large test runs.

```typescript
export default defineConfig({
  reporter: [['perfetto', { outputFile: 'perfetto.json.gz' }]],
});
```

| Environment Variable | Config Option | Description | Default |
| --- | --- | --- | --- |
| `PLAYWRIGHT_PERFETTO_OUTPUT_DIR` | | Directory to save the output file. Ignored if output file is specified. | `test-results` |
| `PLAYWRIGHT_PERFETTO_OUTPUT_NAME` | | Base file name for the output, relative to the output dir. | `perfetto.json` |
| `PLAYWRIGHT_PERFETTO_OUTPUT_FILE` | `outputFile` | Full path to the output file. If defined, `PLAYWRIGHT_PERFETTO_OUTPUT_DIR` and `PLAYWRIGHT_PERFETTO_OUTPUT_NAME` will be ignored. | `undefined` |

### GitHub Actions Reporter

Automatically annotates failures inline in GitHub Actions pull request diffs.

```typescript
export default defineConfig({
  reporter: process.env.CI ? 'github' : 'list',
});
```

Use as a single reporter, not with matrix strategy (to avoid duplicate annotations).

The `github` reporter accepts `omitTags` (or the `PLAYWRIGHT_GITHUB_OMIT_TAGS` environment variable) to suppress test tags in its annotations, for example `reporter: [['github', { omitTags: true }]]`.

## Multiple Reporters

Configure multiple reporters simultaneously using an array.

```typescript
export default defineConfig({
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'results.xml' }],
  ],
});
```

## Conditional Reporters

```typescript
export default defineConfig({
  reporter: process.env.CI
    ? [['dot'], ['blob'], ['github']]
    : [['list'], ['html', { open: 'on-failure' }]],
});
```

## CLI Override

```bash
npx playwright test --reporter=line
npx playwright test --reporter=json
npx playwright test --reporter="./my-reporter.ts"

# Append reporters to those in the config instead of replacing them (v1.63)
npx playwright test --add-reporter=json
```

Other additions: the HTML report renders a duration waterfall next to test steps (v1.63, release notes); `show-report` accepts `.zip` files (v1.60, release notes). The `junit` reporter reports some former `<failure>` entries as `<error>` (v1.59).

## Custom Reporter

Implement the `Reporter` interface with lifecycle methods.

```typescript
// my-reporter.ts
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase, result: TestResult) {
    console.log(`Starting test: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test: ${test.title} - ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
}

export default MyReporter;
```

### Reporter Interface Methods

| Method | Called When |
|--------|-----------|
| `onBegin(config, suite)` | Test run starts |
| `onTestBegin(test, result)` | Individual test starts |
| `onTestEnd(test, result)` | Individual test completes |
| `onStepBegin(test, result, step)` | Test step starts |
| `onStepEnd(test, result, step)` | Test step completes |
| `preprocess({ config, suite, testRun })` | (v1.62, optional, async) After the configuration has been resolved and before `onBegin` |
| `onError(error, workerInfo?)` | Global error occurs; `workerInfo` (v1.60) is `undefined` for errors not associated with a specific worker |
| `onEnd(result)` | Test run completes |
| `onExit()` | Reporter should clean up |
| `printsToStdio()` | Return `true` if reporter prints to stdio (prevents default reporter) |

### Reporter.preprocess and TestRun (v1.62)

`preprocess` "allows a reporter to mark individual tests as skipped, excluded, fixed or failing". Its `params` object carries `config` (resolved `FullConfig`), `suite` (the root `Suite` with the projects, files and test cases that will run) and `testRun` (a `TestRun`: "control which tests will run and their expected status"). The suite reflects `--project`, `--grep`/`--grep-invert` and `.only` filtering. Setup and dependency projects are readonly and cannot be changed through `TestRun`. The suite ignores `--shard` and always contains the full, un-sharded corpus; Playwright applies its built-in sharding after `preprocess` returns, unless the reporter calls `testRun.skipSharding()`.

| TestRun method | Description |
| --- | --- |
| `exclude(test)` | Excludes a `TestCase` or `Suite` from the run. Excluded tests do not appear in the report and their bodies are not executed. The root suite cannot be excluded. |
| `skip(test, reason?)` | Skips a test or every test in a suite. Bodies are not executed and the tests are reported as skipped. |
| `fixme(test, reason?)` | Marks a test or every test in a suite as fixme. Bodies are not executed and the tests are reported as skipped. |
| `fail(test, reason?)` | Marks a test or every test in a suite as "should fail"; Playwright runs the tests and ensures they are actually failing. |
| `mode(suite)` | (v1.65) Returns the execution mode (`"serial"`, `"parallel"` or `"default"`) configured for a suite with `test.describe.configure()`, `test.describe.serial()` or `test.describe.parallel()`. A suite without an explicit mode inherits its parent's mode; project suites use `"parallel"` when `fullyParallel` is enabled and `"default"` otherwise; the root suite uses `"default"`. An explicit `"default"` suite does not inherit `"parallel"`. Can only be called during `preprocess`, and can inspect setup and teardown projects. |
| `skipSharding()` | Disables Playwright's built-in shard filter for this run, leaving sharding to the reporter (typically by calling `exclude` on out-of-shard tests). |

`reason` is an optional explanation surfaced as the annotation description.

```typescript
class MyReporter implements Reporter {
  async preprocess({ suite, testRun }) {
    for (const test of suite.allTests()) {
      if (test.title.includes('flaky-known'))
        testRun.skip(test, 'known flaky');
    }
  }
}
```

### TestStep.params and subtitle (v1.63)

`onStepBegin` / `onStepEnd` receive a `TestStep` with `params` ("step-dependent parameters, when available"; for Playwright API calls the target `locator` and call arguments such as `url`, for `test.step` the parameters passed by the test author) and `subtitle` (a user-friendly subtitle that complements the title: the target locator or navigation url for API calls, the author-supplied `subtitle` for `test.step`). Playwright API calls report only a curated set of arguments and long string values are truncated.

### Using a Custom Reporter

```typescript
// playwright.config.ts
export default defineConfig({
  reporter: './my-reporter.ts',
});

// With options
export default defineConfig({
  reporter: [['./my-reporter.ts', { outputFile: 'custom.log' }]],
});
```

### Custom Reporter with Constructor Options

```typescript
class MyReporter implements Reporter {
  private outputFile: string;

  constructor(options: { outputFile?: string } = {}) {
    this.outputFile = options.outputFile ?? 'report.log';
  }

  onEnd(result: FullResult) {
    // Write results to this.outputFile
  }
}

export default MyReporter;
```

## Notes

- Since v1.65 the HTML reporter writes to `playwright-report` in the package.json directory, or the current working directory when no package.json is found.
- Source: https://playwright.dev/docs/release-notes (microsoft/playwright v1.65.1 `docs/src/release-notes-js.md`)
- Source: https://playwright.dev/docs/test-reporters (microsoft/playwright v1.65.1 `docs/src/test-reporters-js.md`)
- Source: https://playwright.dev/docs/api/class-testrun (microsoft/playwright v1.65.1 `docs/src/test-reporter-api/class-testrun.md`)
