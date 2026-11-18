---
source: https://ondemandscanning.googleapis.com/$discovery/rest?version=v1
---

# On-Demand Scanning API message schemas (ondemandscanning)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/ondemandscanning/`.

### `AISkillAnalysisOccurrence`

- AISkillAnalysisOccurrence provides the results of an AI-based skill analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `findings` | array<Finding> | Findings produced by the analysis. |
| `maxSeverity` | string enum | Maximum severity found among findings. Per scanner verdict details. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`. |
| `perScannerVerdict` | PerScannerVerdict | Per scanner verdict. |
| `skillName` | string | Name of the skill that produced this analysis. |

### `AliasContext`

- An alias to a repo revision.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string enum | The alias kind. Values: `KIND_UNSPECIFIED`, `FIXED`, `MOVABLE`, `OTHER`. |
| `name` | string | The alias name. |

### `AnalysisCompleted`

- Indicates which analysis completed successfully. Multiple types of analysis can be performed on a single resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisType` | array<string> | — |

### `AnalyzePackagesMetadata`

- AnalyzePackagesMetadata contains metadata for an active scan of a container image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | When the scan was created. |
| `resourceUri` | string | The resource URI of the container image being scanned. |

### `AnalyzePackagesMetadataV1`

- AnalyzePackagesMetadata contains metadata for an active scan of a container image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | When the scan was created. |
| `resourceUri` | string | The resource URI of the container image being scanned. |

### `AnalyzePackagesRequest`

- AnalyzePackagesRequest is the request to analyze a list of packages and create Vulnerability Occurrences for it.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `packages` | array<PackageData> | The packages to analyze. |
| `resourceUri` | string | Required. The resource URI of the container image being scanned. |

### `AnalyzePackagesRequestV1`

- AnalyzePackagesRequest is the request to analyze a list of packages and create Vulnerability Occurrences for it.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `includeOsvData` | boolean | \[DEPRECATED\] Whether to include OSV data in the scan. For backwards compatibility reasons, this field can be neither removed nor renamed. |
| `packages` | array<PackageData> | The packages to analyze. |
| `resourceUri` | string | Required. The resource URI of the container image being scanned. |

### `AnalyzePackagesResponse`

- AnalyzePackagesResponse contains the information necessary to find results for the given scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scan` | string | The name of the scan resource created by this successful scan. |

### `AnalyzePackagesResponseV1`

- AnalyzePackagesResponse contains the information necessary to find results for the given scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scan` | string | The name of the scan resource created by this successful scan. |

### `Artifact`

- Artifact describes a build product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checksum` | string | Hash or checksum value of a binary, or Docker Registry 2.0 digest of a container. |
| `id` | string | Artifact ID, if any; for container images, this will be a URL by digest like `gcr.io/projectID/imagename@sha256:123456`. |
| `names` | array<string> | Related artifact names. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. Note that a single Artifact ID can have multiple names, for example if two tags are applied to one image. |

### `AttestationOccurrence`

- Occurrence that represents a single "attestation". The authenticity of an attestation can be verified using the attached signature. If the verifier trusts the public key of the signer, then verifying the signature is sufficient to establish trust. In this circumstance, the authority to which this attestation is attached is primarily useful for lookup (how to find this attestation if you already know the authority and artifact to be verified) and intent (for which authority this attestation was intended to sign.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jwts` | array<Jwt> | One or more JWTs encoding a self-contained attestation. Each JWT encodes the payload that it verifies within the JWT itself. Verifier implementation SHOULD ignore the `serialized_payload` field when verifying these JWTs. If only JWTs are present on this AttestationOccurrence, then the `serialized_payload` SHOULD be left empty. Each JWT SHOULD encode a claim specific to the `resource_uri` of this Occurrence, but this is not validated by Grafeas metadata API implementations. The JWT itself is opaque to Grafeas. |
| `serializedPayload` | string (byte) | Required. The serialized payload that is verified by one or more `signatures`. |
| `signatures` | array<Signature> | One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification. |

### `BaseImage`

- BaseImage describes a base image of a container image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `layerCount` | integer (int32) | The number of layers that the base image is composed of. |
| `name` | string | The name of the base image. |
| `registry` | string | The registry in which the base image is from. |
| `repository` | string | The repository name in which the base image is from. |

### `BinarySourceInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `binaryVersion` | PackageVersion | The binary package. This is significant when the source is different than the binary itself. Historically if they've differed, we've stored the name of the source and its version in the package/version fields, but we should also store the binary package info, as that's what's actually installed. |
| `sourceVersion` | PackageVersion | The source package. Similar to the above, this is significant when the source is different than the binary itself. Since the top-level package/version fields are based on an if/else, we need a separate field for both binary and source if we want to know definitively where the data is coming from. |

### `BuildDefinition`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildType` | string | — |
| `externalParameters` | object | — |
| `internalParameters` | object | — |
| `resolvedDependencies` | array<ResourceDescriptor> | — |

### `BuildMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `finishedOn` | string (google-datetime) | — |
| `invocationId` | string | — |
| `startedOn` | string (google-datetime) | — |

### `BuildOccurrence`

- Details of a build occurrence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inTotoSlsaProvenanceV1` | InTotoSlsaProvenanceV1 | In-Toto Slsa Provenance V1 represents a slsa provenance meeting the slsa spec, wrapped in an in-toto statement. This allows for direct jsonification of a to-spec in-toto slsa statement with a to-spec slsa provenance. |
| `intotoProvenance` | InTotoProvenance | Deprecated. See InTotoStatement for the replacement. In-toto Provenance representation as defined in spec. |
| `intotoStatement` | InTotoStatement | In-toto Statement representation as defined in spec. The intoto_statement can contain any type of provenance. The serialized payload of the statement can be stored and signed in the Occurrence's envelope. |
| `provenance` | BuildProvenance | The actual provenance for the build. |
| `provenanceBytes` | string | Serialized JSON representation of the provenance, used in generating the build signature in the corresponding build note. After verifying the signature, `provenance_bytes` can be unmarshalled and compared to the provenance to confirm that it is unchanged. A base64-encoded string representation of the provenance bytes is used for the signature in order to interoperate with openssl which expects this format for signature verification. The serialized form is captured both to avoid ambiguity in how the provenance is marshalled to json as well to prevent incompatibilities with future changes. |

### `BuildProvenance`

- Provenance of a build. Contains all information needed to verify the full details about the build from source to completion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildOptions` | object | Special options applied to this build. This is a catch-all field where build providers can enter any desired additional details. |
| `builderVersion` | string | Version string of the builder at the time this build was executed. |
| `builtArtifacts` | array<Artifact> | Output of the build. |
| `commands` | array<Command> | Commands requested by the build. |
| `createTime` | string (google-datetime) | Time at which the build was created. |
| `creator` | string | E-mail address of the user who initiated this build. Note that this was the user's e-mail address at the time the build was initiated; this address may not represent the same end-user for all time. |
| `endTime` | string (google-datetime) | Time at which execution of the build was finished. |
| `id` | string | Required. Unique identifier of the build. |
| `logsUri` | string | URI where any logs for this provenance were written. |
| `projectId` | string | ID of the project. |
| `sourceProvenance` | Source | Details of the Source input to the build. |
| `startTime` | string (google-datetime) | Time at which execution of the build was started. |
| `triggerId` | string | Trigger identifier if the build was triggered automatically; empty if not. |

### `BuilderConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |

### `CISAKnownExploitedVulnerabilities`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `knownRansomwareCampaignUse` | string | Whether the vulnerability is known to have been leveraged as part of a ransomware campaign. |

### `CVSS`

- Common Vulnerability Scoring System. For details, see https://www.first.org/cvss/specification-document This is a message we will try to use for storing various versions of CVSS rather than making a separate proto for storing a specific version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attackComplexity` | string enum | Attack Complexity (AC). Defined in CVSS v2, v3, v4. Values: `ATTACK_COMPLEXITY_UNSPECIFIED`, `ATTACK_COMPLEXITY_LOW`, `ATTACK_COMPLEXITY_HIGH`, `ATTACK_COMPLEXITY_MEDIUM`. |
| `attackRequirements` | string enum | Attack Requirements (AT). Defined in CVSS v4. Values: `ATTACK_REQUIREMENTS_UNSPECIFIED`, `ATTACK_REQUIREMENTS_NONE`, `ATTACK_REQUIREMENTS_PRESENT`. |
| `attackVector` | string enum | Attack Vector (AV). Defined in CVSS v2, v3, v4. Values: `ATTACK_VECTOR_UNSPECIFIED`, `ATTACK_VECTOR_NETWORK`, `ATTACK_VECTOR_ADJACENT`, `ATTACK_VECTOR_LOCAL`, `ATTACK_VECTOR_PHYSICAL`. |
| `authentication` | string enum | Authentication (Au). Defined in CVSS v2. Values: `AUTHENTICATION_UNSPECIFIED`, `AUTHENTICATION_MULTIPLE`, `AUTHENTICATION_SINGLE`, `AUTHENTICATION_NONE`. |
| `availabilityImpact` | string enum | Availability Impact (A). Defined in CVSS v2, v3. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`, `IMPACT_PARTIAL`, `IMPACT_COMPLETE`. |
| `baseScore` | number (float) | The base score is a function of the base metric scores. |
| `confidentialityImpact` | string enum | Confidentiality Impact (C). Defined in CVSS v2, v3. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`, `IMPACT_PARTIAL`, `IMPACT_COMPLETE`. |
| `exploitMaturity` | string enum | Exploit Maturity (E). Defined in CVSS v4. Values: `EXPLOIT_MATURITY_UNSPECIFIED`, `EXPLOIT_MATURITY_NOT_DEFINED`, `EXPLOIT_MATURITY_ATTACKED`, `EXPLOIT_MATURITY_POC`, `EXPLOIT_MATURITY_UNREPORTED`. |
| `exploitabilityScore` | number (float) | — |
| `impactScore` | number (float) | — |
| `integrityImpact` | string enum | Integrity Impact (I). Defined in CVSS v2, v3. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`, `IMPACT_PARTIAL`, `IMPACT_COMPLETE`. |
| `privilegesRequired` | string enum | Privileges Required (PR). Defined in CVSS v3, v4. Values: `PRIVILEGES_REQUIRED_UNSPECIFIED`, `PRIVILEGES_REQUIRED_NONE`, `PRIVILEGES_REQUIRED_LOW`, `PRIVILEGES_REQUIRED_HIGH`. |
| `scope` | string enum | Scope (S). Defined in CVSS v3. Values: `SCOPE_UNSPECIFIED`, `SCOPE_UNCHANGED`, `SCOPE_CHANGED`. |
| `subsequentSystemAvailabilityImpact` | string enum | Subsequent System Availability Impact (SA). Defined in CVSS v4. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`, `IMPACT_PARTIAL`, `IMPACT_COMPLETE`. |
| `subsequentSystemConfidentialityImpact` | string enum | Subsequent System Confidentiality Impact (SC). Defined in CVSS v4. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`, `IMPACT_PARTIAL`, `IMPACT_COMPLETE`. |
| `subsequentSystemIntegrityImpact` | string enum | Subsequent System Integrity Impact (SI). Defined in CVSS v4. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`, `IMPACT_PARTIAL`, `IMPACT_COMPLETE`. |
| `userInteraction` | string enum | User Interaction (UI). Defined in CVSS v3, v4. Values: `USER_INTERACTION_UNSPECIFIED`, `USER_INTERACTION_NONE`, `USER_INTERACTION_REQUIRED`, `USER_INTERACTION_PASSIVE`, `USER_INTERACTION_ACTIVE`. |
| `vulnerableSystemAvailabilityImpact` | string enum | Vulnerable System Availability Impact (VA). Defined in CVSS v4. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`, `IMPACT_PARTIAL`, `IMPACT_COMPLETE`. |
| `vulnerableSystemConfidentialityImpact` | string enum | Vulnerable System Confidentiality Impact (VC). Defined in CVSS v4. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`, `IMPACT_PARTIAL`, `IMPACT_COMPLETE`. |
| `vulnerableSystemIntegrityImpact` | string enum | Vulnerable System Integrity Impact (VI). Defined in CVSS v4. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`, `IMPACT_PARTIAL`, `IMPACT_COMPLETE`. |

### `Category`

- The category to which the update belongs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categoryId` | string | The identifier of the category. |
| `name` | string | The localized name of the category. |

### `CloudRepoSourceContext`

- A CloudRepoSourceContext denotes a particular revision in a Google Cloud Source Repo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aliasContext` | AliasContext | An alias, which may be a branch or tag. |
| `repoId` | RepoId | The ID of the repo. |
| `revisionId` | string | A revision ID. |

### `Command`

- Command describes a step performed as part of the build pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Command-line arguments used when executing this command. |
| `dir` | string | Working directory (relative to project source root) used when running this command. |
| `env` | array<string> | Environment variables set before running this command. |
| `id` | string | Optional unique identifier for this command, used in wait_for to reference this command as a dependency. |
| `name` | string | Required. Name of the command, as presented on the command line, or if the command is packaged as a Docker container, as presented to `docker pull`. |
| `waitFor` | array<string> | The ID(s) of the command(s) that this command depends on. |

### `Completeness`

- Indicates that the builder claims certain fields in this message to be complete.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arguments` | boolean | If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe. |
| `environment` | boolean | If true, the builder claims that recipe.environment is claimed to be complete. |
| `materials` | boolean | If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic". |

### `ComplianceOccurrence`

- An indication that the compliance checks in the associated ComplianceNote were not satisfied for particular resources or a specified reason.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nonComplianceReason` | string | — |
| `nonCompliantFiles` | array<NonCompliantFile> | — |
| `version` | ComplianceVersion | The OS and config version the benchmark was run on. |

### `ComplianceVersion`

- Describes the CIS benchmark version that is applicable to a given OS and os version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `benchmarkDocument` | string | The name of the document that defines this benchmark, e.g. "CIS Container-Optimized OS". |
| `cpeUri` | string | The CPE URI (https://cpe.mitre.org/specification/) this benchmark is applicable to. |
| `version` | string | The version of the benchmark. This is set to the version of the OS-specific CIS document the benchmark is defined in. |

### `DSSEAttestationOccurrence`

- Deprecated. Prefer to use a regular Occurrence, and populate the Envelope at the top level of the Occurrence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `envelope` | Envelope | If doing something security critical, make sure to verify the signatures in this metadata. |
| `statement` | InTotoStatement | — |

### `DeploymentOccurrence`

- The period during which some deployable was active in a runtime.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | Address of the runtime element hosting this deployment. |
| `config` | string | Configuration used to create this deployment. |
| `deployTime` | string (google-datetime) | Required. Beginning of the lifetime of this deployment. |
| `platform` | string enum | Platform hosting this deployment. Values: `PLATFORM_UNSPECIFIED`, `GKE`, `FLEX`, `CUSTOM`. |
| `resourceUri` | array<string> | Output only. Resource URI for the artifact being deployed taken from the deployable field with the same name. |
| `undeployTime` | string (google-datetime) | End of the lifetime of this deployment. |
| `userEmail` | string | Identity of the user that triggered this deployment. |

### `DiscoveryOccurrence`

- Provides information about the analysis status of a discovered resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisCompleted` | AnalysisCompleted | — |
| `analysisError` | array<Status> | Indicates any errors encountered during analysis of a resource. There could be 0 or more of these errors. |
| `analysisStatus` | string enum | The status of discovery for the resource. Values: `ANALYSIS_STATUS_UNSPECIFIED`, `PENDING`, `SCANNING`, `FINISHED_SUCCESS`, `COMPLETE`, `FINISHED_FAILED`, `FINISHED_UNSUPPORTED`. |
| `analysisStatusError` | Status | When an error is encountered this will contain a LocalizedMessage under details to show to the user. The LocalizedMessage is output only and populated by the API. |
| `archiveTime` | string (google-datetime) | Output only. The time occurrences related to this discovery occurrence were archived. |
| `continuousAnalysis` | string enum | Whether the resource is continuously analyzed. Values: `CONTINUOUS_ANALYSIS_UNSPECIFIED`, `ACTIVE`, `INACTIVE`. |
| `cpe` | string | The CPE of the resource being scanned. |
| `files` | array<File> | Files that make up the resource described by the occurrence. |
| `lastScanTime` | string (google-datetime) | The last time this resource was scanned. |
| `lastVulnerabilityUpdateTime` | string (google-datetime) | The last time vulnerability scan results changed. |
| `sbomStatus` | SBOMStatus | The status of an SBOM generation. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Envelope`

- MUST match https://github.com/secure-systems-lab/dsse/blob/master/envelope.proto. An authenticated message of arbitrary type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `payload` | string (byte) | — |
| `payloadType` | string | — |
| `signatures` | array<EnvelopeSignature> | — |

### `EnvelopeSignature`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyid` | string | — |
| `sig` | string (byte) | — |

### `ExploitPredictionScoringSystem`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `percentile` | number (double) | The percentile of the current score, the proportion of all scored vulnerabilities with the same or a lower EPSS score |
| `score` | number (double) | The EPSS score representing the probability \[0-1\] of exploitation in the wild in the next 30 days |

### `Exploitability`

- Exploitability information for a vulnerability. This data can be used across multiple sources, including, but not limited to a top-level vulnerability, a package occurrence, or a package file location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `signals` | array<ExploitabilitySignal> | Individual exploitability signals from various sources. |
| `summary` | ExploitabilitySummary | Rollup summary of the exploitability signals. |

### `ExploitabilitySignal`

- A single exploitability signal from a specific source (e.g., an upstream advisory, a customer VEX document, or an internal build analysis).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rationale` | string | Human-readable explanation of this signal. |
| `source` | string | Identifier of the signal source. |
| `vexJustification` | string enum | Justification for why the vulnerability is not exploitable. Values: `JUSTIFICATION_TYPE_UNSPECIFIED`, `COMPONENT_NOT_PRESENT`, `VULNERABLE_CODE_NOT_PRESENT`, `VULNERABLE_CODE_NOT_IN_EXECUTE_PATH`, `VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY`, `INLINE_MITIGATIONS_ALREADY_EXIST`. |
| `vexStatus` | string enum | The VEX status asserted by this signal. Values: `STATE_UNSPECIFIED`, `AFFECTED`, `NOT_AFFECTED`, `FIXED`, `UNDER_INVESTIGATION`. |

### `ExploitabilitySummary`

- Rollup summary of exploitability across signals.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rationale` | string | Human-readable explanation of the summary. |
| `vexStatus` | string enum | The rolled-up VEX status. Usually, this should result in an AFFECTED or NOT_AFFECTED vex status. Values: `STATE_UNSPECIFIED`, `AFFECTED`, `NOT_AFFECTED`, `FIXED`, `UNDER_INVESTIGATION`. |

### `File`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `digest` | object | — |
| `name` | string | — |

### `FileHashes`

- Container message for hashes of byte content of files, used in source messages to verify integrity of source input to the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileHash` | array<Hash> | Required. Collection of file hashes. |

### `FileLocation`

- Indicates the location at which a package was found.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filePath` | string | For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. |
| `layerDetails` | LayerDetails | — |
| `lineNumber` | integer (int32) | Line number in the file where the package is found. Applies only to source repository scanning. Note: this field is marked as `optional` in other corresponding protos, but in edition 2023, the "optional" keyword is redundant. |

### `Finding`

- Finding provides details for a single finding within an AISkillAnalysisOccurrence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | string | Category of the finding. |
| `details` | string | Description of the finding category. |
| `location` | FindingLocation | Location (path and line) where the finding was detected. |
| `scanner` | string enum | Scanner determines which engine (e.g. static, llm) emitted the finding. Values: `SCANNER_UNSPECIFIED`, `STATIC`, `LLM`, `WS_POLICY`, `GOOGLE_ANTIVIRUS`. |
| `severity` | string enum | Severity of the finding. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`. |

### `FindingLocation`

- Location details with file path and line number.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filePath` | string | Relative path of the file containing the finding. |
| `lineNumber` | string (int64) | Line number (1-based), or 0 if whole File / unknown. |

### `Fingerprint`

- A set of properties that uniquely identify a given Docker image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `v1Name` | string | Required. The layer ID of the final layer in the Docker image's v1 representation. |
| `v2Blob` | array<string> | Required. The ordered list of v2 blobs that represent a given image. |
| `v2Name` | string | Output only. The name of the image's v2 blobs computed via: \[bottom\] := v2_blobbottom := sha256(v2_blob\[N\] + " " + v2_name\[N+1\]) Only the name of the final blob is kept. |

### `GerritSourceContext`

- A SourceContext referring to a Gerrit project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aliasContext` | AliasContext | An alias, which may be a branch or tag. |
| `gerritProject` | string | The full project name within the host. Projects may be nested, so "project/subproject" is a valid project name. The "repo name" is the hostURI/project. |
| `hostUri` | string | The URI of a running Gerrit instance. |
| `revisionId` | string | A revision (commit) ID. |

### `GitSourceContext`

- A GitSourceContext denotes a particular revision in a third party Git repository (e.g., GitHub).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `revisionId` | string | Git commit hash. |
| `url` | string | Git repository URL. |

### `GrafeasV1BaseImage`

- BaseImage describes a base image of a container image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `layerCount` | integer (int32) | The number of layers that the base image is composed of. |
| `name` | string | The name of the base image. |
| `registry` | string | The registry in which the base image is from. |
| `repository` | string | The repository name in which the base image is from. |

### `GrafeasV1FileLocation`

- Indicates the location at which a package was found.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filePath` | string | For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. |
| `layerDetails` | GrafeasV1LayerDetails | Each package found in a file should have its own layer metadata (that is, information from the origin layer of the package). |
| `lineNumber` | integer (int32) | Line number in the file where the package was found. Optional field that only applies to source repository scanning. |

### `GrafeasV1LayerAttribute`

- LayerAttribute represents a single attribute (such as a tag) that applies to a layer, along with the plugin that generated it.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `plugin` | string | The name of the plugin that generated this attribute. |
| `value` | string | The value of the attribute, with a meaning defined by the plugin. |

### `GrafeasV1LayerDetails`

- Details about the layer a package was found in.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | array<GrafeasV1LayerAttribute> | Attributes that apply to the layer, such as buildpacks metadata. |
| `baseImages` | array<GrafeasV1BaseImage> | The base images the layer is found within. |
| `chainId` | string | The layer chain ID (sha256 hash) of the layer in the container image. https://github.com/opencontainers/image-spec/blob/main/config.md#layer-chainid |
| `command` | string | The layer build command that was used to build the layer. This may not be found in all layers depending on how the container image is built. |
| `diffId` | string | The diff ID (typically a sha256 hash) of the layer in the container image. |
| `index` | integer (int32) | The index of the layer in the container image. |

### `GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder`

- Identifies the entity that executed the recipe, which is trusted to have correctly performed the operation and populated this provenance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |

### `GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness`

- Indicates that the builder claims certain fields in this message to be complete.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `environment` | boolean | — |
| `materials` | boolean | — |
| `parameters` | boolean | — |

### `GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource`

- Describes where the config file that kicked off the build came from. This is effectively a pointer to the source where buildConfig came from.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `digest` | object | — |
| `entryPoint` | string | — |
| `uri` | string | — |

### `GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation`

- Identifies the event that kicked off the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configSource` | GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource | — |
| `environment` | object | — |
| `parameters` | object | — |

### `GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial`

- The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `digest` | object | — |
| `uri` | string | — |

### `GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata`

- Other properties of the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildFinishedOn` | string (google-datetime) | — |
| `buildInvocationId` | string | — |
| `buildStartedOn` | string (google-datetime) | — |
| `completeness` | GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness | — |
| `reproducible` | boolean | — |

### `Hash`

- Container message for hash values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string | Required. The type of hash that was performed, e.g. "SHA-256". |
| `value` | string (byte) | Required. The hash value. |

### `Identity`

- The unique identifier of the update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `revision` | integer (int32) | The revision number of the update. |
| `updateId` | string | The revision independent identifier of the update. |

### `ImageOccurrence`

- Details of the derived image portion of the DockerImage relationship. This image would be produced from a Dockerfile with FROM .
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseResourceUrl` | string | Output only. This contains the base image URL for the derived image occurrence. |
| `distance` | integer (int32) | Output only. The number of layers by which this image differs from the associated image basis. |
| `fingerprint` | Fingerprint | Required. The fingerprint of the derived image. |
| `layerInfo` | array<Layer> | This contains layer-specific metadata, if populated it has length "distance" and is ordered with \[distance\] being the layer immediately following the base image and \[1\] being the final layer. |

### `InTotoProvenance`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `builderConfig` | BuilderConfig | required |
| `materials` | array<string> | The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty. |
| `metadata` | Metadata | — |
| `recipe` | Recipe | Identifies the configuration used for the build. When combined with materials, this SHOULD fully describe the build, such that re-running this recipe results in bit-for-bit identical output (if the build is reproducible). required |

### `InTotoSlsaProvenanceV1`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `_type` | string | InToto spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement |
| `predicate` | SlsaProvenanceV1 | — |
| `predicateType` | string | — |
| `subject` | array<Subject> | — |

### `InTotoStatement`

- Spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement The serialized InTotoStatement will be stored as Envelope.payload. Envelope.payloadType is always "application/vnd.in-toto+json".
- Version: v1

| Field | Type | Description |
|---|---|---|
| `_type` | string | Always `https://in-toto.io/Statement/v0.1`. |
| `predicateType` | string | `https://slsa.dev/provenance/v0.1` for SlsaProvenance. |
| `provenance` | InTotoProvenance | — |
| `slsaProvenance` | SlsaProvenance | — |
| `slsaProvenanceZeroTwo` | SlsaProvenanceZeroTwo | — |
| `subject` | array<Subject> | — |

### `IngestionSource`

- Indicates where an extracted package originates from.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachmentUri` | string | The attachment URI that this package was extracted from. |
| `resourceUrl` | string | The resource URL of the resource that was scanned to find this package. |
| `source` | string enum | — Values: `SOURCE_UNSPECIFIED`, `DOCKER_IMAGE`, `SBOM_ATTACHMENT`. |

### `Justification`

- Justification provides the justification when the state of the assessment if NOT_AFFECTED.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Additional details on why this justification was chosen. |
| `justificationType` | string enum | The justification type for this vulnerability. Values: `JUSTIFICATION_TYPE_UNSPECIFIED`, `COMPONENT_NOT_PRESENT`, `VULNERABLE_CODE_NOT_PRESENT`, `VULNERABLE_CODE_NOT_IN_EXECUTE_PATH`, `VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY`, `INLINE_MITIGATIONS_ALREADY_EXIST`. |

### `Jwt`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compactJwt` | string | The compact encoding of a JWS, which is always three base64 encoded strings joined by periods. For details, see: https://tools.ietf.org/html/rfc7515.html#section-3.1 |

### `LanguagePackageDependency`

- Indicates a language package available between this package and the customer's resource artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `package` | string | — |
| `version` | string | — |

### `Layer`

- Layer holds metadata specific to a layer of a Docker image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arguments` | string | The recovered arguments to the Dockerfile directive. |
| `directive` | string | Required. The recovered Dockerfile directive used to construct this layer. See https://docs.docker.com/engine/reference/builder/ for more information. |

### `LayerAttribute`

- An attribute attached to a layer by a plugin.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `plugin` | string | The name of the plugin that generated this attribute. |
| `value` | string | The value of the attribute, with a meaning defined by the plugin. |

### `LayerDetails`

- Details about the layer a package was found in.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | array<LayerAttribute> | Attributes attached to this layer by plugins. |
| `baseImages` | array<BaseImage> | The base images the layer is found within. |
| `chainId` | string | The layer chain ID (sha256 hash) of the layer in the container image. https://github.com/opencontainers/image-spec/blob/main/config.md#layer-chainid |
| `command` | string | The layer build command that was used to build the layer. This may not be found in all layers depending on how the container image is built. |
| `diffId` | string | The diff ID (sha256 hash) of the layer in the container image. |
| `index` | integer (int32) | The index of the layer in the container image. |

### `License`

- License information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `comments` | string | Comments |
| `expression` | string | Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2". |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListVulnerabilitiesResponse`

- ListVulnerabilitiesResponse contains a single page of vulnerabilities resulting from a scan.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A page token that can be used in a subsequent call to ListVulnerabilities to continue retrieving results. |
| `occurrences` | array<Occurrence> | The list of Vulnerability Occurrences resulting from a scan. |

### `ListVulnerabilitiesResponseV1`

- ListVulnerabilitiesResponse contains a single page of vulnerabilities resulting from a scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A page token that can be used in a subsequent call to ListVulnerabilities to continue retrieving results. |
| `occurrences` | array<Occurrence> | The list of Vulnerability Occurrences resulting from a scan. |

### `Location`

- An occurrence of a particular package installation found within a system's filesystem. E.g., glibc was found in `/var/lib/dpkg/status`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpeUri` | string | Deprecated. The CPE URI in CPE format (https://cpe.mitre.org/specification/) |
| `path` | string | The path from which we gathered that this package/version is installed. |
| `version` | Version | Deprecated. The version installed at this location. |

### `Maintainer`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | — |
| `kind` | string | — |
| `name` | string | — |
| `url` | string | — |

### `MaliciousContentLLMResult`

- Result of Malicious Content LLM scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxSeverity` | string enum | Tracks max severity found. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`. |
| `modelId` | string | The base name of the model that performed the scan. |
| `scanStatus` | string enum | Status of the scan. Values: `SCAN_STATUS_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |
| `tokenUsage` | TokenUsage | Telemetry metrics tracking token usage for the AI scan. |

### `MaliciousContentStaticResult`

- Result of Malicious Content Static scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxSeverity` | string enum | Tracks max severity found. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`. |
| `scanStatus` | string enum | Status of the scan. Values: `SCAN_STATUS_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |

### `MalwareScanResult`

- Result of Malware scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scanStatus` | string enum | Status of the scan. Values: `SCAN_STATUS_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |
| `verdict` | string enum | Verdict of the scan. Values: `VERDICT_UNSPECIFIED`, `PASSED`, `FAILED`. |

### `Material`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `digest` | object | — |
| `uri` | string | — |

### `Metadata`

- Other properties of the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildFinishedOn` | string (google-datetime) | The timestamp of when the build completed. |
| `buildInvocationId` | string | Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec. |
| `buildStartedOn` | string (google-datetime) | The timestamp of when the build started. |
| `completeness` | Completeness | Indicates that the builder claims certain fields in this message to be complete. |
| `reproducible` | boolean | If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output. |

### `NonCompliantFile`

- Details about files that caused a compliance check to fail. display_command is a single command that can be used to display a list of non compliant files. When there is no such command, we can also iterate a list of non compliant file using 'path'.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayCommand` | string | Command to display the non-compliant files. |
| `path` | string | Empty if `display_command` is set. |
| `reason` | string | Explains why a file is non compliant for a CIS check. |

### `Occurrence`

- An instance of an analysis type that has been found on a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advisoryPublishTime` | string (google-datetime) | The time this advisory was published by the source. |
| `aiSkillAnalysis` | AISkillAnalysisOccurrence | Describes an AI skill analysis. |
| `attestation` | AttestationOccurrence | Describes an attestation of an artifact. |
| `build` | BuildOccurrence | Describes a verifiable build. |
| `compliance` | ComplianceOccurrence | Describes a compliance violation on a linked resource. |
| `createTime` | string (google-datetime) | Output only. The time this occurrence was created. |
| `deployment` | DeploymentOccurrence | Describes the deployment of an artifact on a runtime. |
| `discovery` | DiscoveryOccurrence | Describes when a resource was discovered. |
| `dsseAttestation` | DSSEAttestationOccurrence | Describes an attestation of an artifact using dsse. |
| `envelope` | Envelope | https://github.com/secure-systems-lab/dsse |
| `image` | ImageOccurrence | Describes how this resource derives from the basis in the associated note. |
| `kind` | string enum | Output only. This explicitly denotes which of the occurrence details are specified. This field can be used as a filter in list requests. Values: `NOTE_KIND_UNSPECIFIED`, `VULNERABILITY`, `BUILD`, `IMAGE`, `PACKAGE`, `DEPLOYMENT`, `DISCOVERY`, `ATTESTATION`, `UPGRADE`, `COMPLIANCE`, `DSSE_ATTESTATION`, `VULNERABILITY_ASSESSMENT`, `SBOM_REFERENCE`, `SECRET`, `AI_SKILL_ANALYSIS`. |
| `name` | string | Output only. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |
| `noteName` | string | Required. Immutable. The analysis note associated with this occurrence, in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. This field can be used as a filter in list requests. |
| `package` | PackageOccurrence | Describes the installation of a package on the linked resource. |
| `remediation` | string | A description of actions that can be taken to remedy the note. |
| `resourceUri` | string | Required. Immutable. A URI that represents the resource for which the occurrence applies. For example, `https://gcr.io/project/image@sha256:123abc` for a Docker image. |
| `sbomReference` | SBOMReferenceOccurrence | Describes a specific SBOM reference occurrences. |
| `secret` | SecretOccurrence | Describes a secret. |
| `updateTime` | string (google-datetime) | Output only. The time this occurrence was last updated. |
| `upgrade` | UpgradeOccurrence | Describes an available package upgrade on the linked resource. |
| `vulnerability` | VulnerabilityOccurrence | Describes a security vulnerability. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `PackageData`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | The architecture of the package. |
| `binarySourceInfo` | array<BinarySourceInfo> | A bundle containing the binary and source information. |
| `binaryVersion` | PackageVersion | DEPRECATED |
| `cpeUri` | string | The cpe_uri in \[cpe format\] (https://cpe.mitre.org/specification/) in which the vulnerability may manifest. Examples include distro or storage location for vulnerable jar. |
| `dependencyChain` | array<LanguagePackageDependency> | The dependency chain between this package and the user's artifact. List in order from the customer's package under review first, to the current package last. Inclusive of the original package and the current package. |
| `fileLocation` | array<FileLocation> | The path to the jar file / go binary file. |
| `hashDigest` | string | HashDigest stores the SHA512 hash digest of the jar file if the package is of type Maven. This field will be unset for non Maven packages. |
| `ingestionSources` | array<IngestionSource> | The list of sources that were scanned to find this package. This can be a Docker image, an SBOM attachment, or both, for example. |
| `layerDetails` | LayerDetails | Deprecated: Layer details are captured per file location in FileLocation.layer_details. Top-level layer details is not persisted. |
| `licenses` | array<string> | Deprecated: Top-level licenses is not persisted in the legacy Packages table. Licenses are captured in BinarySourceInfo or PackagesV2. |
| `maintainer` | Maintainer | The maintainer of the package. |
| `os` | string | The OS affected by a vulnerability Used to generate the cpe_uri for OS packages |
| `osVersion` | string | The version of the OS Used to generate the cpe_uri for OS packages |
| `package` | string | The package being analysed for vulnerabilities |
| `packageType` | string enum | The type of package: os, maven, go, etc. Values: `PACKAGE_TYPE_UNSPECIFIED`, `OS`, `MAVEN`, `GO`, `GO_STDLIB`, `PYPI`, `NPM`, `NUGET`, `RUBYGEMS`, `RUST`, `COMPOSER`, `SWIFT`. |
| `patchedCve` | array<string> | CVEs that this package is no longer vulnerable to |
| `sourceVersion` | PackageVersion | DEPRECATED |
| `unused` | string | — |
| `version` | string | The version of the package being analysed |

### `PackageIssue`

- A detail for a distro and package this vulnerability occurrence was found in and its associated fix (if one is available).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `affectedCpeUri` | string | Required. The CPE URI (https://cpe.mitre.org/specification/) this vulnerability was found in. |
| `affectedPackage` | string | Required. The package this vulnerability was found in. |
| `affectedVersion` | Version | Required. The version of the package that is installed on the resource affected by this vulnerability. |
| `effectiveSeverity` | string enum | Output only. The distro or language system assigned severity for this vulnerability when that is available and note provider assigned severity when it is not available. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `exploitability` | Exploitability | Output only. Exploitability signals and summary for this package issue. |
| `fileLocation` | array<GrafeasV1FileLocation> | The location at which this package was found. |
| `fixAvailable` | boolean | Output only. Whether a fix is available for this package. |
| `fixedCpeUri` | string | The CPE URI (https://cpe.mitre.org/specification/) this vulnerability was fixed in. It is possible for this to be different from the affected_cpe_uri. |
| `fixedPackage` | string | The package this vulnerability was fixed in. It is possible for this to be different from the affected_package. |
| `fixedVersion` | Version | Required. The version of the package this vulnerability was fixed in. Setting this to VersionKind.MAXIMUM means no fix is yet available. |
| `packageType` | string | The type of package (e.g. OS, MAVEN, GO). |

### `PackageOccurrence`

- Details on how a particular software package was installed on a system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. Values: `ARCHITECTURE_UNSPECIFIED`, `X86`, `X64`. |
| `cpeUri` | string | Output only. The cpe_uri in CPE format (https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. |
| `license` | License | Licenses that have been declared by the authors of the package. |
| `location` | array<Location> | All of the places within the filesystem versions of this package have been found. |
| `name` | string | Required. Output only. The name of the installed package. |
| `packageType` | string | Output only. The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). |
| `version` | Version | Output only. The version of the package. |

### `PackageVersion`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `licenses` | array<string> | The licenses associated with this package. Note that this has to go on the PackageVersion level, because we can have cases with images with the same source having different licences. E.g. in Alpine, musl and musl-utils both have the same origin musl, but have different sets of licenses. |
| `name` | string | — |
| `version` | string | — |

### `PerScannerVerdict`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maliciousContentLlmResult` | MaliciousContentLLMResult | Malicious Content LLM scan result. |
| `maliciousContentStaticResult` | MaliciousContentStaticResult | Malicious Content Static scan result. |
| `malwareScan` | MalwareScanResult | Malware scan result. |
| `workspacePolicy` | WorkspacePolicyResult | Workspace Policy scan result. |

### `ProjectRepoId`

- Selects a repo using a Google Cloud Platform project ID (e.g., winged-cargo-31) and a repo name within that project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | The ID of the project. |
| `repoName` | string | The name of the repo. Leave empty for the default repo. |

### `ProvenanceBuilder`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `builderDependencies` | array<ResourceDescriptor> | — |
| `id` | string | — |
| `version` | object | — |

### `Recipe`

- Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arguments` | array<object> | Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Since the arguments field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any". |
| `definedInMaterial` | string (int64) | Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn't come from a material, as zero is default unset value for int64. |
| `entryPoint` | string | String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use. |
| `environment` | array<object> | Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Since the environment field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any". |
| `type` | string | URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials. |

### `RelatedUrl`

- Metadata for any related URL information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `label` | string | Label to describe usage of the URL. |
| `url` | string | Specific URL associated with the resource. |

### `Remediation`

- Specifies details on how to handle (and presumably, fix) a vulnerability.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Contains a comprehensive human-readable discussion of the remediation. |
| `remediationType` | string enum | The type of remediation that can be applied. Values: `REMEDIATION_TYPE_UNSPECIFIED`, `MITIGATION`, `NO_FIX_PLANNED`, `NONE_AVAILABLE`, `VENDOR_FIX`, `WORKAROUND`. |
| `remediationUri` | RelatedUrl | Contains the URL where to obtain the remediation. |

### `RepoId`

- A unique identifier for a Cloud Repo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectRepoId` | ProjectRepoId | A combination of a project ID and a repo name. |
| `uid` | string | A server-assigned, globally unique identifier. |

### `ResourceDescriptor`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | — |
| `content` | string (byte) | — |
| `digest` | object | — |
| `downloadLocation` | string | — |
| `mediaType` | string | — |
| `name` | string | — |
| `uri` | string | — |

### `Risk`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cisaKev` | CISAKnownExploitedVulnerabilities | CISA maintains the authoritative source of vulnerabilities that have been exploited in the wild. |
| `epss` | ExploitPredictionScoringSystem | The Exploit Prediction Scoring System (EPSS) estimates the likelihood (probability) that a software vulnerability will be exploited in the wild. |

### `RunDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `builder` | ProvenanceBuilder | — |
| `byproducts` | array<ResourceDescriptor> | — |
| `metadata` | BuildMetadata | — |

### `SBOMReferenceOccurrence`

- The occurrence representing an SBOM reference as applied to a specific resource. The occurrence follows the DSSE specification. See https://github.com/secure-systems-lab/dsse/blob/master/envelope.md for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `payload` | SbomReferenceIntotoPayload | The actual payload that contains the SBOM reference data. |
| `payloadType` | string | The kind of payload that SbomReferenceIntotoPayload takes. Since it's in the intoto format, this value is expected to be 'application/vnd.in-toto+json'. |
| `signatures` | array<EnvelopeSignature> | The signatures over the payload. |

### `SBOMStatus`

- The status of an SBOM generation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | string | If there was an error generating an SBOM, this will indicate what that error was. |
| `sbomState` | string enum | The progress of the SBOM generation. Values: `SBOM_STATE_UNSPECIFIED`, `PENDING`, `COMPLETE`. |

### `SbomReferenceIntotoPayload`

- The actual payload that contains the SBOM Reference data. The payload follows the intoto statement specification. See https://github.com/in-toto/attestation/blob/main/spec/v1.0/statement.md for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `_type` | string | Identifier for the schema of the Statement. |
| `predicate` | SbomReferenceIntotoPredicate | Additional parameters of the Predicate. Includes the actual data about the SBOM. |
| `predicateType` | string | URI identifying the type of the Predicate. |
| `subject` | array<Subject> | Set of software artifacts that the attestation applies to. Each element represents a single software artifact. |

### `SbomReferenceIntotoPredicate`

- A predicate which describes the SBOM being referenced.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `digest` | object | A map of algorithm to digest of the contents of the SBOM. |
| `location` | string | The location of the SBOM. |
| `mimeType` | string | The mime type of the SBOM. |
| `referrerId` | string | The person or system referring this predicate to the consumer. |

### `SecretLocation`

- The location of the secret.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileLocation` | GrafeasV1FileLocation | The secret is found from a file. |

### `SecretOccurrence`

- The occurrence provides details of a secret.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string enum | Required. Type of secret. Values: `SECRET_KIND_UNSPECIFIED`, `SECRET_KIND_UNKNOWN`, `SECRET_KIND_GCP_SERVICE_ACCOUNT_KEY`, `SECRET_KIND_GCP_API_KEY`, `SECRET_KIND_GCP_OAUTH2_CLIENT_CREDENTIALS`, `SECRET_KIND_GCP_OAUTH2_ACCESS_TOKEN`, `SECRET_KIND_ANTHROPIC_ADMIN_API_KEY`, `SECRET_KIND_ANTHROPIC_API_KEY`, `SECRET_KIND_AZURE_ACCESS_TOKEN`, `SECRET_KIND_AZURE_IDENTITY_TOKEN`, `SECRET_KIND_DOCKER_HUB_PERSONAL_ACCESS_TOKEN`, `SECRET_KIND_GITHUB_APP_REFRESH_TOKEN`, `SECRET_KIND_GITHUB_APP_SERVER_TO_SERVER_TOKEN`, `SECRET_KIND_GITHUB_APP_USER_TO_SERVER_TOKEN`, `SECRET_KIND_GITHUB_CLASSIC_PERSONAL_ACCESS_TOKEN`, `SECRET_KIND_GITHUB_FINE_GRAINED_PERSONAL_ACCESS_TOKEN`, `SECRET_KIND_GITHUB_OAUTH_TOKEN`, `SECRET_KIND_HUGGINGFACE_API_KEY`, `SECRET_KIND_OPENAI_API_KEY`, `SECRET_KIND_PERPLEXITY_API_KEY`, `SECRET_KIND_STRIPE_SECRET_KEY`, `SECRET_KIND_STRIPE_RESTRICTED_KEY`, `SECRET_KIND_STRIPE_WEBHOOK_SECRET`. |
| `locations` | array<SecretLocation> | Optional. Locations where the secret is detected. |
| `statuses` | array<SecretStatus> | Optional. Status of the secret. |

### `SecretStatus`

- The status of the secret with a timestamp.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Optional. Optional message about the status code. |
| `status` | string enum | Optional. The status of the secret. Values: `STATUS_UNSPECIFIED`, `UNKNOWN`, `VALID`, `INVALID`. |
| `updateTime` | string (google-datetime) | Optional. The time the secret status was last updated. |

### `Signature`

- Verifiers (e.g. Kritis implementations) MUST verify signatures with respect to the trust anchors defined in policy (e.g. a Kritis policy). Typically this means that the verifier has been configured with a map from `public_key_id` to public key material (and any required parameters, e.g. signing algorithm). In particular, verification implementations MUST NOT treat the signature `public_key_id` as anything more than a key lookup hint. The `public_key_id` DOES NOT validate or authenticate a public key; it only provides a mechanism for quickly selecting a public key ALREADY CONFIGURED on the verifier through a trusted channel. Verification implementations MUST reject signatures in any of the following circumstances: \* The `public_key_id` is not recognized by the verifier. \* The public key that `public_key_id` refers to does not verify the signature with respect to the payload. The `signature` contents SHOULD NOT be "attached" (where the payload is included with the serialized `signature` bytes). Verifiers MUST ignore any "attached" payload and only verify signatures with respect to explicitly provided payload (e.g. a `payload` field on the proto message that holds this Signature, or the canonical serialization of the proto message that holds this signature).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publicKeyId` | string | The identifier for the public key that verifies this signature. \* The `public_key_id` is required. \* The `public_key_id` SHOULD be an RFC3986 conformant URI. \* When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: \* "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): \* "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" \* "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5" |
| `signature` | string (byte) | The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload. |

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

### `Subject`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `digest` | object | `"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet |
| `name` | string | — |

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

### `UpgradeDistribution`

- The Upgrade Distribution represents metadata about the Upgrade for each operating system (CPE). Some distributions have additional metadata around updates, classifying them into various categories and severities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `classification` | string | The operating system classification of this Upgrade, as specified by the upstream operating system upgrade feed. For Windows the classification is one of the category_ids listed at https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ff357803(v=vs.85) |
| `cpeUri` | string | Required - The specific operating system this metadata applies to. See https://cpe.mitre.org/specification/. |
| `cve` | array<string> | The cve tied to this Upgrade. |
| `severity` | string | The severity as specified by the upstream operating system. |

### `UpgradeOccurrence`

- An Upgrade Occurrence represents that a specific resource_url could install a specific upgrade. This presence is supplied via local sources (i.e. it is present in the mirror and the running system has noticed its availability). For Windows, both distribution and windows_update contain information for the Windows update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `distribution` | UpgradeDistribution | Metadata about the upgrade for available for the specific operating system for the resource_url. This allows efficient filtering, as well as making it easier to use the occurrence. |
| `package` | string | Required for non-Windows OS. The package this Upgrade is for. |
| `parsedVersion` | Version | Required for non-Windows OS. The version of the package in a machine + human readable form. |
| `windowsUpdate` | WindowsUpdate | Required for Windows OS. Represents the metadata about the Windows update. |

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
| `exploitability` | Exploitability | Output only. Rollup of exploitability across all PackageIssues in this occurrence. |
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

### Shape of `AISkillAnalysisOccurrence`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "findings": "array<Finding>",
  "maxSeverity": "string enum",
  "perScannerVerdict": "PerScannerVerdict",
  "skillName": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `ondemandscanning` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the source proto: the `fullName` format `:-` lost its placeholders in the Discovery document; the proto comment reads "This string is of the form `<epoch>:<name>-<revision>` and is only set when kind is NORMAL." (backticks added) (`grafeas/v1/package.proto`, https://github.com/googleapis/googleapis/blob/6f8ddc394a90ea2c6a355afd2e9d21f56622df14/grafeas/v1/package.proto, commit `6f8ddc3`, retrieved 2026-11-18).
- Source: https://ondemandscanning.googleapis.com/$discovery/rest?version=v1, https://ondemandscanning.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
