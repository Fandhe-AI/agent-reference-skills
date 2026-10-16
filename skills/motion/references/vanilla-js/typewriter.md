# typewriter (Motion+)

`typewriter()` animates text into an element like a person typing, with natural speed variance, backspacing and a blinking cursor. A 1.8kb function.

## Signature / Usage

Motion+ (paid); not included in the free `motion` package. Install Motion UI first (access token requires Motion+ membership).

```
import { typewriter } from "motion-plus"

// With a selector
typewriter("#title", "Hello world!")

// With an element
const element = document.querySelector(".title")
typewriter(element, "Hello world!")
```

With no text, it types the element's existing text content:

```
<h1 id="title">Hello world!</h1>

<script type="module">
  typewriter("#title")
</script>
```

Returns controls; `set()` backspaces to the point of difference and types the new content:

```
const controls = typewriter("#title", "Hello world!")

controls.set("Hello everyone!")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `backspace` | `"word"` \| `"all"` | Backspace one word or special character at a time (`"word"`), or remove all mismatched content immediately (`"all"`). Default is character by character |
| `speed` | `"fast"` \| `"slow"` \| number | Typing speed; a number is a custom interval in milliseconds |
| `variance` | number (`0`-`1`) | Factor applied to `speed` to create a range of speeds picked randomly. `0` is no variance |

```
typewriter("#title", text, { backspace: "word" })
typewriter("#title", "Hello world!", { speed: "slow" })
typewriter("#title", "Hello world!", { variance: 0.5 })
```

## Notes

- Motion+ members only; the source page notes the rest of its content is for members. Cursor style and blink speed are listed as customisable, but their option names are not shown in the public part of the page.
- Sets an `aria-label` with the full text for screen readers.
- Renders the text and a cursor inside the element.
- Natural variance slows typing for long words, at the start and end of words, for punctuation and for uncommon character combinations.
- Play and pause controls are available (suited to scroll-triggered animations). Also available as `<Typewriter />` components for React and Vue.

## Related

- [scramble-text](./scramble-text.md)
- [split-text](./split-text.md)
