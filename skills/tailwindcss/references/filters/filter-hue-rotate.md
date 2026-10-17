---
source: https://tailwindcss.com/docs/filter-hue-rotate
---

# filter: hue-rotate()

Utilities for applying hue-rotate filters to an element.

## Signature / Usage

```html
<img class="hue-rotate-15" src="/img/mountains.jpg" />
<img class="hue-rotate-90" src="/img/mountains.jpg" />
<img class="hue-rotate-180" src="/img/mountains.jpg" />
<img class="hue-rotate-270" src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `hue-rotate-<number>` | `filter: hue-rotate(<number>deg);` |
| `-hue-rotate-<number>` | `filter: hue-rotate(calc(<number>deg * -1));` |
| `hue-rotate-(<custom-property>)` | `filter: hue-rotate(var(<custom-property>));` |
| `hue-rotate-[<value>]` | `filter: hue-rotate(<value>);` |

## Notes

- Use utilities like `hue-rotate-90` and `hue-rotate-180` to rotate the hue of an element by degrees.
- Using negative values: use utilities like `-hue-rotate-15` and `-hue-rotate-45` to set a negative hue rotate value:

```html
<img class="-hue-rotate-15" src="/img/mountains.jpg" />
<img class="-hue-rotate-45" src="/img/mountains.jpg" />
<img class="-hue-rotate-90" src="/img/mountains.jpg" />
```

- Using a custom value: use the `hue-rotate-[<value>]` syntax to set the hue rotation based on a completely custom value:

```html
<img class="hue-rotate-[3.142rad] ..." src="/img/mountains.jpg" />
```

- For CSS variables, you can also use the `hue-rotate-(<custom-property>)` syntax. This is just a shorthand for `hue-rotate-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<img class="hue-rotate-(--my-hue-rotate) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix a `filter: hue-rotate()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<img class="hue-rotate-60 md:hue-rotate-0 ..." src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/filter-hue-rotate.mdx` (fetched 2026-10-16)

## Related

- [filter](./filter.md)
- [backdrop-filter: hue-rotate()](./backdrop-filter-hue-rotate.md)
