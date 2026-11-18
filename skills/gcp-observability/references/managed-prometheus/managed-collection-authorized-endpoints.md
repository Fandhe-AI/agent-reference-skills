---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed
---

# Authorized scrape endpoints for managed collection

If a scrape target requires authorization, configure the collector with the right authorization type and the relevant Secret. Managed Service for Prometheus supports mTLS, BasicAuth, an HTTP Authorization header and OAuth 2, each set on a field of `Spec.Endpoints[]` in the PodMonitoring resource and each reading its credentials from a Kubernetes Secret.

## Signature / Usage

### Let the collector read the Secret

All four types use the same Role and RoleBinding pattern (the Secret `secret-example` is in the `default` namespace). Standard clusters:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: secret-example-read
rules:
- resources:
  - secrets
  apiGroups: [""]
  verbs: ["get", "list", "watch"]
  resourceNames: ["secret-example"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: gmp-system:collector:secret-example-read
  namespace: default
roleRef:
  name: secret-example-read
  kind: Role
  apiGroup: rbac.authorization.k8s.io
subjects:
- name: collector
  namespace: gmp-system
  kind: ServiceAccount
```

On GKE Autopilot clusters the same pair is used with the subject in the `gke-gmp-system` namespace:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: secret-example-read
rules:
- resources:
  - secrets
  apiGroups: [""]
  verbs: ["get", "list", "watch"]
  resourceNames: ["secret-example"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: gmp-system:collector:secret-example-read
  namespace: default
roleRef:
  name: secret-example-read
  kind: Role
  apiGroup: rbac.authorization.k8s.io
subjects:
- name: collector
  namespace: gke-gmp-system
  kind: ServiceAccount
```

### mTLS

Set `Spec.Endpoints[].Scheme` to `https`.

Adapted (not in the official docs): `apiVersion: v1` added (a Secret needs it to be applied) and the `********` values, which are not valid YAML scalars, replaced with quoted upper-case placeholders.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-example
stringData:
  cert: "CLIENT_CERT_PEM"
  key: "PRIVATE_KEY_PEM"
  ca: "CA_CERT_PEM"
```

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  name: prom-example
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: prom-example
  endpoints:
  - port: metrics
    interval: 30s
    scheme: https
    tls:
      ca:
        secret:
          name: secret-example
          key: ca
      cert:
        secret:
          name: secret-example
          key: cert
      key:
        secret:
          name: secret-example
          key: key
```

### BasicAuth

Adapted (not in the official docs): `apiVersion: v1` added and the `********` value replaced with a quoted placeholder.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-example
stringData:
  password: "PASSWORD"
```

Adapted (not in the official docs): `scheme: https` added to the endpoint so the credentials are not sent over plain HTTP.

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  name: prom-example
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: prom-example
  endpoints:
  - port: metrics
    interval: 30s
    scheme: https
    basicAuth:
      username: foo
      password:
        secret:
          name: secret-example
          key: password
```

### HTTP Authorization header

Adapted (not in the official docs): `apiVersion: v1` added and the `********` value replaced with a quoted placeholder.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-example
stringData:
  credentials: "CREDENTIALS"
```

Adapted (not in the official docs): `scheme: https` added to the endpoint so the credentials are not sent over plain HTTP.

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  name: prom-example
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: prom-example
  endpoints:
  - port: metrics
    interval: 30s
    scheme: https
    authorization:
      type: Bearer
      credentials:
        secret:
          name: secret-example
          key: credentials
```

### OAuth 2

Adapted (not in the official docs): `apiVersion: v1` added and the `********` value replaced with a quoted placeholder.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-example
stringData:
  clientSecret: "CLIENT_SECRET"
```

Adapted (not in the official docs): `clientSecret.secret.key` changed from `password` to `clientSecret`, the key that the Secret above defines, `tokenURL` given the `https://` scheme, and `scheme: https` added to the endpoint so the token is not sent over plain HTTP.

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  name: prom-example
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: prom-example
  endpoints:
  - port: metrics
    interval: 30s
    scheme: https
    oauth2:
      clientID: foo
      clientSecret:
        secret:
          name: secret-example
          key: clientSecret
      tokenURL: https://example.com/token
```

## Options / Props

| Type | PodMonitoring field | Secret key used in the example |
|------|---------------------|--------------------------------|
| mTLS | `Spec.Endpoints[].Scheme` = `https` and `tls` (`ca`, `cert`, `key`) | `ca`, `cert`, `key` |
| BasicAuth | `Spec.Endpoints[].BasicAuth` (`username`, `password`) | `password` |
| HTTP Authorization Header | `Spec.Endpoints[].Authorization` (`type`, `credentials`); use BasicAuth for BasicAuth endpoints | `credentials` |
| OAuth 2 | `Spec.Endpoints[].OAuth2` (`clientID`, `clientSecret`, `tokenURL`) | `clientSecret` (the source's PodMonitoring references `password`; corrected, see Notes) |

## Notes

- Never commit real certificates, keys, passwords or tokens; the placeholders above stand for values you create. The Secret holds credentials in cluster storage, so restrict who can read it.
- The Role grants `get`, `list` and `watch` only on the single named Secret to the `collector` service account.
- `Spec.Endpoints[].tls.insecureSkipVerify: true` skips verifying the certificate authority; the source says this is not recommended. mTLS is commonly used in zero-trust environments such as Istio or Cloud Service Mesh.
- Corrected from the official docs: in the OAuth 2 example the Secret defines the key `clientSecret` while the source's PodMonitoring refers to `key: password`, a key the Secret does not have; the fence uses `key: clientSecret` so the reference resolves. Make the `key` value match the key in your Secret.
- Adapted from the official docs: Secret manifests started with `kind: Secret` (no `apiVersion`) and had values `********`; the `apiVersion: v1` line and quoted placeholders were added so the manifests are valid.
- Option references: https://github.com/GoogleCloudPlatform/prometheus-engine/blob/v0.17.2/doc/api.md (sections `tls`, `basicauth`, `auth`, `oauth2`).
- Google Cloud Managed Service for Prometheus is not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source's OAuth 2.0 example sets `tokenURL: example.com/token`, which has no URL scheme; the example uses `https://example.com/token`. Replace it with your token endpoint.
- Adapted from the official docs: the source's BasicAuth, Bearer and OAuth 2.0 PodMonitoring examples omit `scheme`, so they would scrape over HTTP (the default) and send the password or token unencrypted; each example sets `scheme: https`. If the endpoint uses a private CA, also set `tls.ca` as in the mTLS example.

## Related

- [managed-collection-podmonitoring.md](./managed-collection-podmonitoring.md)
- [managed-collection-setup.md](./managed-collection-setup.md)
- [managed-collection-operatorconfig.md](./managed-collection-operatorconfig.md)
