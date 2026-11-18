---
source: https://docs.cloud.google.com/developer-device-platform/device-run/android-instrument
---

# Run an Android instrumentation test with Device Run

Run an Android instrumentation test APK on physical or virtual devices with `gcloud beta device-run sessions submit instrumentation`, optionally with Android Test Orchestrator and sharding, then find results in Cloud Storage and the Google Cloud console. Status: Preview (`gcloud beta`).

## Signature / Usage

### Run a test (required: `--device` and `--test`)

```bash
gcloud beta device-run sessions submit instrumentation \
  --device shiba-34 \
  --apps /path/to/app.apk \
  --test /path/to/test.apk
```

Results are at `gs://BUCKET_NAME/automation/sessions/SESSION_ID/`; the command output links to `https://console.cloud.google.com/storage/browser/BUCKET_NAME/automation/sessions/SESSION_ID/`.

### Asynchronous run

The submit command blocks and prints a summary by default. `--async` returns a session ID after the upload to Cloud Storage:

```bash
gcloud beta device-run sessions submit instrumentation \
  --device shiba-35 \
  --test ./ANDROID_TESTS.apk \
  --async
```

```bash
gcloud beta device-run sessions wait SESSION_ID
```

### Multiple devices

```bash
gcloud beta device-run sessions submit instrumentation \
  --device shiba-34,tokay-36 \
  --test ./ANDROID_TESTS.apk
```

```bash
gcloud beta device-run sessions submit instrumentation \
  --device shiba-34 \
  --device tokay-36 \
  --test ./ANDROID_TESTS.apk
```

### Test timeout

```bash
gcloud beta device-run sessions submit instrumentation \
  --device shiba-35 \
  --test ./ANDROID_TESTS.apk \
  --instrumentation-timeout=10m
```

### Software versions and Orchestrator

```bash
gcloud beta device-run software-versions list
```

```text
ID                                NAME                              SOFTWARE_TYPE               VERSION  STATE   IS_DEFAULT
androidx-test-orchestrator-1-4-1  AndroidX Test Orchestrator 1.4.1  ANDROIDX_TEST_ORCHESTRATOR  1.4.1    ACTIVE  True
androidx-test-orchestrator-1-6-1  AndroidX Test Orchestrator 1.6.1  ANDROIDX_TEST_ORCHESTRATOR  1.6.1    ACTIVE
xcode-16-4                        Xcode 16.4                        XCODE                       16.4     ACTIVE
xcode-26-2                        Xcode 26.2                        XCODE                       26.2     ACTIVE  True
```

```bash
gcloud beta device-run software-versions describe androidx-test-orchestrator-1-4-1
```

Enable Orchestrator (off by default) by passing the version; `auto` uses the system default:

```bash
gcloud beta device-run sessions submit instrumentation \
  --device shiba-35 \
  --test ./ANDROID_TESTS.apk \
  --orchestrator-version=1.4.1
```

### Choose devices

```bash
gcloud beta device-run devices list
```

```text
ID        MAKE    NAME     MODEL FORM      OS_VERSION CAPACITY  AVAILABILITY  PRODUCTS
tegu-35   Google  Pixel 9a tegu  PHYSICAL  35         MEDIUM    LOW           Automation, Streaming
tokay-34  Google  Pixel 9  tokay PHYSICAL  34         HIGH      HIGH          Automation, Streaming
```

### Uniform sharding

```bash
gcloud beta device-run sessions submit instrumentation \
    --test path/to/test.apk \
 --device shiba-34,tokay-36 \
    --sharding-option=uniform \
    --uniform-sharding-count=2
```

Output shows `Job status: 2 running`; one job per device is created, and because the inputs are identical, validation runs once.

### Smart sharding

Adapted (not in the official docs): `--smart-sharding-record-name=test.yaml` becomes `--smart-sharding-record-name=test` because the flag takes the record file name without the extension.

```bash
gcloud beta device-run sessions submit instrumentation \
    --test path/to/test.apk \
    --device shiba-34,shiba-35,tokay-36 \
    --sharding-option=smart \
    --smart-sharding-max-shard-count=3 \
    --smart-sharding-target-duration=5m \
    --smart-sharding-record-name=test
```

### Explore and manage a session

```bash
gcloud beta device-run sessions describe SESSION_ID
```

```text
Session SESSION_ID finished with result [FAILED].
Result files are stored at [https://console.cloud.google.com/storage/browser/BUCKET_NAME/automation/sessions/SESSION_ID/].
JOB NAME  EXECUTION NAME  EXECUTION RESULT
job-000   all             FAILED: 2 test cases failed, 5 passed
```

```bash
gcloud beta device-run sessions list --limit 5
```

```bash
gcloud beta device-run sessions list --filter RUNNING
```

Cancellation is only marked immediately and happens asynchronously in the backend; cancelling a finished session is not an error and prints the current status:

```bash
gcloud beta device-run sessions cancel SESSION_ID
```

## Options / Props

### Instrumentation options

| Flag | Description |
|---|---|
| `--device` | Device IDs, comma-separated or repeated. |
| `--test` | Test APK path (local or `gs://`). |
| `--other-files-to-push=SOURCE=DEST,...` | Push files (ML model weights, test inputs, `.so` libraries) before execution; `SOURCE` is local or `gs://`, `DEST` is the device path. |
| `--paths-to-pull=DEVICE_PATH,...` | Pull files or directories from the device after execution. |
| `--bucket-name=` | Existing bucket name without `gs://` scheme or path; default `PROJECT_ID-devicerun` (used or created). |
| `--flaky-test-attempts=3` | Maximum attempts per job or shard; default `1`. |
| `--orientation` | `portrait` or `landscape`. |
| `--locale=en-US` | Device locale. |
| `--coordinates=LATITUDE,LONGITUDE` | Mock GPS location. |
| `--video`, `--dumpsys`, `--bugreport` | Each `always` or `on-failure`. |
| `--labels=KEY=VALUE,...` | User-defined labels on the session. |
| `--apps=path1,path2,...` | APKs, AABs or APKS installed before the test, in the order given. |
| `--instrumentation-timeout=10m` | Valid range `1m` to `3h`; default `5m`. |
| `--orchestrator-version=VERSION` | Enables Android Test Orchestrator; `auto` for the system default. |
| `--additional-test-options clearPackageData=true` | With Orchestrator, removes all shared state after each test. |

### Sharding flags

| Flag | Description |
|---|---|
| `--sharding-option` | `uniform` or `smart`. |
| `--uniform-sharding-count=` | Number of shards for uniform sharding. |
| `--smart-sharding-max-shard-count=` | Maximum shards; unset or `0` uses system-defined limits; valid range 0 to 20 for physical devices and 0 to 200 for virtual devices. |
| `--smart-sharding-target-duration=` | Target time per shard (such as `2m`, `10m`, `1h`); valid range `2m` to `1h`; required with `--sharding-option=smart`. |
| `--smart-sharding-record-name=` | Record file name without extension; required with smart sharding. The YAML file is in the `--bucket-name` bucket under `smart-sharding/`; created if missing, updated when the session completes. |

## Notes

- Status: Preview.
- Deprecated: `gcloud beta device-run sessions submit instrumentation --apps` is marked "(DEPRECATED) ... The --apps flag is deprecated and will be removed in an upcoming release. Use --target-app, --pre-target-apps and --post-target-apps instead." (gcloud 593.0.0 help). The source examples use `--apps`; they are kept as written.
- Sharding can cost more: it shortens total time but app start-up overhead on each shard may increase individual device times. Use uniform sharding when test cases take similar time and smart sharding when durations vary greatly. Keep the number of `--device` values less than or equal to the number of shards to avoid device availability bottlenecks. Sharding is unnecessary for few or short test suites.
- Orchestrator runs each test in its own `Instrumentation`, which can increase run time, quota usage or billed time and exceed device timeout limits; raise `--instrumentation-timeout` if needed.
- The source's smart sharding sample output reads "finished with result [ERROR]" while all three jobs show `PASSED`; that output block is omitted. The source also shows sample `sessions list` output tables and the `--filter RUNNING` empty result `Listed 0 items.`.
- Corrected from the official docs: the smart sharding example passes `--smart-sharding-record-name=test.yaml`, while the flag description (and the gcloud 593.0.0 help) says the name excludes the file extension and the file is stored with a `.yaml` extension; the example uses `test`.
- Prerequisites: a project, the Quickstart, `gcloud` authentication, the Device Run overview, and a built instrumented test.
- Source: https://docs.cloud.google.com/developer-device-platform/device-run/android-instrument (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [device-run.md](./device-run.md)
- [ios.md](./ios.md)
- [share-storage.md](./share-storage.md)
