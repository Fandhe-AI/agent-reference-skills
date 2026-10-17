---
source: https://docs.expo.dev/tutorial/cicd/preview-builds/
---

# Preview Builds with Fingerprint and Slack Notification

Skip native rebuilds when the fingerprint is unchanged, build only when no compatible build exists, and post the result to Slack.

```yaml .eas/workflows/preview.yml
name: Preview builds

jobs:
  fingerprint:
    name: Fingerprint
    type: fingerprint
    environment: preview
  get_android_build:
    name: Check for existing Android build
    needs: [fingerprint]
    type: get-build
    params:
      fingerprint_hash: ${{ needs.fingerprint.outputs.android_fingerprint_hash }}
      profile: preview
  get_ios_build:
    name: Check for existing iOS build
    needs: [fingerprint]
    type: get-build
    params:
      fingerprint_hash: ${{ needs.fingerprint.outputs.ios_fingerprint_hash }}
      profile: preview
  build_android:
    name: Build Android
    needs: [get_android_build]
    if: ${{ !needs.get_android_build.outputs.build_id }}
    type: build
    params:
      platform: android
      profile: preview
  build_ios:
    name: Build iOS
    needs: [get_ios_build]
    if: ${{ !needs.get_ios_build.outputs.build_id }}
    type: build
    params:
      platform: ios
      profile: preview
  notify:
    name: Notify on Slack
    after: [build_android, build_ios]
    type: slack
    environment: preview
    params:
      webhook_url: ${{ env.SLACK_WEBHOOK_URL }}
      message: 'Preview builds are ready - Android: ${{ after.build_android.status }}, iOS: ${{ after.build_ios.status }}'
```

```sh
eas env:set --name SLACK_WEBHOOK_URL --value https://hooks.slack.com/services/TD000/B000/XXXXXXXXXX --environment preview --visibility secret
eas workflow:run .eas/workflows/preview.yml
```

## Notes

- The `notify` job uses `after` (not `needs`) so it runs once both builds finish, regardless of outcome; `${{ after.<job>.status }}` reports success, failure or skipped.
- Jobs default to the `production` environment; `environment: preview` is what makes the `SLACK_WEBHOOK_URL` variable (created for the `preview` environment, visibility `secret`) available.
- The `slack` job takes `webhook_url` and `message`, or a `payload` for Slack Block Kit formatting. The webhook value above is a placeholder.
- The Slack section is optional; drop the `notify` job if Slack is not used.
- Source: https://docs.expo.dev/tutorial/cicd/preview-builds/ (fetched 2026-10-17).
