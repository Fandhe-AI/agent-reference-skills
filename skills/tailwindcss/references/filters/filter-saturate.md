---
source: https://tailwindcss.com/docs/filter-saturate
---

# filter: saturate()

Utilities for applying saturation filters to an element.

## Signature / Usage

```html
<img class="saturate-50 ..." src="/img/mountains.jpg" />
<img class="saturate-100 ..." src="/img/mountains.jpg" />
<img class="saturate-150 ..." src="/img/mountains.jpg" />
<img class="saturate-200 ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `saturate-<number>` | `filter: saturate(<number>%);` |
| `saturate-(<custom-property>)` | `filter: saturate(var(<custom-property>));` |
| `saturate-[<value>]` | `filter: saturate(<value>);` |

## Notes

- Use utilities like `saturate-50` and `saturate-100` to control an element's saturation.
- Using a custom value: use the `saturate-[<value>]` syntax to set the saturation based on a completely custom value:

```html
<img class="saturate-[.25] ..." src="/img/mountains.jpg" />
```

- For CSS variables, you can also use the `saturate-(<custom-property>)` syntax. This is just a shorthand for `saturate-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<img class="saturate-(--my-saturation) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix a `filter: saturate()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<img class="saturate-50 md:saturate-150 ..." src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/filter-saturate.mdx` (fetched 2026-10-16)

## Related

- [filter](./filter.md)
- [backdrop-filter: saturate()](./backdrop-filter-saturate.md)
