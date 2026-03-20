# Loaders

Async functions that fetch external data before a story renders, injecting results into the story via the `loaded` render context field.

## Overview / Signature

```typescript
type Loader = (context: StoryContext) => Promise<Record<string, unknown>>;
```

Loaders run at three levels: global, component, story. All applicable loaders run in **parallel**; results are merged into `loaded` (story > component > global wins on key conflicts).

## Usage

### Story-level loader

```typescript
const meta = {
  component: TodoItem,
  render: (args, { loaded: { todo } }) => <TodoItem {...args} {...todo} />,
} satisfies Meta<typeof TodoItem>;

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

### Global loaders (`.storybook/preview.ts`)

```typescript
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

- Loaders are an escape hatch designed as a performance optimization for large story imports; **args is the recommended primary data management approach** for most cases.
- Loaders run in parallel; if multiple loaders return the same key, the story-level loader wins.
- Access loader results via the second render argument: `render: (args, { loaded }) => ...`.

## Related

- [Args](./args.md)
- [Play Function](./play-function.md)
- [Mocking Network Requests](./mocking-network-requests.md)
