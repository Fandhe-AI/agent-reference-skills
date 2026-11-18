---
source: https://containeranalysis.googleapis.com/$discovery/rest?version=v1
---

# Container Analysis API message schemas (containeranalysis) (part 1/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/containeranalysis/`.

### `AISkillAnalysisNote`

- AISkillAnalysisNote provides the metadata of an AI-based skill analysis.
- Version: v1

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

### `Artifact`

- Artifact describes a build product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checksum` | string | Hash or checksum value of a binary, or Docker Registry 2.0 digest of a container. |
| `id` | string | Artifact ID, if any; for container images, this will be a URL by digest like `gcr.io/projectID/imagename@sha256:123456`. |
| `names` | array<string> | Related artifact names. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. Note that a single Artifact ID can have multiple names, for example if two tags are applied to one image. |

### `Artifact` (v1alpha1)

- Artifact describes a build product.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `checksum` | string | Hash or checksum value of a binary, or Docker Registry 2.0 digest of a container. |
| `id` | string | Artifact ID, if any; for container images, this will be a URL by digest like gcr.io/projectID/imagename@sha256:123456 |
| `name` | string | Name of the artifact. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. This field is deprecated in favor of the plural `names` field; it continues to exist here to allow existing BuildProvenance serialized to json in google.devtools.containeranalysis.v1alpha1.BuildDetails.provenance_bytes to deserialize back into proto. |
| `names` | array<string> | Related artifact names. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. Note that a single Artifact ID can have multiple names, for example if two tags are applied to one image. |

### `ArtifactHashes`

- Defines a hash object for use in Materials and Products.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `sha256` | string | — |

### `ArtifactRule`

- Defines an object to declare an in-toto artifact rule
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `artifactRule` | array<string> | — |

### `Assessment`

- Assessment provides all information that is related to a single vulnerability for this product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cve` | string | Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. Deprecated: Use vulnerability_id instead to denote CVEs. |
| `impacts` | array<string> | Contains information about the impact of this vulnerability, this will change with time. |
| `justification` | Justification | Justification provides the justification when the state of the assessment if NOT_AFFECTED. |
| `longDescription` | string | A detailed description of this Vex. |
| `relatedUris` | array<RelatedUrl> | Holds a list of references associated with this vulnerability item and assessment. These uris have additional information about the vulnerability and the assessment itself. E.g. Link to a document which details how this assessment concluded the state of this vulnerability. |
| `remediations` | array<Remediation> | Specifies details on how to handle (and presumably, fix) a vulnerability. |
| `shortDescription` | string | A one sentence description of this Vex. |
| `state` | string enum | Provides the state of this Vulnerability assessment. Values: `STATE_UNSPECIFIED`, `AFFECTED`, `NOT_AFFECTED`, `FIXED`, `UNDER_INVESTIGATION`. |
| `vulnerabilityId` | string | The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. |

### `Assessment` (v1alpha1)

- Assessment provides all information that is related to a single vulnerability for this product.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `cve` | string | Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. |
| `impacts` | array<string> | Contains information about the impact of this vulnerability, this will change with time. |
| `justification` | Justification | Justification provides the justification when the state of the assessment if NOT_AFFECTED. |
| `longDescription` | string | A detailed description of this Vex. |
| `relatedUris` | array<URI> | Holds a list of references associated with this vulnerability item and assessment. These uris have additional information about the vulnerability and the assessment itself. E.g. Link to a document which details how this assessment concluded the state of this vulnerability. |
| `remediations` | array<Remediation> | Specifies details on how to handle (and presumably, fix) a vulnerability. |
| `shortDescription` | string | A one sentence description of this Vex. |
| `state` | string enum | Provides the state of this Vulnerability assessment. Values: `STATE_UNSPECIFIED`, `AFFECTED`, `NOT_AFFECTED`, `FIXED`, `UNDER_INVESTIGATION`. |
| `vulnerabilityId` | string | The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. |

### `Attestation`

- Occurrence that represents a single "attestation". The authenticity of an attestation can be verified using the attached signature. If the verifier trusts the public key of the signer, then verifying the signature is sufficient to establish trust. In this circumstance, the authority to which this attestation is attached is primarily useful for look-up (how to find this attestation if you already know the authority and artifact to be verified) and intent (which authority was this attestation intended to sign for).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `genericSignedAttestation` | GenericSignedAttestation | — |
| `pgpSignedAttestation` | PgpSignedAttestation | A PGP signed attestation. |

### `Attestation` (v1alpha1)

- Occurrence that represents a single "attestation". The authenticity of an Attestation can be verified using the attached signature. If the verifier trusts the public key of the signer, then verifying the signature is sufficient to establish trust. In this circumstance, the AttestationAuthority to which this Attestation is attached is primarily useful for look-up (how to find this Attestation if you already know the Authority and artifact to be verified) and intent (which authority was this attestation intended to sign for).
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `pgpSignedAttestation` | PgpSignedAttestation | — |

### `AttestationAuthority`

- Note kind that represents a logical attestation "role" or "authority". For example, an organization might have one `AttestationAuthority` for "QA" and one for "build". This Note is intended to act strictly as a grouping mechanism for the attached Occurrences (Attestations). This grouping mechanism also provides a security boundary, since IAM ACLs gate the ability for a principle to attach an Occurrence to a given Note. It also provides a single point of lookup to find all attached Attestation Occurrences, even if they don't all live in the same project.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `hint` | AttestationAuthorityHint | — |

### `AttestationAuthorityHint`

- This submessage provides human-readable hints about the purpose of the AttestationAuthority. Because the name of a Note acts as its resource reference, it is important to disambiguate the canonical name of the Note (which might be a UUID for security purposes) from "readable" names more suitable for debug output. Note that these hints should NOT be used to look up AttestationAuthorities in security sensitive contexts, such as when looking up Attestations to verify.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `humanReadableName` | string | The human readable name of this Attestation Authority, for example "qa". |

### `AttestationNote`

- Note kind that represents a logical attestation "role" or "authority". For example, an organization might have one `Authority` for "QA" and one for "build". This note is intended to act strictly as a grouping mechanism for the attached occurrences (Attestations). This grouping mechanism also provides a security boundary, since IAM ACLs gate the ability for a principle to attach an occurrence to a given note. It also provides a single point of lookup to find all attached attestation occurrences, even if they don't all live in the same project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hint` | Hint | Hint hints at the purpose of the attestation authority. |

### `AttestationOccurrence`

- Occurrence that represents a single "attestation". The authenticity of an attestation can be verified using the attached signature. If the verifier trusts the public key of the signer, then verifying the signature is sufficient to establish trust. In this circumstance, the authority to which this attestation is attached is primarily useful for lookup (how to find this attestation if you already know the authority and artifact to be verified) and intent (for which authority this attestation was intended to sign.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jwts` | array<Jwt> | One or more JWTs encoding a self-contained attestation. Each JWT encodes the payload that it verifies within the JWT itself. Verifier implementation SHOULD ignore the `serialized_payload` field when verifying these JWTs. If only JWTs are present on this AttestationOccurrence, then the `serialized_payload` SHOULD be left empty. Each JWT SHOULD encode a claim specific to the `resource_uri` of this Occurrence, but this is not validated by Grafeas metadata API implementations. The JWT itself is opaque to Grafeas. |
| `serializedPayload` | string (byte) | Required. The serialized payload that is verified by one or more `signatures`. |
| `signatures` | array<Signature> | One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification. |

### `Authority`

- Note kind that represents a logical attestation "role" or "authority". For example, an organization might have one `Authority` for "QA" and one for "build". This note is intended to act strictly as a grouping mechanism for the attached occurrences (Attestations). This grouping mechanism also provides a security boundary, since IAM ACLs gate the ability for a principle to attach an occurrence to a given note. It also provides a single point of lookup to find all attached attestation occurrences, even if they don't all live in the same project.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `hint` | Hint | Hint hints at the purpose of the attestation authority. |

### `BaseImage`

- BaseImage describes a base image of a container image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `layerCount` | integer (int32) | The number of layers that the base image is composed of. |
| `name` | string | The name of the base image. |
| `registry` | string | The registry in which the base image is from. |
| `repository` | string | The repository name in which the base image is from. |

### `Basis`

- Basis describes the base image portion (Note) of the DockerImage relationship. Linked occurrences are derived from this or an equivalent image via: FROM Or an equivalent reference, e.g. a tag of the resource_url.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | Fingerprint | Required. Immutable. The fingerprint of the base image. |
| `resourceUrl` | string | Required. Immutable. The resource_url for the resource representing the basis of associated occurrence images. |

### `BatchCreateNotesRequest`

- Request to create notes in batch.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `notes` | object | Required. The notes to create. Max allowed length is 1000. |

### `BatchCreateNotesResponse`

- Response for creating notes in batch.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `notes` | array<Note> | The notes that were created. |

### `BatchCreateOccurrencesRequest`

- Request to create occurrences in batch.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `occurrences` | array<Occurrence> | Required. The occurrences to create. Max allowed length is 1000. |

### `BatchCreateOccurrencesResponse`

- Response for creating occurrences in batch.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `occurrences` | array<Occurrence> | The occurrences that were created. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `Build`

- Note holding the version of the provider's builder and the signature of the provenance message in the build details occurrence.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `builderVersion` | string | Required. Immutable. Version of the builder which produced this build. |
| `signature` | BuildSignature | Signature of the build in occurrences pointing to this build note containing build details. |

### `BuildDefinition`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildType` | string | — |
| `externalParameters` | object | — |
| `internalParameters` | object | — |
| `resolvedDependencies` | array<ResourceDescriptor> | — |

### `BuildDetails`

- Message encapsulating build provenance details.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `inTotoSlsaProvenanceV1` | InTotoSlsaProvenanceV1 | In-Toto Slsa Provenance V1 represents a slsa provenance meeting the slsa spec, wrapped in an in-toto statement. This allows for direct jsonification of a to-spec in-toto slsa statement with a to-spec slsa provenance. |
| `intotoProvenance` | InTotoProvenance | Deprecated. See InTotoStatement for the replacement. In-toto Provenance representation as defined in spec. |
| `intotoStatement` | InTotoStatement | In-toto Statement representation as defined in spec. The intoto_statement can contain any type of provenance. The serialized payload of the statement can be stored and signed in the Occurrence's envelope. |
| `provenance` | BuildProvenance | The actual provenance |
| `provenanceBytes` | string | Serialized JSON representation of the provenance, used in generating the `BuildSignature` in the corresponding Result. After verifying the signature, `provenance_bytes` can be unmarshalled and compared to the provenance to confirm that it is unchanged. A base64-encoded string representation of the provenance bytes is used for the signature in order to interoperate with openssl which expects this format for signature verification. The serialized form is captured both to avoid ambiguity in how the provenance is marshalled to json as well to prevent incompatibilities with future changes. |

### `BuildMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `finishedOn` | string (google-datetime) | — |
| `invocationId` | string | — |
| `startedOn` | string (google-datetime) | — |

### `BuildNote`

- Note holding the version of the provider's builder and the signature of the provenance message in the build details occurrence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `builderVersion` | string | Required. Immutable. Version of the builder which produced this build. |

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

### `BuildProvenance` (v1alpha1)

- Provenance of a build. Contains all information needed to verify the full details about the build from source to completion.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `buildOptions` | object | Special options applied to this build. This is a catch-all field where build providers can enter any desired additional details. |
| `builderVersion` | string | Version string of the builder at the time this build was executed. |
| `builtArtifacts` | array<Artifact> | Output of the build. |
| `commands` | array<Command> | Commands requested by the build. |
| `createTime` | string (google-datetime) | Time at which the build was created. |
| `creator` | string | E-mail address of the user who initiated this build. Note that this was the user's e-mail address at the time the build was initiated; this address may not represent the same end-user for all time. |
| `finishTime` | string (google-datetime) | Time at which execution of the build was finished. |
| `id` | string | Unique identifier of the build. |
| `logsBucket` | string | Google Cloud Storage bucket where logs were written. |
| `projectId` | string | ID of the project. |
| `sourceProvenance` | Source | Details of the Source input to the build. |
| `startTime` | string (google-datetime) | Time at which execution of the build was started. |
| `triggerId` | string | Trigger identifier if the build was triggered automatically; empty if not. |

### `BuildSignature`

- Message encapsulating the signature of the verified build.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | An ID for the key used to sign. This could be either an ID for the key stored in `public_key` (such as the ID or fingerprint for a PGP key, or the CN for a cert), or a reference to an external key (such as a reference to a key in Cloud Key Management Service). |
| `keyType` | string enum | The type of the key, either stored in `public_key` or referenced in `key_id`. Values: `KEY_TYPE_UNSPECIFIED`, `PGP_ASCII_ARMORED`, `PKIX_PEM`. |
| `publicKey` | string | Public key of the builder which can be used to verify that the related findings are valid and unchanged. If `key_type` is empty, this defaults to PEM encoded public keys. This field may be empty if `key_id` references an external key. For Cloud Build based signatures, this is a PEM encoded public key. To verify the Cloud Build signature, place the contents of this field into a file (public.pem). The signature field is base64-decoded into its binary representation in signature.bin, and the provenance bytes from `BuildDetails` are base64-decoded into a binary representation in signed.bin. OpenSSL can then verify the signature: `openssl sha256 -verify public.pem -signature signature.bin signed.bin` |
| `signature` | string (byte) | Required. Signature of the related `BuildProvenance`. In JSON, this is base-64 encoded. |

### `BuildSignature` (v1alpha1)

- Message encapsulating the signature of the verified build.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | An Id for the key used to sign. This could be either an Id for the key stored in `public_key` (such as the Id or fingerprint for a PGP key, or the CN for a cert), or a reference to an external key (such as a reference to a key in Cloud Key Management Service). |
| `keyType` | string enum | The type of the key, either stored in `public_key` or referenced in `key_id` Values: `KEY_TYPE_UNSPECIFIED`, `PGP_ASCII_ARMORED`, `PKIX_PEM`. |
| `publicKey` | string | Public key of the builder which can be used to verify that the related findings are valid and unchanged. If `key_type` is empty, this defaults to PEM encoded public keys. This field may be empty if `key_id` references an external key. For Cloud Build based signatures, this is a PEM encoded public key. To verify the Cloud Build signature, place the contents of this field into a file (public.pem). The signature field is base64-decoded into its binary representation in signature.bin, and the provenance bytes from `BuildDetails` are base64-decoded into a binary representation in signed.bin. OpenSSL can then verify the signature: `openssl sha256 -verify public.pem -signature signature.bin signed.bin` |
| `signature` | string | Signature of the related `BuildProvenance`, encoded in a base64 string. |

### `BuildStep`

- A step in the build pipeline. Next ID: 23
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowExitCodes` | array<integer> | Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. |
| `allowFailure` | boolean | Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. |
| `args` | array<string> | A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. |
| `automapSubstitutions` | boolean | Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. |
| `dir` | string | Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. |
| `entrypoint` | string | Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. |
| `env` | array<string> | A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". |
| `exitCode` | integer (int32) | Output only. Return code from running the step. |
| `id` | string | Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. |
| `name` | string | Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps (https://github.com/GoogleCloudPlatform/cloud-builders (https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. |
| `pullTiming` | TimeSpan | Output only. Stores timing information for pulling this build step's builder image only. |
| `remoteConfig` | string | Remote configuration for the build step. |
| `results` | array<StepResult> | — |
| `script` | string | A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. |
| `secretEnv` | array<string> | A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. |
| `status` | string enum | Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. Values: `STATUS_UNKNOWN`, `PENDING`, `QUEUING`, `QUEUED`, `WORKING`, `SUCCESS`, `FAILURE`, `INTERNAL_ERROR`, `TIMEOUT`, `CANCELLED`, `EXPIRED`. |
| `timeout` | string (google-duration) | Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. |
| `timing` | TimeSpan | Output only. Stores timing information for executing this build step. |
| `volumes` | array<Volume> | List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. |
| `waitFor` | array<string> | The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. |

### `BuildType`

- Note holding the version of the provider's builder and the signature of the provenance message in linked BuildDetails.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `builderVersion` | string | Version of the builder which produced this Note. |
| `signature` | BuildSignature | Signature of the build in Occurrences pointing to the Note containing this `BuilderDetails`. |

### `BuilderConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |

### `ByProducts`

- Defines an object for the byproducts field in in-toto links. The suggested fields are "stderr", "stdout", and "return-value".
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customValues` | object | — |

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

### `CVSSv3`

- Common Vulnerability Scoring System version 3. For details, see https://www.first.org/cvss/specification-document
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attackComplexity` | string enum | — Values: `ATTACK_COMPLEXITY_UNSPECIFIED`, `ATTACK_COMPLEXITY_LOW`, `ATTACK_COMPLEXITY_HIGH`. |
| `attackVector` | string enum | Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. Values: `ATTACK_VECTOR_UNSPECIFIED`, `ATTACK_VECTOR_NETWORK`, `ATTACK_VECTOR_ADJACENT`, `ATTACK_VECTOR_LOCAL`, `ATTACK_VECTOR_PHYSICAL`. |
| `availabilityImpact` | string enum | — Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`. |
| `baseScore` | number (float) | The base score is a function of the base metric scores. |
| `confidentialityImpact` | string enum | — Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`. |
| `exploitabilityScore` | number (float) | — |
| `impactScore` | number (float) | — |
| `integrityImpact` | string enum | — Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`. |
| `privilegesRequired` | string enum | — Values: `PRIVILEGES_REQUIRED_UNSPECIFIED`, `PRIVILEGES_REQUIRED_NONE`, `PRIVILEGES_REQUIRED_LOW`, `PRIVILEGES_REQUIRED_HIGH`. |
| `scope` | string enum | — Values: `SCOPE_UNSPECIFIED`, `SCOPE_UNCHANGED`, `SCOPE_CHANGED`. |
| `userInteraction` | string enum | — Values: `USER_INTERACTION_UNSPECIFIED`, `USER_INTERACTION_NONE`, `USER_INTERACTION_REQUIRED`. |

### `Category`

- The category to which the update belongs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categoryId` | string | The identifier of the category. |
| `name` | string | The localized name of the category. |

### `CisBenchmark`

- A compliance check that is a CIS benchmark.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `profileLevel` | integer (int32) | — |
| `severity` | string enum | — Values: `SEVERITY_UNSPECIFIED`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |

### `CloudRepoSourceContext`

- A CloudRepoSourceContext denotes a particular revision in a Google Cloud Source Repo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aliasContext` | AliasContext | An alias, which may be a branch or tag. |
| `repoId` | RepoId | The ID of the repo. |
| `revisionId` | string | A revision ID. |

### `CloudStorageLocation`

- Empty placeholder to denote that this is a Google Cloud Storage export request.
- Version: v1

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

### `ComplianceNote`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cisBenchmark` | CisBenchmark | — |
| `description` | string | A description about this compliance check. |
| `impact` | string | — |
| `rationale` | string | A rationale for the existence of this compliance check. |
| `remediation` | string | A description of remediation steps if the compliance check fails. |
| `scanInstructions` | string (byte) | Serialized scan instructions with a predefined format. |
| `title` | string | The title that identifies this compliance check. |
| `version` | array<ComplianceVersion> | The OS and config versions the benchmark applies to. |

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

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig`

- ApprovalConfig describes configuration for manual approval of a build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalRequired` | boolean | Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult`

- ApprovalResult describes the decision and associated metadata of a manual approval of a build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalTime` | string (google-datetime) | Output only. The time when the approval decision was made. |
| `approverAccount` | string | Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called. |
| `comment` | string | Optional. An optional comment for this manual approval result. |
| `decision` | string enum | Required. The decision of this manual approval. Values: `DECISION_UNSPECIFIED`, `APPROVED`, `REJECTED`. |
| `url` | string | Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts`

- Artifacts produced by a build that should be uploaded upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `genericArtifacts` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGenericArtifact> | Optional. A list of generic artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. If any artifacts fail to be pushed, the build is marked FAILURE. |
| `goModules` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule> | Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE. |
| `images` | array<string> | A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE. |
| `mavenArtifacts` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact> | A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE. |
| `npmPackages` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage> | A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE. |
| `objects` | ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects | A list of objects to be uploaded to Cloud Storage upon successful completion of all build steps. Files in the workspace matching specified paths globs will be uploaded to the specified Cloud Storage location using the builder service account's credentials. The location and generation of the uploaded objects will be stored in the Build resource's results field. If any objects fail to be pushed, the build is marked FAILURE. |
| `oci` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsOci> | Optional. A list of OCI images to be uploaded to Artifact Registry upon successful completion of all build steps. OCI images in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any images fail to be pushed, the build is marked FAILURE. |
| `pythonPackages` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage> | A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects`

- Files in the workspace to upload to Cloud Storage upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix. |
| `paths` | array<string> | Path globs used to match files in the build's workspace. |
| `timing` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing all artifact objects. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGenericArtifact`

- Generic artifact to upload to Artifact Registry upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `folder` | string | Required. Path to the generic artifact in the build's workspace to be uploaded to Artifact Registry. |
| `registryPath` | string | Required. Registry path to upload the generic artifact to, in the form projects/$PROJECT/locations/$LOCATION/repositories/$REPO/packages/$PACKAGE/versions/$VERSION |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule`

- Go module to upload to Artifact Registry upon successful completion of all build steps. A module refers to all dependencies in a go.mod file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `modulePath` | string | Optional. The Go module's "module path". e.g. example.com/foo/v2 |
| `moduleVersion` | string | Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5 |
| `repositoryLocation` | string | Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location. |
| `repositoryName` | string | Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo |
| `repositoryProjectId` | string | Optional. Project ID of the Artifact Registry repository. Defaults to the build project. |
| `sourcePath` | string | Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact`

- A Maven artifact to upload to Artifact Registry upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactId` | string | Maven `artifactId` value used when uploading the artifact to Artifact Registry. |
| `deployFolder` | string | Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field. |
| `groupId` | string | Maven `groupId` value used when uploading the artifact to Artifact Registry. |
| `path` | string | Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar. |
| `repository` | string | Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix. |
| `version` | string | Maven `version` value used when uploading the artifact to Artifact Registry. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage`

- Npm package to upload to Artifact Registry upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `packagePath` | string | Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified. |
| `repository` | string | Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsOci`

- OCI image to upload to Artifact Registry upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `file` | string | Required. Path on the local file system where to find the container to upload. e.g. /workspace/my-image.tar |
| `registryPath` | string | Required. Registry path to upload the container to. e.g. us-east1-docker.pkg.dev/my-project/my-repo/my-image |
| `tags` | array<string> | Optional. Tags to apply to the uploaded image. e.g. latest, 1.0.0 |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage`

- Python package to upload to Artifact Registry upon successful completion of all build steps. A package can encapsulate multiple objects to be uploaded to a single repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `paths` | array<string> | Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file. |
| `repository` | string | Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1Build`

- A build resource in the Cloud Build API. At a high level, a `Build` describes where to find source code, how to build it (for example, the builder image to run on the source), and where to store the built artifacts. Fields can include the following variables, which will be expanded when the build is created: - $PROJECT_ID: the project ID of the build. - $PROJECT_NUMBER: the project number of the build. - $LOCATION: the location/region of the build. - $BUILD_ID: the autogenerated ID of the build. - $REPO_NAME: the source repository name specified by RepoSource. - $BRANCH_NAME: the branch name specified by RepoSource. - $TAG_NAME: the tag name specified by RepoSource. - $REVISION_ID or $COMMIT_SHA: the commit SHA specified by RepoSource or resolved from the specified branch or tag. - $SHORT_SHA: first 7 characters of $REVISION_ID or $COMMIT_SHA.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approval` | ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval | Output only. Describes this build's approval configuration, status, and result. |
| `artifacts` | ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts | Artifacts produced by the build that should be uploaded upon successful completion of all build steps. |
| `availableSecrets` | ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets | Secrets and secret environment variables. |
| `buildTriggerId` | string | Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically. |
| `createTime` | string (google-datetime) | Output only. Time at which the request to create the build was received. |
| `dependencies` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency> | Optional. Dependencies that the Cloud Build worker will fetch before executing user steps. |
| `failureInfo` | ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo | Output only. Contains information about the build when status=FAILURE. |
| `finishTime` | string (google-datetime) | Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution. |
| `gitConfig` | ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig | Optional. Configuration for git operations. |
| `id` | string | Output only. Unique identifier of the build. |
| `images` | array<string> | A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`. |
| `logUrl` | string | Output only. URL to logs for this build in Google Cloud Console. |
| `logsBucket` | string | Cloud Storage bucket where logs should be written (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`. |
| `name` | string | Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service. |
| `options` | ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions | Special options for this build. |
| `projectId` | string | Output only. ID of the project. |
| `queueTtl` | string (google-duration) | TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time. |
| `results` | ContaineranalysisGoogleDevtoolsCloudbuildV1Results | Output only. Results of the build. |
| `secrets` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret> | Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets |
| `serviceAccount` | string | IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account. |
| `source` | ContaineranalysisGoogleDevtoolsCloudbuildV1Source | Optional. The location of the source files to build. |
| `sourceProvenance` | ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance | Output only. A permanent fixed identifier for source. |
| `startTime` | string (google-datetime) | Output only. Time at which execution of the build was started. |
| `status` | string enum | Output only. Status of the build. Values: `STATUS_UNKNOWN`, `PENDING`, `QUEUED`, `WORKING`, `SUCCESS`, `FAILURE`, `INTERNAL_ERROR`, `TIMEOUT`, `CANCELLED`, `EXPIRED`. |
| `statusDetail` | string | Output only. Customer-readable message about the current status. |
| `steps` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep> | Required. The operations to be performed on the workspace. |
| `substitutions` | object | Substitutions data for `Build` resource. |
| `tags` | array<string> | Tags for annotation of a `Build`. These are not docker tags. |
| `timeout` | string (google-duration) | Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes. |
| `timing` | object | Output only. Stores timing information for phases of the build. Valid keys are: \* BUILD: time to execute all build steps. \* PUSH: time to push all artifacts including docker images and non docker artifacts. \* FETCHSOURCE: time to fetch source. \* SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included. |
| `warnings` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning> | Output only. Non-fatal problems encountered during the execution of the build. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval`

- BuildApproval describes a build's approval configuration, state, and result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `config` | ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig | Output only. Configuration for manual approval of this build. |
| `result` | ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult | Output only. Result of manual approval for this Build. |
| `state` | string enum | Output only. The state of this build's approval. Values: `STATE_UNSPECIFIED`, `PENDING`, `APPROVED`, `REJECTED`, `CANCELLED`. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo`

- A fatal problem encountered during the execution of the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detail` | string | Explains the failure issue in more detail using hard-coded text. |
| `type` | string enum | The name of the failure. Values: `FAILURE_TYPE_UNSPECIFIED`, `PUSH_FAILED`, `PUSH_IMAGE_NOT_FOUND`, `PUSH_NOT_AUTHORIZED`, `LOGGING_FAILURE`, `USER_BUILD_STEP`, `FETCH_SOURCE_FAILED`. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions`

- Optional arguments to enable specific features of builds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automapSubstitutions` | boolean | Option to include built-in and custom substitutions as env variables for all build steps. |
| `defaultLogsBucketBehavior` | string enum | Optional. Option to specify how default logs buckets are setup. Values: `DEFAULT_LOGS_BUCKET_BEHAVIOR_UNSPECIFIED`, `REGIONAL_USER_OWNED_BUCKET`, `LEGACY_BUCKET`. |
| `diskSizeGb` | string (int64) | Requested disk size for the VM that runs the build. Note that this is \*NOT\* "disk free"; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 4000GB; builds that request more than the maximum are rejected with an error. |
| `dynamicSubstitutions` | boolean | Option to specify whether or not to apply bash style string operations to the substitutions. NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file. |
| `enableStructuredLogging` | boolean | Optional. Option to specify whether structured logging is enabled. If true, JSON-formatted logs are parsed as structured logs. |
| `env` | array<string> | A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". |
| `logStreamingOption` | string enum | Option to define build log streaming behavior to Cloud Storage. Values: `STREAM_DEFAULT`, `STREAM_ON`, `STREAM_OFF`. |
| `logging` | string enum | Option to specify the logging mode, which determines if and where build logs are stored. Values: `LOGGING_UNSPECIFIED`, `LEGACY`, `GCS_ONLY`, `STACKDRIVER_ONLY`, `CLOUD_LOGGING_ONLY`, `NONE`. |
| `machineType` | string enum | Compute Engine machine type on which to run the build. Values: `UNSPECIFIED`, `N1_HIGHCPU_8`, `N1_HIGHCPU_32`, `E2_HIGHCPU_8`, `E2_HIGHCPU_32`, `E2_MEDIUM`, `E2_STANDARD_2`. |
| `pool` | ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption | Optional. Specification for execution on a `WorkerPool`. See running builds in a private pool (https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information. |
| `pubsubTopic` | string | Optional. Option to specify the Pub/Sub topic to receive build status updates. |
| `requestedVerifyOption` | string enum | Requested verifiability options. Values: `NOT_VERIFIED`, `VERIFIED`, `BEST_EFFORT`. |
| `resolvedWorkerRelease` | string | Output only. Worker release resolved from the release channel. |
| `secretEnv` | array<string> | A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build. |
| `sourceProvenanceHash` | array<string> | Requested hash for SourceProvenance. Values: `NONE`, `SHA256`, `MD5`, `GO_MODULE_H1`, `SHA512`, `DIRSUM_SHA256`. |
| `substitutionOption` | string enum | Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file. Values: `MUST_MATCH`, `ALLOW_LOOSE`. |
| `volumes` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume> | Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration. |
| `workerPool` | string | This field deprecated; please use `pool.name` instead. |
| `workerRelease` | string | Optional. Option to specify which release or release channel (rapid\|regular\|stable) to use to run this build. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption`

- Details about how a build should be executed on a `WorkerPool`. See running builds in a private pool (https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} |
| `resolvedWorkerRelease` | string | Output only. OUTPUT_ONLY. Worker release resolved from the release channel. |
| `workerRelease` | string | Output only. OUTPUT_ONLY. The release or release channel used to run the Build. This is set to the same value as `PrivatePoolV1Config.WorkerConfig.worker_release` for the UI to easily access. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1BuildResourceUsage`

- Aggregated/summary metrics over the entire build lifecycle.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `averageCpuUtilization` | number (float) | Output only. The average CPU utilization ratio across all vCPUs over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `averageMemoryUtilization` | number (float) | Output only. The average memory utilization ratio over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `peakCpuUtilization` | number (float) | Output only. The highest CPU utilization ratio across all vCPUs observed over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `peakMemoryUtilization` | number (float) | Output only. The highest memory utilization ratio observed over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `totalCpuDuration` | string (google-duration) | Output only. Total CPU execution time consumed across all cores during build execution. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep`

- A step in the build pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowExitCodes` | array<integer> | Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. |
| `allowFailure` | boolean | Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. |
| `args` | array<string> | A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. |
| `automapSubstitutions` | boolean | Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. |
| `dir` | string | Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. |
| `entrypoint` | string | Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. |
| `env` | array<string> | A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". |
| `exitCode` | integer (int32) | Output only. Return code from running the step. |
| `id` | string | Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. |
| `name` | string | Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps (https://github.com/GoogleCloudPlatform/cloud-builders (https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. |
| `pullTiming` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pulling this build step's builder image only. |
| `results` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1StepResult> | Declaration of results for this build step. |
| `script` | string | A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. |
| `secretEnv` | array<string> | A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. |
| `status` | string enum | Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. Values: `STATUS_UNKNOWN`, `PENDING`, `QUEUED`, `WORKING`, `SUCCESS`, `FAILURE`, `INTERNAL_ERROR`, `TIMEOUT`, `CANCELLED`, `EXPIRED`. |
| `timeout` | string (google-duration) | Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. |
| `timing` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for executing this build step. |
| `volumes` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume> | List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. |
| `waitFor` | array<string> | The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStepResults`

- Results for a build step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `results` | object | Results for a build step. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning`

- A non-fatal problem encountered during the execution of the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `priority` | string enum | The priority for this warning. Values: `PRIORITY_UNSPECIFIED`, `INFO`, `WARNING`, `ALERT`. |
| `text` | string | Explanation of the warning generated. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage`

- An image built by the pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `digest` | string | Docker Registry 2.0 digest. |
| `name` | string | Name used to push the container image to Google Container Registry, as presented to `docker push`. |
| `ociMediaType` | string enum | Output only. The OCI media type of the artifact. Non-OCI images, such as Docker images, will have an unspecified value. Values: `OCI_MEDIA_TYPE_UNSPECIFIED`, `IMAGE_MANIFEST`, `IMAGE_INDEX`. |
| `pushTiming` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified image. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository`

- Location of the source in a 2nd-gen Google Cloud Build repository resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dir` | string | Optional. Directory, relative to the source root, in which to run the build. |
| `repository` | string | Required. Name of the Google Cloud Build repository, formatted as `projects/*/locations/*/connections/*/repositories/*`. |
| `revision` | string | Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency`

- A dependency that the Cloud Build worker will fetch before executing user steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `empty` | boolean | If set to true disable all dependency fetching (ignoring the default source as well). |
| `genericArtifact` | ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGenericArtifactDependency | Represents a generic artifact as a build dependency. |
| `gitSource` | ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency | Represents a git repository as a build dependency. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGenericArtifactDependency`

- Represents a generic artifact as a build dependency.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destPath` | string | Required. Where the artifact files should be placed on the worker. |
| `resource` | string | Required. The location to download the artifact files from. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1 |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency`

- Represents a git repository as a build dependency.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `depth` | string (int64) | Optional. How much history should be fetched for the build (default 1, -1 for all history). |
| `destPath` | string | Required. Where should the files be placed on the worker. |
| `fetchTags` | boolean | Optional. True if remote tags should be fetched too (default false). Note: when depth is 1 (default), git fetch only retrieves tags pointing to commits within the shallow boundary. Set depth to -1 to fetch all historical tags. |
| `recurseSubmodules` | boolean | Optional. True if submodules should be fetched too (default false). |
| `repository` | ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository | Required. The kind of repo (url or dev connect). |
| `revision` | string | Required. The revision that we will fetch the repo at. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository`

- A repository for a git source.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `developerConnect` | string | The Developer Connect Git repository link formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*` |
| `url` | string | Location of the Git repository. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig`

- This config defines the location of a source through Developer Connect.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dir` | string | Required. Directory, relative to the source root, in which to run the build. |
| `gitRepositoryLink` | string | Required. The Developer Connect Git repository link, formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`. |
| `revision` | string | Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes`

- Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileHash` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash> | Collection of file hashes. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig`

- GitConfig is a configuration for git operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `http` | ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig | Configuration for HTTP related git operations. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig`

- HttpConfig is a configuration for HTTP related git operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `proxySecretVersionName` | string | SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource`

- Location of the source in any accessible Git repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dir` | string | Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. |
| `revision` | string | Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#\_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch. |
| `url` | string | Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1Hash`

- Container message for hash values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | The type of hash that was performed. Values: `NONE`, `SHA256`, `MD5`, `GO_MODULE_H1`, `SHA512`, `DIRSUM_SHA256`. |
| `value` | string (byte) | The hash value. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret`

- Pairs a set of secret environment variables mapped to encrypted values with the Cloud KMS key to use to decrypt the value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `envMap` | object | Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. |
| `kmsKeyName` | string | Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/\*/locations/\*/keyRings/\*/cryptoKeys/\* |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource`

- Location of the source in a Google Cloud Source Repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `branchName` | string | Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax |
| `commitSha` | string | Explicit commit SHA to build. |
| `dir` | string | Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. |
| `invertRegex` | boolean | Optional. Only trigger a build if the revision regex does NOT match the revision regex. |
| `projectId` | string | Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed. |
| `repoName` | string | Required. Name of the Cloud Source Repository. |
| `substitutions` | object | Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger |
| `tagName` | string | Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1Results`

- Artifacts created by the build pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactManifest` | string | Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. |
| `artifactTiming` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Time to push all non-container artifacts to Cloud Storage. |
| `buildStepImages` | array<string> | List of build step digests, in the order corresponding to build step indices. |
| `buildStepOutputs` | array<string> | List of build step outputs, produced by builder images, in the order corresponding to build step indices. Cloud Builders (https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted. |
| `buildStepResults` | object | Results for build steps. step_id -> |
| `genericArtifacts` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGenericArtifact> | Output only. Generic artifacts uploaded to Artifact Registry at the end of the build. |
| `goModules` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule> | Optional. Go module artifacts uploaded to Artifact Registry at the end of the build. |
| `images` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage> | Container images that were built as a part of the build. |
| `mavenArtifacts` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact> | Maven artifacts uploaded to Artifact Registry at the end of the build. |
| `npmPackages` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage> | Npm packages uploaded to Artifact Registry at the end of the build. |
| `numArtifacts` | string (int64) | Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. |
| `pythonPackages` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage> | Python artifacts uploaded to Artifact Registry at the end of the build. |
| `resourceUsage` | ContaineranalysisGoogleDevtoolsCloudbuildV1BuildResourceUsage | Output only. Aggregated metrics for the build. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1Secret`

- Pairs a set of secret environment variables containing encrypted values with the Cloud KMS key to use to decrypt the value. Note: Use `kmsKeyName` with `available_secrets` instead of using `kmsKeyName` with `secret`. For instructions see: https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-credentials.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Cloud KMS key name to use to decrypt these envs. |
| `secretEnv` | object | Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret`

- Pairs a secret environment variable with a SecretVersion in Secret Manager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `env` | string | Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. |
| `versionName` | string | Resource name of the SecretVersion. In format: projects/\*/secrets/\*/versions/\* |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets`

- Secrets and secret environment variables.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inline` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret> | Secrets encrypted with KMS key and the associated secret environment variable. |
| `secretManager` | array<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret> | Secrets in Secret Manager and associated secret environment variable. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1Source`

- Location of the source in a supported storage service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectedRepository` | ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository | Optional. If provided, get the source from this 2nd-gen Google Cloud Build repository resource. |
| `developerConnectConfig` | ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig | If provided, get the source from this Developer Connect config. |
| `gitSource` | ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource | If provided, get the source from this Git repository. |
| `repoSource` | ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource | If provided, get the source from this location in a Cloud Source Repository. |
| `storageSource` | ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource | If provided, get the source from this location in Cloud Storage. |
| `storageSourceManifest` | ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest | If provided, get the source from this manifest in Cloud Storage. This feature is in Preview; see description here (https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher). |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance`

- Provenance of the source. Ways to find the original source, or verify that some source was used for this build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileHashes` | object | Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file. |
| `resolvedConnectedRepository` | ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository | Output only. A copy of the build's `source.connected_repository`, if exists, with any revisions resolved. |
| `resolvedGitSource` | ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource | Output only. A copy of the build's `source.git_source`, if exists, with any revisions resolved. |
| `resolvedRepoSource` | ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource | A copy of the build's `source.repo_source`, if exists, with any revisions resolved. |
| `resolvedStorageSource` | ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource | A copy of the build's `source.storage_source`, if exists, with any generations resolved. |
| `resolvedStorageSourceManifest` | ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest | A copy of the build's `source.storage_source_manifest`, if exists, with any revisions resolved. This feature is in Preview. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1StepResult`

- StepResult is the declaration of a result for a build step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestationContent` | string | Optional. The content of the attestation to be generated. |
| `attestationType` | string | Optional. The type of attestation to be generated. |
| `name` | string | Required. The name of the result. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource`

- Location of the source in an archive file in Cloud Storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Cloud Storage bucket containing the source (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). |
| `generation` | string (int64) | Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. |
| `object` | string | Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build. |
| `sourceFetcher` | string enum | Optional. Option to specify the tool to fetch the source file for the build. Values: `SOURCE_FETCHER_UNSPECIFIED`, `GSUTIL`, `GCS_FETCHER`. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest`

- Location of the source manifest in Cloud Storage. This feature is in Preview; see description here (https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. Cloud Storage bucket containing the source manifest (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). |
| `generation` | string (int64) | Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. |
| `object` | string | Required. Cloud Storage object containing the source manifest. This object must be a JSON file. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan`

- Start and end times for a build execution phase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | End of time span. |
| `startTime` | string (google-datetime) | Start of time span. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGenericArtifact`

- A generic artifact uploaded to Artifact Registry using the GenericArtifact directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactFingerprint` | ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes | Output only. The hash of the whole artifact. |
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | object | Output only. The file hashes that make up the generic artifact. |
| `pushTiming` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | Output only. URI of the uploaded artifact. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1 |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule`

- A Go module artifact uploaded to Artifact Registry using the GoModule directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes | Hash types and values of the Go Module Artifact. |
| `pushTiming` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded artifact. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact`

- A Maven artifact uploaded using the MavenArtifact directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes | Hash types and values of the Maven Artifact. |
| `pushTiming` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded artifact. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage`

- An npm package uploaded to Artifact Registry using the NpmPackage directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes | Hash types and values of the npm package. |
| `pushTiming` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded npm package. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage`

- Artifact uploaded using the PythonPackage directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes | Hash types and values of the Python Artifact. |
| `pushTiming` | ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded artifact. |

### `ContaineranalysisGoogleDevtoolsCloudbuildV1Volume`

- Volume describes a Docker container volume which is mounted into build steps in order to persist files across build step execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. |
| `path` | string | Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. |

### `CreateOperationRequest`

- Request for creating an operation
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | The operation to create. |
| `operationId` | string | The ID to use for this operation. |

### `DSSEAttestationNote`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hint` | DSSEHint | DSSEHint hints at the purpose of the attestation authority. |

### `DSSEAttestationOccurrence`

- Deprecated. Prefer to use a regular Occurrence, and populate the Envelope at the top level of the Occurrence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `envelope` | Envelope | If doing something security critical, make sure to verify the signatures in this metadata. |
| `statement` | InTotoStatement | — |

### `DSSEHint`

- This submessage provides human-readable hints about the purpose of the authority. Because the name of a note acts as its resource reference, it is important to disambiguate the canonical name of the Note (which might be a UUID for security purposes) from "readable" names more suitable for debug output. Note that these hints should not be used to look up authorities in security sensitive contexts, such as when looking up attestations to verify.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `humanReadableName` | string | Required. The human readable name of this attestation authority, for example "cloudbuild-prod". |

### `Deployable`

- An artifact that can be deployed in some runtime.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `resourceUri` | array<string> | Required. Resource URI for the artifact being deployed. |

### `Deployment`

- The period during which some deployable was active in a runtime.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `address` | string | Address of the runtime element hosting this deployment. |
| `config` | string | Configuration used to create this deployment. |
| `deployTime` | string (google-datetime) | Required. Beginning of the lifetime of this deployment. |
| `platform` | string enum | Platform hosting this deployment. Values: `PLATFORM_UNSPECIFIED`, `GKE`, `FLEX`, `CUSTOM`. |
| `resourceUri` | array<string> | Output only. Resource URI for the artifact being deployed taken from the deployable field with the same name. |
| `undeployTime` | string (google-datetime) | End of the lifetime of this deployment. |
| `userEmail` | string | Identity of the user that triggered this deployment. |

### `DeploymentNote`

- An artifact that can be deployed in some runtime.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceUri` | array<string> | Required. Resource URI for the artifact being deployed. |

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

### `Derived`

- Derived describes the derived image portion (Occurrence) of the DockerImage relationship. This image would be produced from a Dockerfile with FROM .
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `baseResourceUrl` | string | Output only. This contains the base image URL for the derived image occurrence. |
| `distance` | integer (int32) | Output only. The number of layers by which this image differs from the associated image basis. |
| `fingerprint` | Fingerprint | Required. The fingerprint of the derived image. |
| `layerInfo` | array<Layer> | This contains layer-specific metadata, if populated it has length "distance" and is ordered with \[distance\] being the layer immediately following the base image and \[1\] being the final layer. |

### `Derived` (v1alpha1)

- Derived describes the derived image portion (Occurrence) of the DockerImage relationship. This image would be produced from a Dockerfile with FROM .
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `baseResourceUrl` | string | Output only. This contains the base image URL for the derived image occurrence. |
| `distance` | integer (uint32) | Output only. The number of layers by which this image differs from the associated image basis. |
| `fingerprint` | Fingerprint | The fingerprint of the derived image. |
| `layerInfo` | array<Layer> | This contains layer-specific metadata, if populated it has length "distance" and is ordered with \[distance\] being the layer immediately following the base image and \[1\] being the final layer. |

### `Detail`

- A detail for a distro and package affected by this vulnerability and its associated fix (if one is available).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `affectedCpeUri` | string | Required. The CPE URI (https://cpe.mitre.org/specification/) this vulnerability affects. |
| `affectedPackage` | string | Required. The package this vulnerability affects. |
| `affectedVersionEnd` | Version | The version number at the end of an interval in which this vulnerability exists. A vulnerability can affect a package between version numbers that are disjoint sets of intervals (example: \[1.0.0-1.1.0\], \[2.4.6-2.4.8\] and \[4.5.6-4.6.8\]) each of which will be represented in its own Detail. If a specific affected version is provided by a vulnerability database, affected_version_start and affected_version_end will be the same in that Detail. |
| `affectedVersionStart` | Version | The version number at the start of an interval in which this vulnerability exists. A vulnerability can affect a package between version numbers that are disjoint sets of intervals (example: \[1.0.0-1.1.0\], \[2.4.6-2.4.8\] and \[4.5.6-4.6.8\]) each of which will be represented in its own Detail. If a specific affected version is provided by a vulnerability database, affected_version_start and affected_version_end will be the same in that Detail. |
| `description` | string | A vendor-specific description of this vulnerability. |
| `fixedCpeUri` | string | The distro recommended CPE URI (https://cpe.mitre.org/specification/) to update to that contains a fix for this vulnerability. It is possible for this to be different from the affected_cpe_uri. |
| `fixedPackage` | string | The distro recommended package to update to that contains a fix for this vulnerability. It is possible for this to be different from the affected_package. |
| `fixedVersion` | Version | The distro recommended version to update to that contains a fix for this vulnerability. Setting this to VersionKind.MAXIMUM means no such version is yet available. |
| `isObsolete` | boolean | Whether this detail is obsolete. Occurrences are expected not to point to obsolete details. |
| `packageType` | string | The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). |
| `severityName` | string | The distro assigned severity of this vulnerability. |
| `source` | string | The source from which the information in this Detail was obtained. |
| `sourceUpdateTime` | string (google-datetime) | The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker. |
| `vendor` | string | The name of the vendor of the product. |

### `Detail` (v1alpha1)

- Identifies all occurrences of this vulnerability in the package for a specific distro/location For example: glibc in cpe:/o:debian:debian_linux:8 for versions 2.1 - 2.2
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `cpeUri` | string | The cpe_uri in \[cpe format\] (https://cpe.mitre.org/specification/) in which the vulnerability manifests. Examples include distro or storage location for vulnerable jar. This field can be used as a filter in list requests. |
| `description` | string | A vendor-specific description of this note. |
| `fixedLocation` | VulnerabilityLocation | The fix for this specific package version. |
| `isObsolete` | boolean | Whether this Detail is obsolete. Occurrences are expected not to point to obsolete details. |
| `maxAffectedVersion` | Version | The max version of the package in which the vulnerability exists. |
| `minAffectedVersion` | Version | The min version of the package in which the vulnerability exists. |
| `package` | string | The name of the package where the vulnerability was found. This field can be used as a filter in list requests. |
| `packageType` | string | The type of package; whether native or non native(ruby gems, node.js packages etc) |
| `severityName` | string | The severity (eg: distro assigned severity) for this vulnerability. |
| `source` | string | The source from which the information in this Detail was obtained. |
| `vendor` | string | The vendor of the product. e.g. "google" |

### `Detail` (v1beta1)

- Identifies all appearances of this vulnerability in the package for a specific distro/location. For example: glibc in cpe:/o:debian:debian_linux:8 for versions 2.1 - 2.2
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cpeUri` | string | Required. The CPE URI in cpe format (https://cpe.mitre.org/specification/) in which the vulnerability manifests. Examples include distro or storage location for vulnerable jar. |
| `description` | string | A vendor-specific description of this note. |
| `fixedLocation` | VulnerabilityLocation | The fix for this specific package version. |
| `isObsolete` | boolean | Whether this detail is obsolete. Occurrences are expected not to point to obsolete details. |
| `maxAffectedVersion` | Version | The max version of the package in which the vulnerability exists. |
| `minAffectedVersion` | Version | The min version of the package in which the vulnerability exists. |
| `package` | string | Required. The name of the package where the vulnerability was found. |
| `packageType` | string | The type of package; whether native or non native(ruby gems, node.js packages etc). |
| `severityName` | string | The severity (eg: distro assigned severity) for this vulnerability. |
| `source` | string | The source from which the information in this Detail was obtained. |
| `sourceUpdateTime` | string (google-datetime) | The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker. |
| `vendor` | string | The name of the vendor of the product. |

### `Details`

- Details of an attestation occurrence.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `attestation` | Attestation | Required. Attestation for the resource. |

### `Digest`

- Digest information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algo` | string | `SHA1`, `SHA512` etc. |
| `digestBytes` | string (byte) | Value of the digest. |

### `Discovered`

- Provides information about the analysis status of a discovered resource.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `analysisCompleted` | AnalysisCompleted | — |
| `analysisError` | array<Status> | Indicates any errors encountered during analysis of a resource. There could be 0 or more of these errors. |
| `analysisStatus` | string enum | The status of discovery for the resource. Values: `ANALYSIS_STATUS_UNSPECIFIED`, `PENDING`, `SCANNING`, `FINISHED_SUCCESS`, `COMPLETE`, `FINISHED_FAILED`, `FINISHED_UNSUPPORTED`. |
| `analysisStatusError` | Status | When an error is encountered this will contain a LocalizedMessage under details to show to the user. The LocalizedMessage is output only and populated by the API. |
| `continuousAnalysis` | string enum | Whether the resource is continuously analyzed. Values: `CONTINUOUS_ANALYSIS_UNSPECIFIED`, `ACTIVE`, `INACTIVE`. |
| `files` | array<File> | Files that make up the resource described by the occurrence. |
| `lastAnalysisTime` | string (google-datetime) | The last time continuous analysis was done for this resource. Deprecated, do not use. |
| `lastScanTime` | string (google-datetime) | The last time this resource was scanned. |
| `lastVulnerabilityUpdateTime` | string (google-datetime) | The last time vulnerability scan results changed. |
| `sbomStatus` | SBOMStatus | The status of an SBOM generation. |

### `Discovered` (v1alpha1)

- Provides information about the scan status of a discovered resource.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `analysisCompleted` | AnalysisCompleted | The list of analysis that were completed for a resource. |
| `analysisError` | array<Status> | Indicates any errors encountered during analysis of a resource. There could be 0 or more of these errors. |
| `analysisStatus` | string enum | The status of discovery for the resource. Values: `ANALYSIS_STATUS_UNSPECIFIED`, `PENDING`, `SCANNING`, `COMPLETE`, `FINISHED_SUCCESS`, `FINISHED_FAILED`, `FINISHED_UNSUPPORTED`. |
| `analysisStatusError` | Status | When an error is encountered this will contain a LocalizedMessage under details to show to the user. The LocalizedMessage output only and populated by the API. |
| `archiveTime` | string (google-datetime) | The time occurrences related to this discovery occurrence were archived. |
| `continuousAnalysis` | string enum | Whether the resource is continuously analyzed. Values: `CONTINUOUS_ANALYSIS_UNSPECIFIED`, `ACTIVE`, `INACTIVE`. |
| `cpe` | string | The CPE of the resource being scanned. |
| `files` | array<File> | Optional. Files that make up the resource described by the occurrence. |
| `lastScanTime` | string (google-datetime) | The last time this resource was scanned. |
| `lastVulnerabilityUpdateTime` | string (google-datetime) | Optional. The last time vulnerability scan results changed. |
| `operation` | Operation | Output only. An operation that indicates the status of the current scan. This field is deprecated, do not use. |
| `sbomStatus` | SBOMStatus | Output only. The status of an SBOM generation. |
| `vulnerabilityAttestation` | VulnerabilityAttestation | Output only. The status of a vulnerability attestation generation. |

### `Discovery`

- A note that indicates a type of analysis a provider would perform. This note exists in a provider's project. A `Discovery` occurrence is created in a consumer's project at the start of analysis.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `analysisKind` | string enum | Required. Immutable. The kind of analysis that is handled by this discovery. Values: `NOTE_KIND_UNSPECIFIED`, `VULNERABILITY`, `BUILD`, `IMAGE`, `PACKAGE`, `DEPLOYMENT`, `DISCOVERY`, `ATTESTATION`, `INTOTO`, `SBOM`, `SPDX_PACKAGE`, `SPDX_FILE`, `SPDX_RELATIONSHIP`, `VULNERABILITY_ASSESSMENT`, `SBOM_REFERENCE`, `SECRET`, `AI_SKILL_ANALYSIS`. |

### `DiscoveryNote`

- A note that indicates a type of analysis a provider would perform. This note exists in a provider's project. A `Discovery` occurrence is created in a consumer's project at the start of analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisKind` | string enum | Required. Immutable. The kind of analysis that is handled by this discovery. Values: `NOTE_KIND_UNSPECIFIED`, `VULNERABILITY`, `BUILD`, `IMAGE`, `PACKAGE`, `DEPLOYMENT`, `DISCOVERY`, `ATTESTATION`, `UPGRADE`, `COMPLIANCE`, `DSSE_ATTESTATION`, `VULNERABILITY_ASSESSMENT`, `SBOM_REFERENCE`, `SECRET`, `AI_SKILL_ANALYSIS`. |

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

### `Distribution`

- This represents a particular channel of distribution for a given package. E.g., Debian's jessie-backports dpkg mirror.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | The CPU architecture for which packages in this distribution channel were built. Values: `ARCHITECTURE_UNSPECIFIED`, `X86`, `X64`. |
| `cpeUri` | string | Required. The cpe_uri in CPE format (https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. |
| `description` | string | The distribution channel-specific description of this package. |
| `latestVersion` | Version | The latest available version of this package in this distribution channel. |
| `maintainer` | string | A freeform string denoting the maintainer of this package. |
| `url` | string | The distribution channel-specific homepage for this package. |

### `DocumentNote`

- DocumentNote represents an SPDX Document Creation Information section: https://spdx.github.io/spdx-spec/2-document-creation-information/
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `dataLicence` | string | Compliance with the SPDX specification includes populating the SPDX fields therein with data related to such fields ("SPDX-Metadata") |
| `spdxVersion` | string | Provide a reference number that can be used to understand how to parse and interpret the rest of the file |

### `DocumentOccurrence`

- DocumentOccurrence represents an SPDX Document Creation Information section: https://spdx.github.io/spdx-spec/2-document-creation-information/
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Identify when the SPDX file was originally created. The date is to be specified according to combined date and time in UTC format as specified in ISO 8601 standard |
| `creatorComment` | string | A field for creators of the SPDX file to provide general comments about the creation of the SPDX file or any other relevant comment not included in the other fields |
| `creators` | array<string> | Identify who (or what, in the case of a tool) created the SPDX file. If the SPDX file was created by an individual, indicate the person's name |
| `documentComment` | string | A field for creators of the SPDX file content to provide comments to the consumers of the SPDX document |
| `externalDocumentRefs` | array<string> | Identify any external SPDX documents referenced within this SPDX document |
| `id` | string | Identify the current SPDX document which may be referenced in relationships by other files, packages internally and documents externally |
| `licenseListVersion` | string | A field for creators of the SPDX file to provide the version of the SPDX License List used when the SPDX file was created |
| `namespace` | string | Provide an SPDX document specific namespace as a unique absolute Uniform Resource Identifier (URI) as specified in RFC-3986, with the exception of the ‘#’ delimiter |
| `title` | string | Identify name of this document as designated by creator |

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

### `Environment`

- Defines an object for the environment field in in-toto links. The suggested fields are "variables", "filesystem", and "workdir".
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customValues` | object | — |

### `ExploitPredictionScoringSystem`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `percentile` | number (double) | The percentile of the current score, the proportion of all scored vulnerabilities with the same or a lower EPSS score |
| `score` | number (double) | The EPSS score representing the probability \[0-1\] of exploitation in the wild in the next 30 days |

### `ExportSBOMRequest`

- The request to generate and export SBOM. Target must be specified for the request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudStorageLocation` | CloudStorageLocation | Optional. Empty placeholder to denote that this is a Google Cloud Storage export request. |

### `ExportSBOMRequest` (v1beta1)

- The request to a call of ExportSBOM
- Version: v1beta1

### `ExportSBOMResponse`

- The response from a call to ExportSBOM.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `discoveryOccurrence` | string | The name of the discovery occurrence in the form "projects/{project_id}/occurrences/{OCCURRENCE_ID} It can be used to track the progress of the SBOM export. |

### `ExportSBOMResponse` (v1beta1)

- The response from a call to ExportSBOM
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `discoveryOccurrenceId` | string | The name of the discovery occurrence in the form "projects/{project_id}/occurrences/{OCCURRENCE_ID} It can be used to track the progression of the SBOM export. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExternalRef`

- An External Reference allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `category` | string enum | An External Reference allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package Values: `CATEGORY_UNSPECIFIED`, `SECURITY`, `PACKAGE_MANAGER`, `PERSISTENT_ID`, `OTHER`. |
| `comment` | string | Human-readable information about the purpose and target of the reference |
| `locator` | string | The unique string with no spaces necessary to access the package-specific information, metadata, or content within the target location |
| `type` | string | Type of category (e.g. 'npm' for the PACKAGE_MANAGER category) |

### `File`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `digest` | object | — |
| `name` | string | — |

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

- Generated from the Discovery document(s) v1, v1beta1, v1alpha1 of `containeranalysis` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://containeranalysis.googleapis.com/$discovery/rest?version=v1, https://containeranalysis.googleapis.com/$discovery/rest?version=v1beta1, https://containeranalysis.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
