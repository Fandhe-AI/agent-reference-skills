---
source: https://docs.expo.dev/submit/testflight/
---

# Distribute an iOS app with TestFlight

Get an iOS build onto testers' devices with TestFlight, and choose between internal and external testing.

## Signature / Usage

Build and submit for internal testing in one step, or submit an existing production build:

```sh
eas build --platform ios --auto-submit

eas submit --platform ios
```

Target an existing internal group from the CLI:

```sh
eas submit --platform ios --groups "QA Team" --what-to-test "New onboarding flow"
```

Distribute to internal and external groups with the pre-packaged `testflight` workflow job:

```yaml
jobs:
  build_ios:
    name: Build iOS
    type: build
    params:
      platform: ios
      profile: production

  testflight:
    name: Distribute to TestFlight
    type: testflight
    needs: [build_ios]
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
      internal_groups: ['QA Team']
      external_groups: ['Public Beta']
      changelog: |
        What's new in this release:
        - New features
        - Bug fixes
```

## Options / Props

| Purpose | Internal testing | External testing |
| --- | --- | --- |
| Who can test | Users on your App Store Connect team | Anyone; no App Store Connect account needed |
| Maximum testers | 100 | 10,000 per app |
| Beta App Review | Not required | Required on the first build of every app version |
| How testers are invited | Email only | Email, CSV import, or shareable public link |
| Beta app description | Not required | Required |
| Feedback email | Not required | Required |
| Time to reach testers | Immediately after processing | After Beta App Review approves the build |
| Build expiry | 90 days from upload | 90 days from upload |
| Devices per tester | 30 | 30 |

## Notes

- Prerequisites: paid Apple Developer account; an app record in App Store Connect (`eas submit` creates one on the first submission, or set `ascAppId` in the submit profile); a production build with `"distribution": "store"` (default for the EAS Build `production` profile); the TestFlight app on testers' devices.
- The official page also describes `npx testflight` (also `yarn dlx testflight`, `pnpm dlx testflight`, `bunx testflight`), which creates credentials, runs a production build on EAS Build, and submits it for internal testing.
- EAS internal distribution (ad hoc / enterprise-signed builds installed from a URL, limited to registered UDIDs) is not TestFlight internal testing, which needs `"distribution": "store"` and goes through Apple.
- Apple processing usually takes 5 to 10 minutes with no guaranteed time. You must create an internal group before App Store Connect lets you create an external group.
- `--groups` accepts internal group names only; use the `testflight` workflow job for external groups. `submit_beta_review` defaults to `true` when `external_groups` is provided. Complete the TestFlight test information in App Store Connect before running the job with external groups.
- Moving from internal to external testing needs no new build; add the existing build to an external group and submit for Beta App Review.
- Managing external testing requires the Account Holder, Admin, or App Manager role (Developer / Marketing can manage internal testing only). Only an Account Holder or Admin can create the App Store Connect API key EAS Submit uses.
- A build stuck on "Missing Compliance" can be fixed once in app config with `ios.config.usesNonExemptEncryption: false`, only when the app uses no encryption beyond what Apple exempts. The declaration covers third-party libraries and applies to TestFlight builds.
- A TestFlight build is not released on the App Store; release is a separate manual submission. To stop testers, use TestFlight > select the build > Expire Build.
- Source modificationDate: July 21, 2026 (fetched 2026-10-17).

## Related

- [Submit to the Apple App Store with EAS Submit](./submit-ios.md)
- [Pre-packaged jobs in EAS Workflows](./workflows-pre-packaged-jobs.md)
- [EAS CLI reference](./eas-cli.md)
