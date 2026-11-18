---
source: https://docs.cloud.google.com/build/docs/building/manage-dependencies
---

# Manage build dependencies

The top-level `dependencies` field of a build config lists Git repositories and generic artifacts that Cloud Build fetches, in the order given, before any user-specified build logic runs, so dependency fetching is trusted. If `dependencies` is omitted, Cloud Build clones the repository that holds the config (triggered builds) or the source (command-line builds); if present, only the listed repositories are cloned. Dependencies appear in the **Build dependencies** tab of **Build details**.

## Signature / Usage

### Git repository dependency

```yaml
dependencies:
- gitSource:
    repository:
      url: 'URL'
      developerConnect: 'DC_RESOURCE_PATH'
    revision: 'REVISION'
    recurseSubmodules: 'true|false'
    fetchTags: 'true|false'
    depth: 'DEPTH'
    destPath: 'DEST_PATH'
```

### Generic artifact dependency

```yaml
dependencies:
- genericArtifact:
    resource: RESOURCE
    destPath: PATH
```

## Options / Props

| Field | Required | Description |
|-------|----------|-------------|
| `URL` | Unless connected through Developer Connect | HTTPS URL of the repository |
| `DC_RESOURCE_PATH` | If connected through Developer Connect | e.g. `projects/my-project/locations/us-central1/connections/my-connection/gitRepositoryLinks/my-repo` |
| `REVISION` | Yes | Version, commit hash, tag or branch to fetch |
| `recurseSubmodules` | No | Whether to fetch submodules |
| `fetchTags` | No (default `false`) | Fetch remote tags too. With `depth` `1` (default), `git fetch` only gets tags on commits within the shallow boundary; set `depth` to `-1` for all historical tags |
| `DEPTH` | No (default: latest commit) | `1` latest commit, `2` last two, `3` last three, `-1` all commits |
| `DEST_PATH` | Yes | Directory to clone into, relative to the build working directory; fetched into `/workspace/<dest_path>` |
| `RESOURCE` | Yes | `projects/PROJECT/locations/LOCATION/repositories/REPOSITORY/packages/PACKAGE/versions/VERSION`; strongly recommended with fingerprint `VERSION@dirsum_sha256=HASH_VALUE` so the reference is immutable |
| `PATH` | Yes | Folder to download the package into; created if missing |

### Roles

| Role | Where |
|------|-------|
| Developer Connect Read Token Accessor (`roles/developerconnect.readTokenAccessor`) | The Cloud Build service account, when the dependency is a Developer Connect repository |

## Notes

- In the Git example replace `'true|false'` with `true` or `false`, and set either `url` or `developerConnect` as the table shows (a Developer Connect repository uses `developerConnect`).
- Supported repositories: a public Git repository or one linked to Cloud Build with Developer Connect, or an Artifact Registry generic repository.
- The source also shows the JSON form; it is omitted because the source JSON is not valid (missing comma, `true|false` placeholders, trailing commas, `dependencies` as an object in the Git example). The source mixes `dest_path` and `destPath`; the config field is `destPath`.
- The source writes the role as `developerconnect.readTokenAccessor`; the full role ID is `roles/developerconnect.readTokenAccessor` (see the generated IAM reference for Developer Connect).
- Grant the Developer Connect role to the build's user-specified service account, not a default or legacy account.
- Source: https://docs.cloud.google.com/build/docs/building/manage-dependencies (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [build-containers.md](./build-containers.md)
- Cloud Build repositories: https://docs.cloud.google.com/build/docs/repositories
- Developer Connect: https://docs.cloud.google.com/developer-connect/docs/overview
