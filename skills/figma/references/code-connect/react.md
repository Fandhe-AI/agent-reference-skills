# Connecting React Components

Connect React components to Figma using `figma.connect()` with built-in prop helpers for mapping design properties to code.

## Signature / Usage

```typescript
import figma from '@figma/code-connect'

figma.connect(Button, 'https://www.figma.com/file/...', {
  props: {
    label: figma.string('Label'),
    disabled: figma.boolean('Disabled'),
    variant: figma.enum('Type', { Primary: 'primary', Secondary: 'secondary' }),
  },
  example: ({ label, disabled, variant }) => (
    <Button disabled={disabled} variant={variant}>{label}</Button>
  ),
})
```

## Options / Props

### `figma.connect()` signatures

```typescript
// Connect a React component (infers import location)
figma.connect(ComponentRef, figmaNodeUrl, options)

// Connect without a component reference (native HTML element)
figma.connect(figmaNodeUrl, options)
```

### Prop helpers

| Helper | Signature | Description |
|--------|-----------|-------------|
| `figma.string` | `(propName: string)` | Maps a Figma text property to a string value |
| `figma.boolean` | `(propName: string, mapping?: { true: T, false: T })` | Maps a boolean or two-option variant; optional conditional rendering |
| `figma.enum` | `(propName: string, mapping: Record<string, any>)` | Maps a variant property; keys are Figma options, values are code output |
| `figma.instance` | `(propName: string)` | Renders a nested component reference with its connected snippet |
| `figma.children` | `(layerName: string \| string[])` | Maps unnamed child instances by layer name; supports wildcards (`*`) |
| `figma.nestedProps` | `(layerName: string, props: Record<string, any>)` | Maps properties of a nested instance without connecting it separately |
| `figma.textContent` | `(layerName: string)` | Extracts text content from a child layer |
| `figma.className` | `(values: any[])` | Concatenates class name strings, filtering `undefined` values |

### `figma.instance()` chainable methods

| Method | Description |
|--------|-------------|
| `.getProps<T>()` | Access child component props |
| `.render<T>(props => JSX)` | Conditionally render using child component props |

### `figma.connect()` options

| Option | Type | Description |
|--------|------|-------------|
| `props` | `object` | Map of prop names to prop helpers |
| `example` | `(props) => JSX` | Function returning the code snippet |
| `imports` | `string[]` | Import statements to include with the snippet |
| `variant` | `Record<string, string \| boolean>` | Restrict this connection to specific Figma variant values |

## Notes

- The first argument to `figma.connect()` determines the import statement generated in Dev Mode
- `figma.children()` supports wildcard matching: `'Icon*'` matches all layers starting with "Icon", `'*'` matches all children
- Code Connect files are not executed at runtime — they are treated as strings by the CLI
- Multiple `figma.connect()` calls can target different variants of the same Figma component using the `variant` option

## Related

- [Config File](./config-file.md)
- [Storybook Integration](./storybook.md)
- [Template API](./template-api.md)
- [CLI Reference](./cli-reference.md)
