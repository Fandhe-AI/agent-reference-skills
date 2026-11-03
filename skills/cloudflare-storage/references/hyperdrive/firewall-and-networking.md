---
source: https://developers.cloudflare.com/hyperdrive/configuration/firewall-and-networking-configuration/
---

# Firewall and networking configuration

Hyperdrive connects to databases from Cloudflare's published IP address ranges; allow-list them if you restrict inbound IPs.

## Signature / Usage

```txt
Allow inbound database traffic from the Cloudflare IP ranges: https://www.cloudflare.com/ips/
```

## Notes

- Three supported configurations: (1) database accepts inbound connections from the public Internet (all ranges); (2) public Internet with an IP ACL allow-listing only the Cloudflare IP ranges used by Hyperdrive; (3) private network database with a Cloudflare Tunnel instance in the private network.
- The Cloudflare IP ranges are shared by all Hyperdrive configurations and other Cloudflare products (egress via Cloudflare IPs since 2025-03-07).

## Related

- [Connect to a private database using Workers VPC](./connect-private-database-vpc.md)
- [Connect to a private database using Tunnel](./connect-private-database-tunnel.md)
- [FAQ](./faq.md)
