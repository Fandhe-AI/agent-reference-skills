# XAML and whitespace

Rules for how a XAML processor normalizes whitespace (space, linefeed, tab) found in inner text between elements, and how to opt out of normalization with `xml:space="preserve"`.

## Signature / Usage

```xaml
<!-- Default: consecutive whitespace collapses to one space; edge space trimmed -->
<TextBlock>Hello    world</TextBlock>  <!-- renders as "Hello world" -->

<!-- Preserve all whitespace, including newlines/indentation, at this element's subtree -->
<TextBlock xml:space="preserve">Hello    world</TextBlock>
```

## Notes

- Default normalization: linefeeds between East Asian (CJK) characters are removed; all whitespace chars convert to spaces; consecutive spaces collapse to one; a space immediately after the start tag or before the end tag is removed.
- Whitespace preservation only matters for content models that accept a `String` (or string collection) as inner text — most object content models don't treat whitespace as significant either way.
- Set `xml:space="preserve"` at the specific element that needs it, not at the document root — most XAML object models don't care about whitespace, and root-level `preserve` also keeps incidental indentation spaces added by editors/design surfaces.

## Related

- [XAML syntax guide](./xaml-syntax-guide.md)
