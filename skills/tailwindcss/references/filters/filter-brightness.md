---
source: https://tailwindcss.com/docs/filter-brightness
---

# filter: brightness()

Utilities for applying brightness filters to an element.

## Signature / Usage

```html
<img class="brightness-50 ..." src="/img/mountains.jpg" />
<img class="brightness-100 ..." src="/img/mountains.jpg" />
<img class="brightness-125 ..." src="/img/mountains.jpg" />
<img class="brightness-200 ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `brightness-<number>` | `filter: brightness(<number>%);` |
| `brightness-(<custom-property>)` | `filter: brightness(var(<custom-property>));` |
| `brightness-[<value>]` | `filter: brightness(<value>);` |

## Notes

- Use utilities like `brightness-50` and `brightness-100` to control an element's brightness.
- Using a custom value: use the `brightness-[<value>]` syntax to set the brightness based on a completely custom value:

```html
<img class="brightness-[1.75] ..." src="/img/mountains.jpg" />
```

- For CSS variables, you can also use the `brightness-(<custom-property>)` syntax. This is just a shorthand for `brightness-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<img class="brightness-(--my-brightness) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix a `filter: brightness()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<img class="brightness-110 md:brightness-150 ..." src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/filter-brightness.mdx` (fetched 2026-10-16)

## Related

- [filter](./filter.md)
- [backdrop-filter: brightness()](./backdrop-filter-brightness.md)
