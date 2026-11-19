---
source: https://docs.cloud.google.com/knowledge-catalog/docs/data-domains-create
---

# Create data domains and manage domain access

Create data domains and subdomains with the console or the `projects.locations.dataDomains.create` REST method, then grant or revoke IAM roles on a domain. This feature is in Preview ("Pre-GA Offerings Terms"). Enable the Dataplex API first; creating domains and assigning owners requires `roles/dataplex.dataDomainAdmin` on the project.

## Signature / Usage

### Create a data domain

Request body, saved as `request.json`:

```json
{
  "display_name": "Finance Domain",
  "description": "Domain for finance datasets and reports.",
  "contacts": {
    "identities": [
      {
        "contact_name": "Alice Wonderland",
        "contact_role": "owner",
        "contact_id": "alice@example.com"
      }
    ]
  }
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/dataDomains?data_domain_id=DATA_DOMAIN_ID"
```

### Create a data subdomain

Same method; add `parent_data_domain` to the body (`SUBDOMAIN_ID` goes in `data_domain_id`):

```json
{
  "display_name": "Finance Subdomain",
  "description": "A subdomain within the Finance domain.",
  "contacts": {
    "identities": [
      {
        "contact_name": "Alice Wonderland",
        "contact_role": "owner",
        "contact_id": "alice@example.com"
      }
    ]
  },
  "parent_data_domain": "projects/PROJECT_ID/locations/LOCATION_ID/dataDomains/PARENT_DATA_DOMAIN_ID"
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/dataDomains?data_domain_id=SUBDOMAIN_ID"
```

### Grant or revoke access (REST)

Grant and revoke both read the policy, change `bindings`, and set the policy again.

Adapted (not in the official docs): the source sends `getIamPolicy` as `POST` with an empty body; the Dataplex v1 Discovery document defines it as `GET` with `options.requestedPolicyVersion`, which is requested as 3 here.

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/dataDomains/DOMAIN_ID:getIamPolicy?options.requestedPolicyVersion=3"
```

Adapted (not in the official docs): the body carries `version` and the `etag` from the `getIamPolicy` response, and `bindings` must be the complete policy returned by `getIamPolicy` with your change applied (the source body contains only the one binding and no `etag`, so `setIamPolicy` would replace the existing policy).

```json
{
  "policy": {
    "version": 3,
    "etag": "ETAG",
    "bindings": [
      {
        "role": "ROLE",
        "members": [
          "user:example-user@google.com",
          "group:finance-consumers@google.com"
        ]
      }
    ]
  }
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/dataDomains/DOMAIN_ID:setIamPolicy"
```

## Options / Props

### Limits

| Limit | Value |
|-------|-------|
| Maximum nesting depth for domains and subdomains | 5 levels |
| Direct subdomains under one data domain | 50 |
| Domains per project per region | 100 |
| Domains per organization per region | 1,000 |

### Data domain roles

| Role name | IAM role | Description |
|-----------|----------|-------------|
| Dataplex Data Domain Admin | `roles/dataplex.dataDomainAdmin` | Create and manage domains and subdomains with their bindings; manage all IAM roles and permissions for domains |
| Dataplex Data Domain Configuration Viewer | `roles/dataplex.dataDomainViewer` | View the domain configuration and resource-domain bindings |
| Dataplex Data Domain Configuration Editor | `roles/dataplex.dataDomainEditor` | Edit existing domains; create and manage resource-domain bindings and the metadata authorizations that allow users to discover domain resources |
| Dataplex Data Domain Entry Reader | `roles/dataplex.dataDomainEntryReader` | Discover and view the domain, its subdomains and the metadata of all included resources |

### Console fields

| Field | Notes |
|-------|-------|
| Display name | User-friendly name, for example `Finance` |
| Data Domain ID | Unique; cannot be changed after creation |
| Location | Region of the data domain (top-level domains) |
| Project ID | Project in which the domain is created |
| Owners | One or more owner email addresses |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/data-domains-create (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source revokes access with `POST .../dataDomains/DOMAIN_ID:getIamPolicy` and `-d ""`, and grants with a `setIamPolicy` body that has no `version` or `etag`. Both use the corrected forms above.
- The source request bodies use snake_case field names (`display_name`, `parent_data_domain`); the Discovery document lists them as camelCase (`displayName`, `parentDataDomain`). `contacts` is required. In Discovery the create method returns a long-running operation (the source says to expect a 2xx and an empty response).
- Domain roles propagate from parent domains to subdomains, not directly to included resources: granting `roles/dataplex.dataDomainEntryReader` on a domain does not add the role to a BigQuery dataset in it. The role lets you discover resources and use methods such as `lookupEntry` on resources located in the domain.
- If a principal's access is inherited from a higher-level IAM policy, you cannot delete or edit it at the domain level.
- It can take a few minutes before a new domain can be accessed or searched.
- The source also shows Console steps, PowerShell commands, and the revoke flow in the console.
- Try changes on a disposable domain first; `setIamPolicy` replaces the whole policy.

## Related

- [data-domains-overview.md](./data-domains-overview.md)
- [data-products-overview.md](./data-products-overview.md)
