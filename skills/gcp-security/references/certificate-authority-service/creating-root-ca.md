---
source: https://docs.cloud.google.com/certificate-authority-service/docs/creating-root-ca
---

# Create a root CA

A root CA is the top of a PKI hierarchy and the trust anchor; its self-signed certificate must be distributed to your clients' trust stores. Create it in an existing or new CA pool. Required role: CA Service Operation Manager (`roles/privateca.caManager`) or CA Service Admin (`roles/privateca.admin`). A new CA is `STAGED` by default and must be enabled.

## Signature / Usage

### Create a root CA (gcloud)

```bash
gcloud privateca roots create ROOT_CA_ID \
    --location=LOCATION \
    --pool=POOL_ID \
    --key-algorithm=KEY_ALGORITHM \
    --subject="CN=my-ca, O=Test LLC"
```

With a customer-managed signing key:

```bash
gcloud privateca roots create ROOT_CA_ID \
    --location=LOCATION \
    --pool=POOL_ID \
    --kms-key-version=KMS_KEY_VERSION \
    --subject="CN=my-ca, O=Test LLC"
```

### Create a root CA (REST)

Adapted (not in the official docs): the source's `?certificate_authority_id=` query parameter is written `?certificateAuthorityId=`, the name in the `privateca.v1` Discovery document.

```text
POST https://privateca.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/caPools/POOL_ID/certificateAuthorities?certificateAuthorityId=ROOT_CA_ID
```

Adapted (not in the official docs): the body uses the Discovery field names (`subjectConfig`, `x509Config`, `caOptions`, `isCa`, `keySpec`, ...) and `lifetime` as a duration string (`"315576000s"`) instead of the source's snake_case names and `{"seconds": ..., "nanos": 0}` object, to match the `privateca.v1` Discovery document.

```json
{
  "type": "SELF_SIGNED",
  "lifetime": "315576000s",
  "config": {
    "subjectConfig": {
      "subject": {
        "organization": "ORGANIZATION_NAME",
        "commonName": "COMMON_NAME"
      }
    },
    "x509Config": {
      "caOptions": {
        "isCa": true
      },
      "keyUsage": {
        "baseKeyUsage": {
          "certSign": true,
          "crlSign": true
        }
      }
    }
  },
  "keySpec": {
    "algorithm": "RSA_PKCS1_4096_SHA256"
  }
}
```

Adapted (not in the official docs): the source's `?certificate_authority_id=` query parameter is written `?certificateAuthorityId=`, the name in the `privateca.v1` Discovery document.

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://privateca.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/caPools/POOL_ID/certificateAuthorities?certificateAuthorityId=ROOT_CA_ID"
```

Poll the returned operation until `done` is `true`:

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://privateca.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/operations/operation-UUID"
```

### Enable a root CA

```bash
gcloud privateca roots enable ROOT_CA_ID --location=LOCATION --pool=POOL_ID
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d "" \
     "https://privateca.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/caPools/POOL_ID/certificateAuthorities/ROOT_CA_ID:enable"
```

### Test a CA in the STAGED state

Request a certificate from the pool and name the CA with `--ca`:

```bash
gcloud privateca certificates create \
    --issuer-pool=POOL_ID \
    --issuer-location=ISSUER_LOCATION \
    --ca=ROOT_CA_ID \
    --generate-key \
    --key-output-file=KEY_FILENAME \
    --cert-output-file=CERT_FILENAME \
    --dns-san=DNS_NAME
```

### Clone a CA

```bash
gcloud privateca roots create NEW_CA_ID \
    --location=LOCATION \
    --pool=POOL_ID \
    --from-ca=EXISTING_CA_ID \
    --key-algorithm "ec-p384-sha384"
```

## Options / Props

### gcloud flags (gcloud 593.0.0)

| Flag | Description |
|---|---|
| `--key-algorithm` | Algorithm of the Cloud KMS key CA Service creates. Optional; default `rsa-pkcs1-4096-sha256`. One of `ec-p256-sha256`, `ec-p384-sha384`, `rsa-pkcs1-2048-sha256`, `rsa-pkcs1-3072-sha256`, `rsa-pkcs1-4096-sha256`, `rsa-pss-2048-sha256`, `rsa-pss-3072-sha256`, `rsa-pss-4096-sha256`. |
| `--kms-key-version` | Full resource ID of a customer-managed Cloud KMS key version used as the signing key. |
| `--auto-enable` | Create the CA enabled instead of `STAGED`. |
| `--bucket` | Customer-managed Cloud Storage bucket for CA certificates and CRLs. |
| `--custom-aia-urls`, `--custom-cdp-urls` | Custom AIA and CDP URLs, included in all issued certificates and superseding the default bucket URLs. |
| `--from-ca` | Copy configuration from an existing CA in the same pool (root and subordinate creation). Does not copy the Cloud KMS key version or bucket; other flags override. |
| `--validity` | CA validity; default `P10Y`. |

### Default algorithm when cloning without `--key-algorithm`

| CA type | Default |
|---|---|
| Root CA | `rsa-pkcs1-4096-sha256` |
| Subordinate CA | `rsa-pkcs1-2048-sha256` |

## Notes

- Before you begin: if you use an existing Cloud KMS key, grant the needed IAM roles on that key to the CA Service Agent; create a CA pool first.
- A root CA has a self-signed certificate; no other CA can revoke it, and its CRL applies only to certificates it issued.
- Recommendation from the source: test the CA while it is `STAGED`. `STAGED` CAs can't issue through pool load-balancing, so request certificates from them directly with `--ca`. Enable the CA only after verifying it.
- Caution from the source: don't issue end-entity certificates from a root CA; create subordinate CAs for that. The source words the risk as "Any certificate signed by the private key of the root CA is widely trusted by browsers"; a CA Service root CA is a private root, so its certificates are trusted only by clients that have installed the root certificate in their trust store (as the source itself describes for root CAs), and on those clients every certificate it signs is trusted.
- Generated key files (`--key-output-file`) hold a private key; don't commit or share them. CA signing keys stay in Cloud KMS; never export or commit CA private key material.
- If you delete resources such as CA pools, CAs and certificate templates, you can't create a new resource of that type with the same name in the same project and location.
- Source inconsistency: the source says the `--key-algorithm` flag copies the CA configuration from the existing CA; the copying is done by `--from-ca`, and the help lists `--key-algorithm` as the key algorithm option.
- Terraform: a root CA created through Terraform is enabled on creation; set `desired_state` to `STAGED` to keep it staged. The source also shows Console, Terraform, Go, Java, Python, the PowerShell (Windows) forms of the REST requests, and the JSON operation responses; they are omitted here.
- Adapted from the official docs: the REST body `"lifetime": {"seconds": 315576000, "nanos": 0}` with snake_case names such as `subject_config` was replaced with `"lifetime": "315576000s"` and camelCase names; `?certificate_authority_id=` became `?certificateAuthorityId=`.
- Source: https://docs.cloud.google.com/certificate-authority-service/docs/creating-root-ca (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-ca-pool.md](./creating-ca-pool.md)
- [request-certificates-gcloud.md](./request-certificates-gcloud.md)
- [ca-service-concepts.md](./ca-service-concepts.md)
