---
source: https://binaryauthorization.googleapis.com/$discovery/rest?version=v1
---

# Binary Authorization API message schemas (binaryauthorization)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/binaryauthorization/`.

### `AdmissionRule`

- An admission rule specifies either that all container images used in a pod creation request must be attested to by one or more attestors, that all pod creations will be allowed, or that all pod creations will be denied. Images matching an admission allowlist pattern are exempted from admission rules and will never block a pod creation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enforcementMode` | string enum | Required. The action when a pod creation is denied by the admission rule. Values: `ENFORCEMENT_MODE_UNSPECIFIED`, `ENFORCED_BLOCK_AND_AUDIT_LOG`, `DRYRUN_AUDIT_LOG_ONLY`. |
| `evaluationMode` | string enum | Required. How this admission rule will be evaluated. Values: `EVALUATION_MODE_UNSPECIFIED`, `ALWAYS_ALLOW`, `REQUIRE_ATTESTATION`, `ALWAYS_DENY`. |
| `requireAttestationsBy` | array<string> | Optional. The resource names of the attestors that must attest to a container image, in the format `projects/*/attestors/*`. Each attestor must exist before a policy can reference it. To add an attestor to a policy the principal issuing the policy change request must be able to read the attestor resource. Note: this field must be non-empty when the `evaluation_mode` field specifies `REQUIRE_ATTESTATION`, otherwise it must be empty. |

### `AdmissionWhitelistPattern`

- An admission allowlist pattern exempts images from checks by admission rules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `namePattern` | string | An image name pattern to allowlist, in the form `registry/path/to/image`. This supports a trailing `*` wildcard, but this is allowed only in text after the `registry/` part. This also supports a trailing `**` wildcard which matches subdirectories of a given entry. |

### `AllowlistResult`

- Result of evaluating an image name allowlist.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `matchedPattern` | string | The allowlist pattern that the image matched. |

### `AttestationAuthenticator`

- An attestation authenticator that will be used to verify attestations. Typically this is just a set of public keys. Conceptually, an authenticator can be treated as always returning either "authenticated" or "not authenticated" when presented with a signed attestation (almost always assumed to be a DSSE (https://github.com/secure-systems-lab/dsse) attestation). The details of how an authenticator makes this decision are specific to the type of 'authenticator' that this message wraps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Optional. A user-provided name for this `AttestationAuthenticator`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results. |
| `pkixPublicKeySet` | PkixPublicKeySet | Optional. A set of raw PKIX SubjectPublicKeyInfo format public keys. If any public key in the set validates the attestation signature, then the signature is considered authenticated (i.e. any one key is sufficient to authenticate). |

### `AttestationOccurrence`

- Occurrence that represents a single "attestation". The authenticity of an attestation can be verified using the attached signature. If the verifier trusts the public key of the signer, then verifying the signature is sufficient to establish trust. In this circumstance, the authority to which this attestation is attached is primarily useful for lookup (how to find this attestation if you already know the authority and artifact to be verified) and intent (for which authority this attestation was intended to sign.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jwts` | array<Jwt> | One or more JWTs encoding a self-contained attestation. Each JWT encodes the payload that it verifies within the JWT itself. Verifier implementation SHOULD ignore the `serialized_payload` field when verifying these JWTs. If only JWTs are present on this AttestationOccurrence, then the `serialized_payload` SHOULD be left empty. Each JWT SHOULD encode a claim specific to the `resource_uri` of this Occurrence, but this is not validated by Grafeas metadata API implementations. The JWT itself is opaque to Grafeas. |
| `serializedPayload` | string (byte) | Required. The serialized payload that is verified by one or more `signatures`. |
| `signatures` | array<Signature> | One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification. |

### `AttestationSource`

- Specifies the locations for fetching the provenance attestations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containerAnalysisAttestationProjects` | array<string> | The IDs of the Google Cloud projects that store the SLSA attestations as Container Analysis Occurrences, in the format `projects/[PROJECT_ID]`. Maximum number of `container_analysis_attestation_projects` allowed in each `AttestationSource` is 10. |

### `Attestor`

- An attestor that attests to container image artifacts. An existing attestor cannot be modified except where indicated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. A descriptive comment. This field may be updated. The field may be displayed in chooser dialogs. |
| `etag` | string | Optional. A checksum, returned by the server, that can be sent on update requests to ensure the attestor has an up-to-date value before attempting to update it. See https://google.aip.dev/154. |
| `name` | string | Required. The resource name, in the format: `projects/*/attestors/*`. This field may not be updated. |
| `updateTime` | string (google-datetime) | Output only. Time when the attestor was last updated. |
| `userOwnedGrafeasNote` | UserOwnedGrafeasNote | This specifies how an attestation will be read, and how it will be used during policy enforcement. |

### `Attestor` (v1beta1)

- An attestor that attests to container image artifacts. An existing attestor cannot be modified except where indicated.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. A descriptive comment. This field may be updated. The field may be displayed in chooser dialogs. |
| `etag` | string | Optional. A checksum, returned by the server, that can be sent on update requests to ensure the attestor has an up-to-date value before attempting to update it. See https://google.aip.dev/154. |
| `name` | string | Required. The resource name, in the format: `projects/*/attestors/*`. This field may not be updated. |
| `updateTime` | string (google-datetime) | Output only. Time when the attestor was last updated. |
| `userOwnedDrydockNote` | UserOwnedDrydockNote | A Drydock ATTESTATION_AUTHORITY Note, created by the user. |

### `AttestorPublicKey`

- An attestor public key that will be used to verify attestations signed by this attestor.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asciiArmoredPgpPublicKey` | string | ASCII-armored representation of a PGP public key, as the entire output by the command `gpg --export --armor foo@example.com` (either LF or CRLF line endings). When using this field, `id` should be left blank. The Binary Authorization API handlers will calculate the ID and fill it in automatically. Binary Authorization computes this ID as the OpenPGP RFC4880 V4 fingerprint, represented as upper-case hex. If `id` is provided by the caller, it will be overwritten by the API-calculated ID. |
| `comment` | string | Optional. A descriptive comment. This field may be updated. |
| `id` | string | The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them, and that ID must match the contents of this field exactly. Additional restrictions on this field can be imposed based on which public key type is encapsulated. See the documentation on `public_key` cases below for details. |
| `pkixPublicKey` | PkixPublicKey | A raw PKIX SubjectPublicKeyInfo format public key. NOTE: `id` may be explicitly provided by the caller when using this type of public key, but it MUST be a valid RFC3986 URI. If `id` is left blank, a default one will be computed based on the digest of the DER encoding of the public key. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `Check`

- A single check to perform against a Pod. Checks are grouped into `CheckSet` objects, which are defined by the top-level policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alwaysDeny` | boolean | Optional. A special-case check that always denies. Note that this still only applies when the scope of the `CheckSet` applies and the image isn't exempted by an image allowlist. This check is primarily useful for testing, or to set the default behavior for all unmatched scopes to "deny". |
| `displayName` | string | Optional. A user-provided name for this check. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results. |
| `imageAllowlist` | ImageAllowlist | Optional. Images exempted from this check. If any of the patterns match the image url, the check will not be evaluated. |
| `imageFreshnessCheck` | ImageFreshnessCheck | Optional. Require that an image is no older than a configured expiration time. Image age is determined by its upload time. |
| `sigstoreSignatureCheck` | SigstoreSignatureCheck | Optional. Require that an image was signed by Cosign with a trusted key. This check requires that both the image and signature are stored in Artifact Registry. |
| `simpleSigningAttestationCheck` | SimpleSigningAttestationCheck | Optional. Require a SimpleSigning-type attestation for every image in the deployment. |
| `slsaCheck` | SlsaCheck | Optional. Require that an image was built by a trusted builder (such as Google Cloud Build), meets requirements for Supply chain Levels for Software Artifacts (SLSA), and was built from a trusted source code repostitory. |
| `trustedDirectoryCheck` | TrustedDirectoryCheck | Optional. Require that an image lives in a trusted directory. |
| `vulnerabilityCheck` | VulnerabilityCheck | Optional. Require that an image does not contain vulnerabilities that violate the configured rules, such as based on severity levels. |

### `CheckResult`

- Result of evaluating one check.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowlistResult` | AllowlistResult | If the image was exempted by an allow_pattern in the check, contains the pattern that the image name matched. |
| `displayName` | string | The name of the check. |
| `evaluationResult` | EvaluationResult | If a check was evaluated, contains the result of the check. |
| `explanation` | string | Explanation of this check result. |
| `index` | string (int64) | The index of the check. |
| `type` | string | The type of the check. |

### `CheckResults`

- Result of evaluating one or more checks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `results` | array<CheckResult> | Per-check details. |

### `CheckSet`

- A conjunction of policy checks, scoped to a particular namespace or Kubernetes service account. In order for evaluation of a `CheckSet` to return "allowed" for a given image in a given Pod, one of the following conditions must be satisfied: \* The image is explicitly exempted by an entry in `image_allowlist`, OR \* ALL of the `checks` evaluate to "allowed".
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checks` | array<Check> | Optional. The checks to apply. The ultimate result of evaluating the check set will be "allow" if and only if every check in `checks` evaluates to "allow". If `checks` is empty, the default behavior is "always allow". |
| `displayName` | string | Optional. A user-provided name for this `CheckSet`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results. |
| `imageAllowlist` | ImageAllowlist | Optional. Images exempted from this `CheckSet`. If any of the patterns match the image being evaluated, no checks in the `CheckSet` will be evaluated. |
| `scope` | Scope | Optional. The scope to which this `CheckSet` applies. If unset or an empty string (the default), applies to all namespaces and service accounts. See the `Scope` message documentation for details on scoping rules. |

### `CheckSetResult`

- Result of evaluating one check set.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowlistResult` | AllowlistResult | If the image was exempted by an allow_pattern in the check set, contains the pattern that the image name matched. |
| `checkResults` | CheckResults | If checks were evaluated, contains the results of evaluating each check. |
| `displayName` | string | The name of the check set. |
| `explanation` | string | Explanation of this check set result. Only populated if no checks were evaluated. |
| `index` | string (int64) | The index of the check set. |
| `scope` | Scope | The scope of the check set. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EvaluateGkePolicyRequest`

- Request message for PlatformPolicyEvaluationService.EvaluateGkePolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resource` | object | Required. JSON or YAML blob representing a Kubernetes resource. |

### `EvaluateGkePolicyResponse`

- Response message for PlatformPolicyEvaluationService.EvaluateGkePolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `results` | array<PodResult> | Evaluation result for each Pod contained in the request. |
| `verdict` | string enum | The result of evaluating all Pods in the request. Values: `VERDICT_UNSPECIFIED`, `CONFORMANT`, `NON_CONFORMANT`, `ERROR`. |

### `EvaluationResult`

- Result of evaluating one check.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `verdict` | string enum | The result of evaluating this check. Values: `CHECK_VERDICT_UNSPECIFIED`, `CONFORMANT`, `NON_CONFORMANT`, `ERROR`. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `GkePolicy`

- A Binary Authorization policy for a GKE cluster. This is one type of policy that can occur as a `PlatformPolicy`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkSets` | array<CheckSet> | Optional. The `CheckSet` objects to apply, scoped by namespace or namespace and service account. Exactly one `CheckSet` will be evaluated for a given Pod (unless the list is empty, in which case the behavior is "always allow"). If multiple `CheckSet` objects have scopes that match the namespace and service account of the Pod being evaluated, only the `CheckSet` with the MOST SPECIFIC scope will match. `CheckSet` objects must be listed in order of decreasing specificity, i.e. if a scope matches a given service account (which must include the namespace), it must come before a `CheckSet` with a scope matching just that namespace. This property is enforced by server-side validation. The purpose of this restriction is to ensure that if more than one `CheckSet` matches a given Pod, the `CheckSet` that will be evaluated will always be the first in the list to match (because if any other matches, it must be less specific). If `check_sets` is empty, the default behavior is to allow all images. If `check_sets` is non-empty, the last `check_sets` entry must always be a `CheckSet` with no scope set, i.e. a catchall to handle any situation not caught by the preceding `CheckSet` objects. |
| `imageAllowlist` | ImageAllowlist | Optional. Images exempted from this policy. If any of the patterns match the image being evaluated, the rest of the policy will not be evaluated. |

### `IamPolicy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `ImageAllowlist`

- Images that are exempted from normal checks based on name pattern only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowPattern` | array<string> | Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist. |

### `ImageFreshnessCheck`

- An image freshness check, which rejects images that were uploaded before the set number of days ago to the supported repositories.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxUploadAgeDays` | integer (int32) | Required. The max number of days that is allowed since the image was uploaded. Must be greater than zero. |

### `ImageResult`

- Result of evaluating one image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowlistResult` | AllowlistResult | If the image was exempted by a top-level allow_pattern, contains the allowlist pattern that the image name matched. |
| `checkSetResult` | CheckSetResult | If a check set was evaluated, contains the result of the check set. Empty if there were no check sets. |
| `explanation` | string | Explanation of this image result. Only populated if no check sets were evaluated. |
| `imageUri` | string | Image URI from the request. |
| `verdict` | string enum | The result of evaluating this image. Values: `IMAGE_VERDICT_UNSPECIFIED`, `CONFORMANT`, `NON_CONFORMANT`, `ERROR`. |

### `Jwt`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compactJwt` | string | The compact encoding of a JWS, which is always three base64 encoded strings joined by periods. For details, see: https://tools.ietf.org/html/rfc7515.html#section-3.1 |

### `ListAttestorsResponse`

- Response message for BinauthzManagementServiceV1.ListAttestors.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestors` | array<Attestor> | The list of attestors. |
| `nextPageToken` | string | A token to retrieve the next page of results. Pass this value in the ListAttestorsRequest.page_token field in the subsequent call to the `ListAttestors` method to retrieve the next page of results. |

### `ListPlatformPoliciesResponse`

- Response message for PlatformPolicyManagementService.ListPlatformPolicies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. Pass this value in the ListPlatformPoliciesRequest.page_token field in the subsequent call to the `ListPlatformPolicies` method to retrieve the next page of results. |
| `platformPolicies` | array<PlatformPolicy> | The list of platform policies. |

### `PkixPublicKey`

- A public key in the PkixPublicKey format (https://tools.ietf.org/html/rfc5280#section-4.1.2.7). Public keys of this type are typically textually encoded using the PEM format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | Optional. The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them. The ID must match exactly contents of the `key_id` field exactly. The ID may be explicitly provided by the caller, but it MUST be a valid RFC3986 URI. If `key_id` is left blank and this `PkixPublicKey` is not used in the context of a wrapper (see next paragraph), a default key ID will be computed based on the digest of the DER encoding of the public key. If this `PkixPublicKey` is used in the context of a wrapper that has its own notion of key ID (e.g. `AttestorPublicKey`), then this field can either match that value exactly, or be left blank, in which case it behaves exactly as though it is equal to that wrapper value. |
| `publicKeyPem` | string | A PEM-encoded public key, as described in https://tools.ietf.org/html/rfc7468#section-13 |
| `signatureAlgorithm` | string enum | The signature algorithm used to verify a message against a signature using this key. These signature algorithm must match the structure and any object identifiers encoded in `public_key_pem` (i.e. this algorithm must match that of the public key). Values: `SIGNATURE_ALGORITHM_UNSPECIFIED`, `RSA_PSS_2048_SHA256`, `RSA_SIGN_PSS_2048_SHA256`, `RSA_PSS_3072_SHA256`, `RSA_SIGN_PSS_3072_SHA256`, `RSA_PSS_4096_SHA256`, `RSA_SIGN_PSS_4096_SHA256`, `RSA_PSS_4096_SHA512`, `RSA_SIGN_PSS_4096_SHA512`, `RSA_SIGN_PKCS1_2048_SHA256`, `RSA_SIGN_PKCS1_3072_SHA256`, `RSA_SIGN_PKCS1_4096_SHA256`, `RSA_SIGN_PKCS1_4096_SHA512`, `ECDSA_P256_SHA256`, `EC_SIGN_P256_SHA256`, `ECDSA_P384_SHA384`, `EC_SIGN_P384_SHA384`, `ECDSA_P521_SHA512`, `EC_SIGN_P521_SHA512`, `ML_DSA_65`. |

### `PkixPublicKey` (v1beta1)

- A public key in the PkixPublicKey format (see https://tools.ietf.org/html/rfc5280#section-4.1.2.7 for details). Public keys of this type are typically textually encoded using the PEM format.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `publicKeyPem` | string | A PEM-encoded public key, as described in https://tools.ietf.org/html/rfc7468#section-13 |
| `signatureAlgorithm` | string enum | The signature algorithm used to verify a message against a signature using this key. These signature algorithm must match the structure and any object identifiers encoded in `public_key_pem` (i.e. this algorithm must match that of the public key). Values: `SIGNATURE_ALGORITHM_UNSPECIFIED`, `RSA_PSS_2048_SHA256`, `RSA_SIGN_PSS_2048_SHA256`, `RSA_PSS_3072_SHA256`, `RSA_SIGN_PSS_3072_SHA256`, `RSA_PSS_4096_SHA256`, `RSA_SIGN_PSS_4096_SHA256`, `RSA_PSS_4096_SHA512`, `RSA_SIGN_PSS_4096_SHA512`, `RSA_SIGN_PKCS1_2048_SHA256`, `RSA_SIGN_PKCS1_3072_SHA256`, `RSA_SIGN_PKCS1_4096_SHA256`, `RSA_SIGN_PKCS1_4096_SHA512`, `ECDSA_P256_SHA256`, `EC_SIGN_P256_SHA256`, `ECDSA_P384_SHA384`, `EC_SIGN_P384_SHA384`, `ECDSA_P521_SHA512`, `EC_SIGN_P521_SHA512`, `ML_DSA_65`. |

### `PkixPublicKeySet`

- A bundle of PKIX public keys, used to authenticate attestation signatures. Generally, a signature is considered to be authenticated by a `PkixPublicKeySet` if any of the public keys verify it (i.e. it is an "OR" of the keys).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pkixPublicKeys` | array<PkixPublicKey> | Required. `pkix_public_keys` must have at least one entry. |

### `PlatformPolicy`

- A Binary Authorization platform policy for deployments on various platforms.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. A description comment about the policy. |
| `etag` | string | Optional. Used to prevent updating the policy when another request has updated it since it was retrieved. |
| `gkePolicy` | GkePolicy | Optional. GKE platform-specific policy. |
| `name` | string | Output only. The relative resource name of the Binary Authorization platform policy, in the form of `projects/*/platforms/*/policies/*`. |
| `updateTime` | string (google-datetime) | Output only. Time when the policy was last updated. |

### `PodResult`

- Result of evaluating the whole GKE policy for one Pod.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `imageResults` | array<ImageResult> | Per-image details. |
| `kubernetesNamespace` | string | The Kubernetes namespace of the Pod. |
| `kubernetesServiceAccount` | string | The Kubernetes service account of the Pod. |
| `podName` | string | The name of the Pod. |
| `verdict` | string enum | The result of evaluating this Pod. Values: `POD_VERDICT_UNSPECIFIED`, `CONFORMANT`, `NON_CONFORMANT`, `ERROR`. |

### `Policy`

- A policy for container image binary authorization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `admissionWhitelistPatterns` | array<AdmissionWhitelistPattern> | Optional. Admission policy allowlisting. A matching admission request will always be permitted. This feature is typically used to exclude Google or third-party infrastructure images from Binary Authorization policies. |
| `clusterAdmissionRules` | object | Optional. A valid policy has only one of the following rule maps non-empty, i.e. only one of `cluster_admission_rules`, `kubernetes_namespace_admission_rules`, `kubernetes_service_account_admission_rules`, or `istio_service_identity_admission_rules` can be non-empty. Per-cluster admission rules. Cluster spec format: `location.clusterId`. There can be at most one admission rule per cluster spec. A `location` is either a compute zone (e.g. us-central1-a) or a region (e.g. us-central1). For `clusterId` syntax restrictions see https://cloud.google.com/container-engine/reference/rest/v1/projects.zones.clusters. |
| `defaultAdmissionRule` | AdmissionRule | Required. Default admission rule for a cluster without a per-cluster, per- kubernetes-service-account, or per-istio-service-identity admission rule. |
| `description` | string | Optional. A descriptive comment. |
| `etag` | string | Optional. A checksum, returned by the server, that can be sent on update requests to ensure the policy has an up-to-date value before attempting to update it. See https://google.aip.dev/154. |
| `globalPolicyEvaluationMode` | string enum | Optional. Controls the evaluation of a Google-maintained global admission policy for common system-level images. Images not covered by the global policy will be subject to the project admission policy. This setting has no effect when specified inside a global admission policy. Values: `GLOBAL_POLICY_EVALUATION_MODE_UNSPECIFIED`, `ENABLE`, `DISABLE`. |
| `istioServiceIdentityAdmissionRules` | object | Optional. Per-istio-service-identity admission rules. Istio service identity spec format: `spiffe:///ns//sa/` or `/ns//sa/` e.g. `spiffe://example.com/ns/test-ns/sa/default` |
| `kubernetesNamespaceAdmissionRules` | object | Optional. Per-kubernetes-namespace admission rules. K8s namespace spec format: `[a-z.-]+`, e.g. `some-namespace` |
| `kubernetesServiceAccountAdmissionRules` | object | Optional. Per-kubernetes-service-account admission rules. Service account spec format: `namespace:serviceaccount`. e.g. `test-ns:default` |
| `name` | string | Output only. The resource name, in the format `projects/*/policy`. There is at most one policy per project. |
| `updateTime` | string (google-datetime) | Output only. Time when the policy was last updated. |

### `Scope`

- A scope specifier for `CheckSet` objects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kubernetesNamespace` | string | Optional. Matches all Kubernetes service accounts in the provided namespace, unless a more specific `kubernetes_service_account` scope already matched. |
| `kubernetesServiceAccount` | string | Optional. Matches a single Kubernetes service account, e.g. `my-namespace:my-service-account`. `kubernetes_service_account` scope is always more specific than `kubernetes_namespace` scope for the same namespace. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | IamPolicy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |

### `Signature`

- Verifiers (e.g. Kritis implementations) MUST verify signatures with respect to the trust anchors defined in policy (e.g. a Kritis policy). Typically this means that the verifier has been configured with a map from `public_key_id` to public key material (and any required parameters, e.g. signing algorithm). In particular, verification implementations MUST NOT treat the signature `public_key_id` as anything more than a key lookup hint. The `public_key_id` DOES NOT validate or authenticate a public key; it only provides a mechanism for quickly selecting a public key ALREADY CONFIGURED on the verifier through a trusted channel. Verification implementations MUST reject signatures in any of the following circumstances: \* The `public_key_id` is not recognized by the verifier. \* The public key that `public_key_id` refers to does not verify the signature with respect to the payload. The `signature` contents SHOULD NOT be "attached" (where the payload is included with the serialized `signature` bytes). Verifiers MUST ignore any "attached" payload and only verify signatures with respect to explicitly provided payload (e.g. a `payload` field on the proto message that holds this Signature, or the canonical serialization of the proto message that holds this signature).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publicKeyId` | string | The identifier for the public key that verifies this signature. \* The `public_key_id` is required. \* The `public_key_id` SHOULD be an RFC3986 conformant URI. \* When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: \* "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): \* "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" \* "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5" |
| `signature` | string (byte) | The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload. |

### `SigstoreAuthority`

- A Sigstore authority, used to verify signatures that are created by Sigstore. An authority is analogous to an attestation authenticator, verifying that a signature is valid or invalid.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Optional. A user-provided name for this `SigstoreAuthority`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results. |
| `publicKeySet` | SigstorePublicKeySet | Required. A simple set of public keys. A signature is considered valid if any keys in the set validate the signature. |

### `SigstorePublicKey`

- A Sigstore public key. `SigstorePublicKey` is the public key material used to authenticate Sigstore signatures.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publicKeyPem` | string | The public key material in PEM format. |

### `SigstorePublicKeySet`

- A bundle of Sigstore public keys, used to verify Sigstore signatures. A signature is authenticated by a `SigstorePublicKeySet` if any of the keys verify it.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publicKeys` | array<SigstorePublicKey> | Required. `public_keys` must have at least one entry. |

### `SigstoreSignatureCheck`

- A Sigstore signature check, which verifies the Sigstore signature associated with an image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sigstoreAuthorities` | array<SigstoreAuthority> | Required. The authorities required by this check to verify the signature. A signature only needs to be verified by one authority to pass the check. |

### `SimpleSigningAttestationCheck`

- Require a signed DSSE (https://github.com/secure-systems-lab/dsse) attestation with type SimpleSigning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestationAuthenticators` | array<AttestationAuthenticator> | Required. The authenticators required by this check to verify an attestation. Typically this is one or more PKIX public keys for signature verification. Only one authenticator needs to consider an attestation verified in order for an attestation to be considered fully authenticated. In otherwords, this list of authenticators is an "OR" of the authenticator results. At least one authenticator is required. |
| `containerAnalysisAttestationProjects` | array<string> | Optional. The projects where attestations are stored as Container Analysis Occurrences, in the format `projects/[PROJECT_ID]`. Only one attestation needs to successfully verify an image for this check to pass, so a single verified attestation found in any of `container_analysis_attestation_projects` is sufficient for the check to pass. A project ID must be used, not a project number. When fetching Occurrences from Container Analysis, only `AttestationOccurrence` kinds are considered. In the future, additional Occurrence kinds may be added to the query. Maximum number of `container_analysis_attestation_projects` allowed in each `SimpleSigningAttestationCheck` is 10. |

### `SlsaCheck`

- A SLSA provenance attestation check, which ensures that images are built by a trusted builder using source code from its trusted repositories only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rules` | array<VerificationRule> | Specifies a list of verification rules for the SLSA attestations. An image is considered compliant with the SlsaCheck if any of the rules are satisfied. |

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

### `TrustedDirectoryCheck`

- A trusted directory check, which rejects images that do not come from the set of user-configured trusted directories.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `trustedDirPatterns` | array<string> | Required. List of trusted directory patterns. A pattern is in the form "registry/path/to/directory". The registry domain part is defined as two or more dot-separated words, e.g., `us.pkg.dev`, or `gcr.io`. Additionally, `*` can be used in three ways as wildcards: 1. leading `*` to match varying prefixes in registry subdomain (useful for location prefixes); 2. trailing `*` after registry/ to match varying endings; 3. trailing `**` after registry/ to match "/" as well. For example: -- `gcr.io/my-project/my-repo` is valid to match a single directory -- `*-docker.pkg.dev/my-project/my-repo` or `*.gcr.io/my-project` are valid to match varying prefixes -- `gcr.io/my-project/*` will match all direct directories in `my-project` -- `gcr.io/my-project/**` would match all directories in `my-project` -- `gcr.i*` is not allowed since the registry is not completely specified -- `sub*domain.gcr.io/nginx` is not valid because only leading `*` or trailing `*` are allowed. -- `*pkg.dev/my-project/my-repo` is not valid because leading `*` can only match subdomain -- `**-docker.pkg.dev` is not valid because one leading `*` is allowed, and that it cannot match `/` |

### `UserOwnedDrydockNote`

- An user owned drydock note references a Drydock ATTESTATION_AUTHORITY Note created by the user.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `delegationServiceAccountEmail` | string | Output only. This field will contain the service account email address that this Attestor will use as the principal when querying Container Analysis. Attestor administrators must grant this service account the IAM role needed to read attestations from the note_reference in Container Analysis (`containeranalysis.notes.occurrences.viewer`). This email address is fixed for the lifetime of the Attestor, but callers should not make any other assumptions about the service account email; future versions may use an email based on a different naming pattern. |
| `noteReference` | string | Required. The Drydock resource name of a ATTESTATION_AUTHORITY Note, created by the user, in the format: `projects/*/notes/*` (or the legacy `providers/*/notes/*`). This field may not be updated. An attestation by this attestor is stored as a Drydock ATTESTATION_AUTHORITY Occurrence that names a container image and that links to this Note. Drydock is an external dependency. |
| `publicKeys` | array<AttestorPublicKey> | Optional. Public keys that verify attestations signed by this attestor. This field may be updated. If this field is non-empty, one of the specified public keys must verify that an attestation was signed by this attestor for the image specified in the admission request. If this field is empty, this attestor always returns that no valid attestations exist. |

### `UserOwnedGrafeasNote`

- An user owned Grafeas note references a Grafeas Attestation.Authority Note created by the user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delegationServiceAccountEmail` | string | Output only. This field will contain the service account email address that this attestor will use as the principal when querying Container Analysis. Attestor administrators must grant this service account the IAM role needed to read attestations from the note_reference in Container Analysis (`containeranalysis.notes.occurrences.viewer`). This email address is fixed for the lifetime of the attestor, but callers should not make any other assumptions about the service account email; future versions may use an email based on a different naming pattern. |
| `noteReference` | string | Required. The Grafeas resource name of a Attestation.Authority Note, created by the user, in the format: `projects/[PROJECT_ID]/notes/*`. This field may not be updated. A project ID must be used, not a project number. An attestation by this attestor is stored as a Grafeas Attestation.Authority Occurrence that names a container image and that links to this Note. Grafeas is an external dependency. |
| `publicKeys` | array<AttestorPublicKey> | Optional. Public keys that verify attestations signed by this attestor. This field may be updated. If this field is non-empty, one of the specified public keys must verify that an attestation was signed by this attestor for the image specified in the admission request. If this field is empty, this attestor always returns that no valid attestations exist. |

### `ValidateAttestationOccurrenceRequest`

- Request message for ValidationHelperV1.ValidateAttestationOccurrence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestation` | AttestationOccurrence | Required. An AttestationOccurrence to be checked that it can be verified by the `Attestor`. It does not have to be an existing entity in Container Analysis. It must otherwise be a valid `AttestationOccurrence`. |
| `occurrenceNote` | string | Required. The resource name of the Note to which the containing Occurrence is associated. |
| `occurrenceResourceUri` | string | Required. The URI of the artifact (e.g. container image) that is the subject of the containing Occurrence. |

### `ValidateAttestationOccurrenceResponse`

- Response message for ValidationHelperV1.ValidateAttestationOccurrence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `denialReason` | string | The reason for denial if the Attestation couldn't be validated. |
| `result` | string enum | The result of the Attestation validation. Values: `RESULT_UNSPECIFIED`, `VERIFIED`, `ATTESTATION_NOT_VERIFIABLE`. |

### `VerificationRule`

- Specifies verification rules for evaluating the SLSA attestations including: which builders to trust, where to fetch the SLSA attestations generated by those builders, and other builder-specific evaluation rules such as which source repositories are trusted. An image is considered verified by the rule if any of the fetched SLSA attestations is verified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestationSource` | AttestationSource | Specifies where to fetch the provenances attestations generated by the builder (group). |
| `configBasedBuildRequired` | boolean | If true, require the image to be built from a top-level configuration. `trusted_source_repo_patterns` specifies the repositories containing this configuration. |
| `customConstraints` | string | Optional. A CEL expression for specifying custom constraints on the provenance payload. This can be used when users want to specify expectations on provenance fields that are not covered by the general check. For example, users can use this field to require that certain parameters should never be used during the build process. |
| `trustedBuilder` | string enum | Each verification rule is used for evaluation against provenances generated by a specific builder (group). For some of the builders, such as the Google Cloud Build, users don't need to explicitly specify their roots of trust in the policy since the evaluation service can automatically fetch them based on the builder (group). Values: `BUILDER_UNSPECIFIED`, `GOOGLE_CLOUD_BUILD`. |
| `trustedSourceRepoPatterns` | array<string> | List of trusted source code repository URL patterns. These patterns match the full repository URL without its scheme (e.g. `https://`). The patterns must not include schemes. For example, the pattern `source.cloud.google.com/my-project/my-repo-name` matches the following URLs: - `source.cloud.google.com/my-project/my-repo-name` - `git+ssh://source.cloud.google.com/my-project/my-repo-name` - `https://source.cloud.google.com/my-project/my-repo-name` A pattern matches a URL either exactly or with `*` wildcards. `*` can be used in only two ways: 1. trailing `*` after hosturi/ to match varying endings; 2. trailing `**` after hosturi/ to match `/` as well. `*` and `**` can only be used as wildcards and can only occur at the end of the pattern after a `/`. (So it's not possible to match a URL that contains literal `*`.) For example: - `github.com/my-project/my-repo` is valid to match a single repo - `github.com/my-project/*` will match all direct repos in `my-project` - `github.com/**` matches all repos in GitHub |

### `VulnerabilityCheck`

- An image vulnerability check, which rejects images that violate the configured vulnerability rules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedCves` | array<string> | Optional. A list of specific CVEs to ignore even if the vulnerability level violates `maximumUnfixableSeverity` or `maximumFixableSeverity`. CVEs are listed in the format of Container Analysis note id. For example: - CVE-2021-20305 - CVE-2020-10543 The CVEs are applicable regardless of note provider project, e.g., an entry of `CVE-2021-20305` will allow vulnerabilities with a note name of either `projects/goog-vulnz/notes/CVE-2021-20305` or `projects/CUSTOM-PROJECT/notes/CVE-2021-20305`. |
| `blockedCves` | array<string> | Optional. A list of specific CVEs to always raise warnings about even if the vulnerability level meets `maximumUnfixableSeverity` or `maximumFixableSeverity`. CVEs are listed in the format of Container Analysis note id. For example: - CVE-2021-20305 - CVE-2020-10543 The CVEs are applicable regardless of note provider project, e.g., an entry of `CVE-2021-20305` will block vulnerabilities with a note name of either `projects/goog-vulnz/notes/CVE-2021-20305` or `projects/CUSTOM-PROJECT/notes/CVE-2021-20305`. |
| `containerAnalysisVulnerabilityProjects` | array<string> | Optional. The projects where vulnerabilities are stored as Container Analysis Occurrences. Each project is expressed in the resource format of `projects/[PROJECT_ID]`, e.g., `projects/my-gcp-project`. An attempt will be made for each project to fetch vulnerabilities, and all valid vulnerabilities will be used to check against the vulnerability policy. If no valid scan is found in all projects configured here, an error will be returned for the check. Maximum number of `container_analysis_vulnerability_projects` allowed in each `VulnerabilityCheck` is 10. |
| `maximumFixableSeverity` | string enum | Required. The threshold for severity for which a fix is currently available. This field is required and must be set. Values: `MAXIMUM_ALLOWED_SEVERITY_UNSPECIFIED`, `BLOCK_ALL`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`, `ALLOW_ALL`. |
| `maximumUnfixableSeverity` | string enum | Required. The threshold for severity for which a fix isn't currently available. This field is required and must be set. Values: `MAXIMUM_ALLOWED_SEVERITY_UNSPECIFIED`, `BLOCK_ALL`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`, `ALLOW_ALL`. |

### Shape of `AdmissionRule`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "enforcementMode": "string enum",
  "evaluationMode": "string enum",
  "requireAttestationsBy": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `binaryauthorization` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://binaryauthorization.googleapis.com/$discovery/rest?version=v1, https://binaryauthorization.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
