---
source: https://docs.cloud.google.com/iap/docs/concepts-overview
---

# Identity-Aware Proxy overview

Identity-Aware Proxy (IAP) is a Google Cloud global service that establishes a central authorization layer for applications accessed by HTTPS, so you can use an application-level access control model instead of network-level firewalls. IAP policies scale across the organization and can be defined centrally. IAP works with signed headers or the App Engine standard environment Users API to secure an app, and supports group-based application access.

## Signature / Usage

### Turn on IAP for a backend service (basic form)

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME --global --iap=enabled
```

### How a request is handled

- The serving infrastructure of Cloud Run, App Engine and Cloud Load Balancing (external and internal HTTP(S) load balancing) checks whether IAP is enabled for the app or backend service. If so, the project number, request URL and any IAP credentials in headers or cookies are sent to the IAP authentication server.
- If the user is not signed in, the browser is redirected to a supported sign-in method; afterwards a token is stored in a browser cookie.
- IAP takes the identity (email address and user ID) from valid credentials and checks the user's IAM role. A user with the **IAP-secured Web App User** role on the project where the resource exists is authorized.
- When IAP is enabled on a resource it automatically creates an OAuth 2.0 client ID and secret. If you delete the automatically generated OAuth 2.0 credentials, IAP won't function correctly (manage them under APIs & services in the console).

## Options / Props

### Sign-in methods

| Method | Who signs in |
|--------|--------------|
| Google Account | Google Cloud users with Google Accounts |
| Workforce Identity Federation | Users in an external identity provider (IdP) |
| Identity Platform | Customers using email and passwords or social sign-ins such as Facebook, Apple and Google (Gmail) |

### Ways to enable IAP on Cloud Run

| Option | Effect |
|--------|--------|
| Directly on the Cloud Run service | Protects all ingress paths, including the auto-assigned URL and any load balancer URL; suited to a single service |
| Through a load balancer with a Cloud Run backend | Suited to several services in different regions behind one global load balancer; the auto-assigned URL is not protected by IAP and might be directly accessible |

### Context-aware access targets

| Resource | Purpose |
|----------|---------|
| Google Cloud console and APIs | First layer of defense for infrastructure access; advanced context-aware access |
| Virtual machines | Administrative SSH/RDP access to VMs in Google Cloud and other clouds, restricted to designated administrators |
| Web applications | Authorization and authentication for web apps hosted in Google Cloud and other clouds; continuous authorization |

## Notes

- Your responsibilities: if IAP is enabled on a load balancer, verify whether backend resources can be accessed directly. For VM backends configure firewall rules against traffic that does not come through the load balancer; IAP does not protect against activity within a project, such as another VM. For Cloud Run backends, disable the `run.app` URL, or keep it and use ingress controls to block traffic from outside your network.
- On Compute Engine or GKE, users who can reach the application-serving port of the VM can bypass IAP authentication; firewall rules can't protect against code running on the same VM and protect against another VM only if configured properly.
- Update the app to use signed headers (or the App Engine standard Users API) so the application verifies the identity of each request.
- If a Cloud Run service runs behind a load balancer, don't enable IAP on both the load balancer and the Cloud Run service.
- Alternative to Workforce Identity Federation: sync external identities into Google Accounts with Google Cloud Directory Sync.
- Starting points listed by the source: IAP directly on Cloud Run, the App Engine quickstart, IAP for Compute Engine, IAP for GKE, IAP for on-premises apps.
- Related products: Cloud Run and App Engine service setup is in the `gcp-run` skill; load balancers are in the `gcp-load-balancing` skill; GKE is in `gcp-gke`; Workforce Identity Federation is in `gcp-foundation`.
- Snippet taken from https://docs.cloud.google.com/iap/docs/enabling-compute-howto (the concepts page has no code). The full flag list of `gcloud compute backend-services update` (https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services/update) is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/iap/docs/concepts-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [enabling-compute-howto.md](./enabling-compute-howto.md)
- [enabling-cloud-run.md](./enabling-cloud-run.md)
- [enabling-kubernetes-howto.md](./enabling-kubernetes-howto.md)
- [enabling-app-engine.md](./enabling-app-engine.md)
- [managing-access.md](./managing-access.md)
- [cloud-iap-context-aware-access-howto.md](./cloud-iap-context-aware-access-howto.md)
- [custom-oauth-configuration.md](./custom-oauth-configuration.md)
- [managed-oauth-client.md](./managed-oauth-client.md)
