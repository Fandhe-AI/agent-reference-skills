---
source: https://vite.dev/config/shared-options#html-cspnonce
---

# html.cspNonce / html.additionalAssetSources

HTML-related options: CSP nonce placeholder and extra asset sources.

## Signature / Usage

```ts
interface HtmlAssetSource {
  srcAttributes?: string[]
  srcsetAttributes?: string[]
  filter?: (data: {
    key: string
    value: string
    attributes: Record<string, string>
  }) => boolean
}
```

```js
export default defineConfig({
  html: {
    additionalAssetSources: {
      // Custom web component
      'html-import': { srcAttributes: ['src'] },
      // Add data-* attributes to existing element
      img: { srcAttributes: ['data-src-dark', 'data-src-light'] },
      // With srcset format
      'my-picture': { srcsetAttributes: ['data-srcset'] },
      // With filter function
      'my-component': {
        srcAttributes: ['asset'],
        filter: ({ attributes }) => attributes.type === 'image',
      },
    },
  },
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `html.cspNonce` | `string` | Nonce value placeholder used when generating script / style tags. Also generates a meta tag with the nonce value. |
| `html.additionalAssetSources` | `Record<string, HtmlAssetSource>` | Additional HTML elements and attributes treated as asset sources. |

## Notes

- `html.additionalAssetSources` extends the built-in list (`<img src>`, `<video src>`, `<link href>`, etc.). Useful with custom web components or non-standard attributes (like `data-*`) that reference assets.
- `html.cspNonce` is related to the Content Security Policy (CSP) feature guide.

## Related

- Content Security Policy
- HTML
