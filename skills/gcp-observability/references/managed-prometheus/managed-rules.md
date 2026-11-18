---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/rules-managed
---

# Managed rule evaluation: Rules, ClusterRules and GlobalRules

Managed Service for Prometheus supports Prometheus-compatible rule evaluation and alerting. The rule-evaluator component, deployed automatically as part of managed collection on Kubernetes clusters, lets you write rules safely in the context of a global Prometheus backend without interfering with other users' data. Rules are written with the Rules, ClusterRules or GlobalRules custom resources, whose `.spec.groups` format is identical to the upstream Prometheus `rule_group` array.

## Signature / Usage

### Rules (namespace scope)

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: Rules
metadata:
  namespace: NAMESPACE_NAME
  name: example-rules
spec:
  groups:
  - name: example
    interval: 30s
    rules:
    - record: job:up:sum
      expr: sum without(instance) (up)
    - alert: AlwaysFiring
      expr: vector(1)
```

Rules are scoped to the resource's `project_id`, `cluster` and `namespace`, so `job:up:sum` effectively queries `sum without(instance) (up{project_id="test-project", cluster="test-cluster", namespace="NAMESPACE_NAME"})`.

Adapted (not in the official docs): the source applies the example from the remote URL; it is downloaded and inspected first.

```bash
curl -fsSL -o rules.yaml https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/examples/rules.yaml
less rules.yaml
kubectl apply -n NAMESPACE_NAME -f rules.yaml
```

After a few minutes the metric `job:up:sum` becomes available and the alert `AlwaysFiring` starts firing.

### Converting from Prometheus rules

An existing Prometheus rule file:

```yaml
groups:
- name: example
  interval: 30s
  rules:
  - record: job:up:sum
    expr: sum without(instance) (up)
  - alert: AlwaysFiring
    expr: vector(1)
```

goes unchanged under `spec` of a Rules resource (see the Rules example above).

### ClusterRules (cluster scope)

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: ClusterRules
metadata:
  name: example-clusterrules
spec:
  groups:
  - name: example
    interval: 30s
    rules:
    - record: job:up:sum
      expr: sum without(instance) (up)
    - alert: AlwaysFiring
      expr: vector(1)
```

### GlobalRules (metrics scope)

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: GlobalRules
metadata:
  name: example-globalrules
spec:
  groups:
  - name: example
    interval: 30s
    rules:
    - record: job:up:sum
      expr: sum without(instance) (up)
    - alert: AlwaysFiring
      expr: vector(1)
```

## Options / Props

| Resource | Scope of data selected | Recommended use |
|----------|------------------------|-----------------|
| `Rules` | `project_id`, `cluster` and `namespace` of the resource | Metrics of individual deployments |
| `ClusterRules` | `project_id` and `cluster` labels (all namespaces in a cluster) | Only horizontal metrics, such as those from a service mesh |
| `GlobalRules` | All data in the queried metrics scope, without restricting labels (all projects in the scope) | Cloud Monitoring metrics (required, they are not scoped to a namespace or cluster) and GKE system metrics (required); for Managed Service for Prometheus metrics only the rare cases needing data across all clusters |

### Multi-project and global evaluation

| Option | Effect |
|--------|--------|
| Place the GlobalRules resource in a project that has a multi-project metrics scope | The rule evaluator uses that project |
| Set `queryProjectID` in the OperatorConfig (`ruleEvaluatorSpec`) | Uses a project with a multi-project metrics scope |

## Notes

- Rules and alerts can be written on both Managed Service for Prometheus metrics and Cloud Monitoring metrics; GlobalRules is required for Cloud Monitoring metrics. Cloud Monitoring alerting policies can also be created from PromQL queries and Prometheus alert rules (see the "Alerting policies with PromQL" page of the source).
- If a GlobalRules rule does not preserve the `project_id` or `location` labels, they default to the values of the cluster.
- Strongly preserve the `cluster` and `namespace` labels in rule results unless the rule aggregates them away; otherwise query performance might decline and cardinality limits might be hit. Removing both labels is strongly discouraged.
- When deployed on GKE the rule evaluator uses the project of the cluster, detected automatically. For rules spanning projects, update the permissions of the service account the rule evaluator uses (usually the node's default service account) so it can read from the scoping project and write to all monitored projects in the metrics scope. If the metrics scope contains all your projects, rules evaluate globally.
- Alertmanager targets and credentials: see `managed-alertmanager.md` and `managed-rules-operations.md`.
- Google Cloud Managed Service for Prometheus is not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- The source also shows Terraform (`kubernetes_manifest` / `kubectl_manifest`).
- Adapted from the official docs: `kubectl apply -n NAMESPACE_NAME -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/examples/rules.yaml` was changed to download, inspect, apply.
- Reference: https://github.com/GoogleCloudPlatform/prometheus-engine/blob/v0.17.2/doc/api.md
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/rules-managed (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-alertmanager.md](./managed-alertmanager.md)
- [managed-rules-operations.md](./managed-rules-operations.md)
- [managed-collection-setup.md](./managed-collection-setup.md)
- [managed-prometheus-overview.md](./managed-prometheus-overview.md)
