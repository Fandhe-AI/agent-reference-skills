---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/rules-managed
---

# Alertmanager configuration for managed rule evaluation

The managed rule-evaluator can send alerts to the automatically deployed managed Alertmanager (Preview) and to any self-deployed Alertmanagers, configured through the OperatorConfig resource.

## Signature / Usage

### Managed Alertmanager

Create a local config file with your Alertmanager settings and store it in a Secret named `alertmanager` in the `gmp-public` namespace.

```bash
touch alertmanager.yaml
```

```bash
kubectl create secret generic alertmanager \
  -n gmp-public \
  --from-file=alertmanager.yaml
```

After a few moments the managed Alertmanager is enabled with your settings.

### Customize the config Secret name

```bash
kubectl create secret generic SECRET_NAME \
  -n gmp-public \
  --from-file=FILE_NAME
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
managedAlertmanager:
  configSecret:
    name: SECRET_NAME
    key: FILE_NAME
```

### Customize the external URL

Equivalent to the upstream Alertmanager `--web.external-url` flag, so notifications can link back to your alerting UI.

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: OperatorConfig
metadata:
  namespace: gmp-public
  name: config
managedAlertmanager:
  externalURL: EXTERNAL_URL
```

### Self-deployed Alertmanager

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
  alerting:
    alertmanagers:
    - name: SERVICE_NAME
      namespace: SERVICE_NAMESPACE
      port: PORT_NAME
```

## Options / Props

| OperatorConfig field | Purpose |
|----------------------|---------|
| `managedAlertmanager.configSecret.name` / `.key` | Secret name and key (file name) holding the Alertmanager config; the default is a Secret named `alertmanager` |
| `managedAlertmanager.externalURL` | External URL used for callback links in notifications |
| `rules.alerting.alertmanagers[].name` / `.namespace` / `.port` | Service name, namespace and port name of a self-deployed Alertmanager |

## Notes

- Managed Alertmanager is Preview: subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support.
- Alertmanager config files hold notification receivers' secrets (Slack, PagerDuty, webhook credentials); they end up in a Kubernetes Secret and in the local file you create, so restrict file permissions and do not commit the file.
- Switching `configSecret` is useful with several config Secrets, for example to change notification channels with rotating on-call shifts or to test an experimental route. To change the configuration, update the Secret.
- If a self-deployed Alertmanager is in a different cluster than the rule evaluator, you might need an Endpoints resource (Services without selectors). For example if the OperatorConfig names Endpoints `ns=alertmanager/name=alertmanager`, create that object yourself and populate it with reachable IPs. The `AlertmanagerEndpoints` section of the prometheus-engine API document (https://github.com/GoogleCloudPlatform/prometheus-engine/blob/main/doc/api.md#alertmanagerendpoints) covers authorization options; note that link is to the `main` branch in the source.
- Google Cloud Managed Service for Prometheus is not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/rules-managed (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-rules.md](./managed-rules.md)
- [managed-rules-operations.md](./managed-rules-operations.md)
- [managed-collection-operatorconfig.md](./managed-collection-operatorconfig.md)
