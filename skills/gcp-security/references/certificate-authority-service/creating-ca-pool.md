---
source: https://docs.cloud.google.com/certificate-authority-service/docs/creating-ca-pool
---

# Create a CA pool

A CA pool is a collection of CAs with a common certificate issuance policy and IAM policy; it eases CA rotation and gives higher total effective QPS. You must create a CA pool before you can create a CA. Required role: CA Service Operation Manager (`roles/privateca.caManager`).

## Signature / Usage

### Create a CA pool (gcloud)

```bash
gcloud privateca pools create POOL_NAME --location=LOCATION
```

Choose the tier (default `enterprise`):

```bash
gcloud privateca pools create POOL_NAME --location=LOCATION --tier=TIER_NAME
```

Choose the publishing encoding format (default `PEM`):

```bash
gcloud privateca pools create POOL_NAME --location=LOCATION --publishing-encoding-format=PUBLISHING_ENCODING_FORMAT
```

### Add or update labels

```bash
gcloud privateca pools update POOL_ID --location=LOCATION --update-labels foo=bar
```

### Create a CA pool (REST)

Adapted (not in the official docs): the query parameter is written `?caPoolId=` (the name in the `privateca.v1` Discovery document) instead of the source's `\?ca_pool_id=`, whose backslash would be sent literally inside the quoted `curl` URL.

```text
POST https://privateca.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/caPools?caPoolId=POOL_ID
```

Request body (save as `request.json`):

```json
{
  "tier": "ENTERPRISE"
}
```

Adapted (not in the official docs): the same `?caPoolId=` change in the `curl` URL (the source has `caPools\?ca_pool_id=POOL_ID`).

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://privateca.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/caPools?caPoolId=POOL_ID"
```

The response is a long-running operation; poll it until `done` is `true`:

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://privateca.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/operations/operation-UUID"
```

### Create a CA pool (Python)

```python
import google.cloud.security.privateca_v1 as privateca_v1


def create_ca_pool(project_id: str, location: str, ca_pool_name: str) -> None:
    """
    Create a Certificate Authority pool. All certificates created under this CA pool will
    follow the same issuance policy, IAM policies,etc.,

    Args:
        project_id: project ID or project number of the Cloud project you want to use.
        location: location you want to use. For a list of locations, see: https://cloud.google.com/certificate-authority-service/docs/locations.
        ca_pool_name: a unique name for the ca pool.
    """

    caServiceClient = privateca_v1.CertificateAuthorityServiceClient()

    ca_pool = privateca_v1.CaPool(
        # Set the tier (see: https://cloud.google.com/certificate-authority-service/docs/tiers).
        tier=privateca_v1.CaPool.Tier.ENTERPRISE,
    )
    location_path = caServiceClient.common_location_path(project_id, location)

    # Create the pool request.
    request = privateca_v1.CreateCaPoolRequest(
        parent=location_path,
        ca_pool_id=ca_pool_name,
        ca_pool=ca_pool,
    )

    # Create the CA pool.
    operation = caServiceClient.create_ca_pool(request=request)

    print("Operation result:", operation.result())
```

## Options / Props

### Permanent settings (can't change after creation)

| Setting | Description |
|---|---|
| Location | A pool lives in one Google Cloud location; create it in or near the location where you use it. |
| Tier | `devops` or `enterprise`; affects whether certificates are persisted, whether they can be revoked, and the maximum issuance rate. |

### Optional settings

| Setting | Description |
|---|---|
| Certificate issuance policy | Restricts allowed key types, maximum lifetimes, SAN constraints and backdating (`backdate_duration`, `allow_requester_specified_not_before_time`). Can be updated after creation. |
| Publishing options | Publish each CA's certificate (URL goes in the AIA extension); custom AIA and CDP URLs possible. Enterprise tier CAs can publish CRLs to the Cloud Storage bucket (URL goes in the CDP extension). Encoding PEM (default) or DER. Enabled by default when created with the gcloud CLI or console. |
| CMEK | Cloud KMS key (symmetric, same region as the pool) set through `EncryptionSpec`; default is Google default encryption. |

### Fields encrypted with CMEK

| Category | Encrypted fields |
|---|---|
| PEM data | `pem_csr`, `pem_certificate`, `pem_certificate_chain` |
| Subject | `config.subject_config.subject`, `certificate_description.subject_description.subject` |
| Subject alt name | `config.subject_config.subject_alt_name`, `certificate_description.subject_description.subject_alt_name` |

### gcloud flags (gcloud 593.0.0)

| Flag | Description |
|---|---|
| `--location` | Location of the pool. |
| `--tier` | `devops` or `enterprise` (default `enterprise`). |
| `--publishing-encoding-format` | Encoding of published CA certificates and CRLs (default `pem`). |
| `--update-labels` | On `pools update`: add or update labels. |

## Notes

- CMEK considerations: certificate issuance consumes Cloud KMS quota in the project hosting the key (the source recommends a dedicated project for the CMEK); CMEK adds issuance latency, more so for Cloud EKM keys; if the key is inaccessible (disabled, destroyed or permissions revoked) issuance and operations that need decryption fail. The CA Service service agent needs a grant on the key.
- Destroying or disabling the CMEK key makes data encrypted with it inaccessible; try it on a disposable pool first.
- If you delete resources such as CA pools, CAs and certificate templates, you can't create a new resource of that type with the same name in the same project and location.
- The source also shows Console, Terraform, Go, Java, the PowerShell (Windows) forms of the REST requests, and the JSON operation responses; they are omitted here.
- Deleting a CA pool is irreversible (the name can't be reused, see the previous line) and is possible only after its CAs are permanently deleted ([request-certificates-gcloud.md](./request-certificates-gcloud.md)); try deletions on a disposable pool first.
- Source: https://docs.cloud.google.com/certificate-authority-service/docs/creating-ca-pool (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: `caPools\?ca_pool_id=POOL_ID` (in the HTTP method line and the `curl` URL) was changed to `caPools?caPoolId=POOL_ID`.

## Related

- [creating-root-ca.md](./creating-root-ca.md)
- [ca-service-concepts.md](./ca-service-concepts.md)
- [request-certificates-gcloud.md](./request-certificates-gcloud.md)
