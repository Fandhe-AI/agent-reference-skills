---
source: https://tailwindcss.com/docs/filter
---

# filter

Utilities for applying filters to an element.

## Signature / Usage

```html
<img class="blur-xs" src="/img/mountains.jpg" />
<img class="grayscale" src="/img/mountains.jpg" />
<img class="blur-xs grayscale" src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `filter-none` | `filter: none;` |
| `filter-(<custom-property>)` | `filter: var(<custom-property>);` |
| `filter-[<value>]` | `filter: <value>;` |

## Notes

- Use utilities like `blur-xs` and `grayscale` to apply filters to an element. You can combine the following filter utilities: blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, saturate, and sepia.
- Removing filters: use the `filter-none` utility to remove all of the filters applied to an element:

```html
<img class="blur-md brightness-150 invert md:filter-none" src="/img/mountains.jpg" />
```

- Using a custom value: use the `filter-[<value>]` syntax to set the filter based on a completely custom value:

```html
<img class="filter-[url('filters.svg#filter-id')] ..." src="/img/mountains.jpg" />
```

- For CSS variables, you can also use the `filter-(<custom-property>)` syntax. This is just a shorthand for `filter-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<img class="filter-(--my-filter) ..." src="/img/mountains.jpg" />
```

- Applying on hover: prefix a `filter` utility with a variant like `hover:*` to only apply the utility in that state:

```html
<img class="blur-sm hover:filter-none ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix a `filter` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<img class="blur-sm md:filter-none ..." src="/img/mountains.jpg" />
```

- Learn more about using variants in the variants documentation (`../core-concepts/hover-focus-and-other-states.md`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/filter.mdx` (fetched 2026-10-16)

## Related

- [filter: blur()](./filter-blur.md)
- [filter: brightness()](./filter-brightness.md)
- [filter: contrast()](./filter-contrast.md)
- [filter: drop-shadow()](./filter-drop-shadow.md)
- [filter: grayscale()](./filter-grayscale.md)
- [filter: hue-rotate()](./filter-hue-rotate.md)
- [filter: invert()](./filter-invert.md)
- [filter: saturate()](./filter-saturate.md)
- [filter: sepia()](./filter-sepia.md)
- [backdrop-filter](./backdrop-filter.md)
