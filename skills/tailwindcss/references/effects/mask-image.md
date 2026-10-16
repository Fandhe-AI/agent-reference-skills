---
source: https://tailwindcss.com/docs/mask-image
---

# mask-image

Utilities for controlling an element's mask image.

## Signature / Usage

```html
<div class="mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ...">
  <!-- ... -->
</div>
<div class="mask-b-from-20% mask-b-to-80% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-linear-50 mask-linear-from-60% mask-linear-to-80% bg-[url(/img/mountains.jpg)] ..."></div>
<img class="mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-left ..." src="/img/keyboard.png" />
<div class="border-4 border-amber-500 mask-conic-from-75% mask-conic-to-75% ..."></div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `mask-[<value>]` | `mask-image: <value>;` |
| `mask-(<custom-property>)` | `mask-image: var(<custom-property>);` |
| `mask-none` | `mask-image: none;` |
| `mask-linear-<number>` | `mask-image: linear-gradient(<number>deg, black var(--tw-mask-linear-from)), transparent var(--tw-mask-linear-to));` |
| `-mask-linear-<number>` | `mask-image: linear-gradient(calc(<number>deg * -1), black var(--tw-mask-linear-from)), transparent var(--tw-mask-linear-to));` |
| `mask-linear-from-<number>` | `mask-image: linear-gradient(var(--tw-mask-linear-position), black calc(var(--spacing) * <number>), transparent var(--tw-mask-linear-to));` |
| `mask-linear-from-<percentage>` | `mask-image: linear-gradient(var(--tw-mask-linear-position), black <percentage>, transparent var(--tw-mask-linear-to));` |
| `mask-linear-from-<color>` | `mask-image: linear-gradient(var(--tw-mask-linear-position), <color> var(--tw-mask-linear-from), transparent var(--tw-mask-linear-to));` |
| `mask-linear-from-(<custom-property>)` | `mask-image: linear-gradient(var(--tw-mask-linear-position), black <custom-property>, transparent var(--tw-mask-linear-to));` |
| `mask-linear-from-[<value>]` | `mask-image: linear-gradient(var(--tw-mask-linear-position), black <value>, transparent var(--tw-mask-linear-to));` |
| `mask-linear-to-<number>` | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), transparent calc(var(--spacing) * <number>));` |
| `mask-linear-to-<percentage>` | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), transparent <percentage>);` |
| `mask-linear-to-<color>` | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), <color> var(--tw-mask-linear-to));` |
| `mask-linear-to-(<custom-property>)` | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), transparent var(<custom-property>));` |
| `mask-linear-to-[<value>]` | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), transparent <value>);` |
| `mask-t-from-<number>` | `mask-image: linear-gradient(to top, black calc(var(--spacing) * <number>), transparent var(--tw-mask-top-to));` |
| `mask-t-from-<percentage>` | `mask-image: linear-gradient(to top, black <percentage>, transparent var(--tw-mask-top-to));` |
| `mask-t-from-<color>` | `mask-image: linear-gradient(to top, <color> var(--tw-mask-top-from), transparent var(--tw-mask-top-to));` |
| `mask-t-from-(<custom-property>)` | `mask-image: linear-gradient(to top, black var(<custom-property>), transparent var(--tw-mask-top-to));` |
| `mask-t-from-[<value>]` | `mask-image: linear-gradient(to top, black <value>, transparent var(--tw-mask-top-to));` |
| `mask-t-to-<number>` | `mask-image: linear-gradient(to top, black var(--tw-mask-top-from), transparent calc(var(--spacing) * <number>));` |
| `mask-t-to-<percentage>` | `mask-image: linear-gradient(to top, black var(--tw-mask-top-from), transparent <percentage>);` |
| `mask-t-to-<color>` | `mask-image: linear-gradient(to top, black var(--tw-mask-top-from), <color> var(--tw-mask-top-to));` |
| `mask-t-to-(<custom-property>)` | `mask-image: linear-gradient(to top, black var(--tw-mask-top-from), transparent var(<custom-property>));` |
| `mask-t-to-[<value>]` | `mask-image: linear-gradient(to top, black var(--tw-mask-top-from), transparent <value>);` |
| `mask-r-from-<number>` | `mask-image: linear-gradient(to right, black calc(var(--spacing) * <number>), transparent var(--tw-mask-right-to));` |
| `mask-r-from-<percentage>` | `mask-image: linear-gradient(to right, black <percentage>, transparent var(--tw-mask-right-to));` |
| `mask-r-from-<color>` | `mask-image: linear-gradient(to right, <color> var(--tw-mask-right-from), transparent var(--tw-mask-right-to));` |
| `mask-r-from-(<custom-property>)` | `mask-image: linear-gradient(to right, black var(<custom-property>), transparent var(--tw-mask-right-to));` |
| `mask-r-from-[<value>]` | `mask-image: linear-gradient(to right, black <value>, transparent var(--tw-mask-right-to));` |
| `mask-r-to-<number>` | `mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent calc(var(--spacing) * <number>));` |
| `mask-r-to-<percentage>` | `mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent <percentage>);` |
| `mask-r-to-<color>` | `mask-image: linear-gradient(to right, black var(--tw-mask-right-from), <color> var(--tw-mask-right-to));` |
| `mask-r-to-(<custom-property>)` | `mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent var(<custom-property>));` |
| `mask-r-to-[<value>]` | `mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent <value>);` |
| `mask-b-from-<number>` | `mask-image: linear-gradient(to bottom, black calc(var(--spacing) * <number>), transparent var(--tw-mask-bottom-to));` |
| `mask-b-from-<percentage>` | `mask-image: linear-gradient(to bottom, black <percentage>, transparent var(--tw-mask-bottom-to));` |
| `mask-b-from-<color>` | `mask-image: linear-gradient(to bottom, <color> var(--tw-mask-bottom-from), transparent var(--tw-mask-bottom-to));` |
| `mask-b-from-(<custom-property>)` | `mask-image: linear-gradient(to bottom, black var(<custom-property>), transparent var(--tw-mask-bottom-to));` |
| `mask-b-from-[<value>]` | `mask-image: linear-gradient(to bottom, black <value>, transparent var(--tw-mask-bottom-to));` |
| `mask-b-to-<number>` | `mask-image: linear-gradient(to bottom, black var(--tw-mask-bottom-from), transparent calc(var(--spacing) * <number>));` |
| `mask-b-to-<percentage>` | `mask-image: linear-gradient(to bottom, black var(--tw-mask-bottom-from), transparent <percentage>);` |
| `mask-b-to-<color>` | `mask-image: linear-gradient(to bottom, black var(--tw-mask-bottom-from), <color> var(--tw-mask-bottom-to));` |
| `mask-b-to-(<custom-property>)` | `mask-image: linear-gradient(to bottom, black var(--tw-mask-bottom-from), transparent var(<custom-property>));` |
| `mask-b-to-[<value>]` | `mask-image: linear-gradient(to bottom, black var(--tw-mask-bottom-from), transparent <value>);` |
| `mask-l-from-<number>` | `mask-image: linear-gradient(to left, black calc(var(--spacing) * <number>), transparent var(--tw-mask-left-to));` |
| `mask-l-from-<percentage>` | `mask-image: linear-gradient(to left, black <percentage>, transparent var(--tw-mask-left-to));` |
| `mask-l-from-<color>` | `mask-image: linear-gradient(to left, <color> var(--tw-mask-left-from), transparent var(--tw-mask-left-to));` |
| `mask-l-from-(<custom-property>)` | `mask-image: linear-gradient(to left, black var(<custom-property>), transparent var(--tw-mask-left-to));` |
| `mask-l-from-[<value>]` | `mask-image: linear-gradient(to left, black <value>, transparent var(--tw-mask-left-to));` |
| `mask-l-to-<number>` | `mask-image: linear-gradient(to left, black var(--tw-mask-left-from), transparent calc(var(--spacing) * <number>));` |
| `mask-l-to-<percentage>` | `mask-image: linear-gradient(to bottom, black var(--tw-mask-left-from), transparent <percentage>);` |
| `mask-l-to-<color>` | `mask-image: linear-gradient(to bottom, black var(--tw-mask-left-from), <color> var(--tw-mask-left-to));` |
| `mask-l-to-(<custom-property>)` | `mask-image: linear-gradient(to left, black var(--tw-mask-left-from), transparent var(<custom-property>));` |
| `mask-l-to-[<value>]` | `mask-image: linear-gradient(to left, black var(--tw-mask-left-from), transparent <value>);` |
| `mask-y-from-<number>` | `mask-image: linear-gradient(to top, black calc(var(--spacing) * <number>), transparent var(--tw-mask-top-to)), linear-gradient(to bottom, black calc(var(--spacing) * <number>), transparent var(--tw-mask-bottom-to)); mask-composite: intersect;` |
| `mask-y-from-<percentage>` | `mask-image: linear-gradient(to top, black <percentage>, transparent var(--tw-mask-top-to)), linear-gradient(to bottom, black <percentage>, transparent var(--tw-mask-bottom-to)); mask-composite: intersect;` |
| `mask-y-from-<color>` | `mask-image: linear-gradient(to top, <color> var(--tw-mask-top-from), transparent var(--tw-mask-top-to)), linear-gradient(to bottom, <color> var(--tw-mask-bottom-from), transparent var(--tw-mask-bottom-to)); mask-composite: intersect;` |
| `mask-y-from-(<custom-property>)` | `mask-image: linear-gradient(to top, black var(<custom-property>), transparent var(--tw-mask-top-to)), linear-gradient(to bottom, black var(<custom-property>), transparent var(--tw-mask-bottom-to)); mask-composite: intersect;` |
| `mask-y-from-[<value>]` | `mask-image: linear-gradient(to top, black <value>, transparent var(--tw-mask-top-to)), linear-gradient(to bottom, black <value>, transparent var(--tw-mask-bottom-to)); mask-composite: intersect;` |
| `mask-y-to-<number>` | `mask-image: linear-gradient(to top, black var(--tw-mask-top-from), transparent calc(var(--spacing) * <number>)), linear-gradient(to bottom, black var(--tw-mask-bottom-from), transparent calc(var(--spacing) * <number>)); mask-composite: intersect;` |
| `mask-y-to-<percentage>` | `mask-image: linear-gradient(to bottom, black var(--tw-mask-top-from), transparent <percentage>), linear-gradient(to bottom, black var(--tw-mask-bottom-from), transparent <percentage>); mask-composite: intersect;` |
| `mask-y-to-<color>` | `mask-image: linear-gradient(to bottom, black var(--tw-mask-top-from), <color> var(--tw-mask-top-to)), linear-gradient(to bottom, black var(--tw-mask-bottom-from), <color> var(--tw-mask-bottom-to)); mask-composite: intersect;` |
| `mask-y-to-(<custom-property>)` | `mask-image: linear-gradient(to top, black var(--tw-mask-top-from), transparent var(<custom-property>)),linear-gradient(to bottom, black var(--tw-mask-bottom-from), transparent var(<custom-property>)); mask-composite: intersect;` |
| `mask-y-to-[<value>]` | `mask-image: linear-gradient(to top, black var(--tw-mask-top-from), transparent <value>),linear-gradient(to bottom, black var(--tw-mask-bottom-from), transparent <value>); mask-composite: intersect;` |
| `mask-x-from-<number>` | `mask-image: linear-gradient(to right, black calc(var(--spacing) * <number>), transparent var(--tw-mask-right-to)), linear-gradient(to left, black calc(var(--spacing) * <number>), transparent var(--tw-mask-left-to)); mask-composite: intersect;` |
| `mask-x-from-<percentage>` | `mask-image: linear-gradient(to right, black <percentage>, transparent var(--tw-mask-right-to)), linear-gradient(to left, black <percentage>, transparent var(--tw-mask-left-to)); mask-composite: intersect;` |
| `mask-x-from-<color>` | `mask-image: linear-gradient(to right, <color> var(--tw-mask-right-from), transparent var(--tw-mask-right-to)), linear-gradient(to left, <color>  var(--tw-mask-left-from), transparent var(--tw-mask-left-to)); mask-composite: intersect;` |
| `mask-x-from-(<custom-property>)` | `mask-image: linear-gradient(to right, black var(<custom-property>), transparent var(--tw-mask-right-to)), linear-gradient(to left, black var(<custom-property>), transparent var(--tw-mask-left-to)); mask-composite: intersect;` |
| `mask-x-from-[<value>]` | `mask-image: linear-gradient(to right, black <value>, transparent var(--tw-mask-right-to)), linear-gradient(to left, black <value>, transparent var(--tw-mask-left-to)); mask-composite: intersect;` |
| `mask-x-to-<number>` | `mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent calc(var(--spacing) * <number>)), linear-gradient(to left, black var(--tw-mask-left-from), transparent calc(var(--spacing) * <number>)); mask-composite: intersect;` |
| `mask-x-to-<percentage>` | `mask-image: linear-gradient(to left, black var(--tw-mask-right-from), transparent <percentage>), linear-gradient(to left, black var(--tw-mask-left-from), transparent <percentage>); mask-composite: intersect;` |
| `mask-x-to-<color>` | `mask-image: linear-gradient(to left, black var(--tw-mask-right-from), <color> var(--tw-mask-right-to)), linear-gradient(to left, black var(--tw-mask-left-from), <color> var(--tw-mask-left-to)); mask-composite: intersect;` |
| `mask-x-to-(<custom-property>)` | `mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent var(<custom-property>)),linear-gradient(to left, black var(--tw-mask-left-from), transparent var(<custom-property>)); mask-composite: intersect;` |
| `mask-x-to-[<value>]` | `mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent <value>),linear-gradient(to left, black var(--tw-mask-left-from), transparent <value>); mask-composite: intersect;` |
| `mask-radial-[<value>]` | `mask-image: radial-gradient(<value>);` |
| `mask-radial-[<size>]` | `--tw-mask-radial-size: <size>;` |
| `mask-radial-[<size>_<size>]` | `--tw-mask-radial-size: <size> <size>;` |
| `mask-radial-from-<number>` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black calc(var(--spacing) * <number>), transparent var(--tw-mask-radial-to));` |
| `mask-radial-from-<percentage>` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black <percentage>, transparent var(--tw-mask-radial-to));` |
| `mask-radial-from-<color>` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), <color> var(--tw-mask-radial-from), transparent var(--tw-mask-radial-to));` |
| `mask-radial-from-(<custom-property>)` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(<custom-property>), transparent var(--tw-mask-radial-to));` |
| `mask-radial-from-[<value>]` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black <value>, transparent var(--tw-mask-radial-to));` |
| `mask-radial-to-<number>` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), transparent calc(var(--spacing) * <number>));` |
| `mask-radial-to-<percentage>` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), transparent <percentage>);` |
| `mask-radial-to-<color>` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), <color> var(--tw-mask-radial-to));` |
| `mask-radial-to-(<custom-property>)` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), transparent var(<custom-property>));` |
| `mask-radial-to-[<value>]` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), transparent <value>);` |
| `mask-circle` | `--tw-mask-radial-shape: circle;` |
| `mask-ellipse` | `--tw-mask-radial-shape: ellipse;` |
| `mask-radial-closest-corner` | `--tw-mask-radial-size: closest-corner;` |
| `mask-radial-closest-side` | `--tw-mask-radial-size: closest-side;` |
| `mask-radial-farthest-corner` | `--tw-mask-radial-size: farthest-corner;` |
| `mask-radial-farthest-side` | `--tw-mask-radial-size: farthest-side;` |
| `mask-radial-at-top-left` | `--tw-mask-radial-position: top left;` |
| `mask-radial-at-top` | `--tw-mask-radial-position: top;` |
| `mask-radial-at-top-right` | `--tw-mask-radial-position: top right;` |
| `mask-radial-at-left` | `--tw-mask-radial-position: left;` |
| `mask-radial-at-center` | `--tw-mask-radial-position: center;` |
| `mask-radial-at-right` | `--tw-mask-radial-position: right;` |
| `mask-radial-at-bottom-left` | `--tw-mask-radial-position: bottom left;` |
| `mask-radial-at-bottom` | `--tw-mask-radial-position: bottom;` |
| `mask-radial-at-bottom-right` | `--tw-mask-radial-position: bottom right;` |
| `mask-conic-<number>` | `mask-image: conic-gradient(from <number>deg, black var(--tw-mask-conic-from), transparent var(--tw-mask-conic-to));` |
| `-mask-conic-<number>` | `mask-image: conic-gradient(from calc(<number>deg * -1), black var(--tw-mask-conic-from), transparent var(--tw-mask-conic-to));` |
| `mask-conic-from-<number>` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black calc(var(--spacing) * <number>), transparent var(--tw-mask-conic-to));` |
| `mask-conic-from-<percentage>` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black <percentage>, transparent var(--tw-mask-conic-to));` |
| `mask-conic-from-<color>` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), <color> var(--tw-mask-conic-from), transparent var(--tw-mask-conic-to));` |
| `mask-conic-from-(<custom-property>)` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(<custom-property>), transparent var(--tw-mask-conic-to));` |
| `mask-conic-from-[<value>]` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black <value>, transparent var(--tw-mask-conic-to));` |
| `mask-conic-to-<number>` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), transparent calc(var(--spacing) * <number>));` |
| `mask-conic-to-<percentage>` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), transparent <percentage>);` |
| `mask-conic-to-<color>` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), <color> var(--tw-mask-conic-to);` |
| `mask-conic-to-(<custom-property>)` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), transparent var(<custom-property>);` |
| `mask-conic-to-[<value>]` | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), transparent <value>);` |

## Notes

- The table is transcribed as published, including its inconsistencies (for example unbalanced parentheses in some `mask-linear-*` / `mask-conic-to-*` rows and `to bottom` in `mask-l-to-<percentage>`); treat it as documentation text, not as generated CSS.
- Using an image mask: use the `mask-[<value>]` syntax to set the mask image of an element.
- Masking edges: use `mask-b-from-<value>` and `mask-t-to-<value>` (also `mask-r-*`, `mask-l-*`) to add a linear gradient mask to a single side. Use `mask-x-from-70%` and `mask-y-to-90%` to apply a mask to two sides at the same time.

```html
<div class="mask-t-from-50% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-l-from-50% mask-l-to-90% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-x-from-70% mask-x-to-90% bg-[url(/img/mountains.jpg)] ..."></div>
```

- By default, linear (and radial, conic) gradient masks transition from black to transparent, but you can customize the gradient colors using `mask-<side>-from-<color>` / `mask-<side>-to-<color>` (and the `mask-radial-*` / `mask-conic-*` equivalents).
- Angled linear mask: `mask-linear-<angle>`, `mask-linear-from-20`, `mask-linear-to-40`; negative angle with `-mask-linear-50`.

```html
<div class="mask-linear-50 mask-linear-from-60% mask-linear-to-80% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="-mask-linear-50 mask-linear-from-60% mask-linear-to-80% bg-[url(/img/mountains.jpg)] ..."></div>
```

- Radial position: `mask-radial-at-bottom-left`, `mask-radial-at-[35%_35%]` set the center of the radial gradient mask. This is different from `mask-position.md`, which sets the position of the mask image itself, not the radial gradient.

```html
<div class="mask-radial-at-top-left mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
```

- Radial size: `mask-radial-closest-corner`, `mask-radial-farthest-side` etc. When setting a custom radial gradient size, the units you can use depend on the `<ending-shape>` of the gradient which is set to `ellipse` by default. With `mask-circle`, you can only use a single fixed length, like `mask-radial-[5rem]`. Whereas with `mask-ellipse`, you can specify each axis as a fixed length or percentage, like `mask-radial-[40%_80%]`.

```html
<div class="mask-radial-closest-side mask-radial-from-100% mask-radial-at-[30%_30%] bg-[url(/img/mountains.jpg)] ..."></div>
```

- Conic mask: `mask-conic-from-<value>`, `mask-conic-to-<value>` and `mask-conic-<angle>`.
- Combining masks: gradient mask utilities like `mask-radial-from-<value>`, `mask-conic-to-<value>`, and `mask-l-from-<value>` can be combined to create more complex gradient masks. This relies on Tailwind setting the `mask-composite` property (see `mask-composite.md`) to `intersect` by default; changing it affects how the gradient masks are combined.

```html
<div class="mask-b-from-50% mask-radial-[50%_90%] mask-radial-from-80% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-r-from-80% mask-b-from-80% mask-radial-from-70% mask-radial-to-85% bg-[url(/img/mountains.jpg)] ..."></div>
```

- Removing mask images: use `mask-none`.

```html
<div class="mask-none">
  <!-- ... -->
</div>
```

### Using a custom value

Use utilities like `mask-linear-[<value>]` and `mask-radial-[<value>]` to set the mask image based on a completely custom value:

```html
<div class="mask-linear-[70deg,transparent_10%,black,transparent_80%] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `mask-linear-(<custom-property>)` syntax:

```html
<div class="mask-linear-(--my-mask) ...">
  <!-- ... -->
</div>
```

This is just a shorthand for `mask-linear-[var(<custom-property>)]` that adds the `var()` function for you automatically.

### Responsive design

Prefix a `mask-image` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="mask-radial-from-70% md:mask-radial-from-50% ...">
  <!-- ... -->
</div>
```

### Customizing your theme

Use the `--color-*` theme variables to customize the color utilities in your project:

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

Now utilities like `mask-radial-from-regal-blue`, `mask-conic-to-regal-blue` and `mask-b-from-regal-blue` can be used in your markup.

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/mask-image.mdx` (fetched 2026-10-16).

## Related

- [mask-composite](./mask-composite.md)
- [mask-position](./mask-position.md)
- [mask-size](./mask-size.md)
- [mask-repeat](./mask-repeat.md)
- [mask-mode](./mask-mode.md)
- [background-image](../backgrounds-borders/background-image.md)
