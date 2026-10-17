---
source: https://tailwindcss.com/docs/adding-custom-styles
---

# Arbitrary Values and --spacing()

Break out of the design tokens with square-bracket arbitrary values, properties, and variants, and use `--spacing()` in CSS and in `calc()`.

```html
<div class="top-[117px] lg:top-[344px]">
  <!-- ... -->
</div>

<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
  <!-- ... -->
</div>

<div class="fill-(--my-brand-color) ...">
  <!-- ... -->
</div>

<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>

<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>

<div class="text-(length:--my-var)">...</div>
<div class="text-(color:--my-var)">...</div>
```

```css
.my-element {
  margin: --spacing(4);
}
```

```html
<div class="py-[calc(--spacing(4)-1px)]">
  <!-- ... -->
</div>
```

## Notes

- Use `_` for spaces inside an arbitrary value; escape a literal underscore as `\_`.
- `--spacing(4)` compiles to `calc(var(--spacing) * 4)`.
- Add a CSS data type hint (`length:`, `color:`) when a CSS variable makes `text-(--my-var)` ambiguous.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/adding-custom-styles.mdx` and `src/docs/functions-and-directives.mdx` (fetched 2026-10-16).
