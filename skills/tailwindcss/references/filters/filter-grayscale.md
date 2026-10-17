---
source: https://tailwindcss.com/docs/filter-grayscale
---

# filter: grayscale()

Utilities for applying grayscale filters to an element.

## Signature / Usage

```html
<img class="grayscale-0 ..." src="/img/mountains.jpg" />
<img class="grayscale-25 ..." src="/img/mountains.jpg" />
<img class="grayscale-50 ..." src="/img/mountains.jpg" />
<img class="grayscale ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `grayscale` | `filter: grayscale(100%);` |
| `grayscale-<number>` | `filter: grayscale(<number>%);` |
| `grayscale-(<custom-property>)` | `filter: grayscale(var(<custom-property>));` |
| `grayscale-[<value>]` | `filter: grayscale(<value>);` |

## Notes

- Use utilities like `grayscale` and `grayscale-75` to control the amount of grayscale effect applied to an element.
- Using a custom value: use the `grayscale-[<value>]` syntax to set the grayscale based on a completely custom value:

```html
<img class="grayscale-[0.5] ..." src="/img/mountains.jpg" />
```

- For CSS variables, you can also use the `grayscale-(<custom-property>)` syntax. This is just a shorthand for `grayscale-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<img class="grayscale-(--my-grayscale) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix a `filter: grayscale()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<img class="grayscale md:grayscale-0 ..." src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/filter-grayscale.mdx` (fetched 2026-10-16)

## Related

- [filter](./filter.md)
- [backdrop-filter: grayscale()](./backdrop-filter-grayscale.md)
