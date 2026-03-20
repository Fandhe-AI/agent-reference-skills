# Interaction Testing

Simulate user behavior and validate component functionality using `play` functions built directly into stories.

## Overview

Interaction tests render components in specific states, simulate user interactions (clicks, typing, form submission), and make assertions about the results. They rely on Testing Library queries and `userEvent` for DOM interaction, and `expect` for assertions.

## Usage

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { expect } from 'storybook/test';
import { LoginForm } from './LoginForm';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');
    await userEvent.type(canvas.getByTestId('password'), 'password');
    await userEvent.click(canvas.getByRole('button'));

    await expect(
      canvas.getByText('Account ready!')
    ).toBeInTheDocument();
  },
};
```

### Spy on args with `fn()`

```typescript
import { fn } from 'storybook/test';

const meta = {
  args: { onSubmit: fn() },
};

export const FilledForm: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};
```

### Run code before rendering

```typescript
export const Story: Story = {
  async play({ mount }) {
    MockDate.set('2024-12-25');
    await mount();
  },
};
```

### Group interactions with `step`

```typescript
await step('Enter credentials', async () => {
  await userEvent.type(canvas.getByTestId('email'), 'test@test.com');
});
```

## Options / Props

**Query types (Testing Library):**

| Query | Returns | Throws on 0 | Throws on >1 |
|-------|---------|-------------|--------------|
| `getBy...` | Element | Yes | Yes |
| `queryBy...` | Element/null | No | Yes |
| `findBy...` | Element (async) | Yes | Yes |
| `getAllBy...` | Array | Yes | No |

**Query subjects:** ByRole, ByLabelText, ByPlaceholderText, ByText, ByDisplayValue, ByAltText, ByTitle, ByTestId

**Common `userEvent` methods:**

```typescript
await userEvent.click(element);
await userEvent.type(element, 'text');
await userEvent.selectOptions(element, ['option1']);
await userEvent.keyboard('{Shift}');
await userEvent.hover(element);
```

**Lifecycle hooks:** `beforeEach` (story-level), `beforeAll` (preview-level), `afterEach` (story-level)

## Notes

- Always `await` `userEvent` and `expect` calls for proper logging
- Prefer queries by role over `data-testid`: Role > Label > Placeholder > Text > TestId
- Use `fn()` from `storybook/test` to spy on args

## Related

- [Vitest Addon](./vitest-addon.md)
- [Portable Stories / Stories in Unit Tests](./portable-stories.md)
- [Running in CI](./in-ci.md)
