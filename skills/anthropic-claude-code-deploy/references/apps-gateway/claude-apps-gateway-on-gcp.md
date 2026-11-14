<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-on-gcp.md / last verified: 2026-11-14 -->

# Deploy Claude apps gateway on Google Cloud

Worked example of Claude apps gateway on Google Cloud with Google Cloud's Agent Platform as the model upstream: Cloud Run or GKE, Cloud SQL for PostgreSQL, Secret Manager, and service-account auth. A working example for customer-managed infrastructure, not a supported production deployment.

## Signature / Usage

```bash
export PROJECT_ID=<your-project>
export REGION=us-east5   # a region where the Claude models you need are published in Model Garden
gcloud config set project "$PROJECT_ID"

gcloud services enable \
  aiplatform.googleapis.com \
  artifactregistry.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  iamcredentials.googleapis.com \
  iam.googleapis.com \
  compute.googleapis.com \
  servicenetworking.googleapis.com \
  run.googleapis.com \
  container.googleapis.com

gcloud iam service-accounts create claude-gateway --display-name="Claude apps gateway"
SA="claude-gateway@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SA}" --role="roles/aiplatform.user" --condition=None
```

Image build (Cloud Run requires `linux/amd64`; `--provenance=false` avoids a buildx OCI image index that Cloud Run rejects):

```bash
docker build --platform=linux/amd64 --provenance=false \
  -t "${REGION}-docker.pkg.dev/${PROJECT_ID}/claude-gateway/gateway:<version>" .
```

`gateway.yaml` (internal load balancer in front of Cloud Run; `oidc` shown for Google Workspace):

```yaml
listen:
  host: 0.0.0.0
  port: 8080
  public_url: https://claude-gateway.internal.example.com
  trusted_proxies: [169.254.0.0/16, <your-proxy-only-subnet-cidr>]

oidc:
  issuer: https://accounts.google.com
  client_id: <your-oauth-client-id>
  client_secret: ${OIDC_CLIENT_SECRET}           # GKE: ${file:/secrets/oidc-client-secret}
  allowed_email_domains: [example.com]
  # Google ignores offline_access; these yield refresh tokens:
  scopes: [openid, profile, email]
  extra_auth_params: { access_type: offline, prompt: consent }

session:
  jwt_secret: ${GATEWAY_JWT_SECRET}              # GKE: ${file:/secrets/jwt-secret}

store:
  postgres_url: ${GATEWAY_POSTGRES_URL}          # GKE: ${file:/secrets/postgres-url}

upstreams:
  - provider: vertex
    region: <your-region>                        # must match $REGION
    project_id: <your-project>
    auth: {}                                     # ADC via the runtime service account
```

Cloud Run deploy behind an internal load balancer:

```bash
gcloud run deploy claude-gateway \
  --image="${REGION}-docker.pkg.dev/${PROJECT_ID}/claude-gateway/gateway:<version>" \
  --region="$REGION" \
  --service-account="claude-gateway@${PROJECT_ID}.iam.gserviceaccount.com" \
  --min-instances=1 \
  --max-instances=8 \
  --timeout=3600 \
  --ingress=internal \
  --network="$VPC" --subnet=cc-gateway-subnet --vpc-egress=private-ranges-only \
  --set-secrets=/etc/claude/gateway.yaml=gateway-config:latest,GATEWAY_JWT_SECRET=gateway-jwt-secret:latest,OIDC_CLIENT_SECRET=gateway-oidc-client-secret:latest,GATEWAY_POSTGRES_URL=gateway-postgres-url:latest \
  --no-invoker-iam-check
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Cloud Run / GKE | compute | Runs the gateway container; Cloud Run requires `linux/amd64` and `min-instances: 1` to avoid cold OIDC discovery |
| Artifact Registry | image | Docker repository in `$REGION`; `gcloud auth configure-docker "${REGION}-docker.pkg.dev"` |
| Cloud SQL for PostgreSQL | store | `POSTGRES_16`, `db-g1-small`, private IP only via Private Services Access (`--no-assign-ip`, `--network`); satisfies `constraints/sql.restrictPublicIp` |
| Secret Manager | secrets | `gateway-jwt-secret`, `gateway-oidc-client-secret`, `gateway-postgres-url`, `gateway-config` (the full `gateway.yaml`); grant `roles/secretmanager.secretAccessor` to the `claude-gateway` service account |
| Service account (`roles/aiplatform.user`) | auth | Attached directly on Cloud Run or via Workload Identity on GKE; no Cloud SQL IAM role needed (password user over the VPC) |
| `--no-invoker-iam-check` / `--allow-unauthenticated` | Cloud Run flag | Required: the gateway runs its own OIDC, so Cloud Run's invoker IAM check must admit unauthenticated requests |
| `--ingress=internal` | Cloud Run flag | Separate layer from the invoker check; keep set to limit the service to your corporate network |
| `--network` / `--subnet` / `--vpc-egress=private-ranges-only` | Cloud Run flags | Direct VPC egress to reach the Cloud SQL private IP; public egress to Agent Platform endpoints and `accounts.google.com` goes direct, no Cloud NAT needed |
| `--timeout=3600` | Cloud Run flag | Raises the 300-second default request timeout so long streams aren't cut |
| `trusted_proxies` | `gateway.yaml` | Per front end: Cloud Run direct `[169.254.0.0/16]`; internal ALB in front of Cloud Run `169.254.0.0/16` plus the proxy-only subnet CIDR; GKE internal Ingress `gce-internal` the proxy-only subnet CIDR |

## Notes

- Prerequisites: a GCP project with billing; `gcloud` authenticated and Docker; for GKE `kubectl` and a cluster on the walkthrough's VPC; access to the Claude models in Model Garden in a region that publishes them (enable each model for the project; check each model card); a Google Workspace OAuth 2.0 web-application client with redirect URI `https://<gateway-host>/oauth/callback` (any OIDC IdP works, only the `oidc` block changes); a TLS hostname (typically an internal DNS name pointing at the load balancer).
- API sets by path: `compute` and `servicenetworking` for the private-IP Cloud SQL path; `run` Cloud Run only; `container` GKE only.
- The HTTPS front end is yours to provide: an internal Application Load Balancer in front of Cloud Run (this walkthrough configures the gateway for it but doesn't create it), or an internal GKE Ingress of class `gce-internal`. An external GKE Ingress of class `gce` provisions a public forwarding-rule address, which the `/login` private-network check rejects.
- Cloud SQL steps: create a custom-mode VPC (`cc-gateway-vpc`) and subnet (`cc-gateway-subnet`, `10.0.0.0/24`), allocate a `VPC_PEERING` address range (`--prefix-length=16`) and `gcloud services vpc-peerings connect` (one-time per VPC), then create instance, database `claude_gateway`, and user `gateway` with a generated password. The connection string uses `?sslmode=require`. The Cloud Run or GKE runtime must be on, or routed into, this VPC.
- Secrets reach the container differently: on GKE they mount as files via the Secret Manager CSI driver (`${file:/secrets/...}`); on Cloud Run, which can't mount multiple secrets into one directory, `gateway.yaml` mounts as a file and the other three inject as environment variables (`${GATEWAY_JWT_SECRET}`, `${OIDC_CLIENT_SECRET}`, `${GATEWAY_POSTGRES_URL}`).
- Google id_tokens carry no `groups` claim; configure `oidc.google_groups` (Admin SDK Directory API, service account with domain-wide delegation) to use group-based `managed.policies`; without it match on `email_domain`.
- Cloud Run connection pool: each instance holds up to `store.max_connections` Postgres connections (five by default); check `--max-instances=8` against the connections your database has left (see "Size the connection pool" in the deployment guide), including extra instances a rolling update starts.
- Invoker check: `--no-invoker-iam-check` disables the check with no `allUsers` binding to manage and works under Domain Restricted Sharing; `--allow-unauthenticated` grants `allUsers` the `run.invoker` role (use if your organization doesn't allow the former). The gateway's OIDC sign-in authenticates once the request reaches the container, with `allowed_email_domains` gating which domains may sign in.
- The default `*.run.app` URL resolves to a public address, which the `/login` private-network check rejects. Two topologies give developers a privately resolvable hostname (Cloud Run provisions neither): (1) an internal Application Load Balancer with an internal DNS name and certificate, with `listen.public_url` set to that hostname (`--ingress=internal` already admits internal ALB traffic; `internal-and-cloud-load-balancing` also admits external ALBs, whose public addresses fail the check, so no topology here needs it); (2) internal-only ingress with no load balancer, leaving `listen.public_url` as the `*.run.app` URL (the default in the reference assets), which needs your network team to already operate a Private Service Connect endpoint for Google APIs, a Cloud DNS private zone resolving `*.run.app` to it, and on-premises routing. Verify sign-in once serving on a private hostname; until then confirm the boot from the Cloud Run logs.
- Update the OAuth client's authorized redirect URI to `<public_url>/oauth/callback` before the first sign-in. Redeploy after changing `public_url`: the gateway builds its public origin only from that setting and ignores `X-Forwarded-Host` / `X-Forwarded-Proto`; `X-Forwarded-For` is honored for client IPs only when `listen.trusted_proxies` is set.
- GKE: the cluster must be on the walkthrough's `$VPC` (pass `--network="$VPC" --subnetwork=cc-gateway-subnet` to `gcloud container clusters create`); VPC peering alone doesn't work because Cloud SQL private IP is itself a peered network and peering is non-transitive. Enable Workload Identity (`gcloud container clusters update <cluster> --region="$REGION" --workload-pool="${PROJECT_ID}.svc.id.goog"`; on Standard clusters also `gcloud container node-pools update <pool> ... --workload-metadata=GKE_METADATA`, Autopilot has it by default), create namespace `claude-gateway` and service account `gateway`, bind `roles/iam.workloadIdentityUser` for `serviceAccount:${PROJECT_ID}.svc.id.goog[claude-gateway/gateway]`, and annotate the service account with `iam.gke.io/gcp-service-account`. Deployment uses `serviceAccountName: gateway`, the Secret Manager CSI driver mounting secrets at `/secrets`, and the readiness probe on `GET /readyz`, behind an internal Ingress of class `gce-internal`.
- GKE streaming: attach a BackendConfig with a raised `timeoutSec` to the gateway Service; the backend service behind GKE Ingress defaults to 30 seconds and cuts off long streams.
- GKE metadata server: don't apply an egress NetworkPolicy that blocks `169.254.169.254` on a Workload Identity cluster (the pod needs it for credentials; the gateway's SSRF guard is the defense). The gateway logs a boot warning that the metadata endpoint is reachable; under Workload Identity that is expected.
- Push the managed settings snippet (`forceLoginMethod`, `forceLoginGatewayUrl`, `parentSettingsBehavior: "merge"`) to each device via MDM; there is no gateway option in the login picker.
- Reference assets `examples/gateway/gcp` in the `anthropics/claude-code` repo: `setup.sh` (idempotent `gcloud` provisioner for the Cloud Run path), `terraform/` (greenfield: targeted apply for Artifact Registry, then build and push, then full apply), `gateway.yaml.example` and a `Dockerfile` for the distroless runtime image (config and image assets apply to both tracks). They default Cloud Run ingress to `internal` (works with or without an internal ALB, which they don't create) and default the invoker layer to an `allUsers` `run.invoker` grant rather than `--no-invoker-iam-check`, the inverse of this page's walkthrough; either works depending on your policy constraints.
- Troubleshooting (Google Cloud-specific): Cloud Run `403 Forbidden` before reaching the container (invoker IAM check still enabled); `--no-invoker-iam-check` rejected with `invoker_iam_disabled is not currently available` (blocked by `constraints/run.managed.requireInvokerIam`; use `--allow-unauthenticated`, and if Domain Restricted Sharing via `constraints/iam.allowedPolicyMemberDomains` blocks that too, use the GKE track, which needs no `allUsers` binding); `Container manifest type … must support amd64/linux` (non-amd64 host or buildx OCI index; build with `--platform=linux/amd64 --provenance=false`); Postgres connection-timeout at boot on Cloud Run (service not attached to the VPC, or Cloud SQL has no private IP on it); Agent Platform requests `403 PERMISSION_DENIED` (runtime isn't using the `claude-gateway` service account, or the model isn't enabled in Model Garden for the region); streaming cut off after a fixed duration (GKE Ingress backend 30 seconds, Cloud Run 300 seconds: BackendConfig `timeoutSec` or `--timeout=3600`).
- Source: https://code.claude.com/docs/en/claude-apps-gateway-on-gcp.md, fetched 2026-11-14

## Related

- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
- [claude-apps-gateway-config.md](./claude-apps-gateway-config.md)
- [claude-apps-gateway-on-aws.md](./claude-apps-gateway-on-aws.md)
