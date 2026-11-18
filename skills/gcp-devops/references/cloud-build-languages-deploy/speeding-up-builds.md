---
source: https://docs.cloud.google.com/build/docs/optimize-builds/speeding-up-builds
---

# Speed up builds

Best practices: build leaner containers, cache Docker layers with `--cache-from`, cache directories in Cloud Storage, and exclude unneeded files from upload with `.gcloudignore`.

## Signature / Usage

### Use a cached Docker image

The `docker pull` step uses `entrypoint: bash` and `|| exit 0` so the first build, which has no image to pull, does not fail.

Adapted (not in the official docs): the source omits the comma after the `--cache-from` image argument, which is invalid YAML; the comma is added.

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  entrypoint: 'bash'
  args: ['-c', 'docker pull ${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/${_IMAGE}:latest || exit 0']
- name: 'gcr.io/cloud-builders/docker'
  args: [
            'build',
            '-t', '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/${_IMAGE}:latest',
            '--cache-from', '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/${_IMAGE}:latest',
            '.'
        ]
images: ['${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/${_IMAGE}:latest']
```

Adapted (not in the official docs): the example config uses `${_LOCATION}`, `${_REPOSITORY}` and `${_IMAGE}`, which the source's command does not define; the command passes them with `--substitutions`.

```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_LOCATION=us-east1,_REPOSITORY=my-repo,_IMAGE=my-image .
```

### Cache directories in Cloud Storage

Works with any builder. Use when the build is long and produces few files.

Adapted (not in the official docs): the source indents `args:` deeper than `name:` in each step, which is invalid YAML; indentation is normalized. The source's comment line between the steps is kept.

```yaml
steps:
- name: gcr.io/cloud-builders/gcloud
  args: ['storage', 'cp', 'gs://mybucket/results.zip', 'previous_results.zip']
# operations that use previous_results.zip and produce new_results.zip
- name: gcr.io/cloud-builders/gcloud
  args: ['storage', 'cp', 'new_results.zip', 'gs://mybucket/results.zip']
```

### Exclude files with `.gcloudignore`

For builds triggered from a Cloud Build trigger the code directory is uploaded; exclude documentation, generated code, binaries, `*.jar` files, compiled assets and vendored dependencies. Create `.gcloudignore` in the project root:

```text
.git
dist
node_modules
vendor
*.jar
```

## Options / Props

| Technique | Applies to | Caveats |
|-----------|------------|---------|
| `--cache-from` | Docker builds only | Needs a previously built image; the cached image is pulled from a registry (adds time); rebuilds every layer from the first changed layer, so no benefit if an early layer changes |
| Cloud Storage directory cache | Any Cloud Build builder | Best when the build is long and the cached results are small |
| `.gcloudignore` | Uploaded source | Also gives a more consistent build and lowers the risk of deploying code still in development |

## Notes

- The source recommends always using `--cache-from`.
- The example caches from the mutable `:latest` tag, so the build trusts whatever image currently has that tag; limit who can push to the repository.
- Adapted from the official docs: the source runs `gcloud builds submit --config cloudbuild.yaml .` without defining `_LOCATION`, `_REPOSITORY` and `_IMAGE`; the command now passes them with `--substitutions`.
- Corrected from the official docs: missing comma after the `--cache-from` value and `args:` indentation in the Cloud Storage cache.
- The source also shows JSON forms (the Cloud Storage JSON contains a `//` comment, which is invalid JSON) and links to Building leaner containers and Increase vCPU for builds.
- Source: https://docs.cloud.google.com/build/docs/optimize-builds/speeding-up-builds (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [build-containers.md](./build-containers.md)
- Building leaner containers: https://docs.cloud.google.com/build/docs/building-leaner-containers
- Increase vCPU for builds: https://docs.cloud.google.com/build/docs/optimize-builds/increase-vcpu-for-builds
