---
source: https://docs.cloud.google.com/secret-manager/docs/data-integrity
---

# Data integrity assurance

Secret Manager computes a CRC32C checksum of secret data when you add a version, stores it with the data, and returns it when you access the version, so you can detect accidental modification or corruption. The checksum must be CRC32C, encoded as a decimal integer (int64 in the `SecretPayload` proto); the `SecretVersion` response indicates whether the server received and validated the checksum.

## Signature / Usage

### Compute the checksum of a file

```bash
gcloud storage hash "/path/to/file.txt" --hex
```

### Add a version with a checksum (REST)

```bash
SECRET_DATA=$(echo "seCr3t" | base64)
```

Adapted (not in the official docs): the placeholders `project-id` / `secret-id` became upper-case `PROJECT_ID` / `SECRET_ID`, and the payload field `data_crc32c` became `dataCrc32c` as named in the Discovery document.

```bash
curl "https://secretmanager.googleapis.com/v1/projects/PROJECT_ID/secrets/SECRET_ID:addVersion" \
    --request "POST" \
    --header "authorization: Bearer $(gcloud auth print-access-token)" \
    --header "content-type: application/json" \
    --data "{\"payload\": {\"data\": \"${SECRET_DATA}\", \"dataCrc32c\": $CHECKSUM}}"
```

### Response when accessing a version

```json
{
  "name": "projects/PROJECT_ID/secrets/SECRET_ID/versions/VERSION_ID",
  "payload": {
    "data": "YQo=",
    "dataCrc32c": "163439259"
  }
}
```

## Notes

- Convert the hex output of `gcloud storage hash --hex` to a decimal integer before using it as `CHECKSUM`; the source says the checksum "must be converted to decimal format". The source does not show how `CHECKSUM` is set: the Discovery document (`SecretPayload.dataCrc32c`) says the service verifies the integrity of the received data using this checksum.
- The source also shows `gcloud storage hash --hex cat <(echo ${SECRET_DATA})` for data passed on the command line. It is omitted: `gcloud storage hash` takes local or cloud file URLs (gcloud 593.0.0 help), so `cat` would be read as a file name. Hash a file instead.
- Corrected from the official docs: `.../projects/project-id/secrets/secret-id:addVersion` and `\"data_crc32c\": $CHECKSUM` in the curl example.
- `echo "seCr3t" | base64` and `--data` put the secret value in shell history and process lists; read it from a protected file instead. The accessed `payload.data` is the secret (base64); do not print it in shared terminals or CI logs.
- In the console the checksum is calculated automatically when you enter a value.
- Secret versions encrypted with CMEK and created before July 16, 2021 do not have checksums stored.
- On Compute Engine or GKE, authenticate with the `cloud-platform` scope.
- Source: https://docs.cloud.google.com/secret-manager/docs/data-integrity (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-and-accessing-secrets.md](./creating-and-accessing-secrets.md)
