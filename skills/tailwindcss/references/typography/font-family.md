---
source: https://tailwindcss.com/docs/font-family
---

# font-family

Utilities for controlling the font family of an element.

## Signature / Usage

```html
<p class="font-sans ...">The quick brown fox ...</p>
<p class="font-serif ...">The quick brown fox ...</p>
<p class="font-mono ...">The quick brown fox ...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `font-sans` | `font-family: var(--font-sans); /* -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' */` |
| `font-serif` | `font-family: var(--font-serif); /* ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif */` |
| `font-mono` | `font-family: var(--font-mono); /* ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace */` |
| `font-(family-name:<custom-property>)` | `font-family: var(<custom-property>);` |
| `font-[<value>]` | `font-family: <value>;` |

## Notes

- Custom value: use `font-[<value>]` to set the font family from a completely custom value.

  ```html
  <p class="font-[Open_Sans] ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- For CSS variables, use the `font-(family-name:<custom-property>)` syntax; it is a shorthand for `font-[family-name:var(<custom-property>)]` that adds the `var()` function automatically.

  ```html
  <p class="font-(family-name:--my-font) ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Responsive design: prefix a `font-family` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <p class="font-sans md:font-serif ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Customizing your theme: use the `--font-*` theme variables to customize the font family utilities in your project.

  ```css
  @theme {
    --font-display: "Oswald", sans-serif;
  }
  ```

  Now the `font-display` utility can be used in your markup.

- You can also provide default `font-feature-settings` and `font-variation-settings` values for a font family:

  ```css
  @theme {
    --font-display: "Oswald", sans-serif;
    --font-display--font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    --font-display--font-variation-settings: "opsz" 32;
  }
  ```

- If needed, use the `@font-face` at-rule to load custom fonts:

  ```css
  @font-face {
    font-family: Oswald;
    font-style: normal;
    font-weight: 200 700;
    font-display: swap;
    src: url("/fonts/Oswald.woff2") format("woff2");
  }
  ```

- If you're loading a font from a service like Google Fonts, put the `@import` at the very top of your CSS file. Browsers require that `@import` statements come before any other rules, so URL imports need to be above imports like `@import "tailwindcss"` which are inlined in the compiled CSS.

  ```css
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  @import "tailwindcss";

  @theme {
    --font-roboto: "Roboto", sans-serif;
  }
  ```

- Tailwind theme variables and `@theme` are a different system from Chakra UI tokens (`fonts` / `defineConfig` theme); see the chakra-ui skill for those.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/font-family.mdx` (fetched 2026-10-16)

## Related

- [font-size](./font-size.md)
- [font-weight](./font-weight.md)
- [font-feature-settings](./font-feature-settings.md)
