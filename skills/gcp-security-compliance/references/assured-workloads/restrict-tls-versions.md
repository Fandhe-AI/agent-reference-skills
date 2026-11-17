---
source: https://docs.cloud.google.com/docs/security/compliance/restrict-tls-versions
---

# Restrict TLS versions

Use the `gcp.restrictTLSVersion` organization policy constraint to deny requests to Google Cloud resources that use TLS 1.0 or 1.1. The constraint can be applied to organizations, folders or projects and uses a deny list; an allow list causes an error. To also block TLS 1.2, use a TLS cipher restriction policy that allows only TLS 1.3 ciphers (see the "Restrict TLS cipher suites" page in the official docs).

## Signature / Usage

### Set the organization policy

Requires the Organization Policy Administrator role (`roles/orgpolicy.policyAdmin`).

```bash
gcloud org-policies set-policy POLICY_PATH
```

`POLICY_PATH` is the full path to the policy file. `RESOURCE_TYPE` is `organizations`, `folders` or `projects`; `RESOURCE_ID` is the organization ID, folder ID, project ID or project number.

Adapted (not in the official docs): `deniedValues` is nested under `values`, as in the JSON example of the `gcloud org-policies set-policy` help and the Organization Policy API v2 schema (`PolicyRule.values` is a `StringValues` object holding `deniedValues`).

```yaml
name: RESOURCE_TYPE/RESOURCE_ID/policies/gcp.restrictTLSVersion
spec:
  rules:
  - values:
      deniedValues:
      - TLS_VERSION_1
      - TLS_VERSION_1_1
```

### Verify the effective policy

Replace `RESOURCE_TYPE` with `organization`, `folder` or `project` (so the flag becomes `--organization`, `--folder` or `--project`), and `RESOURCE_ID` with your organization ID, folder ID, project ID, or project number.

```bash
gcloud org-policies describe gcp.restrictTLSVersion --RESOURCE_TYPE=RESOURCE_ID --effective
```

### Test the policy

The constraint can be tested on any in-scope service. This `curl` example validates the restriction for a Cloud Storage bucket, with `GCS_BUCKET_NAME` set to `mybucketname` and `TLS_VERSION` set to `1.1`. There is no space between `--tlsv` and the version (for example `--tlsv1.1`).

```bash
  curl -X GET -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://storage.googleapis.com/storage/v1/b/mybucketname/o" \
  --tlsv1.1 --tls-max 1.1 --ciphers DEFAULT@SECLEVEL=0
```

If the organization policy restricts `TLS_VERSION_X`, any attempt to access resources with that version in the restricted project fails with an error that describes the reason:

```text
Request is disallowed by organization's constraints/gcp.restrictTLSVersion
constraint for 'projects/PROJECT_NUMBER' to use service
'SERVICE_NAME.googleapis.com' by violated TLS version `TLS_VERSION_X`
```

## Options / Props

### Constraint values

| Value | Meaning |
|---|---|
| `TLS_VERSION_1` | TLS 1.0 |
| `TLS_VERSION_1_1` | TLS 1.1 |

### Error output fields

| Field | Description |
|---|---|
| `PROJECT_NUMBER` | Project number hosting the resource referred to in the command. |
| `SERVICE_NAME` | The in-scope service blocked by the TLS restriction policy. |

### Services not covered by the constraint

| Service |
|---|
| Apigee |
| App Engine (`*.appspot.com`) |
| Cloud Run functions (`*.cloudfunctions.net`) |
| Cloud Run (`*.run.app`) |
| Private Service Connect |
| Custom domains |

## Notes

- Disruptive: denying TLS 1.0 / 1.1 blocks clients that still use them. Apply and test the policy on a disposable project first. Setting the policy with `gcloud org-policies set-policy` creates or updates the policy for that constraint on the resource from your file.
- The restriction applies to the specified resource and all its children through organization policy hierarchy evaluation; a child resource can override an inherited restriction with its own policy, and that policy then also applies to the child's own children.
- Eventual consistency: it may take up to tens of minutes for a change to be fully applied.
- Only TLS versions for Google Cloud fully qualified domain names can be restricted; for other FQDNs, such as a load balancer, use that product's guidance.
- If the policy denies either TLS 1.0 or 1.1, requests that use a 3DES-based cipher suite such as `TLS_RSA_WITH_3DES_EDE_CBC_SHA` are also denied, regardless of the request's TLS version.
- Supported: any Google Cloud resource API with a header signed by the Google Front End (GFE). The constraint is not enforced on public Cloud Storage objects, which are served directly from the GFE cache.
- For the unsupported services, restrict TLS with Cloud Load Balancing and SSL policies; the predefined `constraints/compute.requireSslPolicy` constraint plus custom constraints for SSL policies can enforce TLS version and cipher suite limits on load balancers (see the `gcp-load-balancing` skill).
- `curl` refuses TLS 1.0 / 1.1 by default (IETF RFC 8996); the test uses `--ciphers DEFAULT@SECLEVEL=0` (or an OpenSSL `MinProtocol` setting of 1.0 / 1.1) to allow them. Use this weakened setting only for this test.
- The bearer token comes from `gcloud auth print-access-token`; do not print it in shared terminals or CI logs.
- Corrected from the official docs: the source YAML reads `- values:` followed by `deniedValues:` at the same indent, which parses as an empty `values` and a sibling `deniedValues` key; the gcloud help JSON example (`"values": {"deniedValues": ["VALUE_A"]}`) and the orgpolicy v2 Discovery document place `deniedValues` inside `values`, so it is nested here. (The help's own YAML example has the same flat indentation as the source.)
- The source also shows a Console flow and a templated `curl` command (`--tlsvTLS_VERSION --tls-max TLS_VERSION`) that are omitted.
- Source inconsistency: the EU Data Boundary page lists the denied versions as `TLS_1_0` and `TLS_1_1`; this page uses `TLS_VERSION_1` and `TLS_VERSION_1_1`.
- Source: https://docs.cloud.google.com/docs/security/compliance/restrict-tls-versions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [eu-data-boundary.md](./eu-data-boundary.md)
- [control-packages.md](./control-packages.md)
