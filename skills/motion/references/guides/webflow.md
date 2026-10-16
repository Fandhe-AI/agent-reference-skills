# Motion in Webflow

Add Motion to a Webflow site via a CDN module script for animations beyond Webflow's native capabilities.

## Signature / Usage

Pages dialog > "Edit page settings" > "Before `<body />` tag":

```html
<script type="module">
  import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm"

  animate("header", { opacity: 1 })
</script>
```

Mini `animate` (3.2kb):

```html
<script type="module">
  import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/mini/+esm"
</script>
```

Custom bundle (tree-shaken, e.g. Vite / Rollup), uploaded to a CDN:

```html
<script async src="https://yourdomain.com/my-script.js"></script>
```

## Notes

- `11.13.5` is the version used in the docs example; replace it with the version you want (latest on the npm package page).
- Importing from the CDN URL includes all of Motion; bundling with `import { animate } from "motion"` includes only what you use.
- Use cases: animating gradients and masks, hardware-accelerated scroll animations, complex timeline sequences, Three.js.
- Source: https://motion.dev/docs/webflow (fetched 2026-10).

## Related

- [Reduce bundle size](./reduce-bundle-size.md)
