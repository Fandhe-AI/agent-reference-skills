---
source: https://containeranalysis.googleapis.com/$discovery/rest?version=v1
---

# Container Analysis API message schemas (containeranalysis) (part 2/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/containeranalysis/`.

### `FileHashes`

- Container message for hashes of byte content of files, used in source messages to verify integrity of source input to the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileHash` | array<Hash> | Required. Collection of file hashes. |

### `FileLocation`

- Indicates the location at which a package was found.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `filePath` | string | For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. |

### `FileLocation` (v1alpha1)

- Indicates the location at which a package was found.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `filePath` | string | For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. |
| `layerDetails` | LayerDetails | Each package found in a file should have its own layer metadata (that is, information from the origin layer of the package). |
| `lineNumber` | integer (int32) | Line number in the file where the package is found. Optional field that only applies to source repository scanning. |

### `FileNote`

- FileNote represents an SPDX File Information section: https://spdx.github.io/spdx-spec/4-file-information/
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `checksum` | array<string> | Provide a unique identifier to match analysis information on each specific file in a package |
| `fileType` | string enum | This field provides information about the type of file identified Values: `FILE_TYPE_UNSPECIFIED`, `SOURCE`, `BINARY`, `ARCHIVE`, `APPLICATION`, `AUDIO`, `IMAGE`, `TEXT`, `VIDEO`, `DOCUMENTATION`, `SPDX`, `OTHER`. |
| `title` | string | Identify the full path and filename that corresponds to the file information in this section |

### `FileOccurrence`

- FileOccurrence represents an SPDX File Information section: https://spdx.github.io/spdx-spec/4-file-information/
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `attributions` | array<string> | This field provides a place for the SPDX data creator to record, at the file level, acknowledgements that may be needed to be communicated in some contexts |
| `comment` | string | This field provides a place for the SPDX file creator to record any general comments about the file |
| `contributors` | array<string> | This field provides a place for the SPDX file creator to record file contributors |
| `copyright` | string | Identify the copyright holder of the file, as well as any dates present |
| `filesLicenseInfo` | array<string> | This field contains the license information actually found in the file, if any |
| `id` | string | Uniquely identify any element in an SPDX document which may be referenced by other elements |
| `licenseConcluded` | License | This field contains the license the SPDX file creator has concluded as governing the file or alternative values if the governing license cannot be determined |
| `notice` | string | This field provides a place for the SPDX file creator to record license notices or other such related notices found in the file |

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

### `FixableTotalByDigest`

- Per resource and severity counts of fixable and total vulnerabilities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fixableCount` | string (int64) | The number of fixable vulnerabilities associated with this resource. |
| `resourceUri` | string | The affected resource. |
| `severity` | string enum | The severity for this count. SEVERITY_UNSPECIFIED indicates total across all severities. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `totalCount` | string (int64) | The total number of vulnerabilities associated with this resource. |

### `FixableTotalByDigest` (v1beta1)

- Per resource and severity counts of fixable and total vulnerabilities.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `fixableCount` | string (int64) | The number of fixable vulnerabilities associated with this resource. |
| `resource` | Resource | The affected resource. |
| `severity` | string enum | The severity for this count. SEVERITY_UNSPECIFIED indicates total across all severities. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `totalCount` | string (int64) | The total number of vulnerabilities associated with this resource. |

### `GeneratePackagesSummaryRequest`

- GeneratePackagesSummaryRequest is the request body for the GeneratePackagesSummary API method. It just takes a single name argument, referring to the resource.
- Version: v1beta1

### `GenericSignedAttestation`

- An attestation wrapper that uses the Grafeas `Signature` message. This attestation must define the `serialized_payload` that the `signatures` verify and any metadata necessary to interpret that plaintext. The signatures should always be over the `serialized_payload` bytestring.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `contentType` | string enum | Type (for example schema) of the attestation payload that was signed. The verifier must ensure that the provided type is one that the verifier supports, and that the attestation payload is a valid instantiation of that type (for example by validating a JSON schema). Values: `CONTENT_TYPE_UNSPECIFIED`, `SIMPLE_SIGNING_JSON`. |
| `serializedPayload` | string (byte) | The serialized payload that is verified by one or more `signatures`. The encoding and semantic meaning of this payload must match what is set in `content_type`. |
| `signatures` | array<Signature> | One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification. |

### `GerritSourceContext`

- A SourceContext referring to a Gerrit project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aliasContext` | AliasContext | An alias, which may be a branch or tag. |
| `gerritProject` | string | The full project name within the host. Projects may be nested, so "project/subproject" is a valid project name. The "repo name" is the hostURI/project. |
| `hostUri` | string | The URI of a running Gerrit instance. |
| `revisionId` | string | A revision (commit) ID. |

### `GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `GetVulnzOccurrencesSummaryResponse`

- A summary of how many vulnz occurrences there are per severity type. counts by groups, or if we should have different summary messages like this.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `counts` | array<SeverityCount> | A map of how many occurrences were found for each severity. |

### `GitSourceContext`

- A GitSourceContext denotes a particular revision in a third party Git repository (e.g., GitHub).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `revisionId` | string | Git commit hash. |
| `url` | string | Git repository URL. |

### `GoogleDevtoolsContaineranalysisV1alpha1AliasContext`

- An alias to a repo revision.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `kind` | string enum | The alias kind. Values: `KIND_UNSPECIFIED`, `FIXED`, `MOVABLE`, `OTHER`. |
| `name` | string | The alias name. |

### `GoogleDevtoolsContaineranalysisV1alpha1CloudRepoSourceContext`

- A CloudRepoSourceContext denotes a particular revision in a Google Cloud Source Repo.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `aliasContext` | GoogleDevtoolsContaineranalysisV1alpha1AliasContext | An alias, which may be a branch or tag. |
| `repoId` | GoogleDevtoolsContaineranalysisV1alpha1RepoId | The ID of the repo. |
| `revisionId` | string | A revision ID. |

### `GoogleDevtoolsContaineranalysisV1alpha1GerritSourceContext`

- A SourceContext referring to a Gerrit project.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `aliasContext` | GoogleDevtoolsContaineranalysisV1alpha1AliasContext | An alias, which may be a branch or tag. |
| `gerritProject` | string | The full project name within the host. Projects may be nested, so "project/subproject" is a valid project name. The "repo name" is the hostURI/project. |
| `hostUri` | string | The URI of a running Gerrit instance. |
| `revisionId` | string | A revision (commit) ID. |

### `GoogleDevtoolsContaineranalysisV1alpha1GitSourceContext`

- A GitSourceContext denotes a particular revision in a third party Git repository (e.g., GitHub).
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `revisionId` | string | Required. Git commit hash. |
| `url` | string | Git repository URL. |

### `GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata`

- Metadata for all operations used and required for all operations that created by Container Analysis Providers
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time this operation was created. |
| `endTime` | string (google-datetime) | Output only. The time that this operation was marked completed or failed. |

### `GoogleDevtoolsContaineranalysisV1alpha1ProjectRepoId`

- Selects a repo using a Google Cloud Platform project ID (e.g., winged-cargo-31) and a repo name within that project.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | The ID of the project. |
| `repoName` | string | The name of the repo. Leave empty for the default repo. |

### `GoogleDevtoolsContaineranalysisV1alpha1RepoId`

- A unique identifier for a Cloud Repo.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `projectRepoId` | GoogleDevtoolsContaineranalysisV1alpha1ProjectRepoId | A combination of a project ID and a repo name. |
| `uid` | string | A server-assigned, globally unique identifier. |

### `GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaBuilder`

- Identifies the entity that executed the recipe, which is trusted to have correctly performed the operation and populated this provenance.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `id` | string | URI indicating the builder’s identity. |

### `GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaCompleteness`

- Indicates that the builder claims certain fields in this message to be complete.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `environment` | boolean | If true, the builder claims that invocation.environment is complete. |
| `materials` | boolean | If true, the builder claims that materials is complete. |
| `parameters` | boolean | If true, the builder claims that invocation.parameters is complete. |

### `GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaConfigSource`

- Describes where the config file that kicked off the build came from. This is effectively a pointer to the source where buildConfig came from.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `digest` | object | Collection of cryptographic digests for the contents of the artifact specified by invocation.configSource.uri. |
| `entryPoint` | string | String identifying the entry point into the build. |
| `uri` | string | URI indicating the identity of the source of the config. |

### `GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaInvocation`

- Identifies the event that kicked off the build.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `configSource` | GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaConfigSource | Describes where the config file that kicked off the build came from. |
| `environment` | object | Any other builder-controlled inputs necessary for correctly evaluating the build. |
| `parameters` | object | Collection of all external inputs that influenced the build on top of invocation.configSource. |

### `GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMaterial`

- The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `digest` | object | Collection of cryptographic digests for the contents of this artifact. |
| `uri` | string | The method by which this artifact was referenced during the build. |

### `GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMetadata`

- Other properties of the build.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `buildFinishedOn` | string (google-datetime) | The timestamp of when the build completed. |
| `buildInvocationId` | string | Identifies this particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. |
| `buildStartedOn` | string (google-datetime) | The timestamp of when the build started. |
| `completeness` | GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaCompleteness | Indicates that the builder claims certain fields in this message to be complete. |
| `reproducible` | boolean | If true, the builder claims that running invocation on materials will produce bit-for-bit identical output. |

### `GoogleDevtoolsContaineranalysisV1alpha1SourceContext`

- A SourceContext is a reference to a tree of files. A SourceContext together with a path point to a unique revision of a single file or directory.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `cloudRepo` | GoogleDevtoolsContaineranalysisV1alpha1CloudRepoSourceContext | A SourceContext referring to a revision in a Google Cloud Source Repo. |
| `gerrit` | GoogleDevtoolsContaineranalysisV1alpha1GerritSourceContext | A SourceContext referring to a Gerrit project. |
| `git` | GoogleDevtoolsContaineranalysisV1alpha1GitSourceContext | A SourceContext referring to any third party Git repo (e.g., GitHub). |
| `labels` | object | Labels with user defined metadata. |

### `GrafeasV1FileLocation`

- Indicates the location at which a package was found.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filePath` | string | For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. |
| `layerDetails` | LayerDetails | Each package found in a file should have its own layer metadata (that is, information from the origin layer of the package). |
| `lineNumber` | integer (int32) | Line number in the file where the package was found. Optional field that only applies to source repository scanning. |

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

### `GrafeasV1beta1BuildDetails`

- Details of a build occurrence.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `inTotoSlsaProvenanceV1` | InTotoSlsaProvenanceV1 | — |
| `provenance` | BuildProvenance | Required. The actual provenance for the build. |
| `provenanceBytes` | string | Serialized JSON representation of the provenance, used in generating the build signature in the corresponding build note. After verifying the signature, `provenance_bytes` can be unmarshalled and compared to the provenance to confirm that it is unchanged. A base64-encoded string representation of the provenance bytes is used for the signature in order to interoperate with openssl which expects this format for signature verification. The serialized form is captured both to avoid ambiguity in how the provenance is marshalled to json as well to prevent incompatibilities with future changes. |

### `GrafeasV1beta1DeploymentDetails`

- Details of a deployment occurrence.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `deployment` | Deployment | Required. Deployment history for the resource. |

### `GrafeasV1beta1DiscoveryDetails`

- Details of a discovery occurrence.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `discovered` | Discovered | Required. Analysis status for the discovered resource. |

### `GrafeasV1beta1ImageDetails`

- Details of an image occurrence.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `derivedImage` | Derived | Required. Immutable. The child image derived from the base image. |

### `GrafeasV1beta1IntotoArtifact`

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `hashes` | ArtifactHashes | — |
| `resourceUri` | string | — |

### `GrafeasV1beta1IntotoDetails`

- This corresponds to a signed in-toto link - it is made up of one or more signatures and the in-toto link itself. This is used for occurrences of a Grafeas in-toto note.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `signatures` | array<GrafeasV1beta1IntotoSignature> | — |
| `signed` | Link | — |

### `GrafeasV1beta1IntotoSignature`

- A signature object consists of the KeyID used and the signature itself.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `keyid` | string | — |
| `sig` | string | — |

### `GrafeasV1beta1PackageDetails`

- Details of a package occurrence.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `installation` | Installation | Required. Where the package was installed. |

### `GrafeasV1beta1VulnerabilityDetails`

- Details of a vulnerability Occurrence.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cvssScore` | number (float) | Output only. The CVSS score of this vulnerability. CVSS score is on a scale of 0-10 where 0 indicates low severity and 10 indicates high severity. |
| `cvssV2` | CVSS | The cvss v2 score for the vulnerability. |
| `cvssV3` | CVSS | The cvss v3 score for the vulnerability. |
| `cvssV4` | CVSS | The cvss v4 score of this vulnerability. |
| `cvssVersion` | string enum | Output only. CVSS version used to populate cvss_score and severity. Values: `CVSS_VERSION_UNSPECIFIED`, `CVSS_VERSION_2`, `CVSS_VERSION_3`, `CVSS_VERSION_4`. |
| `effectiveSeverity` | string enum | The distro assigned severity for this vulnerability when it is available, and note provider assigned severity when distro has not yet assigned a severity for this vulnerability. When there are multiple PackageIssues for this vulnerability, they can have different effective severities because some might be provided by the distro while others are provided by the language ecosystem for a language pack. For this reason, it is advised to use the effective severity on the PackageIssue level. In the case where multiple PackageIssues have differing effective severities, this field should be the highest severity for any of the PackageIssues. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `extraDetails` | string | Occurrence-specific extra details about the vulnerability. |
| `longDescription` | string | Output only. A detailed description of this vulnerability. |
| `packageIssue` | array<PackageIssue> | Required. The set of affected locations and their fixes (if available) within the associated resource. |
| `relatedUrls` | array<RelatedUrl> | Output only. URLs related to this vulnerability. |
| `severity` | string enum | Output only. The note provider assigned Severity of the vulnerability. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `shortDescription` | string | Output only. A one sentence description of this vulnerability. |
| `type` | string | The type of package; whether native or non native(ruby gems, node.js packages etc) |
| `vexAssessment` | VexAssessment | — |

### `Hash`

- Container message for hash values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string | Required. The type of hash that was performed, e.g. "SHA-256". |
| `value` | string (byte) | Required. The hash value. |

### `Hash` (v1beta1)

- Container message for hash values.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Required. The type of hash that was performed. Values: `HASH_TYPE_UNSPECIFIED`, `SHA256`, `GO_MODULE_H1`, `SHA512`, `DIRSUM_SHA256`. |
| `value` | string (byte) | Required. The hash value. |

### `Hint`

- This submessage provides human-readable hints about the purpose of the authority. Because the name of a note acts as its resource reference, it is important to disambiguate the canonical name of the Note (which might be a UUID for security purposes) from "readable" names more suitable for debug output. Note that these hints should not be used to look up authorities in security sensitive contexts, such as when looking up attestations to verify.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `humanReadableName` | string | Required. The human readable name of this attestation authority, for example "qa". |

### `IdentifierHelper`

- Helps in identifying the underlying product. This should be treated like a one-of field. Only one field should be set in this proto. This is a workaround because spanner indexes on one-of fields restrict addition and deletion of fields.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `field` | string enum | The field that is set in the API proto. Values: `IDENTIFIER_HELPER_FIELD_UNSPECIFIED`, `GENERIC_URI`. |
| `genericUri` | string | Contains a URI which is vendor-specific. Example: The artifact repository URL of an image. |

### `Identity`

- The unique identifier of the update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `revision` | integer (int32) | The revision number of the update. |
| `updateId` | string | The revision independent identifier of the update. |

### `ImageNote`

- Basis describes the base image portion (Note) of the DockerImage relationship. Linked occurrences are derived from this or an equivalent image via: FROM Or an equivalent reference, e.g., a tag of the resource_url.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | Fingerprint | Required. Immutable. The fingerprint of the base image. |
| `resourceUrl` | string | Required. Immutable. The resource_url for the resource representing the basis of associated occurrence images. |

### `ImageOccurrence`

- Details of the derived image portion of the DockerImage relationship. This image would be produced from a Dockerfile with FROM .
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseResourceUrl` | string | Output only. This contains the base image URL for the derived image occurrence. |
| `distance` | integer (int32) | Output only. The number of layers by which this image differs from the associated image basis. |
| `fingerprint` | Fingerprint | Required. The fingerprint of the derived image. |
| `layerInfo` | array<Layer> | This contains layer-specific metadata, if populated it has length "distance" and is ordered with \[distance\] being the layer immediately following the base image and \[1\] being the final layer. |

### `InToto`

- This contains the fields corresponding to the definition of a software supply chain step in an in-toto layout. This information goes into a Grafeas note.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `expectedCommand` | array<string> | This field contains the expected command used to perform the step. |
| `expectedMaterials` | array<ArtifactRule> | The following fields contain in-toto artifact rules identifying the artifacts that enter this supply chain step, and exit the supply chain step, i.e. materials and products of the step. |
| `expectedProducts` | array<ArtifactRule> | — |
| `signingKeys` | array<SigningKey> | This field contains the public keys that can be used to verify the signatures on the step metadata. |
| `stepName` | string | This field identifies the name of the step in the supply chain. |
| `threshold` | string (int64) | This field contains a value that indicates the minimum number of keys that need to be used to sign the step's in-toto link. |

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

### `Installation`

- This represents how a particular software package may be installed on a system.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. Values: `ARCHITECTURE_UNSPECIFIED`, `X86`, `X64`. |
| `cpeUri` | string | Output only. The cpe_uri in CPE format (https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. |
| `license` | License | Licenses that have been declared by the authors of the package. |
| `location` | array<Location> | All of the places within the filesystem versions of this package have been found. |
| `name` | string | Required. Output only. The name of the installed package. |
| `packageType` | string | Output only. The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). |
| `version` | Version | Output only. The version of the package. |

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

### `KnowledgeBase`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The KB name (generally of the form KB\[0-9\]+ (e.g., KB123456)). |
| `url` | string | A link to the KB in the \[Windows update catalog\] (https://www.catalog.update.microsoft.com/). |

### `Layer`

- Layer holds metadata specific to a layer of a Docker image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arguments` | string | The recovered arguments to the Dockerfile directive. |
| `directive` | string | Required. The recovered Dockerfile directive used to construct this layer. See https://docs.docker.com/engine/reference/builder/ for more information. |

### `Layer` (v1beta1)

- Layer holds metadata specific to a layer of a Docker image.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `arguments` | string | The recovered arguments to the Dockerfile directive. |
| `directive` | string enum | Required. The recovered Dockerfile directive used to construct this layer. Values: `DIRECTIVE_UNSPECIFIED`, `MAINTAINER`, `RUN`, `CMD`, `LABEL`, `EXPOSE`, `ENV`, `ADD`, `COPY`, `ENTRYPOINT`, `VOLUME`, `USER`, `WORKDIR`, `ARG`, `ONBUILD`, `STOPSIGNAL`, `HEALTHCHECK`, `SHELL`. |

### `LayerDetails`

- Details about the layer a package was found in.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseImages` | array<BaseImage> | The base images the layer is found within. |
| `chainId` | string | The layer chain ID (sha256 hash) of the layer in the container image. https://github.com/opencontainers/image-spec/blob/main/config.md#layer-chainid |
| `command` | string | The layer build command that was used to build the layer. This may not be found in all layers depending on how the container image is built. |
| `diffId` | string | The diff ID (typically a sha256 hash) of the layer in the container image. |
| `index` | integer (int32) | The index of the layer in the container image. |

### `License`

- License information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `comments` | string | Comments |
| `expression` | string | Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2". |

### `LicensesSummary`

- Per license count
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | The number of fixable vulnerabilities associated with this resource. |
| `license` | string | The license of the package. Note that the format of this value is not guaranteed. It may be nil, an empty string, a boolean value (A \| B), a differently formed boolean value (A OR B), etc... |

### `Link`

- This corresponds to an in-toto link.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `byproducts` | ByProducts | ByProducts are data generated as part of a software supply chain step, but are not the actual result of the step. |
| `command` | array<string> | This field contains the full command executed for the step. This can also be empty if links are generated for operations that aren't directly mapped to a specific command. Each term in the command is an independent string in the list. An example of a command in the in-toto metadata field is: "command": \["git", "clone", "https://github.com/in-toto/demo-project.git"\] |
| `environment` | Environment | This is a field that can be used to capture information about the environment. It is suggested for this field to contain information that details environment variables, filesystem information, and the present working directory. The recommended structure of this field is: "environment": { "custom_values": { "variables": "", "filesystem": "", "workdir": "", "": "..." } } |
| `materials` | array<GrafeasV1beta1IntotoArtifact> | Materials are the supply chain artifacts that go into the step and are used for the operation performed. The key of the map is the path of the artifact and the structure contains the recorded hash information. An example is: "materials": \[ { "resource_uri": "foo/bar", "hashes": { "sha256": "ebebf...", : } } \] |
| `products` | array<GrafeasV1beta1IntotoArtifact> | Products are the supply chain artifacts generated as a result of the step. The structure is identical to that of materials. |

### `ListNoteOccurrencesResponse`

- Response for listing occurrences for a note.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to provide to skip to a particular spot in the list. |
| `occurrences` | array<Occurrence> | The occurrences attached to the specified note. |

### `ListNotesResponse`

- Response for listing notes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the list response. It should be used as `page_token` for the following request. An empty value means no more results. |
| `notes` | array<Note> | The notes requested. |
| `unreachable` | array<string> | Unordered list. Unreachable regions. Populated for requests from the global region when `return_partial_success` is set. Format: `projects/[PROJECT_ID]/locations/[LOCATION]` |

### `ListNotesResponse` (v1alpha1)

- Response including listed notes.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the list response. It should be used as page_token for the following request. An empty value means no more result. |
| `notes` | array<Note> | The occurrences requested |

### `ListOccurrencesResponse`

- Response for listing occurrences.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the list response. It should be used as `page_token` for the following request. An empty value means no more results. |
| `occurrences` | array<Occurrence> | The occurrences requested. |
| `unreachable` | array<string> | Unordered list. Unreachable regions. Populated for requests from the global region when `return_partial_success` is set. Format: `projects/[PROJECT_ID]/locations/[LOCATION]` |

### `ListOccurrencesResponse` (v1alpha1)

- Response including listed active occurrences.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the list response. It should be used as `page_token` for the following request. An empty value means no more results. |
| `occurrences` | array<Occurrence> | The occurrences requested. |

### `ListScanConfigsResponse`

- A list of scan configs for the project.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A page token to pass in order to get more scan configs. |
| `scanConfigs` | array<ScanConfig> | The set of scan configs. |

### `Location`

- An occurrence of a particular package installation found within a system's filesystem. E.g., glibc was found in `/var/lib/dpkg/status`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpeUri` | string | Deprecated. The CPE URI in CPE format (https://cpe.mitre.org/specification/) |
| `path` | string | The path from which we gathered that this package/version is installed. |
| `version` | Version | Deprecated. The version installed at this location. |

### `MaliciousContentLLMResult`

- Result of Malicious Content LLM scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxSeverity` | string enum | Tracks max severity found. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`. |
| `modelId` | string | The base name of the model that performed the scan. |
| `scanStatus` | string enum | Status of the scan. Values: `SCAN_STATUS_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |
| `tokenUsage` | TokenUsage | Telemetry metrics tracking token usage for the AI scan. |

### `MaliciousContentLLMResult` (v1alpha1)

- Result of Malicious Content LLM scan.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `maxSeverity` | string enum | Optional. Tracks max severity found. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`. |
| `modelId` | string | Optional. The base name of the model that performed the scan. |
| `scanState` | string enum | Output only. State of the scan. Values: `SCAN_STATE_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |
| `tokenUsage` | TokenUsage | Output only. Telemetry metrics tracking token usage for the AI scan. |

### `MaliciousContentStaticResult`

- Result of Malicious Content Static scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxSeverity` | string enum | Tracks max severity found. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`. |
| `scanStatus` | string enum | Status of the scan. Values: `SCAN_STATUS_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |

### `MaliciousContentStaticResult` (v1alpha1)

- Result of Malicious Content Static scan.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `maxSeverity` | string enum | Optional. Tracks max severity found. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`. |
| `scanState` | string enum | Output only. State of the scan. Values: `SCAN_STATE_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |

### `MalwareScanResult`

- Result of Malware scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scanStatus` | string enum | Status of the scan. Values: `SCAN_STATUS_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |
| `verdict` | string enum | Verdict of the scan. Values: `VERDICT_UNSPECIFIED`, `PASSED`, `FAILED`. |

### `MalwareScanResult` (v1alpha1)

- Result of Malware scan.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `scanState` | string enum | Output only. State of the scan. Values: `SCAN_STATE_UNSPECIFIED`, `PERFORMED`, `NOT_PERFORMED`. |
| `verdict` | string enum | Optional. Verdict of the scan. Values: `VERDICT_UNSPECIFIED`, `PASSED`, `FAILED`. |

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

### `Note`

- A type of analysis that can be done for a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aiSkillAnalysis` | AISkillAnalysisNote | A note describing an AI skill analysis. |
| `attestation` | AttestationNote | A note describing an attestation role. |
| `build` | BuildNote | A note describing build provenance for a verifiable build. |
| `compliance` | ComplianceNote | A note describing a compliance check. |
| `createTime` | string (google-datetime) | Output only. The time this note was created. This field can be used as a filter in list requests. |
| `deployment` | DeploymentNote | A note describing something that can be deployed. |
| `discovery` | DiscoveryNote | A note describing the initial analysis of a resource. |
| `dsseAttestation` | DSSEAttestationNote | A note describing a dsse attestation note. |
| `expirationTime` | string (google-datetime) | Time of expiration for this note. Empty if note does not expire. |
| `image` | ImageNote | A note describing a base image. |
| `kind` | string enum | Output only. The type of analysis. This field can be used as a filter in list requests. Values: `NOTE_KIND_UNSPECIFIED`, `VULNERABILITY`, `BUILD`, `IMAGE`, `PACKAGE`, `DEPLOYMENT`, `DISCOVERY`, `ATTESTATION`, `UPGRADE`, `COMPLIANCE`, `DSSE_ATTESTATION`, `VULNERABILITY_ASSESSMENT`, `SBOM_REFERENCE`, `SECRET`, `AI_SKILL_ANALYSIS`. |
| `longDescription` | string | A detailed description of this note. |
| `name` | string | Output only. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |
| `package` | PackageNote | A note describing a package hosted by various package managers. |
| `relatedNoteNames` | array<string> | Other notes related to this note. |
| `relatedUrl` | array<RelatedUrl> | URLs associated with this note. |
| `sbomReference` | SBOMReferenceNote | A note describing an SBOM reference. |
| `secret` | SecretNote | A note describing a secret. |
| `shortDescription` | string | A one sentence description of this note. |
| `updateTime` | string (google-datetime) | Output only. The time this note was last updated. This field can be used as a filter in list requests. |
| `upgrade` | UpgradeNote | A note describing available package upgrades. |
| `vulnerability` | VulnerabilityNote | A note describing a package vulnerability. |
| `vulnerabilityAssessment` | VulnerabilityAssessmentNote | A note describing a vulnerability assessment. |

### `Note` (v1alpha1)

- Provides a detailed description of a `Note`.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `aiSkillAnalysis` | AISkillAnalysisNote | A note describing an AI skill analysis. |
| `attestationAuthority` | AttestationAuthority | A note describing an attestation role. |
| `baseImage` | Basis | A note describing a base image. |
| `buildType` | BuildType | Build provenance type for a verifiable build. |
| `compliance` | ComplianceNote | A note describing a compliance check. |
| `createTime` | string (google-datetime) | Output only. The time this note was created. This field can be used as a filter in list requests. |
| `deployable` | Deployable | A note describing something that can be deployed. |
| `discovery` | Discovery | A note describing a provider/analysis type. |
| `dsseAttestation` | DSSEAttestationNote | A note describing a dsse attestation note. |
| `expirationTime` | string (google-datetime) | Time of expiration for this note, null if note does not expire. |
| `kind` | string enum | Output only. This explicitly denotes which kind of note is specified. This field can be used as a filter in list requests. Values: `KIND_UNSPECIFIED`, `PACKAGE_VULNERABILITY`, `BUILD_DETAILS`, `IMAGE_BASIS`, `PACKAGE_MANAGER`, `DEPLOYABLE`, `DISCOVERY`, `ATTESTATION_AUTHORITY`, `UPGRADE`, `COMPLIANCE`, `SBOM`, `SPDX_PACKAGE`, `SPDX_FILE`, `SPDX_RELATIONSHIP`, `DSSE_ATTESTATION`, `VULNERABILITY_ASSESSMENT`, `SBOM_REFERENCE`, `SECRET`, `AI_SKILL_ANALYSIS`. |
| `longDescription` | string | A detailed description of this `Note`. |
| `name` | string | The name of the note in the form "projects/{provider_project_id}/notes/{NOTE_ID}" |
| `package` | Package | A note describing a package hosted by various package managers. |
| `relatedUrl` | array<RelatedUrl> | URLs associated with this note |
| `sbom` | DocumentNote | A note describing a software bill of materials. |
| `sbomReference` | SBOMReferenceNote | A note describing a reference to an SBOM. |
| `secret` | SecretNote | A note describing a secret. |
| `shortDescription` | string | A one sentence description of this `Note`. |
| `spdxFile` | FileNote | A note describing an SPDX File. |
| `spdxPackage` | PackageInfoNote | A note describing an SPDX Package. |
| `spdxRelationship` | RelationshipNote | A note describing a relationship between SPDX elements. |
| `updateTime` | string (google-datetime) | Output only. The time this note was last updated. This field can be used as a filter in list requests. |
| `upgrade` | UpgradeNote | A note describing an upgrade. |
| `vulnerabilityAssessment` | VulnerabilityAssessmentNote | A note describing a vulnerability assessment. |
| `vulnerabilityType` | VulnerabilityType | A package vulnerability type of note. |

### `Note` (v1beta1)

- A type of analysis that can be done for a resource.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `aiSkillAnalysis` | AISkillAnalysisNote | A note describing an AI Skill analysis. |
| `attestationAuthority` | Authority | A note describing an attestation role. |
| `baseImage` | Basis | A note describing a base image. |
| `build` | Build | A note describing build provenance for a verifiable build. |
| `createTime` | string (google-datetime) | Output only. The time this note was created. This field can be used as a filter in list requests. |
| `deployable` | Deployable | A note describing something that can be deployed. |
| `discovery` | Discovery | A note describing the initial analysis of a resource. |
| `expirationTime` | string (google-datetime) | Time of expiration for this note. Empty if note does not expire. |
| `intoto` | InToto | A note describing an in-toto link. |
| `kind` | string enum | Output only. The type of analysis. This field can be used as a filter in list requests. Values: `NOTE_KIND_UNSPECIFIED`, `VULNERABILITY`, `BUILD`, `IMAGE`, `PACKAGE`, `DEPLOYMENT`, `DISCOVERY`, `ATTESTATION`, `INTOTO`, `SBOM`, `SPDX_PACKAGE`, `SPDX_FILE`, `SPDX_RELATIONSHIP`, `VULNERABILITY_ASSESSMENT`, `SBOM_REFERENCE`, `SECRET`, `AI_SKILL_ANALYSIS`. |
| `longDescription` | string | A detailed description of this note. |
| `name` | string | Output only. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. |
| `package` | Package | A note describing a package hosted by various package managers. |
| `relatedNoteNames` | array<string> | Other notes related to this note. |
| `relatedUrl` | array<RelatedUrl> | URLs associated with this note. |
| `sbom` | DocumentNote | A note describing a software bill of materials. |
| `sbomReference` | SBOMReferenceNote | A note describing an SBOM reference. |
| `secret` | SecretNote | A note describing a secret. |
| `shortDescription` | string | A one sentence description of this note. |
| `spdxFile` | FileNote | A note describing an SPDX File. |
| `spdxPackage` | PackageInfoNote | A note describing an SPDX Package. |
| `spdxRelationship` | RelationshipNote | A note describing an SPDX File. |
| `updateTime` | string (google-datetime) | Output only. The time this note was last updated. This field can be used as a filter in list requests. |
| `vulnerability` | Vulnerability | A note describing a package vulnerability. |
| `vulnerabilityAssessment` | VulnerabilityAssessmentNote | A note describing a vulnerability assessment. |

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

### `Occurrence` (v1alpha1)

- `Occurrence` includes information about analysis occurrences for an image.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `aiSkillAnalysis` | AISkillAnalysisOccurrence | This represents an AI skill analysis occurrence |
| `attestation` | Attestation | Describes an attestation of an artifact. |
| `buildDetails` | BuildDetails | Build details for a verifiable build. |
| `compliance` | ComplianceOccurrence | Describes whether or not a resource passes compliance checks. |
| `createTime` | string (google-datetime) | Output only. The time this `Occurrence` was created. |
| `deployment` | Deployment | Describes the deployment of an artifact on a runtime. |
| `derivedImage` | Derived | Describes how this resource derives from the basis in the associated note. |
| `discovered` | Discovered | Describes the initial scan status for this resource. |
| `dsseAttestation` | DSSEAttestationOccurrence | This represents a DSSE attestation occurrence |
| `envelope` | Envelope | https://github.com/secure-systems-lab/dsse |
| `installation` | Installation | Describes the installation of a package on the linked resource. |
| `kind` | string enum | Output only. This explicitly denotes which of the `Occurrence` details are specified. This field can be used as a filter in list requests. Values: `KIND_UNSPECIFIED`, `PACKAGE_VULNERABILITY`, `BUILD_DETAILS`, `IMAGE_BASIS`, `PACKAGE_MANAGER`, `DEPLOYABLE`, `DISCOVERY`, `ATTESTATION_AUTHORITY`, `UPGRADE`, `COMPLIANCE`, `SBOM`, `SPDX_PACKAGE`, `SPDX_FILE`, `SPDX_RELATIONSHIP`, `DSSE_ATTESTATION`, `VULNERABILITY_ASSESSMENT`, `SBOM_REFERENCE`, `SECRET`, `AI_SKILL_ANALYSIS`. |
| `name` | string | Output only. The name of the `Occurrence` in the form "projects/{project_id}/occurrences/{OCCURRENCE_ID}" |
| `noteName` | string | An analysis note associated with this image, in the form "providers/{provider_id}/notes/{NOTE_ID}" This field can be used as a filter in list requests. |
| `remediation` | string | A description of actions that can be taken to remedy the `Note` |
| `resource` | Resource | The resource for which the `Occurrence` applies. |
| `resourceUrl` | string | The unique URL of the image or the container for which the `Occurrence` applies. For example, https://gcr.io/project/image@sha256:foo This field can be used as a filter in list requests. |
| `sbom` | DocumentOccurrence | Describes a specific software bill of materials document. |
| `sbomReference` | SBOMReferenceOccurrence | This represents an SBOM reference occurrence |
| `secret` | SecretOccurrence | This represents a secret occurrence |
| `spdxFile` | FileOccurrence | Describes a specific SPDX File. |
| `spdxPackage` | PackageInfoOccurrence | Describes a specific SPDX Package. |
| `spdxRelationship` | RelationshipOccurrence | Describes a specific relationship between SPDX elements. |
| `updateTime` | string (google-datetime) | Output only. The time this `Occurrence` was last updated. |
| `upgrade` | UpgradeOccurrence | Describes an upgrade. |
| `vulnerabilityDetails` | VulnerabilityDetails | Details of a security vulnerability note. |

### `Occurrence` (v1beta1)

- An instance of an analysis type that has been found on a resource.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `aiSkillAnalysis` | AISkillAnalysisOccurrence | Describes a specific AI Skill Analysis occurrence. |
| `attestation` | Details | Describes an attestation of an artifact. |
| `build` | GrafeasV1beta1BuildDetails | Describes a verifiable build. |
| `createTime` | string (google-datetime) | Output only. The time this occurrence was created. |
| `deployment` | GrafeasV1beta1DeploymentDetails | Describes the deployment of an artifact on a runtime. |
| `derivedImage` | GrafeasV1beta1ImageDetails | Describes how this resource derives from the basis in the associated note. |
| `discovered` | GrafeasV1beta1DiscoveryDetails | Describes when a resource was discovered. |
| `envelope` | Envelope | https://github.com/secure-systems-lab/dsse |
| `installation` | GrafeasV1beta1PackageDetails | Describes the installation of a package on the linked resource. |
| `intoto` | GrafeasV1beta1IntotoDetails | Describes a specific in-toto link. |
| `kind` | string enum | Output only. This explicitly denotes which of the occurrence details are specified. This field can be used as a filter in list requests. Values: `NOTE_KIND_UNSPECIFIED`, `VULNERABILITY`, `BUILD`, `IMAGE`, `PACKAGE`, `DEPLOYMENT`, `DISCOVERY`, `ATTESTATION`, `INTOTO`, `SBOM`, `SPDX_PACKAGE`, `SPDX_FILE`, `SPDX_RELATIONSHIP`, `VULNERABILITY_ASSESSMENT`, `SBOM_REFERENCE`, `SECRET`, `AI_SKILL_ANALYSIS`. |
| `name` | string | Output only. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. |
| `noteName` | string | Required. Immutable. The analysis note associated with this occurrence, in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. This field can be used as a filter in list requests. |
| `remediation` | string | A description of actions that can be taken to remedy the note. |
| `resource` | Resource | Required. Immutable. The resource for which the occurrence applies. |
| `sbom` | DocumentOccurrence | Describes a specific software bill of materials document. |
| `sbomReference` | SBOMReferenceOccurrence | Describes a specific SBOM reference occurrences. |
| `secret` | SecretOccurrence | Describes a secret. |
| `spdxFile` | FileOccurrence | Describes a specific SPDX File. |
| `spdxPackage` | PackageInfoOccurrence | Describes a specific SPDX Package. |
| `spdxRelationship` | RelationshipOccurrence | Describes a specific SPDX Relationship. |
| `updateTime` | string (google-datetime) | Output only. The time this occurrence was last updated. |
| `vulnerability` | GrafeasV1beta1VulnerabilityDetails | Describes a security vulnerability. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `Package`

- Package represents a particular package version.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. Values: `ARCHITECTURE_UNSPECIFIED`, `X86`, `X64`. |
| `cpeUri` | string | The cpe_uri in CPE format (https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. |
| `description` | string | The description of this package. |
| `digest` | array<Digest> | Hash value, typically a file digest, that allows unique identification a specific package. |
| `distribution` | array<Distribution> | The various channels by which a package is distributed. |
| `license` | License | Licenses that have been declared by the authors of the package. |
| `maintainer` | string | A freeform text denoting the maintainer of this package. |
| `name` | string | Required. Immutable. The name of the package. |
| `packageType` | string | The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). |
| `url` | string | The homepage for this package. |
| `version` | Version | The version of the package. |

### `PackageInfoNote`

- PackageInfoNote represents an SPDX Package Information section: https://spdx.github.io/spdx-spec/3-package-information/
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `analyzed` | boolean | Indicates whether the file content of this package has been available for or subjected to analysis when creating the SPDX document |
| `attribution` | string | A place for the SPDX data creator to record, at the package level, acknowledgements that may be needed to be communicated in some contexts |
| `checksum` | string | Provide an independently reproducible mechanism that permits unique identification of a specific package that correlates to the data in this SPDX file |
| `copyright` | string | Identify the copyright holders of the package, as well as any dates present |
| `detailedDescription` | string | A more detailed description of the package |
| `downloadLocation` | string | This section identifies the download Universal Resource Locator (URL), or a specific location within a version control system (VCS) for the package at the time that the SPDX file was created |
| `externalRefs` | array<ExternalRef> | ExternalRef |
| `filesLicenseInfo` | array<string> | Contain the license the SPDX file creator has concluded as governing the This field is to contain a list of all licenses found in the package. The relationship between licenses (i.e., conjunctive, disjunctive) is not specified in this field – it is simply a listing of all licenses found |
| `homePage` | string | Provide a place for the SPDX file creator to record a web site that serves as the package's home page |
| `licenseDeclared` | License | List the licenses that have been declared by the authors of the package |
| `originator` | string | If the package identified in the SPDX file originated from a different person or organization than identified as Package Supplier, this field identifies from where or whom the package originally came |
| `packageType` | string | The type of package: OS, MAVEN, GO, GO_STDLIB, etc. |
| `summaryDescription` | string | A short description of the package |
| `supplier` | string | Identify the actual distribution source for the package/directory identified in the SPDX file |
| `title` | string | Identify the full name of the package as given by the Package Originator |
| `verificationCode` | string | This field provides an independently reproducible mechanism identifying specific contents of a package based on the actual files (except the SPDX file itself, if it is included in the package) that make up each package and that correlates to the data in this SPDX file |
| `version` | string | Identify the version of the package |

### `PackageInfoOccurrence`

- PackageInfoOccurrence represents an SPDX Package Information section: https://spdx.github.io/spdx-spec/3-package-information/
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `comment` | string | A place for the SPDX file creator to record any general comments about the package being described |
| `filename` | string | Provide the actual file name of the package, or path of the directory being treated as a package |
| `homePage` | string | Output only. Provide a place for the SPDX file creator to record a web site that serves as the package's home page |
| `id` | string | Uniquely identify any element in an SPDX document which may be referenced by other elements |
| `licenseConcluded` | License | package or alternative values, if the governing license cannot be determined |
| `packageType` | string | Output only. The type of package: OS, MAVEN, GO, GO_STDLIB, etc. |
| `sourceInfo` | string | Provide a place for the SPDX file creator to record any relevant background information or additional comments about the origin of the package |
| `summaryDescription` | string | Output only. A short description of the package |
| `title` | string | Output only. Identify the full name of the package as given by the Package Originator |
| `version` | string | Output only. Identify the version of the package |

### `PackageIssue`

- A detail for a distro and package this vulnerability occurrence was found in and its associated fix (if one is available).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `affectedCpeUri` | string | Required. The CPE URI (https://cpe.mitre.org/specification/) this vulnerability was found in. |
| `affectedPackage` | string | Required. The package this vulnerability was found in. |
| `affectedVersion` | Version | Required. The version of the package that is installed on the resource affected by this vulnerability. |
| `effectiveSeverity` | string enum | Output only. The distro or language system assigned severity for this vulnerability when that is available and note provider assigned severity when it is not available. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `fileLocation` | array<GrafeasV1FileLocation> | The location at which this package was found. |
| `fixAvailable` | boolean | Output only. Whether a fix is available for this package. |
| `fixedCpeUri` | string | The CPE URI (https://cpe.mitre.org/specification/) this vulnerability was fixed in. It is possible for this to be different from the affected_cpe_uri. |
| `fixedPackage` | string | The package this vulnerability was fixed in. It is possible for this to be different from the affected_package. |
| `fixedVersion` | Version | Required. The version of the package this vulnerability was fixed in. Setting this to VersionKind.MAXIMUM means no fix is yet available. |
| `packageType` | string | The type of package (e.g. OS, MAVEN, GO). |

### `PackageIssue` (v1beta1)

- This message wraps a location affected by a vulnerability and its associated fix (if one is available).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `affectedLocation` | VulnerabilityLocation | Required. The location of the vulnerability. |
| `effectiveSeverity` | string enum | Output only. The distro or language system assigned severity for this vulnerability when that is available and note provider assigned severity when it is not available. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `fixedLocation` | VulnerabilityLocation | The location of the available fix for vulnerability. |
| `packageType` | string | The type of package (e.g. OS, MAVEN, GO). |
| `severityName` | string | Deprecated, use Details.effective_severity instead The severity (e.g., distro assigned severity) for this vulnerability. |

### `PackageNote`

- PackageNote represents a particular package version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. Values: `ARCHITECTURE_UNSPECIFIED`, `X86`, `X64`. |
| `cpeUri` | string | The cpe_uri in CPE format (https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. |
| `description` | string | The description of this package. |
| `digest` | array<Digest> | Hash value, typically a file digest, that allows unique identification a specific package. |
| `distribution` | array<Distribution> | Deprecated. The various channels by which a package is distributed. |
| `license` | License | Licenses that have been declared by the authors of the package. |
| `maintainer` | string | A freeform text denoting the maintainer of this package. |
| `name` | string | Required. Immutable. The name of the package. |
| `packageType` | string | The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). |
| `url` | string | The homepage for this package. |
| `version` | Version | The version of the package. |

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

### `PackagesSummaryResponse`

- A summary of the packages found within the given resource.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `licensesSummary` | array<LicensesSummary> | A listing by license name of each of the licenses and their counts. |
| `resourceUrl` | string | The unique URL of the image or the container for which this summary applies. |

### `PerScannerVerdict`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maliciousContentLlmResult` | MaliciousContentLLMResult | Malicious Content LLM scan result. |
| `maliciousContentStaticResult` | MaliciousContentStaticResult | Malicious Content Static scan result. |
| `malwareScan` | MalwareScanResult | Malware scan result. |
| `workspacePolicy` | WorkspacePolicyResult | Workspace Policy scan result. |

### `PgpSignedAttestation`

- An attestation wrapper with a PGP-compatible signature. This message only supports `ATTACHED` signatures, where the payload that is signed is included alongside the signature itself in the same file.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `contentType` | string enum | Type (for example schema) of the attestation payload that was signed. The verifier must ensure that the provided type is one that the verifier supports, and that the attestation payload is a valid instantiation of that type (for example by validating a JSON schema). Values: `CONTENT_TYPE_UNSPECIFIED`, `SIMPLE_SIGNING_JSON`. |
| `pgpKeyId` | string | The cryptographic fingerprint of the key used to generate the signature, as output by, e.g. `gpg --list-keys`. This should be the version 4, full 160-bit fingerprint, expressed as a 40 character hexadecimal string. See https://tools.ietf.org/html/rfc4880#section-12.2 for details. Implementations may choose to acknowledge "LONG", "SHORT", or other abbreviated key IDs, but only the full fingerprint is guaranteed to work. In gpg, the full fingerprint can be retrieved from the `fpr` field returned when calling --list-keys with --with-colons. For example: gpg --with-colons --with-fingerprint --force-v4-certs \ --list-keys attester@example.com tru::1:1513631572:0:3:1:5 pub:...... fpr:::::::::24FF6481B76AC91E66A00AC657A93A81EF3AE6FB: Above, the fingerprint is `24FF6481B76AC91E66A00AC657A93A81EF3AE6FB`. |
| `signature` | string | Required. The raw content of the signature, as output by GNU Privacy Guard (GPG) or equivalent. Since this message only supports attached signatures, the payload that was signed must be attached. While the signature format supported is dependent on the verification implementation, currently only ASCII-armored (`--armor` to gpg), non-clearsigned (`--sign` rather than `--clearsign` to gpg) are supported. Concretely, `gpg --sign --armor --output=signature.gpg payload.json` will create the signature content expected in this field in `signature.gpg` for the `payload.json` attestation payload. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `Product`

- Product contains information about a product and how to uniquely identify it.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `genericUri` | string | Contains a URI which is vendor-specific. Example: The artifact repository URL of an image. |
| `id` | string | Token that identifies a product so that it can be referred to from other parts in the document. There is no predefined format as long as it uniquely identifies a group in the context of the current document. |
| `name` | string | Name of the product. |

### `Product` (v1alpha1)

- Product contains information about a product and how to uniquely identify it.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `id` | string | Token that identifies a product so that it can be referred to from other parts in the document. There is no predefined format as long as it uniquely identifies a group in the context of the current document. |
| `identifierHelper` | IdentifierHelper | Helps in identifying the underlying product. |
| `name` | string | Name of the product. |

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

### `Publisher`

- Publisher contains information about the publisher of this Note.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `issuingAuthority` | string | Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations. |
| `name` | string | Name of the publisher. Examples: 'Google', 'Google Cloud Platform'. |
| `publisherNamespace` | string | The context or namespace. Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party. Example: https://csaf.io |

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

### `RelationshipNote`

- RelationshipNote represents an SPDX Relationship section: https://spdx.github.io/spdx-spec/7-relationships-between-SPDX-elements/
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | The type of relationship between the source and target SPDX elements Values: `RELATIONSHIP_TYPE_UNSPECIFIED`, `DESCRIBES`, `DESCRIBED_BY`, `CONTAINS`, `CONTAINED_BY`, `DEPENDS_ON`, `DEPENDENCY_OF`, `DEPENDENCY_MANIFEST_OF`, `BUILD_DEPENDENCY_OF`, `DEV_DEPENDENCY_OF`, `OPTIONAL_DEPENDENCY_OF`, `PROVIDED_DEPENDENCY_OF`, `TEST_DEPENDENCY_OF`, `RUNTIME_DEPENDENCY_OF`, `EXAMPLE_OF`, `GENERATES`, `GENERATED_FROM`, `ANCESTOR_OF`, `DESCENDANT_OF`, `VARIANT_OF`, `DISTRIBUTION_ARTIFACT`, `PATCH_FOR`, `PATCH_APPLIED`, `COPY_OF`, `FILE_ADDED`, `FILE_DELETED`, `FILE_MODIFIED`, `EXPANDED_FROM_ARCHIVE`, `DYNAMIC_LINK`, `STATIC_LINK`, `DATA_FILE_OF`, `TEST_CASE_OF`, `BUILD_TOOL_OF`, `DEV_TOOL_OF`, `TEST_OF`, `TEST_TOOL_OF`, `DOCUMENTATION_OF`, `OPTIONAL_COMPONENT_OF`, `METAFILE_OF`, `PACKAGE_OF`, `AMENDS`, `PREREQUISITE_FOR`, `HAS_PREREQUISITE`, `OTHER`. |

### `RelationshipOccurrence`

- RelationshipOccurrence represents an SPDX Relationship section: https://spdx.github.io/spdx-spec/7-relationships-between-SPDX-elements/
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `comment` | string | A place for the SPDX file creator to record any general comments about the relationship |
| `source` | string | Also referred to as SPDXRef-A The source SPDX element (file, package, etc) |
| `target` | string | Also referred to as SPDXRef-B The target SPDC element (file, package, etc) In cases where there are "known unknowns", the use of the keyword NOASSERTION can be used The keywords NONE can be used to indicate that an SPDX element (package/file/snippet) has no other elements connected by some relationship to it |
| `type` | string enum | Output only. The type of relationship between the source and target SPDX elements Values: `RELATIONSHIP_TYPE_UNSPECIFIED`, `DESCRIBES`, `DESCRIBED_BY`, `CONTAINS`, `CONTAINED_BY`, `DEPENDS_ON`, `DEPENDENCY_OF`, `DEPENDENCY_MANIFEST_OF`, `BUILD_DEPENDENCY_OF`, `DEV_DEPENDENCY_OF`, `OPTIONAL_DEPENDENCY_OF`, `PROVIDED_DEPENDENCY_OF`, `TEST_DEPENDENCY_OF`, `RUNTIME_DEPENDENCY_OF`, `EXAMPLE_OF`, `GENERATES`, `GENERATED_FROM`, `ANCESTOR_OF`, `DESCENDANT_OF`, `VARIANT_OF`, `DISTRIBUTION_ARTIFACT`, `PATCH_FOR`, `PATCH_APPLIED`, `COPY_OF`, `FILE_ADDED`, `FILE_DELETED`, `FILE_MODIFIED`, `EXPANDED_FROM_ARCHIVE`, `DYNAMIC_LINK`, `STATIC_LINK`, `DATA_FILE_OF`, `TEST_CASE_OF`, `BUILD_TOOL_OF`, `DEV_TOOL_OF`, `TEST_OF`, `TEST_TOOL_OF`, `DOCUMENTATION_OF`, `OPTIONAL_COMPONENT_OF`, `METAFILE_OF`, `PACKAGE_OF`, `AMENDS`, `PREREQUISITE_FOR`, `HAS_PREREQUISITE`, `OTHER`. |

### `Remediation`

- Specifies details on how to handle (and presumably, fix) a vulnerability.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Contains a comprehensive human-readable discussion of the remediation. |
| `remediationType` | string enum | The type of remediation that can be applied. Values: `REMEDIATION_TYPE_UNSPECIFIED`, `MITIGATION`, `NO_FIX_PLANNED`, `NONE_AVAILABLE`, `VENDOR_FIX`, `WORKAROUND`. |
| `remediationUri` | RelatedUrl | Contains the URL where to obtain the remediation. |

### `Remediation` (v1alpha1)

- Specifies details on how to handle (and presumably, fix) a vulnerability.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `details` | string | Contains a comprehensive human-readable discussion of the remediation. |
| `remediationType` | string enum | The type of remediation that can be applied. Values: `REMEDIATION_TYPE_UNSPECIFIED`, `MITIGATION`, `NO_FIX_PLANNED`, `NONE_AVAILABLE`, `VENDOR_FIX`, `WORKAROUND`. |
| `remediationUri` | URI | Contains the URL where to obtain the remediation. |

### `RepoId`

- A unique identifier for a Cloud Repo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectRepoId` | ProjectRepoId | A combination of a project ID and a repo name. |
| `uid` | string | A server-assigned, globally unique identifier. |

### `RepoSource`

- RepoSource describes the location of the source in a Google Cloud Source Repository.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `branchName` | string | Name of the branch to build. |
| `commitSha` | string | Explicit commit SHA to build. |
| `projectId` | string | ID of the project that owns the repo. |
| `repoName` | string | Name of the repo. |
| `tagName` | string | Name of the tag to build. |

### `Resource`

- An entity that can have metadata. For example, a Docker image.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `contentHash` | Hash | Deprecated, do not use. Use uri instead. The hash of the resource content. For example, the Docker digest. |
| `name` | string | Deprecated, do not use. Use uri instead. The name of the resource. For example, the name of a Docker image - "Debian". |
| `uri` | string | Required. The unique URI of the resource. For example, `https://gcr.io/project/image@sha256:foo` for a Docker image. |

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

### `SBOMReferenceNote`

- The note representing an SBOM reference.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `format` | string | The format that SBOM takes. E.g. may be spdx, cyclonedx, etc... |
| `version` | string | The version of the format that the SBOM takes. E.g. if the format is spdx, the version may be 2.3. |

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

### `ScanConfig`

- Indicates various scans and whether they are turned on or off.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time this scan config was created. |
| `description` | string | Output only. A human-readable description of what the `ScanConfig` does. |
| `enabled` | boolean | Indicates whether the Scan is enabled. |
| `name` | string | Output only. The name of the ScanConfig in the form “projects/{project_id}/scanConfigs/{scan_config_id}". |
| `updateTime` | string (google-datetime) | Output only. The time this scan config was last updated. |

### `SecretLocation`

- The location of the secret.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileLocation` | GrafeasV1FileLocation | The secret is found from a file. |

### `SecretLocation` (v1beta1)

- The location of the secret.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `fileLocation` | FileLocation | The secret is found from a file. |

### `SecretNote`

- The note representing a secret.
- Version: v1

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

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |

### `SeverityCount`

- The number of occurrences created for a specific severity.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | The number of occurrences with the severity. |
| `severity` | string enum | The severity of the occurrences. Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |

### `Signature`

- Verifiers (e.g. Kritis implementations) MUST verify signatures with respect to the trust anchors defined in policy (e.g. a Kritis policy). Typically this means that the verifier has been configured with a map from `public_key_id` to public key material (and any required parameters, e.g. signing algorithm). In particular, verification implementations MUST NOT treat the signature `public_key_id` as anything more than a key lookup hint. The `public_key_id` DOES NOT validate or authenticate a public key; it only provides a mechanism for quickly selecting a public key ALREADY CONFIGURED on the verifier through a trusted channel. Verification implementations MUST reject signatures in any of the following circumstances: \* The `public_key_id` is not recognized by the verifier. \* The public key that `public_key_id` refers to does not verify the signature with respect to the payload. The `signature` contents SHOULD NOT be "attached" (where the payload is included with the serialized `signature` bytes). Verifiers MUST ignore any "attached" payload and only verify signatures with respect to explicitly provided payload (e.g. a `payload` field on the proto message that holds this Signature, or the canonical serialization of the proto message that holds this signature).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publicKeyId` | string | The identifier for the public key that verifies this signature. \* The `public_key_id` is required. \* The `public_key_id` SHOULD be an RFC3986 conformant URI. \* When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: \* "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): \* "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" \* "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5" |
| `signature` | string (byte) | The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload. |

### `SigningKey`

- This defines the format used to record keys used in the software supply chain. An in-toto link is attested using one or more keys defined in the in-toto layout. An example of this is: { "key_id": "776a00e29f3559e0141b3b096f696abc6cfb0c657ab40f441132b345b0...", "key_type": "rsa", "public_key_value": "-----BEGIN PUBLIC KEY-----\nMIIBojANBgkqhkiG9w0B...", "key_scheme": "rsassa-pss-sha256" } The format for in-toto's key definition can be found in section 4.2 of the in-toto specification.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | key_id is an identifier for the signing key. |
| `keyScheme` | string | This field contains the corresponding signature scheme. Eg: "rsassa-pss-sha256". |
| `keyType` | string | This field identifies the specific signing method. Eg: "rsa", "ed25519", and "ecdsa". |
| `publicKeyValue` | string | This field contains the actual public key. |

### Shape of `FileHashes`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "fileHash": "array<Hash>"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1, v1alpha1 of `containeranalysis` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://containeranalysis.googleapis.com/$discovery/rest?version=v1, https://containeranalysis.googleapis.com/$discovery/rest?version=v1beta1, https://containeranalysis.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
