# Configuring Alternative Marketplaces and Alternative Marketplace Apps

Set up an alternative app marketplace in the EU: connect it to the apps it distributes, configure webhooks, domains, and search, then process distribution packages.

## Overview

Use the Alternative Marketplaces and Web Distribution API to create and configure alternative marketplaces. Once you create a marketplace app record in App Store Connect, you can add configurations for:

- Alternative distribution domains
- Search detail URLs
- Webhook endpoint URLs

## Signature / Usage

**1. Connect your marketplace to the apps it distributes**

1. Create a new app record (or use an existing one) in App Store Connect for the marketplace app
2. Create a public/private key pair for the marketplace ([Alternative Distribution Keys](./alternative-distribution-keys.md))
3. Upload the public key with the marketplace's app Apple ID via `POST /v1/alternativeDistributionKeys`
4. Create a signed JWT (private key + app developer's Developer ID + marketplace's app Apple ID) for the app developer to upload in App Store Connect
5. The app developer selects which apps to associate with the marketplace and may enable webhook notifications

```sh
curl -X POST "https://api.appstoreconnect.apple.com/v1/alternativeDistributionKeys" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "data": {
          "type": "alternativeDistributionKeys",
          "attributes": {
            "publicKey": "'"$(base64 -i marketplace_public_key.pem)"'"
          },
          "relationships": {
            "app": { "data": { "type": "apps", "id": "6737412987" } }
          }
        }
      }'
```

**2. Set up the marketplace**

| Step | Endpoint | Description |
|------|----------|-------------|
| Configure webhooks | `POST /v1/marketplaceWebhooks` | Register the server `endpointUrl` to listen for notifications |
| Add a distribution domain | `POST /v1/alternativeDistributionDomains` | Base web domain from which all marketplace traffic flows |
| Set up search details | `POST /v1/marketplaceSearchDetails` | Sitemap URL so Apple can crawl and surface apps in Spotlight |

```sh
curl -X POST "https://api.appstoreconnect.apple.com/v1/marketplaceWebhooks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "data": {
          "type": "marketplaceWebhooks",
          "attributes": { "endpointUrl": "https://marketplace.example.com/webhooks/apple" }
        }
      }'
```

**3. Process alternative distribution packages**

- If the app is already approved: the app developer generates a package via `POST /v1/alternativeDistributionPackages`
- If the app is not yet in `Pending Developer Release`, `Pending Apple Release`, or `Ready for Distribution`, the package is created automatically after App Review approval
- Once created, the marketplace ingests the package files (via webhook notification or developer-provided ID)

```sh
curl -X POST "https://api.appstoreconnect.apple.com/v1/alternativeDistributionPackages" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "data": {
          "type": "alternativeDistributionPackages",
          "relationships": {
            "app": { "data": { "type": "apps", "id": "6737412987" } }
          }
        }
      }'
```

## Notes

- Apps can be distributed on the App Store, an alternative marketplace, or both — see `AppStoreVersionUpdateRequest.Data.Attributes.reviewType`
- Requires agreeing to the Alternative Terms Addendum for Apps in the EU (DMA compliance)
- All apps distributed via alternative marketplaces must still be notarized by Apple

## Related

- [Alternative Distribution Keys](./alternative-distribution-keys.md)
- [Alternative Distribution Domains](./alternative-distribution-domains.md)
- [Marketplace Search Configurations](./marketplace-search-configurations.md)
- [Notifications](./notifications.md)
- [Alternative Distribution Packages](./alternative-distribution-packages.md)
