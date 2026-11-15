---
source: https://docs.cloud.google.com/sdk/docs/authorizing
---

# Authorize the gcloud CLI: account types and user accounts

To access Google Cloud, you will usually have to authorize the Google Cloud CLI. If you're using a Compute Engine instance or Cloud Shell, you're not required to authorize the gcloud CLI. This page covers account types, the choice of authorization type, and authorizing with a Google Account (part 1 of 4 of the official Authorize page).

## Signature / Usage

### Types of accounts

You can use either a user account or a service account.

A **user account** is a Google Cloud account that allows end users to authenticate to your application. For most common use cases, especially interactively using the gcloud CLI, using a user account is best practice.

A **service account** is a Google Cloud account associated with your Google Cloud project and not a specific user. You can use the built-in service account available when using Cloud Run functions, App Engine, Compute Engine, or Google Kubernetes Engine. A service account is recommended to run gcloud CLI scripts on multiple machines.

### Choose an authorization type

Both Google Cloud CLI and Google Cloud use OAuth2 for authentication and authorization.

| Type | Description |
| --- | --- |
| User account | Recommended if you're using the gcloud CLI from the command line or you're writing scripts with the gcloud CLI for use on a single machine. |
| Service account | Recommended if you're installing and setting up the gcloud CLI as part of a machine deployment process in production, or for use on Compute Engine virtual machine instances where all users have access to `root`. |

### Authenticating with a Google Account

| Command | Description |
| --- | --- |
| `gcloud init` | Authorizes access and performs other common setup steps. |
| `gcloud auth login` | Authorizes access only. |

During authorization, these commands obtain account credentials from Google Cloud and store them on the local system. The specified account becomes the active account in your configuration. The gcloud CLI uses the stored credentials to access Google Cloud. You can have any number of accounts with stored credentials for a single gcloud CLI installation, but only one account is active at a time.

#### Run gcloud init

`gcloud init` authorizes access and performs other common setup steps using a web-based authorization flow.

```
gcloud init
```

Or, to prevent the command from automatically opening a web browser:

```
gcloud init --console-only
```

Using the `--console-only` flag is useful if you're running the command on a remote system using `ssh` and do not have access to a browser on that system. You must then manually open the provided URL in a browser on your local system to complete the authorization process. Follow the browser-based authorization flow to authenticate the account and grant access permissions.

#### Run gcloud auth login

Running `gcloud auth login` authorizes the user account only.

Machine with a browser:

```
gcloud auth login
```

Follow the browser-based authorization flow to authenticate the account and grant access permissions.

Machine without a browser, where you can install the gcloud CLI on another machine with a browser (use the `--no-browser` flag):

```
gcloud auth login --no-browser
```

1. Copy the long command that begins with `gcloud auth login --remote-bootstrap="`.
2. Paste and run this command on the command line of a different, trusted machine that has local installations of both a web browser and the gcloud CLI tool version 372.0 or later.
3. Copy the long URL output from the machine with the web browser.
4. Paste the long URL back to the first machine under the prompt, "Enter the output of the above command", and press Enter to complete the authorization.

Machine without a browser, where you cannot install the gcloud CLI on another machine with a browser (use the `--no-launch-browser` flag, which prevents the command from automatically opening a web browser):

```
gcloud auth login --no-launch-browser
```

1. Copy the long URL that begins with `https://accounts.google.com/o/oauth2/auth...`
2. Paste this URL into the browser of a different, trusted machine that has a web browser.
3. Copy the authorization code from the machine with the web browser.
4. Paste the authorization code back to the first machine at the prompt, "Enter verification code", and press Enter to complete the authorization.

If you already have an access token, use one of the following methods to pass it to the gcloud CLI:

- Store the access token in a file and set its path through the `--access-token-file` flag.
- Store the access token in a file and set its path in the `auth/access_token_file` property.
- Set the `CLOUDSDK_AUTH_ACCESS_TOKEN` environment variable to the access token value.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--console-only` | flag (`gcloud init`) | Prevents the command from automatically opening a web browser |
| `--no-browser` | flag (`gcloud auth login`) | Remote-bootstrap flow through a different trusted machine with a browser and gcloud CLI 372.0 or later |
| `--no-launch-browser` | flag (`gcloud auth login`) | Prevents opening a browser; paste URL into a browser elsewhere and enter the verification code |
| `--access-token-file` | flag | Path to a file containing an existing access token |
| `auth/access_token_file` | property | Path to a file containing an access token |
| `CLOUDSDK_AUTH_ACCESS_TOKEN` | environment variable | Access token value |

## Notes

- Scope: this skill covers only the gcloud CLI side of authorization (`gcloud auth ...`, credential storage). ADC concepts, service account keys, impersonation design, and Workload Identity Federation design belong to the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/sdk/docs/authorizing (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [authorizing-workforce-identity-federation.md](./authorizing-workforce-identity-federation.md)
- [authorizing-service-accounts.md](./authorizing-service-accounts.md)
- [authorizing-accounts-credentials.md](./authorizing-accounts-credentials.md)
- [configurations.md](./configurations.md)
