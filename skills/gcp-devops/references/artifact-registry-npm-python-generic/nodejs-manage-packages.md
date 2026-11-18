---
source: https://docs.cloud.google.com/artifact-registry/docs/nodejs/manage-packages
---

# Manage Node.js packages

Publish, organize, and install Node.js packages in npm-format Artifact Registry repositories with `npm` or `yarn`; view packages, files and tags; and delete or deprecate unused versions. Which operations work depends on the repository mode (standard, remote, virtual).

## Signature / Usage

### Obtain an access token

Access tokens are valid for 60 minutes. Ensure credentials for the public npm registry are in your user npm configuration file `~/.npmrc`, then run in the project directory:

```bash
npx google-artifactregistry-auth
```

If the Artifact Registry repository is your global registry and packages are not scoped, download the credential helper from the public registry instead:

```bash
npm_config_registry=https://registry.npmjs.org npx google-artifactregistry-auth
```

Or add a script to `package.json` and run it:

```text
"scripts": {
 "artifactregistry-login": "npx google-artifactregistry-auth"
}
```

```bash
npm run artifactregistry-login
```

The helper reads the repository settings from the project `.npmrc` and writes token credentials to the user `.npmrc`, which isolates credentials from your source code and source control.

### Add packages (standard repositories)

The package `name` in `package.json` must include the repository scope:

```text
"name": "@dev-repo/my-package"
```

```bash
npm publish --tag=TAG
```

```bash
yarn publish --tag TAG
```

### View packages and versions (standard, remote, virtual with npm / yarn)

```bash
npm view
```

```bash
yarn info
```

With gcloud (standard and remote repositories only). Square brackets mark optional flags:

```text
gcloud artifacts packages list [--repository=REPOSITORY] [--location=LOCATION]
```

```text
gcloud artifacts versions list --package=PACKAGE \
    [--repository=REPOSITORY] [--location=LOCATION]
```

### List files (standard, remote)

```bash
gcloud artifacts files list
```

```bash
gcloud artifacts files list \
    --project=PROJECT \
    --repository=REPOSITORY \
    --location=LOCATION \
    --package=PACKAGE \
    --version=VERSION
```

```bash
gcloud artifacts files list \
    --project=PROJECT \
    --repository=REPOSITORY \
    --location=LOCATION \
    --package=PACKAGE \
    --tag=TAG
```

Example:

```bash
gcloud artifacts files list \
    --project=my-project \
    --location=us-west1 \
    --repository=my-repo \
    --package=my-app \
    --tag=1.0-dev
```

### Tag packages (standard)

Adapted (not in the official docs): the source writes `version=VERSION` without the leading `--`; gcloud 593.0.0 help defines the flag as `--version=VERSION`.

```text
gcloud artifacts tags create TAG --package=PACKAGE \
    --version=VERSION [--location=LOCATION] [--repository=REPOSITORY]
```

```bash
gcloud artifacts tags list --package=my-pkg --repository=my-repo
```

```bash
gcloud artifacts tags create release-candidate --version=1.0.0 \
    --package=my-pkg --repository=my-repo
```

```bash
gcloud artifacts tags update production --version=1.0.0 \
    --package=my-pkg --repository=my-repo
```

Adapted (not in the official docs): the source writes `[--location=<LOCATION]` with a stray `<`.

```text
gcloud artifacts tags delete TAG --package=PACKAGE \
    [--location=LOCATION] [--repository=REPOSITORY]
```

```bash
gcloud artifacts tags delete release-candidate --package=my-pkg \
    --repository=my-repo
```

### Install packages (standard, remote, virtual)

Latest tag, a different tag, or a specific version:

```bash
npm install @SCOPE/PACKAGE
```

```bash
npm install @SCOPE/PACKAGE@TAG
```

```bash
npm install @SCOPE/PACKAGE@VERSION
```

```bash
yarn add @SCOPE/PACKAGE
```

```bash
yarn add @SCOPE/PACKAGE@TAG
```

```bash
yarn add @SCOPE/PACKAGE@VERSION
```

When listing the package as a dependency, include the repository scope:

```text
"dependencies": {
  "@dev-repo/my-package": ">=1.0.0"
}
```

### Delete packages and versions (standard, remote)

```text
gcloud artifacts packages delete PACKAGE \
    [--repository=REPOSITORY] [--location=LOCATION] [--async]
```

```text
gcloud artifacts versions delete VERSION \
    --package=PACKAGE \
    [--repository=REPOSITORY] [--location=LOCATION] \
    [--async]
```

## Options / Props

### Required roles (granted on the repository)

| Task | Role |
|------|------|
| View packages, files in packages, and tags | Artifact Registry Reader (`roles/artifactregistry.reader`) |
| Download or install packages | Artifact Registry Reader (`roles/artifactregistry.reader`) |
| Add packages to a repository | Artifact Registry Writer (`roles/artifactregistry.writer`) |
| Delete packages | Artifact Registry Repository Administrator (`roles/artifactregistry.repoAdmin`) |

### Operations by repository mode

| Operation | Modes |
|-----------|-------|
| Adding packages | standard |
| Viewing packages and versions (npm / yarn) | standard, remote, virtual |
| Viewing in Console / gcloud | standard, remote |
| Listing files | standard, remote |
| Tagging packages | standard |
| Installing packages | standard, remote, virtual |
| Deleting packages | standard, remote |

### Placeholders

| Placeholder | Meaning |
|-------------|---------|
| `SCOPE` | npm scope associated with the repository; omit `@SCOPE/` if the repository has no scope |
| `PACKAGE` | Package ID / name in the repository |
| `TAG` / `VERSION` | Tag or version number |
| `REPOSITORY` / `LOCATION` | Repository name and regional or multi-regional location; omit when gcloud defaults are configured |

### Virtual repository priority example

| Upstream | Priority |
|----------|----------|
| `main-repo` | 100 |
| `secondary-repo1` | 80 |
| `secondary-repo2` | 80 |
| `test-repo` | 20 |

## Notes

- A package version can be published only once (an npm restriction): you cannot overwrite a version by publishing again, and you cannot delete a version and then publish the same name and version. Without a tag, npm adds the `latest` tag; consider tags such as `beta` or `dev`.
- Artifact Registry enforces alphanumeric lowercase package names for npm packages.
- Standard repository: download directly. Remote repository: a cached copy of the package and its dependencies is served; if missing, the remote repository downloads it from upstream and caches it (the listing of packages shows what was retrieved; for remote repositories it should include direct and transitive dependencies cached in the repository). Virtual repository: searches upstream repositories; virtual repositories only serve requested packages and do not store them; upstream remote repositories cache on demand. When a version exists in several upstreams, the highest priority value is searched first; equal-priority repositories may serve from either.
- You can set a maximum number of files returned by `files list` with `--limit`. If the project ID contains a colon (`:`), see Domain-scoped projects in the Docker names page.
- Destructive: deleting a package or version cannot be undone. For remote repositories only the cached copy is deleted and it is cached again on the next request for that version. Verify dependencies first and try deletions on a disposable project first. `--async` returns immediately without waiting for the operation to complete.
- To steer users to an updated version, mark the old version with `npm deprecate`; installing it then returns a deprecation warning.
- The user-level `~/.npmrc` holds access tokens that expire after 60 minutes; do not commit files that hold tokens.
- Artifact Registry hosts private npm-compatible repositories; npm and yarn behave as upstream documents them.
- Corrected from the official docs: the `gcloud artifacts tags create` synopsis was written as `version=VERSION` (now `--version=VERSION`), and `tags delete` as `[--location=<LOCATION]` (now `[--location=LOCATION]`); verified against gcloud 593.0.0 help.
- The source also shows Console steps (omitted).
- Source: https://docs.cloud.google.com/artifact-registry/docs/nodejs/manage-packages (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [nodejs-authentication.md](./nodejs-authentication.md)
- [store-nodejs.md](./store-nodejs.md)
- [python-manage-packages.md](./python-manage-packages.md)
