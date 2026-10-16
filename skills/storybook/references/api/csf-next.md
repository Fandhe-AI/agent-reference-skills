# CSF Next (Preview)

Next evolution of Component Story Format. Factory functions (`definePreview` → `preview.meta` → `meta.story`) give full type safety to stories and addon configuration. Supported only in React, Vue, Angular, and Web Components projects.

## Signature / Usage

```ts
// .storybook/main.ts
// Replace your-framework with the framework you are using (e.g., react-vite, nextjs, nextjs-vite)
import { defineMain } from '@storybook/your-framework/node';

export default defineMain({
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
});
```

```ts
// .storybook/preview.ts
import { definePreview } from '@storybook/your-framework';
import addonA11y from '@storybook/addon-a11y';

export default definePreview({
  // Add your addons here
  addons: [addonA11y()],
  parameters: {
    // type-safe!
    a11y: {
      options: { xpath: true },
    },
  },
});
```

```ts
// Button.stories.ts
import preview from '../.storybook/preview';

import { Button } from './Button';

const meta = preview.meta({
  component: Button,
  parameters: {
    // type-safe!
    layout: 'centered',
  },
});

export const Primary = meta.story({
  args: {
    primary: true,
  },
});
```

## API

| Function | Description |
|----------|-------------|
| `defineMain` | Type-safe main config (`.storybook/main.*`); infers types for the project |
| `definePreview` | Type-safe preview config; addons listed here make their types available project-wide. Its result (`preview`) is imported in story files |
| `preview.meta` | Defines story metadata (`component`, `title`, `parameters`, ...) |
| `preview.type<{ args: Props }>().meta` | Extends or overrides the inferred prop types |
| `meta.story` | Defines a story (`name`, `args`, `parameters`, ...) |
| `<Story>.extend` | Creates a new story from an existing one, overriding or adding properties |
| `<Story>.test` | Attaches tests to a story (experimental) |

### `preview.type.meta`

`preview.meta` infers component props automatically. Use `preview.type` for custom types.

```tsx
import * as React from 'react';

import preview from '../.storybook/preview';

import { Button } from './Button';

type CustomProps = React.ComponentProps<typeof Button> & { customProp: string };

const meta = preview.type<{ args: CustomProps }>().meta({
  component: Button,
  render: ({ customProp, ...args }) => (
    <>
      {customProp} <Button {...args} />
    </>
  ),
});

export const Primary = meta.story({
  args: {
    customProp: 'Hello, world!',
  },
});
```

### `<Story>.extend`

```ts
export const PrimaryDisabled = Primary.extend({
  args: {
    disabled: true,
  },
});
```

Merging rules:

- `args` are shallow merged
- `parameters` are deep merged, except arrays, which are replaced
- `decorators` and `tags` are concatenated

### `<Story>.test` (experimental)

Must be enabled via the `experimentalTestSyntax` feature flag in main config `features`.

```ts
export const PrimaryDisabled = Primary.extend({ args: { disabled: true } });

// The test function can run the same code as the play function
PrimaryDisabled.test('should be disabled', async ({ canvas, userEvent, args }) => {
  const button = await canvas.findByRole('button');
  await userEvent.click(button);

  await expect(button).toHaveAttribute('aria-disabled', 'true');
  await expect(args.onClick).not.toHaveBeenCalled();
});
```

## Upgrade to CSF Next

Automatic upgrade from CSF 3 (upgrade Storybook first; for monorepos pass `-c <config-dir>` per Storybook config):

```diff
// .storybook/main.ts
+ import { defineMain } from '@storybook/your-framework/node';
- import { StorybookConfig } from '@storybook/your-framework';

+ export default defineMain({
- export const config: StorybookConfig = {
    // ...config itself is unchanged
+ });
- };
- export default config;
```

```diff
// Button.stories.ts
+ import preview from '../.storybook/preview';
- import type { Meta, StoryObj } from '@storybook/your-framework';

+ const meta = preview.meta({
- const meta = {
    // ...meta object is unchanged
+ });
- } satisfies Meta<typeof Button>;
- export default meta;

+ export const Primary = meta.story({
- export const Primary: Story = {
    // ...story object is unchanged
+ });
- };
```

Reusing story properties: direct access such as `Story.args` is deprecated; use `Story.composed.args` / `Story.composed.parameters` (composed from the story, its meta, and the preview config). `Story.input` gives the direct input to the story.

```diff
export const PrimaryDisabled = meta.story({
    args: {
+     ...Primary.composed.args,
-     ...Primary.args,
      disabled: true,
    }
});
```

Vitest setup file (portable stories) with CSF Next:

```diff
import { beforeAll } from 'vitest';
+ import preview from './.storybook/preview';

+ beforeAll(preview.composed.beforeAll);
- beforeAll(annotations.beforeAll);
```

Reusing stories in tests: no `composeStories` needed.

```diff
+ const { Primary } = stories;
- const { Primary } = composeStories(stories);

await Primary.run();
```

## Notes

- Preview feature; the API may change in future releases. Feedback: RFC discussion [storybookjs/storybook#30112](https://github.com/storybookjs/storybook/discussions/30112).
- Source: Storybook v10.6.2 docs (`docs/api/csf/csf-next.mdx`); https://storybook.js.org/docs/api/csf/csf-next
- CSF Next can be adopted incrementally, but story formats cannot be mixed within the same file. CSF 1, 2, and 3 are not deprecated.
- Automatic upgrade requires CSF 3; upgrade CSF 2 stories to CSF 3 first.
- Addons are added to `definePreview({ addons: [...] })`. Only addons that distribute a `./preview` export provide annotation types. Official addons: `import addonName from '@storybook/addon-name'`; community addons: `import * as addonName from 'community-addon-name'`.
- Installing an addon with `npx storybook add <addon-name>` or running `storybook dev` updates the preview config automatically.
- Absolute preview imports (e.g. `#.storybook/preview`) can be set up with Node.js subpath imports (`"imports": { "#*": ["./*", "./*.ts", "./*.tsx"] }` in `package.json`) or a builder alias.
- With the Storybook Vitest addon, `.storybook/vitest.setup.ts` can be removed. If CSF Next is mixed with CSF 1/2/3 in tested stories, two separate setup files must be maintained.
- Doc blocks in MDX support CSF Next with no changes.
- `<Story>.test` is experimental and requires the `experimentalTestSyntax` feature flag.

## Related

- [CSF](./csf.md)
- [Portable Stories — Vitest](./portable-stories/vitest.md)
- [Main config features](./main-config/features.md)
