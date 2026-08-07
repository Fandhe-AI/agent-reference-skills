# Network Policy

Network policies control outbound network access from a box: block all outbound traffic, allow only specific public domains, or restrict egress to specific CIDR ranges.

## Signature / Usage

```typescript
import { Box } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  networkPolicy: {
    mode: "custom",
    allowedDomains: ["api.github.com", "*.githubusercontent.com"],
    allowedCidrs: ["104.16.0.0/12"],
  },
})

console.log(box.networkPolicy) // { mode: "custom", ... }

await box.updateNetworkPolicy({ mode: "deny-all" })
```

```python
box = Box.create(
    runtime="node",
    network_policy={
        "mode": "custom",
        "allowed_domains": ["api.github.com", "*.githubusercontent.com"],
        "allowed_cidrs": ["104.16.0.0/12"],
    },
)

print(box.network_policy)

box.update_network_policy({"mode": "deny-all"})
```

## Options / Props

| Mode | Description |
|------|-------------|
| `allow-all` | Default. No outbound restrictions |
| `deny-all` | Block all outbound network access |
| `custom` | Allow/deny specific domains and CIDR ranges via `allowedDomains`, `allowedCidrs`, `deniedCidrs` |

```typescript
type NetworkPolicy =
  | { mode: "allow-all" | "deny-all" }
  | { mode: "custom"; allowedDomains?: string[]; allowedCidrs?: string[]; deniedCidrs?: string[] }
```

## Notes

- `allowedDomains` supports exact matches (`api.github.com`) and wildcard `*.suffix` form (`*.githubusercontent.com`)
- In `custom` mode, `deniedCidrs` takes precedence over allowed CIDRs
- Private IP ranges are always blocked, even if explicitly allowed
- `updateNetworkPolicy()` applies immediately without requiring box recreation; `networkPolicy` is also supported in `Box.fromSnapshot()` and `EphemeralBox`

## Related

- [Security & Secrets](./security.md)
- [Quickstart](./quickstart.md)
