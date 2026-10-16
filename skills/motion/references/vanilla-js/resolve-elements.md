# resolveElements

`resolveElements()` turns a selector, an element or a list of elements into a plain array of elements.

## Signature / Usage

```
import { resolveElements } from "motion"

resolveElements("li") // [li, li, li]
resolveElements(document.body) // [body]
resolveElements(document.querySelector(".missing")) // []
```

Scoped selector (a scope is an object with the element as `current`):

```
const list = document.querySelector("ul")

resolveElements("li", { current: list, animations: [] })
```

Writing a function that accepts any target:

```
function highlight(target) {
  for (const element of resolveElements(target)) {
    element.classList.add("highlight")
  }
}

highlight(".card")
highlight(document.querySelector("#hero"))
```

## Options / Props

Accepted targets:

| Name | Type | Description |
|------|------|-------------|
| selector | string | A CSS selector, e.g. `"li"` |
| element | `Element` | A single element |
| list | `NodeList` / array | A `NodeList` or array of elements |

## Notes

- Always returns an array; `null` and `undefined` return an empty array, and `null` entries in a list are removed.
- By default selectors search the whole document; pass a scope as the second argument to search inside one element.
- Used internally by `animate`, `inView`, `hover` and other functions, which is why they accept the same targets.
- Source: https://motion.dev/docs/resolve-elements (fetched 2026-10).

## Related

- [animate](./animate.md)
- [in-view](./in-view.md)
- [hover](./hover.md)
