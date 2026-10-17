---
source: https://tailwindcss.com/docs/word-break
---

# word-break

Utilities for controlling word breaks in an element.

## Signature / Usage

```html
<p class="break-all">The longest word in any of the major...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `break-normal` | `word-break: normal;` |
| `break-all` | `word-break: break-all;` |
| `break-keep` | `word-break: keep-all;` |

## Notes

- Use the `break-normal` utility to only add line breaks at normal word break points.
- Use the `break-all` utility to add line breaks whenever necessary, without trying to preserve whole words.
- Use the `break-keep` utility to prevent line breaks from being applied to Chinese/Japanese/Korean (CJK) text. For non-CJK text the `break-keep` utility has the same behavior as the `break-normal` utility:

```html
<p class="break-keep">抗衡不屈不挠...</p>
```

- Prefix a `word-break` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="break-normal md:break-all ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/word-break.mdx` (fetched 2026-10-16).

## Related

- [overflow-wrap](./overflow-wrap.md)
- [hyphens](./hyphens.md)
- [white-space](./white-space.md)
