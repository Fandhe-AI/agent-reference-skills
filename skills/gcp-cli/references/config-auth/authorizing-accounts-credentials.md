---
source: https://docs.cloud.google.com/sdk/docs/authorizing
---

# Authorize the gcloud CLI: manage accounts and credential files

Listing, switching and revoking accounts, session length, locating credential files, and the `gcloud auth application-default` command group. Part 4 of 4 of the official Authorize page.

## Signature / Usage

### List accounts

To list the accounts whose credentials are stored on the local system:

```
gcloud auth list
```

The gcloud CLI lists the accounts and shows which account is active:

```sh
Credentialed accounts:
 - user-1@gmail.com (active)
 - user-2@gmail.com
```

### Switch the active account

```
gcloud config set account ACCOUNT
```

where `[ACCOUNT]` is the full email address of the account. You can also switch accounts by creating a separate configuration that specifies the different account and switching between configurations:

```
gcloud config configurations activate CONFIGURATION
```

To switch the account on a per-invocation basis, override the active account using the `--account` flag.

### Set authorized session length

As an administrator, you can control how long different users can access the gcloud CLI without having to re-authenticate. For example, you can force users with elevated privileges to re-authenticate more frequently than regular users. See "Set session length for Google Cloud services" (https://support.google.com/a/answer/9368756).

### Revoke credentials for an account

You can revoke credentials when you want to disallow access by the gcloud CLI by a particular account. You don't need to revoke credentials to switch between accounts.

> **Warning:** revoking removes the stored credential for that account from this machine; you need to authorize the account again to use it.

```
gcloud auth revoke ACCOUNT
```

To revoke all access for the gcloud CLI for **all** machines, remove the gcloud CLI from the list of apps that have access to your account (https://security.google.com/settings/security/permissions).

### Find your credential files

```
gcloud info
```

The gcloud CLI prints information about your installation. Credential files are stored in the user configuration directory:

```
User Config Directory: [/home/USERNAME/.config/gcloud]
```

### Set up Application Default Credentials

The gcloud CLI supports managing Application Default Credentials (ADC) with the `gcloud auth application-default` command group. To make user credentials available to ADC:

```
gcloud auth application-default login
```

These credentials are not used by the gcloud CLI. For more ways to set up ADC, see Set up Application Default Credentials (https://docs.cloud.google.com/docs/authentication/provide-credentials-adc).

Note: you might have configurations in your environment to make different credentials available to ADC. If the `gcloud auth application-default` command group results in unexpected credentials, unset these configurations and try again with the following commands:

```
unset GOOGLE_APPLICATION_CREDENTIALS
gcloud config unset auth/impersonate_service_account
gcloud auth application-default login
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `account` | property (`core`) | Active account, set with `gcloud config set account ACCOUNT` |
| `--account` | global flag | Overrides the active account per invocation |
| `GOOGLE_APPLICATION_CREDENTIALS` | environment variable | ADC credential location; unset when ADC gives unexpected credentials |

## Notes

- Scope: ADC concepts (search order, credential types) belong to the `gcp-foundation` skill; this page covers only the `gcloud auth application-default` commands and the gcloud CLI credential storage location. Credentials made available to ADC are not used by the gcloud CLI itself.
- The user config directory is typically `~/.config/gcloud` (see configurations.md; override with `CLOUDSDK_CONFIG`).
- Source: https://docs.cloud.google.com/sdk/docs/authorizing (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [authorizing-user-account.md](./authorizing-user-account.md)
- [authorizing-service-accounts.md](./authorizing-service-accounts.md)
- [configurations.md](./configurations.md)
- [cheatsheet.md](./cheatsheet.md)
