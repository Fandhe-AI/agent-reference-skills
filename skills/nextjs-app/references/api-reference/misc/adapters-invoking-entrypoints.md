# Invoking Entrypoints

Build output entrypoints expose a `handler(..., ctx)` interface, with runtime-specific request/response types for Node.js and Edge.

## Signature / Usage

```typescript
// Node.js runtime (runtime: 'nodejs')
handler(
  req: IncomingMessage,
  res: ServerResponse,
  ctx: { waitUntil?: (promise: Promise<void>) => void; requestMeta?: RequestMeta }
): Promise<void>

// Edge runtime (runtime: 'edge')
handler(
  request: Request,
  ctx: { waitUntil?: (prom: Promise<void>) => void; signal?: AbortSignal; requestMeta?: RequestMeta }
): Promise<Response>

// Invoking an edge entrypoint via the registry
const entry = await globalThis._ENTRIES[output.edgeRuntime.entryKey]
const handler = entry[output.edgeRuntime.handlerExport]
await handler(request, ctx)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| requestMeta.relativeProjectDir | string | Relative path from `process.cwd()` to the Next.js project directory. |
| requestMeta.hostname | string | Optional hostname used by route handlers when constructing absolute URLs. |
| requestMeta.revalidate | function | Optional internal revalidate function to avoid revalidating over the network. |
| requestMeta.render404 | function | Optional function to render the 404 page for Pages Router `notFound: true`. |
| output.edgeRuntime.modulePath | string | Absolute path to the module registered in the edge runtime. |
| output.edgeRuntime.entryKey | string | Canonical key used by the edge entry registry (`globalThis._ENTRIES`). |
| output.edgeRuntime.handlerExport | string | Export name to invoke, currently `'handler'`. |

## Notes

- Node.js and Edge runtimes share the `handler(..., ctx)` shape but use different request/response primitives.
- Use `edgeRuntime` metadata instead of deriving registry keys or handler names from filenames.

## Related

- [Output Types](./adapters-output-types.md)
- [Runtime Integration](./adapters-runtime-integration.md)
