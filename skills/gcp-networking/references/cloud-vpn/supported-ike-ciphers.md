---
source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/supported-ike-ciphers
---

# Supported IKE ciphers

Ciphers and parameters Cloud VPN supports on peer VPN devices, for Classic VPN and HA VPN. Cloud VPN runs in IPsec ESP tunnel mode and negotiates automatically if the peer uses a supported IKE setting.

## Signature / Usage

### Inspect a gateway

```bash
gcloud compute vpn-gateways describe my-gateway \
  --region=us-central1
```

The full flag list is in the `gcp-compute` skill; reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/describe

## Options / Props

### IKEv2 with AEAD

| Role | Phase | Values |
|---|---|---|
| Encryption and integrity | 1 and 2 | `AES-GCM-16-128`, `AES-GCM-16-192`, `AES-GCM-16-256` (first number is ICV size in bytes, second is key length in bits) |
| PRF | 1 | `PRF-AES128-XCBC`, `PRF-AES128-CMAC`, `PRF-HMAC-SHA1`, `PRF-HMAC-MD5`, `PRF-HMAC-SHA2-256`, `PRF-HMAC-SHA2-384`, `PRF-HMAC-SHA2-512` (many devices need no explicit PRF) |
| DH | 1 | groups above |
| PFS (required) | 2 | groups above; if the gateway needs DH for Phase 2 use the Phase 1 setting |
| Lifetime | 1 / 2 | 36,000 seconds (10 hours) / 10,800 seconds (3 hours) |

### IKEv2 without AEAD

| Role | Phase | Values |
|---|---|---|
| Encryption | 1 | `AES-CBC-128`, `AES-CBC-192`, `AES-CBC-256`, `3DES-CBC` |
| Encryption | 2 | `AES-CBC-128`, `AES-CBC-256`, `AES-CBC-192` |
| Integrity | 1 | `AES-XCBC-96`, `AES-CMAC-96`, `HMAC-SHA1-96`, `HMAC-MD5-96`, `HMAC-SHA2-256-128`, `HMAC-SHA2-384-192`, `HMAC-SHA2-512-256` |
| Integrity | 2 | `HMAC-SHA2-256-128`, `HMAC-SHA2-512-256`, `HMAC-SHA1-96` |
| PRF, DH, PFS, lifetimes | 1 / 2 | Same as the AEAD table |

### IKEv1

| Role | Phase 1 | Phase 2 |
|---|---|---|
| Encryption | AES-CBC-128 | AES-CBC-128 |
| Integrity | HMAC-SHA1-96 | HMAC-SHA1-96 |
| PRF | PRF-SHA1-96 | n/a |
| DH / PFS (required in Phase 2) | modp_1024 (Group 2) | modp_1024 (Group 2) |
| Lifetime | 36,600 seconds (10 hours, 10 minutes) | 10,800 seconds (3 hours) |

### SA lifetimes

| SA phase | Cloud VPN default | Console template value | Best practice |
|---|---|---|---|
| Phase 1 (IKE SA) | `36000` seconds (10 hours) | `28800` or `36000` seconds (vendor dependent) | Peer value must match Cloud VPN exactly |
| Phase 2 (IPsec / Child SA) | `10800` seconds (3 hours) | `3600` or `10800` seconds (vendor dependent) | Peer value must match Cloud VPN exactly |

## Notes

- Configuration values are case-sensitive. Group names for DH and PFS (configuration value in parentheses): modp_2048 (`Group-14`), modp_2048_224 (`modp-2048-224`), modp_2048_256 (`modp-2048-256`), modp_1536 (`Group-5`), modp_3072 (`Group-15`), modp_4096 (`Group-16`), modp_8192 (`Group-18`), modp_1024 (`Group-2`), modp_1024_160 (`modp-1024-160`), ecp_256 (`Group-19`), ecp_384 (`Group-20`), ecp_521 (`Group-21`), curve_25519 (`Group-31`).
- IPv6 traffic (HA VPN only) requires IKEv2. The source states that IPv6 address support for HA VPN gateway interfaces is in Preview (check the current launch stage).
- `modp_8192` is not supported for HA VPN gateways with IPv6 interfaces (`gatewayIpVersion=IPv6`).
- Proposal order: when Cloud VPN initiates, it proposes the configured ciphers or, if none are configured, the table order; when the peer initiates, Cloud VPN selects using the same order. The selected cipher can differ by initiator and can change over time at key rotation, affecting performance and MTU. Configure the peer and tunnel to propose and accept exactly one cipher per role; do not provide lists. For an HA VPN tunnel pair use the same cipher and IKE Phase 2 lifetime on both tunnels. For HA VPN between VPC networks without configured ciphers, the gateways negotiate consistently regardless of initiator. The listed order is not ordered by strength.
- IKE fragmentation (RFC 7383) is supported; enable it on the peer. Without it, IKE packets from Google Cloud larger than the gateway MTU are dropped. `IKE_SA_INIT` and `IKE_SESSION_RESUME` cannot be fragmented.
- Console peer configuration templates may use shorter lifetimes (for example 28,800 and 3,600 seconds) for vendor compatibility; do not change generated values unless the vendor recommends it, and make the peer match the Cloud VPN values to avoid tunnel drops.
- Cloud Location Finder can help pick the region for gateways (latency, location, carbon).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/describe (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/supported-ike-ciphers (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuring-peer-gateway.md](./configuring-peer-gateway.md)
- [best-practices.md](./best-practices.md)
- [overview.md](./overview.md)
