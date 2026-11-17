---
source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bgp-route-policies-overview
---

# BGP route policies overview

BGP route policies let you set rules to filter BGP routes or modify BGP route attributes on learned (import) and advertised (export) routes of Cloud Router BGP sessions. Policies are defined with the Common Expression Language (CEL). They are separate from policy-based routes, which assign a next hop in a VPC network by source address.

## Signature / Usage

### Add an import route policy

```bash
gcloud compute routers add-route-policy my-router \
  --region=us-central1 --policy-name=my-policy \
  --policy-type=IMPORT
```

### Add a prefix named set

```bash
gcloud compute routers add-named-set my-router \
  --region=us-central1 --set-name=my-set --set-type=PREFIX
```

## Options / Props

### Evaluation rules

- Policies are evaluated in the order you list them; terms within a policy in order of priority.
- Terms can modify BGP routes; a later term can modify a route changed by an earlier term.
- Evaluation ends when a route is accepted or dropped; a route is accepted if all policies and terms are evaluated and it isn't dropped.
- Terms aren't evaluated twice for a route in a single exercise of a policy.
- Evaluation fails open: routes not explicitly dropped are accepted. To get fail-closed behavior, create a "drop all" policy and put it last in the import (or export) policy list of every BGP peer that must fail closed; policies are attached per BGP peer and per direction and are evaluated in the order listed.
- A policy applies in one direction only (inbound for learned routes or outbound for advertised routes) but can be applied to multiple BGP peers. Each BGP peer has zero or more import and export policies.

### Named sets

Named sets group expressions of one type (communities or BGP prefixes), are unique to each Cloud Router, and can be referenced by any number of policies on the same Cloud Router. Peers reference policies by name, and policies reference named sets by name, only when they are defined on the same Cloud Router. Policies can be created, modified and deleted as long as the parent Cloud Router exists.

### Communities

| Behavior | Detail |
|---|---|
| Community value | 32-bit field in two 16-bit sections (conventionally AS number : unique number; not enforced) |
| Supported | Standard communities only; extended communities can't be matched or modified |
| Route selection | Doesn't use communities; `NO_EXPORT` / `NO_ADVERTISE` aren't honored |
| Transitivity | Communities are dropped from learned routes after import policies, so aren't re-advertised (non-transitive) |
| Well-known values | Use literal values: `65535:65281` for `NO_EXPORT`, `65535:65282` for `NO_ADVERTISE` |

### Interactions with other features

| Feature | Interaction |
|---|---|
| Custom advertised routes | Export policies can drop or modify them. |
| Custom learned routes | Policies can't match or modify them; only routes learned directly from the BGP peer are supported. |
| Prefix limits | Cloud Router accepts 5000 prefixes from a peer and resets the BGP session if more are advertised; the limit is applied before policies. |
| Subnets | Export policies can filter or modify subnet routes before advertisement. |
| Transit routes | Policies can modify them. |

## Notes

- Test BGP route policies in a test environment before production.
- A "drop all" policy or `drop()` term can remove routes and break connectivity; try policies on a disposable router or peer first. Exceeding the 5000-prefix limit resets the BGP session.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/add-route-policy and https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/add-named-set (gcloud 593.0.0 help); the page itself has no code. The full flag list is in the `gcp-compute` skill. Creating policies and named sets: https://docs.cloud.google.com/network-connectivity/docs/router/how-to/bgp-route-policies/create-policies and https://docs.cloud.google.com/network-connectivity/docs/router/how-to/bgp-route-policies/create-named-sets.
- Source inconsistency: the transit routes row writes `NO_ADVERTISED`, while the communities section of the same page writes `NO_ADVERTISE`; both are kept as written.
- Clarified from the official docs: the source says to create a "drop all" policy "that you apply to your last peering"; because the same page says each BGP peer has its own import and export policies, which are evaluated in the order listed, a drop-all policy on one peer does not affect the others, so it is placed last in the policy list of each peer.
- Source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bgp-route-policies-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bgp-route-policy-reference.md](./bgp-route-policy-reference.md)
- [learned-routes.md](./learned-routes.md)
- [advertised-routes.md](./advertised-routes.md)
- [quotas.md](./quotas.md)
