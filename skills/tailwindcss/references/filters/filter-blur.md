---
source: https://tailwindcss.com/docs/filter-blur
---

# filter: blur()

Utilities for applying blur filters to an element.

## Signature / Usage

```html
<img class="blur-none" src="/img/mountains.jpg" />
<img class="blur-sm" src="/img/mountains.jpg" />
<img class="blur-lg" src="/img/mountains.jpg" />
<img class="blur-2xl" src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `blur-xs` | `filter: blur(var(--blur-xs)); /* 4px */` |
| `blur-sm` | `filter: blur(var(--blur-sm)); /* 8px */` |
| `blur-md` | `filter: blur(var(--blur-md)); /* 12px */` |
| `blur-lg` | `filter: blur(var(--blur-lg)); /* 16px */` |
| `blur-xl` | `filter: blur(var(--blur-xl)); /* 24px */` |
| `blur-2xl` | `filter: blur(var(--blur-2xl)); /* 40px */` |
| `blur-3xl` | `filter: blur(var(--blur-3xl)); /* 64px */` |
| `blur-none` | `filter: ;` |
| `blur-(<custom-property>)` | `filter: blur(var(<custom-property>));` |
| `blur-[<value>]` | `filter: blur(<value>);` |

## Notes

- Migration (v3 → v4): the default blur scale was renamed. v3 `blur-sm` is now `blur-xs`, and v3 `blur` is now `blur-sm`. The "bare" versions still work for backward compatibility, but the `<utility>-sm` utilities will look different unless updated to their respective `<utility>-xs` versions.
- Using a custom value: use the `blur-[<value>]` syntax to set the blur based on a completely custom value:

```html
<img class="blur-[2px] ..." src="/img/mountains.jpg" />
```

- For CSS variables, you can also use the `blur-(<custom-property>)` syntax. This is just a shorthand for `blur-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<img class="blur-(--my-blur) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix a `filter: blur()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<img class="blur-none md:blur-lg ..." src="/img/mountains.jpg" />
```

- Customizing your theme: use the `--blur-*` theme variables to customize the blur utilities in your project (see `../core-concepts/theme.md`):

```css
@theme {
  --blur-2xs: 2px;
}
```

- Now the `blur-2xs` utility can be used in your markup:

```html
<img class="blur-2xs" src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/filter-blur.mdx` (fetched 2026-10-16)

## Related

- [filter](./filter.md)
- [backdrop-filter: blur()](./backdrop-filter-blur.md)
