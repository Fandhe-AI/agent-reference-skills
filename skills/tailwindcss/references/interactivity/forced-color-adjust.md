---
source: https://tailwindcss.com/docs/forced-color-adjust
---

# forced-color-adjust

Utilities for opting in and out of forced colors.

## Signature / Usage

```html
<form>
  <img src="/img/shirt.jpg" />
  <div>
    <h3>Basic Tee</h3>
    <h3>$35</h3>
    <fieldset>
      <legend class="sr-only">Choose a color</legend>
      <div class="forced-color-adjust-none ...">
        <label>
          <input class="sr-only" type="radio" name="color-choice" value="White" />
          <span class="sr-only">White</span>
          <span class="size-6 rounded-full border border-black/10 bg-white"></span>
        </label>
        <!-- ... -->
      </div>
    </fieldset>
  </div>
</form>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `forced-color-adjust-auto` | `forced-color-adjust: auto;` |
| `forced-color-adjust-none` | `forced-color-adjust: none;` |

## Notes

- Opting out of forced colors: use the `forced-color-adjust-none` utility to opt an element out of the colors enforced by forced colors mode. This is useful in situations where enforcing a limited color palette will degrade usability.
- You can also use the `forced-colors` variant (see hover-focus-and-other-states) to conditionally add styles when the user has enabled a forced color mode.
- Restoring forced colors: use the `forced-color-adjust-auto` utility to make an element adhere to colors enforced by forced colors mode. This can be useful if you want to undo the `forced-color-adjust-none` utility, for example on a larger screen size:

```html
<form>
  <fieldset class="forced-color-adjust-none lg:forced-color-adjust-auto ...">
    <legend>Choose a color:</legend>
    <select class="hidden lg:block">
      <option value="White">White</option>
      <option value="Gray">Gray</option>
      <option value="Black">Black</option>
    </select>
    <div class="lg:hidden">
      <label>
        <input class="sr-only" type="radio" name="color-choice" value="White" />
        <!-- ... -->
      </label>
      <!-- ... -->
    </div>
  </fieldset>
</form>
```

- Responsive design: prefix a `forced-color-adjust` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="forced-color-adjust-none md:forced-color-adjust-auto ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/forced-color-adjust.mdx` (fetched 2026-10-16).

## Related

- [appearance](./appearance.md)
- [hover-focus-and-other-states](../core-concepts/hover-focus-and-other-states.md)
