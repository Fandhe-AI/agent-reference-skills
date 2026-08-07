# Configuring Apps for Web Distribution

Distribute an approved app in eligible EU regions directly from your company website, without an alternative marketplace.

## Overview

You can distribute approved apps in eligible regions from your company website. Use this API to set up your app for web distribution.

## Signature / Usage

1. **Establish an alternative distribution key** — create a public/private key pair for your app ([Alternative Distribution Keys](./alternative-distribution-keys.md))
2. **Add an alternative distribution domain** — `POST /v1/alternativeDistributionDomains` for your app's base web domain, from which all traffic must flow; enabled for all apps on your account

```sh
curl -X POST "https://api.appstoreconnect.apple.com/v1/alternativeDistributionDomains" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "data": {
          "type": "alternativeDistributionDomains",
          "attributes": { "domain": "downloads.example.com" },
          "relationships": {
            "app": { "data": { "type": "apps", "id": "6737412987" } }
          }
        }
      }'
```

3. **Obtain and distribute your alternative distribution package**
   - If already approved: `POST /v1/alternativeDistributionPackages`
   - If not yet approved: the package is created automatically once the app reaches `Pending Developer Release`, `Pending Apple Release`, or `Ready for Distribution`

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

4. Set up your web server so users can download and install the app from your website

## Notes

- The distribution domain is where users download and install the web distribution app
- Web distribution apps must still be approved by App Review and notarized by Apple

## Related

- [Alternative Distribution Keys](./alternative-distribution-keys.md)
- [Alternative Distribution Domains](./alternative-distribution-domains.md)
- [Alternative Distribution Packages](./alternative-distribution-packages.md)
