---
source: https://tailwindcss.com/docs/hover-focus-and-other-states
---

# Styling by Parent, Sibling, and Data State

Use `group-*`, `peer-*`, and `data-*` variants to style an element based on another element's state or an attribute.

```html
<a href="#" class="group ...">
  <div>
    <svg class="stroke-sky-500 group-hover:stroke-white ..." fill="none" viewBox="0 0 24 24">
      <!-- ... -->
    </svg>
    <h3 class="text-gray-900 group-hover:text-white ...">New project</h3>
  </div>
  <p class="text-gray-500 group-hover:text-white ...">Create a new project from a variety of starting templates.</p>
</a>
```

```html
<form>
  <label class="block">
    <span class="...">Email</span>
    <input type="email" class="peer ..." />
    <p class="invisible peer-invalid:visible ...">Please provide a valid email address.</p>
  </label>
</form>
```

```html
<!-- Will apply -->
<div data-active class="border border-gray-300 data-active:border-purple-500">
  <!-- ... -->
</div>

<!-- Will apply -->
<div data-size="large" class="data-[size=large]:p-8">
  <!-- ... -->
</div>
```

## Notes

- Nested groups can be named: `group/{name}` on the parent and `group-hover/{name}` on the target.
- `peer` only works on previous siblings (CSS subsequent-sibling combinator).
- `data-*` variants are how Tailwind targets Ark UI part state (`data-[state=open]:`); component APIs live in the ark-ui skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/hover-focus-and-other-states.mdx` (fetched 2026-10-16).
