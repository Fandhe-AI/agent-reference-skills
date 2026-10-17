---
source: https://tailwindcss.com/docs/font-feature-settings
---

# font-feature-settings

Utilities for controlling advanced typographic features.

## Signature / Usage

```html
<p class="font-features-['smcp'] ...">This text uses small caps.</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `font-features-[<value>]` | `font-feature-settings: <value>;` |
| `font-features-(<custom-property>)` | `font-feature-settings: var(<custom-property>);` |

## Notes

- Use the `font-features-[<value>]` utility to enable OpenType features in fonts that support them.
- Enabling multiple features: separate them with commas.

  ```html
  <p class="font-features-['smcp','onum'] ...">This text uses small caps and oldstyle numbers.</p>
  ```

- Using CSS variables: use the `font-features-(<custom-property>)` syntax to apply font feature settings from a CSS variable.

  ```html
  <p class="font-features-(--my-features) ...">
    <!-- ... -->
  </p>
  ```

- Responsive design: prefix a `font-feature-settings` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <p class="font-features-['tnum'] md:font-features-['smcp'] ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- To set default `font-feature-settings` for a font family, use the `--font-<name>--font-feature-settings` theme variable described in font-family.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/font-feature-settings.mdx` (fetched 2026-10-16)

## Related

- [font-variant-numeric](./font-variant-numeric.md)
- [font-family](./font-family.md)
