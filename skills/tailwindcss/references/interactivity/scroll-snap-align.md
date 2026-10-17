---
source: https://tailwindcss.com/docs/scroll-snap-align
---

# scroll-snap-align

Utilities for controlling the scroll snap alignment of an element.

## Signature / Usage

```html
<div class="snap-x ...">
  <div class="snap-center ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <div class="snap-center ...">
    <img src="/img/vacation-02.jpg" />
  </div>
  <div class="snap-center ...">
    <img src="/img/vacation-03.jpg" />
  </div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `snap-start` | `scroll-snap-align: start;` |
| `snap-end` | `scroll-snap-align: end;` |
| `snap-center` | `scroll-snap-align: center;` |
| `snap-align-none` | `scroll-snap-align: none;` |

## Notes

- Snapping to the center: use the `snap-center` utility to snap an element to its center when being scrolled inside a snap container.
- Snapping to the start: use the `snap-start` utility to snap an element to its start when being scrolled inside a snap container:

```html
<div class="snap-x ...">
  <div class="snap-start ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <!-- ... -->
</div>
```

- Snapping to the end: use the `snap-end` utility to snap an element to its end when being scrolled inside a snap container:

```html
<div class="snap-x ...">
  <div class="snap-end ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <!-- ... -->
</div>
```

- Responsive design: prefix a `scroll-snap-align` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="snap-center md:snap-start ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/scroll-snap-align.mdx` (fetched 2026-10-16).

## Related

- [scroll-snap-type](./scroll-snap-type.md)
- [scroll-snap-stop](./scroll-snap-stop.md)
- [scroll-margin](./scroll-margin.md)
- [scroll-padding](./scroll-padding.md)
