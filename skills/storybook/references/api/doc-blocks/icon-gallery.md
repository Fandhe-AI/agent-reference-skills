# IconGallery / IconItem

A doc block that displays icon components in a neat grid layout for documentation purposes.

## Import

```ts
import { IconGallery, IconItem } from '@storybook/addon-docs/blocks';
```

## Props

### `IconGallery`

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Accepts only `IconItem` children |

### `IconItem`

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | **(Required)** Sets the display name of the icon |
| `children` | `React.ReactNode` | The icon component to display |

## Usage

```tsx
import { Meta, IconGallery, IconItem } from '@storybook/addon-docs/blocks';
import { Icon } from './Icon';

<Meta title="Iconography" />

<IconGallery>
  <IconItem name="mobile">
    <Icon name="mobile" />
  </IconItem>
  <IconItem name="user">
    <Icon name="user" />
  </IconItem>
</IconGallery>
```

```tsx
{/* Automated with iteration for large icon sets */}
<IconGallery>
  {Object.keys(icons).map((icon) => (
    <IconItem key={icon} name={icon}>
      <Icon icon={icon} />
    </IconItem>
  ))}
</IconGallery>
```

## Notes

- Best suited for documenting React icon components
- Renders icons in a grid layout with automatic layout management

## Related

- [color-palette.md](./color-palette.md)
- [typeset.md](./typeset.md)
