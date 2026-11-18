---
source: https://docs.cloud.google.com/build/docs/configuring-builds/configure-build-step-order
---

# Configure build step order

By default build steps run sequentially. Use `waitFor` (with step `id` values) to make steps run concurrently or to depend on specific steps. A step launches only after every `id` in its `waitFor` has completed successfully.

## Signature / Usage

### Serial steps (default)

```yaml
steps:
- name: foo
- name: bar
```

### Two concurrent steps, then a third

Steps `A` and `B` run at build start (`-`); the third step waits implicitly for both. The `id` fields are not referenced and could be omitted.

```yaml
steps:
- name: foo
  id: A
- name: bar
  id: B
  waitFor: ['-']
- name: baz
```

### Concurrent steps after a previous step

Step `A` runs first; `B` and `C` run concurrently after `A` succeeds.

```yaml
steps:
- name: foo
  id: A
- name: bar
  id: B
  waitFor:
  - A
- name: baz
  id: C
  waitFor:
  - A
```

### Parallel download, then run

Adapted (not in the official docs): `wget` saves the file without the execute bit, so the last step checks the download against a known SHA-256 digest (`BINARY_SHA256`), runs `chmod +x` and then the binary.

```yaml
steps:
# Download the binary and the data in parallel.
- name: 'gcr.io/cloud-builders/wget'
  args: ['https://example.com/binary']
- name: 'gcr.io/cloud-builders/gcloud'
  args: ['storage', 'cp', 'gs://$PROJECT_ID-data/rawdata.tgz', '.']
  waitFor: ['-']  # The '-' indicates that this step begins immediately.

# Run the binary on the data, once both are downloaded.
- name: 'ubuntu'
  entrypoint: 'bash'
  args:
  - '-c'
  - 'echo "BINARY_SHA256  binary" | sha256sum -c - && chmod +x ./binary && ./binary rawdata.tgz'
```

### Named dependencies with `id`

`fetch-resources` (copying files with `gcloud storage`) runs concurrently with the `go` steps; the `docker` step builds after both `go-install` and `fetch-resources`.

```yaml
steps:
- name: 'gcr.io/cloud-builders/go'
  args: ['generate']
- name: 'gcr.io/cloud-builders/go'
  args: ['test', './...']
- name: 'gcr.io/cloud-builders/go'
  args: ['install', 'mytarget']
  id: 'go-install'

- name: 'gcr.io/cloud-builders/gcloud'
  args: ['storage', 'cp', '-r', './somefiles', 'gs://my-resource-bucket/somefiles']
  waitFor: ['-']  # The '-' indicates that this step begins immediately.
  id: 'fetch-resources'

- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'gcr.io/$PROJECT_ID/mytarget', '.']
  waitFor: ['go-install', 'fetch-resources']

images: ['gcr.io/$PROJECT_ID/mytarget']
```

## Options / Props

| `waitFor` value | Behavior |
|-----------------|----------|
| omitted or empty | Step waits for all prior steps to complete successfully. If no step uses an `id` in `waitFor`, all steps run serially in the order defined. |
| `['-']` | Step depends only on the start of the build and runs immediately. The first step defined depends implicitly on start. |
| list of step `id` values | Step waits until each listed step has completed successfully. |

## Notes

- Adapted from the official docs: the source's last step runs `['./binary', 'rawdata.tgz']` right after `wget`. A file that `wget` creates is not executable, so that step fails with permission denied; the example verifies the file with `sha256sum -c` (replace `BINARY_SHA256` with the publisher's digest) and adds `chmod +x` before running it. `https://example.com/binary` is the source's placeholder URL.
- Source: https://docs.cloud.google.com/build/docs/configuring-builds/configure-build-step-order (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Steps must be defined with the `id` field before they are used as `waitFor` dependencies.
- The `gcr.io/$PROJECT_ID/mytarget` image name uses a `gcr.io` path as the source writes it; `gcr.io/cloud-builders/*` builders are hosted on Artifact Registry and are not affected by the Container Registry shutdown. For new images, use an Artifact Registry `LOCATION-docker.pkg.dev/PROJECT/REPO/IMAGE` path as on the artifacts page.
- The example `https://example.com/binary` and the bucket names are placeholders; the `wget` step downloads and the `ubuntu` step runs a binary without verification, so do not copy the pattern for untrusted downloads.
- The source also shows JSON forms of every example.

## Related

- [pass-data-between-steps.md](./pass-data-between-steps.md)
- [create-basic-configuration.md](./create-basic-configuration.md)
- [store-artifacts-in-artifact-registry.md](./store-artifacts-in-artifact-registry.md)
