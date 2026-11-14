---
source: https://docs.cloud.google.com/docs/authentication/application-default-credentials
---

# How Application Default Credentials works

Application Default Credentials (ADC) is a strategy used by the authentication libraries to automatically find credentials based on the application environment. The libraries make those credentials available to Cloud Client Libraries and Google API Client Libraries, so code can run in development or production without changing how it authenticates.

## Signature / Usage

ADC searches for credentials in this order:

1. `GOOGLE_APPLICATION_CREDENTIALS` environment variable
2. A credential file created by using the `gcloud auth application-default login` command
3. The attached service account, returned by the metadata server

The order is not related to the relative merit of each location.

Snippet taken from https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment (see `set-up-adc.md`):

```bash
gcloud auth application-default login
```

### GOOGLE_APPLICATION_CREDENTIALS environment variable

The variable provides the location of a credential JSON file. The file can be one of:

- A credential configuration file for Workforce Identity Federation (external IdP authenticates and authorizes users).
- A credential configuration file for Workload Identity Federation (external IdP authenticates and authorizes workloads).
- A service account key. Service account keys create a security risk and are not recommended. Unlike the other credential file types, a compromised key can be used by a bad actor without any additional information.

### Local ADC file (`gcloud auth application-default login`)

The command creates a JSON file containing the credentials you provide (from your user account or from impersonating a service account) in a well-known location:

- Linux, macOS: `$HOME/.config/gcloud/application_default_credentials.json`
- Windows: `%APPDATA%\gcloud\application_default_credentials.json`

The credentials provided to ADC are distinct from your gcloud CLI credentials (those used by the gcloud CLI itself to authenticate to Google Cloud).

By default, access tokens generated from a local ADC file created with user credentials include the cloud-wide scope `https://www.googleapis.com/auth/cloud-platform`. To specify scopes explicitly, use the `--scopes` flag of `gcloud auth application-default login`.

To add scopes for services outside of Google Cloud, such as Google Drive, do one of the following:

- **OAuth authentication**: create an OAuth client ID, pass it with `--client-id-file`, and specify scopes with `--scopes`.
- **Service account authentication**: create a service account, impersonate it by passing its email to `gcloud auth application-default login` with `--impersonate-service-account`, and specify scopes with `--scopes`.

### The attached service account

If ADC finds no usable credentials in `GOOGLE_APPLICATION_CREDENTIALS` or the well-known local file location, it uses the metadata server to get credentials for the service where the code is running.

Using the attached service account is the preferred method in a production environment on Google Cloud:

1. Create a user-managed service account.
2. Grant that service account the least privileged IAM roles possible.
3. Attach the service account to the resource where your code is running.

## Notes

- Service account keys are a security risk; prefer keyless authentication (attached service account, Workload Identity Federation, impersonation).
- Related Google Cloud docs pages referenced: "Set up Application Default Credentials", "Creating and managing service accounts", "Attaching a service account to a resource", "Choose predefined roles".
- Client-library code for ADC lives in the `gcp-client-libraries` skill; `gcloud auth` commands live in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/docs/authentication/application-default-credentials (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-adc.md](./set-up-adc.md)
- [troubleshoot-adc.md](./troubleshoot-adc.md)
- [service-account-impersonation.md](../credentials-and-tokens/service-account-impersonation.md)
