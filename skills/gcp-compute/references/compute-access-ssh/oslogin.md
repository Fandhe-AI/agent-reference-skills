---
source: https://docs.cloud.google.com/compute/docs/oslogin
---

# About OS Login

OS Login manages SSH access to instances using IAM, without creating and managing individual SSH keys. It keeps a consistent Linux user identity across Compute Engine instances and is the recommended way to manage many users across multiple instances or projects.

## Signature / Usage

```bash
gcloud compute os-login describe-profile
```

## Options / Props

### Predefined roles

| Role | Grants |
|---|---|
| `roles/compute.osLogin` | Login access without `sudo` |
| `roles/compute.osAdminLogin` | Login access with `sudo` |

Roles can be granted at the instance, folder, or organization level.

### POSIX account values

| Value | Description |
|---|---|
| Username | `USERNAME_DOMAIN_SUFFIX`; prefixed with `ext_` if the user is from a different Google Workspace organization than the one hosting the VMs; prefixed with `sa_` for service accounts; truncated at 32 characters |
| UID | Unique, randomly generated POSIX-compliant user ID |
| GID | POSIX-compliant group ID that matches the UID |
| Home directory | Path to the user's home directory |

OS Login configures the POSIX account when you connect to an OS Login VM with the console or gcloud CLI, or import a public SSH key with the gcloud CLI or OS Login API.

### Benefits

- Automatic Linux account lifecycle management tied to the Google identity.
- Fine-grained authorization with IAM (for example login without `sudo`); permissions are checked on every login attempt and revoked access takes effect automatically.
- Optional sync of Linux account information from on-premises Active Directory / LDAP (for example identical UIDs).
- Optional Google Account 2-step verification (Google Authenticator, text message or phone call, phone prompts, security key OTP).
- SSH certificate authentication, and audit logging of connections.

## Notes

- When OS Login is enabled, the instance fetches the SSH keys of the Linux user account from the OS Login service. The guest agent ignores keys stored in metadata, so metadata-based SSH keys can't be used on that instance.
- You can configure an `authorized_keys` file for a local user even when OS Login is enabled. Local accounts and OS Login users must have different usernames and UIDs.
- Cloud Identity administrators can modify usernames; Google Workspace super administrators can change the username format to remove the domain suffix.
- OS Login on Compute Engine VMs; the IAM concepts in general are in `gcp-foundation` (the `oslogin` service is mapped there; the VM-side OS Login setup stays here).
- Not supported on all configurations; see the limitations in [set-up-oslogin.md](./set-up-oslogin.md).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-login/describe-profile (gcloud 593.0.0 help); the source twin itself has no code.
- Source inconsistency: this page says "You can grant OS Login IAM roles at the instance, folder, or organization level." (project is not named), while set-up-oslogin.md says that `roles/compute.osLogin` or `roles/compute.osAdminLogin` is granted "On the Project or instance" and "If a user requires SSH access from Google Cloud console or Google Cloud CLI, you must grant these roles at the project level, or additionally grant a role at the project level that contains the `compute.projects.get` permission."
- Source (set up OS Login): https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/oslogin (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-oslogin.md](./set-up-oslogin.md)
- [access-overview.md](./access-overview.md)
