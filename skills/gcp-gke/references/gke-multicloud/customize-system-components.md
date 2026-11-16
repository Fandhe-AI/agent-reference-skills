---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/customize-system-components
---

# Customize system components on attached clusters

Apply custom tolerations and labels to Google-owned system components in GKE attached clusters, so they can schedule onto tainted nodes and fit your labeling conventions. By default these components expose no customizable fields, which can leave Pods unschedulable.

## Signature / Usage

Google-owned system component Pods always include this toleration:

```yaml
      - key: components.gke.io/gke-managed-components
        operator: Exists
```

### Add custom tolerations (at register time)

Adapted (not in the official docs): removed the trailing `\\` line continuation after the last flag, and replaced the `...` elision line (which the shell would run as a command) with the other register flags from the attach page (private-issuer form: `--has-private-issuer` instead of `--issuer-url`, `--distribution=generic`).

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=generic \
  --context=KUBECONFIG_CONTEXT \
  --has-private-issuer \
  --kubeconfig=KUBECONFIG_PATH \
  --system-component-tolerations=COMPONENT_TOLERATION
```

### Add custom labels (at register time)

Adapted (not in the official docs): same removal of the trailing `\\` and the same replacement of the `...` line.

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=generic \
  --context=KUBECONFIG_CONTEXT \
  --has-private-issuer \
  --kubeconfig=KUBECONFIG_PATH \
  --system-component-labels=COMPONENT_LABEL
```

## Options / Props

| Item | Format / limit |
| --- | --- |
| `COMPONENT_TOLERATION` `Equal` | `key=value:operator:effect`, for example `workload=hpc:Equal:NoSchedule` |
| `COMPONENT_TOLERATION` `Exists` | `key:operator:effect`, for example `workload:Exists:NoSchedule` |
| `COMPONENT_TOLERATION` any node | `:operator:effect`, for example `:Exists:NoSchedule` |
| `COMPONENT_LABEL` | Comma-separated `key=value`, for example `env=production,region=us-east-1`; value may be empty (`backend=""`) |
| Maximum | 10 custom tolerations and 10 custom labels |
| Forbidden labels | `name`, `component`, `app`, any label containing `k8s.io`, `kubernetes.io`, `google` or `gke.io` |

## Notes

- Corrected from the official docs: the source shows `--system-component-tolerations=COMPONENT_TOLERATION \\` and `--system-component-labels=COMPONENT_LABEL \\` with trailing double backslashes, and a `...` line standing in for the other register flags.
- Tolerations and labels can only be added when you register the cluster (see [attach-cluster-generic.md](./attach-cluster-generic.md)).
- Operators and effects: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/customize-system-components (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-generic.md](./attach-cluster-generic.md)
