# Stories for Multiple Components

Techniques for writing stories that render two or more components together, such as parent/child pairs like `List` + `ListItem`.

## Overview / Signature

Four approaches, each with different trade-offs around documentation, controls, and serialization.

## Usage

### 1. `subcomponents` property (documentation only)

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { List } from './List';
import { ListItem } from './ListItem';

const meta = {
  component: List,
  subcomponents: { ListItem },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneItem: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem />
    </List>
  ),
};
```

### 2. Reuse args from another component's stories

```typescript
import { Selected, Unselected } from './ListItem.stories';

export const ManyItems: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem {...Selected.args} />
      <ListItem {...Unselected.args} />
    </List>
  ),
};
```

### 3. Children as an arg

```typescript
import { Unchecked } from './ListItem.stories';

export const OneItem: Story = {
  args: {
    children: <Unchecked {...Unchecked.args} />,
  },
};
```

### 4. Template component pattern (data-driven)

```typescript
const ListTemplate: Story = {
  render: ({ items, ...args }) => (
    <List>
      {items.map((item) => (
        <ListItem key={item.label} {...item} />
      ))}
    </List>
  ),
};

export const Empty = {
  ...ListTemplate,
  args: { items: [] },
};

export const OneItem = {
  ...ListTemplate,
  args: { items: [{ ...Unchecked.args }] },
};
```

## Notes

- `subcomponents` is **for documentation only** — argTypes cannot be manually overridden and Controls do not apply to subcomponent props.
- Children passed as args must be **JSON-serializable**; avoid empty values and use `argTypes.mapping` cautiously for complex components.
- The template pattern enables Controls panel editing across all items in a list.

## Related

- [Args](./args.md)
- [Decorators](./decorators.md)
- [TypeScript](./typescript.md)
