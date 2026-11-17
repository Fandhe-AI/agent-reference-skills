---
source: https://docs.cloud.google.com/service-extensions/docs/quotas
---

# Quotas and limits (Service Extensions)

Quotas have default values and can usually be adjusted on request; system limits are fixed. Quotas generally apply per Google Cloud project and are shared across all applications and IP addresses in the project.

## Signature / Usage

List the plugins in a project to compare with the plugin quotas below. Most quotas are adjusted in the Google Cloud console (Request a quota adjustment).

```bash
gcloud service-extensions wasm-plugins list
```

## Options / Props

### Quotas (can be increased on request)

| Quota | Value |
|-------|-------|
| Global authorization extensions in a project | 10 |
| Global edge extensions in a project | 100 |
| Global route extensions in a project | 100 |
| Global traffic extensions in a project | 100 |
| Authorization extensions per region in a project | 10 |
| Route extensions per region in a project | 100 |
| Traffic extensions per region in a project | 100 |
| Plugins per project per location | 100 |
| Cloud Load Balancing only: plugins attached to Application Load Balancers through edge extensions per project | 5 at any given point in time |
| Cloud Load Balancing only: plugins attached through route extensions per project, per location and per load balancing scheme | 5 at any given point in time |
| Cloud Load Balancing only: plugins attached through traffic extensions per project, per location and per load balancing scheme | 5 at any given point in time |
| Media CDN only: `CdnEdgeExtension` resources attached to Media CDN services per project | 5 at any given point in time |

### Resource and configuration limits (system limits)

| Limit | Value |
|-------|-------|
| Extension chains per attachment point | 5 |
| Cloud Load Balancing only: plugins in an `LbEdgeExtension` chain | 1 |
| Media CDN only: plugins in a `CdnEdgeExtension` chain | 2 |
| Media CDN only: `CdnEdgeExtension` resources per `EdgeCacheService` | 1 |
| Plugins or callouts in a route extension chain | 1 |
| Plugins or callouts in a traffic extension chain | 3 |
| Size of a compiled plugin plus plugin configuration data | 5 MiB |
| Plugin configuration data provided directly (console file upload, `--plugin-config` / `--plugin-config-file`, or `WasmPluginVersion.plugin_config_data`), not via Artifact Registry | 900 KiB |
| Versions per plugin | 100 |

### Plugin usage and execution limits

| Limit | Value |
|-------|-------|
| Execution duration per request (sum of all Proxy-Wasm callbacks); exceeding terminates the plugin and the request returns HTTP `500` | 1 msec |
| CPU per request (normalized vCPU per plugin invocation); exceeding terminates the plugin and returns HTTP `500` | 1 msec |
| Memory held by a plugin instance; exceeding terminates the plugin and returns HTTP `500` | 16 MiB |
| Log content emitted by a plugin per invocation; further logs dropped | 16 KiB |
| Log entries emitted by a plugin per invocation; further logs dropped | 16 |
| Queries per second (QPS) per region for plugins; contact support to exceed | 100k |

## Notes

- Quotas are managed by Cloud Quotas; see the Cloud Quotas overview for monitoring and quota adjuster details.
- Plugin CPU and memory figures here match the "Resource limits" in the plugins overview (memory is 4 MiB for Media CDN plugins there).
- Source: https://docs.cloud.google.com/service-extensions/docs/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/wasm-plugins/list (gcloud 593.0.0 help); the quotas page itself has no code.

## Related

- [plugins-overview.md](./plugins-overview.md)
- [lb-extensions-overview.md](./lb-extensions-overview.md)
- [media-cdn-extensions-overview.md](./media-cdn-extensions-overview.md)
- [create-plugin.md](./create-plugin.md)
