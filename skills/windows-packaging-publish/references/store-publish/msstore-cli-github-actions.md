# Publish App Updates to Microsoft Store with GitHub Actions (msstore)

CI/CD for already-live Store apps using the `microsoft/microsoft-store-apppublisher` GitHub Action, which installs the `msstore` CLI and publishes package and metadata updates for MSIX and MSI/EXE apps.

## Signature / Usage

MSIX package update workflow (`.github/workflows/AppPackageAutoUpdate.yml`):

```yaml
name: AppPackageAutoUpdate

on:
  push:
    branches:
      - main
    paths:
      - 'release/package.msix'

jobs:
  build:
    runs-on: windows-latest
    environment: production

    steps:
      - name: Checkout repository
        uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4

      - name: Configure Microsoft Store CLI
        uses: microsoft/microsoft-store-apppublisher@15abd1c50fcc164b19cb240fb04ef3c49bf715a2 # v1.1

      - name: Reconfigure store credentials
        shell: pwsh
        env:
          AZURE_AD_TENANT_ID: ${{ secrets.AZURE_AD_TENANT_ID }}
          SELLER_ID: ${{ secrets.SELLER_ID }}
          AZURE_AD_APPLICATION_CLIENT_ID: ${{ secrets.AZURE_AD_APPLICATION_CLIENT_ID }}
          AZURE_AD_APPLICATION_SECRET: ${{ secrets.AZURE_AD_APPLICATION_SECRET }}
        run: |
          msstore reconfigure `
            --tenantId "$env:AZURE_AD_TENANT_ID" `
            --sellerId "$env:SELLER_ID" `
            --clientId "$env:AZURE_AD_APPLICATION_CLIENT_ID" `
            --clientSecret "$env:AZURE_AD_APPLICATION_SECRET"

      - name: Publish App package
        run: msstore publish '${{ github.workspace }}/release/package.msix' -id <Store product Id>
```

Metadata update step sequence (MSIX; base metadata first obtained with `msstore submission get <Store product Id>` from a `workflow_dispatch` workflow, then saved to `metadata/metadata.json`):

```powershell
$metadata = Get-Content -Raw "${{ github.workspace }}/metadata/metadata.json"
msstore submission updateMetadata <Store product Id> $metadata
msstore submission publish <Store product Id>
```

## Options / Props

| Item | Detail |
|---|---|
| Repository secrets | `AZURE_AD_APPLICATION_CLIENT_ID`, `AZURE_AD_APPLICATION_SECRET`, `AZURE_AD_TENANT_ID`, `SELLER_ID` |
| MSIX package trigger | push to `release/package.msix` on the release branch (main) -> `msstore publish <file> -id <Store product Id>` |
| MSIX metadata trigger | push to `metadata/metadata.json` on the release branch (main) -> `submission updateMetadata` + `submission publish` |
| MSI/EXE package flow | `msstore submission get <Partner center Id>` -> `release/package.json` -> `msstore submission update <Partner center Id> $updatedPackage` -> `msstore submission publish <Partner center Id>` |
| MSI/EXE metadata flow | `msstore submission get <Partner center Id> -m <module name>` -> `metadata/metadata.json` -> `submission updateMetadata` -> `submission publish` |

## Notes

- The first sample on the source page uses a plain multi-line `run:`; the page's later sample uses `run: |`, which is required for PowerShell backtick continuation (a plain scalar folds newlines into spaces).
- Currently supported for free products only; paid products are to be supported in a future release (the commands page documents `--priceId` and paid-app pricing handling; see msstore-cli.md).
- Prerequisites: Partner Center developer registration; a tenant (Microsoft Entra ID) associated with the account; an app registered in Microsoft Entra ID and added under Partner Center Account settings > User management > Microsoft Entra applications with the **Manager** role; the app must already be published and live.
- Where to find the values: Tenant ID in Entra admin center Identity > Overview; Client ID under App registrations ("Application (client) ID"); Client Secret under Certificates & secrets (copy immediately, shown once); Seller ID from Partner Center Account settings (Publisher ID / Seller ID). Store these only as GitHub repository secrets, never in the workflow file.
- Workflows authenticate with the four secrets, then use `msstore` to obtain base metadata / package info and publish. Changes appear after Partner Center certification completes.
- The `<Store product Id>` / `<Partner center Id>` placeholders are as written in the source for MSIX and MSI/EXE respectively.
- The source expands `${{ secrets.* }}` directly inside `run:`. The secrets are passed via `env:` instead so secret values are not expanded into shell source.
- Third-party actions are pinned to commit SHAs (`actions/checkout` v4, `microsoft/microsoft-store-apppublisher` v1.1) with the original tag in a trailing comment; the source uses the mutable tags `@v4` / `@v1.1`.
- The source triggers on `push.paths` only, so a push to any branch would publish with the repository secrets; the example restricts it to `branches: [main]` and a protected `environment` (configure required reviewers on the `production` environment to require approval) so unmerged packages are never submitted.
- Source: https://learn.microsoft.com/en-us/windows/apps/publish/msstore-dev-cli/github-actions, last updated 2026-08-30 (ms.date).

## Related

- [Microsoft Store Developer CLI (msstore)](./msstore-cli.md)
- [Publish an App Update](./publish-app-update.md)
- [Partner Center Users, Groups, and Entra Applications](./partner-center-users-entra.md)
