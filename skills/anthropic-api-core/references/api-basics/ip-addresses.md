<!-- source: https://platform.claude.com/docs/en/api/ip-addresses / last verified: 2026-08-07 -->

# IP addresses

Fixed IP addresses Anthropic services use for inbound and outbound connections, for firewall allowlisting.

## Signature / Usage

```text
# Inbound
IPv4: 160.79.104.0/23
IPv6: 2607:6bc0::/48

# Outbound
IPv4: 160.79.104.0/21

# Phased out (no longer in use)
34.162.46.92/32
34.162.102.82/32
34.162.136.91/32
34.162.142.92/32
34.162.183.95/32
```

## Options / Props

| Direction | Type | Address |
|---|---|---|
| Inbound | IPv4 | `160.79.104.0/23` |
| Inbound | IPv6 | `2607:6bc0::/48` |
| Outbound | IPv4 | `160.79.104.0/21` |

**Phased out (no longer in use — remove from firewall rules):** `34.162.46.92/32`, `34.162.102.82/32`, `34.162.136.91/32`, `34.162.142.92/32`, `34.162.183.95/32`.

## Notes

- These addresses will not change without notice.
- Outbound addresses are used for Anthropic-initiated outbound requests, e.g. MCP connector tool calls, web search, and web fetch.
- On Claude Platform on AWS, the inbound endpoint (`aws-external-anthropic.{region}.api.aws`) resolves to AWS IP ranges instead — use AWS's published IP address ranges for inbound allowlisting; outbound tool calls still originate from the Anthropic ranges above.

## Related

- [overview](./overview.md)
- [claude-platform-on-aws-iam-actions](./claude-platform-on-aws-iam-actions.md)
