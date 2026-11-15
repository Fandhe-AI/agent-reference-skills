---
source: https://docs.cloud.google.com/docs/authentication/gcloud
---

# Authenticate to the gcloud CLI

Ways to sign in to the Google Cloud CLI, depending on where it runs. For client libraries or third-party tools that support ADC in a local environment, you must separately configure ADC.

## Signature / Usage

### Local environment

For most use cases sign in with user credentials; a service account is also possible. The tool stores access and refresh tokens in your home directory, and any user with access to your file system can use them.

| Credential type | Authentication command | Notes |
|---|---|---|
| User credentials | `gcloud init` (authorizes access and performs other common setup) or `gcloud auth login` (authorizes access only) | gcloud uses your user credentials for all Google APIs. To use a service account for authorization, use service account impersonation. |
| User credentials (Workforce Identity Federation) | `gcloud config set auth/login_config_file WORKFORCE_IDENTITY_FEDERATION_LOGIN_CONFIGURATION_FILE`, then `gcloud auth login` | Lets users managed by a non-Google identity provider access Google Cloud. |
| Service account (Workload Identity Federation) | `gcloud auth login --cred-file=WORKLOAD_IDENTITY_FEDERATION_CREDENTIAL_FILE` | Lets workloads outside Google Cloud access resources. |
| Service account (key) | `gcloud auth login --cred-file=SERVICE_ACCT_KEY` | Not recommended; keys increase risk. Sign in with user credentials and use impersonation instead. |

```
gcloud auth login --cred-file=WORKLOAD_IDENTITY_FEDERATION_CREDENTIAL_FILE
```

### Cloud Shell

No sign-in needed, but you must authorize the use of your account before using development tools; gcloud then uses your user credentials.

### Google Cloud compute resources

On resources such as Compute Engine VMs you don't initialize or sign in; gcloud gets credentials and configuration from the metadata server and uses the attached service account for all Google APIs.

### gcloud CLI authentication configuration vs ADC configuration

`gcloud auth login` authenticates a principal to the gcloud CLI (your *gcloud CLI authentication configuration*). `gcloud auth application-default login` uses the principal you provide to configure ADC for your local environment (your *ADC configuration*). They are distinct and can use the same or different principals. The gcloud CLI does not use ADC to access Google Cloud resources.

| Command | Description |
|---|---|
| `gcloud auth login` | Accepts credentials used to authenticate to and authorize access to Google Cloud services. |
| `gcloud auth application-default login` | Generates a local ADC file based on the credentials you provide. |

## Notes

- Service account keys increase risk; prefer keyless auth (impersonation, Workload Identity Federation, attached service accounts).
- Full gcloud auth command reference is covered by the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/docs/authentication/gcloud (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [service-account-impersonation.md](./service-account-impersonation.md)
- [../adc/set-up-adc.md](../adc/set-up-adc.md)
