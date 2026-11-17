---
source: https://docs.cloud.google.com/certificate-authority-service/docs/request-certificates-gcloud
---

# Quickstart: Issue a certificate using the Google Cloud CLI

Quickstart: enable the CA Service API, create an Enterprise-tier CA pool and a root CA, optionally a subordinate CA, issue a certificate with an auto-generated key, then clean up.

## Signature / Usage

### Set up

```bash
gcloud services enable privateca.googleapis.com
```

```bash
gcloud config set privateca/location LOCATION
```

### Create a CA pool and a root CA

Resource names can contain letters, numbers, hyphens (-) and underscores (_), up to 63 characters.

```bash
gcloud privateca pools create POOL_ID --location LOCATION --tier "enterprise"
```

```bash
gcloud privateca roots create CA_ID --pool POOL_ID --location LOCATION --subject "CN=Example Prod Root CA,O=Google"
```

Enter `y` at the gcloud prompt to enable the root CA.

### Optional: subordinate CA pool and subordinate CA

Adapted (not in the official docs): `\` line continuations added to this multi-line command; without them the source lines would run as separate commands.

```bash
gcloud privateca pools create SUBORDINATE_POOL_ID \
    --location LOCATION \
    --tier TIER
```

```bash
gcloud privateca subordinates create SUBORDINATE_CA_ID \
    --location=LOCATION \
    --pool=SUBORDINATE_POOL_ID \
    --issuer-pool=POOL_ID \
    --issuer-location=ISSUER_LOCATION \
    --from-ca=EXISTING_CA_ID \
    --kms-key-version projects/PROJECT_ID/locations/LOCATION_ID/keyRings/KEY_RING/cryptoKeys/KEY/cryptoKeyVersions/KEY_VERSION
```

### Create a certificate

```bash
pip install --user "cryptography>=2.2.0"
```

```bash
export CLOUDSDK_PYTHON_SITEPACKAGES=1
```

```bat
set CLOUDSDK_PYTHON_SITEPACKAGES=1
```

The first `export` form is for macOS or Linux; `set` is for Windows.

```bash
gcloud privateca certificates create \
    --issuer-pool POOL_ID \
    --issuer-location ISSUER_LOCATION \
    --subject "CN=Example Prod,O=Google" \
    --generate-key \
    --key-output-file=./key \
    --cert-output-file=./cert.pem
```

### Clean up

Adapted (not in the official docs): the revoke command uses `--issuer-location` and is joined on one line; `--location` is not a flag of `gcloud privateca certificates revoke` in the gcloud 593.0.0 help, and the source breaks the line before `LOCATION`.

```bash
gcloud privateca certificates revoke --certificate CERT_NAME --issuer-pool POOL_ID --issuer-location LOCATION
```

```bash
gcloud privateca roots disable CA_ID --pool=POOL_ID --location=LOCATION
```

```bash
gcloud privateca roots delete CA_ID --pool=POOL_ID --location=LOCATION
```

```bash
gcloud privateca pools delete POOL_ID --location=LOCATION
```

```bash
gcloud projects delete PROJECT_ID
```

## Options / Props

| Placeholder / flag | Description |
|---|---|
| `POOL_ID` | Name of the CA pool; `ISSUER_LOCATION` is the location of the CA that issued the certificate. |
| `TIER` | Subordinate pool tier: `devops` or `enterprise`. |
| `--generate-key` | Generates a key pair locally with the Pyca cryptography library; the key is never sent to CA Service. |
| `--key-output-file` / `--cert-output-file` | Where the private key and the certificate are written. |
| `CERT_NAME` | Name of the certificate to revoke. |

## Notes

- Roles: enabling APIs needs `serviceusage.services.enable` (Owner, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`); creating a project needs Project Creator (`roles/resourcemanager.projectCreator`). Billing must be enabled. Resource location can't be changed after creation; if you skip `privateca/location`, add `--location` to some commands.
- Irreversible and disruptive: revoking a certificate, deleting a CA and deleting a CA pool can break clients that rely on them; try them on disposable resources first (the source suggests a throwaway project for this quickstart). You can delete a CA only after revoking all certificates it issued; the CA state changes to `Deleted` and CA Service permanently deletes it 30 days after you initiate deletion. A CA pool can be deleted only after its CA is permanently deleted. Deleting the project deletes everything in it and loses custom project IDs.
- `./key` written by `--generate-key` is a private key; don't commit or share it.
- Corrected from the official docs: `gcloud privateca certificates revoke --certificate CERT_NAME --issuer-pool POOL_ID --location` / `LOCATION` (unknown flag, broken line) became `... --issuer-location LOCATION`, and `\` was added to the multi-line `gcloud privateca pools create SUBORDINATE_POOL_ID` command.
- Source: https://docs.cloud.google.com/certificate-authority-service/docs/request-certificates-gcloud (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-ca-pool.md](./creating-ca-pool.md)
- [creating-root-ca.md](./creating-root-ca.md)
- [ca-service-concepts.md](./ca-service-concepts.md)
