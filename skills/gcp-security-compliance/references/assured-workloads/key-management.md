---
source: https://docs.cloud.google.com/assured-workloads/docs/key-management
---

# Supporting compliance with key management

How Assured Workloads supports compliance through encryption: mandated CMEK with a separate key management project for CJIS, ITAR and IL5, and Google-owned / Google-managed keys, Cloud KMS, CMEK, Cloud EKM and key import for other packages. This page also covers the general encryption background of the "Data encryption and encryption keys" page.

## Signature / Usage

### Create a CMEK key after the key ring exists

After Assured Workloads creates the key ring, you must create your CMEK key. The page has no code block; this help example creates a key `frodo` with protection level `software` in key ring `fellowship` in `us-east1`. Use a key ring and location that match your control package's compliant locations.

```bash
gcloud kms keys create frodo --location=us-east1 \
    --keyring=fellowship --purpose=encryption
```

## Options / Props

### Encryption support by control package

| Control packages | Support |
|---|---|
| CJIS, ITAR, IL5 | CMEK is mandated. Assured Workloads creates a key management project (separated from resource folders for separation of duties, aligned with NIST 800-53 controls) and a key ring; the CMEK project restricts key ring creation to the compliant locations you select. After that you manage creating or importing encryption keys. |
| Other control packages (including IL4) | Google-owned and Google-managed encryption keys (FIPS 140-2 validated, encryption in transit and at rest on all services), Cloud KMS, CMEK (optional for packages such as IL4), Cloud EKM, key import. |

### CMEK-integrated services (CJIS)

| Service |
|---|
| Cloud Storage |
| Persistent Disk |
| BigQuery |

### Roles

| Role | Responsibility |
|---|---|
| Administrators | Control access to the encryption project and its key resources; allocate key resource IDs to developers; may use Cloud KMS, CMEK, Cloud EKM and key import. |
| Developers | Request the key resource ID from the administrator when configuring in-scope resources that need CMEK; without CMEK, use Google-owned and Google-managed encryption keys so data is encrypted. The request method is set by your organization's security process. |

## Notes

- Assured Workloads provides configuration guidance for CMEK only when you select the CJIS control package.
- After you set up CMEK, share the resource ID of the keys in the CMEK project with developers working in the Assured Workloads resource folder(s). CMEK integration is limited to in-scope services that support CMEK.
- For services not integrated with CMEK, or for control packages that do not require CMEK, data is protected by the default encryption at rest with Google-owned and Google-managed encryption keys. The source words this as the option to use "Google-managed Cloud Key Management Service keys", acceptable because "Google-managed KMS" "covers all Google Cloud products and services by default" with FIPS 140-2 validated encryption in transit and at rest; that refers to Google's default encryption, not to Cloud KMS keys you create, which protect data only in services that support CMEK and only when you configure them.
- Create resources in the Assured Workloads resource project, not in the key management project.
- Data encryption background (from the encryption keys page): Google Cloud encrypts in transit with TLS by default and applies encryption at rest by default. For some control packages, Assured Workloads can deploy a CMEK project alongside your resources project when you create the folder. Customers can delete the CMEK project and rely only on Google-owned and Google-managed keys, but decide whether to use CMEK before creating the folder, because deleting an existing in-use CMEK can result in inability to access or recover data.
- Irreversible and disruptive: disabling or destroying a CMEK key, or deleting the CMEK project, makes data encrypted with it inaccessible. Try key lifecycle operations on a disposable resource first. CMEK key lifecycle control (creation to deletion) supports cryptographic erase requirements in the Cloud Computing SRG.
- The key in the snippet is a software key created from a help example; keep any generated key material private and do not commit it.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/create (gcloud 593.0.0 help). The full flag list is in the `gcp-security` skill.
- Merged page: this page also carries https://docs.cloud.google.com/assured-workloads/docs/encryption-keys (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0), which links to the Cloud KMS key creation guide and the CMEK documentation.
- Source: https://docs.cloud.google.com/assured-workloads/docs/key-management (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [key-concepts.md](./key-concepts.md)
- [control-packages.md](./control-packages.md)
