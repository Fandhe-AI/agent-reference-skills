# Portable Stories (Stories in Unit Tests)

Reuse component stories in Jest, Vitest, or Playwright unit tests using the `composeStories` / `composeStory` API.

## Overview

The Portable Stories API lets you compose stories with their annotations (args, decorators, parameters) and produce renderable elements for any test runner. This saves time and reduces maintenance compared to duplicating test setup.

## Setup

### 1. Install dependencies

```bash
npm install --save-dev @testing-library/react @storybook/react-vite
```

### 2. Configure project-level annotations

In your test setup file:

```typescript
import { setProjectAnnotations } from '@storybook/your-framework';
import * as annotations from './.storybook/preview';

setProjectAnnotations(annotations);
```

## Usage

### `composeStories` — compose multiple stories

```typescript
import { composeStories } from '@storybook/your-framework';
import * as FormStories from './LoginForm.stories';

const { InvalidForm, ValidForm } = composeStories(FormStories);

test('Tests invalid form state', async () => {
  await InvalidForm.run();
  const button = screen.getByRole('button', { name: 'Submit' });
  fireEvent.click(button);
  expect(screen.getByLabelText('invalid-form')).toBeInTheDocument();
});
```

### `composeStory` — compose a single story

```typescript
import { composeStory } from '@storybook/your-framework';
import Meta, { ValidForm as ValidFormStory } from './LoginForm.stories';

const ValidForm = composeStory(ValidFormStory, Meta);

test('Validates form', async () => {
  await ValidForm.run();
  // assertions...
});
```

### Access story args

```typescript
const { Primary } = composeStories(stories);
expect(buttonElement.textContent).toEqual(Primary.args.label);
```

### Override global configuration

```typescript
const { ValidForm } = composeStories(stories, {
  decorators: [...],
  globalTypes: {},
  parameters: {},
});
```

## Notes

- `setProjectAnnotations()` is required to ensure decorators and parameters from `.storybook/preview` are applied
- Replace `your-framework` with your actual package (e.g., `@storybook/react-vite`, `@storybook/nextjs`)
- For Next.js Vite projects, if you encounter "Cannot find module" errors add the plugin to `vitest.config.ts`:
  ```typescript
  import { storybookNextJsPlugin } from '@storybook/nextjs-vite/vite-plugin';
  export default defineConfig({ plugins: [storybookNextJsPlugin()] });
  ```
- API reference: [`portable-stories-vitest`](https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest), [`portable-stories-jest`](https://storybook.js.org/docs/api/portable-stories/portable-stories-jest), [`portable-stories-playwright`](https://storybook.js.org/docs/api/portable-stories/portable-stories-playwright)

## Related

- [Snapshot Testing](./snapshot-testing.md)
- [Interaction Testing](./interaction-testing.md)
- [Vitest Addon](./vitest-addon.md)
