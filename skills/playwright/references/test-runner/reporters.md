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

Environment variables:
- `PLAYWRIGHT_LIST_PRINT_STEPS=1` -- enable step rendering
- `PLAYWRIGHT_FORCE_TTY=1` -- force TTY output
- `FORCE_COLOR=1` -- force colored output

### Line Reporter

Compact single-line output showing the last completed test. Good for large test suites.

```typescript
export default defineConfig({
  reporter: 'line',
});
```

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

### JSON Reporter

Outputs structured JSON with complete test execution data.

```typescript
export default defineConfig({
  reporter: [['json', { outputFile: 'test-results.json' }]],
});
```

Environment variables:
- `PLAYWRIGHT_JSON_OUTPUT_NAME` or `PLAYWRIGHT_JSON_OUTPUT_FILE`

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
  }]],
});
```

Environment variables:
- `PLAYWRIGHT_JUNIT_OUTPUT_NAME`
- `PLAYWRIGHT_JUNIT_STRIP_ANSI`

### GitHub Actions Reporter

Automatically annotates failures inline in GitHub Actions pull request diffs.

```typescript
export default defineConfig({
  reporter: process.env.CI ? 'github' : 'list',
});
```

Use as a single reporter, not with matrix strategy (to avoid duplicate annotations).

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
```

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
| `onError(error)` | Global error occurs |
| `onEnd(result)` | Test run completes |
| `onExit()` | Reporter should clean up |
| `printsToStdio()` | Return `true` if reporter prints to stdio (prevents default reporter) |

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
