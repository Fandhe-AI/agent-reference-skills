---
source: https://developers.cloudflare.com/pages/platform/known-issues/
---

# Known issues

Documented bugs and limitations for Pages builds, Git configuration, custom domains and Functions, plus cleanup scripts.

## Signature / Usage

Delete one deployment (`--force` skips the prompt and forces deletion of aliased deployments):

```sh
npx wrangler pages deployment delete <DEPLOYMENT_ID> --project-name <PROJECT_NAME>
```

Delete all preview deployments of a project while keeping production. This is destructive: run it only against the intended project. Bash:

```bash
#!/usr/bin/env bash
set -euo pipefail

project="${1:?usage: $0 <project-name> [parallelism]}"
parallel="${2:-5}"

deployments=$(npx --no-install wrangler pages deployment list \
    --project-name "$project" --json)

prod_id=$(jq -r '[.[] | select(.Environment == "Production")][0].Id // empty' <<<"$deployments")
if [ -z "$prod_id" ]; then
    echo "No production deployment found for '$project' - aborting." >&2
    echo "This script keeps your production deployment, so it needs one to run." >&2
    echo "Create a production deployment by deploying to your production branch (for example: npx wrangler pages deploy <output-dir> --project-name $project), then re-run this script." >&2
    exit 1
fi

to_delete=$(jq -r '.[] | select(.Environment != "Production") | .Id' <<<"$deployments")
count=$(printf '%s\n' "$to_delete" | grep -c . || true)

if [ "$count" -eq 0 ]; then
    echo "Nothing to delete. Production: $prod_id"
    exit 0
fi

echo "Production: $prod_id. Deleting $count preview deployments..."

failed=$(printf '%s\n' "$to_delete" | xargs -n1 -P "$parallel" -I{} \
    sh -c 'npx --no-install wrangler pages deployment delete "$1" --project-name "$2" --force >/dev/null 2>&1 \
           || echo "$1"' _ {} "$project")

if [ -n "$failed" ]; then
    echo "The following deployments failed to delete:" >&2
    printf '%s\n' "$failed" >&2
    exit 1
fi

echo "Done."
```

PowerShell:

```powershell
param(
    [Parameter(Mandatory=$true)][string]$ProjectName,
    [int]$Throttle = 5
)

$ErrorActionPreference = "Stop"
$env:CLOUDFLARE_ACCOUNT_ID = $env:CLOUDFLARE_ACCOUNT_ID  # ensure inherited into runspaces

$deployments = npx --no-install wrangler pages deployment list `
    --project-name $ProjectName --json | ConvertFrom-Json

$prod = $deployments | Where-Object { $_.Environment -eq "Production" } | Select-Object -First 1
if (-not $prod) {
    throw "No production deployment found for '$ProjectName' - aborting to avoid data loss. This script keeps your production deployment, so it needs one to run. Create a production deployment by deploying to your production branch (for example: npx wrangler pages deploy <output-dir> --project-name $ProjectName), then re-run this script."
}

$toDelete = $deployments | Where-Object { $_.Environment -ne "Production" }

if ($toDelete.Count -eq 0) {
    Write-Output "Nothing to delete. Production: $($prod.Id)"
    return
}

Write-Output "Production: $($prod.Id). Deleting $($toDelete.Count) preview deployments..."

$results = $toDelete | ForEach-Object -Parallel {
    $id = $_.Id
    npx --no-install wrangler pages deployment delete $id `
        --project-name $using:ProjectName --force *> $null
    [pscustomobject]@{ Id = $id; ExitCode = $LASTEXITCODE }
} -ThrottleLimit $Throttle

$failed = $results | Where-Object { $_.ExitCode -ne 0 }
if ($failed) {
    Write-Warning "$($failed.Count) deletions failed:"
    $failed | Format-Table -AutoSize
    exit 1
}

Write-Output "Done."
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `projectName` / `$1` | string | — | Project to clean (first argument). |
| `parallelism` / `-Throttle` | integer | 5 | Number of concurrent deletions. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Builds and deployment: only GitHub and GitLab support automatic CI/CD builds (use Direct Upload for other platforms); incremental builds are not supported; uploading a `/functions` directory through dashboard Direct Upload does not work; commits and pull requests from forks do not create a preview.
- Git configuration: a Git-integrated project cannot switch to Direct Upload; disable or pause automatic deployments, or delete the project and create one pointing at another repository.
- Build configuration: `*.pages.dev` subdomains cannot be changed (delete and recreate). The page says Hugo runs an old version unless `HUGO_VERSION` is set and that Node `12.18.0` is the default; that reflects the legacy v1 build image. The v3 image defaults to Node.js 22.23.4 and Hugo 0.147.7 (see the build image page). Netlify Forms are not supported; Pages Functions are the equivalent of Netlify Serverless Functions.
- Custom domains: not possible to add a wildcard domain (`*.domain.com`), a domain that already has a Worker routed on it, or a domain with a Cloudflare Access policy already enabled. Cloudflare Load Balancer does not work with `*.pages.dev` projects (`Error 1000: DNS points to prohibited IP`); to use a Pages project as an origin, select **Add host header** when creating the pool and set both the host header value and the endpoint address to your `pages.dev` domain. Validation needs `http://{domain_name}/.well-known/acme-challenge/*` reachable. Advanced Certificates cannot be used with Pages.
- Pages Functions: adding or removing polyfills is not supported (bundlers such as webpack may fail); `passThroughOnException()` is unavailable for advanced mode (`_worker.js`) and is less resilient than in Workers (Pages wraps the code in try...catch and falls back to `env.ASSETS.fetch()`, so CPU time or memory failures can still throw).
- Access on `*.pages.dev`: after **Settings** > **Enable access policy**, use **Manage** on the preview policy, open **Access** > **Applications**, **Configure**, and delete the wildcard `*` in **Subdomain** under **Public hostname** (rename the application if needed). Then re-enable the access policy; two policies result (`*.pages.dev` and `*.<YOUR_SITE>.pages.dev`). If the project has a custom domain, also create a self-hosted Access application for it (**Zero Trust** > **Access controls** > **Applications**), otherwise custom domain visitors see an Access login that does not work.
- A project with over 100 deployments may not be deletable; delete deployments individually with Wrangler first (the scripts above keep the production deployment). The bash script needs `jq`, the PowerShell script uses `ForEach-Object -Parallel` (PowerShell 7+). The latest deployment for a branch cannot be deleted, so the scripts may report such deployments as failed.

## Related

- [Limits](./limits.md)
- [Preview deployments](../configuration/preview-deployments.md)
- [Custom domains](../configuration/custom-domains.md)
- [Build image](../configuration/build-image.md)
