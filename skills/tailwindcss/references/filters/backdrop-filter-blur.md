---
source: https://tailwindcss.com/docs/backdrop-filter-blur
---

# backdrop-filter: blur()

Utilities for applying backdrop blur filters to an element.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-blur-none ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-blur-sm ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-blur-md ..."></div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `backdrop-blur-xs` | `backdrop-filter: blur(var(--blur-xs)); /* 4px */` |
| `backdrop-blur-sm` | `backdrop-filter: blur(var(--blur-sm)); /* 8px */` |
| `backdrop-blur-md` | `backdrop-filter: blur(var(--blur-md)); /* 12px */` |
| `backdrop-blur-lg` | `backdrop-filter: blur(var(--blur-lg)); /* 16px */` |
| `backdrop-blur-xl` | `backdrop-filter: blur(var(--blur-xl)); /* 24px */` |
| `backdrop-blur-2xl` | `backdrop-filter: blur(var(--blur-2xl)); /* 40px */` |
| `backdrop-blur-3xl` | `backdrop-filter: blur(var(--blur-3xl)); /* 64px */` |
| `backdrop-blur-none` | `backdrop-filter: ;` |
| `backdrop-blur-(<custom-property>)` | `backdrop-filter: blur(var(<custom-property>));` |
| `backdrop-blur-[<value>]` | `backdrop-filter: blur(<value>);` |

## Notes

- Migration (v3 → v4): the default blur scale was renamed. v3 `backdrop-blur-sm` is now `backdrop-blur-xs`, and v3 `backdrop-blur` is now `backdrop-blur-sm`. The "bare" versions still work for backward compatibility, but the `<utility>-sm` utilities will look different unless updated to their respective `<utility>-xs` versions.
- Use utilities like `backdrop-blur-sm` and `backdrop-blur-lg` to control an element's backdrop blur.
- Using a custom value: use the `backdrop-blur-[<value>]` syntax to set the backdrop blur based on a completely custom value:

```html
<div class="backdrop-blur-[2px] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `backdrop-blur-(<custom-property>)` syntax. This is just a shorthand for `backdrop-blur-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="backdrop-blur-(--my-backdrop-blur) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `backdrop-filter: blur()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="backdrop-blur-none md:backdrop-blur-lg ...">
  <!-- ... -->
</div>
```

- Customizing your theme: use the `--blur-*` theme variables to customize the backdrop blur utilities in your project (see `../core-concepts/theme.md`):

```css
@theme {
  --blur-2xs: 2px;
}
```

- Now the `backdrop-blur-2xs` utility can be used in your markup:

```html
<div class="backdrop-blur-2xs">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/backdrop-filter-blur.mdx` (fetched 2026-10-16)

## Related

- [backdrop-filter](./backdrop-filter.md)
- [filter: blur()](./filter-blur.md)
