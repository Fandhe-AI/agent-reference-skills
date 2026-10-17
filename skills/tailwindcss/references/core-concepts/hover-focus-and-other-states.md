---
source: https://tailwindcss.com/docs/hover-focus-and-other-states
---

# Hover, focus, and other states

Using utilities to style elements on hover, focus, and more.

## Signature / Usage

Every utility can be applied conditionally by adding a variant to the beginning of the class name. Variants can be stacked.

```html
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
<button class="dark:md:hover:bg-fuchsia-600 ...">Save changes</button>
```

```css
.bg-sky-500 {
  background-color: #0ea5e9;
}

.hover\:bg-sky-700:hover {
  background-color: #0369a1;
}
```

## Options / Props

Quick reference of every variant included by default (CSS column as in the docs; `&` is the element).

| Variant | CSS |
|---------|-----|
| `hover` | `@media (hover: hover) { &:hover }` |
| `focus` | `&:focus` |
| `focus-within` | `&:focus-within` |
| `focus-visible` | `&:focus-visible` |
| `active` | `&:active` |
| `visited` | `&:visited` |
| `target` | `&:target` |
| `*` | `:is(& > *)` |
| `**` | `:is(& *)` |
| `has-[...]` | `&:has(...)` |
| `group-[...]` | `&:is(:where(.group)... *)` |
| `peer-[...]` | `&:is(:where(.peer)... ~ *)` |
| `in-[...]` | `:where(...) &` |
| `not-[...]` | `&:not(...)` |
| `inert` | `&:is([inert], [inert] *)` |
| `first` | `&:first-child` |
| `last` | `&:last-child` |
| `only` | `&:only-child` |
| `odd` | `&:nth-child(odd)` |
| `even` | `&:nth-child(even)` |
| `first-of-type` | `&:first-of-type` |
| `last-of-type` | `&:last-of-type` |
| `only-of-type` | `&:only-of-type` |
| `nth-[...]` | `&:nth-child(...)` |
| `nth-last-[...]` | `&:nth-last-child(...)` |
| `nth-of-type-[...]` | `&:nth-of-type(...)` |
| `nth-last-of-type-[...]` | `&:nth-last-of-type(...)` |
| `empty` | `&:empty` |
| `disabled` | `&:disabled` |
| `enabled` | `&:enabled` |
| `checked` | `&:checked` |
| `indeterminate` | `&:indeterminate` |
| `default` | `&:default` |
| `optional` | `&:optional` |
| `required` | `&:required` |
| `valid` | `&:valid` |
| `invalid` | `&:invalid` |
| `user-valid` | `&:user-valid` |
| `user-invalid` | `&:user-invalid` |
| `in-range` | `&:in-range` |
| `out-of-range` | `&:out-of-range` |
| `placeholder-shown` | `&:placeholder-shown` |
| `details-content` | `&::details-content` |
| `autofill` | `&:autofill` |
| `read-only` | `&:read-only` |
| `before` | `&::before` |
| `after` | `&::after` |
| `first-letter` | `&::first-letter` |
| `first-line` | `&::first-line` |
| `marker` | `&::marker, & *::marker` |
| `selection` | `&::selection` |
| `file` | `&::file-selector-button` |
| `backdrop` | `&::backdrop` |
| `placeholder` | `&::placeholder` |
| `sm` | `@media (width >= 40rem)` |
| `md` | `@media (width >= 48rem)` |
| `lg` | `@media (width >= 64rem)` |
| `xl` | `@media (width >= 80rem)` |
| `2xl` | `@media (width >= 96rem)` |
| `min-[...]` | `@media (width >= ...)` |
| `max-sm` | `@media (width < 40rem)` |
| `max-md` | `@media (width < 48rem)` |
| `max-lg` | `@media (width < 64rem)` |
| `max-xl` | `@media (width < 80rem)` |
| `max-2xl` | `@media (width < 96rem)` |
| `max-[...]` | `@media (width < ...)` |
| `@3xs` | `@container (width >= 16rem)` |
| `@2xs` | `@container (width >= 18rem)` |
| `@xs` | `@container (width >= 20rem)` |
| `@sm` | `@container (width >= 24rem)` |
| `@md` | `@container (width >= 28rem)` |
| `@lg` | `@container (width >= 32rem)` |
| `@xl` | `@container (width >= 36rem)` |
| `@2xl` | `@container (width >= 42rem)` |
| `@3xl` | `@container (width >= 48rem)` |
| `@4xl` | `@container (width >= 56rem)` |
| `@5xl` | `@container (width >= 64rem)` |
| `@6xl` | `@container (width >= 72rem)` |
| `@7xl` | `@container (width >= 80rem)` |
| `@min-[...]` | `@container (width >= ...)` |
| `@max-3xs` | `@container (width < 16rem)` |
| `@max-2xs` | `@container (width < 18rem)` |
| `@max-xs` | `@container (width < 20rem)` |
| `@max-sm` | `@container (width < 24rem)` |
| `@max-md` | `@container (width < 28rem)` |
| `@max-lg` | `@container (width < 32rem)` |
| `@max-xl` | `@container (width < 36rem)` |
| `@max-2xl` | `@container (width < 42rem)` |
| `@max-3xl` | `@container (width < 48rem)` |
| `@max-4xl` | `@container (width < 56rem)` |
| `@max-5xl` | `@container (width < 64rem)` |
| `@max-6xl` | `@container (width < 72rem)` |
| `@max-7xl` | `@container (width < 80rem)` |
| `@max-[...]` | `@container (width < ...)` |
| `dark` | `@media (prefers-color-scheme: dark)` |
| `motion-safe` | `@media (prefers-reduced-motion: no-preference)` |
| `motion-reduce` | `@media (prefers-reduced-motion: reduce)` |
| `contrast-more` | `@media (prefers-contrast: more)` |
| `contrast-less` | `@media (prefers-contrast: less)` |
| `forced-colors` | `@media (forced-colors: active)` |
| `inverted-colors` | `@media (inverted-colors: inverted)` |
| `pointer-fine` | `@media (pointer: fine)` |
| `pointer-coarse` | `@media (pointer: coarse)` |
| `pointer-none` | `@media (pointer: none)` |
| `any-pointer-fine` | `@media (any-pointer: fine)` |
| `any-pointer-coarse` | `@media (any-pointer: coarse)` |
| `any-pointer-none` | `@media (any-pointer: none)` |
| `portrait` | `@media (orientation: portrait)` |
| `landscape` | `@media (orientation: landscape)` |
| `noscript` | `@media (scripting: none)` |
| `print` | `@media print` |
| `supports-[...]` | `@supports (...)` |
| `aria-busy` | `&[aria-busy="true"]` |
| `aria-checked` | `&[aria-checked="true"]` |
| `aria-disabled` | `&[aria-disabled="true"]` |
| `aria-expanded` | `&[aria-expanded="true"]` |
| `aria-hidden` | `&[aria-hidden="true"]` |
| `aria-pressed` | `&[aria-pressed="true"]` |
| `aria-readonly` | `&[aria-readonly="true"]` |
| `aria-required` | `&[aria-required="true"]` |
| `aria-selected` | `&[aria-selected="true"]` |
| `aria-[...]` | `&[aria-...]` |
| `data-[...]` | `&[data-...]` |
| `rtl` | `&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)` |
| `ltr` | `&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)` |
| `open` | `&:is([open], :popover-open, :open)` |
| `starting` | `@starting-style` |

The CSS of the pointer variants and `nth-*` family matches the docs' quick reference table; the docs also describe `not-forced-colors` and `not-supports-[...]` via the `not-` variant.

## Notes

- Variant groups described in the docs: pseudo-classes, pseudo-elements, media and feature queries, attribute selectors, child selectors.
- Pseudo-class references: `hover`, `focus`, `active`, `visited`, `focus-within`, `focus-visible`, `target`, structural variants (`first`, `last`, `odd`, `even`, `only`, `nth-*`, `*-of-type`, `empty`), form states (`required`, `invalid`, `disabled`, `checked`, `read-only`, `indeterminate`, `default`, `optional`, `valid`, `user-valid`, `user-invalid`, `in-range`, `out-of-range`, `placeholder-shown`, `autofill`, `enabled`). `details-content` is a pseudo-element (`&::details-content`); the published table shows `&:details-content` with a single colon, which this page corrects.
- `nth-*` accepts any number by default; use arbitrary values for complex expressions like `nth-[2n+1_of_li]`.
- Tailwind adds `content: ''` automatically with `before:` / `after:` unless you specify another value.

### :has(), :not(), group, peer, in

```html
<label class="has-checked:bg-indigo-50 has-checked:text-indigo-800 ..."></label>
<button class="bg-indigo-600 hover:not-focus:bg-indigo-700"></button>
<div class="not-supports-[display:grid]:flex"></div>
```

- `has-*` takes a pseudo-class (`has-[:focus]`) or element selectors (`has-[img]`, `has-[a]`). `group-has-*` and `peer-has-*` style based on descendants of a group or peer. `not-` is powerful combined with other pseudo-class variants and with media query variants like `forced-colors` or `supports`.
- Parent state: mark the parent with `group` and use `group-*` variants (`group-hover`, `group-focus`, `group-active`, `group-odd`). Name nested groups with `group/{name}` and `group-hover/{name}`. Arbitrary groups: `group-[.is-published]:block`; use `&` to place `.group` (`group-[:nth-of-type(3)_&]:block`).
- `in-*` works like `group` without adding `group` to the parent, responding to state changes in any parent (use `group` for finer control).
- Sibling state: mark the sibling with `peer` and use `peer-*` variants. `peer` only works on previous siblings (subsequent-sibling combinator). Name with `peer/{name}` and `peer-checked/{name}`; arbitrary peers `peer-[.is-dirty]:...` follow the same pattern as groups.

```html
<div tabindex="0">
  <div class="opacity-50 in-focus:opacity-100">
    <!-- ... -->
  </div>
</div>

<form>
  <label class="block">
    <span class="...">Email</span>
    <input type="email" class="peer ..." />
    <p class="invisible peer-invalid:visible ...">Please provide a valid email address.</p>
  </label>
</form>

<div class="group is-published">
  <div class="hidden group-[.is-published]:block">Published</div>
</div>
```

### Media and feature queries

- `dark` uses `prefers-color-scheme`; `motion-reduce` / `motion-safe` use `prefers-reduced-motion`; `contrast-more` / `contrast-less` use `prefers-contrast`; `forced-colors` (and `not-forced-colors`) use forced colors mode; `pointer-*` / `any-pointer-*` target pointing devices (`pointer-none` and `any-pointer-none` target absence); `noscript` targets scripting disabled; `print` targets printing; `supports-[...]` / `not-supports-[...]` target feature support.
- Define shortcuts with a custom variant in the `supports-*` namespace:

```css
@custom-variant supports-grid {
  @supports (display: grid) {
    @slot;
  }
}
```

```html
<div class="supports-grid:grid">
  <!-- ... -->
</div>
```

- `starting` sets the appearance when an element is first rendered or transitions from `display: none` (`starting:open:opacity-0` with `open:opacity-100` and `transition-discrete`, for example on a `popover`).

### Attribute selectors

- `aria-*` covers common boolean ARIA attributes (`aria-busy`, `aria-checked`, `aria-disabled`, `aria-expanded`, `aria-hidden`, `aria-pressed`, `aria-readonly`, `aria-required`, `aria-selected`); use arbitrary values for others (`group-aria-[sort=ascending]:rotate-0`), or register your own.
- `data-*`: `data-active` checks existence; `data-[size=large]:p-8` checks a value; register shortcuts in the `data-*` namespace.
- `rtl` / `ltr` for multi-directional layouts; `open` for `<details>` / `<dialog>` and also `:popover-open`; `inert` for elements with the `inert` attribute.

```css
@custom-variant aria-asc (&[aria-sort="ascending"]);
@custom-variant aria-desc (&[aria-sort="descending"]);

@import "tailwindcss";

@custom-variant data-checked (&[data-ui~="checked"]);
```

```html
<div data-active class="border border-gray-300 data-active:border-purple-500"></div>
<div data-size="large" class="data-[size=large]:p-8"></div>
<div data-ui="checked active" class="data-checked:underline"></div>
```

### Child selectors

- `*` styles direct children; `**` styles all descendants (combine with another variant to narrow, for example `**:data-avatar:size-12`). Overriding a style with a utility on the child itself won't work because child rules are generated after the regular ones with the same specificity.

```html
<ul class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
  <li>Sales</li>
  <li>Marketing</li>
</ul>
```

### Custom variants

Arbitrary variants are format strings representing a selector in square brackets. They can be stacked, use `_` for spaces, and accept at-rules such as `@media` / `@supports` (no `&` needed). Register repeated ones with `@custom-variant`.

```html
<li class="[&.is-dragging]:active:cursor-grabbing">{item}</li>
<div class="[&_p]:mt-4"></div>
<div class="flex [@supports(display:grid)]:grid"></div>
```

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

### Migration (v3 → v4)

- Migration (v3 → v4): stacked variants apply left to right (v3 applied right to left). Reverse order-sensitive stacks, for example `first:*:pt-0` becomes `*:first:pt-0`; the direct child variant (`*`) and typography plugin variants (`prose-headings`) are the most likely affected.
- Migration (v3 → v4): `hover` only applies when the primary input device supports hover (`@media (hover: hover)`). To restore the old behavior: `@custom-variant hover (&:hover);`.
- Migration (v3 → v4): `transition` / `transition-colors` now include `outline-color`; set the outline color unconditionally to avoid a transition from the default color.
- Related notes: `starting`, `not-*`, `in-*`, `inert`, `nth-*`, `*` / `**` appear in the v4 docs; the upgrade guide does not enumerate which were introduced in which v4.x release, so no introduction versions are recorded here.

- `data-*` / `aria-*` variants are how Tailwind targets Ark UI part state (`data-[state=open]:`); component APIs live in the ark-ui skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/hover-focus-and-other-states.mdx` (fetched 2026-10-16). The long per-variant demos and the pseudo-class reference examples are condensed to the quick reference table above.

## Related

- [Responsive design](./responsive-design.md)
- [Dark mode](./dark-mode.md)
- [Adding custom styles](./adding-custom-styles.md)
- [Functions and directives](./functions-and-directives.md)
