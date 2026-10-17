---
source: https://tailwindcss.com/docs/dark-mode
---

# Dark mode

Using variants to style your site in dark mode.

## Signature / Usage

```html
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

## Notes

- Tailwind includes a `dark` variant. By default it uses the `prefers-color-scheme` CSS media feature; override the variant to toggle dark mode manually.

### Toggling dark mode manually

Override the `dark` variant with a custom selector using `@custom-variant`. `dark:*` utilities then apply whenever the `dark` class is present earlier in the HTML tree.

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

How the `dark` class gets added is up to you; a common approach is JavaScript that updates the `class` attribute and syncs the preference to somewhere like `localStorage`.

### Using a data attribute

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

```html
<html data-theme="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

### With system theme support

For three-way toggles (light, dark, system), use a custom dark mode selector and `window.matchMedia()` to detect the system theme. The preference can also be stored server-side and the class rendered on the server.

```js
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

// Whenever the user explicitly chooses light mode
localStorage.theme = "light";

// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");
```

- Chakra UI color mode (`useColorMode`) is a separate API; see the chakra-ui skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/dark-mode.mdx` (fetched 2026-10-16).

## Related

- [Hover, focus, and other states](./hover-focus-and-other-states.md)
- [Adding custom styles](./adding-custom-styles.md)
- [Functions and directives](./functions-and-directives.md)
