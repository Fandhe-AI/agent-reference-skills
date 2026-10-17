---
source: https://tailwindcss.com/docs/scroll-snap-stop
---

# scroll-snap-stop

Utilities for controlling whether you can skip past possible snap positions.

## Signature / Usage

```html
<div class="snap-x snap-mandatory ...">
  <div class="snap-center snap-always ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <div class="snap-center snap-always ...">
    <img src="/img/vacation-02.jpg" />
  </div>
  <div class="snap-center snap-always ...">
    <img src="/img/vacation-03.jpg" />
  </div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `snap-normal` | `scroll-snap-stop: normal;` |
| `snap-always` | `scroll-snap-stop: always;` |

## Notes

- Forcing snap position stops: use the `snap-always` utility together with the `snap-mandatory` utility (see scroll-snap-type) to force a snap container to always stop on an element before the user can continue scrolling to the next item.
- Skipping snap position stops: use the `snap-normal` utility to allow a snap container to skip past possible scroll snap positions:

```html
<div class="snap-x ...">
  <div class="snap-center snap-normal ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <!-- ... -->
</div>
```

- Responsive design: prefix a `scroll-snap-stop` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="snap-always md:snap-normal ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/scroll-snap-stop.mdx` (fetched 2026-10-16).

## Related

- [scroll-snap-type](./scroll-snap-type.md)
- [scroll-snap-align](./scroll-snap-align.md)
