---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl
---

# Install kubectl and configure cluster access

Install `kubectl` and the `gke-gcloud-auth-plugin`, generate kubeconfig entries for GKE clusters (external, internal-IP or DNS endpoint), and switch or override the target cluster.

## Signature / Usage

### Install kubectl

```bash
gcloud components install kubectl
kubectl version --client
```

With apt (requires the `cloud-sdk` apt repository):

```bash
apt-get update
apt-get install -y kubectl
```

With yum (requires the `google-cloud-cli` repository):

```bash
yum install -y kubectl
```

### Install the authentication plugin

`kubectl` and other clients require `gke-gcloud-auth-plugin`. Check first:

```bash
gke-gcloud-auth-plugin --version
```

```bash
gcloud components install gke-gcloud-auth-plugin
```

```bash
apt-get install google-cloud-cli-gke-gcloud-auth-plugin
```

```bash
yum install google-cloud-cli-gke-gcloud-auth-plugin
```

Then update the kubeconfig and verify:

```bash
gcloud container clusters get-credentials CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION
kubectl get namespaces
```

### Inspect kubeconfig

```bash
kubectl config view
kubectl config current-context
```

### Store cluster information

Requires `container.clusters.get` (least-privileged role: `container.clusterViewer`).

```bash
gcloud container clusters get-credentials CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION
```

Internal IP or DNS endpoint:

```bash
gcloud container clusters get-credentials CLUSTER_NAME \
    --internal-ip
```

```bash
gcloud container clusters get-credentials CLUSTER_NAME \
    --dns-endpoint
```

### Run a command against a specific cluster

```bash
kubectl run my-app --image us-docker.pkg.dev/my-project/my-repo/my-app:1.0 --cluster my-new-cluster
```

## Options / Props

| Item | Description |
|------|-------------|
| Default kubeconfig path | `$HOME/.kube/config` |
| Endpoint selection order | External IP (if enabled), then internal IP, then DNS address (if IP access is disabled) |
| `--internal-ip` | kubeconfig uses the internal IP-based endpoint |
| `--dns-endpoint` | kubeconfig uses the DNS-based endpoint; omits `certificate-authority-data` (GFE presents a publicly signed certificate) |
| IP-based endpoints | kubeconfig includes `certificate-authority-data` (cluster root CA) |
| `--cluster=CLUSTER_NAME` | Run a single kubectl command against another cluster without changing the current context |

## Notes

- Kubeconfig entries hold your gcloud credentials or application default credentials. They are not updated when clusters are created from the Console or from another machine; run `get-credentials` yourself.
- `get-credentials` also changes the current kubectl context to that cluster.
- The plugin is mandatory for Kubernetes 1.26 and later clients; without it existing clients show an error.
- The `get-credentials` switching example in the source reuses the same command with placeholders; it shows the switch for `my-cluster` vs `my-new-cluster`.
- gcloud installation and auth are covered by `gcp-cli`.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-clusters.md](./managing-clusters.md)
- [creating-an-autopilot-cluster.md](./creating-an-autopilot-cluster.md)
