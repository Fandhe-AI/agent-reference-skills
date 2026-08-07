# Alternative Distribution Domains

The base web domain authorized to distribute an app outside the App Store via web distribution or an alternative marketplace.

## Overview

Add your alternative distribution app's base domain to App Store Connect. The base domain must:

- House all individual app pages that your alternative marketplace distributes
- Include your sitemap to support marketplace search
- Serve your web distribution app

## Signature / Usage

```
POST   /v1/alternativeDistributionDomains
GET    /v1/alternativeDistributionDomains
GET    /v1/alternativeDistributionDomains/{id}
DELETE /v1/alternativeDistributionDomains/{id}
```

## Options / Props

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/alternativeDistributionDomains` | Add an alternative distribution domain to your account |
| GET | `/v1/alternativeDistributionDomains` | List all alternative distribution domains for your account |
| GET | `/v1/alternativeDistributionDomains/{id}` | Read information for a specific alternative distribution domain |
| DELETE | `/v1/alternativeDistributionDomains/{id}` | Delete an alternative distribution domain |

## Notes

- Request/response types: `AlternativeDistributionDomainCreateRequest`, `AlternativeDistributionDomainResponse`, `AlternativeDistributionDomainsResponse`
- All traffic for the marketplace or web-distributed app must flow through this domain

## Related

- [Configuring Alternative Marketplaces and Alternative Marketplace Apps](./configuring-alternative-marketplaces.md)
- [Configuring Apps for Web Distribution](./configuring-web-distribution.md)
- [Alternative Distribution Keys](./alternative-distribution-keys.md)
