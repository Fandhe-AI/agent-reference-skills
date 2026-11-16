---
source: https://docs.cloud.google.com/kubernetes-engine/config-controller/docs/overview
---

# Config Controller overview

Config Controller creates and manages Google Cloud resources with a declarative, Kubernetes model. It is a hosted version of Config Connector that simplifies installation and maintenance, and it also includes Policy Controller and Config Sync.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/kubernetes-engine/config-controller/docs/setup (the overview has no code). Create an instance and list instances:

```bash
gcloud anthos config controller create CONFIG_CONTROLLER_NAME \
    --location=LOCATION
```

```bash
gcloud anthos config controller list --location=LOCATION
```

## Options / Props

| Component | Role |
|-----------|------|
| Config Connector (hosted) | Creates configurations for any Google Cloud resource |
| Config Sync | Continuously reconciles resources with the state in the source of truth (for example Git) |
| Policy Controller | Catches and enforces policy violations before resources are deployed |

Benefits: manage with Kubernetes tools, declare desired state, automate drift detection and repair, GitOps consistency, enforce policy guardrails, continuous audit of infrastructure, higher developer velocity.

## Notes

- Policy Controller is deprecated (end of support December 31, 2027); see [policy-controller-deprecation.md](./policy-controller-deprecation.md).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16; states Policy Controller end of support on December 31, 2027)
- Source: https://docs.cloud.google.com/kubernetes-engine/config-controller/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/config-controller/docs/setup (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [config-controller-setup.md](./config-controller-setup.md)
- [config-sync-overview.md](./config-sync-overview.md)
- [policy-controller-overview.md](./policy-controller-overview.md)
