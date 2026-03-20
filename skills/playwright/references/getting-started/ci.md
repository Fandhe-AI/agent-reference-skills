# Continuous Integration

Running Playwright tests in CI environments, using Docker images for consistent execution, and sharding tests across multiple machines for faster pipelines.

## GitHub Actions

### Basic Workflow

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

Key points:

- `npx playwright install --with-deps` installs browsers and OS-level dependencies.
- The report upload step uses `if: ${{ !cancelled() }}` to ensure the report is saved even when tests fail.

## Docker

Playwright publishes official Docker images to the Microsoft Artifact Registry. These images include all browsers and system dependencies pre-installed.

### Image Tags

| Image | Base |
|---|---|
| `mcr.microsoft.com/playwright:v1.58.2-noble` | Ubuntu 24.04 LTS (Noble) |
| `mcr.microsoft.com/playwright:v1.58.2-jammy` | Ubuntu 22.04 LTS (Jammy) |
| `mcr.microsoft.com/playwright:v1.58.2` | Default (latest Ubuntu) |

Always pin to a specific version tag.

### Running Tests in Docker

```bash
docker run -it --rm --ipc=host mcr.microsoft.com/playwright:v1.58.2-noble /bin/bash
```

Important flags:

| Flag | Purpose |
|---|---|
| `--ipc=host` | Prevents Chromium from running out of memory (uses host shared memory) |
| `--init` | Prevents zombie processes and avoids special PID=1 signal handling |
| `--cap-add=SYS_ADMIN` | Resolves Chromium sandbox launch errors in local Docker |

### Dockerfile

```dockerfile
FROM node:20-bookworm

RUN npx -y playwright@1.58.2 install --with-deps
```

This installs Node.js, Playwright browsers, and all required system dependencies.

### Untrusted Content

For web scraping or testing untrusted sites, add security restrictions:

```bash
docker run -it --rm --ipc=host \
  --user pwuser \
  --security-opt seccomp=seccomp_profile.json \
  mcr.microsoft.com/playwright:v1.58.2-noble /bin/bash
```

### Remote Playwright Server

Start a Playwright server in Docker and connect from the host:

```bash
# Start server
docker run -p 3000:3000 --rm --init -it \
  --workdir /home/pwuser --user pwuser \
  mcr.microsoft.com/playwright:v1.58.2-noble \
  /bin/sh -c "npx -y playwright@1.58.2 run-server --port 3000 --host 0.0.0.0"
```

```bash
# Connect from host
PW_TEST_CONNECT_WS_ENDPOINT=ws://127.0.0.1:3000/ npx playwright test
```

### Limitations

- Alpine Linux is not supported (Firefox and WebKit require glibc).
- Images are intended for testing and development purposes.

## Sharding

Sharding splits tests across multiple machines to reduce total execution time. Playwright shards at the file level by default.

### Basic Usage

The `--shard` flag uses the format `--shard=x/y` where `x` is the shard index (1-based) and `y` is the total number of shards:

```bash
npx playwright test --shard=1/4
npx playwright test --shard=2/4
npx playwright test --shard=3/4
npx playwright test --shard=4/4
```

Running all four in parallel completes the suite approximately four times faster.

### Blob Reporter

Use the `blob` reporter in CI to collect results from each shard, then merge them into a single report.

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: process.env.CI ? "blob" : "html",
});
```

The blob format captures all test results, traces, screenshots, and diffs.

### Merging Reports

After all shards complete, merge blob reports into a unified HTML report:

```bash
npx playwright merge-reports --reporter html ./all-blob-reports
```

Options:

- `--reporter reporter-to-use` -- supports multiple reporters (e.g., `html,github`)
- `--config path/to/config/file` -- use a config file for reporter options

### GitHub Actions with Sharding

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  playwright-tests:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
      - name: Upload blob report to GitHub Actions Artifacts
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1

  merge-reports:
    if: ${{ !cancelled() }}
    needs: [playwright-tests]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Download blob reports from GitHub Actions Artifacts
        uses: actions/download-artifact@v5
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true
      - name: Merge into HTML Report
        run: npx playwright merge-reports --reporter html ./all-blob-reports
      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        with:
          name: html-report--attempt-${{ github.run_attempt }}
          path: playwright-report
          retention-days: 14
```

Key configuration:

- `fail-fast: false` ensures all shards run even if one fails.
- The `merge-reports` job depends on `playwright-tests` and runs even if tests fail (`if: ${{ !cancelled() }}`).
- Blob reports are uploaded with short retention (1 day) since they are intermediate artifacts.
- The merged HTML report is kept for 14 days.

### Balancing Shards

Enable `fullyParallel: true` in the config for test-level granularity instead of file-level sharding. This produces more even distribution when test files vary significantly in size.

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
});
```
