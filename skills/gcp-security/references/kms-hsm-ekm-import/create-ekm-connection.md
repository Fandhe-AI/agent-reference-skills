---
source: https://docs.cloud.google.com/kms/docs/create-ekm-connection
---

# Create an EKM connection

Set up Cloud EKM to reach your external key manager over a VPC network: prepare the VPC, create a Service Directory service endpoint, authorize the Cloud EKM service account, then create an EKM connection in the key project. The connection is used for protection level `EXTERNAL_VPC` keys, in Cloud KMS locations that support EKM over VPC.

## Signature / Usage

### Cloud EKM service account of the key project

```text
service-PROJECT_NUMBER@gcp-sa-ekms.iam.gserviceaccount.com
```

### Authorize Cloud EKM to access your VPC (per key project)

```bash
gcloud beta services identity create \
    --service=cloudkms.googleapis.com \
    --project=KEY_PROJECT_ID
```

```bash
gcloud projects add-iam-policy-binding VPC_PROJECT_ID \
    --member=serviceAccount:service-KEY_PROJECT_NUMBER@gcp-sa-ekms.iam.gserviceaccount.com \
    --role=roles/servicedirectory.viewer

gcloud projects add-iam-policy-binding VPC_PROJECT_ID \
    --member=serviceAccount:service-KEY_PROJECT_NUMBER@gcp-sa-ekms.iam.gserviceaccount.com \
    --role=roles/servicedirectory.pscAuthorizedService
```

### Create an EKM connection (manually managed keys)

```bash
gcloud beta kms ekm-connections create EKM_CONNECTION \
    --location LOCATION \
    --service-directory-service SERVICE_DIRECTORY_SERVICE \
    --hostname HOSTNAME \
    --server-certificates-files SERVER_CERTIFICATE_FILES \
    --key-management-mode manual
```

### Create an EKM connection (coordinated keys)

```bash
gcloud beta kms ekm-connections create EKM_CONNECTION \
    --location LOCATION \
    --service-directory-service SERVICE_DIRECTORY_SERVICE \
    --hostname HOSTNAME \
    --server-certificates-files SERVER_CERTIFICATE_FILES \
    --key-management-mode cloud-kms \
    --crypto-space-path CRYPTO_SPACE_PATH
```

### REST: create an EKM connection (coordinated keys)

Adapted (not in the official docs): added the required `ekmConnectionId` query parameter (the resource ID; `name` is output-only), the missing comma after `serviceResolvers`, and replaced the bare `SERVER_CERTIFICATES` placeholder with a `Certificate` object (`rawDer`, base64 DER) so the JSON is valid.

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/ekmConnections?ekmConnectionId=EKM_CONNECTION" \
    --request "POST" \
    --header "authorization: Bearer TOKEN" \
    --header "content-type: application/json" \
    --header "x-goog-user-project: PROJECT_ID" \
    --data '{
      "serviceResolvers": [
        {
          "serviceDirectoryService": "SERVICE_DIRECTORY_SERVICE",
          "hostname": "HOSTNAME",
          "serverCertificates": [
            {
              "rawDer": "BASE64_DER_CERTIFICATE"
            }
          ]
        }
      ],
      "keyManagementMode": "CLOUD_KMS",
      "cryptoSpacePath": "CRYPTO_SPACE_PATH"
    }'
```

### REST: create an EKM connection (manually managed keys)

Adapted (not in the official docs): same fixes as above (`ekmConnectionId` query parameter, no `name` in the body, `rawDer` certificate object).

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/ekmConnections?ekmConnectionId=EKM_CONNECTION" \
    --request "POST" \
    --header "authorization: Bearer TOKEN" \
    --header "content-type: application/json" \
    --header "x-goog-user-project: PROJECT_ID" \
    --data '{
      "serviceResolvers": [
        {
          "serviceDirectoryService": "SERVICE_DIRECTORY_SERVICE",
          "hostname": "HOSTNAME",
          "serverCertificates": [
            {
              "rawDer": "BASE64_DER_CERTIFICATE"
            }
          ]
        }
      ]
    }'
```

### Set an EKM connection as default

Adapted (not in the official docs): added the missing `\` line continuations.

```sh
gcloud kms ekm-config update \
  --location=LOCATION \
  --default-ekm-connection=projects/PROJECT_ID/locations/LOCATION/ekmConnections/DEFAULT_EKM_CONNECTION
```

Adapted (not in the official docs): added the required `updateMask=defaultEkmConnection` query parameter of `updateEkmConfig`.

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/ekmConfig?updateMask=defaultEkmConnection" \
    --request "PATCH" \
    --header "authorization: Bearer TOKEN" \
    --header "content-type: application/json" \
    --data '{"defaultEkmConnection": "projects/PROJECT_ID/locations/LOCATION/ekmConnections/DEFAULT_EKM_CONNECTION"}'
```

## Options / Props

### Terminology

| Term | Meaning |
|------|---------|
| EKM connection | Cloud KMS resource configuring the connection to your EKM (console: EKM via VPC connection) |
| VPC project | Project holding the VPC resource used to connect to the EKM |
| Key projects | Projects holding EKM connections and Cloud EKM keys; may equal the VPC project |
| Crypto space | Container for your resources in the EKM, identified by a crypto space path (for example `v0/cryptospaces/YOUR_UNIQUE_PATH`) |

### gcloud flags (`kms ekm-connections create`)

| Flag | Description |
|------|-------------|
| `--location` | Location of the connection; keys using it must be in the same location |
| `--service-directory-service` | Resource ID of the Service Directory service for the connection (same location as the connection) |
| `--hostname` | Hostname of your external key manager |
| `--server-certificates-files` | Comma-separated X.509 server certificate files; the source requires DER |
| `--key-management-mode` | `manual` (default) or `cloud-kms` |
| `--crypto-space-path` | Crypto space path from your EKM; required for `cloud-kms` |

### VPC prerequisites

| Item | Requirement |
|------|-------------|
| Private Google access | The EKM must verify the OIDC token in each request by retrieving the OAuth2 public key from `www.googleapis.com`; configure private Google access (or the on-premises hybrid variant) if it has no internet access |
| Firewall | Requests come from `35.199.192.0/19`; allow TCP ingress and egress on the EKM's listening port |
| Return route (hybrid) | On-premises network needs a route to `35.199.192.0/19`: static Cloud VPN, set a route with next hop the tunnel; policy-based VPN, include it in traffic selectors; dynamic routing or Cloud Interconnect, custom advertisement for it on the Cloud Router BGP session |
| Network mode | Auto mode VPC is fastest for non-production; use custom mode for on-premises hybrid connectivity |
| REST | `SERVER_CERTIFICATES`: up to 10 `Certificate` objects (leaf server certificates) |

### Certificate status

| Status | Meaning |
|--------|---------|
| Active | Valid, not near expiry |
| Expiring within 30 days | Valid, expires in the next 30 days |
| Expired | No longer valid; update it |
| Not valid yet | Start date is in the future |

## Notes

- Create a Service Directory service endpoint in the VPC project pointing at the EKM's private IP and port (the load balancer's if one fronts replicas); the `network` field must be populated. You must authorize Cloud EKM to access the VPC for each key project, even if it is the VPC project.
- EKM connections with the same name can exist in different locations, so always give the location. Only one EKM connection can be the default for a project and location; setting a new one replaces it.
- If your EKM supports EKM key management from Cloud KMS, create a crypto space, grant the Cloud KMS service account access to it, and set a Key Access Justifications policy in the EKM. Under partner-managed EKM these are done by your partner.
- The IAM bindings are project-level grants of `servicedirectory.viewer` and `servicedirectory.pscAuthorizedService` to the Cloud EKM service agent, as the source specifies; they apply to every Service Directory resource in the VPC project.
- The gcloud examples use `gcloud beta`; the GA `gcloud kms ekm-connections create` in gcloud 593.0.0 has the same flags. The help says `--server-certificates-files` takes PEM and assumes DER otherwise; the console requires DER. `gcloud beta services identity create` is only available on beta.
- Corrected from the official docs: the REST bodies omitted `ekmConnectionId`, had `"name": "EKM_CONNECTION"` (output-only), a missing comma after `]`, and a bare `SERVER_CERTIFICATES` placeholder; the default-connection gcloud example lacked `\`; the `EkmConfig.patch` curl call (`.../locations/LOCATION/ekmConfig"` with `--request "PATCH"`) omitted `updateMask`, which the Discovery document marks as required.
- The `Authorization: Bearer TOKEN` value is an access token; don't paste it into shared logs. Server certificate files are public certificates, not private keys.
- Migrating existing `EXTERNAL` keys to `EXTERNAL_VPC` (Preview) requires these setup steps first. The source also shows Console steps for creating, updating certificates and setting the default.
- Source: https://docs.cloud.google.com/kms/docs/create-ekm-connection (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- The `gcloud kms ekm-connections` full flag list is at https://docs.cloud.google.com/sdk/gcloud/reference/kms/ekm-connections/create.

## Related

- [ekm.md](./ekm.md)
- [ekm-architectures.md](./ekm-architectures.md)
