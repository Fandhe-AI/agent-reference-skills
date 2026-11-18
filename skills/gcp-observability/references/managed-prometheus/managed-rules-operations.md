---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/rules-managed
---

# Operating the managed rule-evaluator

Credentials for non-GKE clusters, scaling, ConfigMap compression and idle behavior of the `rule-evaluator` Deployment that runs managed rules.

## Signature / Usage

### Provide credentials explicitly (non-GKE clusters)

On GKE the rule-evaluator retrieves credentials from the environment based on the node's service account. In non-GKE Kubernetes clusters provide them through the OperatorConfig in the `gmp-public` namespace.

```bash
gcloud config set project PROJECT_ID
```

```bash
gcloud iam service-accounts create gmp-test-sa
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member=serviceAccount:gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/monitoring.viewer \
&& \
gcloud projects add-iam-policy-binding PROJECT_ID\
  --member=serviceAccount:gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/monitoring.metricWriter
```

```bash
gcloud iam service-accounts keys create gmp-test-sa-key.json \
  --iam-account=gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com
```

```bash
kubectl -n gmp-public create secret generic gmp-test-sa \
  --from-file=key.json=gmp-test-sa-key.json
```

```bash
kubectl -n gmp-public edit operatorconfig config
```

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: OperatorConfig
metadata:
  namespace: gmp-public
  name: config
rules:
  credentials:
    name: gmp-test-sa
    key: key.json
```

### Scale rule evaluation with vertical pod autoscaling

Enable VPA for all Managed Service for Prometheus workloads (Autopilot and Standard clusters):

```bash
kubectl -n gmp-public patch operatorconfig/config -p '{"scaling":{"vpa":{"enabled":true}}}' --type=merge
```

On Standard clusters, a custom policy for only `rule-evaluator`:

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: rule-evaluator
  namespace: gmp-system
spec:
  resourcePolicy:
    containerPolicies:
    - containerName: evaluator
      controlledResources:
        - memory
      maxAllowed:
        memory: 4Gi
      minAllowed:
        memory: 16Mi
      mode: Auto
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: rule-evaluator
  updatePolicy:
    updateMode: Auto
```

Verify the autoscaler (use the `gke-gmp-system` namespace on Autopilot):

```bash
kubectl get vpa --namespace gmp-system rule-evaluator
```

```text
NAME             MODE   CPU   MEM        PROVIDED   AGE
rule-evaluator   Auto   2m    11534336   True       30m
```

### Compress configurations

If you have many Rules resources you might run out of ConfigMap space:

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: OperatorConfig
metadata:
  namespace: gmp-public
  name: config
features:
  config:
    compression: gzip
```

## Options / Props

| Item | Value |
|------|-------|
| Roles for the rule-evaluator service account (non-GKE) | `roles/monitoring.viewer` and `roles/monitoring.metricWriter` |
| `rule-evaluator` namespace | `gmp-system` (Standard), `gke-gmp-system` (Autopilot, direct resource creation restricted) |
| Replicas | Single replica with fixed resource requests and limits |
| VPA container name | `evaluator` |

## Notes

- The `rule-evaluator` can be OOMKilled when evaluating many rules; vertical pod autoscaling (cluster-level VPA must be enabled, see `gcp-gke`) mitigates this. On Autopilot configure VPA only through the OperatorConfig.
- The service account key file `gmp-test-sa-key.json` is a long-lived credential on your file system; restrict its permissions and do not commit it. Credentials should also be added to the `collection` section so managed collection works (see `managed-collection-operatorconfig.md`).
- When no Rules, ClusterRules or GlobalRules resources are configured, GKE scales the rule-evaluator and Alertmanager deployments to zero to conserve resources; they scale up automatically when you apply a new Rules resource, and you can force a scale-up by applying a Rules resource that does nothing.
- Google Cloud Managed Service for Prometheus is not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/rules-managed (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-rules.md](./managed-rules.md)
- [managed-alertmanager.md](./managed-alertmanager.md)
- [managed-collection-operatorconfig.md](./managed-collection-operatorconfig.md)
