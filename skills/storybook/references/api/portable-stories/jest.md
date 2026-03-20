# Portable Stories — Jest

API for reusing Storybook stories in Jest tests.

## Overview

Import from `@storybook/your-framework`. Available since Storybook 8.2.7.

> CSF Factories format eliminates the need for this API — prefer that when available.

## `setProjectAnnotations()`

Apply project-level annotations once before all tests. Call this in your Jest setup file.

### Signature

```typescript
setProjectAnnotations(
  projectAnnotations: ProjectAnnotation | ProjectAnnotation[]
) => ProjectAnnotation
```

### Usage

```typescript
// jest.setup.ts (configured in jest.config.js setupFilesAfterFramework)
import { setProjectAnnotations } from '@storybook/your-framework';
import * as previewAnnotations from './.storybook/preview';

setProjectAnnotations([previewAnnotations]);
```

---

## `composeStories()`

Process all stories from a CSF file into renderable, composed components.

### Signature

```typescript
composeStories(
  csfExports: CSF file exports,
  projectAnnotations?: ProjectAnnotation | ProjectAnnotation[]
) => Record<string, ComposedStoryFn>
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `csfExports` | Yes | Full `import * as stories from './Button.stories'` |
| `projectAnnotations` | No | Override project-level annotations |

### Return Value

Object of composed story functions. Each exposes:
- `args`, `argTypes`, `id`, `parameters`, `storyName`, `tags`
- `.play()` — execute play function only
- `.run()` — mount component + execute play function

### Usage

```typescript
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories';

const { Primary } = composeStories(stories);

test('renders primary button', () => {
  render(<Primary />);
  expect(screen.getByText('Text coming from args')).toBeTruthy();
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
  projectAnnotations?: ProjectAnnotation | ProjectAnnotation[],
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
import { composeStory } from '@storybook/react';
import meta, { Primary as PrimaryStory } from './Button.stories';

const Primary = composeStory(PrimaryStory, meta);

test('renders with override', async () => {
  await Primary.run({ args: { onClick: jest.fn() } });
});
```

## Notes

- Requires Storybook 8.2.7+
- For Next.js: import from `@storybook/nextjs` and use `next/jest.js` transformer
- Assertions inside play functions cause the test to fail
- Composed stories accept prop overrides merged with story args

## Related

- [Portable Stories — Vitest](./vitest.md)
- [Portable Stories — Playwright](./playwright.md)
- [CSF](../csf.md)
