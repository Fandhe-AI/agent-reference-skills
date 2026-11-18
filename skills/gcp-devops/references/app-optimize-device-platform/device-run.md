---
source: https://docs.cloud.google.com/developer-device-platform/device-run
---

# Device Run overview

Device Run is the Developer Device Platform service that runs tests and executables on physical and virtual Android devices and physical iOS devices. It is driven by `gcloud beta device-run` (iOS submit uses `gcloud alpha device-run`, see the iOS page) or the Device Run REST API. This page summarizes capabilities and the settings shared by Android instrumentation tests, Android executables and iOS XCTests. Status: Preview.

## Signature / Usage

### Input validation error

A validation failure ends as `ERROR` instead of `PASSED` or `FAILED`:

```text
Session [session-94b57778] finished with result [ERROR].
JOB NAME  EXECUTION NAME  EXECUTION RESULT
job-000   execution-000   ERROR
```

Show the details with `--full`:

```bash
gcloud beta device-run sessions describe --full session-94b57778
```

Output resembling:

```text
name: projects/user-test1/locations/global/sessions/session-94b57778
sessionConfig:
  displayName: instrumentation-session
  jobConfigs:
  -   action:
      androidInstrumentationTest:
        testInstallable:
          files:
          -   gcsInputFile:
              path: gs://user-test1-devicerun/automation/inputs/2026-09-16_18:55.17372947_EECF/my-test.apk
    allocationConfig:
      deviceConfigs:
      -   actions:
        -   androidLogcat: {}
        requirement:
          deviceId: mediumphone-arm-34
    displayName: job-000
  outputDirectoryConfig:
    gcsOutputDirectory:
      path: gs://user-test1-devicerun/automation/sessions
sessionReport:
  endTime: '2026-09-16T18:55:49.721Z'
  id: ed681f23-669b-4464-8a93-b28456e58136
  jobReports:
  -   displayName: job-000
    endTime: '2026-09-16T18:55:45.839Z'
    executionReports:
    -   displayName: execution-000
      endTime: '2026-09-16T18:55:46.694Z'
      id: ce370173-af94-4dd7-acc6-0863e4d2e9ec
      result:
        cause:
          summary:
            message: The instrumentation target package does not match any of the
              installable packages.
            reason: INSTRUMENTATION_TARGET_MISMATCH
            type: CUSTOMER
        resultType: ERROR
      startTime: '1970-01-01T00:00:00Z'
      status:
        statusType: PENDING
    id: 953b5106-3c20-40f0-aceb-18af89cd1b83
    result:
      cause:
        summary:
          message: The instrumentation target package does not match any of the installable
            packages.
          reason: INSTRUMENTATION_TARGET_MISMATCH
          type: CUSTOMER
      resultType: ERROR
    startTime: '2026-09-16T18:55:31.651Z'
    status:
      statusType: DONE
  result:
    resultType: ERROR
  startTime: '2026-09-16T18:55:24.442Z'
  status:
    statusType: DONE
```

## Options / Props

### Required flags

| Flag | Description |
|---|---|
| `--device` | The device, for example `--device shiba-35` or `--device iphonese3-18-4`. |
| `--test` | The test package for test runs, for example `--test /path/to/test.apk` or `--test /path/to/MyTests.zip`. |
| `--executable` | The executable binary or script for Android executable runs, for example `--executable /path/to/my_executable`. |

### Capabilities

| Area | Capability |
|---|---|
| Test types | Android instrumentation tests (`.apk`), Android executables (compiled binaries), iOS XCTests (`.ipa` or `.zip`). |
| Device targeting | `--device` with OS and model identifiers from the Device Catalog; comma-separated IDs or repeated `--device` flags run the same suite on multiple devices in parallel. |
| Execution mode | Synchronous by default (summary on completion); `--async` returns a session ID immediately, monitored with `gcloud beta device-run sessions wait`. |
| Timeouts | `--instrumentation-timeout` or `--xctest-timeout`. |
| Flaky tests | `--flaky-test-attempts` sets maximum retry attempts. |
| Software versions | `gcloud beta device-run software-versions list` and `describe` show packages such as AndroidX Test Orchestrator and Apple Xcode, supported OS versions and defaults. |
| Android Test Orchestrator | Runs each test in its own `Instrumentation` instance to isolate shared state and crashes. |
| Sharding | `--sharding-option=uniform` (even split across a given number of shards) or `--sharding-option=smart` (historical durations, target total duration). |
| Session control | `sessions list`, `sessions describe`, `sessions cancel` to list, describe, filter or cancel runs. |
| Early validation | Submitted binaries and configuration are validated; errors state causes such as target package mismatches. |

### Cloud Storage paths

| Item | Behavior |
|---|---|
| Default bucket | `PROJECT_ID-devicerun`. |
| Custom bucket | `--bucket-name=my-custom-bucket`. |
| Input files | Local paths given to `--test`, `--executable`, `--apps`, `--additional-apps`, `--other-files-to-push` or `--xctestrun-file` are copied to `gs://BUCKET_NAME/automation/inputs/DATE_TIME_FOUR_CHARS_SUFFIX/` on every run. |
| Direct `gs://` paths | Reference existing Cloud Storage paths to skip upload time for large files. |
| Result files | `gs://BUCKET_NAME/automation/sessions/session-[SESSION_ID]/`. |

## Notes

- Status: Preview.
- You control the Cloud Storage bucket: DDP does not delete its contents. Remove them manually when no longer needed or configure lifecycle management on the bucket (see the Cloud Storage object deletion overview). Deleting objects is irreversible; try it on a disposable bucket first.
- To use the Google Cloud CLI, provide the project ID; append `--help` to any `gcloud` command for usage details. Command summary: https://docs.cloud.google.com/sdk/gcloud/reference/beta/device-run. REST reference: https://docs.cloud.google.com/developer-device-platform/reference/device-run/rest.
- The Android executable page is linked by the source but is not part of this category.
- The source also describes migrating from Firebase Test Lab (links to a migration guide, flag translation and migration skill).
- Source: https://docs.cloud.google.com/developer-device-platform/device-run (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [android-instrument.md](./android-instrument.md)
- [ios.md](./ios.md)
- [share-storage.md](./share-storage.md)
- [quickstart.md](./quickstart.md)
