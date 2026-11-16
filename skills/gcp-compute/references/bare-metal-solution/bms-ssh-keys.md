---
source: https://docs.cloud.google.com/bare-metal/docs/bms-ssh-keys
---

# Set up SSH keys for a server

Optionally set SSH keys on a Bare Metal Solution server while provisioning it or while reimaging it. Preview feature, available only for the Linux OSes supported by Bare Metal Solution.

## Signature / Usage

View a server's SSH keys (alpha command):

```bash
gcloud alpha bms instances auth-info SERVER_NAME --project=PROJECT_ID --region=REGION
```

Replace SERVER_NAME with the server name, PROJECT_ID with the project ID, and REGION with the server's location.

Public key format (at least one key; type must be `ssh-rsa`):

```text
ssh-rsa public_key optional comment
```

Log in with the `customeradmin` user (SSH keys are associated with it):

```bash
ssh customeradmin@bare-metal-ip
```

## Options / Props

| Item | Value |
|---|---|
| Launch stage | Preview (Pre-GA Offerings Terms; as is, limited support) |
| Key type | `ssh-rsa` public key, at least one |
| Where to set | Console intake form when provisioning, or Reimage server (change the OS) when reimaging |
| Selectable keys | Only keys registered in the same project as the server |
| Login user | `customeradmin` |

## Notes

- Keys must exist and be registered in the server's project before provisioning; creating, managing and registering keys is described at https://docs.cloud.google.com/bare-metal/docs/troubleshooting/configure-serial-console. The source text says "create the Cloud KMS key in the same project" in this step; it is recorded as written.
- Reimaging erases the server's boot LUN: it is destructive, so try it on a disposable server first.
- Only public keys are provided to Google Cloud; keep private keys out of metadata, tickets and repositories.
- IAM: `baremetalsolution.sshKeys.create/delete/list` (see `roles/baremetalsolution.admin`).
- The source also shows Console steps for viewing keys.
- Source: https://docs.cloud.google.com/bare-metal/docs/bms-ssh-keys (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bms-setup.md](./bms-setup.md)
- [bms-iam.md](./bms-iam.md)
