---
source: https://docs.cloud.google.com/service-extensions/docs/overview
---

# Service Extensions overview

Service Extensions lets users of Google Cloud products such as Cloud Load Balancing, Media CDN and Secure Web Proxy insert custom code directly into the data path. It offers two mechanisms: plugins (Wasm code run inline on Google-managed infrastructure) and callouts (Envoy gRPC calls to services you or Google run).

## Signature / Usage

### Enable the API used to create plugins

Snippet taken from https://docs.cloud.google.com/service-extensions/docs/create-plugin (the overview page itself has no code).

```bash
gcloud services enable networkservices.googleapis.com
```

## Options / Props

### Types of extensions

| Type | How it runs | Constraints |
|------|-------------|-------------|
| Plugins | WebAssembly (Wasm) modules built with the Proxy-Wasm ABI; run inline as Wasm on a Google-managed sandbox similar to serverless infrastructure, close to the data plane | Restricted capability and strict runtime requirements |
| Callouts | General-purpose gRPC servers (Envoy gRPC calls) on user-managed VMs, GKE Pods on GKE Multi-Cloud, or on-premises | No runtime restrictions; you confirm scalability and availability of the callout service |

### Products and extension kinds

| Product | Plugins | Callouts | Stage |
|---------|---------|----------|-------|
| Cloud Load Balancing (supported Application Load Balancers) | Yes (for example exception handling, custom logging, header addition / manipulation, security, script injection, influencing Cloud CDN, routing) | Yes, to user-managed services (custom routing, security and logging, partner integration, authorization) and to Google services (Model Armor, including GKE Inference Gateway traffic) | Dynamic forwarding callout use case is Preview |
| GKE Gateway | Extensions add custom code into the load balancing processing path | See the GKE doc "Customize GKE Gateway traffic routing using Service Extensions" | n/a |
| Media CDN | Edge extensions (`CdnEdgeExtension`) attach Wasm plugins to `EdgeCacheService` | Not supported | Preview |
| Secure Web Proxy | n/a | Callouts (authorization policy delegation, custom authn/authz, header changes) | Preview |
| Global Front End | Combines Service Extensions, global external Application Load Balancers, Google Cloud Armor and Cloud CDN | n/a | Preview |

## Notes

- Callouts to Google services: an extension can call Model Armor to enforce security policies on inference traffic on application load balancers, including GKE Inference Gateway.
- Media CDN access must be requested through your Google Cloud sales representative or account team.
- Global Front End Enterprise billing tier consolidates pricing of the combined products; Service Extensions can also be used with standalone pricing, with no action needed to keep standalone pricing. Prices are not copied here.
- Google Cloud Service Extensions is not Cloudflare Workers (see `cloudflare-workers`) and not the Wasm toolchain itself (see `rust`). Cloud Armor, Certificate Manager and IAP belong to the planned `gcp-security` skill.
- Source: https://docs.cloud.google.com/service-extensions/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/service-extensions/docs/create-plugin (snippet; retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [plugins-overview.md](./plugins-overview.md)
- [callouts-overview.md](./callouts-overview.md)
- [lb-extensions-overview.md](./lb-extensions-overview.md)
- [media-cdn-extensions-overview.md](./media-cdn-extensions-overview.md)
- [swp-extensions-overview.md](./swp-extensions-overview.md)
