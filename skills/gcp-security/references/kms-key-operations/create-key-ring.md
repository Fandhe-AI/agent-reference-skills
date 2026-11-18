---
source: https://docs.cloud.google.com/kms/docs/create-key-ring
---

# Create a key ring

A key ring is the root resource for Cloud KMS keys and key versions. Each key ring exists within a given location. Key rings and the resources that they contain can't be moved to a different location after they are created.

## Signature / Usage

### Prerequisites

- A Google Cloud project to contain your Cloud KMS resources (the key project). Google recommends that the key project does not contain any other Google Cloud resources. Enable the Cloud KMS API (`cloudkms.googleapis.com`) on it.
- A location that is near your other resources and supports your chosen protection level (see Cloud KMS locations).
- Key rings with the same name can exist in different locations, so always specify the location.

### gcloud

```bash
gcloud kms keyrings create KEY_RING \
    --location LOCATION
```

- `KEY_RING`: the name of the key ring that contains the key.
- `LOCATION`: the Cloud KMS location of the key ring.

### API

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/keyRings?key_ring_id=KEY_RING" \
    --request "POST" \
    --header "authorization: Bearer TOKEN"
```

- `PROJECT_ID`: the ID of the project that contains the key ring.
- `KEY_RING`: the name of the key ring.
- `LOCATION`: the Cloud KMS location of the key ring.

## Options / Props

### Required role and permissions

| Item | Value |
|------|-------|
| Predefined role | Cloud KMS Admin (`roles/cloudkms.admin`), on the project or a parent resource |
| Permission | `cloudkms.keyRings.create` |
| Permission | `cloudkms.keyRings.get` |
| Permission | `cloudkms.keyRings.list` |
| Permission | `cloudkms.locations.get` |
| Permission | `cloudkms.locations.list` |
| Permission | `resourcemanager.projects.get` |

### Location guidance

| Use | Guidance |
|-----|----------|
| General | Choose a location near the resources you want to protect |
| CMEK | The key ring should be in the same location as the resources you use it with |
| Cloud EKM keys | The location must be physically close to your external key manager (EKM) vendor |

## Notes

- The Cloud KMS Admin role contains permissions for key maintenance and key version destruction; assign it only to individuals responsible for key administration. It does not grant encrypt / decrypt permissions.
- Key rings cannot be moved between locations, so choose the location before creating the key ring. Key ring names can be reused after deletion, but key names cannot.
- The source also shows Console steps and client-library samples (C#, Go, Java, Node.js, PHP, Python, Ruby); they are omitted here.
- `curl` examples use `TOKEN` as a placeholder for an OAuth access token. A real token on the command line lands in shell history and process lists; do not paste real tokens into shared terminals or CI logs.
- Source: https://docs.cloud.google.com/kms/docs/create-key-ring (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [encrypt-decrypt.md](./encrypt-decrypt.md)
- [destroy-restore.md](./destroy-restore.md)
- Create keys: https://docs.cloud.google.com/kms/docs/creating-keys
- Import keys: https://docs.cloud.google.com/kms/docs/key-import
- gcloud reference: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keyrings/create
