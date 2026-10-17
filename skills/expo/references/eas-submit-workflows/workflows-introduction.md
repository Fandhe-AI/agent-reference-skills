---
source: https://docs.expo.dev/eas/workflows/introduction/
---

# Introduction to EAS Workflows

EAS Workflows is a CI/CD service for automating builds, updates, submissions, and tests for React Native and Expo apps.

## Signature / Usage

Create your first workflow and follow the prompts:

```sh
eas workflow:create
```

Workflows are YAML files in the `.eas/workflows/` directory at the project root. Each file specifies a `name`, optional triggers (`on`), and one or more `jobs` that run in the cloud. Run any workflow manually with `eas workflow:run`.

## Notes

- Distinct from GitHub Actions: EAS Workflows YAML (`.eas/workflows/*.yml`, `type: build` / `update` / `submit` jobs) is not GitHub Actions syntax, although the official docs compare them as general CI services. See github-docs for GitHub Actions.
- Triggers: GitHub events (push, pull request, label, branch or tag deletion), cron schedule, App Store Connect events, manually with `eas workflow:run`, or the REST API. When the EAS project is linked to GitHub, teams can trigger workflows from GitHub events.
- Pre-packaged jobs build, submit, and update the app, run Maestro E2E tests, send Slack messages, and more; custom jobs run any command.
- Runners: Linux `linux-medium` (4 vCPU, 16 GB RAM) / `linux-large` (8 vCPU, 32 GB RAM); Linux with nested virtualization for Android emulators `linux-medium-nested-virtualization` / `linux-large-nested-virtualization`; macOS `macos-medium` (5 cores, 20 GB RAM) / `macos-large` (10 cores, 40 GB RAM).
- Jobs without dependencies run in parallel. `needs` waits for success; `after` waits for completion regardless of success or failure.
- Environment variables: EAS environment variables and inline `env` values, referenced as `${{ env.VARIABLE_NAME }}`.
- Works with both CNG (Continuous Native Generation) and existing React Native projects configured for EAS Build.
- Combine `fingerprint`, `get-build`, and `update` jobs to skip redundant native builds and publish over-the-air updates when possible.
- Not a fit for highly customized pipelines that depend on non-EAS services (Docker, custom runners).
- Current limitations: no shared workflow configurations and no matrix builds (see the limitations page).
- The official page also lists REST API and Troubleshooting pages that are not included in this skill.
- Source modificationDate: July 22, 2026 (fetched 2026-10-17).

## Related

- [Get started with EAS Workflows](./workflows-get-started.md)
- [Syntax for EAS Workflows](./workflows-syntax.md)
- [Pre-packaged jobs in EAS Workflows](./workflows-pre-packaged-jobs.md)
- [EAS Workflows limitations](./workflows-limitations.md)
