---
source: https://docs.cloud.google.com/iap/docs/cloud-iap-context-aware-access-howto
---

# Setting up context-aware access with Identity-Aware Proxy

Extend IAP access policies with Access Context Manager access levels (IP address and end-user device attributes) and the IAM Conditions framework (URL host, path, date and time). Examples from the source: grant all employees access from a trusted corporate device on the corporate network; grant the Remote Access group access from a trusted device with a secure password and up-to-date patch level from any network; grant the Privileged Access group access only if the URL path starts with `/admin`.

## Signature / Usage

### Conditional binding with gcloud (project level only)

Open the policy, edit it, and set it back. Conditional bindings need an IAM policy at version 3, and the `etag` returned by `get-iam-policy` must stay in the file so concurrent changes are detected.

```bash
gcloud iap web get-iam-policy --project=PROJECT_ID > policy.yaml
```

Adapted (not in the official docs): the source writes the `expression` as a quoted string followed by `in ...` on a continuation line, which is not valid YAML; it is written as one single-quoted scalar with the same expression, and the `...` elisions are replaced by the `etag` and `version: 3` fields that the edited file must keep.

```yaml
bindings:
- members:
  - group:EXAMPLE_GROUP@GOOGLE.COM
  - user:EXAMPLE_USER@GOOGLE.COM
  role: roles/iap.httpsResourceAccessor
  condition:
    expression: '"accessPolicies/ORGANIZATION_NUMBER/accessLevels/ACCESS_LEVEL_NAME" in request.auth.access_levels && request.path.startsWith("/")'
    title: CONDITION_TITLE
etag: ETAG_FROM_GET_IAM_POLICY
version: 3
```

```bash
gcloud iap web set-iam-policy --project=PROJECT_ID policy.yaml
```

### Conditional binding with the API

Export variables first.

```bash
export PROJECT_NUM=PROJECT_NUMBER
export IAP_BASE_URL=https://iap.googleapis.com/v1/projects/${PROJECT_NUM}/iap_web
# Replace POLICY_FILE.JSON with the name of JSON file to use for setIamPolicy
export JSON_NEW_POLICY=POLICY_FILE.JSON
```

#### App Engine

```bash
# The APP_ID is usually the project ID
export GAE_APP_ID=APP_ID
export GAE_BASE_URL=${IAP_BASE_URL}/appengine-${GAE_APP_ID}
```

Adapted (not in the official docs): the source sends the header `Authentication: Bearer ...` (the header is `Authorization`), has a stray `/` before `:getIamPolicy`, and posts an empty body; the body requests policy version 3 (`options.requestedPolicyVersion`, a field of the IAP `GetIamPolicyRequest`) and a JSON `Content-Type` is added. Shell variables in arguments are double-quoted.

```bash
curl -i -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 "${GAE_BASE_URL}:getIamPolicy" -d '{"options": {"requestedPolicyVersion": 3}}'
```

Edit the policy JSON file; each binding can have only one condition.

Adapted (not in the official docs): `version` and `etag` (from the `getIamPolicy` response) are added to the policy so conditional bindings are accepted and concurrent changes are detected.

```json
{
"policy": {
 "version": 3,
 "etag": "ETAG_FROM_GETIAMPOLICY",
 "bindings": [
   {
     "role": "roles/iap.httpsResourceAccessor",
     "members": [
       "group:EXAMPLE_GROUP@GOOGLE.COM",
       "user:EXAMPLE_USER@GOOGLE.COM"
     ],
     "condition": {
       "expression": "\"accessPolicies/ORGANIZATION_NUMBER/accessLevels/ACCESS_LEVEL_NAME\" in request.auth.access_levels && request.path.startsWith(\"/\")",
       "title": "CONDITION_NAME"
     }
   }
 ]
}
}
```

Adapted (not in the official docs): `Authorization` header and JSON `Content-Type` as above. Shell variables in arguments are double-quoted.

```bash
curl -i -H "Content-Type: application/json" \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 "${GAE_BASE_URL}:setIamPolicy" -d "@${JSON_NEW_POLICY}"
```

For a specific service version, export these additional variables:

```bash
export GAE_SERVICE=SERVICE_NAME
export GAE_VERSION=VERSION_NAME
```

Then update `GAE_BASE_URL` and get and set the policy as above:

```bash
export GAE_BASE_URL=${IAP_BASE_URL}/appengine-${GAE_APP_ID}/services/${GAE_SERVICE}/versions/${GAE_VERSION}
```

#### GKE and Compute Engine

```bash
export BACKEND_SERVICE_NAME=BACKEND_SERVICE_NAME
```

Adapted (not in the official docs): `Authorization` header, policy version 3 request body and JSON `Content-Type`. Shell variables in arguments are double-quoted.

```bash
curl -i -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 "${IAP_BASE_URL}/compute/services/${BACKEND_SERVICE_NAME}:getIamPolicy" \
 -d '{"options": {"requestedPolicyVersion": 3}}'
```

Use the same edited `policy.json` shape as in the App Engine example, then set it.

Adapted (not in the official docs): the source sends the header `Authentication: Bearer ...`; the header is `Authorization`. Shell variables in arguments are double-quoted.

```bash
curl -i -H "Content-Type:application/json" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "${IAP_BASE_URL}/compute/services/${BACKEND_SERVICE_NAME}:setIamPolicy" \
     -d "@${JSON_NEW_POLICY}"
```

## Options / Props

### Request attributes usable in conditions

| Attribute | Use |
|-----------|-----|
| Access levels | `request.auth.access_levels` |
| URL host / path | `request.host`, `request.path` |
| Date / time | Listed by the source as a request attribute; no expression is shown |

### Hostname normalization

| Rule | Example |
|------|---------|
| Trailing dots removed | —  |
| Lowercased | `FOO.com` becomes `foo.com` |
| Converted to ASCII; non-ASCII hostnames are punycoded (punycode your hostname string to match) | `café.fr` becomes `xn--caf-dma.fr` |

### Path normalization

| Rule | Example |
|------|---------|
| Path params removed (all characters from `;` to the next `/` or end of path) | `/internal;some_param/admin` becomes `/internal/admin`; `/bar;param1/baz;baz;param2` becomes `/bar/baz` |
| Relative paths resolved to absolute | `/a/../b` becomes `/b` |
| Paths with `..;` at the beginning of a section are invalid | `/..;bar/` and `/bar/..;/` return `HTTP 400: Bad Request` |

### Console roles to select access levels

| Role (any one) |
|----------------|
| Access Context Manager Admin |
| Access Context Manager Editor |
| Access Context Manager Reader |

## Notes

- Access levels: some attributes, such as device attributes, require a Chrome Enterprise Premium license. License validation only occurs when you configure access levels and does not affect runtime access. IAP associates an access level by its name.
- The use of scoped policies is not supported by IAP; access levels must be set in the organizational access policy.
- Request values compared to `request.host` and `request.path` in a conditional binding must be exact: restricting paths starting with `/internal admin` can be bypassed with `/internal%20admin`.
- IAP performs two policy checks when a path is not normalized: first on the non-normalized path (for `/internal;some_param/admin`, on `/internal`), then, if that passes, on the normalized path (`/internal/admin`). Access is granted only if both pass.
- Subdomain endings: `request.host.endsWith("google.com")` matches both `sub_domain.google.com` and `testgoogle.com`; use `request.host.endsWith(".google.com")` to limit to subdomains, which does not match `google.com` itself.
- With the gcloud tool you can only set project-level conditional bindings. The console flow (**Add principal**, IAP-secured Web App User role plus access-level conditions) is in the source and omitted here.
- Cloud Audit Logs: enabling Cloud Audit Logs for the IAP-secured project shows authorized and unauthorized requests. In Logs Explorer select the resource (IAP-secured HTTPS resources are under **App Engine Application** and **Compute Engine Backend Service**; SSH and TCP resources under **Compute Engine VM instance**) and log type **data_access**; the met access levels are under `protoPayload` > `requestMetadata` > `requestAttributes` > `auth` > `accessLevels`. All access levels the user met are shown, including ones not required, and an unauthorized request does not show which levels were not met.
- Access levels themselves are created with Access Context Manager (see the Access Context Manager pages in this skill).
- Corrected from the official docs: `curl -i -H "Authentication: Bearer $(gcloud auth print-access-token)"` (all four `curl` calls), the stray `/` in `${GAE_BASE_URL}/:getIamPolicy`, the empty body `-d ''` of both `getIamPolicy` calls, the invalid YAML `expression: "accessPolicies/..." in` / `request.auth.access_levels && ...` continuation with its `...` elisions, and the missing policy `version` / `etag` and JSON `Content-Type` were corrected as stated before each block. The IAP Discovery document requires version `3` for any operation that affects conditional role bindings and says to include the `etag` whenever you call `setIamPolicy` with IAM Conditions. The source's second `policy.json` example (GKE and Compute Engine) is identical to the App Engine one and is not repeated. The `gcloud iap web get-iam-policy` help has no flag to request policy version 3, so set `version: 3` in the file you edit and keep the `etag` it returned (the `gcloud iap web set-iam-policy` help: a file with an `etag` replaces the policy only if it still matches; a file without one replaces any existing policy).
- Adapted from the official docs: the `curl` examples expand `${GAE_BASE_URL}`, `${IAP_BASE_URL}`, `${BACKEND_SERVICE_NAME}` and `@${JSON_NEW_POLICY}` unquoted; they are double-quoted so that paths or values with spaces or glob characters are passed as one argument.
- Source: https://docs.cloud.google.com/iap/docs/cloud-iap-context-aware-access-howto (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-access.md](./managing-access.md)
- [concepts-overview.md](./concepts-overview.md)
