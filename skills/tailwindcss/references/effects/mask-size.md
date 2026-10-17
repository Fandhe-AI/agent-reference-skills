---
source: https://tailwindcss.com/docs/mask-size
---

# mask-size

Utilities for controlling the size of an element's mask image.

## Signature / Usage

```html
<div class="mask-cover mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-contain mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-auto mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `mask-auto` | `mask-size: auto;` |
| `mask-cover` | `mask-size: cover;` |
| `mask-contain` | `mask-size: contain;` |
| `mask-size-(<custom-property>)` | `mask-size: var(<custom-property>);` |
| `mask-size-[<value>]` | `mask-size: <value>;` |

## Notes

- Filling the container: `mask-cover` scales the mask image until it fills the mask layer, cropping the image if needed.
- Filling without cropping: `mask-contain` scales the mask image to the outer edges without cropping or stretching.
- Using the default size: `mask-auto` displays the mask image at its default size.

### Using a custom value

Use the `mask-size-[<value>]` syntax to set the mask image size based on a completely custom value:

```html
<div class="mask-size-[auto_100px] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `mask-size-(<custom-property>)` syntax:

```html
<div class="mask-size-(--my-mask-size) ...">
  <!-- ... -->
</div>
```

This is just a shorthand for `mask-size-[var(<custom-property>)]` that adds the `var()` function for you automatically.

### Responsive design

Prefix a `mask-size` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="mask-auto md:mask-contain ...">
  <!-- ... -->
</div>
```

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/mask-size.mdx` (fetched 2026-10-16).

## Related

- [mask-position](./mask-position.md)
- [mask-repeat](./mask-repeat.md)
- [background-size](../backgrounds-borders/background-size.md)
