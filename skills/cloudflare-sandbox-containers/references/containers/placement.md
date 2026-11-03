---
source: https://developers.cloudflare.com/containers/concepts/placement/
---

# Placement

By default a container runs in the location nearest to the incoming request that has a pre-fetched image. Placement constraints restrict where containers run for data residency, compliance, or latency.

## Signature / Usage

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "containers": [
    {
      "name": "my-container",
      "image": "docker.io/my-org/my-image:latest",
      "constraints": {
        "regions": [
          "ENAM",
          "WNAM"
        ],
        "jurisdiction": "fedramp"
      }
    }
  ]
}
```

```toml
[[containers]]
name = "my-container"
image = "docker.io/my-org/my-image:latest"

[containers.constraints]
regions = ["ENAM", "WNAM"]
jurisdiction = "fedramp"
```

## Options / Props

### Regions (`constraints.regions`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ENAM | string | — | Eastern North America |
| WNAM | string | — | Western North America |
| EEUR | string | — | Eastern Europe |
| WEUR | string | — | Western Europe |
| APAC | string | — | Asia Pacific |
| SAM | string | — | South America |
| ME | string | — | Middle East (limited capacity) |
| OC | string | — | Oceania (limited capacity) |
| AFR | string | — | Africa (limited capacity) |

### Jurisdictions (`constraints.jurisdiction`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| eu | string | — | EEUR, WEUR; EU data residency |
| us | string | — | ENAM, WNAM; US data residency |
| fedramp | string | — | ENAM, WNAM; FedRAMP regions |

## Notes

- Limited-capacity regions (ME, OC, AFR) cannot be used exclusively: include at least one other region, or contact support for dedicated access.
- When both `jurisdiction` and `regions` are set, the regions must be valid for that jurisdiction (`jurisdiction: "eu"` with `regions: ["ENAM"]` is invalid).
- Source conflict: this page's jurisdiction table lists `eu`, `us`, and `fedramp`, while the Wrangler configuration key reference (cloudflare-wrangler skill) lists only `eu` and `fedramp`. Treat `us` as unconfirmed for the Wrangler key and prefer `regions: ["ENAM", "WNAM"]` for US-only placement.
- `constraints` is a `containers` key in the Wrangler configuration; the cloudflare-wrangler skill owns the full key table (see wrangler-configuration.md for a summary).

## Related

- [Architecture and lifecycle](./architecture.md)
- [Wrangler configuration](./wrangler-configuration.md)
