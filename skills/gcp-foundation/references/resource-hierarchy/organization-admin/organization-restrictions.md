---
source: https://docs.cloud.google.com/resource-manager/docs/organization-restrictions/overview
---

# Organization Restrictions

Restrict managed devices so outbound requests can only reach Google Cloud resources in authorized organizations, using an `X-Goog-Allowed-Resources` header inserted by an egress proxy. Prevents data exfiltration via phishing or insider attacks.

## Signature / Usage

Architecture: managed device > egress proxy (adds the header) > Google Cloud (inspects the header; allows or denies by the organization being accessed). Google Cloud administrators supply organization IDs; egress proxy administrators build and insert the header.

Header value (JSON, then web-safe base64):

```json
{
"resources": ["organizations/1234", "organizations/3456"],
"options": "strict"
}
```

Encode (RFC 4648 section 5):

```bash
$ cat authorized_orgs.json | basenc --base64url -w0
ewogInJlc291cmNlcyI6IFsib3JnYW5pemF0aW9ucy8xMjM0NTY3ODkiLCAib3JnYW5pemF0aW9ucy8xMDExMTIxMzE0Il0sCiAib3B0aW9ucyI6ICJzdHJpY3QiCn0K
```

(The official sample output is for a file naming `organizations/123456789` and `organizations/1011121314`, so it does not decode to the `1234` / `3456` JSON shown above.)

Get the organization ID (example output):

```bash
gcloud organizations list
```

```text
DISPLAY_NAME: Organization A
ID: 123456789
DIRECTORY_CUSTOMER_ID: a1b2c3d4
```

Header as sent:

```text
// Encoded representation
X-Goog-Allowed-Resources: ewogInJlc291cmNlcyI6IFsib3JnYW5pemF0aW9ucy8xMjM0NTY3ODkiLCAib3JnYW5pemF0aW9ucy8xMDExMTIxMzE0Il0sCiAib3B0aW9ucyI6ICJzdHJpY3QiCn0K

// Plain-text representation (As HTTP disallows some characters, encode the organization ID)
// Plain-text representation is included here only for readability
X-Goog-Allowed-Resources: {"resources": ["organizations/1234", "organizations/3456"], "options": "strict"}
```

Use cases (examples):

```json
{
"resources": ["organizations/123456789"],
 "options": "strict"
}
```

```json
{
"resources": ["organizations/123456789"],
 "options": "cloudStorageReadAllowed"
}
```

- Your organization only: `strict` with one organization ID.
- Your organization plus Cloud Storage reads: `cloudStorageReadAllowed`.
- Your organization plus a vendor organization: both IDs, `strict`.
- Uploads only: insert the header only for PUT, POST, and PATCH requests.

Test with curl before configuring the proxy:

```bash
$ OR_HEADER=`cat authorized_orgs.json | basenc --base64url -w0`
$ echo $OR_HEADER
```

```bash
# Get auth token
$ TOKEN=$(gcloud auth print-access-token)

# Make a request that includes the organization restriction header; this call makes a request to the logging API for a project within the same organization listed in the header
$ curl -H "X-Goog-Allowed-Resources: ${OR_HEADER}" -X POST -d '{"projectIds":
["my-project-123"]}' -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" "https://logging.googleapis.com/v2/entries:list"
# A successful request returns log entries in this project
```

Denied (project in an unauthorized organization):

```json
{
  "error": {
 "code": 403,
    "message": "Access denied by organization restriction. Contact your administrator for additional information.",
    "status": "PERMISSION_DENIED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "ORG_RESTRICTION_VIOLATION",
        "domain": "googleapis.com",
        "metadata": {
          "service": "logging.googleapis.com",
          "consumer": "other-project-123"
        }
      }
    ]
  }
}
```

Malformed header (HTTP 400):

```json
{
  "error": {
    "code": 400,
    "message": "Org Restriction Header is not valid. Please pass a valid Org Restriction Header.",
    "status": "INVALID_ARGUMENT",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "ORG_RESTRICTION_HEADER_INVALID",
        "domain": "googleapis.com",
        "metadata": {
          "service": "abc.googleapis.com"
        }
      }
    ]
  }
}
```

## Options / Props

| `options` value | Behavior |
|-----------------|----------|
| `"strict"` | Enforce the header for all request types to supported services |
| `"cloudStorageReadAllowed"` | Allow Cloud Storage reads (`storage.objects.get`, `storage.objects.list`, `storage.objects.getIamPolicy`, `storage.buckets.get`, `storage.buckets.list`, `storage.buckets.getIamPolicy`); enforce for everything else. Useful so employees can still browse external sites whose static content is in public buckets |

Egress proxy requirements: insert headers; TLS inspection (decrypt, insert, re-encrypt); optional filters on target URLs, device IDs, user IDs. Only add the header for these targets: `*.google.com`, `*.googleapis.com`, `*.gcr.io`, `*.pkg.dev`, `*.cloudfunctions.net`, `*.run.app`, `*.tunnel.cloudproxy.app`, `*.datafusion.googleusercontent.com`.

Supported services (requests from the console, APIs, client libraries) include, among many others: `accessapproval`, `alloydb`, `analyticshub`, `apigateway`, `apikeys`, `apigee`, `appengine`, `artifactregistry`, `assuredworkloads`, `backupdr`, `batch`, `biglake`, `bigquery*`, `binaryauthorization`, `certificatemanager`, `privateca`, `cloudasset`, `bigtable`, `cloudbuild`, `composer`, `datafusion`, `dlp`, `dataplex`, `dataproc`, `datastore`, `dns`, `file`, `firestore`, `cloudfunctions`, `healthcare`, `iap`, `cloudkms`, `logging`, `monitoring`, `pubsub` (all `*.googleapis.com`); the official page has the complete list.

## Notes

- Add Google-owned organization `organizations/433637338589` to the list so users keep access to Google-owned public resources (for example public OS images, tenant projects such as Cloud Workstations). Add it to Vault administrators' headers too so they can download exports from Google-owned Cloud Storage buckets; restrict that ID to Vault admins' requests only.
- Multi-resource requests are denied if any resource is outside the authorized list.
- The egress proxy must override any user-supplied header with the administrator-provided value.
- Known limitation: if the organization restrictions header service fails internally, requests presenting the header bypass enforcement until the failure is resolved (fail-open).
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-restrictions/overview
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-restrictions/configure-organization-restrictions
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-restrictions/examples-org-restrictions
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-restrictions/test-org-restrictions
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-restrictions/error-messages
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-restrictions/additional-considerations
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-restrictions/known-limitations
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-restrictions/supported-services
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0. Distinct from VPC Service Controls (gcp-security).

## Related

- [organization-resource.md](./organization-resource.md)
- [../organization-policy/domain-restricted-sharing.md](../organization-policy/domain-restricted-sharing.md)
