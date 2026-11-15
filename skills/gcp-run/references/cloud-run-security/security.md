---
source: https://docs.cloud.google.com/run/docs/securing/security
---

# Cloud Run security design overview

How Cloud Run applies security best practices across services, jobs, worker pools, and instances: architecture, compute sandboxing, data encryption, network (ingress and egress) controls, access control, AI agent security, and supply chain security.

## Signature / Usage

### Restrict ingress for a service (borrowed snippet)

The page itself has no code block; this is the ingress command from the linked ingress page. `INGRESS` is one of `all`, `internal`, `internal-and-cloud-load-balancing`.

```bash
gcloud run services update SERVICE \
    --ingress INGRESS
```

### Execution environments

- First generation: based on gVisor; small codebase and smaller attack surface; hardened with seccomp system call filtering.
- Second generation: based on Linux microVMs; more compatibility and performance for custom workloads; hardened with seccomp and Sandbox2 Linux namespaces.
- Services support both. Jobs, worker pools, and instances run on the second generation environment.
- If your service uses third-party infrastructure to secure containers, select the second generation environment.

### Egress controls

- Egress is layer 4 (TCP and UDP). Paths: VPC network via Direct VPC egress or a Serverless VPC Access connector, or directly to Google's network or the public internet (regional pool of dynamic shared IP addresses).
- Use the VPC egress setting (`--vpc-egress`) to route all outbound traffic to your VPC; then use firewall rules, VPC Flow Logs, and Cloud NAT with dedicated static IP addresses.
- Organization policy: `constraints/run.allowedVPCEgress` (Allowed VPC egress settings).
- Do not use the default shared IP pool for reputation-sensitive endpoints (payment gateways, hosted databases, partner APIs behind WAFs). Route with `--vpc-egress=all-traffic` and Cloud NAT static IPs.
- Do not run network scanning, port enumeration, host fingerprinting, vulnerability probing, web scraping, or load testing over the default shared internet egress path (Google Cloud Acceptable Use Policy; workload may be throttled or suspended). For authorized scanning or load testing, use Direct VPC egress with `--vpc-egress=all-traffic` and your own static outbound IPs through Cloud NAT.

### Ingress controls

- Services and instances accept layer 7 HTTPS through the `run.app` URL, custom domains, or Cloud Load Balancing.
- Worker pools have no `run.app` URL or layer 7 ingress controls; with Direct VPC they receive layer 4 traffic from the VPC subject to firewall rules. Serverless VPC Access connectors don't support ingress; Direct VPC private IPs don't persist across stop, restart, or update.
- Jobs run to completion and don't accept inbound requests.
- Organization policy: `constraints/run.allowedIngress`.

### Who can invoke

- Services: `run.routes.invoke`; instances: `run.instances.invoke`; both via Cloud Run Invoker (`roles/run.invoker`). Requests must carry an `Authorization` header with an OpenID Connect ID token or OAuth 2.0 access token signed by Google for an authorized principal (one that holds the invoker permission). IAM Conditions can narrow the binding.
- Jobs: `run.jobs.run` and `run.jobs.runWithOverrides`. A triggering service such as Cloud Scheduler or Workflows needs `run.jobs.run` on the job.
- Organization admins can enforce `constraints/iam.allowedPolicyMemberDomains` (Domain restricted sharing) and `constraints/run.requireInvokerIam` (or legacy `constraints/run.managed.requireInvokerIam`), which prevents disabling the Invoker IAM check.

## Options / Props

| Topic | Fact from the source |
|---|---|
| Instance isolation | Each instance is sandboxed by a VMM-enforced boundary; container boundary is weaker than the instance boundary |
| Sandboxing layers | Two layers: hardware-backed (x86 virtualization) and a software kernel layer, in both execution environments |
| Cloud Run sandboxes (Preview) | Run in the same instance, share CPU and memory; read-only root file system; no access to parent env vars, mounted secrets, or metadata server credentials; outbound egress blocked by default |
| State | Instances are stateless; file systems are in-memory; worker pools also support ephemeral disks (Preview) |
| Persistent data | Cloud SQL, Memorystore, Cloud Storage or NFS (Filestore) volume mounts; Secret Manager for secrets |
| Image encryption | Customer-managed encryption keys (CMEK), including Cloud KMS Autokey |
| Default identity | Compute Engine default service account; configure a dedicated service identity for production and sensitive workloads |
| Agent Identity (Preview) | `--identity-type=agent-identity`; agents use `--functional-type=agent` or `--functional-type=mcp-server` (flags of `gcloud beta run deploy`; not in GA `gcloud run deploy`) |
| Ingress "internal" sources | Same-project VPC networks or VPC Service Controls perimeter, attached Shared VPC, some Google services (for example BigQuery), on-premises via VPC |
| Behind an external load balancer | Use "internal + load balancing" instead of "internal" |
| Network tags (Direct VPC egress) | Usable in egress firewall rules; cannot define the target of an ingress firewall rule |
| Base image patches | Buildpacks base images patched weekly; critical vulnerabilities within hours |
| Automatic base image updates | Services deployed from source with buildpacks; jobs and worker pools must be redeployed |
| Binary Authorization | Built in for services, jobs, worker pools, and instances |

## Notes

- Makes the service publicly accessible when `--no-invoker-iam-check` (Allow public access) is chosen; use only for intentionally public content. The page describes this option and the IAM-authenticated alternative (`roles/run.invoker` for specific principals).
- Source inconsistency: this page calls `constraints/run.managed.requireInvokerIam` legacy, while the public-access pages call it the managed constraint and `constraints/run.requireInvokerIam` an extra invitation-only constraint. Both are kept verbatim.
- For production and sensitive workloads, configure a dedicated service identity (user-managed service account) with minimum permissions instead of the Compute Engine default service account.
- Distance: Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`).
- The Agent Identity flags `--identity-type` and `--functional-type` are available only in `gcloud beta run deploy` (and alpha) in gcloud 593.0.0; GA `gcloud run deploy` rejects them as unrecognized arguments. The source does not name the release track.
- Source inconsistency: this page equates the Console **Allow public access** option with disabling the Invoker IAM check (`--no-invoker-iam-check`); https://docs.cloud.google.com/run/docs/authenticating/public lists the Console **Allow public access** choice under that method and also under the "grant `roles/run.invoker` to `allUsers`" method. To make a service private again, re-enable the check and remove any `allUsers` binding (see the cloud-run-auth `public.md` page).
- Source: https://docs.cloud.google.com/run/docs/securing/security (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/authenticating/public (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/run/docs/securing/ingress

## Related

- [ingress.md](./ingress.md)
- [service-identity.md](./service-identity.md)
- [secrets.md](./secrets.md)
