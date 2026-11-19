---
source: https://devicerun.googleapis.com/$discovery/rest?version=v1
---

# Device Run API message schemas (devicerun)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/devicerun/`.

### `AllocationConfig`

- Allocation config.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `deviceConfigs` | array<DeviceConfig> | Required. At least one device config is required. If more than one device config is required, the multiple devices are allocated to each shard of the OmniLab job to run multi-device-interaction tests. |

### `AndroidBugreportDeviceAction`

- Captures a bugreport from the device. The output will be written to a file named `bugreport.zip` in the execution output directory.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `collectOnPass` | boolean | Optional. Whether to deliver the bugreport when the test passes. If `false`, the bugreport is skipped on pass to save time (default behavior). If `true`, the bugreport is always delivered. |

### `AndroidDumpsysDeviceAction`

- Captures dumpsys output from the device. The output will be written to a file named `dumpsys.log` in the execution output directory.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `collectOnPass` | boolean | Optional. Whether to deliver the dumpsys when the test passes. If `false`, the dumpsys is skipped on pass to save time (default behavior). If `true`, the dumpsys is always delivered. |

### `AndroidInstallPackagesDeviceAction`

- Installs Android packages on the device. At least one installable is specified when using this device action. Limits: - A maximum of 20 installables in total are allowed. - A maximum of 100 files are allowed in total across all installables.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `installables` | array<AndroidInstallable> | Optional. Deprecated: use `pre_target_app_installables`, `target_app` and `post_target_app_installables` instead. The Android packages to install on the device. The installation will be performed in the order specified, before the installables of all other fields. |
| `postTargetAppInstallables` | array<AndroidInstallable> | Optional. The Android packages to install on the device after `target_app` (if specified) is installed. The installation will be performed in the order specified. |
| `preTargetAppInstallables` | array<AndroidInstallable> | Optional. The Android packages to install on the device before `target_app` (if specified) is installed. The installation will be performed in the order specified. |
| `targetApp` | AndroidInstallable | Optional. The primary Android package to install, serving as the target package for subsequent actions and as the installation ordering anchor. Whether this package is treated as the application under test depends on the job action: - Actions that require an explicit target package (such as performance metrics collection, or accessibility scans) use this package to identify the application to inspect or drive. - Actions that discover or manage targets independently (such as Android instrumentation tests, where target packages are defined in the test runner manifest) treat this field primarily as an installation order anchor between pre- and post-installables. Optional. If omitted, all packages in `pre_target_app_installables` and `post_target_app_installables` are installed without a designated target package. |

### `AndroidInstallable`

- An Android Installable represents the file(s) for installing an Android package on a device. This can be an APK, an Android App Bundle (AAB), or an APK Set.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `files` | array<InputFile> | Required. Files that make up the package. Supported formats are distinguished by their file extension: - APK: One or more files with extension `.apk`. - App Bundle: A single file with extension `.aab`. - APK Set: A single file with extension `.apks`. |

### `AndroidInstrumentationTest`

- The configuration of an Android instrumentation test. See https://developer.android.com/training/testing/instrumented-tests for more information on Android instrumentation tests.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `additionalTestOptions` | object | Optional. Additional test options to pass to the test runner. Passed to `am instrument` command as `-e` options, which will be passed to the instrumentation test runner using its `onCreate()` method. Formats supported in test_targets are not allowed to be used here. Limits: - Maximum number of entries: 32. - Maximum key size: 64 bytes (UTF-8). - Maximum value size: 1024 bytes (UTF-8). |
| `enableCodeCoverage` | boolean | Optional. Whether to enable code coverage collection for the test. A coverage file `coverage.ec` will be uploaded to the results folder. For this to work, your classes have to be instrumented offline (build time) by EMMA/JaCoCo. |
| `instrumentationTimeout` | string (google-duration) | Optional. The timeout of the instrumentation test. Default value: 5 min. Range: \[1 min, 3 hours\]. |
| `orchestratorVersion` | string | Optional. The version of the Android Test Orchestrator to use for the test. The available orchestrator versions can be retrieved from the catalog service. If set to "auto", the default orchestrator is used. If not set, no orchestrator is used. |
| `smartSharding` | SmartSharding | Optional. Smart sharding strategy to split the job into multiple shards based on the test methods and their execution time. |
| `testInstallable` | AndroidInstallable | Required. The test package to install and run the test. |
| `testRunnerClass` | string | Optional. Full class name of the test runner class. The class must be `androidx.test.runner.AndroidJUnitRunner` or a subclass of it. The default value is determined by examining the application's manifest. If multiple instrumentations are found, the first one in the manifest will be used. |
| `testTargets` | array<string> | Optional. A list of test targets or target filters to run. Each target must be fully qualified with the package name or class name, in one of these formats: - `package package_name` - `notPackage com.package.to.skip` - `class package_name.class_name` - `class package_name.class_name#method_name` - `notClass com.foo.ClassToSkip` - `notClass com.foo.ClassName#testMethodToSkip` - `annotation com.foo.AnnotationToRun` - `notAnnotation com.foo.AnnotationToSkip` - `size [small\|medium\|large]` Formats like `testfile` or `notTestfile` won't be supported. If empty, all targets in the module will be run. Limits: - Maximum number of entries: 1024. |
| `uniformSharding` | UniformSharding | Optional. Uniform sharding strategy to split the job into multiple shards with equal number of test methods. |

### `AndroidLogcatDeviceAction`

- Collects logcat output from the device. The output will be written to a file named `logcat.txt` in the execution output directory.
- Version: v1alpha

### `AndroidMockLocationDeviceAction`

- Mocks the location of the Android device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `location` | LatLng | Required. The mock location to set on the device. |

### `AndroidNativeBinary`

- The configuration of an Android native binary execution.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `androidNativeBinary` | InputFile | Required. The file path of the Android native binary. |
| `args` | array<string> | Optional. Arguments for running the binary file. The flags will be appended to the command line that invokes the binary. Limits: - Maximum number of entries: 64 - Maximum entry size: 1024 bytes (UTF-8) |
| `envVars` | object | Optional. A map of environment variables to set for the binary process. The keys are the variable names and the values are the variable values. Limits: - Maximum number of entries: 32 - Maximum key size: 64 bytes (UTF-8) - Key regex: `a-zA-Z_*` - Maximum value size: 1024 bytes (UTF-8) |
| `executionTimeout` | string (google-duration) | Optional. The timeout of the execution. Default value: 5 min. Range: \[1 min, 3 hours\]. |

### `AndroidOrientationDeviceAction`

- Sets the orientation of the device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `orientation` | string | Required. The orientation to set the device to. One of `portrait` or `landscape`. |

### `AndroidPullFilesDeviceAction`

- Pulls directories and files from the device at the end of the run. Files will be copied to the '/artifacts' directory, with the absolute path structure preserved. Note that: 1. A clean device is provided for the run. 2. Any existing files in the output directory may be overwritten. 3. Pulling files is best effort. Will skip files if they don't exist on the device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `paths` | array<string> | Required. Absolute directory or file paths to pull from the device. Limits: - A maximum of 10 paths are allowed. |

### `AndroidPushFilesDeviceAction`

- Pushes files to the device at the beginning of the run. Files are overwritten if a file with the same path already exists on the device, if device permissions allow.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `fileConfigs` | array<AndroidPushFilesDeviceActionFileConfig> | Required. Configs of pushing files to the device. Limits: - A maximum of 50 files are allowed. |

### `AndroidPushFilesDeviceActionFileConfig`

- The configuration of pushing a file to the device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `destinationPath` | string | Required. The destination path on the device. |
| `sourceFile` | InputFile | Required. The file to be pushed to the device. |

### `AndroidRecordVideoDeviceAction`

- Records a video of the device screen during the run. The video will be written to a file named `video.mp4` in the execution output directory.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `discardOnPass` | boolean | Optional. Whether to discard and not upload the recording when the test passes. Default is `false`. |

### `AndroidSwitchLocaleDeviceAction`

- Switches the locale (language and region) of the device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `localeCode` | string | Required. The locale (language and region) to switch the device to. The format is `language-region`, e.g. "en-US", "zh-CN", etc. The typical language value is a two or three-letter language code as defined in ISO639. The typical region value is a two-letter ISO 3166 code or a three-digit UN M.49 area code. |

### `BatchGetSessionsResponse`

- Response including the requested sessions.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `sessions` | array<Session> | The requested sessions, in the same order as the `names` in the request. |

### `CancelSessionRequest`

- Request to cancel a session.
- Version: v1alpha

### `CancelSessionResponse`

- Response of the cancel session request.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `cancelResult` | string enum | The result of the request. Values: `CANCEL_RESULT_UNSPECIFIED`, `SESSION_MARKED_AS_CANCELLED`, `SESSION_FINISHED`. |

### `CatalogAndroidDeviceDetails`

- Android-specific device attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildType` | string | Output only. Mirrors the AOSP `ro.build.type` property, e.g. "user", "userdebug", "eng". Empty if unknown. |
| `supportedAbis` | array<string> | Output only. Lists ABIs supported by the device (android.os.Build.SUPPORTED_ABIS), most preferred first, e.g. "arm64-v8a". |

### `CatalogAndroidxTestOrchestratorDetails`

- AndroidX Test Orchestrator-specific attributes. Reserved for future orchestrator-only fields.
- Version: v1

### `CatalogAutomationSupport`

- Per-product metadata for the Automation (DeviceRun) product.
- Version: v1

### `CatalogDevice`

- A single routable device configuration in the catalog.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessDeniedReasons` | array<string> | Output only. Reasons for access denial. This model is accessible/usable if this list is empty, otherwise the model is viewable only. Values: `ACCESS_DENIED_REASON_UNSPECIFIED`, `EULA_NOT_ACCEPTED`. |
| `androidDetails` | CatalogAndroidDeviceDetails | Output only. Contains Android-specific attributes (set when platform == ANDROID). |
| `availability` | CatalogDeviceAvailability | Output only. Reports the current fleet availability for this device configuration. |
| `displayName` | string | Output only. Provides a human-readable display name, e.g. "Pixel 5". |
| `formFactor` | string enum | Output only. Specifies the form factor of the device. Values: `FORM_FACTOR_UNSPECIFIED`, `PHONE`, `TABLET`, `WEARABLE`, `TV`. |
| `hardwareType` | string enum | Output only. Indicates whether the device is physical or virtual. Values: `HARDWARE_TYPE_UNSPECIFIED`, `PHYSICAL`, `VIRTUAL`. |
| `iosDetails` | CatalogIosDeviceDetails | Output only. Contains iOS-specific attributes (set when platform == IOS). |
| `labInfo` | CatalogLabInfo | Output only. The lab hosting this device. |
| `labels` | object | Output only. Additional information. Informational only. May change over the lifecycle of a device. |
| `lifecycle` | CatalogLifecycle | Output only. The device lifecycle (maturity stage and removal date). |
| `manufacturer` | string | Output only. Specifies the hardware manufacturer of the device. |
| `modelCode` | string | Output only. Provides a human-readable model identifier for this device, independent of OS version. May be empty. Platform-dependent: \* Android physical: hardware codename (android.os.Build.DEVICE), e.g. "shiba". \* Android virtual: AVD model identifier, e.g. "MediumPhone.arm". \* iOS: model identifier, e.g. "iphone14pro". |
| `name` | string | Identifier. Identifies the device resource. Format: `projects/{project}/locations/{location}/devices/{device}`. The {device} segment is an opaque, stable string. Clients must not parse it to derive or assume device-specific details. |
| `osVersion` | string | Output only. Specifies the OS version, e.g. "30" (Android API level) or "17.4" (iOS). |
| `platform` | string enum | Output only. Specifies the platform of the device. Values: `PLATFORM_UNSPECIFIED`, `ANDROID`, `IOS`. |
| `primaryScreen` | CatalogScreenMetrics | Output only. Measurements of the primary device screen. Informational only. Unset for devices without a screen (e.g. some wearables). |
| `supportedProducts` | array<CatalogSupportedProduct> | Output only. Products/Services supported by this device. |

### `CatalogDeviceAvailability`

- Fleet availability for a device configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `available` | string enum | Output only. Specifies the current availability bucket (idle, immediately allocatable devices) for this device configuration. This is a best-effort snapshot, refreshed periodically. It fluctuates depending on traffic as other requests allocate devices. Values: `AVAILABILITY_UNSPECIFIED`, `AVAILABILITY_NONE`, `AVAILABILITY_LOW`, `AVAILABILITY_MEDIUM`, `AVAILABILITY_HIGH`. |
| `capacity` | string enum | Output only. Specifies the current capacity bucket for this device configuration. Represents the total number of online devices (idle or in use). Values: `CAPACITY_UNSPECIFIED`, `CAPACITY_NONE`, `CAPACITY_LOW`, `CAPACITY_MEDIUM`, `CAPACITY_HIGH`. |

### `CatalogDeviceStreamingSupport`

- Per-product metadata for the DeviceStreaming product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minimumAndroidStudioVersion` | string | Output only. Specifies the minimum Android Studio version that supports this device. Optional; only set when the device is known to work only at or above a certain Android Studio version. Expected format "major.minor.micro.patch", e.g. "5921.22.2211.8881706". |

### `CatalogIosDeviceDetails`

- iOS-specific device attributes. Reserved for future iOS-only fields.
- Version: v1

### `CatalogLabInfo`

- The lab hosting a device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. Display name of the lab where the device is hosted. If empty, the device is hosted in a Google owned lab. |
| `regionCode` | string | Output only. The Unicode country/region code (CLDR) of the lab where the device is hosted, e.g. "US" for United States, "KR" for South Korea. Empty when the hosting region is not published. |

### `CatalogLifecycle`

- Catalog resource lifecycle: maturity state plus key lifecycle dates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `removalDate` | Date | Output only. Specifies the date the resource is scheduled to be removed from the catalog. Only set when `state == DEPRECATED`. |
| `state` | string enum | Output only. Specifies the current maturity state of the resource. Values: `STATE_UNSPECIFIED`, `PREVIEW`, `ACTIVE`, `DEPRECATED`. |

### `CatalogListDevicesResponse`

- Response including listed devices.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `devices` | array<CatalogDevice> | The list of devices. |
| `nextPageToken` | string | Token to receive the next page of devices. This will be absent if the end of the response list has been reached. |

### `CatalogListSoftwareVersionsResponse`

- Response including listed software versions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to receive the next page of software versions. This will be absent if the end of the response list has been reached. |
| `softwareVersions` | array<CatalogSoftwareVersion> | The list of software versions. |

### `CatalogScreenMetrics`

- Screen measurements of a device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `densityDpi` | integer (int32) | Output only. Pixel density in dots per inch (dpi). |
| `heightPx` | integer (int32) | Output only. Height in pixels. |
| `widthPx` | integer (int32) | Output only. Width in pixels. |

### `CatalogSoftwareVersion`

- A single software version in the catalog.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `androidxTestOrchestratorDetails` | CatalogAndroidxTestOrchestratorDetails | Output only. Contains AndroidX Test Orchestrator-specific attributes (set when software_type == ANDROIDX_TEST_ORCHESTRATOR). |
| `displayName` | string | Output only. Provides a human-readable name for this version, e.g. "AndroidX Test Orchestrator 1.4.1". |
| `isDefault` | boolean | Output only. Indicates whether the system uses this version when a request does not select one explicitly. Exactly one version per `software_type` is the default, and it may change over time. |
| `lifecycle` | CatalogLifecycle | Output only. The version lifecycle (maturity stage and removal date). |
| `name` | string | Identifier. Identifies the software version resource. Format: `projects/{project}/locations/{location}/softwareVersions/{software_version}`. The {software_version} segment is an opaque, stable string. Clients must not parse it to derive or assume the version. |
| `softwareType` | string enum | Output only. Specifies which software this is a version of. Filter on this field to narrow the collection to a single kind of software, for example `software_type = "ANDROIDX_TEST_ORCHESTRATOR"`. Values: `SOFTWARE_TYPE_UNSPECIFIED`, `ANDROIDX_TEST_ORCHESTRATOR`, `XCODE`. |
| `version` | string | Output only. Specifies the version identifier, e.g. "1.4.1". Unique within a `software_type`. |
| `xcodeDetails` | CatalogXcodeDetails | Output only. Contains Xcode-specific attributes (set when software_type == XCODE). |

### `CatalogSupportedProduct`

- Declares that a device supports a given Device Cloud product, with optional per-product metadata. Discriminated by which product-specific message is set; adding a new product = new oneof arm + new per-product message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automation` | CatalogAutomationSupport | Output only. Represents Automation, which is DeviceRun-backed automated test execution. |
| `deviceStreaming` | CatalogDeviceStreamingSupport | Output only. Represents DeviceStreaming, which is interactive remote device streaming. |

### `CatalogXcodeDetails`

- Xcode-specific attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `supportedIosVersions` | array<string> | Output only. Lists the iOS versions this Xcode can run tests against, e.g. "16.6". This is a property of the toolchain, so it says nothing about whether a device on that iOS version is available; list the `Device` collection to find out. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DeviceAction`

- The action to be performed on a device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `androidBugreport` | AndroidBugreportDeviceAction | Captures a bugreport from the device unless the test result is pass. |
| `androidDumpsys` | AndroidDumpsysDeviceAction | Captures a dumpsys from the device. |
| `androidInstallPackages` | AndroidInstallPackagesDeviceAction | Installs Android packages on the device. |
| `androidLogcat` | AndroidLogcatDeviceAction | Collects logcat output from the device. |
| `androidMockLocation` | AndroidMockLocationDeviceAction | Mocks the location of the device. |
| `androidOrientation` | AndroidOrientationDeviceAction | Sets the orientation of the device. |
| `androidPullFiles` | AndroidPullFilesDeviceAction | Pulls directories and files from the device at the end of the run. |
| `androidPushFiles` | AndroidPushFilesDeviceAction | Pushes files to the device at the beginning of the run. |
| `androidRecordVideo` | AndroidRecordVideoDeviceAction | Records a video of the device screen during the run. |
| `androidSwitchLocale` | AndroidSwitchLocaleDeviceAction | Switches the locale (language and region) of the device. |
| `iosAppPrivacyReport` | IosAppPrivacyReportDeviceAction | Collects the exported iOS App Privacy Report during the run. |
| `iosInstallPackages` | IosInstallPackagesDeviceAction | Installs additional iOS packages on the device. |
| `iosPullFiles` | IosPullFilesDeviceAction | Pulls directories and files from the iOS device sandbox at the end of the run. |
| `iosPushFiles` | IosPushFilesDeviceAction | Pushes files to the iOS device sandbox at the beginning of the run. |
| `iosRecordVideo` | IosRecordVideoDeviceAction | Records videos of the iOS device screen, one per UI test case. |
| `iosSwitchLocale` | IosSwitchLocaleDeviceAction | Switches the locale (language and region) of the iOS application. |

### `DeviceConfig`

- The configuration of a run on a device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `actions` | array<DeviceAction> | Optional. The actions to be performed on the device. Actions will be executed in the order they are specified in the list. Each action type can at most have 1 instance in the list. |
| `requirement` | DeviceRequirement | Required. The requirement of the device. |

### `DeviceRequirement`

- The requirement of a device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `deviceId` | string | The device ID of a device in the catalog. The device ID is the last part of a device's resource name. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExecutionReport`

- The runtime information and result report of a single on-device execution attempt.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. The display_name set by users in the ExecutionConfig. |
| `endTime` | string (google-datetime) | Output only. The end time of the execution. |
| `id` | string | Output only. The unique identifier of the execution. |
| `outputFiles` | array<OutputFile> | Output only. The output files of the execution. |
| `result` | Result | Output only. The result of the execution. |
| `startTime` | string (google-datetime) | Output only. The start time of the execution. |
| `status` | Status | Output only. The status of the execution. |
| `warnings` | array<Warning> | Output only. Non-fatal warnings collected during the execution. |

### `GcsPath`

- A path to a file or directory in Google Cloud Storage.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `path` | string | Required. The Google Cloud Storage path of the file or directory. Format: `gs:///`. |

### `GoogleLongrunningCancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `GoogleLongrunningListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<GoogleLongrunningOperation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `InputFile`

- Input file.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `gcsInputFile` | GcsPath | An input file in Google Cloud Storage. |

### `IosAppPrivacyReportDeviceAction`

- Collects the exported iOS App Privacy Report during the test run. When enabled, the iOS device records application activity (such as network access, domain requests, and sensitive resource access like photos, camera, or location) and exports Apple's official App Privacy Report. The report will be written to a file named `AppActivityReport.ndjson` in the execution output directory.
- Version: v1alpha

### `IosInstallPackagesDeviceAction`

- Installs iOS packages on the device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `ipas` | array<InputFile> | Required. Additional iOS packages (IPAs) to install on the device. Limits: - A maximum of 20 IPAs are allowed. |

### `IosPullFilesDeviceAction`

- Pulls directories and files from the iOS device sandbox at the end of the run.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `paths` | array<IosPullFilesDeviceActionPathConfig> | Required. Absolute directory or file paths to pull from the device. Limits: - A maximum of 10 paths are allowed. |

### `IosPullFilesDeviceActionPathConfig`

- The configuration of pulling a file or directory from the iOS device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `bundleId` | string | Required. The bundle ID of the application sandbox. |
| `devicePath` | string | Required. The device path relative to the app sandbox, e.g. "/Documents/output/". |

### `IosPushFilesDeviceAction`

- Pushes files to the iOS device sandbox at the beginning of the run.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `fileConfigs` | array<IosPushFilesDeviceActionFileConfig> | Required. Configs of pushing files to the device. Limits: - A maximum of 50 files are allowed. |

### `IosPushFilesDeviceActionFileConfig`

- The configuration of pushing a file to the iOS device.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `bundleId` | string | Required. The bundle ID of the application sandbox. |
| `destinationPath` | string | Required. The destination path relative to the app sandbox, e.g. "/Documents/file.txt". It must be in the app's "/Documents" directory or under "/private/var/mobile/Media/". This is the path of the pushed file, and missing parent directories are created. If the path is an existing directory, such as "/Documents", the file is placed in it under the file name of `source_file`. A trailing "/" does not create a directory: "/Documents/foo/" pushes the file to "/Documents/foo" unless that directory already exists. |
| `sourceFile` | InputFile | Required. The file to be pushed. |

### `IosRecordVideoDeviceAction`

- Records videos of the iOS device screen, one per UI test case. Each video covers only the execution of its test case, and will be written to `testcases/{test_class}/{test_method}/video.mp4` in the execution output directory. No video is recorded for unit tests, or on devices running a version earlier than iOS 17.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `discardOnPass` | boolean | Optional. Whether to discard the video of a test case when it passes. If not specified, the default is `false` (videos of all test cases are kept). |

### `IosSwitchLocaleDeviceAction`

- Switches the locale (language and region) of the iOS application.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `localeCode` | string | Required. The locale (language and region) to switch the app to. The format is `language-region` or `language`, e.g. "en-US", "zh-CN", "ja", etc. |

### `IosXcTest`

- The configuration of an iOS XCTest.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `smartSharding` | SmartSharding | Optional. Smart sharding strategy to split the job into multiple shards based on the test methods and their execution time. |
| `testsZip` | InputFile | Required. The .zip containing the .xctestrun file and the contents of the DerivedData/Build/Products directory. |
| `uniformSharding` | UniformSharding | Optional. Uniform sharding strategy to split the job into multiple shards with equal number of test methods. |
| `xcTestTimeout` | string (google-duration) | Optional. The timeout of the test. Default value: 5 min. Range: \[1 min, 3 hours\]. |
| `xcodeVersion` | string | Optional. The Xcode version that should be used for the test. If not set, a system-default Xcode version is used. The available Xcode versions can be retrieved from the catalog service. |
| `xctestrun` | InputFile | Optional. An .xctestrun file that will override the .xctestrun file in the tests zip. |

### `IssueSummary`

- Describes the summary of an issue (error or warning) with structured details.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `message` | string | Output only. Human-readable explanation of the issue in English. |
| `metadata` | object | Output only. Additional metadata about the issue. |
| `reason` | string | Output only. The reason of the issue. This is a constant value that identifies the proximate cause of the issue. This should be at most 63 characters and match a regular expression of `A-Z*[A-Z0-9]`, which represents UPPER_SNAKE_CASE. |
| `type` | string enum | Output only. The issue classification based on responsibility. Values: `ISSUE_TYPE_UNSPECIFIED`, `INFRA`, `CUSTOMER`. |

### `JobAction`

- The action to be performed in a job.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `androidInstrumentationTest` | AndroidInstrumentationTest | Android instrumentation test. |
| `androidNativeBinary` | AndroidNativeBinary | Android native binary execution. |
| `iosXcTest` | IosXcTest | iOS XCTest. |

### `JobConfig`

- The configuration of a job.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `action` | JobAction | Required. Job action. |
| `allocationConfig` | AllocationConfig | Required. Allocation config. |
| `displayName` | string | Optional. User-settable, human-readable name for the job. If set, it must be unique within the session. If not set, the display name will default to `job-`, where \`\` is the 0-based index of the job in the session formatted as three digits (e.g., job-000, job-001, ...). Maximum size is 63 bytes when encoded as UTF-8. If set, must match regex: `^A-Za-z0-9*$`. |
| `labels` | object | Optional. User-defined metadata for tracking or categorization. These labels do not affect job execution and are surfaced in the JobReport. Limits: - Maximum number of entries: 16. - Maximum key size: 32 bytes (UTF-8). - Maximum value size: 1024 bytes (UTF-8). |
| `settings` | JobSettings | Optional. Job settings. |

### `JobReport`

- The runtime information and result report of a job.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. The display_name set by users in the JobConfig. |
| `endTime` | string (google-datetime) | Output only. The end time of the job. |
| `executionReports` | array<ExecutionReport> | Output only. Reports of the execution attempts of the job. |
| `id` | string | Output only. The unique identifier of the job. |
| `labels` | object | Output only. The original labels provided by the user during job creation. |
| `outputFiles` | array<OutputFile> | Output only. The output files of the job. |
| `result` | Result | Output only. The result of the job. |
| `startTime` | string (google-datetime) | Output only. The start time of the job. |
| `status` | Status | Output only. The status of the job. |
| `warnings` | array<Warning> | Output only. Non-fatal warnings collected during the job. |

### `JobSettings`

- Job settings to control the job execution.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `retrySettings` | RetrySettings | Optional. The retry settings of the job. |

### `LatLng`

- An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `latitude` | number (double) | The latitude in degrees. It must be in the range \[-90.0, +90.0\]. |
| `longitude` | number (double) | The longitude in degrees. It must be in the range \[-180.0, +180.0\]. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListSessionsResponse`

- Response including listed sessions.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to receive the next page of sessions. This will be absent if the end of the response list has been reached. |
| `sessions` | array<Session> | The list of sessions. |
| `unreachable` | array<string> | Unordered list. Sessions that could not be reached. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `OutputFile`

- Output file.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `gcsOutputFile` | GcsPath | An output file in Google Cloud Storage. |

### `Result`

- The result of a session/job/execution.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `cause` | ResultCause | Output only. Detailed result cause diagnostics. Set if type is not PASSED. |
| `resultType` | string enum | Output only. The result type of the session/job/execution. Values: `RESULT_TYPE_UNSPECIFIED`, `PASSED`, `FAILED`, `ERROR`, `TIMED_OUT`, `CANCELLED`. |

### `ResultCause`

- Describes the cause of the non-passed result occurred during the execution.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `summary` | IssueSummary | Output only. Structured cause detail. |

### `RetrySettings`

- Retry settings.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `flakyTestRetryStrategy` | RetrySettingsFlakyTestRetryStrategy | Optional. The default retry strategy. Allows an Execution to retry on test failures and infrastructure errors. |

### `RetrySettingsFlakyTestRetryStrategy`

- Default retry strategy. It will retry on test failures for up to flaky_test_attempts (including the initial run). It also retries on infra issues for up to 2 attempts (including the initial run). So in total, an execution can run up to flaky_test_attempts \* 2 times in the worst case.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `flakyTestAttempts` | integer (int32) | Required. The total attempts for flaky tests, including the initial run. Default value: 1 (no retry). Range: \[1, 5\]. |
| `parallelRetry` | boolean | Optional. Whether to retry the test failures in parallel. By default, the test is retried sequentially. If true, when the initial attempt fails, (flaky_test_attempts - 1) attempts will be triggered at the same time to run in parallel. |
| `testReductionMode` | string enum | Optional. The mode of test reduction for retry. If the test runner doesn't support the specified test reduction mode, the request will be rejected with an `INVALID_ARGUMENT` error. Values: `TEST_REDUCTION_MODE_UNSPECIFIED`, `NO_REDUCTION`, `REDUCE_TO_FAILED_TEST_CASES`. |

### `Session`

- A session resource in the AutomationSession API. At a high level, `Session` describes the configuration of one or multiple jobs, the state transitions it goes through, and the results.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the session was created. |
| `name` | string | Identifier. The resource name of the session. Format: `projects/{project}/locations/{location}/sessions/{session}`. |
| `sessionConfig` | SessionConfig | Required. Configuration used to create the session. |
| `sessionReport` | SessionReport | Output only. The runtime information and result report of the session. |

### `SessionConfig`

- SessionConfig is used to create a session.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Optional. User-settable, human-readable name for the session. Maximum size is 63 bytes when encoded as UTF-8. If set, must match regex: `^A-Za-z0-9*$`. |
| `jobConfigs` | array<JobConfig> | Required. Configs of the jobs in the session. |
| `notificationConfig` | SessionConfigSessionNotificationConfig | Optional. Notification config for the session. |
| `outputDirectoryConfig` | SessionConfigSessionOutputFileDirectoryConfig | Required. Output file directory config for the session. |

### `SessionConfigSessionNotificationConfig`

- Config to control session notification.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `pubsubTopic` | array<string> | Optional. The Pub/Sub topics to which session events are published. Format: `projects/{project}/topics/{topic}`. See https://cloud.google.com/pubsub/docs/admin#topic_and_subscription_name_restrictions |

### `SessionConfigSessionOutputFileDirectoryConfig`

- Config to control session output file directory.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `flatDirectoryStructure` | boolean | Optional. Whether to write output files directly under the output directory instead of nesting them under service-generated subdirectories. By default (`false`), output files are stored under `////`. When `true`, the session ID subdirectory is never appended, and the job display name subdirectory is appended only when the session has more than one job. Output files are therefore stored under: - `//` for a single-job session. - `///` for a multi-job session. Set this to `true` when the output directory is already unique per session (for example, when a CI system generates it), to avoid redundant nesting. |
| `gcsOutputDirectory` | GcsPath | The Google Cloud Storage path of the output directory (e.g. `gs://my-bucket/output`). The bucket must exist. If the bucket is located in another project or uses fine-grained access controls, ensure the Device Run Service Agent of the project (`service-@gcp-sa-devicerun.iam.gserviceaccount.com`) is granted access to the bucket (such as `roles/storage.objectUser`). |

### `SessionReport`

- The runtime information and result report of a session.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. The end time of the session. |
| `id` | string | Output only. The unique identifier of the session. |
| `jobReports` | array<JobReport> | Output only. Reports of the jobs in the session. |
| `result` | Result | Output only. The result of the session. |
| `startTime` | string (google-datetime) | Output only. The start time of the session. |
| `status` | Status | Output only. The status of the session. |

### `SmartSharding`

- The smart sharding strategy to split the job into multiple shards based on the test methods and their recorded execution time.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `maxShardCount` | integer (int32) | Optional. The maximum number of shards to create. If unset or less than 1, system-defined max limits are used. This limit takes precedence if the targeted_shard_duration cannot be satisfied. Limits: - For physical devices, the number of shards must be <= 20. - For virtual devices, the number of shards must be <= 200. |
| `targetedShardDuration` | string (google-duration) | Required. The targeted duration of each shard. Limits: - Must be at least 2 minutes. - Must be at most 3 hours. Shard duration is not guaranteed because smart sharding uses test case history and default durations which may not be accurate. Durations are calculated based on the following inputs: - Timing records from previous runs of the same test case. - For new test cases, the average duration of other known test cases. - A system-chosen, default duration if there are no previous timing records available. Because the actual shard duration can exceed the targeted shard duration, we recommend that you set the targeted value at least 5 minutes less than the maximum allowed test timeout. This approach avoids cancelling the shard before all tests can finish. |
| `timingRecord` | InputFile | Required. The timing record file to use for smart sharding. If the file does not exist, smart sharding will use default test time (30s) for each test method to shard the job into multiple shards. This file will be overwritten with the latest timing record after the job is completed. |

### `Status`

- The status of a session/job/execution.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `progressMessages` | array<string> | Output only. Human-readable, detailed descriptions of the session/job/execution's progress. For example: "Provisioning a device", "Starting Test". Each message should contain only one line of text. During the course of execution new data may be appended to the end of progress_messages. |
| `statusType` | string enum | Output only. The status type of the session/job/execution. Values: `STATUS_TYPE_UNSPECIFIED`, `PENDING`, `RUNNING`, `DONE`, `SUSPENDED`. |

### `UniformSharding`

- Uniformly shards test cases given a total number of shards. For Android instrumentation tests, it will be translated to `-e numShard` and `-e shardIndex` AndroidJUnitRunner arguments. With uniform sharding enabled, specifying either of these sharding arguments via `environment_variables` is invalid. There is no guarantee that test cases will be distributed uniformly across all shards.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `shardCount` | integer (int32) | Required. The total number of shards to create. This must always be a positive number that is no greater than the total number of test cases. Limits: - For physical devices, the number of shards must be <= 20. - For virtual devices, the number of shards must be <= 200. |

### `Warning`

- Non-fatal operational anomaly, lint observation, or execution insight.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `summary` | IssueSummary | Output only. Detailed warning summary. |

### Shape of `AllocationConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "deviceConfigs": "array<DeviceConfig>"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha of `devicerun` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Caution (the Discovery text above is verbatim): Discovery dropped bracket expressions from the `envVars` key regular expression (`a-zA-Z_*`) and the `displayName` regular expression of `SessionConfig` / `JobConfig` (`^A-Za-z0-9*$`); as written they match literal text such as `a-zA-Z_` rather than character classes; there is no Device Run proto in googleapis (`google/` and `google/cloud/` at commit `5ce0245`, checked 2026-11-19) and no Device Run docs page states the expression, so the original is not known; do not use the rendered text as a validation pattern.
- Caution (the Discovery text above is verbatim): Discovery dropped bracket expressions from the `IssueSummary` `reason` regular expression; as written, `A-Z*[A-Z0-9]` matches only a literal `A-` followed by any number of `Z` characters and one uppercase letter or digit, so it does not match UPPER_SNAKE_CASE values such as `CUSTOMER_ERROR` that the same sentence describes; it is not the `ErrorInfo` `reason` expression of google.rpc either (that one is `A-Z+[A-Z0-9]` in Discovery); there is no Device Run proto in googleapis (`google/` and `google/cloud/` at commit `5ce0245`, checked 2026-11-19) and no Device Run docs page states the expression, so the original is not known; do not use the rendered text as a validation pattern.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://devicerun.googleapis.com/$discovery/rest?version=v1, https://devicerun.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
