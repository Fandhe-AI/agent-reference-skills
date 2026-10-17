# Microsoft Store Developer CLI (msstore)

`msstore` — a cross-platform (Windows, macOS, Linux) CLI that automates publishing apps to the Microsoft Store by calling Partner Center APIs, for both MSIX and MSI/EXE app tracks.

## Signature / Usage

```console
# First run configures the environment interactively
msstore

# Common commands
msstore apps
msstore submission status
msstore init
msstore package
msstore publish
msstore flights list
```

## Options / Props

| Command | Purpose |
|---|---|
| `info` | Print existing configuration |
| `reconfigure` | Re-run configuration |
| `settings` | Change CLI settings |
| `apps` | List/inspect applications in the account |
| `submission` | `status`, `get`, `getListingAssets`, `updateMetadata`, `update`, `poll`, `publish`, `delete`, `rollout` |
| `submission rollout` | Gradual package rollout (MSIX/packaged apps only): `get <productId>`, `update <productId> <percentage>` (0-100), `halt <productId>`, `finalize <productId>`; each takes `-s, --submissionId` (omitted: the pending submission, falling back to the last published one) |
| `init` | Set up a project to publish to the Store (WinUI, .NET MAUI, Flutter, Electron, React Native for Desktop, PWA, UWP) |
| `package` | Package the application as MSIX |
| `publish` | Publish the application to the Store |
| `flights` | `list`, `get`, `delete`, `create`, `submission` (`get`, `delete`, `update`, `publish`, `poll`, `status`, `rollout`) |

`init` and `publish` options added in the current docs:

| Option | Command | Description |
|---|---|---|
| `-prp, --packageRolloutPercentage` | `init`, `publish` | Rollout percentage of the package, 0 to 100 |
| `-pid, --priceId` | `init` (with `--publish`), `publish` | Base price tier to set, such as `Tier1012`, `Free`, or `NotAvailable` (`Base` is not valid). Only needed when the Store returns a base price the submission API does not accept back |
| `-nc, --noCommit` | `publish` | Keep the submission in draft state (not a dry run: the package is uploaded and the draft updated) |
| `-f, --flightId` | `init`, `publish` | Flight to publish the package to |

Flight rollouts use `msstore flights submission rollout get|update|halt|finalize <productId> <flightId>`.

```console
msstore publish "C:\path\to\app" --noCommit
msstore submission rollout update <productId> 20
msstore submission rollout finalize <productId>
```

## Notes

- Installation: install the .NET 9 Desktop Runtime on Windows (`winget install Microsoft.DotNet.DesktopRuntime.9`), then `winget install "Microsoft Store Developer CLI"` (or get it from the Microsoft Store). On macOS and Linux install the .NET 9 Runtime, then download the `.tar.gz` for your architecture (x64 or Arm64) from the releases page and put it on PATH, or `brew install microsoft/msstore-cli/msstore-cli`.
- The first publication of an app must be completed in Partner Center; the CLI cannot create an app or complete the first publication. After the app is published, use the CLI for subsequent updates.
- Sign-in requires **Microsoft Entra ID credentials**, not a personal Microsoft account (MSA); requires a tenant associated with the Partner Center account.
- Supports CI/CD pipeline usage for automated publishing (see the GitHub Actions integration guide).
- Rollout: a rollout must be enabled on the submission before `submission rollout` commands act on it, either at publish time with `msstore publish --packageRolloutPercentage` or by setting `packageDeliveryOptions.packageRollout` in the JSON passed to `submission update`. Rollout commands are MSIX only; for a flight rollout use `msstore flights submission rollout`.
- For MSIX/packaged apps `submission updateMetadata` and `submission update` are equivalent (both send the complete submission JSON from `submission get`, updating listings and packages together). They differ only for MSI/EXE apps (product ID is a GUID): `updateMetadata` updates the listing metadata, `update` updates the packages.
- `submission update` replaces the entire submission. The JSON must include `Pricing.PriceId` set to a valid value such as `Tier<number>`, `Free`, or `NotAvailable`; otherwise the CLI rejects the update. Use `submission get` first to retrieve the current JSON. When publishing an update the CLI sends the existing `Pricing.PriceId` back unchanged; if the Store returns `Base`, an empty price ID, or no pricing object, the CLI stops rather than risk resetting the app to free. `--priceId` sets a single base price and does not guarantee preservation of per-market prices; verify market prices before committing.
- `msstore publish` deletes the pending draft and creates a new one from the last published submission, discarding metadata changes staged in that draft. Run `publish` before editing metadata, not after.
- The overview page still states that app update operations through the CLI are currently supported for free products only (paid support "in a future release"), while the commands page documents `--priceId` and paid-app pricing handling; check both pages when updating paid apps.
- The MSI/EXE track has a parallel command set under a separate overview page (`overview-exe`/`commands-exe`) — command names largely mirror the MSIX track.

## Related

- [msstore with GitHub Actions](./msstore-cli-github-actions.md)
- [Submission API MSIX](./submission-api-msix.md)
- [Submission API MSI](./submission-api-msi.md)
