---
source: https://www.typescriptlang.org/docs/handbook/dom-manipulation.html
---

# DOM Manipulation

Use the built-in `lib.dom.d.ts` types (`HTMLElement`, `querySelector`) to add an element to the page.

```html
<!DOCTYPE html>
<html lang="en">
  <head><title>TypeScript Dom Manipulation</title></head>
  <body>
    <div id="app"></div>
    <!-- Assume index.js is the compiled output of index.ts -->
    <script src="index.js"></script>
  </body>
</html>
```

```ts
// 1. Select the div element using the id property
const app = document.getElementById("app");

// 2. Create a new <p></p> element programmatically
const p = document.createElement("p");

// 3. Add the text content
p.textContent = "Hello, World!";

// 4. Append the p element to the div element
app?.appendChild(p);

const first = document.querySelector("li"); // returns the first li element
const all = document.querySelectorAll("li"); // returns the list of all li elements
```

## Notes

- `getElementById(elementId: string): HTMLElement | null` can return `null`, hence the optional chaining on `app?.appendChild(p)`.
- `createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, ...)` infers `K`, so `p` is `HTMLParagraphElement`; `createElement('xyz')` falls back to `HTMLElement`.
- `children` is an `HTMLCollection` of elements; `childNodes` is a `NodeList` that can also contain text nodes.
- `querySelectorAll` returns `NodeListOf<E>`, which implements `length`, `item(index)`, `forEach`, and numeric indexing.
