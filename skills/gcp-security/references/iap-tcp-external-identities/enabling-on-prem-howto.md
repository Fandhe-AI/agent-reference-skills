---
source: https://docs.cloud.google.com/iap/docs/enabling-on-prem-howto
---

# Enabling IAP for on-premises apps

Secure an HTTP or HTTPS on-premises app outside Google Cloud with IAP by deploying an IAP connector from the Google Cloud console.

## Signature / Usage

### Deploy a connector

Console flow: IAP page, **Connect new application**, **Connect via on-prem connector**, **Enable APIs and continue**; choose a Google-managed or self-managed certificate and the network and subnet; then for each app enter the external URL, an app name (also the name of a new backend service behind the load balancer), region, endpoint type (FQDN, or IP address with one or more zones such as `us-central1-a` and the internal IPv4 per zone), protocol, and port (for example 443 or 80); **Done**, then **Submit**. The deployment's routing rules take this form:

```yaml
   routing:
     - name: hr
       mapping:
        - name: host
          source: www.hr-domain.com
          destination: hr-internal.domain.com
```

### Manage a connector

Add apps with **Connect new application** again. Delete the whole deployment from Deployment Manager (select `on-prem-app-deployment`, **Delete**), or delete individual apps on the **Applications** tab.

## Options / Props

### Prerequisites

| Requirement | Detail |
|-------------|--------|
| App | HTTP or HTTPS based on-premises app |
| Principal | Cloud Identity member with the Owner role on the project; basic roles are highly permissive, avoid them in production |
| Service agent | Google APIs Service Agent granted the owner role |
| Project | Billing enabled |
| URL | External ingress URL, for example `hr.example.com` |
| Certificate | SSL/TLS certificate for the ingress hostname (self-managed or Google-managed; Let's Encrypt is suggested if you have none) |
| VPC Service Controls (if enabled) | VPC network with an egress policy on the `cp` action for the VM service account to the `gce-mesh` bucket in project `278958399328` (to fetch the Envoy binary); granted by default without VPC Service Controls |
| No external IP | Private Google Access on the connector subnet; firewall allowing VMs to reach Google APIs IPs |

## Notes

- Snippet taken from https://docs.cloud.google.com/iap/docs/cloud-iap-for-on-prem-apps-overview
- If the on-premises endpoint is an IP address, consider a hybrid connectivity network endpoint group directly with a load balancer instead of the connector.
- Google-managed certificates can take a few minutes to provision; check status on the Cloud Load Balancing detail page.
- A deployment must contain at least one app; to remove all apps, delete the whole deployment. Deleting the deployment is disruptive to every app behind it; try it on a disposable deployment first.
- The source shows Console steps only.
- Source: https://docs.cloud.google.com/iap/docs/enabling-on-prem-howto (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [cloud-iap-for-on-prem-apps-overview.md](./cloud-iap-for-on-prem-apps-overview.md)
