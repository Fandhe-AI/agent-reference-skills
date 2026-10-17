---
source: https://tailwindcss.com/docs/filter-sepia
---

# filter: sepia()

Utilities for applying sepia filters to an element.

## Signature / Usage

```html
<img class="sepia-0" src="/img/mountains.jpg" />
<img class="sepia-50" src="/img/mountains.jpg" />
<img class="sepia" src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `sepia` | `filter: sepia(100%);` |
| `sepia-<number>` | `filter: sepia(<number>%);` |
| `sepia-(<custom-property>)` | `filter: sepia(var(<custom-property>));` |
| `sepia-[<value>]` | `filter: sepia(<value>);` |

## Notes

- Use utilities like `sepia` and `sepia-50` to control the sepia effect applied to an element.
- Using a custom value: use the `sepia-[<value>]` syntax to set the sepia amount based on a completely custom value:

```html
<img class="sepia-[.25] ..." src="/img/mountains.jpg" />
```

- For CSS variables, you can also use the `sepia-(<custom-property>)` syntax. This is just a shorthand for `sepia-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<img class="sepia-(--my-sepia) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix a `filter: sepia()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<img class="sepia md:sepia-0 ..." src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/filter-sepia.mdx` (fetched 2026-10-16)

## Related

- [filter](./filter.md)
- [backdrop-filter: sepia()](./backdrop-filter-sepia.md)
