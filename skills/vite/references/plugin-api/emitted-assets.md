---
source: https://vite.dev/guide/api-plugin#referencing-emitted-assets
---

# Referencing Emitted Assets

Emit an asset from a plugin with `this.emitFile({ type: 'asset', ... })`, which returns a `referenceId` used to generate the asset's URL (the final file name is unknown until the bundle is generated).

## Signature / Usage

In JavaScript, use `import.meta.ROLLDOWN_FILE_URL_<referenceId>`:

```js
const referenceId = this.emitFile({
  type: 'asset',
  name: 'icon.png',
  source: fileContent,
})

// it's a JavaScript expression, so append any query or hash with string concatenation
return `export default import.meta.ROLLDOWN_FILE_URL_${referenceId} + '#frag'`
```

In CSS or HTML, use the `__VITE_ASSET__<referenceId>__` token, appending any query or hash right after it:

```css
background: url(__VITE_ASSET__<referenceId>__#frag);
```

## Notes

- `import.meta.ROLLDOWN_FILE_URL_<referenceId>` only works in JavaScript expression position.

## Related

- [Plugin Context Meta / Output Bundle Metadata](./plugin-context-meta.md)
