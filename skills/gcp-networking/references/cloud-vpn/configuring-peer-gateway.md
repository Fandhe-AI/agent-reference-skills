---
source: https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/configuring-peer-gateway
---

# Configure the peer VPN gateway

Complete a Cloud VPN configuration by configuring the peer VPN gateway: the external peer VPN gateway resource (HA VPN), matching tunnels, BGP sessions, firewall rules and IKE settings.

## Signature / Usage

### Create an external peer VPN gateway resource (gcloud)

Enter the interface ID and IP address of your physical gateway (1, 2 or 4 interfaces).

```bash
gcloud compute external-vpn-gateways create mygateway \
  --interfaces 0=35.254.128.120,1=35.254.128.121
```

Output:

```text
Creating external VPN gateway...done.
NAME       REDUNDANCY_TYPE
mygateway  TWO_IPS_REDUNDANCY
```

### Create an external peer VPN gateway resource (REST)

Method: `externalVpnGateways.insert`. Use a gateway redundancy type valid for the interface count.

Adapted (not in the official docs): removed the trailing comma after the second interface object so the request body is valid JSON.

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/externalVpnGateways
{
  "name": "mygateway",
  "interfaces": [
    {
      "id": 0,
      "ipAddress": "35.254.128.120"
    },
    {
      "id": 1,
      "ipAddress": "35.254.128.121"
    }
  ],
  "redundancyType": "TWO_IPS_REDUNDANCY"
}
```

## Options / Props

### IKE settings for the peer (IKEv1 and IKEv2)

| Setting | Value |
|---|---|
| IPsec mode | ESP+Auth Tunnel mode (Site-to-Site) |
| Auth protocol | `psk` |
| Shared secret | IKE pre-shared key; choose a strong one (see [generating-pre-shared-key.md](./generating-pre-shared-key.md)) |
| Start | `auto` (restart the connection automatically if the peer drops) |
| PFS | `on` |
| DPD | Recommended `Aggressive` |
| INITIAL_CONTACT (`uniqueids`) | Recommended `on` (sometimes `restart`) |
| TSi | Subnet networks: ranges from `--local-traffic-selector`; if not specified in an auto mode VPC network announcing only the gateway's subnet, that subnet range. Legacy networks: the range of the network |
| TSr | IKEv2: destination ranges of all routes with `--next-hop-vpn-tunnel` set to this tunnel. IKEv1: one such destination range, arbitrarily |
| MTU | Peer device MTU must not exceed 1460 bytes; enable prefragmentation (fragment, then encapsulate) |

### Additional IKEv1-only parameters

| Setting | Value |
|---|---|
| IKE/ISAKMP | `aes128-sha1-modp1024` |
| ESP | `aes128-sha1` |
| PFS algorithm | Group 2 (`MODP_1024`) |

## Notes

- Values needed for the external peer gateway resource (must match the physical gateway): number of interfaces (`one`, `two` or `four` in the console), external IP address(es), BGP endpoint IP address(es), IKE pre-shared key, ASN. The source also shows Console steps.
- HA VPN: configure two tunnels on the peer, one corresponding to Cloud VPN `interface 0` and one to `interface 1`, each using a unique external IP of the HA VPN gateway.
- Always configure BGP sessions for HA VPN and for Classic VPN tunnels with dynamic routing. Get the Google ASN, peer ASNs and BGP IPs from the Cloud Router summary; for HA VPN the Google ASN is the same for both tunnels. MD5 authentication on BGP sessions is optional.
- Dual stack: obtain the IPv6 next hop address assigned to the BGP peer and configure it on the peer's tunnels (Google Cloud assigns it automatically if not set manually). IPv6 addresses on the tunnel interfaces are used only as next hops; IPv6 routes are advertised as IPv6 NLRI over IPv4 BGP peering. HA VPN tunnels must use IKEv2 for IPv6; allow IPv6 in the peer firewalls.
- Traffic selectors on the peer: `0.0.0.0/0,::/0` for IPv4 and IPv6, `0.0.0.0/0` for IPv4 only.
- The pre-shared key is sensitive because it allows access into your network; do not commit or share it.
- Console peer configuration templates (Cisco, Palo Alto Networks, Juniper and others) are available for download.
- Source: https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/configuring-peer-gateway (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the REST example had `},` after the second interface object (trailing comma, invalid JSON).

## Related

- [supported-ike-ciphers.md](./supported-ike-ciphers.md)
- [generating-pre-shared-key.md](./generating-pre-shared-key.md)
- [choosing-networks-routing.md](./choosing-networks-routing.md)
