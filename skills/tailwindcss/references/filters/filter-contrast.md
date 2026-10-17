---
source: https://tailwindcss.com/docs/filter-contrast
---

# filter: contrast()

Utilities for applying contrast filters to an element.

## Signature / Usage

```html
<img class="contrast-50 ..." src="/img/mountains.jpg" />
<img class="contrast-100 ..." src="/img/mountains.jpg" />
<img class="contrast-125 ..." src="/img/mountains.jpg" />
<img class="contrast-200 ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `contrast-<number>` | `filter: contrast(<number>%);` |
| `contrast-(<custom-property>)` | `filter: contrast(var(<custom-property>));` |
| `contrast-[<value>]` | `filter: contrast(<value>);` |

## Notes

- Use utilities like `contrast-50` and `contrast-100` to control an element's contrast.
- Using a custom value: use the `contrast-[<value>]` syntax to set the contrast based on a completely custom value:

```html
<img class="contrast-[.25] ..." src="/img/mountains.jpg" />
```

- For CSS variables, you can also use the `contrast-(<custom-property>)` syntax. This is just a shorthand for `contrast-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<img class="contrast-(--my-contrast) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix a `filter: contrast()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<img class="contrast-125 md:contrast-150 ..." src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/filter-contrast.mdx` (fetched 2026-10-16)

## Related

- [filter](./filter.md)
- [backdrop-filter: contrast()](./backdrop-filter-contrast.md)
