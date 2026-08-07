# Marketplace Search Configurations

Sitemap-based search configuration that lets Apple's Applebot crawler index apps distributed through an alternative marketplace for Spotlight search.

## Overview

Alternative marketplaces can use a sitemap with an industry-standard specification plus Apple-specific features. Use these APIs to add the sitemap URL to the Applebot web crawler and manage search configurations for alternative marketplaces.

## Signature / Usage

```
POST   /v1/marketplaceSearchDetails
GET    /v1/apps/{id}/marketplaceSearchDetail
PATCH  /v1/marketplaceSearchDetails/{id}
DELETE /v1/marketplaceSearchDetails/{id}
```

## Options / Props

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/marketplaceSearchDetails` | Add a marketplace search detail URL |
| GET | `/v1/apps/{id}/marketplaceSearchDetail` | Read the marketplace search detail URL |
| GET | `/v1/apps/{id}/relationships/marketplaceSearchDetail` | Get the marketplace search detail ID for an app |
| PATCH | `/v1/marketplaceSearchDetails/{id}` | Modify a marketplace search detail URL |
| DELETE | `/v1/marketplaceSearchDetails/{id}` | Delete a marketplace search detail URL |

## Notes

- Resource: `MarketplaceSearchDetail`; request types `MarketplaceSearchDetailCreateRequest` / `MarketplaceSearchDetailUpdateRequest`
- Response types: `MarketplaceSearchDetailResponse`, `AppMarketplaceSearchDetailLinkageResponse`

## Related

- [Configuring Alternative Marketplaces and Alternative Marketplace Apps](./configuring-alternative-marketplaces.md)
- [Alternative Distribution Domains](./alternative-distribution-domains.md)
