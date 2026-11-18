---
source: https://docs.cloud.google.com/assured-open-source-software/docs/download-python-packages
---

# Download Python packages using direct repository access for the free tier

Connect pip directly to the Google-managed Artifact Registry repository that hosts Assured OSS Python packages. This page applies to the free tier only; the premium tier is documented under Security Command Center. Packages that are not in the Assured OSS repository come from PyPI using a second requirements file.

## Signature / Usage

### Before you begin

- Ask an administrator for the Service Account Key Admin role (`roles/iam.serviceAccountKeyAdmin`) on your organization (needed to obtain the base64-encoded service account key string).
- Submit the customer enablement form, validate connectivity, enable the Artifact Registry API for the parent project of the service accounts, and update the Google Cloud CLI:

```bash
gcloud components update
```

### Authenticate with Python keyring (recommended by the source)

```bash
pip install keyring
```

```bash
pip install keyrings.google-artifactregistry-auth
```

List backends; the output must include `ChainerBackend(priority:10)` and `GooglePythonAuth(priority:9)`:

```bash
keyring --list-backends
```

Set up Application Default Credentials so the credential helper obtains your key.

### Authenticate with a service account key

Replace the package repository URL `https://us-python.pkg.dev/cloud-aoss/cloud-aoss-python/simple` with:

```text
https://_json_key_base64:$BASE64_KEY@us-python.pkg.dev/cloud-aoss/cloud-aoss-python/simple
```

### Install packages

Create `requirements-google.txt` (packages from Assured OSS, with hashes):

```text
# Packages present in Google's Artifact Registry

urllib3==1.26.11 --hash=sha256:1cffe1aa066363a75c856f261c8fce62d87f7c40ce0f46453ea12bf652b12a13
jsonschema==4.13.0 --hash=sha256:29895bfe55b93b75552fbdd1e09aa0c82b7c1c9395d4f267e10c7d43cd31a74e
```

Create `requirements-pypi.txt` (so pip fetches dependencies, and any packages not in Assured OSS, from PyPI):

```text
# Packages present in Google's Artifact Registry are mentioned here so that pip
# downloads their dependencies from PyPI.

urllib3==1.26.11
jsonschema==4.13.0

# Below this comment, add any package version which you need but is NOT
# present in Google's Artifact Registry and therefore needs to be downloaded from
# PyPI.
```

Adapted (not in the official docs): the index URL is double-quoted and the key expanded as `${BASE64_KEY}` so the URL stays one argument.

```bash
pip install --require-hashes --requirement=requirements-google.txt \
    --index-url "https://_json_key_base64:${BASE64_KEY}@us-python.pkg.dev/cloud-aoss/cloud-aoss-python/simple" -v \
    --no-deps
```

```bash
pip install --requirement=requirements-pypi.txt --index-url https://pypi.org/simple -v
```

### Single URL (Preview)

```text
https://us-python.pkg.dev/cloud-aoss/python/simple
```

### Generate `requirements-google.txt`

Authenticate to the bucket and download the generator script and its README:

```bash
gcloud auth activate-service-account --key-file KEY_FILE
```

```bash
gcloud storage cp gs://cloud-aoss/utils/python-requirements-txt/v1.0/generator.sh PATH_TO_LOCAL_STORE --recursive
```

```bash
gcloud storage cp gs://cloud-aoss/utils/python-requirements-txt/v1.0/README.md PATH_TO_LOCAL_STORE --recursive
```

Run it (second form writes package information to a CSV file):

```bash
chmod +x generator.sh
./generator.sh
```

```bash
chmod +x generator.sh
./generator.sh -i
```

Or download per-artifact hashes from `gs://cloud-aoss/python/PACKAGE_NAME/VERSION` and combine them:

```bash
gcloud storage cp gs://cloud-aoss/python/PACKAGE_NAME/VERSION PATH_TO_LOCAL_STORE --recursive
```

```text
bleach==5.0.0 \
 --hash=sha256:6d286e765bfd3e309209cfa1d063e4d46afa966dea8cb97431c02b1e3067d812
```

## Options / Props

### Requirements and pip flags

| Name | Description |
|------|-------------|
| `--require-hashes` | Optional; if included, hashes must be specified for all packages and versions in the requirements file |
| `-v` | Optional; more output. The source recommends pinning dependencies with SHA-256 hashes for security and reproducibility |
| `--no-deps` | Used for the Assured OSS install; dependencies come from the `requirements-pypi.txt` install |
| `BASE64_KEY` | Base64-encoded service account JSON key as a single line |

### generator.sh

| Item | Detail |
|------|--------|
| Output | One `requirements-google.txt` with all Assured OSS Python packages and hashes for Linux that satisfy the Python version, machine architecture and operating system constraints; delete versions you do not need |
| Location | `gs://cloud-aoss/utils/python-requirements-txt/v1.0` |

## Notes

- Service account keys are a security risk if not managed correctly; choose a more secure alternative where possible. If you must use a key, you are responsible for its security (see Best practices for managing service account keys). Key creation might be disabled by organization policy, and externally sourced keys must be validated before use.
- `$BASE64_KEY` embedded in the index URL can end up in shell history, process lists and `pip -v` output. Do not print it in shared terminals or CI logs, and do not commit the key or its encoded form; prefer the keyring method.
- Run `generator.sh` only after verifying its signature (see [verify-packages.md](./verify-packages.md)): it is downloaded from a bucket and executed.
- Adding `gcloud auth activate-service-account` switches the active gcloud account; the source uses it to access the bucket.
- The single URL feature falls back to canonical public repositories such as PyPI or Maven Central when a package is not in Assured OSS; the source marks it as Preview.
- To list all Python packages in Assured OSS, the source points to the Artifact Registry API `pythonPackages.list` method.
- Adapted from the official docs: the `pip install` command expands `$BASE64_KEY` unquoted inside `--index-url`; the sample quotes the whole URL and uses `${BASE64_KEY}`. The key must still be a single line (see `BASE64_KEY` under Options / Props).
- Source: https://docs.cloud.google.com/assured-open-source-software/docs/download-python-packages (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [assured-oss-overview.md](./assured-oss-overview.md)
- [enable-assured-oss.md](./enable-assured-oss.md)
- [remote-repository-access.md](./remote-repository-access.md)
- [access-metadata-using-container-analysis.md](./access-metadata-using-container-analysis.md)
