# Play Function

An async function attached to a story that runs after rendering, enabling automated interaction testing via simulated user events.

## Overview / Signature

```typescript
export const MyStory: Story = {
  play: async ({ canvas, userEvent, context }) => {
    // interaction code
  },
};
```

### Context parameters

| Parameter | Description |
|-----------|-------------|
| `canvas` | Scoped Testing Library queries (limited to the story's DOM subtree) |
| `userEvent` | API for simulating user interactions (type, click, etc.) |
| `context` | Story metadata and configuration |

## Usage

### Form interaction

```typescript
export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    const emailInput = canvas.getByLabelText('email', {
      selector: 'input',
    });

    await userEvent.type(emailInput, 'example@email.com', {
      delay: 100,
    });

    const submitButton = canvas.getByRole('button');
    await userEvent.click(submitButton);
  },
};
```

### Querying outside the canvas (modals, portals)

```typescript
import { screen } from 'storybook/test';

export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));

    const dialog = screen.getByRole('dialog');
    await expect(dialog).toBeVisible();
  },
};
```

### Composing multiple story play functions

```typescript
export const CombinedStories: Story = {
  play: async ({ context, canvas, userEvent }) => {
    await FirstStory.play(context);
    await SecondStory.play(context);

    await userEvent.type(canvas.getByTestId('element'), 'value');
  },
};
```

## Notes

- Play functions are async and execute sequentially.
- Use `canvas` for queries scoped to the story subtree; use `screen` from `storybook/test` for document-level elements (portals, modals).
- Results are shown in the **Interactions** panel for step-by-step debugging.
- Stories with play functions are automatically tagged with `play-fn`.

## Related

- [Args](./args.md)
- [Loaders](./loaders.md)
- [Tags](./tags.md)
