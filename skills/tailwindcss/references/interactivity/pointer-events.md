---
source: https://tailwindcss.com/docs/pointer-events
---

# pointer-events

Utilities for controlling whether an element responds to pointer events.

## Signature / Usage

```html
<div class="relative ...">
  <div class="pointer-events-auto absolute ...">
    <svg class="absolute h-5 w-5 text-gray-400">
      <!-- ... -->
    </svg>
  </div>
  <input type="text" placeholder="Search" class="..." />
</div>

<div class="relative ...">
  <div class="pointer-events-none absolute ...">
    <svg class="absolute h-5 w-5 text-gray-400">
      <!-- ... -->
    </svg>
  </div>
  <input type="text" placeholder="Search" class="..." />
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `pointer-events-auto` | `pointer-events: auto;` |
| `pointer-events-none` | `pointer-events: none;` |

## Notes

- Ignoring pointer events: use the `pointer-events-none` utility to make an element ignore pointer events, like `:hover` and `click` events. The pointer events will still trigger on child elements and pass-through to elements that are "beneath" the target.
- Restoring pointer events: use the `pointer-events-auto` utility to revert to the default browser behavior for pointer events:

```html
<div class="pointer-events-none md:pointer-events-auto ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/pointer-events.mdx` (fetched 2026-10-16).

## Related

- [cursor](./cursor.md)
- user-select
- touch-action
