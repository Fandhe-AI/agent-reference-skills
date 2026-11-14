---
source: https://docs.expo.dev/eas/workflows/get-started/
---

# Get started with Expo Workflows

Create your first workflow with Expo Workflows: development builds for Android emulators, iOS simulators, and physical devices, then production builds for the app stores.

## Signature / Usage

```sh
npx create-expo-app@latest --template default@sdk-58
npm install -g eas-cli

# Generate a workflow that creates development builds for Android and iOS (.eas/workflows/build.yml)
eas workflow:create --template build
eas workflow:run .eas/workflows/build.yml

# Install the latest builds locally
eas build:run -p android --latest
eas build:run -p ios -e development-ios-simulator --latest
npx expo start
```

Production builds only (`.eas/workflows/create-production-builds.yml`):

```yaml
name: Create Production Builds

jobs:
  build_android:
    type: build # This job type creates a production build for Android
    params:
      platform: android
      profile: production
  build_ios:
    type: build # This job type creates a production build for iOS
    params:
      platform: ios
      profile: production
```

Trigger on a push to `main` (requires the GitHub repo to be linked to the Expo Services project):

```yaml
name: Create Production Builds

on:
  push:
    branches: ['main']

jobs:
  build_android:
    type: build
    params:
      platform: android
      profile: production
```

Trigger from App Store Connect events:

```yaml
name: React to App Store Connect events

on:
  app_store_connect:
    app_version:
      states:
        - ready_for_review
        - waiting_for_review

jobs:
  send_slack_notification:
    type: slack
    environment: production
    params:
      webhook_url: ${{ env.SLACK_WEBHOOK_URL }}
      message: 'App version is ready for review or waiting for review.'
```

## Notes

- Prerequisites: an Expo account, a project, and EAS CLI. Follow the `[Action requested]` prompts when `eas workflow:create` shows them; it writes the workflow file and sets up the project for building with Expo Build.
- `eas workflow:create --template deploy` configures Expo Build and Expo Update, sets app identifiers, and writes `.eas/workflows/deploy.yml`. When run, it fingerprints the project, then builds and submits a production build when there are native changes, or publishes an over-the-air update when a matching build already exists.
- Production builds need signing credentials: `eas credentials:configure-build -p android -e production` and `eas credentials:configure-build -p ios -e production`.
- Link GitHub in the project's GitHub settings (install the GitHub app, select the matching repository). App Store Connect triggers require connecting the App Store Connect app under Project settings > General > Connections. The Slack example reads `SLACK_WEBHOOK_URL` from the `production` Expo Services environment.
- If a job fails, the workflow can be re-run from its failed jobs without repeating successful work (see Manage workflow runs).
- Source: https://docs.expo.dev/eas/workflows/get-started/ (docs/pages/eas/workflows/get-started.mdx at tag expo@58.0.25).
- Distinct from GitHub Actions: `.eas/workflows/*.yml` is Expo Workflows syntax. See github-docs for GitHub Actions.
- The Expo Tools VS Code extension provides descriptions and autocompletion for workflow files.
- Source modificationDate: October 16, 2026 (fetched 2026-10-17).

## Related

- [Introduction to Expo Workflows](./workflows-introduction.md)
- [Syntax for Expo Workflows](./workflows-syntax.md)
- [Pre-packaged jobs in Expo Workflows](./workflows-pre-packaged-jobs.md)
- [EAS CLI reference](./eas-cli.md)
- [Manage workflow runs](./workflows-manage-runs.md)
