# Playwright CLI

The Playwright CLI (`npx playwright`) provides commands for running tests, generating code, viewing traces, managing browsers, and more.

## Running Tests

```bash
npx playwright test [options] [test-filter...]
```

The `test-filter` argument matches against file paths. Multiple filters narrow by AND logic.

```bash
# Run all tests
npx playwright test

# Run tests in specific files
npx playwright test landing checkout

# Run tests matching a file path pattern
npx playwright test tests/auth/
```

### Execution Options

```bash
# Run in headed mode (default is headless)
npx playwright test --headed

# Run in debug mode (opens Playwright Inspector, sets PWDEBUG=1)
npx playwright test --debug

# Run in interactive UI mode
npx playwright test --ui

# Specify concurrent workers (number or percentage of CPU cores)
npx playwright test --workers 4
npx playwright test --workers 50%

# Run all tests fully in parallel
npx playwright test --fully-parallel
```

### Filtering

```bash
# Filter by test title regex
npx playwright test --grep "login"
npx playwright test -g "login"

# Invert grep (run tests NOT matching pattern)
npx playwright test --grep-invert "slow"

# Run only specific projects
npx playwright test --project chromium --project firefox

# Run only previously failed tests
npx playwright test --last-failed

# Run only tests changed since a Git ref
npx playwright test --only-changed
npx playwright test --only-changed main
```

### Retries and Failure Handling

```bash
# Retry failed tests up to N times
npx playwright test --retries 3

# Stop after first N failures (-x is shorthand for --max-failures 1)
npx playwright test --max-failures 5
npx playwright test -x

# Fail the run if any test is flagged as flaky
npx playwright test --fail-on-flaky-tests

# Succeed even if no tests are found
npx playwright test --pass-with-no-tests

# Fail if test.only() is present (useful in CI)
npx playwright test --forbid-only
```

### Timeouts

```bash
# Set per-test timeout in milliseconds (0 = unlimited)
npx playwright test --timeout 60000

# Set global suite timeout
npx playwright test --global-timeout 600000
```

### Reporters

```bash
# Specify reporter
npx playwright test --reporter list
npx playwright test --reporter dot
npx playwright test --reporter line
npx playwright test --reporter json
npx playwright test --reporter junit
npx playwright test --reporter html
npx playwright test --reporter blob
```

### Snapshots

```bash
# Update snapshots (modes: all, changed, missing, none)
npx playwright test --update-snapshots all
npx playwright test -u all
npx playwright test -u changed
npx playwright test -u missing

# Ignore snapshot expectations entirely
npx playwright test --ignore-snapshots

# Source update method for snapshot changes
npx playwright test --update-source-method patch
npx playwright test --update-source-method 3way
npx playwright test --update-source-method overwrite
```

### Tracing

```bash
# Force tracing mode
npx playwright test --trace on
npx playwright test --trace off
npx playwright test --trace on-first-retry
npx playwright test --trace on-all-retries
npx playwright test --trace retain-on-failure
npx playwright test --trace retain-on-first-failure
```

### Sharding

```bash
# Shard tests across machines (1-based index, format: current/total)
npx playwright test --shard 1/3
npx playwright test --shard 2/3
npx playwright test --shard 3/3
```

### Test Listing and Selection

```bash
# List all tests without running them
npx playwright test --list

# Run tests from a list file
npx playwright test --test-list tests-to-run.txt

# Skip tests in a list file
npx playwright test --test-list-invert tests-to-skip.txt
```

The test list file accepts entries in these formats:

```text
path/to/example.spec.ts
[chromium] > path/to/example.spec.ts
path/to/example.spec.ts > suite name
[chromium] > path/to/example.spec.ts:3:9 > suite > test
```

### Other Options

```bash
# Use a specific config file
npx playwright test --config playwright.ci.config.ts
npx playwright test -c playwright.ci.config.ts

# Specify TypeScript config
npx playwright test --tsconfig tsconfig.test.json

# Set artifact output directory (default: test-results)
npx playwright test --output test-results

# Repeat each test N times
npx playwright test --repeat-each 3

# Skip project dependencies
npx playwright test --no-deps

# Suppress stdout
npx playwright test --quiet
```

## Show Report

Opens the HTML test report in a browser.

```bash
# Open default report
npx playwright show-report

# Open report from a specific directory
npx playwright show-report playwright-report

# Specify host and port
npx playwright show-report --host 0.0.0.0 --port 9323
```

## Install Browsers

Downloads browser binaries required by Playwright.

```bash
# Install all default browsers
npx playwright install

# Install specific browsers
npx playwright install chromium
npx playwright install firefox webkit

# Install with OS-level dependencies
npx playwright install --with-deps
npx playwright install chromium --with-deps

# Force reinstall of stable browser channels
npx playwright install --force

# Dry run (show what would be installed)
npx playwright install --dry-run

# Install headless shell only
npx playwright install --only-shell

# Skip headless shell
npx playwright install --no-shell

# Install only OS dependencies (no browser binaries)
npx playwright install-deps
npx playwright install-deps chromium

# Remove installed browsers
npx playwright uninstall
```

## Code Generation

Opens the test generator to record user interactions as test code.

```bash
# Open codegen with a URL
npx playwright codegen https://example.com

# Specify browser
npx playwright codegen --browser firefox https://example.com
npx playwright codegen -b webkit https://example.com

# Save output to file
npx playwright codegen --output tests/example.spec.ts
npx playwright codegen -o tests/example.spec.ts

# Set target language
npx playwright codegen --target javascript https://example.com

# Set custom test ID attribute
npx playwright codegen --test-id-attribute data-testid https://example.com
```

## Show Trace

Opens the trace viewer to inspect recorded test traces.

```bash
# View a local trace file
npx playwright show-trace trace.zip

# View a remote trace
npx playwright show-trace https://example.com/trace.zip

# Specify browser and host/port
npx playwright show-trace --browser chromium trace.zip
npx playwright show-trace --host 0.0.0.0 --port 8080 trace.zip
```

## Merge Reports

Merges multiple blob reports from sharded test runs into a single report.

```bash
# Merge blob reports from a directory
npx playwright merge-reports blob-report

# Merge with a specific reporter
npx playwright merge-reports --reporter html blob-report
npx playwright merge-reports --reporter json blob-report
npx playwright merge-reports --reporter junit blob-report

# Use a config file for reporter settings
npx playwright merge-reports --config merge.config.ts blob-report
```

## Clear Cache

Removes cached browser binaries and other Playwright artifacts.

```bash
npx playwright clear-cache
```

## Version and Help

```bash
# Display installed Playwright version
npx playwright --version

# Show help for all commands
npx playwright --help

# Show help for a specific command
npx playwright test --help
npx playwright codegen --help
npx playwright install --help
```
