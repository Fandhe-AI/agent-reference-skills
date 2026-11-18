# vpc-service-controls-concepts

| Name | Description | Path |
|------|-------------|------|
| Overview of VPC Service Controls | Perimeters, data exfiltration risks, capabilities, glossary, known limitations | [overview.md](./overview.md) |
| Service perimeters | Enforced vs dry run mode and the perimeter configuration stages | [service-perimeters.md](./service-perimeters.md) |
| Architect service perimeters | Common unified perimeter, multiple perimeters, project qualification | [architect-perimeters.md](./architect-perimeters.md) |
| Ingress and egress rules | Rule model, YAML reference for ingress and egress fields, unsupported features | [ingress-egress-rules.md](./ingress-egress-rules.md) |
| Context-aware access | Ingress rule examples based on identity, access level, and VPC network | [context-aware-access.md](./context-aware-access.md) |
| VPC accessible services | Limit services reachable from VPC networks inside a perimeter; service patterns | [vpc-accessible-services.md](./vpc-accessible-services.md) |
| Private connectivity | Private Google Access, restricted VIP ranges, VPC and on-premises examples | [private-connectivity.md](./private-connectivity.md) |
| Restricted VIP services | Services supported by restricted.googleapis.com with support stages | [restricted-vip-services.md](./restricted-vip-services.md) |
| Supported identities | Identity formats for ingress and egress rules, deleted principals | [supported-identities.md](./supported-identities.md) |
| Access level design | Allowlist design by IP, identity, and device; enforcement rollout | [access-level-design.md](./access-level-design.md) |
| Quotas and limits | Perimeter, access policy, and organization limits | [quotas.md](./quotas.md) |
