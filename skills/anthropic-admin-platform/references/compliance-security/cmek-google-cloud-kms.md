<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-google-cloud-kms / last verified: 2026-11-14 -->

# Set up CMEK with Google Cloud KMS

Create a Google Cloud KMS key labeled with your Anthropic organization ID, give Anthropic's service account access to it, and put it to use in Claude Platform or Claude Enterprise.

## Signature / Usage

```bash
gcloud kms keys create <your-key-name> \
  --project=<your-project-id> \
  --location=<region> \
  --keyring=<your-keyring-name> \
  --purpose=encryption \
  --protection-level=hsm \
  --labels=anthropic-org-<ORGANIZATION_UUID>=true
```

```bash
gcloud kms keys add-iam-policy-binding <your-key-name> \
  --project=<your-project-id> \
  --location=<region> \
  --keyring=<your-keyring-name> \
  --member="serviceAccount:anthropic-cmek-client-us@gcp-anthropic-cmek-clients.iam.gserviceaccount.com" \
  --role=roles/cloudkms.cryptoKeyEncrypterDecrypter
```

## Options / Props

| Item | Value |
| --- | --- |
| Anthropic service account | `anthropic-cmek-client-us@gcp-anthropic-cmek-clients.iam.gserviceaccount.com` (use only this address, never one sent by email or chat) |
| Roles on the key | `roles/cloudkms.cryptoKeyEncrypterDecrypter` (Cloud KMS CryptoKey Encrypter/Decrypter) and `roles/cloudkms.viewer` (Cloud KMS Viewer), scoped to the key |
| Organization label | key `anthropic-org-<ORGANIZATION_UUID>`, value `true`; `<ORGANIZATION_UUID>` is your Anthropic organization ID in lowercase |
| Key settings (console) | Protection level HSM; Key material Generated key; Purpose Symmetric encrypt/decrypt; Algorithm Google symmetric key |
| Key resource name | `projects/<your-project-id>/locations/<region>/keyRings/<your-keyring-name>/cryptoKeys/<your-key-name>` |
| Location | any Cloud KMS location; lowest latency `us-east5` or `us-central1`; Anthropic strongly recommends HSM protection (omit `--protection-level=hsm` for software protection) |
| Google Cloud permissions | Cloud KMS API on; `roles/cloudkms.admin` or equivalent to create key rings and keys and set IAM policy |

## Notes

- Enable Cloud KMS Data Access audit logs (Data Read and Data Write) so Cloud Logging records Anthropic's use of your key; they're off by default.
- If your organization enforces domain restricted sharing (`constraints/iam.allowedPolicyMemberDomains`) it blocks the grant to Anthropic's service account; add a project-level exception, or allow Anthropic's Cloud Identity customer ID (contact Anthropic for the ID).
- Create a key ring first if needed: `gcloud kms keyrings create <your-keyring-name> --project=<your-project-id> --location=<region>`. Run the IAM binding for both roles (the second with `--role=roles/cloudkms.viewer`). Get the full resource name with `gcloud kms keys describe <your-key-name> --project=<your-project-id> --location=<region> --keyring=<your-keyring-name> --format="value(name)"`.
- Existing key: verification fails unless the key has the label set to `true`. Add it with `gcloud kms keys update <your-key-name> --project=<your-project-id> --location=<region> --keyring=<your-keyring-name> --update-labels=anthropic-org-<ORGANIZATION_UUID>=true`; existing labels are kept. Then do the access grant steps.
- In Claude on Claude Platform: Encryption keys on the Data retention page > Add key, Display name, select Google Cloud KMS, Continue; check the key has the Organization label; paste the full resource name into Key resource name; Add; Verify (Connected or Connection failed); select the workspace, under Encryption key select the key, Save, confirm and Confirm. In a ZDR organization select Standard data retention first and Accept the terms after Save.
- In Claude on Claude Enterprise: one key for the whole organization; claude.ai > Organization settings > Data and privacy > Encryption keys > Add key, select Google Cloud KMS, tick the checkbox, Continue, paste the resource name, Add; the check can take up to 30 seconds (Encryption key configured. then Done). Adding turns off or changes some features for every user.
- Adding or attaching can't be undone. To script this on Claude Platform use the Admin API.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-google-cloud-kms (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-admin-api.md](./cmek-admin-api.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
- [cmek-aws-kms.md](./cmek-aws-kms.md)
- [cmek-azure-key-vault.md](./cmek-azure-key-vault.md)
