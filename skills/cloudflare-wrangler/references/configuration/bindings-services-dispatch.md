---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#service-bindings
---

# Service Bindings and Dispatch Namespace Bindings

A service binding sends HTTP requests to another Worker without going over the Internet. Dispatch namespace bindings connect a dynamic dispatch Worker to a Workers for Platforms dispatch namespace.

## Signature / Usage

```jsonc
{
	"services": [
		{
			"binding": "<BINDING_NAME>",
			"service": "<WORKER_NAME>",
			"entrypoint": "<ENTRYPOINT_NAME>",
		},
	],
	"dispatch_namespaces": [
		{
			"binding": "<BINDING_NAME>",
			"namespace": "<NAMESPACE_NAME>",
			"outbound": {
				"service": "<WORKER_NAME>",
				"parameters": ["params_object"],
			},
		},
	],
}
```

```toml
[[services]]
binding = "<BINDING_NAME>"
service = "<WORKER_NAME>"
entrypoint = "<ENTRYPOINT_NAME>"

[[dispatch_namespaces]]
binding = "<BINDING_NAME>"
namespace = "<NAMESPACE_NAME>"

  [dispatch_namespaces.outbound]
  service = "<WORKER_NAME>"
  parameters = [ "params_object" ]
```

## Options / Props

### `services`

| Name | Type | Description |
|------|------|-------------|
| `binding` | `string` required | Binding name used to refer to the bound Worker. |
| `service` | `string` required | The name of the Worker. To bind to a Worker in a specific environment, append the environment name: `<worker-name>-<environment-name>` (e.g. `worker-name-staging`). |
| `entrypoint` | `string` optional | Name of the named entrypoint to bind to. If omitted, the default export is used. |

### `dispatch_namespaces`

| Name | Type | Description |
|------|------|-------------|
| `binding` | `string` required | Binding name; must be a valid JavaScript variable name. |
| `namespace` | `string` required | Name of the dispatch namespace. |
| `outbound` | `object` optional | `service` (`string`, required): name of the outbound Worker to bind to. `parameters` (array, optional): parameters passing data from the dynamic dispatch Worker to the outbound Worker. |

## Notes

- Service-binding and Workers for Platforms runtime behavior (RPC, named entrypoints, dynamic dispatch) is covered by cloudflare-workers and the Workers for Platforms docs.
- Dispatch namespaces can be auto-provisioned; see [automatic-provisioning.md](./automatic-provisioning.md).
- Docs quirk: the `binding` description for dispatch namespaces says "reference this database", a copy-paste from the D1 section.

## Related

- [environments.md](./environments.md)
- [automatic-provisioning.md](./automatic-provisioning.md)
