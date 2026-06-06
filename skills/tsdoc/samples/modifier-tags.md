# Modifier Tags

Control API visibility with modifier tags such as @internal, @public, and @beta.

```typescript
/**
 * Resolves a srcset string from a static image or plain URL.
 *
 * @param src - StaticImageData object or URL string
 * @returns URL string suitable for the `srcset` attribute
 *
 * @internal
 */
export function resolveSrcSet(src: StaticImageData | string): string {
  return typeof src === "string" ? src : src.src;
}

/**
 * Experimental streaming API — subject to change without notice.
 *
 * @param endpoint - WebSocket endpoint URL
 *
 * @beta
 */
export function connectStream(endpoint: string): WebSocket {
  return new WebSocket(endpoint);
}

/**
 * Stable public entry point for all callers.
 *
 * @public
 */
export function stableApi(): void {}
```

## Notes

- Modifier tags have no content; place them at the end of the comment block
- `@internal` signals that API Extractor should strip the symbol from the public `.d.ts` rollup
- `@beta` marks the API as experimental; `@alpha` denotes even earlier-stage APIs
- `@public` is the default visibility; add it only when you need to be explicit after overriding a base-class modifier
