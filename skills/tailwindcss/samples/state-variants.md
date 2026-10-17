---
source: https://tailwindcss.com/docs/hover-focus-and-other-states
---

# group, peer and data Variants

Style an element from parent state (`group-*`), sibling state (`peer-*`), or data attributes (`data-*`).

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

- Name nested groups with `group/{name}` and target them with `group-hover/{name}`.
- `peer` only works on previous siblings.
- `data-*` / `aria-*` variants are how Tailwind targets Ark UI part state (`data-[state=open]:`); component APIs live in the ark-ui skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/hover-focus-and-other-states.mdx` (fetched 2026-10-16).
