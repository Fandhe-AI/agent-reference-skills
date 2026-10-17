---
source: https://tailwindcss.com/docs/font-weight
---

# font-weight

Utilities for controlling the font weight of an element.

## Signature / Usage

```html
<p class="font-light ...">The quick brown fox ...</p>
<p class="font-normal ...">The quick brown fox ...</p>
<p class="font-medium ...">The quick brown fox ...</p>
<p class="font-semibold ...">The quick brown fox ...</p>
<p class="font-bold ...">The quick brown fox ...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `font-thin` | `font-weight: 100;` |
| `font-extralight` | `font-weight: 200;` |
| `font-light` | `font-weight: 300;` |
| `font-normal` | `font-weight: 400;` |
| `font-medium` | `font-weight: 500;` |
| `font-semibold` | `font-weight: 600;` |
| `font-bold` | `font-weight: 700;` |
| `font-extrabold` | `font-weight: 800;` |
| `font-black` | `font-weight: 900;` |
| `font-(<custom-property>)` | `font-weight: var(<custom-property>);` |
| `font-[<value>]` | `font-weight: <value>;` |

## Notes

- Custom value: use the `font-[<value>]` syntax to set the font weight based on a completely custom value.

  ```html
  <p class="font-[1000] ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- For CSS variables, use the `font-(weight:<custom-property>)` syntax; it is a shorthand for `font-[weight:var(<custom-property>)]` that adds the `var()` function automatically.

  ```html
  <p class="font-(weight:--my-font-weight) ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Responsive design: prefix a `font-weight` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <p class="font-normal md:font-bold ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Customizing your theme: use the `--font-weight-*` theme variables to customize the font weight utilities in your project.

  ```css
  @theme {
    --font-weight-extrablack: 1000;
  }
  ```

  Now the `font-extrablack` utility can be used in your markup.

- Tailwind theme variables and `@theme` are a different system from Chakra UI tokens (`fontWeights` / `defineConfig` theme); see the chakra-ui skill for those.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/font-weight.mdx` (fetched 2026-10-16)

## Related

- [font-family](./font-family.md)
- [font-size](./font-size.md)
- [font-stretch](./font-stretch.md)
