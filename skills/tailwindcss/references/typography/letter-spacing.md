---
source: https://tailwindcss.com/docs/letter-spacing
---

# letter-spacing

Utilities for controlling the tracking, or letter spacing, of an element.

## Signature / Usage

```html
<p class="tracking-tight ...">The quick brown fox ...</p>
<p class="tracking-normal ...">The quick brown fox ...</p>
<p class="tracking-wide ...">The quick brown fox ...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `tracking-tighter` | `letter-spacing: var(--tracking-tighter); /* -0.05em */` |
| `tracking-tight` | `letter-spacing: var(--tracking-tight); /* -0.025em */` |
| `tracking-normal` | `letter-spacing: var(--tracking-normal); /* 0em */` |
| `tracking-wide` | `letter-spacing: var(--tracking-wide); /* 0.025em */` |
| `tracking-wider` | `letter-spacing: var(--tracking-wider); /* 0.05em */` |
| `tracking-widest` | `letter-spacing: var(--tracking-widest); /* 0.1em */` |
| `tracking-(<custom-property>)` | `letter-spacing: var(<custom-property>);` |
| `tracking-[<value>]` | `letter-spacing: <value>;` |

## Notes

- Using negative values doesn't make a ton of sense with the named letter spacing scale Tailwind includes out of the box, but if you've customized your scale to use numbers it can be useful:

  ```css
  @theme {
    --tracking-1: 0em;
    --tracking-2: 0.025em;
    --tracking-3: 0.05em;
    --tracking-4: 0.1em;
  }
  ```

  To use a negative letter spacing value, prefix the class name with a dash:

  ```html
  <p class="-tracking-2">The quick brown fox ...</p>
  ```

- Custom value: use the `tracking-[<value>]` syntax to set the letter spacing based on a completely custom value.

  ```html
  <p class="tracking-[.25em] ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- For CSS variables, use the `tracking-(<custom-property>)` syntax; it is a shorthand for `tracking-[var(<custom-property>)]` that adds the `var()` function automatically.

  ```html
  <p class="tracking-(--my-tracking) ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Responsive design: prefix a `letter-spacing` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <p class="tracking-tight md:tracking-wide ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Customizing your theme: use the `--tracking-*` theme variables to customize the letter spacing utilities in your project.

  ```css
  @theme {
    --tracking-tightest: -0.075em;
  }
  ```

  Now the `tracking-tightest` utility can be used in your markup.

- Tailwind theme variables and `@theme` are a different system from Chakra UI tokens (`letterSpacings` / `defineConfig` theme); see the chakra-ui skill for those.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/letter-spacing.mdx` (fetched 2026-10-16)

## Related

- [font-size](./font-size.md)
- [line-height](./line-height.md)
