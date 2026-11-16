---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/use-a-proxy
---

# Use a proxy with attached clusters

If your organization sends internet traffic through an HTTP proxy, configure GKE attached clusters to use it through a proxy configuration file stored in an immutable Kubernetes Secret referenced at register or update time.

## Signature / Usage

### Allow these domains on the proxy

`.gcr.io`, `cloudresourcemanager.googleapis.com`, `container.googleapis.com`, `gkeconnect.googleapis.com`, `gkehub.googleapis.com`, `oauth2.googleapis.com`, `securetoken.googleapis.com`, `storage.googleapis.com`, `sts.googleapis.com`, `www.googleapis.com`, `servicecontrol.googleapis.com`, `logging.googleapis.com`, `monitoring.googleapis.com`, `opsconfigmonitoring.googleapis.com`, `GCP_LOCATION-gkemulticloud.googleapis.com` (for example `us-west1`).

### 1. Proxy configuration file

```yaml
{
"httpProxy": HTTP_PROXY_AUTHENTICATION_URL,
"httpsProxy": HTTPS_PROXY_AUTH_URL,
"noProxy": NO_PROXY_ADDRESSES
}
```

### 2. Create the Secret and make it immutable

```bash
kubectl create secret generic SECRET_NAME \
--from-file=PROXY_CONFIGURATION_FILE
```

Set the Secret's `immutable` field to `true`:

```bash
kubectl edit secret SECRET_NAME
```

### 3. New cluster

Adapted (not in the official docs): the source shows only the two proxy flags; the other flags that `register` requires (from the attach page, private-issuer form) are added so the command is complete.

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=generic \
  --context=KUBECONFIG_CONTEXT \
  --has-private-issuer \
  --kubeconfig=KUBECONFIG_PATH \
  --proxy-secret-name=SECRET_NAME \
  --proxy-secret-namespace=SECRET_NAMESPACE
```

### 3. Existing cluster

Required if proxy details changed or the initial registration overlooked the proxy:

Adapted (not in the official docs): `--location` added, which `update` requires.

```bash
gcloud container attached clusters update CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --proxy-secret-name=SECRET_NAME \
  --proxy-secret-namespace=SECRET_NAMESPACE
```

## Options / Props

| Field | Description |
| --- | --- |
| `httpProxy` | Proxy server URL: hostname/IP, optionally port, username, password (for example `http://user:password@192.0.2.0:80` or `198.51.100.255`) |
| `httpsProxy` | Proxy URL for HTTPS traffic, same form |
| `noProxy` | Comma-separated URLs, CIDR blocks, DNS names that bypass the proxy |
| `GCP_LOCATION` | Google Cloud region of the cluster (supported region, for example `us-west1`) |

## Notes

- `httpProxy` and `httpsProxy` do not accept `https://` prefixes; use `http://` even if the real address begins with `https://` (for example `http://proxy.example.com:3128`). All three fields are required; including the VPC IP range in `noProxy` is recommended.
- `noProxy`: values can be IPs, CIDRs, domains or `*`; a single `*` skips the proxy for all traffic. A leading dot (`.google.com`) matches subdomains but not `google.com`. Include `kubernetes.default.svc.cluster.local` and `kubernetes.default.svc` for proper logging (source example: `198.51.100.0,192.0.2.0/16,examplepetstore.com,.altostrat.com,kubernetes.default.svc.cluster.local, kubernetes.default.svc`).
- Corrected from the official docs: the source shows `register` / `update` with only `--proxy-secret-name` and `--proxy-secret-namespace` (no `--location` or the required registration flags).
- Security: the proxy file can contain credentials. Kubernetes Secrets are base64-encoded, not encrypted; keep the file out of version control and restrict access to the Secret. `.gcr.io` is a legacy Container Registry domain kept as written in the source.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/use-a-proxy (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [update-cluster.md](./update-cluster.md)
