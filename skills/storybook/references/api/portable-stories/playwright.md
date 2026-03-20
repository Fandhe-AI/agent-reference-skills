# Portable Stories — Playwright

API for reusing Storybook stories in Playwright Component Tests (CT).

## Overview

Import from `@storybook/react/experimental-playwright`. This API is **experimental**, requires React 18+, and is not yet supported with Next.js.

Stories must be composed in a **separate `.portable.ts` file** because Playwright transforms code between Node and browser contexts.

## `setProjectAnnotations()`

Apply project-level annotations before tests run. Call this in your `playwright/index.ts` setup file.

### Signature

```typescript
setProjectAnnotations(
  projectAnnotations: ProjectAnnotation | ProjectAnnotation[]
) => ProjectAnnotation
```

### Usage

```typescript
// playwright/index.ts
import { setProjectAnnotations } from '@storybook/react';
import * as previewAnnotations from './.storybook/preview';
import * as addonAnnotations from 'my-addon/preview';

const annotations = setProjectAnnotations([previewAnnotations, addonAnnotations]);
test.beforeAll(annotations.beforeAll);
```

---

## `createTest(baseTest)`

Extend Playwright's test with a Storybook-aware `mount` that runs the full story pipeline.

### Signature

```typescript
createTest(baseTest: PlaywrightFixture) => PlaywrightFixture
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `baseTest` | Yes | Base test from `@playwright/experimental-ct-react` |

### Return Value

A Playwright test fixture with an enhanced `mount` that automatically:
1. Applies annotations
2. Runs loaders
3. Renders the story
4. Executes the play function (including assertions)

### Usage

```typescript
import { createTest } from '@storybook/react/experimental-playwright';
import { test as base } from '@playwright/experimental-ct-react';
import stories from './Button.stories.portable';

const test = createTest(base);

test('renders primary', async ({ mount }) => {
  await mount(<stories.Primary />);
});

test('renders with props', async ({ mount }) => {
  const component = await mount(<stories.Primary label="Custom" />);
  await expect(component).toContainText('Custom');
});
```

---

## Story Composition Pattern

Create a `.portable.ts` file alongside your stories:

```typescript
// Button.stories.portable.ts
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories';

export default composeStories(stories);
```

Then import in your test file:

```typescript
import stories from './Button.stories.portable';
```

## Overriding Globals

```typescript
// Button.stories.portable.ts
import { composeStory } from '@storybook/react';
import meta, { Primary } from './Button.stories';

export const PrimaryEnglish = composeStory(Primary, meta, { globals: { locale: 'en' } });
export const PrimarySpanish = composeStory(Primary, meta, { globals: { locale: 'es' } });
```

## Notes

- API is experimental — subject to breaking changes
- Requires React 18+; Next.js is not supported
- If play function assertions fail, the test fails accordingly
- Addon decorators/loaders needed for rendering must be included via `setProjectAnnotations()`

## Related

- [Portable Stories — Vitest](./vitest.md)
- [Portable Stories — Jest](./jest.md)
- [CSF](../csf.md)
