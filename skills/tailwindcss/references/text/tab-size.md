---
source: https://tailwindcss.com/docs/tab-size
---

# tab-size

Utilities for controlling the size of tab characters.

## Signature / Usage

```html
<pre class="tab-2 ...">function indent() {&#10;&#9;return 'tabbed'&#10;}</pre>
<pre class="tab-8 ...">function indent() {&#10;&#9;return 'tabbed'&#10;}</pre>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `tab-<number>` | `tab-size: <number>;` |
| `tab-(<custom-property>)` | `tab-size: var(<custom-property>);` |
| `tab-[<value>]` | `tab-size: <value>;` |

## Notes

- Use `tab-<number>` utilities like `tab-2` and `tab-8` to control the size of tab characters.
- Use the `tab-[<value>]` syntax to set the tab size based on a completely custom value:

```html
<pre class="tab-[12px] ...">
  Lorem ipsum dolor sit amet...
</pre>
```

- For CSS variables, you can also use the `tab-(<custom-property>)` syntax:

```html
<pre class="tab-(--my-tab-size) ...">
  <!-- ... -->
</pre>
```

This is just a shorthand for `tab-[var(<custom-property>)]` that adds the `var()` function for you automatically.

- Prefix a `tab-size` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<pre class="tab-4 md:tab-8 ...">
  <!-- ... -->
</pre>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/tab-size.mdx` (fetched 2026-10-16).

## Related

- [text-indent](./text-indent.md)
- [white-space](./white-space.md)
