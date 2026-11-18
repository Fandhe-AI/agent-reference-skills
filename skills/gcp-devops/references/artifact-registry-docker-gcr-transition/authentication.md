---
source: https://docs.cloud.google.com/artifact-registry/docs/docker/authentication
---

# Set Up Authentication for Docker

Docker authentication for Artifact Registry lets you push and pull images from a workstation or external environment. Four methods exist: the gcloud CLI credential helper, the standalone Docker credential helper, a short-lived access token, and a service account key. No authentication setup is needed for Cloud Build or Google Cloud runtimes such as GKE and Cloud Run, but the runtime identity still needs the required Artifact Registry permissions.

## Signature / Usage

### gcloud CLI credential helper

Sign in as the user that runs Docker. With user credentials:

```bash
gcloud auth login
```

With a service account (the key file is a long-lived credential, see Notes):

```bash
gcloud auth activate-service-account ACCOUNT --key-file=KEY-FILE
```

Add the repository hostnames to the Docker configuration (comma-separated):

```bash
gcloud auth configure-docker us-west1-docker.pkg.dev,asia-northeast1-docker.pkg.dev
```

List supported repository locations:

```bash
gcloud artifacts locations list
```

If you run Docker on Linux with `sudo`, Docker reads `/root/.docker/config.json`, so configure credentials with `sudo gcloud auth configure-docker` instead.

### Standalone credential helper

For systems without the gcloud CLI; uses Application Default Credentials (ADC). Download the helper (the source pins `VERSION=2.1.29`):

```bash
VERSION=2.1.29
OS=linux  # or "darwin" for OSX, "windows" for Windows.
ARCH=amd64  # or "386" for 32-bit OSs

curl -fsSL "https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v${VERSION}/docker-credential-gcr_${OS}_${ARCH}-${VERSION}.tar.gz" \
| tar xz docker-credential-gcr \
&& chmod +x docker-credential-gcr && sudo mv docker-credential-gcr /usr/bin/
```

Configure Docker once:

```bash
docker-credential-gcr configure-docker --registries=us-west1-docker.pkg.dev,asia-northeast1-docker.pkg.dev
```

Verify the helper can retrieve credentials:

```bash
echo "https://us-west1-docker.pkg.dev" | docker-credential-gcr get
```

Successful output contains a token in the `Secret` field:

```text
{"ServerURL":"https://us-west1-docker.pkg.dev","Username":"_dcgcr_2_0_0_token","Secret":"ya29..."}
```

With `sudo docker`, use `sudo docker-credential-gcr configure-docker` instead.

### Access token (short-lived, 60 minutes)

Requires `roles/iam.serviceAccountTokenCreator` to impersonate the service account. Linux:

```bash
gcloud auth print-access-token \
    --impersonate-service-account ACCOUNT | docker login \
    -u oauth2accesstoken \
    --password-stdin https://LOCATION-docker.pkg.dev
```

Windows:

```text
gcloud auth print-access-token --impersonate-service-account ACCOUNT | docker login -u oauth2accesstoken --password-stdin https://LOCATION-docker.pkg.dev
```

### Service account key (least secure)

Optionally base64-encode the key file. Linux:

```bash
base64 FILE-NAME > NEW-FILE-NAME
```

macOS:

```bash
base64 -i FILE-NAME -o NEW-FILE-NAME
```

Windows:

```text
Base64.exe -e FILE-NAME > NEW-FILE-NAME
```

Log in with the key. Linux / macOS:

```bash
cat KEY-FILE | docker login -u KEY-TYPE --password-stdin \
https://LOCATION-docker.pkg.dev
```

Windows (PowerShell):

```text
Get-Content KEY-FILE |
docker login -u KEY-TYPE --password-stdin https://LOCATION-docker.pkg.dev
```

## Options / Props

### Authentication methods

| Method | Description |
|--------|-------------|
| gcloud CLI credential helper | Simplest; uses the active user or service account of the gcloud session; can be significantly slower than the standalone helper |
| Standalone Docker credential helper | For systems without gcloud CLI; significantly faster; uses ADC; recommended for automated builds with third-party tools and Docker clients with many configured registry hosts |
| Access token | Short-lived OAuth token for a service account, valid 60 minutes; safer than a key |
| Service account key | User-managed long-lived key pair; the least secure method |

### Docker `config.json` sections

| Section | Contents |
|---------|----------|
| `credHelpers` | Credential helper settings (gcloud or standalone helper) |
| `auths` | Base64-encoded credentials stored when you `docker login` with a token or service account key |
| `credStore` | Settings of a configured credential store |

Config file paths: Linux `~/.docker/config.json`, Windows `%USERPROFILE%\.docker\config.json`. Docker checks first for a credential helper associated with the host; if `credHelpers` and `auths` both hold Artifact Registry settings, `auths` is ignored.

### Placeholders

| Name | Description |
|------|-------------|
| `HOSTNAME-LIST` | Comma-separated repository hostnames to add to the credential helper configuration |
| `ACCOUNT` | Service account email (`USERNAME@PROJECT-ID.iam.gserviceaccount.com`); list with `gcloud iam service-accounts list` |
| `KEY-FILE` | Service account key file (JSON) |
| `KEY-TYPE` | `_json_key` for the JSON key as provided; `_json_key_base64` if you base64-encoded the entire file |
| `LOCATION` | Regional or multi-regional location of the repository |

## Notes

- Service account keys are long-lived credentials and a security risk if not managed correctly. The source says to choose a more secure alternative (access token or credential helper) whenever possible; if you must use a key, follow "Best practices for managing service account keys", validate keys acquired from an external source, and note that key creation may be disabled for your organization (secure-by-default organization resources).
- The verification command `docker-credential-gcr get` prints a live access token in the `Secret` field; do not paste the output into tickets or logs.
- Base64-encoding a key writes a second copy of the key to `NEW-FILE-NAME`; restrict its permissions (for example `chmod 600 NEW-FILE-NAME` on Linux / macOS) and delete both files when they are no longer needed.
- Do not commit key files or `~/.docker/config.json` (the `auths` section holds your credentials in base64).
- For key use: create dedicated service accounts used only for repositories, grant the specific Artifact Registry role (a download-only account needs only Artifact Registry Reader), and set permissions per repository rather than at project level. With the Compute Engine service account, configure both permissions and access scopes.
- The access token is valid 60 minutes; request it less than an hour before use. Long uploads should use another method.
- The Docker credential helper is only supported for Docker 18.03 or later; earlier clients slow down `docker build` dramatically when credential helpers are configured.
- Docker credential helpers must be in the system `PATH` (`gcloud` or `docker-credential-gcr`). The credentials are saved in the user home directory.
- The standalone helper download is a third-party GitHub release; the source's example pipes into `tar`, not a shell.
- The source recommends using a service account rather than a user account for the authenticated identity.
- Docker security group membership is root-equivalent; only add trusted users.
- Service accounts, ADC and Workforce / workload identity federation are covered by `gcp-foundation`.
- The source also shows Docker group setup for Linux / Windows and Console links.
- Source: https://docs.cloud.google.com/artifact-registry/docs/docker/authentication (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [pushing-and-pulling.md](./pushing-and-pulling.md)
- [troubleshoot.md](./troubleshoot.md)
- [names.md](./names.md)
