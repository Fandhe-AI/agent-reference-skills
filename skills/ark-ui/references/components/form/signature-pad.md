# Signature Pad

Enables users to draw signatures using an interactive drawing surface, useful for digital signature capture in forms and applications.

## Anatomy

- `Root` — main container wrapper
- `Label` — associated label element
- `Control` — drawing area container
- `Segment` — SVG canvas for signature rendering
- `Guide` — visual guide element
- `ClearTrigger` — button to reset the signature
- `HiddenInput` — form submission support

## Signature / Usage

```tsx
import { SignaturePad } from '@ark-ui/react/signature-pad'

<SignaturePad.Root>
  <SignaturePad.Label />
  <SignaturePad.Control>
    <SignaturePad.Segment />
    <SignaturePad.ClearTrigger />
    <SignaturePad.Guide />
  </SignaturePad.Control>
</SignaturePad.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `defaultPaths` | `Path[]` | Initial signature paths |
| `disabled` | `boolean` | Disable drawing capability |
| `readOnly` | `boolean` | Prevent modifications |
| `onDraw` / `onDrawEnd` | `function` | Drawing event callbacks |
| `drawing` | `object` | Configure brush size and pressure simulation |
| `name` | `string` | Form field identification |

## Notes

- Context API exposes `empty`, `drawing`, `paths`, and methods like `getDataUrl()` and `clear()`
- Combine with `RootProvider` + `useSignaturePad` hook for external state control
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Field](./field.md)
