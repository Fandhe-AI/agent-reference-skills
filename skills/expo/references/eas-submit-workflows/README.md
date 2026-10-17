# eas-submit-workflows

| Name | Description | Path |
|------|-------------|------|
| EAS CLI reference | EAS CLI is a command-line tool that allows you to interact with Expo Application Services (EAS) from your terminal. | [eas-cli.md](./eas-cli.md) |
| Create and manage environment variables in EAS | Learn how to create, scope, and consume environment variables with the EAS dashboard and EAS CLI. | [eas-environment-variables-manage.md](./eas-environment-variables-manage.md) |
| Using environment variables in EAS | Learn how to use environment variables in EAS builds, updates, hosting, and workflow jobs. | [eas-environment-variables-usage.md](./eas-environment-variables-usage.md) |
| Environment variables in EAS | An overview of how to use Expo Application Services (EAS) environment variables across builds, updates, workflows, and hosting. | [eas-environment-variables.md](./eas-environment-variables.md) |
| Schema for EAS Metadata | Structure of the store config object in `store.config.json` (EAS Metadata currently supports the Apple App Store only). | [eas-metadata-schema.md](./eas-metadata-schema.md) |
| EAS Metadata | EAS Metadata is a command-line tool from EAS that automates and maintains your app store presence from a `store.config.json` file instead of the app store dashboards. | [eas-metadata.md](./eas-metadata.md) |
| Submit to the Google Play Store with EAS Submit | EAS Submit is the recommended way to upload your Android app to the Google Play Store. `eas submit` works the same on your machine and inside CI/CD. | [submit-android.md](./submit-android.md) |
| Configure EAS Submit with eas.json | Learn how to configure your project for EAS Submit with `eas.json`. | [submit-eas-json.md](./submit-eas-json.md) |
| Submit to the Apple App Store with EAS Submit | EAS Submit is the recommended way to upload your iOS app to the Apple App Store. It works on macOS, Linux, and Windows, so a Mac is not needed. | [submit-ios.md](./submit-ios.md) |
| Distribute an iOS app with TestFlight | Get an iOS build onto testers' devices with TestFlight, and choose between internal and external testing. | [testflight.md](./testflight.md) |
| Webhooks | EAS can alert you via a webhook as soon as your build or submission completes. Webhooks are configured per project. | [webhooks.md](./webhooks.md) |
| Automating EAS CLI commands | Automate sequences of EAS CLI commands (build, submit, update) with EAS Workflows. | [workflows-automating-eas-cli.md](./workflows-automating-eas-cli.md) |
| Custom functions in EAS Workflows | Custom functions define reusable step sequences for custom jobs and hooks, called with a relative path through `uses`. | [workflows-custom-functions.md](./workflows-custom-functions.md) |
| Environment variables in EAS Workflows | Reference for the environment variables available inside EAS Workflows jobs, including the `env` context and additional worker variables. | [workflows-environment.md](./workflows-environment.md) |
| Get started with EAS Workflows | Create your first EAS Workflow: development builds for Android emulators, iOS simulators, and physical devices, then production builds for the app stores. | [workflows-get-started.md](./workflows-get-started.md) |
| Introduction to EAS Workflows | EAS Workflows is a CI/CD service for automating builds, updates, submissions, and tests for React Native and Expo apps. | [workflows-introduction.md](./workflows-introduction.md) |
| EAS Workflows limitations | Current limitations of EAS Workflows that could affect a workflow automation strategy. | [workflows-limitations.md](./workflows-limitations.md) |
| Pre-packaged jobs in EAS Workflows | Ready-to-use workflow jobs (`type:` values) that automate common tasks such as building, submitting, updating, and testing an app. | [workflows-pre-packaged-jobs.md](./workflows-pre-packaged-jobs.md) |
| Syntax for EAS Workflows | Reference for the EAS Workflows configuration file syntax (`.eas/workflows/*.yml`). | [workflows-syntax.md](./workflows-syntax.md) |
