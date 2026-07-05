# Adapters: Configuration

Configure `adapterPath` or `NEXT_ADAPTER_PATH` to point Next.js at a custom deployment adapter module.

## Signature / Usage

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  adapterPath: require.resolve('./my-adapter.js'),
}

module.exports = nextConfig
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| adapterPath | string | Path to the adapter module, set via `next.config.js`. |
| NEXT_ADAPTER_PATH | env var | Alternative to `adapterPath` for zero-config usage on deployment platforms. |

## Related

- [Adapters](./adapters.md)
- [Creating an Adapter](./adapters-creating-an-adapter.md)
