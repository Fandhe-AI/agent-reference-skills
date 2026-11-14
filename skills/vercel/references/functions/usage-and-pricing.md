# Usage and Pricing (Fluid Compute)

Vercel Functions on fluid compute are priced on three dimensions: Active CPU, Provisioned Memory, and Invocations. Active CPU pauses billing during I/O; Provisioned Memory bills continuously while an instance handles requests.

## Plan Inclusions

| Resource | Hobby | Pro |
|----------|-------|-----|
| Active CPU | 4 hours/month | Pay per use |
| Provisioned Memory | 360 GB-hrs/month | Pay per use |
| Invocations | 1 million/month | 1 million/month |

Enterprise: custom terms.

## Billing Concepts

| Metric | What is billed | Pauses during I/O? |
|--------|---------------|-------------------|
| Active CPU | Actual code execution time (CPU-hours) | Yes |
| Provisioned Memory | Memory allocated × instance lifetime (GB-hours) | No |
| Invocations | Each incoming request | N/A |

### Example Calculation

Function: 4 GB memory, São Paulo (`gru1`), rates $0.221/hr CPU, $0.0183/GB-hr memory.
One request: 4s active CPU, 10s instance lifetime:

- CPU cost: (4s / 3600) × $0.221 = $0.000246
- Memory cost: (4 GB × 10s / 3600) × $0.0183 = $0.000203
- Total: ~$0.000449 per invocation

## Regional Pricing (per CPU-hr / per GB-hr)

| Region | Active CPU | Provisioned Memory |
|--------|-----------|-------------------|
| Washington D.C., USA (`iad1`) | $0.128 | $0.0106 |
| Cleveland, USA (`cle1`) | $0.128 | $0.0106 |
| Portland, USA (`pdx1`) | $0.128 | $0.0106 |
| Montreal, Canada (`yul1`) | $0.147 | $0.0122 |
| San Francisco, USA (`sfo1`) | $0.177 | $0.0147 |
| Dublin, Ireland (`dub1`) | $0.168 | $0.0139 |
| London, UK (`lhr1`) | $0.177 | $0.0146 |
| Paris, France (`cdg1`) | $0.177 | $0.0146 |
| Frankfurt, Germany (`fra1`) | $0.184 | $0.0152 |
| Stockholm, Sweden (`arn1`) | $0.160 | $0.0133 |
| Mumbai, India (`bom1`) | $0.140 | $0.0116 |
| Singapore (`sin1`) | $0.160 | $0.0133 |
| Hong Kong (`hkg1`) | $0.176 | $0.0146 |
| Seoul, South Korea (`icn1`) | $0.169 | $0.0140 |
| Tokyo, Japan (`hnd1`) | $0.202 | $0.0167 |
| Osaka, Japan (`kix1`) | $0.202 | $0.0167 |
| Sydney, Australia (`syd1`) | $0.180 | $0.0149 |
| São Paulo, Brazil (`gru1`) | $0.221 | $0.0183 |
| Dubai, UAE (`dxb1`) | $0.185 | $0.0153 |
| Cape Town, South Africa (`cpt1`) | $0.200 | $0.0166 |

## Notes

- Source: https://vercel.com/docs/functions/usage-and-pricing (fetched 2026-11-14)
- Hobby includes monthly allowances (4 hours Active CPU, 360 GB-hrs Provisioned Memory, 1 million invocations); Pro usage is billed on demand and the monthly Pro usage credit can offset those charges
- Invocations count regardless of request success or failure; example Pro rate on the page: $0.60 per million invocations, subject to the monthly Pro usage credit
- Active CPU is measured in milliseconds and billed per CPU-hour; after all requests complete the instance is paused with no CPU or memory charges until the next invocation
- The official regional pricing table lists 19 regions; the `dxb1` row above is not on it (not confirmed in the fetched official docs)
- I/O wait (AI model calls, database queries) does not count toward Active CPU time
- Provisioned Memory billing continues even during I/O, as the instance is kept alive
- Memory billing stops after the last in-flight request completes; no charge during idle
- Setting a reasonable `maxDuration` prevents runaway cost
- I/O-bound workloads (API calls, DB queries) are cost-effective because Active CPU pauses during waits
- CPU-intensive workloads (image processing, ML inference) cost more in Active CPU
- View usage: **Dashboard → Usage → Functions**

## Related

- [fluid-compute.md](./fluid-compute.md)
- [limitations.md](./limitations.md)
- [max-duration.md](./max-duration.md)
- [regions.md](./regions.md)
