# Motion in Squarespace

Add Motion to a Squarespace site through Code Injection using a CDN module script.

## Signature / Usage

Admin menu > Custom Code > Code Injection > Footer:

```html
<script type="module" defer>
    import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm"

    // Your animation code here
    animate("h1", { opacity: [0, 1] })
</script>
```

Selecting elements:

```html
<script type="module" defer>
    import { animate, press } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm"

    press("a", (element) => {
      animate(element, { scale: 0.7 })

      return () => animate(element, { scale: 1 })
    })
</script>
```

## Notes

- `11.13.5` is the docs example version; replace it with the desired version. The mini `animate` (3.2kb) is available from `https://cdn.jsdelivr.net/npm/motion@11.13.5/mini/+esm`.
- The CDN import includes all of Motion; for smaller output bundle with Vite / Rollup (`import { animate } from "motion"`), upload to a CDN and load with `<script async src="...">`.
- Source: https://motion.dev/docs/squarespace (fetched 2026-10).

## Related

- [Reduce bundle size](./reduce-bundle-size.md)
