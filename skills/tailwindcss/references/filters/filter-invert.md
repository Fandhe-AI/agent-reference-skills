---
source: https://tailwindcss.com/docs/filter-invert
---

# filter: invert()

Utilities for applying invert filters to an element.

## Signature / Usage

```html
<img class="invert-0" src="/img/mountains.jpg" />
<img class="invert-20" src="/img/mountains.jpg" />
<img class="invert" src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `invert` | `filter: invert(100%);` |
| `invert-<number>` | `filter: invert(<number>%);` |
| `invert-(<custom-property>)` | `filter: invert(var(<custom-property>));` |
| `invert-[<value>]` | `filter: invert(<value>);` |

## Notes

- Use utilities like `invert` and `invert-20` to control the color inversion of an element.
- Using a custom value: use the `invert-[<value>]` syntax to set the color inversion based on a completely custom value:

```html
<img class="invert-[.25] ..." src="/img/mountains.jpg" />
```

- For CSS variables, you can also use the `invert-(<custom-property>)` syntax. This is just a shorthand for `invert-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<img class="invert-(--my-inversion) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix a `filter: invert()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<img class="invert md:invert-0 ..." src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/filter-invert.mdx` (fetched 2026-10-16)

## Related

- [filter](./filter.md)
- [backdrop-filter: invert()](./backdrop-filter-invert.md)
