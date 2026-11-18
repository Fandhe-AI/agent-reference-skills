---
source: https://docs.cloud.google.com/vpc-service-controls/docs/context-aware-access
---

# Context-aware access with ingress rules

Context-aware access ingress rules allow access to resources based on client attributes such as network origin (IP address or VPC network), identity type (service account or user), identity, and device data. Access is defined by ingress rules.

## Signature / Usage

Both examples assume this perimeter, found by listing it with gcloud (the second example also uses an access level `TrustedDevices`; the first assumes an access level `CorpDatacenters`, a range of IPs of corporate data centers from which service accounts are allowed):

```text
name: accessPolicies/222/servicePerimeters/Example
status:
  resources:
  - projects/111
  restrictedServices:
  - bigquery.googleapis.com
  - storage.googleapis.com
  vpcAccessibleServices:
    enableRestriction: true
    allowedServices:
    - RESTRICTED_SERVICES
title: Example
```

### Human users to BigQuery from the internet; specific service accounts only from a specified IP range

Directional policy that allows all human users and a specific service account limited to a set of IPs (defined by an access level):

```bash
echo """
- ingressFrom:
    identities:
    - serviceAccount:my-sa@my-project.iam.gserviceaccount.com
    sources:
    - accessLevel: accessPolicies/222/accessLevels/CorpDatacenters
  ingressTo:
    operations:
    - serviceName: bigquery.googleapis.com
      methodSelectors:
      - method: \"*\"
    resources:
    - \"*\"
- ingressFrom:
    identityType: ANY_USER_ACCOUNT
    sources:
    - accessLevel: \"*\"
  ingressTo:
    operations:
    - serviceName: bigquery.googleapis.com
      methodSelectors:
      - method: \"*\"
    resources:
    - \"*\"
""" > ingress.yaml
```

Apply the ingress rules:

```bash
gcloud access-context-manager perimeters update Example --set-ingress-policies=ingress.yaml
```

### Employees query BigQuery from trusted devices; a service account privately loads data to Cloud Storage

Policy that allows humans to access BigQuery views from trusted devices (access level) and a specific service account to access Cloud Storage privately from an authorized VPC network:

```bash
echo """
- ingressFrom:
    identities:
    - serviceAccount:my-sa@my-project.iam.gserviceaccount.com
    sources:
    - resource: projects/111
  ingressTo:
    operations:
    - serviceName: storage.googleapis.com
      methodSelectors:
      - method: google.storage.Write
      - method: google.storage.objects.create
    resources:
    - \"*\"

- ingressFrom:
    identityType: ANY_SERVICE_ACCOUNT
    sources:
      - resource: //compute.googleapis.com/projects/my-network-project/global/networks/top-tier-vpc-network
  ingressTo:
    operations:
    - serviceName: storage.googleapis.com
      methodSelectors:
      - method: google.storage.Write
      - method: google.storage.objects.create
    resources:
    - \"*\"

- ingressFrom:
    identityType: ANY_USER_ACCOUNT
    sources:
    - accessLevel: accessPolicies/222/accessLevels/TrustedDevices
  ingressTo:
    operations:
    - serviceName: bigquery.googleapis.com
      methodSelectors:
      - permission: bigquery.tables.getData
    resources:
    - \"*\"
""" > ingress.yaml
```

Apply the ingress rules:

```bash
gcloud access-context-manager perimeters update Example --set-ingress-policies=ingress.yaml
```

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/context-aware-access (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Permissive: in the first example, the `ANY_USER_ACCOUNT` rule with `accessLevel: "*"`, `method: "*"`, and `resources: "*"` allows every human user account, from any network origin, to call all BigQuery methods on all resources in the perimeter. It is kept as written for the stated purpose only (human access from the internet); narrow it for production use.
- Permissive: in the second example, the `ANY_SERVICE_ACCOUNT` rule with `resources: "*"` allows any service account (the ingress rules reference notes this includes service accounts from any organization) whose request comes from `top-tier-vpc-network` to call `google.storage.Write` and `google.storage.objects.create` on all resources in the perimeter, and the `ANY_USER_ACCOUNT` rule allows every human user account that meets the `TrustedDevices` access level to use `bigquery.tables.getData` on all resources in the perimeter. They are kept as written for the stated purpose only; prefer specific identities and resources in production.
- `gcloud access-context-manager perimeters update` changes the enforced configuration (`status`) of the perimeter, and `--set-ingress-policies` replaces the perimeter's ingress policies with the file contents. This can block or open production traffic, so try it on a disposable perimeter first. The source recommends dry-run mode for testing; `gcloud access-context-manager perimeters dry-run update` accepts the same `--set-ingress-policies` flag for the dry-run configuration.
- The commands omit `--policy`; the positional `PERIMETER` needs an access policy via `--policy` or the `access_context_manager/policy` property. The examples assume policy `222`.
- The first example's `my-sa@my-project.iam.gserviceaccount.com`, projects, and network names are placeholders from the source.
- VPC network limitations when using VPC networks in service perimeters are described in the VPC network limitations section of the VPC networks management page.

## Related

- [ingress-egress-rules.md](./ingress-egress-rules.md)
- [supported-identities.md](./supported-identities.md)
- [access-level-design.md](./access-level-design.md)
