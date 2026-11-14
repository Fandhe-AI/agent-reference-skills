---
source: https://docs.expo.dev/eas/environment-variables/usage/
---

# Using environment variables in Expo Services

Learn how to use environment variables builds, updates, hosting, and workflow jobs with Expo Services.

## Signature / Usage

Select the Expo Services environment for a build profile in `eas.json`:

```json
{
  "build": {
    "development": { "environment": "development" },
    "preview": { "environment": "preview" },
    "production": { "environment": "production" },
    "my-profile": { "environment": "production" }
  }
}
```

Other commands:

```sh
eas update --environment production

eas env:exec --environment production 'echo $APP_VARIANT'
eas env:exec --environment production 'npx sentry-expo-upload-sourcemaps dist'
```

Workflow job environments (build then update with the same environment):

```yaml
name: Publish preview build and update

jobs:
  build_preview:
    type: build
    params:
      platform: ios
      profile: preview # uses environment from eas.json's build.preview.environment

  publish_preview_update:
    needs: [build_preview]
    type: update
    environment: preview # pulls variables from the preview environment
    params:
      branch: preview
```

Set a variable dynamically in a build job (for example from an Expo Build hook):

```sh
set-env EXAMPLE_ENV "example value"
```

## Options / Props

### Built-in Expo Build environment variables

Exposed to each job; not part of any project environment and not available when evaluating app.config.js locally.

| Name | Description |
| --- | --- |
| `CI=1` | Indicates this is a CI environment |
| `EAS_BUILD=true` | Indicates this is an Expo Build environment |
| `EAS_BUILD_PLATFORM` | `android` or `ios` |
| `EAS_BUILD_RUNNER` | `eas-build` for cloud builds, `local-build-plugin` for local builds |
| `EAS_BUILD_ID` | The build ID |
| `EAS_BUILD_PROFILE` | Name of the build profile from eas.json |
| `EAS_BUILD_PROJECT_ID` | The Expo Services project ID |
| `EAS_BUILD_GIT_COMMIT_HASH` | Hash of the Git commit |
| `EAS_BUILD_NPM_CACHE_URL` | URL of the npm cache |
| `EAS_BUILD_MAVEN_CACHE_URL` | URL of the Maven cache |
| `EAS_BUILD_COCOAPODS_CACHE_URL` | URL of the CocoaPods cache |
| `EAS_BUILD_USERNAME` | Username of the user initiating the build (undefined for bot users) |
| `EAS_BUILD_WORKINGDIR` | Remote directory path with your project |
| `EAS_BUILD_DISABLE_BUNDLE_JAVASCRIPT_STEP` | `1` skips the early JavaScript bundling check; JS errors are then only caught at the native build step |
| `EAS_BUILD_DISABLE_NPM_CACHE` | `1` disables the npm cache server |
| `EAS_BUILD_DISABLE_MAVEN_CACHE` | `1` disables the Maven cache server |
| `EAS_BUILD_DISABLE_COCOAPODS_CACHE` | `1` disables the CocoaPods cache server |

### Default job environment when `jobs.<job_id>.environment` is omitted

| Job type | Environment |
| --- | --- |
| Build | From `build.<profile>.environment` in eas.json; if missing, the automatic defaults below apply |
| Submit | Inherited from the submitted build |
| Maestro (`maestro`, `maestro-cloud`) | `preview` |
| Other (update, fingerprint, deploy, custom) | `production` |

## Notes

- If `environment` is not set on a build profile: `production` when `distribution` is `store`, `development` when `developmentClient` is `true`, `preview` for everything else.
- Secret variables are not available during build configuration resolution in EAS CLI, nor during the update process.
- Expo Update: in SDK 55 or later the `--environment` flag is required for `eas update`; for SDK 54 or earlier it falls back to local `.env` files when omitted. With the flag, only the specified Expo Services environment is used and project `.env` files are not.
- Expo Hosting: only plain text and sensitive variables can be used; secrets cannot be deployed. Client-side `EXPO_PUBLIC_*` values are inlined by `npx expo export`; server-side values (API routes, `+api.ts`) are uploaded with `eas deploy`. Variables loaded with `--environment` take precedence over `.env` / `.env.local`. Deployments are immutable, so re-export and re-deploy after changing a variable.
- Read variables on later Expo Build jobs with `process.env.VARIABLE_NAME` (Node.js) or `$VARIABLE_NAME` (shell). `set-env` is available in `PATH` on Expo Build workers.
- Keep the job environment in sync with the build profile to avoid mismatched secrets.
- Source modificationDate: July 29, 2026 (fetched 2026-10-17).
- Source: https://docs.expo.dev/eas/environment-variables/usage/ (docs/pages/eas/environment-variables/usage.mdx at tag expo@58.0.25).

## Related

- [Environment variables in Expo Services](./eas-environment-variables.md)
- [Create and manage environment variables in Expo Services](./eas-environment-variables-manage.md)
- [Environment variables in Expo Workflows](./workflows-environment.md)
- [Syntax for Expo Workflows](./workflows-syntax.md)
