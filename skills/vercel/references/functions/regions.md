# Configuring Regions for Vercel Functions

Functions should execute close to their data source to minimize latency. Default region is `iad1` (Washington D.C., USA) for all new projects.

## Signature / Usage

```json
// vercel.json — project-wide
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "regions": ["sfo1"]
}
```

```json
// vercel.json — per-function override
{
  "regions": ["iad1"],
  "functionFailoverRegions": ["cle1"],
  "functions": {
    "api/eu-data.js": {
      "regions": ["cdg1"],
      "functionFailoverRegions": ["lhr1"]
    }
  }
}
```

## Region Limits by Plan

| Plan | Function regions |
|------|-----------------|
| Hobby | Single region |
| Pro | Up to 5 regions |
| Enterprise | All regions |

## Configuration Methods

| Method | How |
|--------|-----|
| Dashboard | Project Settings → Functions → Function Regions |
| `vercel.json` | `"regions": ["region-id"]` |
| Per-function | `functions` property with `regions` array |
| CLI | `vercel deploy --regions sfo1` |

## Failover

- **All runtimes**: Automatic multi-AZ failover within same region on all plans
- **Edge runtime**: Automatic cross-region failover on all plans
- **Node.js runtime (Enterprise only)**: Configure `functionFailoverRegions` in `vercel.json` or enable in dashboard

```json
// vercel.json — Node.js failover (Enterprise)
{
  "functionFailoverRegions": ["dub1", "fra1"]
}
```

- Failover regions must differ from primary `regions`
- Routing Middleware deploys to all regions by default (fewer regions on Hobby)

## Selected Region IDs

| Region | ID |
|--------|----|
| Washington D.C., USA (default) | `iad1` |
| San Francisco, USA | `sfo1` |
| Cleveland, USA | `cle1` |
| Portland, USA | `pdx1` |
| Montreal, Canada | `yul1` |
| Dublin, Ireland | `dub1` |
| London, UK | `lhr1` |
| Frankfurt, Germany | `fra1` |
| Paris, France | `cdg1` |
| Stockholm, Sweden | `arn1` |
| Singapore | `sin1` |
| Tokyo, Japan | `hnd1` |
| Osaka, Japan | `kix1` |
| Seoul, South Korea | `icn1` |
| Hong Kong | `hkg1` |
| Sydney, Australia | `syd1` |
| Mumbai, India | `bom1` |
| São Paulo, Brazil | `gru1` |
| Dubai, UAE | `dxb1` |
| Cape Town, South Africa | `cpt1` |

## Notes

- Deploying to more regions than plan allows causes the deployment to fail before build
- Choosing regions far from external services increases latency
- ISR cache region is tied to the project's default function region

## Related

- [configuring-functions.md](./configuring-functions.md)
- [fluid-compute.md](./fluid-compute.md)
- [usage-and-pricing.md](./usage-and-pricing.md)
