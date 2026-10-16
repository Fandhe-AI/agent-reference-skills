# ArgTypes

Specify arg behavior, constrain acceptable values, and configure the Controls panel and documentation.

## Overview

ArgTypes can be defined at three levels: **story**, **component** (meta), or **project** (preview.ts). Storybook automatically infers argTypes from the component using framework-specific tools (react-docgen, vue-docgen-api, compodoc, etc.). Manually specified values override inferred ones.

## Signature / Usage

```typescript
const meta = {
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual style of the button',
      table: { category: 'Appearance' },
    },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;
```

## Properties

### `control`

Configures the Controls panel UI. Can be a string shorthand or an object.

| Value | Renders |
|-------|---------|
| `'boolean'` | Toggle |
| `'number'` | Number input |
| `'range'` | Slider |
| `'text'` | Text input |
| `'color'` | Color picker |
| `'date'` | Date picker |
| `'select'` | Select dropdown |
| `'multi-select'` | Multi-select |
| `'radio'` | Radio buttons |
| `'inline-radio'` | Inline radio buttons |
| `'check'` | Checkboxes |
| `'inline-check'` | Inline checkboxes |
| `'object'` | JSON editor |
| `'file'` | File upload |
| `false` | Disable control |

Object form options: `type`, `accept` (MIME types), `labels`, `min`, `max`, `step`, `presetColors`

### `description`

`string` — Describes the arg's purpose in the docs panel.

### `if`

Conditionally renders the control based on another arg or global value.

```typescript
argTypes: {
  secondaryLabel: {
    if: { arg: 'variant', eq: 'secondary' },
  },
}
```

| Sub-field | Type | Description |
|-----------|------|-------------|
| `arg` | string | Watch this arg name |
| `global` | string | Watch this global name |
| `eq` | any | Show when value equals |
| `neq` | any | Show when value does not equal |
| `exists` | boolean | Show when arg exists (or not) |
| `truthy` | boolean | Show when arg is truthy (or falsy) |

### `mapping`

Maps string option keys to actual values (useful for non-primitive types like JSX elements).

```typescript
argTypes: {
  icon: {
    options: ['home', 'settings'],
    mapping: { home: <HomeIcon />, settings: <SettingsIcon /> },
  },
}
```

### `name`

`string` — Overrides the displayed argType name. Use cautiously to avoid confusion with actual prop names.

### `options`

`any[]` — Array of allowed values. Used with `control` to determine the appropriate UI widget.

### `table`

Documentation metadata for the Args table.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `category` | string | Group label |
| `subcategory` | string | Nested group label |
| `defaultValue` | `{ summary, detail }` | Documented default value |
| `disable` | boolean | Hide from tables |
| `type` | `{ summary, detail }` | Documented type information |
| `readonly` | boolean | Mark as read-only |

### `type`

Semantic type using `SBType` structure.

- Scalars: `'boolean' | 'string' | 'number' | 'function' | 'symbol'`
- Collections: `array`, `object`, `enum`, `union`, `intersection`

## Notes

- `defaultValue` is deprecated — define defaults in `args` instead
- Story-level argTypes override component-level which override project-level
- Vue (docgen): `vue-docgen-api` (the current default for `@storybook/vue3-vite`, also selected by `docgen: true`) is deprecated since Storybook 10.6 and will be removed in the next major version. Set the framework option `docgen: 'vue-component-meta'`, or enable server-side docgen with `features: { experimentalDocgenServer: true }` (which becomes the default in Storybook 11 and also uses `vue-component-meta`). `docgen: false` disables docgen, in which case argTypes are not inferred automatically.
- Angular (docgen): on `@storybook/angular-vite`, `features.experimentalDocgenServer` is on by default, so Compodoc never runs and is not a dependency; component members are read on the Storybook server from your TypeScript sources. The framework option `propsTable` (`'all' | 'api' | 'inputs'`, default `'api'`) controls which members the props table renders. The Webpack-based `@storybook/angular` always uses Compodoc.

## Related

- [CSF](./csf.md)
- [Parameters](./parameters.md)
