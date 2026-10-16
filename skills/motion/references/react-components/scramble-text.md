# ScrambleText (Motion+)

1kb React component for scramble text animations. Renders via motion values, avoiding React re-renders.

## Signature / Usage

```tsx
import { ScrambleText } from "motion-plus/react"

<ScrambleText>Hello world!</ScrambleText>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` | string | Text to animate in character by character |
| `delay` | number \| `stagger()` | Stagger when each character starts scrambling |
| `duration` | number \| `stagger()` | How long characters scramble before revealing; stagger gives letter-by-letter reveal |
| `active` | boolean | Toggle to start/stop scrambling (hover or scroll-triggered effects) |

```tsx
import { stagger } from "motion"

<ScrambleText delay={stagger(0.05, { from: "center" })} duration={0.5}>
  Hello world!
</ScrambleText>
```

## Notes

- Motion+ (paid) component; not included in the free `motion` package. Requires Motion UI install and a Motion+ access token.
- Uses the default alphanumeric character set, or custom characters (including emoji); the prop for this is in the members-only part of the page and is not documented here.

## Related

- [Typewriter](./typewriter.md)
