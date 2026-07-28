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
| `submission` | `status`, `get`, `getListingAssets`, `updateMetadata`, `update`, `poll`, `publish`, `delete` |
| `init` | Set up a project to publish to the Store |
| `package` | Package the application as MSIX |
| `publish` | Publish the application to the Store |
| `flights` | `list`, `get`, `delete`, `create`, `submission` |

## Notes

- Sign-in requires **Microsoft Entra ID credentials**, not a personal Microsoft account (MSA); requires a tenant associated with the Partner Center account.
- Supports CI/CD pipeline usage for automated publishing (see the GitHub Actions integration guide).
- App update operations currently support free products only via this CLI; paid product updates are not yet supported.
- The MSI/EXE track has a parallel command set under a separate overview page (`overview-exe`/`commands-exe`) — command names largely mirror the MSIX track.

## Related

- [Submission API MSIX](./submission-api-msix.md)
- [Submission API MSI](./submission-api-msi.md)
