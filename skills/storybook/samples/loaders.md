# Loaders

Fetch asynchronous data before a story renders and inject it into the story context.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { TodoItem } from './TodoItem';

const meta = {
  component: TodoItem,
  render: (args, { loaded: { todo } }) => <TodoItem {...args} {...todo} />,
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  loaders: [
    async () => ({
      todo: await (
        await fetch('https://jsonplaceholder.typicode.com/todos/1')
      ).json(),
    }),
  ],
};
```

```typescript
// Global loader in .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  loaders: [
    async () => ({
      currentUser: await (
        await fetch('https://jsonplaceholder.typicode.com/users/1')
      ).json(),
    }),
  ],
};

export default preview;
```

## Notes

- Loaded data is available as the `loaded` property of the story context (second argument of `render`)
- All loaders run in parallel; results are merged into `loaded`
- Precedence order (lowest to highest): global → component → story; later loaders with matching keys win
- Loaders are re-run on every story render, making them suitable for live API data during development
