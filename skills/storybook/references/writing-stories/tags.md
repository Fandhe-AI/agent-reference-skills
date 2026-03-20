# Tags

A categorization system that controls which stories appear in the sidebar, test runs, and documentation pages.

## Overview / Signature

### Built-in tags

| Tag | Default | Purpose |
|-----|---------|---------|
| `dev` | Yes | Rendered in Storybook's sidebar |
| `manifest` | Yes | Included in component/docs manifests (React only) |
| `test` | Yes | Included in test runner / Vitest addon runs |
| `autodocs` | No | Included on the docs page |
| `play-fn` | Auto | Applied to stories that have a `play` function |
| `test-fn` | Auto | Applied to experimental `.test` method stories |

## Usage

### Apply tags at component level

```typescript
const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
```

### Apply tags at story level

```typescript
export const ExperimentalStory: Story = {
  tags: ['experimental'],
};
```

### Remove inherited tags with `!` prefix

```typescript
export const ExperimentalStory: Story = {
  tags: ['!stable', 'experimental'],
};
```

### Custom tag definition (`.storybook/main.ts`)

```typescript
const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  tags: {
    experimental: {
      defaultFilterSelection: 'exclude', // or 'include'
    },
  },
};
```

### Global tags (`.storybook/preview.ts`)

```typescript
const preview: Preview = {
  tags: ['autodocs'],
};
```

### Common recipes

**Docs-only — exclude from sidebar:**
```typescript
const meta = {
  component: Button,
  tags: ['autodocs', '!dev'],
} satisfies Meta<typeof Button>;
```

**Test individual variants but only display combo story:**
```typescript
export const Variant1: Story = {
  tags: ['!dev', '!autodocs'],
  args: { variant: 1 },
};

export const Combo: Story = {
  tags: ['!test'],
  render: () => <Button variant={1} />,
};
```

## Notes

- Tags are inherited from global → component → story; use the `!` prefix to remove an inherited tag.
- Sidebar filtering shows stories that contain **any** of the selected tags.
- `defaultFilterSelection` in `main.ts` controls whether custom tags are included or excluded by default in the filter UI.

## Related

- [Parameters](./parameters.md)
- [Play Function](./play-function.md)
- [Naming and Hierarchy](./naming-and-hierarchy.md)
