# Strapi Integration

`@upstash/strapi-plugin-upstash-ratelimit` — official Strapi plugin that applies `@upstash/ratelimit` to Strapi API routes.

## Signature / Usage

```bash
npm install --save @upstash/strapi-plugin-upstash-ratelimit
```

Configure in `/config/plugins.ts`:

```ts
export default {
  "upstash-ratelimit": {
    enabled: true,
    config: {
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
      prefix: "@strapi",
      analytics: false,
      strategy: [
        {
          methods: ["GET", "POST"],
          path: "*",
          limiter: {
            algorithm: "fixed-window",
            tokens: 10,
            window: "20 s",
          },
        },
      ],
    },
  },
};
```

## Options / Props

### Top-level plugin config

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Toggle the plugin on/off |
| `url` | `string` | — | `UPSTASH_REDIS_REST_URL` value |
| `token` | `string` | — | `UPSTASH_REDIS_REST_TOKEN` value |
| `prefix` | `string` | `"@strapi"` | Redis key prefix (`@strapi:<method>:<route>:<identifier>`) |
| `analytics` | `boolean` | `false` | Enable Upstash Console metrics |
| `strategy` | `Strategy[]` | — | Array of per-route rate limit rules |

### `Strategy` object

| Name | Type | Description |
|------|------|-------------|
| `methods` | `Array<"GET"\|"POST"\|"PUT"\|"PATCH"\|"DELETE"\|"ALL">` | HTTP methods this rule applies to |
| `path` | `string` | Route pattern; supports wildcards (`*`) and params (`/api/restaurants/:id`) |
| `identifierSource` | `string` | `"ip"` or `"header.KEY_NAME"` |
| `debug` | `boolean` | Logs remaining tokens and block status per request |
| `limiter` | `LimiterConfig` | Algorithm configuration |

### `LimiterConfig`

| Name | Type | Description |
|------|------|-------------|
| `algorithm` | `"fixed-window" \| "sliding-window" \| "token-bucket"` | Rate limiting algorithm |
| `tokens` | `number` | Maximum allowed tokens per window |
| `window` | `string` | Duration string (e.g., `"10 s"`, `"1 m"`) |
| `refillRate` | `number` | Token Bucket only: tokens added per `window` |

## Notes

- The plugin uses `@upstash/ratelimit` internally; the same algorithm behavior and Redis cost model applies
- Multiple strategy entries can coexist; rules are evaluated in array order
- Requires `.env` to contain `UPSTASH_REDIS_REST_TOKEN` and `UPSTASH_REDIS_REST_URL`

## Related

- [overview.md](./overview.md)
- [algorithms.md](./algorithms.md)
- [features.md](./features.md)
