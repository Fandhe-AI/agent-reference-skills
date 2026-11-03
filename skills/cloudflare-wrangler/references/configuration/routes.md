---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes
---

# Types of Routes

There are three types of routes: Custom Domains, routes, and `workers.dev`. Routes can be configured as a Custom Domain, a zone ID route, a zone name route, or a simple route.

## Signature / Usage

```jsonc
{
	"routes": [
		{
			"pattern": "shop.example.com",
			"custom_domain": true,
		},
	],
}
```

```toml
[[routes]]
pattern = "shop.example.com"
custom_domain = true
```

## Options / Props

### Custom Domains

| Name | Type | Description |
|------|------|-------------|
| `pattern` | `string` required | The pattern that your Worker should be run on, for example, `"example.com"`. |
| `custom_domain` | `boolean` optional | Whether the Worker should be on a Custom Domain as opposed to a route. Defaults to `false`. |

### Zone ID route

| Name | Type | Description |
|------|------|-------------|
| `pattern` | `string` required | The pattern that your Worker can be run on, for example, `"example.com/*"`. |
| `zone_id` | `string` required | The ID of the zone that your `pattern` is associated with. |

```jsonc
{
	"routes": [
		{
			"pattern": "subdomain.example.com/*",
			"zone_id": "<YOUR_ZONE_ID>",
		},
	],
}
```

### Zone name route

| Name | Type | Description |
|------|------|-------------|
| `pattern` | `string` required | The pattern that your Worker should be run on, for example, `"example.com/*"`. |
| `zone_name` | `string` required | The name of the zone that your `pattern` is associated with. If you are using API tokens, this will require the `Account` scope. |

```jsonc
{
	"routes": [
		{
			"pattern": "subdomain.example.com/*",
			"zone_name": "example.com",
		},
	],
}
```

### Simple route

A simple route only requires a pattern.

```jsonc
{
	"route": "example.com/*",
}
```

```toml
route = "example.com/*"
```

### workers.dev

| Name | Type | Description |
|------|------|-------------|
| `workers_dev` | `boolean` optional | Whether the Worker runs on a custom `workers.dev` account subdomain. Defaults to `true` when the configuration has no `route` or `routes`, and `false` otherwise. To keep the `workers.dev` URL alongside routes, set `workers_dev` to `true`. |

```jsonc
{
	"workers_dev": false,
}
```

## Notes

- Only one of `route` or `routes` is required.
- Routing behavior itself (Custom Domains vs routes, `workers.dev`) is documented by the cloudflare-workers skill; this page covers the configuration-key shapes.
- If you change routes in the dashboard, Wrangler overrides them on the next deploy with the routes in your configuration file; see [source-of-truth.md](./source-of-truth.md).
- Each environment needs its own `route` / `routes` when deploying to a Custom Domain or route; see [environments.md](./environments.md).

## Related

- [top-level-keys.md](./top-level-keys.md)
- [environments.md](./environments.md)
- [source-of-truth.md](./source-of-truth.md)
