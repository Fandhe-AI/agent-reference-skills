---
source: https://docs.cloud.google.com/sdk/docs/authorizing
---

# Authorize the gcloud CLI: service accounts

`gcloud auth login` can authorize access with a service account by using a credential file stored on your local file system. This credential can be a user credential with permission to impersonate the service account, a credential configuration file for Workload Identity Federation, or a service account key. Part 3 of 4 of the official Authorize page.

## Signature / Usage

### Authorize a service account using service account impersonation

1. In the Google Cloud console, go to the Service Accounts page.
2. Choose an existing account or create a new account by clicking **Create service account**.
3. Ask your administrator to grant you the Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) IAM role on the service account. This predefined role contains the `iam.serviceAccounts.getAccessToken` permission, which is required to impersonate a service account. You might also be able to get this permission with custom roles or other predefined roles.
4. Authorize the gcloud CLI with your user identity by running `gcloud auth login`.
5. To set up the gcloud CLI to use the identity and access provided by a service account by default:

```
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

6. To stop using impersonated service account credentials with the gcloud CLI by default:

```
gcloud config unset auth/impersonate_service_account
```

### Authorize a service account using Workload Identity Federation

1. In the Google Cloud console, go to the Service Accounts page.
2. Choose an existing account or create a new account by clicking **Create service account**.
3. Create a credential configuration file for Workload Identity Federation by following the directions for your supported identity provider.
4. To activate your service account, run `gcloud auth login` with the `--cred-file` flag:

```
gcloud auth login --cred-file=CONFIGURATION_FILE
```

Replace `CONFIGURATION_FILE` with the path to a credential configuration file for Workload Identity Federation.

### Authorize a service account using a service account key

Note: service account keys are a security risk if not managed correctly. Choose a more secure alternative to service account keys whenever possible. If you must authenticate with a service account key, you are responsible for the security of the private key and for other operations described by Best practices for managing service account keys. If you are prevented from creating a key, key creation might be disabled for your organization (secure-by-default organizations). If you acquired the key from an external source, you must validate it before use (Security requirements for externally sourced credentials).

1. In the Google Cloud console, go to the Service Accounts page.
2. Choose an existing account or create a new account by clicking **Create service account**.
3. To create service account keys, see the IAM instructions to Create a service account key.
4. To activate your service account, run `gcloud auth login` with the `--cred-file` flag:

```
gcloud auth login --cred-file=KEY_FILE
```

Replace `KEY_FILE` with the path to a service account key file.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `auth/impersonate_service_account` | property | Service account the gcloud CLI impersonates by default |
| `--cred-file` | flag (`gcloud auth login`) | Credential configuration file (Workload Identity Federation) or service account key file |
| `roles/iam.serviceAccountTokenCreator` | IAM role | Required (via `iam.serviceAccounts.getAccessToken`) to impersonate a service account |

## Notes

- Scope: this page covers only the gcloud CLI side. Service account key lifecycle, impersonation design, and Workload Identity Federation setup belong to the `gcp-foundation` skill.
- The scripting page uses a different command for key files, `gcloud auth activate-service-account --key-file [KEY_FILE]` (see scripting-gcloud.md); the cheatsheet lists it as "similar to `gcloud auth login` but with service account credentials".
- Source: https://docs.cloud.google.com/sdk/docs/authorizing (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [authorizing-user-account.md](./authorizing-user-account.md)
- [authorizing-workforce-identity-federation.md](./authorizing-workforce-identity-federation.md)
- [authorizing-accounts-credentials.md](./authorizing-accounts-credentials.md)
- [scripting-gcloud.md](./scripting-gcloud.md)
