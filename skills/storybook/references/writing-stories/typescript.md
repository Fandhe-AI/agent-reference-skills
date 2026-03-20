# TypeScript

Writing type-safe stories using Storybook's built-in TypeScript support with `Meta`, `StoryObj`, and the `satisfies` operator.

## Overview / Signature

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
```

Both `Meta<T>` and `StoryObj<T>` accept either the component type (`typeof Button`) or the component's props type directly.

## Usage

### Basic story definition

```typescript
export const Basic = {} satisfies Story;

export const Primary = {
  args: {
    primary: true,
  },
} satisfies Story;
```

### Custom args with intersection types

For stories that need non-component props (e.g., a `footer` slot):

```typescript
type PagePropsAndCustomArgs = React.ComponentProps<typeof Page> & {
  footer?: string;
};

const meta = {
  component: Page,
  render: ({ footer, ...args }) => (
    <Page {...args}>
      <footer>{footer}</footer>
    </Page>
  ),
} satisfies Meta<PagePropsAndCustomArgs>;
```

## Notes

- **`satisfies` operator (TypeScript 4.9+)** is preferred over type annotation (`const meta: Meta<...>`) because it provides stricter inference, catches missing required args, and correctly links `meta` to derived `StoryObj` types.
- No configuration is required — Storybook ships with TypeScript support out of the box.
- Benefits: editor autocomplete for props, type errors on missing required props, auto-generated Controls table.
- CSF Next (currently in preview) provides significantly improved TypeScript support and is recommended for all new TypeScript stories.

## Related

- [Args](./args.md)
- [Multiple Components](./multiple-components.md)
- [Play Function](./play-function.md)
