---
source: https://docs.cloud.google.com/kms/docs/key-states
---

# Key version states

A Cloud KMS key version has a state; keys themselves do not. A version can be used only when enabled. The page lists each state, the allowed transitions, how state affects cryptographic operations, and the configurable duration of the scheduled-for-destruction state.

## Signature / Usage

### Change a key version's state

Disable, enable, schedule for destruction and restore a key version.

```bash
gcloud kms keys versions disable 3 --location=us-east1 \
  --keyring=fellowship --key=frodo
```

```bash
gcloud kms keys versions enable 3 --location=us-east1 \
  --keyring=fellowship --key=frodo
```

```bash
gcloud kms keys versions destroy 9 --location=us-east1 \
  --keyring=fellowship --key=frodo
```

```bash
gcloud kms keys versions restore 9 --location=us-east1 \
  --keyring=fellowship --key=frodo
```

## Options / Props

### States

| State | Value | Meaning |
|---|---|---|
| Pending generation | `PENDING_GENERATION` | Asymmetric keys only. Still being generated; can't be used, enabled, disabled or destroyed. Becomes enabled automatically |
| Pending import | `PENDING_IMPORT` | Imported keys only. Still being imported; same restrictions; becomes enabled automatically |
| Enabled | `ENABLED` | Ready for use |
| Disabled | `DISABLED` | Can't be used; key material still available; can be re-enabled |
| Scheduled for destruction | `DESTROY_SCHEDULED` | Can't be used for cryptographic operations (requests fail); can be restored into the disabled state within the scheduled destruction period. Corresponds to Stage 2 (soft deletion) of the data deletion pipeline |
| Destroyed | `DESTROYED` | Key material is no longer stored in Cloud KMS; ciphertext from the version is not recoverable; new signatures can't be created; asymmetric public keys are no longer downloadable. Can't leave this state except when re-imported. Corresponds to Stage 3 (logical deletion from active systems). Key material is deleted from all Google active and backup systems 45 days from destruction time |
| Import failed | `IMPORT_FAILED` | The version could not be imported |

### Transitions

| From | To | Method |
|---|---|---|
| (asymmetric create) | pending generation, then enabled automatically | version creation |
| (symmetric create) | enabled | version creation |
| enabled / disabled | disabled / enabled | `UpdateCryptoKeyVersion` |
| enabled or disabled | scheduled for destruction | `DestroyCryptoKeyVersion` |
| scheduled for destruction | disabled | `RestoreCryptoKeyVersion` |

### Scheduled-for-destruction duration

| Item | Value |
|---|---|
| Default | 30 days |
| Configurable | Only at key creation, in the `destroy_scheduled_duration` field of the `CryptoKey` in `CreateCryptoKeyRequest`; can't be changed afterwards; applies to all future versions of the key |
| Minimum | 24 hours for all keys, except import-only keys (minimum 0) |
| Maximum | 120 days |

### Effect on cryptographic operations

| Key use | Rule |
|---|---|
| Symmetric encryption | A key needs an enabled primary version to encrypt. If the primary version is disabled it can't encrypt. An enabled primary version can be disabled, scheduled or destroyed, and a non-enabled version can be made primary. The version used is stored in the ciphertext; which version is primary doesn't affect decryption, which works with any enabled version |
| Asymmetric encryption or signing | A version must be specified and must be enabled. A public key can be retrieved only if the version is enabled |

## Notes

- The source recommends the default 30 days unless application or regulatory requirements demand otherwise.
- Irreversible: after `DESTROYED`, data encrypted with the version cannot be recovered. Check that a version is unused before destroying it, and try on a disposable key first. Disabling a key version used by CMEK-protected data makes that data inaccessible until re-enabled.
- Source inconsistency: the gcloud 593.0.0 help for `gcloud kms keys versions destroy` says it "Schedules the given version for destruction in 24 hours", while this page states the default is 30 days (24 hours is the minimum configurable duration). The version stays scheduled for the key's configured `destroy_scheduled_duration`.
- Key versions in any state other than destroyed incur costs. The source also shows a state diagram image.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions/disable, https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions/enable, https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions/destroy and https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions/restore (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/kms/docs/key-states (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [resource-hierarchy.md](./resource-hierarchy.md)
- [key-rotation.md](./key-rotation.md)
