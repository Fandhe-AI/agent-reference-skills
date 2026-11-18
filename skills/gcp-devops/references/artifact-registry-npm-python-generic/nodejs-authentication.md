---
source: https://docs.cloud.google.com/artifact-registry/docs/nodejs/authentication
---

# Set up authentication for Node.js package repositories

Authentication for npm-format Artifact Registry repositories is required when a third-party application (npm, yarn) connects to a repository. The source says you do not need to configure authentication for Cloud Build or Google Cloud runtimes such as GKE and Cloud Run (verify that the required permissions are configured); those environments provide keyless credentials through Application Default Credentials (ADC), but npm or yarn running there still needs a setup that uses them, such as an access token in `.npmrc` (for example through `google-artifactregistry-auth`). Node.js supports two methods: access tokens (when a human user manages authentication) and password authentication with a service account key (when an application does not support Application Default Credentials but supports username and password).

## Signature / Usage

### Before you begin

Initialize the Google Cloud CLI (if you use an external identity provider, sign in to gcloud with your federated identity first; run `gcloud components update` if gcloud was installed earlier):

```bash
gcloud init
```

### Generate an access token with gcloud

Access tokens are valid for 60 minutes. Generate one shortly before running commands that interact with repositories.

```bash
export ACCESS_TOKEN="oauth2accesstoken:$(gcloud auth print-access-token)"
```

### Generate an access token without gcloud (oauth2l)

```bash
go install github.com/google/oauth2l@latest
```

Adapted (not in the official docs): the source writes `"oauth2l fetch --scope cloud-platform"`, which stores the command text instead of running it; command substitution `$(...)` is added so the variable holds the token, with the `oauth2accesstoken:` user name that the gcloud example above also uses.

```bash
export ACCESS_TOKEN="oauth2accesstoken:$(oauth2l fetch --scope cloud-platform)"
```

### Password authentication with a service account key

Activate the service account in the current gcloud session (optional):

```bash
gcloud auth activate-service-account ACCOUNT --key-file=KEY-FILE
```

Print the repository configuration (square brackets mark optional flags in the source):

```text
gcloud artifacts print-settings npm [--project=PROJECT] \
[--repository=REPOSITORY] [--location=LOCATION] --scope=@SCOPE-NAME --json-key=KEY-FILE
```

Add the returned settings to the `.npmrc` in each Node.js project (usually next to `package.json`), for projects that publish packages as well as projects that install dependencies. Repeat for each additional repository.

## Options / Props

| Placeholder | Meaning |
|-------------|---------|
| `ACCOUNT` | The user or service account |
| `KEY-FILE` | Path to the service account JSON key file |
| `PROJECT` | Project ID; if omitted, the current or default project is used |
| `REPOSITORY` | Repository ID; if omitted, the configured default repository is used |
| `LOCATION` | Regional or multi-regional location of the repository |
| `SCOPE-NAME` | npm scope associated with the repository |

### Authentication methods

| Method | Use when |
|--------|----------|
| Access tokens (valid 60 minutes) | Authentication in your application is managed by a human user |
| Password authentication (service account key) | An application does not support Application Default Credentials but supports username and password |

## Notes

- Clarified from the official docs: "you don't need to configure authentication" on Cloud Build, GKE or Cloud Run means those environments supply credentials without keys (ADC). Package clients do not read ADC by themselves; configure the client on those runtimes too (keyring backend or token for pip / Twine, a token in `.npmrc` for npm / yarn) and grant the runtime's service account the needed Artifact Registry role.
- Service account keys are long-lived credentials. The source says to use a dedicated service account, grant the minimum Artifact Registry role (for example Artifact Registry Reader for a download-only account), grant access at the repository level rather than the project level when groups need different access to specific repositories, and follow best practices for managing credentials. It also says to choose a more secure alternative to service account keys whenever possible; key creation may be disabled for your organization, and externally sourced keys must be validated before use.
- Corrected from the official docs: the source writes `export ACCESS_TOKEN="oauth2l fetch --scope cloud-platform"` (a literal string, not a command); the oauth2l block above uses `$(...)` and adds the `oauth2accesstoken:` user name to match the gcloud example.
- A `.npmrc` that contains tokens or key material must not be committed to source control. Use placeholders in shared files and keep credentials in the user-level `~/.npmrc`.
- If you do not specify `--scope`, the returned configuration sets the Artifact Registry repository as the default registry, which causes problems when a project also installs packages from the public npm registry (unscoped packages go to the default registry, typically https://www.npmjs.com/). Scopes ensure packages are published and installed from the correct repository.
- The returned settings include a placeholder email address; npm requires an email to publish, and Artifact Registry does not use it for authentication.
- Artifact Registry hosts private npm-compatible repositories; npm itself behaves as upstream documents it.
- The `oauth2l` flow produces a token the source describes as an SHA256 hash token stored in `ACCESS_TOKEN`.
- Source: https://docs.cloud.google.com/artifact-registry/docs/nodejs/authentication (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [nodejs-manage-packages.md](./nodejs-manage-packages.md)
- [store-nodejs.md](./store-nodejs.md)
- [python-authentication.md](./python-authentication.md)
