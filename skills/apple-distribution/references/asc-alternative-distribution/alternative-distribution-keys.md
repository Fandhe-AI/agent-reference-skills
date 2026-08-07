# Alternative Distribution Keys

Public keys uploaded to App Store Connect to authorize an alternative marketplace or web distribution to offer an app outside the App Store.

## Overview

Alternative marketplace developers create keys and JSON web tokens (JWTs) to authenticate and connect their marketplace to apps distributed on their marketplace. The alternative distribution key uploaded to App Store Connect is a public key associated with all alternative distribution apps in an account, with optional per-app associations.

## Signature / Usage

```
POST   /v1/alternativeDistributionKeys
GET    /v1/alternativeDistributionKeys
GET    /v1/alternativeDistributionKeys/{id}
DELETE /v1/alternativeDistributionKeys/{id}
GET    /v1/apps/{id}/alternativeDistributionKey
GET    /v1/apps/{id}/relationships/alternativeDistributionKey
```

## Options / Props

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/alternativeDistributionKeys` | Add an alternative distribution key for your alternative marketplace app or web distribution |
| GET | `/v1/alternativeDistributionKeys` | List the alternative distribution key for your account |
| GET | `/v1/alternativeDistributionKeys/{id}` | Read the public key information for a specific alternative distribution key |
| GET | `/v1/apps/{id}/alternativeDistributionKey` | Get the alternative distribution key for a specific app |
| GET | `/v1/apps/{id}/relationships/alternativeDistributionKey` | Get the alternative distribution key ID for an app |
| DELETE | `/v1/alternativeDistributionKeys/{id}` | Remove an alternative distribution key from your account |

## Notes

- `AlternativeDistributionKey` is a public key; the matching private key is held by the marketplace/developer and used to sign JWTs
- Response types: `AlternativeDistributionKeyResponse`, `AlternativeDistributionKeysResponse`, `AppAlternativeDistributionKeyLinkageResponse`
- Request type: `AlternativeDistributionKeyCreateRequest`

## Related

- [Configuring Alternative Marketplaces and Alternative Marketplace Apps](./configuring-alternative-marketplaces.md)
- [Configuring Apps for Web Distribution](./configuring-web-distribution.md)
- [Alternative Distribution Domains](./alternative-distribution-domains.md)
