---
source: https://docs.cloud.google.com/secure-web-proxy/docs/quickstart
---

# Quickstart: Deploy a Secure Web Proxy instance

Deploy and test a Secure Web Proxy instance in explicit routing mode: create a policy, add rules, create the gateway, then test with `curl` from a Linux VM. Complete [initial-setup-steps.md](./initial-setup-steps.md) first.

## Signature / Usage

### 1. Create a policy

`policy.yaml`:

Adapted (not in the official docs): the policy is named `policy1` (the source writes `myswppolicy` here but the rule, gateway and clean-up steps refer to `policy1`, which would not exist).

```yaml
description: basic Secure Web Proxy policy
name: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1
```

```bash
gcloud network-security gateway-security-policies import policy1 \
    --source=policy.yaml \
    --location=REGION
```

To create a policy with TLS inspection, see the Enable TLS inspection guide ([tls-inspection-overview.md](./tls-inspection-overview.md)).

### 2. Create a rule

`rule.yaml` (replace `RULE_NAME`, such as `allow-wikipedia-org`):

```yaml
name: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1/rules/RULE_NAME
description: Allow wikipedia.org
enabled: true
priority: 1
basicProfile: ALLOW
sessionMatcher: host() == 'www.wikipedia.org'
```

```bash
gcloud network-security gateway-security-policies rules import allow-wikipedia-org \
    --source=rule.yaml \
    --location=REGION \
    --gateway-security-policy=policy1
```

### 3. Create the gateway

`gateway.yaml`:

```yaml
name: projects/PROJECT_ID/locations/REGION/gateways/myswp
type: SECURE_WEB_GATEWAY
addresses: ["IP_ADDRESS"]
ports: [443]
gatewaySecurityPolicy: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1
network: projects/PROJECT_ID/global/networks/NETWORK
subnetwork: projects/PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK
routingMode: EXPLICIT_ROUTING_MODE
```

Optional global access (only at creation time):

Adapted (not in the official docs): the gateway is named `myswp`, the name imported below and deleted in the clean-up (the source writes `swp1` here).

```yaml
name: projects/PROJECT_ID/locations/REGION/gateways/myswp
type: SECURE_WEB_GATEWAY
addresses: ["IP_ADDRESS"]
ports: [443]
gatewaySecurityPolicy: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1
network: projects/PROJECT_ID/global/networks/NETWORK
subnetwork: projects/PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK
routingMode: EXPLICIT_ROUTING_MODE
allowGlobalAccess: true
```

```bash
gcloud network-services gateways import myswp \
    --source=gateway.yaml \
    --location=REGION
```

### 4. Test connectivity

```bash
gcloud compute ssh swp-test-vm \
    --zone=ZONE
```

```bash
curl -s -o /dev/null -w "%{http_code}\\n" -x IP_ADDRESS:443 https://www.wikipedia.org
```

### Clean up (destructive)

Adapted (not in the official docs): the gateway created in step 3 is `myswp`, so it is deleted by that name (the source deletes `swp1`).

```bash
gcloud network-services gateways delete myswp \
    --location=REGION
```

Adapted (not in the official docs): `--region=REGION` is changed to `--regions=REGION` because `gcloud compute routers list` has no `--region` flag (gcloud 593.0.0 reports "unrecognized arguments: --region"; the flag is `--regions`).

```bash
gcloud compute routers list \
    --regions=REGION \
    --filter="name:(swg-autogen-router-*)" \
    --format="value(name)"
```

```bash
gcloud compute routers nats delete NAT_NAME \
    --router=ROUTER_NAME \
    --region=REGION
```

```bash
gcloud compute routers delete ROUTER_NAME \
    --region=REGION
```

```bash
gcloud network-security gateway-security-policies rules delete allow-wikipedia-org \
    --location=REGION \
    --gateway-security-policy=policy1
```

```bash
gcloud network-security gateway-security-policies delete policy1 \
    --location=REGION
```

## Options / Props

| Item | Value / behavior |
|------|------------------|
| `SessionMatcher` syntax | See [cel-matcher-language-reference.md](./cel-matcher-language-reference.md) |
| Rule priority | Numeric evaluation order; `0` is the highest priority |
| Rule status | Enabled (enforced) or Disabled (not enforced) |
| Frontend ports | Maximum of five; can't be changed after the gateway is created |
| `allowGlobalAccess` | Lets client applications from other Google Cloud regions connect; can be enabled only when the instance is created |
| IP address | Optional; if omitted, the instance picks one from the selected subnetwork |
| Required roles | Compute Network Admin (`roles/compute.networkAdmin`), Certificate Manager Editor (`roles/certificatemanager.editor`) |
| Test result | HTTP status `200` on success; `000` indicates a connection error (add `-v` for details) |

## Notes

- Deployment can take several minutes. Without TLS inspection, the rule in this quickstart can match only HTTP traffic at the application level.
- Creating an instance also creates a Cloud NAT gateway (typically `swg-autogen-nat`) and a Cloud Router (name typically starts with `swg-autogen-router-`) for internet access. Only Secure Web Proxy endpoints in that region and network can use that gateway; no other endpoint (VM, GKE node) can route through it.
- Deleting the instance also requires deleting its associated Cloud NAT gateway and Cloud Router. All delete commands here are destructive and can break connectivity; try them on a disposable project first (the source recommends a new project that you delete afterwards).
- The source creates a `default-allow-ssh` firewall rule with `--source-ranges=0.0.0.0/0` on `tcp:22` for the test VM; that block is omitted here. Prefer the IAP TCP forwarding range `35.235.240.0/20` if you need SSH to the test VM.
- The source also shows Console steps, project/VM creation (`swp-test-vm`, `debian-11`) and Cloud Shell setup. To improve security, configure VPC Service Controls for Secure Web Proxy.
- Corrected from the official docs: `gcloud compute routers list --region=REGION` was changed to `--regions=REGION`.
- Corrected from the official docs: the source creates the policy as `myswppolicy` but its rule and gateway steps refer to `policy1`, and it creates the gateway as `myswp` (global-access example `swp1`) but its clean-up deletes `swp1`. The policy is now `policy1` and the gateway `myswp` throughout, so each step refers to the resource the previous step created.
- The source's test VM uses the `debian-11` image family, which is an older image; choose a currently supported image family for new VMs.
- Source inconsistency: the quickstart tests an HTTPS request against a session matcher `host() == 'www.wikipedia.org'` without TLS inspection, while the configure rules page (https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules, retrieved 2026-11-17) says that for encrypted HTTPS without TLS inspection "host matching isn't possible either at the application level or at the session level". The CEL reference defines `host()` for HTTP CONNECT requests as the CONNECT target.
- Clarified from the official docs: the maximum of five frontend ports applies to gateways that list ports; the next hop deployment page (https://docs.cloud.google.com/secure-web-proxy/docs/deploy-next-hop, retrieved 2026-11-17) describes an `all_ports: true` option (ports `1` to `65535`, only with `NEXT_HOP_ROUTING_MODE`) that cannot be combined with a list of ports.
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/quickstart (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [initial-setup-steps.md](./initial-setup-steps.md)
- [configure-rules.md](./configure-rules.md)
- [deploy-next-hop.md](./deploy-next-hop.md)
- [tls-inspection-overview.md](./tls-inspection-overview.md)
