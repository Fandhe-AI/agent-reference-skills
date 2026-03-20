# Portable Stories — Vitest

API for reusing Storybook stories in Vitest tests.

## Overview

Import from `@storybook/your-framework`. Storybook recommends the Vitest addon for automatic transformation, but this API is available for direct usage.

## `setProjectAnnotations()`

Apply project-level annotations once before all tests run.

### Signature

```typescript
setProjectAnnotations(
  projectAnnotations: ProjectAnnotation | ProjectAnnotation[]
) => ProjectAnnotation
```

### Usage

```typescript
// vitest.setup.ts
import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/your-framework';
import * as previewAnnotations from './.storybook/preview';
import * as addonAnnotations from 'my-addon/preview';

const annotations = setProjectAnnotations([previewAnnotations, addonAnnotations]);
beforeAll(annotations.beforeAll);
```

---

## `composeStories()`

Transform all stories from a CSF file into testable components with all annotations applied.

### Signature

```typescript
composeStories(
  csfExports: CSF file exports,
  projectAnnotations?: ProjectAnnotations
) => Record<string, ComposedStoryFn>
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `csfExports` | Yes | Full `import * as stories from './Button.stories'` |
| `projectAnnotations` | No | Override project-level annotations |

### Return Value

Object mapping story names to composed story functions. Each function exposes:
- `args`, `argTypes`, `id`, `parameters`, `storyName`, `tags`
- `.play()` — execute play function only
- `.run()` — mount component and execute full lifecycle

### Usage

```typescript
import { composeStories } from '@storybook/your-framework';
import * as stories from './Button.stories';

const { Primary, Secondary } = composeStories(stories);

test('renders primary', async () => {
  await Primary.run();
});

test('renders with override', async () => {
  await Primary.run({ args: { ...Primary.args, children: 'Hello' } });
});
```

---

## `composeStory()`

Compose a single story for targeted testing.

### Signature

```typescript
composeStory(
  story: Story export,
  componentAnnotations: Meta,
  projectAnnotations?: ProjectAnnotations,
  exportsName?: string
) => ComposedStoryFn
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `story` | Yes | Individual named story export |
| `componentAnnotations` | Yes | Default export (Meta) from stories file |
| `projectAnnotations` | No | Override project annotations |
| `exportsName` | No | Story export name for unique identification |

### Usage

```typescript
import { composeStory } from '@storybook/your-framework';
import meta, { Primary as PrimaryStory } from './Button.stories';

const Primary = composeStory(PrimaryStory, meta);

test('renders primary', async () => {
  await Primary.run();
});
```

## Notes

- Include addon `preview` exports in `setProjectAnnotations()` if stories rely on addon decorators/loaders
- Assertions inside play functions cause the test to fail when they fail
- Override globals per-test: `composeStory(story, meta, { globals: { locale: 'en' } })`
- For Next.js, install `@storybook/nextjs-vite` for proper Vitest integration

## Related

- [Portable Stories — Jest](./jest.md)
- [Portable Stories — Playwright](./playwright.md)
- [CSF](../csf.md)
