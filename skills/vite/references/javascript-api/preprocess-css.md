---
source: https://vite.dev/guide/api-javascript#preprocesscss
---

# preprocessCSS

Pre-processes CSS-family files to plain CSS. Experimental.

## Signature / Usage

```ts
async function preprocessCSS(
  code: string,
  filename: string,
  config: ResolvedConfig,
): Promise<PreprocessCSSResult>

interface PreprocessCSSResult {
  code: string
  map?: SourceMapInput
  modules?: Record<string, string>
  deps?: Set<string>
}
```

## Notes

- **Experimental** (feedback is collected in vitejs/vite discussion 13815).
- Pre-processes `.css`, `.scss`, `.sass`, `.less`, `.styl` and `.stylus` files to plain CSS so it can be used in browsers or parsed by other tools. Like the built-in CSS pre-processing support, the corresponding pre-processor must be installed if used.
- The pre-processor is inferred from the `filename` extension. If `filename` ends with `.module.{ext}`, it is inferred as a CSS module and the result includes a `modules` object mapping original class names to transformed ones.
- Pre-processing does not resolve URLs in `url()` or `image-set()`.

## Related

- [CSS Pre-processors / Lightning CSS](../features/css-preprocessors-lightningcss.md)
- [CSS Modules](../features/css-modules.md)
