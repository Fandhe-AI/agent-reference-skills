---
source: https://docs.cloud.google.com/build/docs/building/build-nodejs
---

# Build and test Node.js applications

Use the public `node` image from Docker Hub (preinstalled with `npm`) as a Cloud Build step to install dependencies, test, build, publish an npm package to Artifact Registry, and optionally generate SLSA build provenance. Prerequisites: a `package.json` with `start` and `test` scripts, an npm repository in Artifact Registry, and the Google Cloud CLI.

## Signature / Usage

### Run npm in a build step

The `name` field selects the image; `entrypoint` overrides the image's default entrypoint so `npm` runs. Omitting the node version defaults to `:latest`; `name: node:12` would use `node:12`.

```yaml
steps:
- name: 'node'
  entrypoint: 'npm'
```

### Install dependencies

```yaml
steps:
- name: 'node'
  entrypoint: 'npm'
  args: ['install']
```

### Add tests

```yaml
steps:
- name: 'node'
  entrypoint: 'npm'
  args: ['install']
- name: 'node'
  entrypoint: 'npm'
  args: ['test']
```

### Run a custom npm script

Add `run` as the first argument followed by the script name (here `build`).

Adapted (not in the official docs): the source indents `entrypoint` and `args` of the second and third steps inconsistently, which is invalid YAML; indentation is normalized.

```yaml
steps:
- name: 'node'
  entrypoint: 'npm'
  args: ['install']
- name: 'node'
  entrypoint: 'npm'
  args: ['test']
- name: 'node'
  entrypoint: 'npm'
  args: ['run', 'build']
```

### Upload to an npm repository in Artifact Registry

```yaml
artifacts:
   npmPackages:
   - repository: 'https://LOCATION-npm.pkg.dev/PROJECT-ID/REPOSITORY_NAME'
     packagePath: 'PACKAGE_PATH'
```

### Test on multiple node versions

Specify the version as a user-defined substitution, then create one trigger per version, each setting `_NODE_VERSION` (for example `12`) in its substitution variables.

```yaml
steps:
- name: 'node:$_NODE_VERSION'
  entrypoint: 'npm'
  args: ['install']
- name: 'node:$_NODE_VERSION'
  entrypoint: 'npm'
  args: ['test']
```

## Options / Props

| Name | Description |
|------|-------------|
| `LOCATION` | Location of the Artifact Registry repository |
| `PROJECT-ID` | Project that contains the Artifact Registry repository |
| `REPOSITORY_NAME` | Name of the npm repository in Artifact Registry |
| `PACKAGE_PATH` | Local directory containing the npm package to upload; an absolute path is recommended. `.` is allowed, but the field cannot be omitted or left empty. The directory must contain a `package.json` |
| `options.requestedVerifyOption: VERIFIED` | Enables SLSA build provenance generation (add under `options`) |

## Notes

- The source's `name: node:12` and `_NODE_VERSION` value `12` are only examples of a version tag; the source gives no supported-version list, so choose a currently supported `node` tag from Docker Hub rather than copying `12`. Unpinned `name: node` follows `:latest`.
- Corrected from the official docs: the original steps 3 and 4 indent `entrypoint:` / `args:` by extra spaces relative to `- name:` in the custom-command example.
- Start the build manually or with a trigger; afterwards view repository details in Artifact Registry and view / validate provenance as described in the Cloud Build provenance docs.
- Cloud Build is Google Cloud's managed build service; npm itself behaves as upstream documents. Artifact Registry hosts the private npm repository.
- The source also shows Console steps for creating the per-version triggers.
- Source: https://docs.cloud.google.com/build/docs/building/build-nodejs (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [build-python.md](./build-python.md)
- [build-containers.md](./build-containers.md)
- [view-build-results.md](./view-build-results.md)
- Build config file schema: https://docs.cloud.google.com/build/docs/build-config-file-schema
