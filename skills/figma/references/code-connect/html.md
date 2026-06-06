# Connecting Web Components (HTML)

Connect HTML-based components — Web Components, Angular, Vue, or any HTML framework — to Figma using `figma.connect()` with the `html` tagged template literal.

## Signature / Usage

```javascript
import figma, { html } from '@figma/code-connect/html'

figma.connect('https://www.figma.com/file/...', {
  props: {
    label: figma.string('Label'),
    disabled: figma.boolean('Disabled'),
    type: figma.enum('Type', { Primary: 'primary', Secondary: 'secondary' }),
  },
  example: ({ label, disabled, type }) =>
    html`<ds-button type="${type}" ?disabled="${disabled}">${label}</ds-button>`,
})
```

## Options / Props

### Prop helpers

| Helper | Signature | Description |
|--------|-----------|-------------|
| `figma.string` | `(propName: string)` | Maps a Figma text property to a string value |
| `figma.boolean` | `(propName: string, mapping?: { true: T, false: T })` | Maps a boolean or two-option variant; optional conditional rendering |
| `figma.enum` | `(propName: string, mapping: Record<string, any>)` | Maps a variant property to a code value |
| `figma.slot` | `(propName: string)` | Maps a composable sub-area (slot) within the component |
| `figma.instance` | `(propName: string)` | Maps a nested component reference |
| `figma.children` | `(layerName: string \| string[])` | Maps child instances by layer name; supports wildcards |
| `figma.nestedProps` | `(layerName: string, props: object)` | Maps nested instance properties without connecting the child |
| `figma.textContent` | `(layerName: string)` | Extracts text from a child layer |
| `figma.className` | `(values: any[])` | Concatenates class names, filtering `undefined` |

### Variant restrictions

```javascript
figma.connect('https://...', {
  variant: { Type: 'Primary' },
  example: () => html`<ds-button-primary></ds-button-primary>`,
})

figma.connect('https://...', {
  variant: { Type: 'Danger', Disabled: true },
  example: () => html`<ds-button-danger></ds-button-danger>`,
})
```

## Notes

- Code Connect files are not executed — the CLI treats code snippets as strings
- Any JavaScript/TypeScript logic accompanying HTML must be enclosed in a `<script>` tag within the template
- The same prop helpers are available for Angular, Vue, and other HTML-based frameworks; adjust the `html` template syntax accordingly

## Related

- [React Integration](./react.md)
- [Config File](./config-file.md)
- [CLI Reference](./cli-reference.md)
