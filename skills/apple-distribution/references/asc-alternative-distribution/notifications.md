# Notifications

Webhook configuration that alternative marketplaces use to receive notifications about changes to the apps they distribute.

## Overview

Alternative marketplaces can use the marketplace webhooks API to set up an `endpointURL` where the marketplace receives notifications about changes to apps that it distributes. Typical notifications include:

- A new app version is available
- A specific app version needs to be removed
- All versions of an app need to be removed

## Signature / Usage

```
GET    /v1/marketplaceWebhooks
POST   /v1/marketplaceWebhooks
PATCH  /v1/marketplaceWebhooks/{id}
DELETE /v1/marketplaceWebhooks/{id}
```

## Options / Props

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/marketplaceWebhooks` | Get the endpoint URL for alternative distribution package notifications |
| POST | `/v1/marketplaceWebhooks` | Add a new endpoint URL and secret for alternative distribution package notifications |
| PATCH | `/v1/marketplaceWebhooks/{id}` | Update the endpoint URL and secret for alternative distribution package notifications |
| DELETE | `/v1/marketplaceWebhooks/{id}` | Delete a specific marketplace notification endpoint URL |

## Notes

- Resource: `MarketplaceWebhook`; request types `MarketplaceWebhookCreateRequest` / `MarketplaceWebhookUpdateRequest`
- Developers must enable notifications in App Store Connect to receive them
- If a developer doesn't opt in, the alternative marketplace must instead be provided with the alternative distribution package ID to ingest the package

## Related

- [Configuring Alternative Marketplaces and Alternative Marketplace Apps](./configuring-alternative-marketplaces.md)
- [Alternative Distribution Packages](./alternative-distribution-packages.md)
