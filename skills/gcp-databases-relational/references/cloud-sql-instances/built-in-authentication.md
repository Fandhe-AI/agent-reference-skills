---
source: https://docs.cloud.google.com/sql/docs/postgres/built-in-authentication
---

# Built-in authentication

How built-in (username and password) authentication works on Cloud SQL instances, and how instance-level and user-level password policies are applied.

## Signature / Usage

Built-in users authenticate with a username and password. Set the password of a built-in user; gcloud prompts for the password so it is not stored in shell history. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-manage-users:

```bash
gcloud sql users set-password postgres \
--instance=INSTANCE_NAME \
--prompt-for-password
```

The instance password policy can be set when you create the instance and edited later with `gcloud sql instances patch` (flags `--enable-password-policy`, `--password-policy-min-length`, `--password-policy-complexity`, `--password-policy-reuse-interval`, `--password-policy-disallow-username-substring`, `--password-policy-password-change-interval`; see the create-instance page).

## Options / Props

### Instance password policy options

| Option | Meaning |
|---|---|
| Minimum length | Minimum number of characters |
| Password complexity | Combination of lowercase, uppercase, numeric and non-alphanumeric characters |
| Restrict password reuse | Number of previous passwords that cannot be reused |
| Disallow username | Prevents the username inside the password |
| Set password change interval | Minimum duration after which the password can be changed |

### User password policy options (set when creating or modifying a user)

| Option | Meaning |
|---|---|
| Set password to expire | Number of days after which the password expires |
| Lock after failed attempts | Number of incorrect attempts before the account is locked |

## Notes

- Cloud SQL authenticates database users either with built-in authentication (this page) or IAM database authentication; IAM is described as more secure and reliable, and a hybrid model is allowed.
- Password policies do not apply to hashed passwords.
- A password policy must be enabled explicitly at instance level and can be edited later; once enabled, statements that create users or change passwords incur extra latency, usually under 200 ms.
- Expired or locked status is visible when listing users; users can be unlocked and passwords changed from the Users page.
- Read replicas: policies are managed on the primary and cannot be changed on replicas. After promoting an instance, re-enable the instance password policy and its options (promotion is disruptive; try it on a disposable instance first).
- The source page has no code blocks. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-manage-users (the `--prompt-for-password` form, character echo disabled; https://docs.cloud.google.com/sql/docs/postgres/users shows the same command with `--password=PASSWORD`); the flag names come from https://docs.cloud.google.com/sql/docs/postgres/create-instance. A password passed with `--password` ends up in shell history; use `--prompt-for-password` and never put a real password in the command.
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-manage-users (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Managed PostgreSQL on Google Cloud; distinct from Supabase Auth (`supabase`), which is application-level auth.
- Source: https://docs.cloud.google.com/sql/docs/postgres/users (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/built-in-authentication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [users.md](./users.md)
- [create-instance.md](./create-instance.md)
- Edit an instance: https://docs.cloud.google.com/sql/docs/postgres/edit-instance
- Create users with built-in authentication: https://docs.cloud.google.com/sql/docs/postgres/create-manage-users
