---
source: https://docs.cloud.google.com/vpc-service-controls/docs/manage-service-perimeters
---

# Manage service perimeters

List, describe, update and delete VPC Service Controls service perimeters, add access levels, and limit what Google APIs networks inside a perimeter can reach with VPC accessible services or service patterns. Either set a default access policy for gcloud or pass `--policy`.

## Signature / Usage

### List and describe

```bash
gcloud access-context-manager perimeters list
```

```bash
gcloud access-context-manager perimeters \
  describe PERIMETER_ID
```

### Update a perimeter

```bash
gcloud access-context-manager perimeters update PERIMETER_ID \
  --add-resources=RESOURCES
```

```bash
gcloud access-context-manager perimeters update PERIMETER_ID \
  --add-restricted-services=SERVICES
```

Add an access level to an existing perimeter:

```bash
gcloud access-context-manager perimeters update PERIMETER_ID \
  --add-access-levels=LEVEL_NAME
```

### Delete a perimeter

```bash
gcloud access-context-manager perimeters delete PERIMETER_ID
```

### VPC accessible services

Enable and allow only selected services (here Logging and Cloud Storage plus the perimeter's protected services):

```bash
gcloud access-context-manager perimeters update example_perimeter \
  --enable-vpc-accessible-services \
  --add-vpc-allowed-services=\
RESTRICTED-SERVICES,logging.googleapis.com,storage.googleapis.com \
  --policy=11271009391
```

Add a service:

```bash
gcloud access-context-manager perimeters update example_perimeter \
  --add-vpc-allowed-services=RESTRICTED-SERVICES,pubsub.googleapis.com \
  --policy=11271009391
```

Remove a service:

```bash
gcloud access-context-manager perimeters update example_perimeter \
  --remove-vpc-allowed-services=storage.googleapis.com \
  --policy=11271009391
```

Disable VPC accessible services:

```bash
gcloud access-context-manager perimeters update example_perimeter \
  --no-enable-vpc-accessible-services \
  --clear-vpc-allowed-services \
  --policy=11271009391
```

### Service patterns (private VIP)

YAML file passed to `--vpc-accessible-services` (create) or `--set-vpc-accessible-services` (update):

```yaml
enableRestriction: true
servicePatternsEnforcementScopes:
- GOOGLE_APIS_VIA_PRIVATE_PATH
allowedServicePatterns:
- service: 'RESTRICTED-SERVICES'
- service: 'logging.googleapis.com'
- pattern: 'maps.googleapis.com/*'
- pattern: 'www.googleapis.com/drive/*'
```

Adapted (not in the official docs): `projects/PROJECT_ID` is written `projects/PROJECT_NUMBER` because `--resources` takes project numbers only.

```bash
gcloud access-context-manager perimeters \
  create PERIMETER_ID \
  --title="TITLE" \
  --resources="projects/PROJECT_NUMBER" \
  --restricted-services=SERVICES \
  --vpc-accessible-services=vpc_accessible_services.yaml \
  --policy=POLICY_ID
```

```bash
gcloud access-context-manager perimeters \
  update PERIMETER_ID \
  --set-vpc-accessible-services=vpc_accessible_services.yaml \
  --policy=POLICY_ID
```

Attach HTTP headers to requests for unsupported APIs with `modifiers`:

```yaml
enableRestriction: true
servicePatternsEnforcementScopes:
- GOOGLE_APIS_VIA_PRIVATE_PATH
allowedServicePatterns:
- pattern: 'appengine.googleapis.com/*'
  modifiers:
  - addRequestHeader:
      key: 'X-Goog-Allowed-Resources'
      value: 'YOUR_ORGANIZATION_RESTRICTIONS_HEADER'
```

Test service patterns in dry run mode, observe the audit logs for violations, then enforce.

Adapted (not in the official docs): `--perimeter-type="regular"` is added because gcloud 593.0.0 requires it together with `--perimeter-title`, and `projects/PROJECT_ID` is written `projects/PROJECT_NUMBER` because `--perimeter-resources` takes project numbers only.

```bash
gcloud access-context-manager perimeters dry-run \
  create PERIMETER_ID \
  --perimeter-title="TITLE" \
  --perimeter-type="regular" \
  --perimeter-resources="projects/PROJECT_NUMBER" \
  --perimeter-restricted-services=SERVICES \
  --perimeter-vpc-accessible-services=vpc_accessible_services.yaml \
  --policy=POLICY_ID
```

```bash
gcloud access-context-manager perimeters dry-run \
  enforce PERIMETER_ID \
  --policy=POLICY_ID
```

## Options / Props

### Placeholders

| Name | Description |
|---|---|
| `PERIMETER_ID` | ID of the service perimeter. |
| `RESOURCES` | Comma-separated project numbers or VPC networks: `projects/12345` or `//compute.googleapis.com/projects/my-project/global/networks/vpc1`. |
| `SERVICES` | Comma-separated services, for example `storage.googleapis.com,bigquery.googleapis.com`; for VPC accessible services, services networks inside the perimeter are allowed to access. Add `RESTRICTED-SERVICES` to include all services protected by the perimeter. |
| `LEVEL_NAME` | Access level to add. |
| `POLICY_ID` | ID of the access policy. |
| `TITLE` | Title of the service perimeter. |
| `PROJECT_NUMBER` | Number of the project to add to the perimeter; only project numbers are supported. |
| `YOUR_ORGANIZATION_RESTRICTIONS_HEADER` | Web-safe base64-encoded JSON string specifying the allowed Google Cloud organization IDs (see "Configure organization restrictions"). |

### Service patterns YAML fields

| Field | Description |
|---|---|
| `enableRestriction` | `true` enables limits on accessible services. |
| `servicePatternsEnforcementScopes` | `GOOGLE_APIS_VIA_PRIVATE_PATH` enforces patterns on Google APIs accessed through the private VIP. |
| `allowedServicePatterns` | Allowed services and URL patterns (Google API hostnames and URL path patterns matching the HTTP `Host` header). `service` is for supported services (also `RESTRICTED-SERVICES`); `pattern` is for unsupported URL patterns. |
| `modifiers[].addRequestHeader.key` | Header to add. Supported keys: `X-Goog-Allowed-Resources`, `X-GoogApps-Allowed-Domains`. |
| `modifiers[].addRequestHeader.value` | Header value. |

### Supported service pattern URL formats

| Pattern |
|---|
| `API_NAME.googleapis.com/*` |
| `www.googleapis.com/API_NAME/*` |
| `*.appspot.com/*` |
| `accounts.google.com/*` (only supports paths needed for OAuth authentication of service accounts; user account authentication is interactive and not supported) |
| `*.aiplatform-notebook.cloud.google.com/*` |
| `*.aiplatform-notebook.googleusercontent.com/*` |
| `appengine.google.com/*` |
| `*.backupdr.cloud.google.com/*` |
| `*.backupdr.googleusercontent.com/*` |
| `*.cloudfunctions.net/*` |
| `*.cloudproxy.app/*` |
| `*.composer.cloud.google.com/*` |
| `*.composer.googleusercontent.com/*` |
| `*.datafusion.cloud.google.com/*` |
| `*.datafusion.googleusercontent.com/*` |
| `*.dataproc.cloud.google.com/*` |
| `dataproc.cloud.google.com/*` |
| `*.dataproc.googleusercontent.com/*` |
| `dataproc.googleusercontent.com/*` |
| `*.developerconnect.dev/*` |
| `dl.google.com/*` |
| `gcr.io/*` or `*.gcr.io/*` |
| `*.gke.goog/*` |
| `gstatic.com/*` or `*.gstatic.com/*` |
| `*.kernels.googleusercontent.com/*` |
| `*.ltsapis.goog/*` |
| `*.notebooks.byoid.googleusercontent.com/*` |
| `*.notebooks.cloud.google.com/*` |
| `notebooks.cloud.google.com/*` |
| `*.notebooks.googleusercontent.com/*` |
| `packages.cloud.google.com/*` |
| `pkg.dev/*` or `*.pkg.dev/*` |
| `pki.goog/*` or `*.pki.goog/*` |
| `*.run.app/*` |
| `source.developers.google.com/*` |
| `storage.cloud.google.com/*` |

## Notes

- After you update a perimeter, changes can take up to 30 minutes to propagate; meanwhile the perimeter might block requests with `Error 403: Request is prohibited by organization's policy.` Updating resources, restricted services, access levels or VPC accessible services is disruptive and can block production traffic: test the change with the matching `perimeters dry-run update` flags and try it on a disposable perimeter first.
- Deleting a perimeter is disruptive: the security controls associated with it no longer apply to the member projects (there is no other impact on the projects or resources). Try it on a disposable perimeter first.
- Updatable aspects: add or remove projects, change restricted services, title and description, enable / add / remove / disable VPC accessible services, and update ingress and egress policies. Updating all perimeters at once is covered by the bulk operations page.
- VPC accessible services can be added to service perimeters but not to perimeter bridges. A service can be made accessible only if the perimeter also protects it. They require the restricted VIP; service patterns are designed for networks that use the private VIP (`private.googleapis.com`) or a Private Service Connect endpoint with the `all-apis` bundle.
- Console options for VPC accessible services: **All restricted services**, **Selected services**, **No services** (and **All services** to disable).
- Service pattern limitations: enforcement applies only to the private VIP path (`private.googleapis.com` or Private Service Connect `all-apis` endpoint); only `X-Goog-Allowed-Resources` and `X-GoogApps-Allowed-Domains` headers are supported; headers are inserted only for requests to unsupported services; modifiers and `addRequestHeader` do not insert headers in dry run mode; violation logs for unsupported APIs carry limited metadata; the violation analyzer does not support unsupported services (use the audit logs with the violation ID).
- Migrate from the restricted VIP to the private VIP with the same `perimeters update ... --set-vpc-accessible-services=vpc_accessible_services.yaml` command shown above (`servicePatternsEnforcementScopes` set to `GOOGLE_APIS_VIA_PRIVATE_PATH`), then point DNS, routing and firewall to `private.googleapis.com` or a Private Service Connect `all-apis` endpoint. Always update the perimeter configuration before switching to the private VIP so exfiltration paths remain blocked.
- `dry-run enforce` replaces the perimeter's enforced configuration with the dry run one and is disruptive; observe the dry-run audit logs for violations first and try it on a disposable perimeter.
- Corrected from the official docs: the service-pattern `create` and `dry-run create` examples use `projects/PROJECT_ID` ("The ID of the project to add to the perimeter"), and the `dry-run create` example has no `--perimeter-type`. The gcloud 593.0.0 help describes `--resources` / `--perimeter-resources` as projects "in the form projects/<projectnumber>" and its synopsis requires `--perimeter-type` with `--perimeter-title`.
- The `--add-vpc-allowed-services=\` line followed by an unindented continuation line in the VPC accessible services example is verbatim from the source; the shell joins the two lines.
- The source also shows Console steps and a section on using the Access Context Manager API `ServicePerimeterConfig` object (v1beta) for VPC accessible services; omitted here. The `perimeters list` and `perimeters describe` sample outputs (the describe output shows `etag`, `name`, `status` with `accessLevels`, `resources` and `restrictedServices`, and `title`) and the formatted list (`--format=list` for YAML or `--format=json`) are omitted.
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/manage-service-perimeters (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-service-perimeters.md](./create-service-perimeters.md)
- [dry-run-mode.md](./dry-run-mode.md)
- [configuring-ingress-egress-policies.md](./configuring-ingress-egress-policies.md)
- [set-up-private-connectivity.md](./set-up-private-connectivity.md)
