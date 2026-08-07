<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-google-cloud-kms / last verified: 2026-08-07 -->

# Configure Google Cloud KMS for CMEK

Configure a Google Cloud KMS key as a customer-managed encryption key (CMEK) for your Anthropic organization. Requires a project with billing and the Cloud KMS API enabled, `roles/cloudkms.admin` or equivalent, an Anthropic Admin API key, and the `gcloud` CLI.

## Signature / Usage

```bash
# Create a single-region key ring and HSM-protected symmetric key
gcloud kms keyrings create <ring> --project=<project> --location=<region>
gcloud kms keys create <key> --project=<project> --location=<region> \
  --keyring=<ring> --purpose=encryption --protection-level=hsm

# Grant Anthropic's service account both roles, scoped to the key
gcloud kms keys add-iam-policy-binding <key> ... \
  --member="serviceAccount:anthropic-cmek-client-us@gcp-anthropic-cmek-clients.iam.gserviceaccount.com" \
  --role=roles/cloudkms.cryptoKeyEncrypterDecrypter
```

## Options / Props

| Field | Value |
| --- | --- |
| Anthropic service account | `anthropic-cmek-client-us@gcp-anthropic-cmek-clients.iam.gserviceaccount.com` |
| Required key-level roles | `roles/cloudkms.cryptoKeyEncrypterDecrypter`, `roles/cloudkms.viewer` |
| Key resource name format | `projects/<project>/locations/<region>/keyRings/<ring>/cryptoKeys/<key>` |

## Notes

- Key rings are regional; use a single-region US location (e.g. `us-east5`), not `us` or `global` multi-region.
- HSM protection (`--protection-level=hsm`) is recommended (FIPS 140-2 Level 3); software keys also work.
- Enable Cloud KMS Data Access audit logs (`DATA_READ`/`DATA_WRITE`) — off by default, so without them Anthropic's operations produce no Cloud Logging entries.
- Domain-restricted sharing (`constraints/iam.allowedPolicyMemberDomains`) rejects the IAM bindings unless you add a project-level carve-out or Anthropic's Cloud Identity customer ID to the allowed list.
- Validation failure causes: VPC Service Controls perimeter blocking Cloud KMS, domain-restricted sharing stripping the binding, disabled/destroyed key version.
- Claude Enterprise: CMEK applies org-wide, one key, no per-workspace attach step.

## Related

- [cmek.md](./cmek.md)
- [cmek-aws-kms.md](./cmek-aws-kms.md)
- [cmek-azure-key-vault.md](./cmek-azure-key-vault.md)
