# Args

Dynamic inputs passed to components as a plain JavaScript object, enabling interactive prop modification via Controls without changing component code.

## Overview

Args are Storybook's mechanism for defining component inputs. They replace hardcoded props and integrate with the Controls addon to allow runtime modifications. Args can be defined at three levels: story, component (meta), and global.

## Usage

### Story-level args

```typescript
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = { component: Button } satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
```

### Component-level args (meta)

```typescript
const meta = {
  component: Button,
  args: {
    // applied to all stories in this file
    primary: true,
  },
} satisfies Meta<typeof Button>;
```

### Global args

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react';

const preview: Preview = {
  args: { theme: 'light' },
};

export default preview;
```

### Args composition

```typescript
export const Secondary: Story = {
  args: {
    ...Primary.args,
    primary: false,
  },
};
```

### Updating args from within a component (`useArgs`)

```typescript
import { useArgs } from '@storybook/preview-api';

export const Controlled: Story = {
  render: function Render(args) {
    const [{ isChecked }, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        onChange={() => updateArgs({ isChecked: !isChecked })}
      />
    );
  },
};
```

### Mapping complex values

Use `argTypes.mapping` to convert simple Control values (e.g., strings) to complex types (e.g., JSX elements):

```typescript
const meta = {
  component: MyComponent,
  argTypes: {
    icon: {
      mapping: {
        'check': <CheckIcon />,
        'cross': <CrossIcon />,
      },
    },
  },
} satisfies Meta<typeof MyComponent>;
```

## Notes

- Args merge across levels: story args override meta args, which override global args.
- URL query parameters can set initial arg values; values are limited to alphanumeric characters, spaces, underscores, and dashes.
- Do not mix `useArgs` with React hooks (`useState`, `useEffect`) inside render functions — side effects will bypass Storybook's context.

## Related

- [Parameters](./parameters.md)
- [Decorators](./decorators.md)
