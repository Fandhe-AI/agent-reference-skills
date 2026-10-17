---
source: https://tailwindcss.com/docs/appearance
---

# appearance

Utilities for suppressing native form control styling.

## Signature / Usage

```html
<select>
  <option>Yes</option>
  <option>No</option>
  <option>Maybe</option>
</select>

<div class="grid">
  <select class="col-start-1 row-start-1 appearance-none bg-gray-50 dark:bg-gray-800 ...">
    <option>Yes</option>
    <option>No</option>
    <option>Maybe</option>
  </select>
  <svg class="pointer-events-none col-start-1 row-start-1 ...">
    <!-- ... -->
  </svg>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `appearance-none` | `appearance: none;` |
| `appearance-auto` | `appearance: auto;` |

## Notes

- Removing default appearance: use `appearance-none` to reset any browser specific styling on an element. This utility is often used when creating custom form components.
- Restoring default appearance: use `appearance-auto` to restore the default browser specific styling on an element. This is useful for reverting to the standard browser controls in certain accessibility modes:

```html
<label>
  <div>
    <input type="checkbox" class="appearance-none forced-colors:appearance-auto ..." />
    <svg class="invisible peer-checked:visible forced-colors:hidden ...">
      <!-- ... -->
    </svg>
  </div>
  Falls back to default appearance
</label>

<label>
  <div>
    <input type="checkbox" class="appearance-none ..." />
    <svg class="invisible peer-checked:visible ...">
      <!-- ... -->
    </svg>
  </div>
  Keeps custom appearance
</label>
```

- Responsive design: prefix an `appearance` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<select class="appearance-auto md:appearance-none ...">
  <!-- ... -->
</select>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/appearance.mdx` (fetched 2026-10-16).

## Related

- [forced-color-adjust](./forced-color-adjust.md)
- [accent-color](./accent-color.md)
