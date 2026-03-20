# Running Tests in CI

Run Storybook component tests in CI environments using the Vitest addon.

## Overview

Running Storybook tests in CI uses the same Vitest setup as local development. Storybook Test uses Playwright to render stories in a real browser, so CI environments need Playwright browser binaries available.

## Setup

### 1. Define a script in `package.json`

```json
{
  "scripts": {
    "test-storybook": "vitest --project=storybook"
  }
}
```

### 2. Add a CI workflow

**GitHub Actions** (`.github/workflows/test-ui.yml`):

```yaml
name: UI Tests
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.58.2-noble
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22.12.0
      - run: npm ci
      - run: npm run test-storybook
```

Other supported CI platforms: GitLab Pipelines, Bitbucket Pipelines, CircleCI, Travis CI, Jenkins, Azure Pipelines.

## Usage

### Pass a deployed Storybook URL for debugging

In CI workflow:

```yaml
env:
  SB_URL: '${{ github.event.deployment_status.environment_url }}'
```

In `vitest.config.ts`:

```typescript
storybookUrl: process.env.SB_URL
```

### With code coverage

```bash
npm run test-storybook -- --coverage
```

## Notes

- Use Docker images with Playwright pre-installed (e.g., `mcr.microsoft.com/playwright`) for optimal performance
- If the Vitest addon cannot be used, the test-runner also supports CI execution
- Visual test changes accepted locally auto-accept in CI to avoid duplicate reviews

## Related

- [Vitest Addon](./vitest-addon.md)
- [Test Coverage](./test-coverage.md)
- [Visual Testing](./visual-testing.md)
