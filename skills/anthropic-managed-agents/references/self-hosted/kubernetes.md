<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/kubernetes / last verified: 2026-11-14 -->

# Deploy on Kubernetes

Install the self-hosted Claude Managed Agents server and its sandboxes on a Kubernetes cluster with the two Helm charts in the release archive, then run a first session in a sandbox pod. The walkthrough starts from an empty GKE cluster; run every command from the archive's top directory.

- `cma-server`: applies the database schema and runs two servers behind a Service, in namespace `cma-server`.
- `cma-sandboxes`: runs a dispatcher and the sandbox pods in namespace `cma`. The dispatcher polls the server for work and gives each session its own sandbox pod, where a worker runs the agent's shell and file tools.

Your PostgreSQL database stays outside both.

## Signature / Usage

Build and push the three images (`TAG` is the release version, the part of the archive name after `v`):

```bash
REGISTRY=us-docker.pkg.dev/my-project/cma
TAG=1.2.3
PLATFORM=linux/amd64
```

```bash
docker buildx build --platform "$PLATFORM" -f kubernetes/server/Dockerfile -t "$REGISTRY/cma-server-image:$TAG" --push .
docker buildx build --platform "$PLATFORM" -f kubernetes/dispatcher/Dockerfile -t "$REGISTRY/cma-dispatcher:$TAG" --push .
docker buildx build --platform "$PLATFORM" -t "$REGISTRY/cma-sandbox:$TAG" --push kubernetes/sandbox
```

Create a secrets file, then replace `sk-ant-...` with your Claude API key:

```bash
cat > secrets.env <<EOF
PG_PASSWORD=$(openssl rand -hex 32)
UPSTREAM_KEY=sk-ant-...
EOF
chmod 600 secrets.env
```

Create the database role and database (replace `...` with `PG_PASSWORD`):

```sql
CREATE ROLE cma_server LOGIN PASSWORD '...';
GRANT cma_server TO CURRENT_USER;
CREATE DATABASE cma_server OWNER cma_server;
```

Create the server namespace and Secrets:

```bash
source secrets.env
ENCRYPTION_KEY=$(openssl rand -base64 32)
kubectl create namespace cma-server
kubectl label namespace cma-server pod-security.kubernetes.io/enforce=restricted pod-security.kubernetes.io/enforce-version=latest
kubectl -n cma-server create secret generic cma-server-db \
  --from-literal=PGPASSWORD="$PG_PASSWORD"
kubectl -n cma-server create secret generic cma-server-keys \
  --from-literal=CMA_SERVER__API_KEY="$(openssl rand -hex 32)" \
  --from-literal=CMA_STORE__CREDENTIALS_ENCRYPTION_KEY="$ENCRYPTION_KEY"
kubectl -n cma-server create secret generic cma-server-upstream \
  --from-literal=ANTHROPIC_API_KEY="$UPSTREAM_KEY"
```

Create the sandboxes' namespace and the certificate the dispatcher serves:

```bash
kubectl create namespace cma
kubectl label namespace cma pod-security.kubernetes.io/enforce=restricted pod-security.kubernetes.io/enforce-version=latest
openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:P-256 -nodes -days 825 \
  -subj "/CN=cma-dispatcher.cma.svc" \
  -addext "subjectAltName=DNS:cma-dispatcher.cma.svc,DNS:cma-dispatcher.cma.svc.cluster.local" \
  -keyout tls.key -out tls.crt
kubectl -n cma create secret tls cma-dispatcher-tls --cert=tls.crt --key=tls.key --dry-run=client -o yaml | kubectl apply -f -
kubectl -n cma create configmap cma-dispatcher-ca --from-file=ca.crt=tls.crt --dry-run=client -o yaml | kubectl apply -f -
```

Install the server with `cma-server-values.yaml`:

```yaml
earlierNames: false   # a new install
image:
  registry: us-docker.pkg.dev/my-project/cma   # REGISTRY in the build commands
database:
  url: host=10.20.0.5 port=5432 user=cma_server dbname=cma_server sslmode=require   # your database's address
environments:
  - name: default
    namespace: cma
```

```bash
helm install cma-server kubernetes/server/chart --namespace cma-server -f cma-server-values.yaml --wait
kubectl -n cma-server logs job/cma-server-environment-default
```

Find the cluster API endpoint to block (GKE):

```bash
gcloud container clusters describe my-cluster --format 'value(endpoint)'
```

Install the sandboxes with `cma-values.yaml`:

```yaml
platform: gke
image:
  registry: us-docker.pkg.dev/my-project/cma   # REGISTRY in the build commands
egress:
  mode: publicInternet
  clusterCIDRs:
    - 203.0.113.10/32                          # the cluster's API endpoint
  cmaServer:
    pods:
      namespace: cma-server
      matchLabels:
        anthropic.com/role: server
    port: 8400
```

```bash
helm install cma kubernetes/chart --namespace cma -f cma-values.yaml --wait
```

Run a session. In one terminal forward the port; in a second set the CLI variables:

```bash
kubectl -n cma-server port-forward svc/cma-server 8400:8400
```

```bash
export ANTHROPIC_BASE_URL=http://127.0.0.1:8400
export ANTHROPIC_API_KEY=$(kubectl -n cma-server get secret cma-server-keys -o jsonpath='{.data.CMA_SERVER__API_KEY}' | base64 -d)
```

Then follow quickstart "Run your first session" (Create an agent, Start a session, Ask the agent to run a command), using environment name `default` instead of `compose-sandbox`. In a third terminal, `kubectl -n cma get pods` lists a pod named like the hostname the agent reports.

Check TLS-fronted health from outside the cluster (response is `{"status":"ok"}`):

```bash
curl -s https://<host>/cma-server/healthz
```

Renew the chart-created environment key (at least once in the key's last 60 days):

```bash
helm upgrade cma-server kubernetes/server/chart --namespace cma-server -f cma-server-values.yaml --wait
kubectl -n cma rollout restart deployment/cma-dispatcher
```

Replace an environment key you created yourself with the admin CLI (keep the port-forward running; `ANTHROPIC_API_KEY` holds the server API key). Create a new key, move workers to it via `ANTHROPIC_ENVIRONMENT_KEY`, then revoke the old one:

```bash
echo "$ANTHROPIC_API_KEY" | ./cma-server-admin mint-key \
  -base-url http://127.0.0.1:8400 -env env_01595EKxaaTTGwwY3kyXdtbs -key-file -
```

```bash
echo "$ANTHROPIC_API_KEY" | ./cma-server-admin revoke-key \
  -base-url http://127.0.0.1:8400 -env env_01595EKxaaTTGwwY3kyXdtbs \
  -key-id etok_01AbCdEfGhIjKlMnOpQrStUv -key-file -
```

Uninstall (delete the sandboxes first):

```bash
kubectl -n cma scale deployment/cma-dispatcher --replicas=0
kubectl -n cma delete sandboxwarmpool cma-sandbox
kubectl -n cma delete sandboxclaims --all
```

On GKE, also:

```bash
kubectl -n cma delete sandboxes --all
```

Repeat until sandboxes, pods, and volumes are gone, then remove the charts and namespaces:

```bash
kubectl -n cma get sandboxes,pods,pvc
```

```bash
helm uninstall cma --namespace cma
helm uninstall cma-server --namespace cma-server
kubectl delete namespace cma cma-server
```

## Options / Props

`egress.mode` values (in `cma-values.yaml`):

| `egress.mode` | What sandboxes can reach |
|---------------|--------------------------|
| `closed`, the default | Your servers and the dispatcher, and no DNS server |
| `publicInternet` | Your servers, the dispatcher, a DNS server, and the public internet |
| `gateway` | Your servers, the dispatcher, and, through the egress gateway, the hosts that you list |

Platform values (`platform` in `cma-values.yaml`):

| Platform | Extra requirements |
|----------|--------------------|
| `gke` | Agent Sandbox add-on, GKE Sandbox node pool, Dataplane V2 or Calico |
| `eks` | Node group with gVisor `runsc` registered as containerd handler `runsc`; label nodes `cma.anthropic.com/sandbox-node=true`, taint `cma.anthropic.com/sandbox-node=true:NoSchedule`. The chart registers the `gvisor` RuntimeClass |
| `aks` | Node pool with Pod Sandboxing (same label and taint as EKS); set `aks.networkPolicy` to `cilium`, `calico`, or `azure`; only `egress.mode: publicInternet` is accepted |
| `generic` | A RuntimeClass for gVisor or another sandboxed runtime; put its name in `runtimeClass.name` |

DNS settings for GKE:

| Setup | Line to add |
|-------|-------------|
| Cloud DNS for GKE (Autopilot) | `gke: {dns: cloudDns}` |
| NodeLocal DNSCache | `gke: {dns: nodeLocalCache, kubeDnsUpstreamIP: <address>}` (address from `kubectl -n kube-system get svc kube-dns-upstream -o jsonpath='{.spec.clusterIP}'`) |

Freeing a session's volume (default 10 GiB per session for `/workspace`):

| To free | Do this |
|---------|---------|
| One session's volume | Archive the session after its turn ends; the dispatcher usually deletes the volume within about 5 minutes |
| Volumes of sessions nobody archives | Set `dispatcher.retentionDays` in `cma-values.yaml`; the volume is deleted after that many idle days and the next message starts with an empty `/workspace`. Default `0` keeps every volume |

## Notes

- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/kubernetes.md (fetched 2026-11-14).
- Access to self-hosted Claude Managed Agents is requested through your Anthropic account team.
- Distinction: this page deploys the whole self-hosted Claude Managed Agents service (server plus sandboxes) on your cluster. It is not `self_hosted` environments / self-hosted sandboxes (page family `../environments/self-hosted-sandboxes*.md`), where Anthropic hosts the service and you host only the tool-execution worker.
- Prerequisites: Kubernetes 1.30 or later with the Agent Sandbox controller, nodes that run gVisor, and a network plugin that enforces NetworkPolicy; PostgreSQL 16 or later reachable from the cluster; a registry the cluster can pull from (you build the images); a Claude API key (for another provider see inference-provider); cluster-admin rights (the install creates namespaces, Roles, and a ClusterRoleBinding); `helm`, `kubectl`, `docker buildx`, `openssl`, and the `ant` CLI; and the release archive.
- Both charts expect images tagged with the release version.
- Print the encryption key with `echo "$ENCRYPTION_KEY"` and keep a copy outside the cluster; a restored database needs it. Delete `secrets.env` afterward. The `cma-server-db` Secret keeps the database password.
- The server install creates the environment `default` and stores its key in Secret `cma-environment` in namespace `cma`; the log line starts `filled Secret cma/cma-environment`. If a first `helm install` fails, run `helm uninstall` for that release before installing again.
- `platform: gke` installs let sandboxes reach the public internet; the chart itself blocks `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, and `100.64.0.0/10`. List the cluster API endpoint (and any pod, service, or node range outside those) under `egress.clusterCIDRs`. `egress.cmaServer` opens the path to your servers.
- Run-a-session names assume a new install; if the server values file has `earlierNames: true`, see the upgrade page's object-names section. By default the sandbox pod goes away about 5 minutes after the turn ends.
- TLS: the server speaks plain HTTP on port 8400 and requests carry the server API key. Before clients outside the cluster connect, put a TLS-terminating load balancer or ingress in front of the `cma-server` Service. It must pass paths unchanged; accept bodies up to 32 MiB; pass responses unbuffered; use a 2-minute default read timeout and a 10-minute read timeout for paths matching `^/cma-[a-z]+/git/`; send traffic only to ready servers (a balancer reaching pods directly must probe `/cma-server/readyz` and skip a pod returning `503`); never resend a `POST` a server already accepted; never cache a response.
- Other clusters: all of `eks`, `aks`, and `generic` need the upstream Agent Sandbox controller with its extensions and a NetworkPolicy-enforcing network plugin. Test the chart on AKS before agents do real work. The archive folder `kubernetes/chart/examples/` has a complete values file for each cluster kind. Other chart values: see comments in `kubernetes/server/chart/values.yaml` and `kubernetes/chart/values.yaml`.
- Volumes: the volume stays after the pod goes away so the next message finds its files. The `sandboxes` commands are for GKE; on other clusters use `sandboxclaims`. Deleting a session does not free its volume; archive first, and delete only after `kubectl -n cma get sandboxes -l anthropic.com/session-id=<session-id>` lists nothing.
- Freeing the volume of a session deleted without archiving: find the session ID in the dispatcher log with `kubectl -n cma logs deployment/cma-dispatcher --since=6m | grep "could not check the claim's session" | grep "403 Forbidden"` (written every 5 minutes; ID after `session_id`); confirm deletion with `ant --base-url http://127.0.0.1:8400 beta:sessions retrieve --session-id <session-id>` (proceed only on `404 Not Found` with `Session not found`); then `kubectl -n cma delete sandboxes -l anthropic.com/session-id=<session-id>`, which also deletes the session's files.
- Renewal: an environment key is valid 365 days and the dispatcher certificate 825 days. In a key's last 30 days the server logs a warning starting `environment key is within 30 days of expiry` on each request that uses it. Inspect expiry with `kubectl -n cma describe secret cma-environment`. Only `helm upgrade` of the server chart renews the chart's key (when it expires within 60 days); restart the dispatcher so it reads the new key. To renew the dispatcher certificate, repeat the `openssl` command and the two `kubectl` commands of the namespace-and-certificate step, then `kubectl -n cma rollout restart deployment/cma-dispatcher`.
- Charts renew only their own key. For a key you created (see call-the-api), a worker still using a revoked key gets a `401` and gives up its session. Find the old key's ID with `list-keys` using the same `-base-url`, `-env`, `-key-file` flags. The `mint-key` command prints the key on standard output and its ID and expiry on standard error.
- Uninstall: `helm uninstall` deletes the network policies that confine sandboxes, but sandboxes made for sessions keep running, so delete them first. The steps do not touch your database but delete the Secrets; keep your copy of the encryption key.

## Related

- [overview](./overview.md)
- [quickstart](./quickstart.md)
- [call-the-api](./call-the-api.md)
- [configuration-reference](./configuration-reference.md)
- [agent-identity](./agent-identity.md)
- [upgrade](./upgrade.md)
- [console](./console.md)
