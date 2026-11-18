---
source: https://containeranalysis.googleapis.com/$discovery/rest?version=v1
---

# Container Analysis API message schemas (containeranalysis) (part 3/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/containeranalysis/`.

### `SlsaBuilder`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |

### `SlsaCompleteness`

- Indicates that the builder claims certain fields in this message to be complete.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arguments` | boolean | If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe. |
| `environment` | boolean | If true, the builder claims that recipe.environment is claimed to be complete. |
| `materials` | boolean | If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic". |

### `SlsaMetadata`

- Other properties of the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildFinishedOn` | string (google-datetime) | The timestamp of when the build completed. |
| `buildInvocationId` | string | Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec. |
| `buildStartedOn` | string (google-datetime) | The timestamp of when the build started. |
| `completeness` | SlsaCompleteness | Indicates that the builder claims certain fields in this message to be complete. |
| `reproducible` | boolean | If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output. |

### `SlsaProvenance`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `builder` | SlsaBuilder | required |
| `materials` | array<Material> | The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty. |
| `metadata` | SlsaMetadata | — |
| `recipe` | SlsaRecipe | Identifies the configuration used for the build. When combined with materials, this SHOULD fully describe the build, such that re-running this recipe results in bit-for-bit identical output (if the build is reproducible). required |

### `SlsaProvenanceV1`

- Keep in sync with schema at https://github.com/slsa-framework/slsa/blob/main/docs/provenance/schema/v1/provenance.proto Builder renamed to ProvenanceBuilder because of Java conflicts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildDefinition` | BuildDefinition | — |
| `runDetails` | RunDetails | — |

### `SlsaProvenanceZeroTwo`

- See full explanation of fields at slsa.dev/provenance/v0.2.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildConfig` | object | — |
| `buildType` | string | — |
| `builder` | GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder | — |
| `invocation` | GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation | — |
| `materials` | array<GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial> | — |
| `metadata` | GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata | — |

### `SlsaProvenanceZeroTwo` (v1alpha1)

- SlsaProvenanceZeroTwo is the slsa provenance as defined by the slsa spec. See full explanation of fields at slsa.dev/provenance/v0.2.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `buildConfig` | object | Lists the steps in the build. |
| `buildType` | string | URI indicating what type of build was performed. |
| `builder` | GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaBuilder | Identifies the entity that executed the recipe, which is trusted to have correctly performed the operation and populated this provenance. |
| `invocation` | GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaInvocation | Identifies the event that kicked off the build. |
| `materials` | array<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMaterial> | The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. |
| `metadata` | GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMetadata | Other properties of the build. |

### `SlsaRecipe`

- Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arguments` | object | Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Depending on the recipe Type, the structure may be different. |
| `definedInMaterial` | string (int64) | Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn't come from a material, as zero is default unset value for int64. |
| `entryPoint` | string | String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use. |
| `environment` | object | Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Depending on the recipe Type, the structure may be different. |
| `type` | string | URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials. |

### `Source`

- Source describes the location of the source used for the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalContexts` | array<SourceContext> | If provided, some of the source code used for the build may be found in these locations, in the case where the source repository had multiple remotes or submodules. This list will not include the context specified in the context field. |
| `artifactStorageSourceUri` | string | If provided, the input binary artifacts for the build came from this location. |
| `context` | SourceContext | If provided, the source code used for the build came from this location. |
| `fileHashes` | object | Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (.tar.gz), the FileHash will be for the single path to that file. |

### `Source` (v1alpha1)

- Source describes the location of the source used for the build.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `additionalContexts` | array<GoogleDevtoolsContaineranalysisV1alpha1SourceContext> | If provided, some of the source code used for the build may be found in these locations, in the case where the source repository had multiple remotes or submodules. This list will not include the context specified in the context field. |
| `artifactStorageSource` | StorageSource | If provided, the input binary artifacts for the build came from this location. |
| `context` | GoogleDevtoolsContaineranalysisV1alpha1SourceContext | If provided, the source code used for the build came from this location. |
| `fileHashes` | object | Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (.tar.gz), the FileHash will be for the single path to that file. |
| `repoSource` | RepoSource | If provided, get source from this location in a Cloud Repo. |
| `storageSource` | StorageSource | If provided, get the source from this location in Google Cloud Storage. |

### `SourceContext`

- A SourceContext is a reference to a tree of files. A SourceContext together with a path point to a unique revision of a single file or directory.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudRepo` | CloudRepoSourceContext | A SourceContext referring to a revision in a Google Cloud Source Repo. |
| `gerrit` | GerritSourceContext | A SourceContext referring to a Gerrit project. |
| `git` | GitSourceContext | A SourceContext referring to any third party Git repo (e.g., GitHub). |
| `labels` | object | Labels with user defined metadata. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StepResult`

- StepResult is the declaration of a result for a build step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestationContentName` | string | — |
| `attestationType` | string | — |
| `name` | string | — |

### `StorageSource`

- StorageSource describes the location of the source in an archive file in Google Cloud Storage.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Google Cloud Storage bucket containing source (see \[Bucket Name Requirements\] (https://cloud.google.com/storage/docs/bucket-naming#requirements)). |
| `generation` | string (int64) | Google Cloud Storage generation for the object. |
| `object` | string | Google Cloud Storage object containing source. |

### `Subject`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `digest` | object | `"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet |
| `name` | string | — |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TimeSpan`

- Start and end times for a build execution phase. Next ID: 3
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | End of time span. |
| `startTime` | string (google-datetime) | Start of time span. |

### `TokenUsage`

- Token usage associated with an AI scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cacheCount` | string (int64) | Cache matched tokens for implicit cache. |
| `candidateCount` | string (int64) | Tokens in the model response. |
| `promptCount` | string (int64) | Tokens in the user request. |
| `thinkingCount` | string (int64) | Tokens in the thinking output. |
| `toolUsePromptCount` | string (int64) | Prompt tokens for using tools. |

### `URI`

- An URI message.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `label` | string | A label for the URI. |
| `uri` | string | The unique resource identifier. |

### `UpdateOperationRequest`

- Request for updating an existing operation
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | The operation to create. |
| `updateMask` | string (google-fieldmask) | The fields to update. |

### `UpgradeDistribution`

- The Upgrade Distribution represents metadata about the Upgrade for each operating system (CPE). Some distributions have additional metadata around updates, classifying them into various categories and severities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `classification` | string | The operating system classification of this Upgrade, as specified by the upstream operating system upgrade feed. For Windows the classification is one of the category_ids listed at https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ff357803(v=vs.85) |
| `cpeUri` | string | Required - The specific operating system this metadata applies to. See https://cpe.mitre.org/specification/. |
| `cve` | array<string> | The cve tied to this Upgrade. |
| `severity` | string | The severity as specified by the upstream operating system. |

### `UpgradeNote`

- An Upgrade Note represents a potential upgrade of a package to a given version. For each package version combination (i.e. bash 4.0, bash 4.1, bash 4.1.2), there will be an Upgrade Note. For Windows, windows_update field represents the information related to the update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `distributions` | array<UpgradeDistribution> | Metadata about the upgrade for each specific operating system. |
| `package` | string | Required for non-Windows OS. The package this Upgrade is for. |
| `version` | Version | Required for non-Windows OS. The version of the package in machine + human readable form. |
| `windowsUpdate` | WindowsUpdate | Required for Windows OS. Represents the metadata about the Windows update. |

### `UpgradeNote` (v1alpha1)

- An Upgrade Note represents a potential upgrade of a package to a given version. For each package version combination (i.e. bash 4.0, bash 4.1, bash 4.1.2), there will be a Upgrade Note.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `distributions` | array<UpgradeDistribution> | Metadata about the upgrade for each specific operating system. |
| `package` | string | Required - The package this Upgrade is for. |
| `version` | Version | Required - The version of the package in machine + human readable form. |

### `UpgradeOccurrence`

- An Upgrade Occurrence represents that a specific resource_url could install a specific upgrade. This presence is supplied via local sources (i.e. it is present in the mirror and the running system has noticed its availability). For Windows, both distribution and windows_update contain information for the Windows update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `distribution` | UpgradeDistribution | Metadata about the upgrade for available for the specific operating system for the resource_url. This allows efficient filtering, as well as making it easier to use the occurrence. |
| `package` | string | Required for non-Windows OS. The package this Upgrade is for. |
| `parsedVersion` | Version | Required for non-Windows OS. The version of the package in a machine + human readable form. |
| `windowsUpdate` | WindowsUpdate | Required for Windows OS. Represents the metadata about the Windows update. |

### `UpgradeOccurrence` (v1alpha1)

- An Upgrade Occurrence represents that a specific resource_url could install a specific upgrade. This presence is supplied via local sources (i.e. it is present in the mirror and the running system has noticed its availability).
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `distribution` | UpgradeDistribution | Metadata about the upgrade for available for the specific operating system for the resource_url. This allows efficient filtering, as well as making it easier to use the occurrence. |
| `package` | string | Required - The package this Upgrade is for. |
| `parsedVersion` | Version | Required - The version of the package in a machine + human readable form. |

### `Version`

- Version contains structured information about the version of a package.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `epoch` | integer (int32) | Used to correct mistakes in the version numbering scheme. |
| `fullName` | string | Human readable version string. This string is of the form :- and is only set when kind is NORMAL. |
| `inclusive` | boolean | Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range. |
| `kind` | string enum | Required. Distinguishes between sentinel MIN/MAX versions and normal versions. Values: `VERSION_KIND_UNSPECIFIED`, `NORMAL`, `MINIMUM`, `MAXIMUM`. |
| `name` | string | Required only when version kind is NORMAL. The main part of the version name. |
| `revision` | string | The iteration of the package build from the above version. |

### `Version` (v1beta1)

- Version contains structured information about the version of a package.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `epoch` | integer (int32) | Used to correct mistakes in the version numbering scheme. |
| `inclusive` | boolean | Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range. |
| `kind` | string enum | Required. Distinguishes between sentinel MIN/MAX versions and normal versions. Values: `VERSION_KIND_UNSPECIFIED`, `NORMAL`, `MINIMUM`, `MAXIMUM`. |
| `name` | string | Required only when version kind is NORMAL. The main part of the version name. |
| `revision` | string | The iteration of the package build from the above version. |

### `VexAssessment`

- VexAssessment provides all publisher provided Vex information that is related to this vulnerability.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cve` | string | Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. Deprecated: Use vulnerability_id instead to denote CVEs. |
| `impacts` | array<string> | Contains information about the impact of this vulnerability, this will change with time. |
| `justification` | Justification | Justification provides the justification when the state of the assessment if NOT_AFFECTED. |
| `noteName` | string | The VulnerabilityAssessment note from which this VexAssessment was generated. This will be of the form: `projects/[PROJECT_ID]/notes/[NOTE_ID]`. |
| `relatedUris` | array<RelatedUrl> | Holds a list of references associated with this vulnerability item and assessment. |
| `remediations` | array<Remediation> | Specifies details on how to handle (and presumably, fix) a vulnerability. |
| `state` | string enum | Provides the state of this Vulnerability assessment. Values: `STATE_UNSPECIFIED`, `AFFECTED`, `NOT_AFFECTED`, `FIXED`, `UNDER_INVESTIGATION`. |
| `vulnerabilityId` | string | The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. |

### `VexAssessment` (v1alpha1)

- VexAssessment provides all publisher provided Vex information that is related to this vulnerability.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `cve` | string | Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. |
| `impacts` | array<string> | Contains information about the impact of this vulnerability, this will change with time. |
| `justification` | Justification | Justification provides the justification when the state of the assessment if NOT_AFFECTED. |
| `noteName` | string | The VulnerabilityAssessment note from which this VexAssessment was generated. This will be of the form: `projects/[PROJECT_ID]/notes/[NOTE_ID]`. |
| `relatedUris` | array<URI> | Holds a list of references associated with this vulnerability item and assessment. These uris have additional information about the vulnerability and the assessment itself. E.g. Link to a document which details how this assessment concluded the state of this vulnerability. |
| `remediations` | array<Remediation> | Specifies details on how to handle (and presumably, fix) a vulnerability. |
| `state` | string enum | Provides the state of this Vulnerability assessment. Values: `STATE_UNSPECIFIED`, `AFFECTED`, `NOT_AFFECTED`, `FIXED`, `UNDER_INVESTIGATION`. |
| `vulnerabilityId` | string | The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. |

### `Volume`

- Volume describes a Docker container volume which is mounted into build steps in order to persist files across build step execution. Next ID: 3
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. |
| `path` | string | Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. |

### `Vulnerability`

- Vulnerability provides metadata about a security vulnerability in a Note.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `advisoryPublishTime` | string (google-datetime) | The time this advisory was published by the source. |
| `cvssScore` | number (float) | The CVSS score for this vulnerability. |
| `cvssV2` | CVSS | The full description of the CVSS for version 2. |
| `cvssV3` | CVSSv3 | The full description of the CVSS for version 3. |
| `cvssV4` | CVSS | The full description of the CVSS for version 4. |
| `cvssVersion` | string enum | CVSS version used to populate cvss_score and severity. Values: `CVSS_VERSION_UNSPECIFIED`, `CVSS_VERSION_2`, `CVSS_VERSION_3`, `CVSS_VERSION_4`. |
| `cwe` | array<string> | A list of CWE for this vulnerability. For details, see: https://cwe.mitre.org/index.html |
| `details` | array<Detail> | All information about the package to specifically identify this vulnerability. One entry per (version range and cpe_uri) the package vulnerability has manifested in. |
| `severity` | string enum | Note provider assigned impact of the vulnerability. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `sourceUpdateTime` | string (google-datetime) | The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker. |
| `windowsDetails` | array<WindowsDetail> | Windows details get their own format because the information format and model don't match a normal detail. Specifically Windows updates are done as patches, thus Windows vulnerabilities really are a missing package, rather than a package being at an incorrect version. |

### `VulnerabilityAssessmentNote`

- A single VulnerabilityAssessmentNote represents one particular product's vulnerability assessment for one CVE.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assessment` | Assessment | Represents a vulnerability assessment for the product. |
| `languageCode` | string | Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646. |
| `longDescription` | string | A detailed description of this Vex. |
| `product` | Product | The product affected by this vex. |
| `publisher` | Publisher | Publisher details of this Note. |
| `shortDescription` | string | A one sentence description of this Vex. |
| `title` | string | The title of the note. E.g. `Vex-Debian-11.4` |

### `VulnerabilityAttestation`

- The status of a vulnerability attestation generation.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `error` | string | Output only. If failure, the error reason for why the attestation generation failed. |
| `lastAttemptTime` | string (google-datetime) | Output only. The last time we attempted to generate an attestation. |
| `state` | string enum | Output only. The success/failure state of the latest attestation attempt. Values: `VULNERABILITY_ATTESTATION_STATE_UNSPECIFIED`, `SUCCESS`, `FAILURE`. |

### `VulnerabilityDetails`

- Used by Occurrence to point to where the vulnerability exists and how to fix it.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `cvssScore` | number (float) | Output only. The CVSS score of this vulnerability. CVSS score is on a scale of 0-10 where 0 indicates low severity and 10 indicates high severity. |
| `cvssV2` | CVSS | The CVSS v2 score of this vulnerability. |
| `cvssV3` | CVSS | The CVSS v3 score of this vulnerability. |
| `cvssV4` | CVSS | Optional. The CVSS v4 score of this vulnerability. |
| `cvssVersion` | string enum | Output only. CVSS version used to populate cvss_score and severity. Values: `CVSS_VERSION_UNSPECIFIED`, `CVSS_VERSION_2`, `CVSS_VERSION_3`, `CVSS_VERSION_4`. |
| `effectiveSeverity` | string enum | The distro assigned severity for this vulnerability when that is available and note provider assigned severity when distro has not yet assigned a severity for this vulnerability. When there are multiple package issues for this vulnerability, they can have different effective severities because some might come from the distro and some might come from installed language packs (e.g. Maven JARs or Go binaries). For this reason, it is advised to use the effective severity on the PackageIssue level, as this field may eventually be deprecated. In the case where multiple PackageIssues have different effective severities, the one set here will be the highest severity of any of the PackageIssues. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `extraDetails` | string | Occurrence-specific extra details about the vulnerability. |
| `packageIssue` | array<PackageIssue> | The set of affected locations and their fixes (if available) within the associated resource. |
| `risk` | Risk | Risk information about the vulnerability, such as CISA, EPSS, etc. |
| `severity` | string enum | Output only. The note provider assigned Severity of the vulnerability. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `type` | string | The type of package; whether native or non native(ruby gems, node.js packages etc). This may be deprecated in the future because we can have multiple PackageIssues with different package types. |
| `vexAssessment` | VexAssessment | VexAssessment provides all publisher provided Vex information that is related to this vulnerability for this resource. |

### `VulnerabilityLocation`

- The location of the vulnerability.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cpeUri` | string | Required. The CPE URI in cpe format (https://cpe.mitre.org/specification/) format. Examples include distro or storage location for vulnerable jar. |
| `package` | string | Required. The package being described. |
| `version` | Version | Required. The version of the package being described. |

### `VulnerabilityLocation` (v1alpha1)

- The location of the vulnerability
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `cpeUri` | string | The cpe_uri in \[cpe format\] (https://cpe.mitre.org/specification/) format. Examples include distro or storage location for vulnerable jar. This field can be used as a filter in list requests. |
| `fileLocation` | array<FileLocation> | The file location at which this package was found. |
| `package` | string | The package being described. |
| `version` | Version | The version of the package being described. This field can be used as a filter in list requests. |

### `VulnerabilityNote`

- A security vulnerability that can be found in resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advisoryPublishTime` | string (google-datetime) | The time this advisory was published by the source. |
| `cvssScore` | number (float) | The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity. |
| `cvssV2` | CVSS | The full description of the v2 CVSS for this vulnerability. |
| `cvssV3` | CVSSv3 | The full description of the CVSSv3 for this vulnerability. |
| `cvssV4` | CVSS | The full description of the v4 CVSS for this vulnerability. |
| `cvssVersion` | string enum | CVSS version used to populate cvss_score and severity. Values: `CVSS_VERSION_UNSPECIFIED`, `CVSS_VERSION_2`, `CVSS_VERSION_3`, `CVSS_VERSION_4`. |
| `details` | array<Detail> | Details of all known distros and packages affected by this vulnerability. |
| `severity` | string enum | The note provider assigned severity of this vulnerability. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `sourceUpdateTime` | string (google-datetime) | The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker. |
| `windowsDetails` | array<WindowsDetail> | Windows details get their own format because the information format and model don't match a normal detail. Specifically Windows updates are done as patches, thus Windows vulnerabilities really are a missing package, rather than a package being at an incorrect version. |

### `VulnerabilityOccurrence`

- An occurrence of a severity vulnerability on a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cvssScore` | number (float) | Output only. The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity. |
| `cvssV2` | CVSS | The cvss v2 score for the vulnerability. |
| `cvssV4` | CVSS | The cvss v4 score for the vulnerability. |
| `cvssVersion` | string enum | Output only. CVSS version used to populate cvss_score and severity. Values: `CVSS_VERSION_UNSPECIFIED`, `CVSS_VERSION_2`, `CVSS_VERSION_3`, `CVSS_VERSION_4`. |
| `cvssv3` | CVSS | The cvss v3 score for the vulnerability. |
| `effectiveSeverity` | string enum | The distro assigned severity for this vulnerability when it is available, otherwise this is the note provider assigned severity. When there are multiple PackageIssues for this vulnerability, they can have different effective severities because some might be provided by the distro while others are provided by the language ecosystem for a language pack. For this reason, it is advised to use the effective severity on the PackageIssue level. In the case where multiple PackageIssues have differing effective severities, this field should be the highest severity for any of the PackageIssues. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `extraDetails` | string | Occurrence-specific extra details about the vulnerability. |
| `fixAvailable` | boolean | Output only. Whether at least one of the affected packages has a fix available. |
| `longDescription` | string | Output only. A detailed description of this vulnerability. |
| `packageIssue` | array<PackageIssue> | Required. The set of affected locations and their fixes (if available) within the associated resource. |
| `relatedUrls` | array<RelatedUrl> | Output only. URLs related to this vulnerability. |
| `risk` | Risk | Risk information about the vulnerability, such as CISA, EPSS, etc. |
| `severity` | string enum | Output only. The note provider assigned severity of this vulnerability. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `shortDescription` | string | Output only. A one sentence description of this vulnerability. |
| `type` | string | The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). |
| `vexAssessment` | VexAssessment | — |

### `VulnerabilityOccurrencesSummary`

- A summary of how many vulnerability occurrences there are per resource and severity type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `counts` | array<FixableTotalByDigest> | A listing by resource of the number of fixable and total vulnerabilities. |
| `unreachable` | array<string> | Unordered list. Unreachable regions. Populated for requests from the global region when `return_partial_success` is set. Format: `projects/[PROJECT_ID]/locations/[LOCATION]` |

### `VulnerabilityType`

- VulnerabilityType provides metadata about a security vulnerability.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `advisoryPublishTime` | string (google-datetime) | Time this advisory was published by the source. |
| `cvssScore` | number (float) | The CVSS score for this Vulnerability. |
| `cvssV2` | CVSS | The full description of the CVSS for version 2. |
| `cvssV4` | CVSS | Optional. The full description of the CVSS for version 4. |
| `cvssVersion` | string enum | CVSS version used to populate cvss_score and severity. Values: `CVSS_VERSION_UNSPECIFIED`, `CVSS_VERSION_2`, `CVSS_VERSION_3`, `CVSS_VERSION_4`. |
| `cwe` | array<string> | A list of CWE for this vulnerability. For details, see: https://cwe.mitre.org/index.html |
| `details` | array<Detail> | All information about the package to specifically identify this vulnerability. One entry per (version range and cpe_uri) the package vulnerability has manifested in. |
| `severity` | string enum | Note provider assigned impact of the vulnerability Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |

### `WindowsDetail`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpeUri` | string | Required. The CPE URI (https://cpe.mitre.org/specification/) this vulnerability affects. |
| `description` | string | The description of this vulnerability. |
| `fixingKbs` | array<KnowledgeBase> | Required. The names of the KBs which have hotfixes to mitigate this vulnerability. Note that there may be multiple hotfixes (and thus multiple KBs) that mitigate a given vulnerability. Currently any listed KBs presence is considered a fix. |
| `name` | string | Required. The name of this vulnerability. |

### `WindowsUpdate`

- Windows Update represents the metadata about the update for the Windows operating system. The fields in this message come from the Windows Update API documented at https://docs.microsoft.com/en-us/windows/win32/api/wuapi/nn-wuapi-iupdate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categories` | array<Category> | The list of categories to which the update belongs. |
| `description` | string | The localized description of the update. |
| `identity` | Identity | Required - The unique identifier for the update. |
| `kbArticleIds` | array<string> | The Microsoft Knowledge Base article IDs that are associated with the update. |
| `lastPublishedTimestamp` | string (google-datetime) | The last published timestamp of the update. |
| `supportUrl` | string | The hyperlink to the support information for the update. |
| `title` | string | The localized title of the update. |

### `WorkspacePolicyResult`

- Result of Workspace Policy scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scanStatus` | string enum | Status of the scan. Values: `SCAN_STATUS_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |
| `verdict` | string enum | Verdict of the scan. Values: `VERDICT_UNSPECIFIED`, `PASSED`, `FAILED`. |

### `WorkspacePolicyResult` (v1alpha1)

- Result of Workspace Policy scan.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `scanState` | string enum | Output only. State of the scan. Values: `SCAN_STATE_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |
| `verdict` | string enum | Optional. Verdict of the scan. Values: `VERDICT_UNSPECIFIED`, `PASSED`, `FAILED`. |

### Shape of `SlsaBuilder`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "id": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1, v1alpha1 of `containeranalysis` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the source proto: the `fullName` format `:-` lost its placeholders in the Discovery document; the proto comment reads "This string is of the form `<epoch>:<name>-<revision>` and is only set when kind is NORMAL." (backticks added) (`grafeas/v1/package.proto`, https://github.com/googleapis/googleapis/blob/6f8ddc394a90ea2c6a355afd2e9d21f56622df14/grafeas/v1/package.proto, commit `6f8ddc3`, retrieved 2026-11-18).
- Source: https://containeranalysis.googleapis.com/$discovery/rest?version=v1, https://containeranalysis.googleapis.com/$discovery/rest?version=v1beta1, https://containeranalysis.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
