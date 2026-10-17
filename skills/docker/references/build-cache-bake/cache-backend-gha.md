---
source: https://docs.docker.com/build/cache/backends/gha/
---

# GitHub Actions cache

The `gha` backend uses the GitHub-provided Action's cache (or other cache services supporting the GitHub Actions cache protocol). It is the recommended cache inside GitHub Actions workflows, as long as the use case fits GitHub's size and usage limits.

## Signature / Usage

```console
$ docker buildx build --push -t <registry>/<image> \
  --cache-to type=gha[,parameters...] \
  --cache-from type=gha[,parameters...] .
```

With `docker/build-push-action` (the `url` and `token` parameters are populated automatically):

```yaml
- name: Build and push
  uses: docker/build-push-action@v7
  with:
    context: .
    push: true
    tags: "<registry>/<image>:latest"
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

## Options / Props

| Name | Option | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `url` | `cache-to`, `cache-from` | String | `$ACTIONS_CACHE_URL` or `$ACTIONS_RESULTS_URL` | Cache server URL, see authentication and version. |
| `url_v2` | `cache-to`, `cache-from` | String | `$ACTIONS_RESULTS_URL` | Cache v2 server URL, see authentication. |
| `token` | `cache-to`, `cache-from` | String | `$ACTIONS_RUNTIME_TOKEN` | Access token, see authentication. |
| `scope` | `cache-to`, `cache-from` | String | `buildkit` | Which scope cache object belongs to. |
| `mode` | `cache-to` | `min`, `max` | `min` | Cache layers to export. |
| `ignore-error` | `cache-to` | Boolean | `false` | Ignore errors caused by failed cache exports. |
| `timeout` | `cache-to`, `cache-from` | String | `10m` | Max duration for importing or exporting cache before it's timed out. |
| `repository` | `cache-to` | String | | GitHub repository used for cache storage. |
| `ghtoken` | `cache-to` | String | | GitHub token required for accessing the GitHub API. |
| `version` | `cache-to`, `cache-from` | String | Inferred from the cache server URL | Selects GitHub Actions cache version. |

## Notes

- GitHub Actions workflow syntax is covered by the github-docs skill; this page covers only the Docker `gha` cache backend.
- Works with the default `docker` driver only when the containerd image store is enabled; otherwise use a different driver.
- Authentication: if `url`, `url_v2` or `token` are unspecified, the backend falls back to environment variables. When invoking `docker buildx` manually from an inline step the variables must be exposed manually, e.g. with the `crazy-max/ghaction-github-runtime` action.
- Scope: default `buildkit`; building multiple images with the default scope makes each build overwrite the previous cache. Use a per-image scope:

```console
$ docker buildx build --push -t <registry>/<image> \
  --cache-to type=gha,url=...,token=...,scope=image \
  --cache-from type=gha,url=...,token=...,scope=image .
```

- GitHub's cache access restrictions still apply: only the cache for the current branch, the base branch and the default branch is accessible by a workflow. Some events receive read-only access in the default-branch context (see "Cache write restrictions" in the Docker GitHub Actions cache docs).
- Version: if `version` is set explicitly it is used. Otherwise setting `url_v2` selects v2; a `url` pointing at the v2 cache service (`results-receiver.actions.githubusercontent.com`) selects v2; any other `url` selects v1. Inside a workflow, Buildx sets `url_v2` from `$ACTIONS_RESULTS_URL` when you pass `version=2`, or when `version` is omitted and `$ACTIONS_CACHE_SERVICE_V2` holds a true value such as `1` or `true`; it sets `url` from `$ACTIONS_CACHE_URL`, falling back to `$ACTIONS_RESULTS_URL`. Only one URL applies to a build: with v2 BuildKit uses `url_v2` (falling back to `url`); with v1 it uses `url`.
- API throttling: the GitHub Actions cache API is rate limited; cache lookups during a build can trigger errors such as `ERROR: failed to solve: maximum timeout reached`. Supply a GitHub token (`ghtoken`, with `repo` scope) and `repository` so BuildKit checks cache keys via the standard GitHub API. With `docker/build-push-action`, `ghtoken` is set automatically to `secrets.GITHUB_TOKEN`; override with the `github-token` input:

```yaml
- name: Build and push
  uses: docker/build-push-action@v7
  with:
    context: .
    push: true
    tags: "<registry>/<image>:latest"
    cache-from: type=gha
    cache-to: type=gha,mode=max
    github-token: ${{ secrets.MY_CUSTOM_TOKEN }}
```

## Related

- [Cache storage backends](./cache-backends.md)
