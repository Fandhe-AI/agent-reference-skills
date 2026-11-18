---
source: https://docs.cloud.google.com/artifact-registry/docs/nodejs/store-nodejs
---

# Store Node.js packages in Artifact Registry (quickstart)

Quickstart that creates a private Artifact Registry npm-format repository in Cloud Shell, configures two npm projects to authenticate with it, publishes a package with `npm publish` (or `yarn publish`), installs it as a dependency, and cleans up. Artifact Registry hosts private npm-compatible repositories; npm and yarn themselves behave as upstream documents them.

## Signature / Usage

### Create the repository

```bash
gcloud artifacts repositories create quickstart-nodejs-repo --repository-format=npm \
--location=us-central1 --description="Node.js package repository"
```

```bash
gcloud artifacts repositories list
```

Set defaults so later `gcloud` commands can omit the repository and location:

```bash
gcloud config set artifacts/repository quickstart-nodejs-repo
```

```bash
gcloud config set artifacts/location us-central1
```

### Prepare two npm projects

Adapted (not in the official docs): the version is pinned (`@10.1.0`) so the archive name matches the next command.

```bash
npm pack emoji-regex@10.1.0
```

```bash
mkdir emoji-regex && tar xvf emoji-regex-10.1.0.tgz -C emoji-regex --strip-components 1
```

```bash
mkdir npm-package2
cd npm-package2

npm init -y
```

### Print the repository settings

```bash
gcloud artifacts print-settings npm --scope=@quickstart
```

Output (add it to the project `.npmrc`, in the same directory as `package.json`, of both projects):

```text
@quickstart:registry=https://us-central1-npm.pkg.dev/PROJECT/quickstart-nodejs-repo/
//us-central1-npm.pkg.dev/PROJECT/quickstart-nodejs-repo/:always-auth=true
```

In both `package.json` files the package `name` must carry the scope:

```text
"name": "@quickstart/emoji-regex"
```

```text
"name": "@quickstart/npm-package2"
```

Add a script that refreshes credentials with `google-artifactregistry-auth`:

Adapted (not in the official docs): `--credential-config=./.npmrc` is removed so the token is written to the user `.npmrc` (the tool's default) instead of the project `.npmrc`.

```text
"scripts": {
  "artifactregistry-login": "npx google-artifactregistry-auth --repo-config=./.npmrc"
}
```

### Upload, view, install

Adapted (not in the official docs): the previous steps end in `npm-package2`; change to the `emoji-regex` package before logging in and publishing it.

```bash
cd ../emoji-regex
```

```bash
npm run artifactregistry-login
```

```bash
npm publish
```

```bash
yarn publish
```

```bash
gcloud artifacts packages list
```

```bash
gcloud artifacts versions list --package=PACKAGE
```

Adapted (not in the official docs): change back to `npm-package2` before installing the published package.

```bash
cd ../npm-package2
```

```bash
npm install @quickstart/emoji-regex
```

```bash
yarn add @quickstart/emoji-regex
```

`package.json` then contains:

```text
"dependencies": {
  "@quickstart/emoji-regex": "^10.1.0"
}
```

### Clean up

```bash
gcloud artifacts repositories delete quickstart-nodejs-repo
```

```bash
gcloud config unset artifacts/repository
gcloud config unset artifacts/location
```

## Options / Props

| Item | Value |
|------|-------|
| Required role (create and manage npm repositories) | Artifact Registry Administrator (`roles/artifactregistry.admin`) on the project |
| Quickstart repository | `quickstart-nodejs-repo`, format npm, mode Standard, location `us-central1` |
| npm registry endpoint | `https://LOCATION-npm.pkg.dev/PROJECT/REPOSITORY` (each repository is a separate registry with its own scope) |
| Scope used | `@quickstart` |

## Notes

- Adapted from the official docs: the source does not show directory changes; it publishes from the `emoji-regex` package and installs in `npm-package2`, so `cd ../emoji-regex` and `cd ../npm-package2` are added around those steps (both directories are created side by side above).
- Adapted from the official docs: the source's script passes `--credential-config=./.npmrc`, which writes the access token into the project `.npmrc` next to `package.json`, a file that is easy to commit. Without the flag, `google-artifactregistry-auth` writes the token to your user `.npmrc` (its README: "The default is your user `.npmrc` file", https://www.npmjs.com/package/google-artifactregistry-auth, retrieved 2026-11-19). The `.npmrc` printed by `print-settings npm` holds repository settings only. Never commit a file that contains tokens.
- Adapted from the official docs: the source runs `npm pack emoji-regex` (the latest version) and then extracts `emoji-regex-10.1.0.tgz`; the version is pinned so the file name matches.
- Without a scope, publishing and installing use the configured default registry; with the scope, npm uses the Artifact Registry repository.
- Optional prerequisite in the source: install PowerShell to connect from Windows.
- Destructive: `gcloud artifacts repositories delete` removes the repository and its packages. Ensure packages you want to keep are available elsewhere, and try it on a disposable project first.
- The source also shows Console steps and the Cloud Shell launch steps (omitted).
- Source: https://docs.cloud.google.com/artifact-registry/docs/nodejs/store-nodejs (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [nodejs-authentication.md](./nodejs-authentication.md)
- [nodejs-manage-packages.md](./nodejs-manage-packages.md)
- [store-python.md](./store-python.md)
