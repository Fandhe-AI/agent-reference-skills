# Play Function

Simulate user interactions after a story renders to automate testing without manual intervention.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { expect, fn } from '@storybook/test';
import { LoginForm } from './LoginForm';

const meta = {
  component: LoginForm,
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilledForm: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(
      canvas.getByLabelText('email', { selector: 'input' }),
      'example-email@email.com',
      { delay: 100 },
    );

    await userEvent.type(
      canvas.getByLabelText('password', { selector: 'input' }),
      'ExamplePassword',
      { delay: 100 },
    );

    await userEvent.click(canvas.getByRole('button'));

    await expect(args.onSubmit).toHaveBeenCalled();
    await expect(canvas.getByText('Your account is ready')).toBeInTheDocument();
  },
};
```

## Notes

- `canvas` scopes DOM queries to the story's rendered output; prefer it over `document` queries
- `userEvent` from `@storybook/test` mirrors `@testing-library/user-event` API
- Wrap assertions with `await` so failures appear in the Interactions panel with clear stack traces
- Use `fn()` from `@storybook/test` (Vitest-compatible spy) to track callback invocations
