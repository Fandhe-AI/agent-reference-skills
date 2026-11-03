---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#local-development-settings
---

# Local Development Settings (`dev`)

Configure aspects of local development such as the local protocol or port.

## Signature / Usage

```jsonc
{
	"dev": {
		"ip": "192.168.1.1",
		"port": 8080,
		"inspector_port": 9230,
		"local_protocol": "http",
	},
}
```

```toml
[dev]
ip = "192.168.1.1"
port = 8_080
inspector_port = 9_230
local_protocol = "http"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ip` | `string` optional | IP address for the local dev server to listen on. Defaults to `localhost`. |
| `port` | `number` optional | Port for the local dev server. Defaults to `8787`. |
| `inspector_port` | `number` optional | Port for the inspector (DevTools). Defaults to `9229`; if unset and in use, Wrangler picks another available port. The `--inspector-port` flag overrides this. |
| `inspector_ip` | `string` optional | IP address for the inspector. Defaults to `127.0.0.1`. |
| `local_protocol` | `string` optional | Protocol the local dev server listens on. Defaults to `http`. |
| `upstream_protocol` | `string` optional | Protocol the local dev server forwards requests on. Defaults to `https`. |
| `host` | `string` optional | Host to forward requests to; defaults to the host of the first `route` of the Worker. |
| `enable_containers` | `boolean` optional | Enable containers during a local dev session if configured. Defaults to `true`. If `false`, you can develop without Docker or another container tool as long as you do not invoke container code. |
| `container_engine` | `string` optional | Used for local development of Containers. Wrangler tries to find the right socket automatically; if that fails (usually an `internal error` connecting to your Container), set the socket path here. Can also be set via the `DOCKER_HOST` environment variable. |
| `generate_types` | `boolean` optional | Generate types from your Worker configuration. Defaults to `false`. |

## Notes

- With the Cloudflare Vite plugin, use Vite's server options instead.
- The source list formatting of `ip` and `port` is slightly irregular (bullets not nested) but the values are as listed.

## Related

- [system-environment-variables.md](./system-environment-variables.md)
- [secrets.md](./secrets.md)
