# Responsive Design

Chakra UI uses a mobile-first breakpoint system with min-width media queries, supporting multiple syntaxes for adaptive layouts.

## Overview

The default breakpoints are:

| Key | Value |
|-----|-------|
| `base` | 0rem (0px) |
| `sm` | 30rem (~480px) |
| `md` | 48rem (~768px) |
| `lg` | 62rem (~992px) |
| `xl` | 80rem (~1280px) |
| `2xl` | 96rem (~1536px) |

## Usage

```tsx
// Object syntax — recommended
<Text fontWeight={{ base: "medium", lg: "bold" }}>Text</Text>

// Array syntax — positional breakpoints
<Text fontWeight={["medium", undefined, undefined, "bold"]}>Text</Text>

// Range: apply between two breakpoints
<Box display={{ mdToXl: "none" }} />

// Only: target a single breakpoint
<Box display={{ lgOnly: "none" }} />

// Down: apply below a breakpoint
<Box display={{ smDown: "none" }} />

// Visibility helpers
<Box hideFrom="md" />   // hidden from md and above
<Box hideBelow="md" />  // hidden below md
```

## Notes

- The system is mobile-first: base styles apply to all screens, larger breakpoints override progressively
- `hideFrom` and `hideBelow` are utility props that set `display` under the hood

## Related

- [Overview](./overview.md)
- [Display Style Props](../style-props/display.md)
