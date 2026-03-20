# Portable Stories

Reuse Storybook stories in external test environments by manually managing the story composition pipeline.

## Overview

Storybook normally handles story composition automatically in the browser. Portable stories expose that pipeline so stories can run in Vitest, Jest, or Playwright Component Tests.

**Story pipeline stages:**
1. Apply project annotations — `setProjectAnnotations()`
2. Compose story — `composeStories()` or `composeStory()`
3. Run story — `.run()` method (mounts component + executes loaders and play function)

> Note: Storybook recommends using the Vitest addon for automatic story transformation when possible.

## Index

| Name | Description | Path |
|------|-------------|------|
| `Portable Stories — Vitest` | API for using stories in Vitest tests | [./vitest.md](./vitest.md) |
| `Portable Stories — Jest` | API for using stories in Jest tests | [./jest.md](./jest.md) |
| `Portable Stories — Playwright` | API for using stories in Playwright CT | [./playwright.md](./playwright.md) |

## Related

- [CSF](../csf.md)
- [ArgTypes](../arg-types.md)
- [Parameters](../parameters.md)
