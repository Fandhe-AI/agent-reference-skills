---
source: https://tailwindcss.com/docs/scroll-snap-type
---

# scroll-snap-type

Utilities for controlling how strictly snap points are enforced in a snap container.

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
| `snap-none` | `scroll-snap-type: none;` |
| `snap-x` | `scroll-snap-type: x var(--tw-scroll-snap-strictness);` |
| `snap-y` | `scroll-snap-type: y var(--tw-scroll-snap-strictness);` |
| `snap-both` | `scroll-snap-type: both var(--tw-scroll-snap-strictness);` |
| `snap-mandatory` | `--tw-scroll-snap-strictness: mandatory;` |
| `snap-proximity` | `--tw-scroll-snap-strictness: proximity;` |

## Notes

- Horizontal scroll snapping: use the `snap-x` utility to enable horizontal scroll snapping within an element. For scroll snapping to work, you need to also set the scroll snap alignment (see scroll-snap-align) on the children.
- Mandatory scroll snapping: use the `snap-mandatory` utility to force a snap container to always come to rest on a snap point:

```html
<div class="snap-x snap-mandatory ...">
  <div class="snap-center ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <!-- ... -->
</div>
```

- Proximity scroll snapping: use the `snap-proximity` utility to make a snap container come to rest on snap points that are close in proximity:

```html
<div class="snap-x snap-proximity ...">
  <div class="snap-center ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <!-- ... -->
</div>
```

- Responsive design: prefix a `scroll-snap-type` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="snap-none md:snap-x ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/scroll-snap-type.mdx` (fetched 2026-10-16).

## Related

- [scroll-snap-align](./scroll-snap-align.md)
- [scroll-snap-stop](./scroll-snap-stop.md)
- [scroll-margin](./scroll-margin.md)
- [scroll-padding](./scroll-padding.md)
