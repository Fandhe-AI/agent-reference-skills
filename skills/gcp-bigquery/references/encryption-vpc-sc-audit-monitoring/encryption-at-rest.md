---
source: https://docs.cloud.google.com/bigquery/docs/encryption-at-rest
---

# BigQuery encryption at rest

By default, BigQuery encrypts customer content at rest with Google default encryption, using the same hardened key management systems Google uses for its own data. Each object's data and metadata is encrypted with the Advanced Encryption Standard (AES). To control the keys, use customer-managed encryption keys (CMEKs) in Cloud KMS, manually created or generated on demand by Cloud KMS Autokey. Individual values can be encrypted with AEAD functions, and client-side encryption is a separate, customer-run layer.

## Signature / Usage

### Create a CMEK-protected table (SQL)

```sql
CREATE TABLE DATASET_ID.TABLE_ID (
  name STRING, value INT64
) OPTIONS (
    kms_key_name
      = 'projects/KMS_PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY');
```

## Options / Props

### Encryption options

| Option | Who manages the keys | Notes |
|---|---|---|
| Google default encryption | Google | Applied by default; no action needed. Keys have strict access controls and auditing. |
| CMEK in Cloud KMS (manual keys) | You, in Cloud KMS | Control over protection level, location, rotation schedule, usage, access permissions and cryptographic boundaries; key usage can be tracked and audit logs viewed. |
| CMEK with Cloud KMS Autokey | You, with key rings and keys generated on demand | Service agents that use the keys are created if they don't exist and are granted the required IAM roles. |
| AEAD encryption functions | You, per value | Encrypt individual values in a table; for example, use a different key for each customer's data kept in a common table. Based on AES. |
| Client-side encryption | You | Separate from BigQuery encryption at rest; data is encrypted twice (your keys, then Google's) and decrypted twice on read. |

## Notes

- Client-side encryption: BigQuery does not know if your data has already been encrypted client-side, nor does it know your client-side keys. You must securely manage the keys and all aspects of client-side encryption and decryption.
- Data in transit: Google Cloud uses Transport Layer Security (TLS) for data traveling over the Internet during read and write operations; within Google data centers, data is encrypted when transferred between machines.
- After you set up resources with CMEKs, accessing them is similar to using Google default encryption.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption
- Cloud KMS (key rings, keys, Autokey) is covered by the `gcp-security` skill; this page only describes how BigQuery uses it.
- Source: https://docs.cloud.google.com/bigquery/docs/encryption-at-rest (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [customer-managed-encryption.md](./customer-managed-encryption.md)
- AEAD concepts: https://docs.cloud.google.com/bigquery/docs/aead-encryption-concepts
- Autokey with BigQuery: https://docs.cloud.google.com/kms/docs/create-resource-with-autokey#bigquery-autokey
