---
source: https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/
---

# Troubleshooting Workers Builds

Common Workers Builds errors, causes, and fixes, including Builds API errors.

## Signature / Usage

View history: Worker > **Deployment** > **View Build History** > select a build. Retry: ellipsis next to the build > **Retry build** (or on the Build Details page). Builds and logs are retained 90 days.

Error messages from the build logs:

```text
✘ [ERROR] The name in your Wrangler configuration file (<Worker name>) must match the name of your Worker. Please update the name field in your Wrangler configuration file.
✘ [ERROR] Missing entry-point: The entry-point should be specified via the command line (e.g. wrangler deploy path/to/script) or the main config field.
Could not route to /client/v4/accounts/<Account ID>/workers/services/<Worker name>, perhaps your object identifier is invalid? [code: 7003]
Failed: The build token selected for this build has been deleted or rolled and cannot be used for this build. Please update your build token in the Worker Builds settings and retry the build.
Build was timed out
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync.
```

## Options / Props

Fixes by error:

| Error | Cause and fix |
| --- | --- |
| Workers name requirement | The dashboard Worker name must match `name` in the Wrangler configuration in the root directory; update `name`. Not applicable to Wrangler Environments when the name before `-<env_name>` matches (e.g. dashboard `my-worker-staging` with `name = my-worker`, `[env.staging]`, and `npx wrangler deploy --env staging`); on Wrangler v3+ Workers Builds overrides the name via `WRANGLER_CI_OVERRIDE_NAME`. |
| Missing Wrangler configuration file | Config likely missing from the root directory; update the root directory under **Settings** > **Build** > **Build Configuration** or add the config file. |
| Incorrect `account_id` | Config has an `account_id` for another account; remove it or fix it (see **Workers & Pages Overview** > **Account Details**). |
| Stale API token | Selected build token was edited, deleted, or rolled; create a new API token and select it. |
| Build timed out | Maximum build duration is 20 minutes. |
| 404 or blank page after successful build | Check the build command runs your build step; `assets.directory` points to the build output (e.g. `./dist`, `./build`); for SPAs set `assets.not_found_handling` to `single-page-application`. |
| `npm ci` out of sync | Lockfile likely written by a newer npm than the image default; `engines.npm` is not used. Set `"packageManager": "npm@11.19.1"` (exact version) in `package.json`; check local with `npm -v`. |
| Git integration issues | Remove and reinstall the GitHub or GitLab integration. |

Builds API errors:

| Error | Cause and fix |
| --- | --- |
| "Resource not found" | Worker name used instead of Worker tag (UUID like `1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d`). |
| "Invalid request body" (12002) on `PATCH /builds/triggers/{trigger_uuid}` | Resulting branch patterns must be one of: Production: `branch_includes` one branch name without wildcards (e.g. `["main"]`) and `branch_excludes` `[]`; Legacy branch builds (non-production): `branch_includes` `["*"]` and `branch_excludes` one or more branch names without wildcards. Also returned when converting production to non-production or vice versa. Patterns like `feature/*` are unsupported. Change the production branch via `git_repository.branch` instead. |

## Notes

- Build limits are in `builds-overview.md`.

### Pull request comment shows "No Preview URL"

A preview build can succeed while the pull request or merge request comment shows **No Preview URL**; Workers Builds did not receive a Preview URL from your Preview command. Check: (1) a Preview host is enabled (a custom domain enabled for Preview traffic, `workers.dev` Preview URLs, or both; `workers.dev` is not needed if a custom domain is enabled for Previews; see `previews-custom-domains.md`); (2) your Preview command reports the Preview to Workers Builds, which reads Preview and Deployment URLs from the Preview command output.

| Command | Minimum version |
| --- | --- |
| `npx wrangler preview` | Wrangler 4.135.0 |
| `npx cf previews deploy` | `cf` 1.0.0-beta.18 |

Earlier versions of `cf previews deploy` print the Preview URLs in the build log but do not report them to Workers Builds; update the version in your `package.json`. To confirm the Preview was created, find its URLs in the build log or in the **Previews** section of your Worker.

- Source: https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [builds-overview.md](./builds-overview.md)
- [builds-api-reference.md](./builds-api-reference.md)
- [builds-build-image.md](./builds-build-image.md)
- [builds-git-integration.md](./builds-git-integration.md)
