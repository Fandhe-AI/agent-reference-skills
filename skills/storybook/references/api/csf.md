# CSF — Component Story Format

An open standard for writing Storybook stories based on ES6 modules, portable beyond Storybook itself.

## Overview

CSF files export a required default export (the **meta** object) describing the component, and one or more named exports (the **stories**). Storybook reads these exports to build the sidebar navigation and render each story. CSF 3 (current) uses plain objects instead of functions, supports default render functions, and enables automatic title generation from file paths.

## Usage

### Minimal CSF 3 file

```typescript
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: 'Button', primary: true },
};
```

### Meta (default export) fields

| Field | Type | Description |
|-------|------|-------------|
| `component` | `ComponentType` | The component being documented (required) |
| `title` | `string` | Sidebar path, e.g. `'UI/Button'`. Auto-generated if omitted |
| `args` | `Partial<ComponentArgs>` | Default args applied to all stories |
| `argTypes` | `ArgTypes` | Metadata for each arg (controls, mapping, etc.) |
| `parameters` | `Parameters` | Static addon/feature configuration |
| `decorators` | `Decorator[]` | Wrappers applied to all stories |
| `render` | `(args, context) => JSX` | Custom render function for all stories |
| `includeStories` | `string[] \| RegExp` | Allowlist of named exports to treat as stories |
| `excludeStories` | `string[] \| RegExp` | Denylist of named exports to exclude from stories |
| `tags` | `string[]` | Tags for filtering and organization |

### Story (named export) fields

| Field | Type | Description |
|-------|------|-------------|
| `args` | `Partial<ComponentArgs>` | Story-specific args, merged over meta args |
| `render` | `(args, context) => JSX` | Custom render function overriding meta render |
| `play` | `async (context) => void` | Interaction script run after story renders |
| `decorators` | `Decorator[]` | Story-specific wrappers |
| `parameters` | `Parameters` | Story-specific addon configuration |
| `name` | `string` | Display name override (use for reserved words or special characters) |
| `tags` | `string[]` | Story-level tags |

### Custom render function

```typescript
export const WithRender: Story = {
  args: { label: 'Hello', onClick: action('clicked') },
  render: ({ label, onClick }) => <Button label={label} onClick={onClick} />,
};
```

### Play function

```typescript
export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('email'), 'test@example.com');
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('Success!')).toBeInTheDocument();
  },
};
```

### Excluding non-story exports

```typescript
const meta = {
  component: MyComponent,
  excludeStories: /.*Data$/,  // exports ending in "Data" are not stories
} satisfies Meta<typeof MyComponent>;

export const mockData = { … }; // excluded
export const Primary: Story = { … }; // included
```

## Notes

- Named export identifiers are converted to "start case" for display: `someStoryName` → "Some Story Name". Use `name` to override.
- CSF 3 stories are plain objects; Storybook provides default render functions per framework, so explicit `render` is usually unnecessary.
- Upgrade from CSF 2: `npx storybook migrate csf-2-to-3 --glob="**/*.stories.tsx"`.
- CSF is framework-agnostic — the same format works with React, Vue, Angular, Svelte, etc.

## Related

- [README](./README.md)
