# Test Coverage

Generate a coverage report showing the percentage of code statements covered by your tested stories.

## Overview

Coverage integrates with the Vitest addon. It measures which parts of your code are exercised by your stories and produces an HTML report.

## Setup

Install the appropriate coverage provider package:

```bash
# For v8 (default)
npm install --save-dev @vitest/coverage-v8

# For Istanbul
npm install --save-dev @vitest/coverage-istanbul
```

## Usage

**Storybook UI:** Toggle the coverage checkbox in the testing widget; results display at `/coverage/index.html`.

**CLI:**

```bash
npm run test-storybook -- --coverage
```

**CI/CD:**

```bash
npx vitest --coverage
```

## Options / Props

### Coverage provider in `vitest.config.ts`

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul', // or 'v8' (default)
    },
  },
});
```

### Watermark thresholds

```typescript
export default defineConfig({
  test: {
    coverage: {
      watermarks: {
        statements: [50, 80], // red below 50, orange 50-80, green above 80
      },
    },
  },
});
```

## Notes

- Coverage in the Storybook UI is calculated only from written stories, not the entire codebase
- Cannot isolate coverage for individual stories or groups
- Coverage is disabled when watch mode is active

## Related

- [Vitest Addon](./vitest-addon.md)
- [Running in CI](./in-ci.md)
