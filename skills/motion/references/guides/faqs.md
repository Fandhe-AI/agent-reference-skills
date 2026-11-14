# FAQs

Answers to common questions about Motion: browser support and animations that finish instantly.

## Signature / Usage

Browser support: Motion supports all modern browsers. It does not support Internet Explorer 11 or below.

An animation that appears to finish instantly has one of two causes:

1. Animating CSS variables in a browser that doesn't support the CSS Properties and Values API (`CSS.registerProperty`) finishes instantly.
2. Animating to `scale(0)` in older versions of Safari completes instantly (a Safari bug).

Adapted (not in the official docs): illustrative CSS variable animation; the FAQ page itself contains no code.

```javascript
import { animate } from "motion"

// Animating a CSS variable relies on CSS.registerProperty support
animate(element, { "--progress": 1 })
```

## Notes

- The official FAQ page is short and lists only these items. For other runtime errors see `troubleshooting.md`.
- Adapted (not in the official docs): the snippet is an illustrative CSS variable animation, because the FAQ page contains no code.
- Source: https://motion.dev/docs/faqs (fetched 2026-11-14).

## Related

- [troubleshooting](./troubleshooting.md)
- [performance](./performance.md)
