---
source: https://docs.cloud.google.com/docs/authentication/troubleshoot-adc
---

# Troubleshoot Application Default Credentials

Common problems when using ADC and how to resolve them.

## Signature / Usage

### User credentials not working

Errors about user credentials not supported by the API, the API not enabled in the project, or no quota project set. There are two kinds of APIs: resource-based APIs (billing and quota use the project of the resources accessed) and client-based APIs (use the project associated with the client). With user credentials on a client-based API you must specify a quota project. Options:

Update the ADC file to use a different project as the quota project:

```
gcloud auth application-default set-quota-project YOUR_PROJECT
```

If calling the API via the gcloud CLI, set it in gcloud config:

```
gcloud config set billing/quota_project YOUR_PROJECT
```

For REST or RPC calls, use the `x-goog-user-project` HTTP header in each request.

The API must be enabled in whichever project you specify. You need the `serviceusage.services.use` permission (included in the Service Usage Consumer role) on a project to designate it as the billing project.

### Incorrect credentials

If credentials don't give the expected access or aren't found:

- With the gcloud CLI locally, you use credentials provided via `gcloud auth login`, not those provided to ADC.
- Set `GOOGLE_APPLICATION_CREDENTIALS` only if you use a service account key or other JSON file for ADC. The pointed-to credentials take precedence over other credentials, including Workload Identity Federation for GKE.
- Confirm the principal has the required IAM roles (granted to the user's email for user credentials; to the service account for service accounts).
- An API key supplied with the request takes precedence over ADC in any location. If `GOOGLE_APPLICATION_CREDENTIALS` is set and you use an API key, the API might warn that the ADC credentials are being ignored; unset the variable to stop the warning.

### Unrecognized credential type

Error text: `Error creating credential from JSON. Unrecognized credential type`. Make sure you are using a valid credential. Client ID files are not supported to provide credentials for ADC.

### Error for local credentials from service account impersonation

Not all authentication libraries support local ADC files created by impersonation. An error such as `Neither metadata server or valid service account credentials are found` means you can't use local impersonated credentials for this task. Create the ADC file from user credentials, or run the code in an environment with a metadata server (such as Compute Engine).

### Unknown project `764086051850` used for request

That project is used by the gcloud CLI. Seeing it in authentication errors means you are using a client-based API and have not set both your project and your quota project for your configuration. See "User credentials not working".

### Access blocked when using scopes

An error such as `This app is blocked` or `Access blocked: Authorization Error` when creating a local ADC file means you may be using scopes unsupported by the default ADC setup command, typically scopes for apps outside Google Cloud such as Google Drive. By default, tokens from a user-credential local ADC file have the `https://www.googleapis.com/auth/cloud-platform` scope; use `--scopes` to specify others. For non-Google Cloud scopes: create an OAuth client ID and use `--client-id-file` with `--scopes`, or impersonate a service account with `--impersonate-service-account` and `--scopes`.

## Notes

- Related: Quota project overview and Set the quota project (docs.cloud.google.com/docs/quotas).
- Source: https://docs.cloud.google.com/docs/authentication/troubleshoot-adc (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [how-adc-works.md](./how-adc-works.md)
- [set-up-adc.md](./set-up-adc.md)
- [rest-authentication.md](../credentials-and-tokens/rest-authentication.md)
