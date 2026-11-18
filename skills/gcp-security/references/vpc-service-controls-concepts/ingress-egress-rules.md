---
source: https://docs.cloud.google.com/vpc-service-controls/docs/ingress-egress-rules
---

# Ingress and egress rules

Ingress and egress rules allow access to and from the resources and clients protected by service perimeters. Each rule has a `from` block (attributes of the API client) and a `to` block (attributes of Google Cloud services and resources). They can replace and simplify use cases that previously required perimeter bridges.

## Signature / Usage

Rules are configured with the Google Cloud console, a JSON file, or a YAML file. The YAML template below is pseudo-YAML: `*OR*` marks alternatives, and `|` separates enum values.

### Ingress rule

```text
- ingressFrom:
    identityType: ANY_IDENTITY | ANY_USER_ACCOUNT | ANY_SERVICE_ACCOUNT
    *OR*
    identities:
    - PRINCIPAL_IDENTIFIER
    sources:
    - resource: RESOURCE
      *OR*
    - accessLevel: ACCESS_LEVEL
      *OR*
    - pscEndpoint:
        forwardingRule: PSC_ENDPOINT
  ingressTo:
    operations:
    - serviceName: SERVICE
      methodSelectors:
      - method: METHOD
      *OR*
      - permission: PERMISSION
    *OR*
    roles:
    - ROLE_NAME
    resources:
    - projects/PROJECT
    *OR*
    - folders/FOLDER
    *OR*
    - organizations/ORGANIZATION
  title: TITLE
```

### Egress rule

```text
- egressTo:
    operations:
    - serviceName: SERVICE_NAME
      methodSelectors:
      - method: METHOD
      *OR*
      - permission: PERMISSION
    *OR*
    roles:
    - ROLE_NAME
    resources:
    - projects/PROJECT
    *OR*
    - folders/FOLDER
    *OR*
    - organizations/ORGANIZATION
    *OR*
    externalResources:
    - EXTERNAL_RESOURCE_PATH
  egressFrom:
    identityType: ANY_IDENTITY | ANY_USER_ACCOUNT | ANY_SERVICE_ACCOUNT
    *OR*
    identities:
    - PRINCIPAL_IDENTIFIER
    sources:
    - resource: RESOURCE
      *OR*
    - accessLevel: ACCESS_LEVEL
      *OR*
    - pscEndpoint:
        forwardingRule: PSC_ENDPOINT
    sourceRestriction: RESTRICTION_STATUS
  title: TITLE
```

### Policy model

- Ingress: any access by an API client outside the perimeter to resources within it. Egress: any access involving an API client or resources within the perimeter and resources outside it. The definitions refer to the direction of the request, not of data movement.
- A request from outside to a resource inside is allowed if the necessary ingress rule conditions are satisfied. A request from inside to a resource outside is allowed if the necessary egress rule conditions are satisfied.
- A call involving a resource inside and a resource outside is allowed if an ingress rule is satisfied by the client (if the client is outside) and an egress rule is satisfied by the external resource. Examples needing both: a client outside copying between an outside bucket and an inside bucket; a BigQuery job in a project outside the perimeter querying a dataset inside; a Compute Engine disk outside created with a Cloud KMS key inside (the egress rule goes in the perimeter that contains the Cloud KMS key project and must allow `compute.googleapis.com` and method `compute.v1.ImagesService.Insert`).
- With several perimeters involved, the policies of all involved perimeters must allow the request. For a client and bucket `a` in perimeter `A` and bucket `b` in perimeter `B`, copying both ways needs an egress rule in `A` for bucket `b`, an egress rule in `B` for bucket `a`, and an ingress rule in `B` for the client outside `B`.
- With multiple rules in a perimeter, a request is allowed if it satisfies any one rule. Ingress and egress rules are agnostic of request semantics and data movement direction.

### Dry-run workflow for choosing methods

Enable the perimeter in dry-run mode with no ingress or egress policies, collect the invoked methods from the audit log, and progressively add them to the dry-run ingress/egress policies until violations cease. Then move the configuration to enforced mode.

## Options / Props

### Ingress `from` / `to` fields

| Field | Required | Description |
|-------|----------|-------------|
| `ingressFrom` | Required | Starts the `from` block of allowed sources and identities outside the perimeter. |
| `identityType` | This or `identities` | `ANY_IDENTITY` (all identities, including unauthenticated requests), `ANY_USER_ACCOUNT` (all human users), `ANY_SERVICE_ACCOUNT` (all service accounts). The last two do not allow unauthenticated requests. Does not restrict by organization: `ANY_SERVICE_ACCOUNT` allows a service account from any organization. |
| `identities` | This or `identityType` | List of service accounts, user accounts, Google groups, third-party identities, Workload Identity Federation for GKE principals (Preview), and agent identities. |
| `sources` | Required | List of network origins: an access level, a Google Cloud resource (project, folder, organization, VPC network), or a Private Service Connect endpoint. `accessLevel: "*"` allows any network origin. A project, folder, or organization allows any resource under that hierarchy; a VPC network allows that network. |
| `sources[].resource` | This or `accessLevel` | `projects/PROJECT_NUMBER`, `folders/FOLDER_NUMBER`, `organizations/ORGANIZATION_NUMBER`, or `//compute.googleapis.com/projects/PROJECT_ID/global/networks/NETWORK_NAME`. |
| `sources[].accessLevel` | This or `resource` | Access level the access is granted to; `"*"` allows any network origin. |
| `sources[].pscEndpoint.forwardingRule` | This, `resource`, or `accessLevel` | `//compute.googleapis.com/projects/PROJECT_ID/global/forwardingRules/FORWARDING_RULE_ID`. |
| `ingressTo` | Required | Starts the `to` block of allowed service operations on resources inside the perimeter. |
| `operations` | This or `roles` | List of accessible services and methods. |
| `operations[].serviceName` | Required | Valid service name (for example `bigquery.googleapis.com`) or `"*"` for all services. |
| `methodSelectors` | Required if `serviceName` is not `"*"` | List of methods or permissions. |
| `methodSelectors[].method` | This or `permission` | Valid service method or `"*"` for all methods of the service. |
| `methodSelectors[].permission` | This or `method` | Valid service permission. If a request needs several permissions (for example `bigquery.jobs.create` and `bigquery.tables.create`), specify all under the same operation; the console creates separate operations if you add permissions repeatedly, so specify them all at once. |
| `roles` | This or `operations` | IAM roles defining the scope of access. Role name formats from the IAM role components page, except `projects/PROJECT_ID/roles/IDENTIFIER`. |
| `resources` | Required | Resources inside the perimeter that the client can access: `projects/PROJECT_NUMBER`, `folders/FOLDER_NUMBER`, `organizations/ORGANIZATION_NUMBER`, or `"*"` for any resource inside the perimeter. |
| `title` | Optional | Unique within the perimeter, at most 100 characters. Combined length of all rule titles within the access policy must not exceed 240,000 characters. |

### Egress-specific fields

| Field | Required | Description |
|-------|----------|-------------|
| `egressTo` | Required | Starts the `to` block of allowed operations on resources in projects outside the perimeter. `operations`, `serviceName`, `methodSelectors`, `method`, `permission`, `roles` work as in ingress rules. |
| `resources` | Optional list | Projects, folders, or organizations outside the perimeter (`projects/PROJECT_NUMBER`, `folders/FOLDER_NUMBER`, `organizations/ORGANIZATION_NUMBER`); `"*"` allows egress to any Google Cloud resource. |
| `externalResources` | Optional list | External resources used with BigQuery Omni or Lakehouse federated catalog endpoints. Only Amazon S3 `s3://BUCKET_NAME`, Azure Blob Storage (BigQuery Omni) `azure://STORAGE_ACCOUNT.blob.core.windows.net/CONTAINER_NAME`, and Azure Data Lake Storage Gen2 (Lakehouse federated catalog endpoints) `abfss://CONTAINER_NAME@STORAGE_ACCOUNT.dfs.core.windows.net`. The `azure://` and `abfss://` URIs are not interchangeable. |
| `egressFrom` | Required | Starts the `from` block of sources and identities inside the perimeter. `identityType` and `identities` work as in ingress rules. |
| `sources[].resource` | This or `accessLevel` | Projects, folders, or organizations from inside the perimeter allowed to access data outside. `"*"` is not allowed here. |
| `sources[].accessLevel` | This or `resource` | Access levels, from the same access policy as the perimeter, that permit inside resources to reach outside resources. `"*"` allows any network origin. |
| `sources[].pscEndpoint.forwardingRule` | This, `resource`, or `accessLevel` | Private Service Connect endpoint through which inside resources reach external resources; same format as ingress. |
| `sourceRestriction` | Required if `sources` is used | `SOURCE_RESTRICTION_ENABLED` enforces restrictions based on `sources`; `SOURCE_RESTRICTION_DISABLED` disables them. If unset, `sources` is ignored and no restrictions are enforced. |
| `title` | Optional | Same limits as for ingress rules. |

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/ingress-egress-rules (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- A functional ingress rule needs `sources` (an `accessLevel`, a `resource`, a `pscEndpoint`, or `accessLevel: "*"`), `identityType` or `identities`, `resources`, and `serviceName`.
- Evaluation: `sources` and `identityType` are evaluated as AND; `accessLevel`, `resource`, and `pscEndpoint` inside `sources` are evaluated as OR. When one of them is a specific value instead of `"*"`, both `sources` and `identityType` are evaluated. In egress rules the three source attributes are also OR.
- Permissive values: `ANY_IDENTITY`, `accessLevel: "*"`, `serviceName: "*"`, `method: "*"`, and `resources: "*"` allow broad access. They are valid as written in the source; use them only where that breadth is intended, and prefer specific identities, services, and methods validated through dry-run mode.
- Folders or organizations in sources also allow resources parented there that cannot be protected by perimeters. When a project is permanently deleted, its value might be removed from a rule without an error; check this when troubleshooting.
- VPC Service Controls allows access to a few Google-managed resources regardless of ingress or egress policies; for example, Container Registry can read the Google-managed `gcr.io/cloud-dataflow` repository.
- Unsupported features: identifying resources by labels instead of projects; per-method rules for services that do not support them (see the supported method restrictions page); `ANY_SERVICE_ACCOUNT` and `ANY_USER_ACCOUNT` cannot allow all Container Registry operations, all `notebooks.googleapis.com` operations, Cloud Storage operations using Signed URLs, deploying a Cloud Function from a local machine, exporting logs from a Cloud Logging sink to Cloud Storage, and all Apache Airflow web interface operations in Managed Airflow. Identity groups have their own limitations.
- Limits for rules are on the quotas page. Applying a rule policy to a perimeter replaces/updates its configuration and can block production traffic; test in dry-run mode first.
- The source also shows Console usage.

## Related

- [context-aware-access.md](./context-aware-access.md)
- [supported-identities.md](./supported-identities.md)
- [quotas.md](./quotas.md)
- [service-perimeters.md](./service-perimeters.md)
