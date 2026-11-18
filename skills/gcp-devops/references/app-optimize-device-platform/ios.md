---
source: https://docs.cloud.google.com/developer-device-platform/device-run/ios
---

# Run an iOS XCTest with Device Run

Build and package XCTests into a ZIP, then run them on physical iOS devices with `gcloud alpha device-run sessions submit xctest` and find results in Cloud Storage and the Google Cloud console. Status: Preview, and the iOS commands are on the `gcloud alpha` track.

## Signature / Usage

### Build for physical iOS devices

Workspace:

```bash
xcodebuild build-for-testing \
  -workspace YourProject.xcworkspace \
  -scheme YourScheme \
  -derivedDataPath ./build \
  -destination "generic/platform=iOS"
```

Standalone project:

```bash
xcodebuild build-for-testing \
  -project YourProject.xcodeproj \
  -scheme YourScheme \
  -derivedDataPath ./build \
  -destination "generic/platform=iOS"
```

Build products are under `./build/Build/Products`.

### Verify signatures

```bash
codesign --verify --deep --verbose ./build/Build/Products/Debug-iphoneos/YourApp.app
```

Expected output: `YourApp.app: valid on disk`. For an XCUITest, also verify the runner:

```bash
codesign --verify --deep --verbose ./build/Build/Products/Debug-iphoneos/YourApp-Runner.app
```

### Create the ZIP

`Debug-iphoneos/` and the `.xctestrun` file must be at the root of the ZIP; do not zip the outer `Products/` or `build/` folder.

```bash
cd ./build/Build/Products
zip -r MyTests.zip Debug-iphoneos *.xctestrun
```

### Run a test (required: `--device` and `--test`)

```bash
gcloud alpha device-run sessions submit xctest \
  --device iphonese3-18-4 \
  --test ./MyTests.zip
```

```text
Creating session [session-ee78b0ed] in location [global].
Result files will be stored at [https://console.cloud.google.com/storage/browser/BUCKET_NAME/automation/sessions/session-ee78b0ed/].

Waiting for session [session-ee78b0ed] to complete....
```

### Asynchronous run

```bash
gcloud alpha device-run sessions submit xctest \
  --device iphonese3-18-4 \
  --test ./IOS_TESTS.zip \
  --async
```

```bash
gcloud alpha device-run sessions wait SESSION_ID
```

### Multiple devices

```bash
gcloud alpha device-run sessions submit xctest \
  --device iphonese3-18-4,iphonese3-26-3 \
  --test ./IOS_TESTS.zip
```

```bash
gcloud alpha device-run sessions submit xctest \
  --device iphonese3-18-4 \
  --device iphonese3-26-3 \
  --test ./IOS_TESTS.zip
```

### Test timeout

```bash
gcloud alpha device-run sessions submit xctest \
  --device iphonese3-18-4 \
  --test ./IOS_TESTS.zip \
  --xctest-timeout=10m
```

### Xcode versions

```bash
gcloud alpha device-run software-versions list
```

```bash
gcloud alpha device-run software-versions describe xcode-16-4
```

```bash
gcloud alpha device-run sessions submit xctest \
  --device iphonese3-18-4 \
  --test ./IOS_TESTS.zip \
  --xcode-version=16.4
```

### Choose devices

```bash
gcloud alpha device-run devices list
```

```text
ID                MAKE   NAME           MODEL        HARDWARE_TYPE  OS_VERSION  CAPACITY  AVAILABILITY  PRODUCTS
iphonese3-18-4    Apple  iPhone SE 3             iphonese3    PHYSICAL       18.4        NONE      NONE          Automation
iphonese3-26-3    Apple  iPhone SE 3             iphonese3    PHYSICAL       26.3        NONE      NONE          Automation
```

### Manage sessions

```bash
gcloud alpha device-run sessions describe SESSION_ID
```

```bash
gcloud alpha device-run sessions list --limit=10
```

```bash
gcloud alpha device-run sessions cancel SESSION_ID
```

```bash
gcloud alpha device-run operations cancel OPERATION_ID
```

`sessions describe --full` adds device allocations, execution IDs and Cloud Storage artifact paths.

## Options / Props

### xctest flags

| Flag | Description |
|---|---|
| `--device` | Required (at least one); repeat or comma-separate for multiple devices. |
| `--test` | Required; the ZIP (local or `gs://`). |
| `--additional-apps=/path/to/AdditionalApp.ipa` | Install extra `.ipa` packages before the test. |
| `--xctestrun-file=/path/to/CustomTests.xctestrun` | Custom `.xctestrun` configuration. |
| `--xcode-version=xcode-16-4` | Xcode version by catalog ID (also accepts `16.4`). |
| `--xctest-timeout=10m` | Valid range `1m` to `1h`; default `5m`. |
| `--labels=env=staging,owner=my-team` | User-defined metadata on the session. |
| `--video=always` or `--video=on-failure` | One video per UI test case; requires iOS 17 or later; unit tests are not recorded. |
| `--other-files-to-push=/tmp/data.txt=com.example.app:/Documents/data.txt` | Push files to the app data container before the test. |
| `--paths-to-pull=com.example.app:/Documents/output.txt` | Pull files from the app data container afterwards. |
| `--flaky-test-attempts=3` | Maximum attempts; default `1`. |
| `--bucket-name=my-custom-bucket` | Custom bucket; default `PROJECT_ID-devicerun`. |
| `--async` | Return a session ID immediately. |

## Notes

- Status: Preview. The overview page says iOS support is "coming soon" while this page documents it; the gcloud 593.0.0 help has `submit xctest` only under `gcloud alpha device-run` (the `beta` group has `instrumentation` and `android-executable` only), so the commands here use `gcloud alpha`. Alpha commands might change without notice, and the help warns that API permission errors may mean an invitation-only early access allowlist.
- Signing: configure code signing for the app target and the test runner target in Xcode. You do not need to register Device Run device UDIDs in your Apple Developer account; DDP re-signs the app and test bundles with a lab provisioning profile, so a valid local development certificate and provisioning profile is enough. A `YourApp-Runner.app` exists only for XCUITest targets; application-hosted unit tests are embedded in the host app.
- Firebase Test Lab: Device Run accepts the same test package (the `Debug-iphoneos/` directory and the `.xctestrun` file from `Build/Products`), so an existing packaging pipeline can be reused unchanged.
- Large ZIP or IPA uploads are slow; reference existing `gs://` paths directly.
- Source: https://docs.cloud.google.com/developer-device-platform/device-run/ios (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [device-run.md](./device-run.md)
- [android-instrument.md](./android-instrument.md)
- [share-storage.md](./share-storage.md)
