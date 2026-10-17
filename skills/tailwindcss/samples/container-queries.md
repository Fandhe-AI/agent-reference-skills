---
source: https://tailwindcss.com/docs/responsive-design
---

# Container Queries

Style children by the size of a parent container with `@container` and variants such as `@md` and `@max-md`.

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

Max-width and range queries:

```html
<div class="@container">
  <div class="flex flex-row @max-md:flex-col">
    <!-- ... -->
  </div>
</div>

<div class="@container">
  <div class="flex flex-row @sm:@max-md:flex-col">
    <!-- ... -->
  </div>
</div>
```

## Notes

- Container queries are mobile-first, like breakpoint variants: they apply at the target container size and up.
- Name containers with `@container/{name}` and target them with variants like `@sm/{name}`.
- Chakra UI responsive style props are a different mechanism; see the chakra-ui skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/responsive-design.mdx` (fetched 2026-10-16).
