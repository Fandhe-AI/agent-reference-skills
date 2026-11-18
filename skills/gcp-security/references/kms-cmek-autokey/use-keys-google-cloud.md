---
source: https://docs.cloud.google.com/kms/docs/use-keys-google-cloud
---

# Use Cloud KMS keys in Google Cloud

How to use Cloud KMS customer-managed encryption keys (CMEK) in other Google Cloud services: prepare a key, grant the service account access, and enable CMEK in the service. The page also holds the table of CMEK-integrated services (identical to the one in compatible-services.md).

## Signature / Usage

### Prepare a CMEK integration

1. Create a key ring (as geographically near the resources as possible) or select one.
2. Create or select a key; the protection level, purpose and algorithm must suit the resources.
3. Get the resource ID of the CMEK key.
4. Grant `roles/cloudkms.cryptoKeyEncrypterDecrypter` on the key to the service account for the service.

Example: a Secret Manager secret protected with a CMEK key.

```bash
gcloud secrets create "SECRET_ID" \
    --replication-policy "automatic" \
    --kms-key-name "projects/KEY_PROJECT_ID/locations/global/keyRings/autokey/cryptoKeys/KEY_NAME" \
    --project "RESOURCE_PROJECT_ID"
```

## Options / Props

### Where the encrypter/decrypter role can be granted

| Level |
|---|
| Key (recommended: lowest level that meets your needs) |
| Key ring |
| Project |
| Folder |
| Organization |

### Secret Manager console example (CMEK fields)

| Field | Meaning |
|---|---|
| Encryption section | Select Use a customer-managed encryption key (CMEK) |
| Encryption key box | Pick a key (optionally Switch project, filter by location, key ring, name or protection level) or Enter key manually with the key resource ID |

## Notes

- Before you begin: have a project to contain your Cloud KMS keys. Using a separate project that contains no other Google Cloud resources is recommended.
- Some services only let you configure CMEK at resource creation; others let you enable and disable CMEK on existing resources.
- Irreversible or disruptive: as long as the service account has the role, the service can encrypt and decrypt its data. If you revoke the role or disable or destroy the CMEK key, data can no longer be accessed, which can affect your services. Try on a disposable resource first.
- All services in the table support software and hardware (HSM) keys; products that work with external Cloud EKM keys are marked in the EKM supported column. The table lists 87 service-resource rows; see compatible-services.md for the full list with topic links, Preview markers and the Deprecated notebook rows.
- The source shows the Secret Manager example in the Console only; the Console fields are summarized in the table above.
- Source: https://docs.cloud.google.com/kms/docs/use-keys-google-cloud (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kms/docs/create-resource-with-autokey (the key path there is an Autokey key; any CMEK key path works the same way). The flags exist in gcloud 593.0.0 `gcloud secrets create`.

## Related

- [compatible-services.md](./compatible-services.md)
- [cmek.md](./cmek.md)
- [create-resource-with-autokey.md](./create-resource-with-autokey.md)
