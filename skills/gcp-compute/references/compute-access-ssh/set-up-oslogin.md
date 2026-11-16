---
source: https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin
---

# Set up OS Login

How to enable or disable OS Login for a VM or a whole project through the `enable-oslogin` metadata key, assign the required IAM roles, and optionally require 2-step verification (`enable-oslogin-2fa`).

## Signature / Usage

### Enable OS Login during VM creation

```bash
gcloud compute instances create VM_NAME \
   --image-family=IMAGE_FAMILY \
   --image-project=IMAGE_PROJECT \
   --metadata enable-oslogin=TRUE
```

`IMAGE_FAMILY` is a Linux image family (VM is created from the most recent non-deprecated image); `IMAGE_PROJECT` is the image project that contains it. Both are listed in the Operating system details page.

### Enable or disable through metadata

- Project-wide (all VMs): project metadata key `enable-oslogin`, value `TRUE` (or `FALSE` to disable).
- Single VM: instance metadata key `enable-oslogin`, value `TRUE` (or `FALSE`).
- Instance `FALSE` disables OS Login for that VM even if project metadata is `TRUE`.

### 2-step verification

Set instance or project metadata key `enable-oslogin-2fa` to `TRUE`. Both `enable-oslogin` and `enable-oslogin-2fa` must be `TRUE` for 2FA to be enforced.

## Options / Props

### IAM roles for users connecting to OS Login VMs

| Role | Required users | Grant level |
|---|---|---|
| `roles/compute.osLogin` or `roles/compute.osAdminLogin` | All users | Project or instance. If a user needs SSH from the console or gcloud CLI, grant at the project level, or additionally grant a project-level role that contains `compute.projects.get` |
| `roles/iap.tunnelResourceAccessor` | Users who need SSH through IAP TCP forwarding | Project or instance |
| `roles/iam.serviceAccountUser` | All users, if the VM has a service account | On the service account |
| `roles/compute.osLoginExternalUser` | Users from a different organization than the VM | Organization; must be granted by an organization administrator |

### Limitations

- OS Login profiles larger than 32 KiB (profile includes POSIX account information and SSH public keys) aren't supported.
- Not supported on Windows Server and SQL Server images; Fedora CoreOS (use the Fedora CoreOS ignition system); SLES 16 (use metadata-based SSH).
- Verify distribution support in Operating system details.

## Notes

- Setting OS Login metadata makes Compute Engine delete the VM's `authorized_keys` files and stop accepting SSH keys stored in project or instance metadata.
- When disabled, you can connect with SSH keys stored in metadata.
- Connect with the methods in [standard-ssh.md](./standard-ssh.md). The username is the one your organization administrator configured, otherwise `USERNAME_DOMAIN_SUFFIX`.
- With 2FA enabled you must have 2-step verification on your Google Account or domain, otherwise access is denied. 2-step verification is not enforced on service account users. For the phone prompt method, accept the prompt on your phone or tablet; for other methods enter the security code or OTP.
- SSH certificates and SSH with security keys are Preview features linked from the source.
- OS Login on Compute Engine VMs; the IAM concepts in general are in `gcp-foundation`. IAP itself is in the planned `gcp-security`.
- The source table links each role by anchor (for example `compute/docs/access/iam#compute.osLogin`); the role IDs above (`roles/compute.osLogin`, `roles/compute.osAdminLogin`, `roles/iap.tunnelResourceAccessor`, `roles/iam.serviceAccountUser`, `roles/compute.osLoginExternalUser`) were checked against the Compute Engine, IAP and IAM role references.
- The source also shows Console steps and Terraform (`google_compute_project_metadata`, `google_compute_instance`).
- Source inconsistency: this page says that `roles/compute.osLogin` or `roles/compute.osAdminLogin` is granted "On the Project or instance" and "If a user requires SSH access from Google Cloud console or Google Cloud CLI, you must grant these roles at the project level, or additionally grant a role at the project level that contains the `compute.projects.get` permission.", while oslogin.md says "You can grant OS Login IAM roles at the instance, folder, or organization level." (project is not named).
- Source (OS Login overview): https://docs.cloud.google.com/compute/docs/oslogin (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [oslogin.md](./oslogin.md)
- [standard-ssh.md](./standard-ssh.md)
- [ssh-using-iap.md](./ssh-using-iap.md)
