---
source: https://docs.expo.dev/tutorial/cicd/e2e-tests/
---

# Maestro E2E Tests in EAS Workflows

Build an unsigned APK and an iOS simulator build, then run Maestro flows against both from a workflow.

```json eas.json
{
  ... 
  "build": {
    "e2e-test": {
      "withoutCredentials": true,
      "android": {
        "buildType": "apk",
        "image": "latest"
      },
      "ios": {
        "simulator": true,
        "image": "latest"
      }
    }
  }
}
```

```yaml .maestro/home.yml
appId: com.yourname.yourapp # Replace with your app's package name/bundle identifier from app config file
---
- launchApp
- assertVisible: 'Welcome'
```

```yaml .maestro/navigate.yml
appId: com.yourname.yourapp # Replace with your app's package name/bundle identifier from app config file
---
- launchApp
- tapOn: 'Settings'
- assertVisible: 'Settings'
```

```yaml .eas/workflows/e2e-tests.yml
name: E2E Tests

jobs:
  build_android:
    name: Build Android for E2E
    type: build
    params:
      platform: android
      profile: e2e-test
  build_ios:
    name: Build iOS for E2E
    type: build
    params:
      platform: ios
      profile: e2e-test
  test_android:
    name: Run Maestro tests (Android)
    needs: [build_android]
    type: maestro
    params:
      build_id: ${{ needs.build_android.outputs.build_id }}
      flow_path: ['.maestro/home.yml', '.maestro/navigate.yml']
  test_ios:
    name: Run Maestro tests (iOS)
    needs: [build_ios]
    type: maestro
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
      flow_path: ['.maestro/home.yml', '.maestro/navigate.yml']
```

Triggers (add to the workflow file as needed):

```yaml .eas/workflows/e2e-tests.yml
on:
  pull_request:
    branches: ['*']
```

```yaml .eas/workflows/e2e-tests.yml
on:
  pull_request_labeled:
    labels: ['test']
```

```sh
eas workflow:run .eas/workflows/e2e-tests.yml
```

## Notes

- The `maestro` job type is in alpha at the time of the source page.
- Replace `com.yourname.yourapp` in `appId` with `android.package` or `ios.bundleIdentifier` from the app config.
- `withoutCredentials: true` skips credential setup for the E2E profile; iOS builds as a simulator build and Android as an unsigned APK.
- `pull_request_labeled` runs the workflow only when one of the listed labels is added to a pull request.
- Source: https://docs.expo.dev/tutorial/cicd/e2e-tests/ (fetched 2026-10-17). A shorter variant exists at https://docs.expo.dev/eas/workflows/examples/e2e-tests/
