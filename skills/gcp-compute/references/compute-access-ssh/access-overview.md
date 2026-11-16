---
source: https://docs.cloud.google.com/compute/docs/instances/access-overview
---

# About VM access (Linux)

Overview of how to share or restrict user and application access to Linux VMs on Compute Engine. For users there are two methods: OS Login (recommended in most scenarios) and manually managed SSH keys in metadata. For applications, the source points to SSH with service accounts.

## Signature / Usage

### Add your SSH public key to your OS Login profile

```bash
gcloud compute os-login ssh-keys add \
    --key-file=/home/user/.ssh/id_rsa.pub
```

## Options / Props

| Method | When to use | Key facts from the source |
|---|---|---|
| OS Login | Most scenarios | Uses Compute Engine IAM roles to manage SSH access; optional 2-step verification; organization policies for org-level control |
| SSH keys in metadata | You run your own directory service, or cannot set up OS Login | Manual management; see risks below |
| Temporarily grant a user access to an instance | Short-lived access | Bind a member on the instance (see the access-management docs) |
| Application access | Applications connecting to VMs | Use SSH with service accounts |

### Risks of manual SSH key management

- All users who connect with SSH keys stored in metadata have `sudo` access to the VMs.
- You must track expired keys and delete keys of users who should no longer have access (for example when a team member leaves the project).
- Incorrect gcloud CLI or API calls can wipe out all public SSH keys in the project or on a VM, disrupting connections.
- Users and service accounts that can modify project metadata can add SSH keys for all VMs in the project, except VMs that block project-level SSH keys.

## Notes

- When a user connects to a VM, that user can use all IAM permissions granted to the service account attached to the VM.
- If you connect with the Google Cloud console or the gcloud CLI, Compute Engine creates SSH keys on your behalf.
- OS Login on Compute Engine VMs; the IAM concepts in general are in `gcp-foundation`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-login/ssh-keys/add (gcloud 593.0.0 help); the source twin itself has no code.
- The command above does not grant access: the gcloud help describes `gcloud compute os-login ssh-keys add` as "add an SSH public key to an OS Login profile". Access itself comes from granting the IAM role `roles/compute.osLogin` (without `sudo`) or `roles/compute.osAdminLogin` (with `sudo`), as described in oslogin.md and set-up-oslogin.md.
- Source (ssh-keys add): `gcloud compute os-login ssh-keys add --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source (OS Login roles): https://docs.cloud.google.com/compute/docs/oslogin (retrieved 2026-11-17)
- Source (set up OS Login): https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/access-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [oslogin.md](./oslogin.md)
- [set-up-oslogin.md](./set-up-oslogin.md)
- [standard-ssh.md](./standard-ssh.md)
