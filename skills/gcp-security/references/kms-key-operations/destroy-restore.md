---
source: https://docs.cloud.google.com/kms/docs/destroy-restore
---

# Destroy and restore key versions

Destroying a key version permanently deletes its key material. Because destruction is generally irreversible, Cloud KMS does not destroy immediately: the key version is scheduled for destruction and stays in the scheduled for destruction state for a configurable duration, during which it can be restored. The default duration is 30 days. A custom duration can be set at key creation, and an organization can enforce a minimum with the **Minimum destroy scheduled duration per key** constraint.

## Signature / Usage

### Check whether the key version is in use

1. View key usage tracking details for the key (they can be delayed or incomplete). Re-encrypt any resources protected by the version with another key version.
2. Turn on logs for any service or application that could use the key version.
3. Turn on logs on the Cloud KMS project that contains the key.
4. Disable the key version; any attempt to use it then fails.
5. Monitor logs until no application or service relies on it. Duration depends on key type, usage pattern, and sensitivity (for a quarterly process, keep it disabled until that process completes successfully).
6. Check usage against compliance requirements, such as data retention periods.

### Destroy a key version (gcloud)

```bash
gcloud kms keys versions destroy KEY_VERSION \
    --key KEY_NAME \
    --keyring KEY_RING \
    --location LOCATION
```

### Destroy a key version (API)

Calls `CryptoKeyVersions.destroy`.

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY_NAME/cryptoKeyVersions/KEY_VERSION:destroy" \
    --request "POST" \
    --header "authorization: Bearer TOKEN"
```

### Restore a key version (gcloud)

```bash
gcloud kms keys versions restore KEY_VERSION \
    --key KEY_NAME \
    --keyring KEY_RING \
    --location LOCATION
```

### Restore a key version (API)

Calls `CryptoKeyVersions.restore`. After restoration the key version is in the disabled state; enable it before use.

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY_NAME/cryptoKeyVersions/KEY_VERSION:restore" \
    --request "POST" \
    --header "authorization: Bearer TOKEN"
```

## Options / Props

### Permissions and roles

| Operation | Permission | Role |
|-----------|------------|------|
| Destroy | `cloudkms.cryptoKeyVersions.destroy` on the key, key ring, project, folder, or organization | Cloud KMS Admin (`roles/cloudkms.admin`), granted on the key |
| Restore | `cloudkms.cryptoKeyVersions.restore` | Cloud KMS Admin (`roles/cloudkms.admin`) |

### Timing

| Item | Value |
|------|-------|
| Default scheduled for destruction duration | 30 days |
| Minimum duration (org policy) | Constraint **Minimum destroy scheduled duration per key** |
| Key material remains in Google systems | Up to 45 days from the scheduled destruction time (active systems and data center backups) |
| Other customer data | Standard Google Cloud deletion timeline of 180 days |
| Destroyed key versions | Not billed resources |

### Risks of destroying a needed key version

| Risk | Description |
|------|-------------|
| Service outage | Destroying a key required to start a container or instance can make services unavailable |
| Permanent data loss | Data encrypted with a destroyed key is crypto-shredded; in some cases encrypted resources are permanently deleted |
| Regulatory or compliance issues | Destroying a key before a retention period ends may violate requirements |

## Notes

- Irreversible: destroying a key version cannot be undone after the scheduled for destruction duration ends; data encrypted with it can't be decrypted. The only exception is key re-import, which restores a previously imported key by providing the same original key material. Try it on a disposable key first.
- You can destroy an enabled or disabled key version. Disabling before scheduling destruction is recommended; organization policy may require it (see the control-key-destruction page). If destroy fails, try disabling the key version first.
- Scheduling a key for destruction does not change a configured rotation schedule; if you want to stop automatic creation of new versions, also disable automatic rotation.
- Key names of deleted keys can't be reused; key ring names can be reused after deletion. Deleting removes a resource from lists, destroying deletes key material.
- Destroying external keys (Cloud EKM): the version is destroyed after the scheduled period, after which you can no longer encrypt or decrypt with it. A destroyed Cloud EKM key version can't be recreated, even with the same external key URI or key path. Destroying a manually managed key version doesn't change the key in the external key manager (destroy in Google Cloud first, then in the EKM). Destroying a coordinated external key version destroys it in Google Cloud and then sends a destruction request to the EKM.
- It is your responsibility to ensure a key version is safe to destroy; Google is not responsible for outages, data loss, or compliance issues.
- To receive an alert when a key version is scheduled for destruction, see Using Cloud Monitoring with Cloud KMS.
- The source also shows Console steps and client-library samples (C#, Go, Java, Node.js, PHP, Python, Ruby); they are omitted here. `TOKEN` is a placeholder for an OAuth access token; a real token on the command line lands in shell history and process lists, so do not paste real tokens into shared terminals or CI logs.
- Source: https://docs.cloud.google.com/kms/docs/destroy-restore (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [control-key-destruction.md](./control-key-destruction.md)
- [create-key-ring.md](./create-key-ring.md)
- Key states: https://docs.cloud.google.com/kms/docs/key-states
- Enable and disable key versions: https://docs.cloud.google.com/kms/docs/enable-disable
- gcloud reference: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions/destroy and https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions/restore
