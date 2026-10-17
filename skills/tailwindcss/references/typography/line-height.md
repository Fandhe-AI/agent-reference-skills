---
source: https://tailwindcss.com/docs/line-height
---

# line-height

Utilities for controlling the leading, or line height, of an element.

## Signature / Usage

```html
<p class="text-base/6 ...">So I started to walk into the water...</p>
<p class="text-base/7 ...">So I started to walk into the water...</p>
<p class="text-base/8 ...">So I started to walk into the water...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `text-<size>/<number>` | `font-size: <size>;` `line-height: calc(var(--spacing) * <number>);` |
| `text-<size>/(<custom-property>)` | `font-size: <size>;` `line-height: var(<custom-property>);` |
| `text-<size>/[<value>]` | `font-size: <size>;` `line-height: <value>;` |
| `leading-none` | `line-height: 1;` |
| `leading-<number>` | `line-height: calc(var(--spacing) * <number>);` |
| `leading-(<custom-property>)` | `line-height: var(<custom-property>);` |
| `leading-[<value>]` | `line-height: <value>;` |

## Notes

- Use font size utilities like `text-sm/6` and `text-lg/7` to set the font size and line-height of an element at the same time. Each font size utility also sets a default line height when one isn't provided; see font-size.
- Setting independently: use `leading-<number>` utilities like `leading-6` and `leading-7` to set the line height independent of the font-size.

  ```html
  <p class="text-sm leading-6">So I started to walk into the water...</p>
  <p class="text-sm leading-7">So I started to walk into the water...</p>
  <p class="text-sm leading-8">So I started to walk into the water...</p>
  ```

- Removing the leading: use `leading-none` to set the line height equal to the font size.

  ```html
  <p class="text-2xl leading-none ...">The quick brown fox...</p>
  ```

- Custom value: use the `leading-[<value>]` syntax to set the line height based on a completely custom value.

  ```html
  <p class="leading-[1.5] ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- For CSS variables, use the `leading-(<custom-property>)` syntax; it is a shorthand for `leading-[var(<custom-property>)]` that adds the `var()` function automatically.

  ```html
  <p class="leading-(--my-line-height) ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Responsive design: prefix a `line-height` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <p class="leading-5 md:leading-6 ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Customizing your theme: the `leading-<number>` utilities are driven by the `--spacing` theme variable, which can be customized in your own theme.

  ```css
  @theme {
    --spacing: 1px;
  }
  ```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/line-height.mdx` (fetched 2026-10-16)

## Related

- [font-size](./font-size.md)
- [letter-spacing](./letter-spacing.md)
- [line-clamp](./line-clamp.md)
