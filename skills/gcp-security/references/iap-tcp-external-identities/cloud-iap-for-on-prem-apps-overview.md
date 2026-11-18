---
source: https://docs.cloud.google.com/iap/docs/cloud-iap-for-on-prem-apps-overview
---

# Overview of IAP for on-premises apps

IAP manages access to HTTP-based apps outside Google Cloud, including apps in on-premises data centers, by using the IAP On-Prem Connector.

## Signature / Usage

### Routing rules

Routing rules map authenticated, authorized web requests arriving at your DNS hostname ingress point to the destination hostname. Example `routing` parameters for the IAP connector Deployment Manager template:

```yaml
   routing:
     - name: hr
       mapping:
        - name: host
          source: www.hr-domain.com
          destination: hr-internal.domain.com
        - name: sub
          source: sheets.hr-domain.com
          destination: sheets.hr-internal.domain.com
     - name: finance
       mapping:
        - name: host
          source: www.finance-domain.com
          destination: finance-internal.domain.com
```

## Options / Props

### Resources created by the connector

| Resource | Role |
|----------|------|
| Cloud Service Mesh deployment | Proxy for the on-premises app |
| External Application Load Balancer | Ingress controller for requests |
| Routing rules | Map source to destination |

### Routing parameters

| Name | Description |
|------|-------------|
| `routing` name | Each name corresponds to a new, Ambassador-created Compute Engine backend service |
| `mapping` | List of Ambassador routing rules for a backend service |
| `source` | URL of requests coming to Google Cloud |
| `destination` | URL of the on-premises app IAP routes to after authentication and authorization |

### Example rules

| Compute Engine backend service | Routing rule name | Source | Destination |
|---|---|---|---|
| hr | hr-host | www.hr-domain.com | hr-internal.domain.com |
| hr | hr-sub | sheets.hr-domain.com | sheets.hr-internal.domain.com |
| finance | finance-host | www.finance-domain.com | finance-internal.domain.com |

## Notes

- The connector is deployed with a Cloud Deployment Manager template into an IAP-enabled project. One deployment can have multiple Cloud Service Mesh backend services behind one external Application Load Balancer; each maps to one on-premises app.
- After IAP is enabled on the connector backend service, access is secured with identity and context-aware IAM policies. The IAM policy sits on the backend service, so each on-premises app can have its own access list and a single project can manage access to many apps.
- Traffic flow: IAP authenticates and authorizes the request, routes it to the connector, which forwards it over a hybrid connectivity network endpoint group to the on-premises network.
- Source: https://docs.cloud.google.com/iap/docs/cloud-iap-for-on-prem-apps-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [enabling-on-prem-howto.md](./enabling-on-prem-howto.md)
