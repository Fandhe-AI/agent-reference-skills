# Integrating with Storybook

Connect Code Connect to Storybook stories so that design property changes in Figma generate code snippets from real stories.

## Signature / Usage

```javascript
import figma from '@figma/code-connect'
import { ButtonExample } from './Button.stories'

export default {
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...',
      examples: [ButtonExample],
    },
  },
}
```

## Options / Props

### `parameters.design` fields

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'figma'` | Must be `'figma'` to activate the integration |
| `url` | `string` | Figma component node URL |
| `examples` | `StoryFn[]` | Array of story functions to use as code examples |
| `props` | `object` | Prop helpers mapping Figma properties to story props |
| `imports` | `string[]` | Import statements to include with the snippet |

### Variant restrictions (when one Figma component maps to multiple stories)

```javascript
examples: [
  { example: PrimaryButtonStory, variant: { Type: 'Primary' } },
  { example: SecondaryButtonStory, variant: { Type: 'Secondary' } },
]
```

### Dynamic props example

```javascript
parameters: {
  design: {
    type: 'figma',
    url: 'https://...',
    props: {
      label: figma.string('Text Content'),
      disabled: figma.boolean('Disabled'),
      type: figma.enum('Type', { Primary: 'primary', Secondary: 'secondary' }),
    },
    examples: [ButtonExample],
  },
},
```

## Notes

- Storybook integration is **React only**
- This extends Figma's existing Storybook plugin, automatically embedding component previews in your documentation
- Individual story props can be overridden per example entry in the `examples` array

## Related

- [React Integration](./react.md)
- [CLI Reference](./cli-reference.md)
