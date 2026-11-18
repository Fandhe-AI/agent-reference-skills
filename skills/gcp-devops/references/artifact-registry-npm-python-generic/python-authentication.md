---
source: https://docs.cloud.google.com/artifact-registry/docs/python/authentication
---

# Set up authentication for Python package repositories

Authentication is required when a third-party application (pip, Twine) connects to a Python-format Artifact Registry repository. The source says you do not need to configure authentication for Cloud Build or Google Cloud runtimes such as GKE and Cloud Run (verify the required permissions); those environments provide keyless credentials through Application Default Credentials (ADC), but pip or Twine running there still needs a setup that uses them, such as the keyring backend or an access token. Three methods are supported: access tokens (automation, CI/CD, container builds, or environments where the keyring library cannot be installed), the Python keyring library (recommended for local development; refreshes credentials automatically), and password authentication with a service account key.

## Signature / Usage

### Before you begin

Python 3 must be installed and the account must have repository permissions. Initialize the Google Cloud CLI (with an external identity provider, sign in with your federated identity first; run `gcloud components update` if gcloud was installed earlier):

```bash
gcloud init
```

### Generate an access token (valid for 60 minutes)

```bash
export ACCESS_TOKEN="oauth2accesstoken:$(gcloud auth print-access-token)"
```

Without gcloud, using only `oauth2l`:

```bash
go install github.com/google/oauth2l@latest
```

Adapted (not in the official docs): the source writes `"oauth2l fetch --scope cloud-platform"`, which stores the command text instead of running it; command substitution `$(...)` is added so the variable holds the token, with the `oauth2accesstoken:` user name that the gcloud example above also uses.

```bash
export ACCESS_TOKEN="oauth2accesstoken:$(oauth2l fetch --scope cloud-platform)"
```

### Authenticate pip with the token

Adapted (not in the official docs): the index URL is quoted so the shell does not interpret it.

```bash
pip install PACKAGE --index-url "https://$ACCESS_TOKEN@LOCATION-python.pkg.dev/PROJECT/REPOSITORY/simple/"
```

### Authenticate with the keyring backend

```bash
pip install keyring
```

```bash
pip install keyrings.google-artifactregistry-auth
```

```bash
keyring --list-backends
```

The list should include `ChainerBackend(priority:10)` and `GooglePythonAuth(priority: 9)`. Print the repository configuration:

```bash
gcloud artifacts print-settings python --project=PROJECT \
    --repository=REPOSITORY \
    --location=LOCATION
```

Add to `.pypirc` (Linux and macOS: `$HOME/.pypirc`; Windows: `%USERPROFILE%\.pypirc`):

```ini
[distutils]
index-servers =
    PYTHON-REPO-ID

[PYTHON-REPO-ID]
repository = https://LOCATION-python.pkg.dev/PROJECT/REPOSITORY/
```

Add to the pip configuration file (index-only; make sure no `extra-index-url` is configured):

```ini
[global]
index-url = https://LOCATION-python.pkg.dev/PROJECT/REPOSITORY/simple/
```

User credentials with the keyring:

```bash
gcloud auth login
```

Service account with the keyring (Application Default Credentials, recommended):

```bash
export GOOGLE_APPLICATION_CREDENTIALS=KEY-FILE
```

Or sign in to gcloud as the service account:

```bash
gcloud auth activate-service-account --key-file=KEY-FILE
```

### Password authentication with a service account key

```bash
gcloud artifacts print-settings python --project=PROJECT \
    --repository=REPOSITORY \
    --location=LOCATION \
    --json-key=KEY-FILE
```

`.pypirc` entry (do not commit; `KEY` is a placeholder for the base64-encoded key):

```ini
[distutils]
index-servers =
    PYTHON-REPO-ID

[PYTHON-REPO-ID]
repository = https://LOCATION-python.pkg.dev/PROJECT/REPOSITORY/
username: _json_key_base64
password: KEY
```

pip configuration (the key is embedded in the URL; do not commit):

```ini
[global]
index-url = https://_json_key_base64:KEY@LOCATION-python.pkg.dev/PROJECT/REPOSITORY/simple/
```

## Options / Props

| Method | Use when |
|--------|----------|
| Access tokens (valid 60 minutes) | Automation, CI/CD pipelines, container builds, or where installing the keyring library is not supported |
| Python keyring library (recommended for local development) | Developer workstations; credentials refresh automatically |
| Password authentication (service account key) | An application does not support Application Default Credentials but supports username and password |

### pip configuration file locations

| Scope | Locations |
|-------|-----------|
| Unix (per user) | `$HOME/.config/pip/pip.conf` or `$HOME/.pip/pip.conf` |
| macOS (per user) | `/Library/Application Support/pip/pip.conf` or `$HOME/.config/pip/pip.conf` |
| Windows (per user) | `%APPDATA%\pip\pip.ini` or `%USERPROFILE%\pip\pip.ini` |
| Virtual environment, Unix and macOS | `$VIRTUAL_ENV/pip.conf` |
| Virtual environment, Windows | `%VIRTUAL_ENV%\pip.ini` |

### Keyring credential search order

| Order | Source |
|-------|--------|
| 1 | Application Default Credentials (ADC), in ADC's order: the `GOOGLE_APPLICATION_CREDENTIALS` environment variable, then the local credential file created by `gcloud auth application-default login`, then the attached (default) service account of Compute Engine, GKE, Cloud Run, App Engine, or Cloud Run functions from the metadata server |
| 2 | Credentials provided by the Google Cloud CLI (for example from `gcloud auth login` or `gcloud auth activate-service-account`) |

### Placeholders

| Placeholder | Meaning |
|-------------|---------|
| `PYTHON-REPO-ID` | An ID for the repository that tools like Twine can reference |
| `PROJECT` | Project ID; if omitted from `print-settings`, the current or default project is used |
| `REPOSITORY` | Repository ID; the configured default is used when omitted |
| `LOCATION` | Regional or multi-regional location of the repository |
| `KEY-FILE` | Path to the service account JSON key file |
| `KEY` | Base64-encoded key in the service account key file (the source's pip step calls it "the private key in your service account key file") |

## Notes

- Clarified from the official docs: "you don't need to configure authentication" on Cloud Build, GKE or Cloud Run means those environments supply credentials without keys (ADC). Package clients do not read ADC by themselves; configure the client on those runtimes too (keyring backend or token for pip / Twine, a token in `.npmrc` for npm / yarn) and grant the runtime's service account the needed Artifact Registry role.
- Service account keys are long-lived credentials. The source says to use a dedicated service account, grant the minimum Artifact Registry role (for example Reader for a download-only account), grant access at the repository level rather than the project level when groups need different access, and follow best practices for managing credentials. It also says to choose a more secure alternative to service account keys whenever possible; key creation may be disabled for your organization and externally sourced keys must be validated before use.
- `.pypirc` and `pip.conf` / `pip.ini` files that contain a key or token must not be committed to source control; use placeholders in shared files. Passing the token in the pip `--index-url` puts it on the command line and in shell history; access tokens expire after 60 minutes.
- Corrected from the official docs: the oauth2l step was `export ACCESS_TOKEN="oauth2l fetch --scope cloud-platform"` (a literal string, without the `oauth2accesstoken:` user name that the pip `https://$ACCESS_TOKEN@...` URL needs as the user name / password pair) and the pip command's index URL was unquoted.
- Corrected from the official docs: the source lists ADC as the environment variable and then the runtime's default service account, and puts "user credentials from the command `gcloud auth application-default login`" under the gcloud CLI credentials in step 2. That command writes ADC's local credential file, which ADC checks after `GOOGLE_APPLICATION_CREDENTIALS` and before the metadata server (see How Application Default Credentials works in the `gcp-foundation` skill), so a leftover local ADC file on a VM is used instead of the attached service account.
- Keyring: credentials are not stored in your Python project. `GOOGLE_APPLICATION_CREDENTIALS` makes the account explicit and easier to troubleshoot. If you do not use it, verify the accounts ADC might use: the default service account for Compute Engine VMs, GKE nodes and Cloud Run revisions has read-only access to repositories, so you must change permissions to upload from those environments. Avoid `gcloud auth activate-service-account` on Compute Engine VMs because the VM service account is found before gcloud CLI credentials. If service account credentials are found first, they are used instead of your user credentials.
- Dependency confusion: with the keyring section's pip-only setup, the source recommends virtual repositories (priorities on upstream sources) over configuring multiple package indexes, because pip does not search indexes in any particular order and may install a public package with the same name as a private one.
- The `/simple/` suffix means the repository implements the Python Simple Repository API (PEP 503).
- Artifact Registry hosts private PyPI-compatible repositories; pip and Twine behave as upstream documents them.
- Source: https://docs.cloud.google.com/artifact-registry/docs/python/authentication (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [python-manage-packages.md](./python-manage-packages.md)
- [store-python.md](./store-python.md)
- [nodejs-authentication.md](./nodejs-authentication.md)
