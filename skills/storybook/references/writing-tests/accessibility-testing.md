# Accessibility Testing

Audit rendered DOM against WCAG rules using the `@storybook/addon-a11y` addon, powered by Deque's axe-core library.

## Overview

The a11y addon automatically catches up to 57% of WCAG issues. Results appear in the Accessibility panel as **Violations**, **Passes**, or **Incomplete** (requires manual verification). It integrates with the Vitest addon for running checks alongside component tests.

## Setup

```bash
npx storybook add @storybook/addon-a11y
```

## Usage

### Global configuration in `.storybook/preview.ts`

```typescript
const preview: Preview = {
  parameters: {
    a11y: {
      context: 'body',
      config: {},
      options: {},
    },
  },
};
```

### Control test behavior per story with `parameters.a11y.test`

| Value | Behavior |
|-------|----------|
| `'off'` | Skip automated testing (manual panel still available) |
| `'todo'` | Run tests; violations shown as warnings |
| `'error'` | Run tests; violations fail in UI and CI |

### Disable automated checks for a specific story

```typescript
export const NonA11yStory: Story = {
  globals: {
    a11y: {
      manual: true,
    },
  },
};
```

### Running tests

**With Vitest addon:** Expand the testing widget in the sidebar, check the Accessibility checkbox, then press "Run component tests."

**In CI:** Tests run automatically for stories with `parameters.a11y.test = 'error'`.

## Notes

- Recommended workflow: set project-level `test: 'error'`, mark known failures with `test: 'todo'`, fix incrementally
- For async components (Suspense, React Server Components), enable the feature flag in `.storybook/main.ts`:
  ```typescript
  features: {
    developmentModeForBuild: true,
  }
  ```
  This enables React's `act` utility for proper async rendering before a11y checks execute

## Related

- [Interaction Testing](./interaction-testing.md)
- [Vitest Addon](./vitest-addon.md)
- [Running in CI](./in-ci.md)
