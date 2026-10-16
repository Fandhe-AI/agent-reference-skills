# Typewriter (Motion+)

1.3kb React component for realistic typewriter animations with human-like variance, backspacing on content change, and screen reader support.

## Signature / Usage

```tsx
import { Typewriter } from "motion-plus/react"

<Typewriter>Hello world!</Typewriter>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` | string | Text to type in character by character |
| `backspace` | `"word"` \| `"all"` | When children change: default backspaces per character; `"word"` per word/special character; `"all"` removes all mismatching content at once |
| `speed` | `"fast"` \| `"slow"` \| number | Typing speed; number is a custom interval in milliseconds. Default emulates normal typing |
| `variance` | number (0-1) | Factor applied to `speed` to randomise per-character speed. `0` is none |

```tsx
<Typewriter backspace="word">{text}</Typewriter>
<Typewriter speed="slow" variance={0.5}>Hello world!</Typewriter>
```

## Notes

- Motion+ (paid) component; not included in the free `motion` package. Requires Motion UI install and a Motion+ access token.
- When `children` changes it backspaces to the point of difference, then types the new content.
- Also available for vanilla JavaScript as the `typewriter` function.
- Playback control, cursor style and blink speed are in the members-only part of the page and are not documented here.
- Source: https://motion.dev/docs/react-typewriter (fetched 2026-10).

## Related

- [ScrambleText](./scramble-text.md)
