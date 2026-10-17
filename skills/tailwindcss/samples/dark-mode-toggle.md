---
source: https://tailwindcss.com/docs/dark-mode
---

# Manual Dark Mode Toggle

Toggle dark mode with a class by overriding the `dark` variant, and persist the user's choice in `localStorage`.

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

## Notes

- Without `@custom-variant`, `dark:` follows `prefers-color-scheme`.
- For a data attribute instead of a class, use `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));` and set `<html data-theme="dark">`.
- Chakra UI color mode (`useColorMode`) is a separate API; see the chakra-ui skill. Framework APIs for rendering the class server-side belong to the nextjs-app / react-router / tanstack-start skills.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/dark-mode.mdx` (fetched 2026-10-16).
