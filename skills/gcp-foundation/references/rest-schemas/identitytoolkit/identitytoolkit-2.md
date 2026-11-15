---
source: https://identitytoolkit.googleapis.com/$discovery/rest?version=v3
---

# Google Identity Toolkit API message schemas (identitytoolkit) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/identitytoolkit/`.

### `GoogleCloudIdentitytoolkitV1UploadAccountResponse`

- Response message for UploadAccount.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | array<GoogleCloudIdentitytoolkitV1ErrorInfo> | Detailed error info for accounts that cannot be uploaded. |
| `kind` | string | — |

### `GoogleCloudIdentitytoolkitV1UserInfo`

- An Identity Platform account's information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createdAt` | string (int64) | The time, in milliseconds from epoch, when the account was created. |
| `customAttributes` | string | Custom claims to be added to any ID tokens minted for the account. Should be at most 1,000 characters in length and in valid JSON format. |
| `customAuth` | boolean | Output only. Whether this account has been authenticated using SignInWithCustomToken. |
| `dateOfBirth` | string | Output only. The date of birth set for the account. This account attribute is not used by Identity Platform. It is available for informational purposes only. |
| `disabled` | boolean | Whether the account is disabled. Disabled accounts are inaccessible except for requests bearing a Google OAuth2 credential with proper permissions. |
| `displayName` | string | The display name of the account. This account attribute is not used by Identity Platform. It is available for informational purposes only. |
| `email` | string | The account's email address. The length of the email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the RFC 822 (https://tools.ietf.org/html/rfc822) addr-spec. |
| `emailLinkSignin` | boolean | Output only. Whether the account can authenticate with email link. |
| `emailVerified` | boolean | Whether the account's email address has been verified. |
| `initialEmail` | string | The first email address associated with this account. The account's initial email cannot be changed once set and is used to recover access to this account if lost via the RECOVER_EMAIL flow in GetOobCode. Should match the RFC 822 (https://tools.ietf.org/html/rfc822) addr-spec. |
| `language` | string | Output only. The language preference of the account. This account attribute is not used by Identity Platform. It is available for informational purposes only. |
| `lastLoginAt` | string (int64) | The last time, in milliseconds from epoch, this account was logged into. |
| `lastRefreshAt` | string (google-datetime) | Timestamp when an ID token was last minted for this account. |
| `localId` | string | Immutable. The unique ID of the account. |
| `mfaInfo` | array<GoogleCloudIdentitytoolkitV1MfaEnrollment> | Information on which multi-factor authentication providers are enabled for this account. |
| `passwordHash` | string (byte) | The account's hashed password. Only accessible by requests bearing a Google OAuth2 credential with proper permissions (https://cloud.google.com/identity-platform/docs/access-control). |
| `passwordUpdatedAt` | number (double) | The timestamp, in milliseconds from the epoch of 1970-01-01T00:00:00Z, when the account's password was last updated. |
| `phoneNumber` | string | The account's phone number. |
| `photoUrl` | string | The URL of the account's profile photo. This account attribute is not used by Identity Platform. It is available for informational purposes only. |
| `providerUserInfo` | array<GoogleCloudIdentitytoolkitV1ProviderUserInfo> | Information about the user as provided by various Identity Providers. |
| `rawPassword` | string | Input only. Plain text password used to update a account's password. This field is only ever used as input in a request. Identity Platform uses cryptographically secure hashing when managing passwords and will never store or transmit a user's password in plain text. |
| `salt` | string (byte) | The account's password salt. Only accessible by requests bearing a Google OAuth2 credential with proper permissions. |
| `screenName` | string | Output only. This account's screen name at Twitter or login name at GitHub. |
| `tenantId` | string | ID of the tenant this account belongs to. Only set if this account belongs to a tenant. |
| `timeZone` | string | Output only. The time zone preference of the account. This account attribute is not used by Identity Platform. It is available for informational purposes only. |
| `validSince` | string (int64) | Oldest timestamp, in seconds since epoch, that an ID token should be considered valid. All ID tokens issued before this time are considered invalid. |
| `version` | integer (int32) | The version of the account's password. Only accessible by requests bearing a Google OAuth2 credential with proper permissions. |

### `GoogleCloudIdentitytoolkitV1UserNotification`

- Warning notifications for the user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `notificationCode` | string enum | Warning notification enum. Can be used for localization. |
| `notificationMessage` | string | Warning notification string. Can be used as fallback. |

### `GoogleCloudIdentitytoolkitV1VerifyIosClientRequest`

- Request message for VerifyIosClient
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appToken` | string | A device token that the iOS client gets after registering to APNs (Apple Push Notification service). |
| `isSandbox` | boolean | Whether the app token is in the iOS sandbox. If false, the app token is in the production environment. |

### `GoogleCloudIdentitytoolkitV1VerifyIosClientResponse`

- Response message for VerifyIosClient.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `receipt` | string | Receipt of successful app token validation. |
| `suggestedTimeout` | string (int64) | Suggested time that the client should wait in seconds for delivery of the push notification. |

### `GoogleCloudIdentitytoolkitV2AutoRetrievalInfo`

- The information required to auto-retrieve an SMS.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `appSignatureHash` | string | The Android app's signature hash for Google Play Service's SMS Retriever API. |

### `GoogleCloudIdentitytoolkitV2CustomStrengthOptions`

- Custom strength options to enforce on user passwords.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `containsLowercaseCharacter` | boolean | The password must contain a lower case character. |
| `containsNonAlphanumericCharacter` | boolean | The password must contain a non alpha numeric character. |
| `containsNumericCharacter` | boolean | The password must contain a number. |
| `containsUppercaseCharacter` | boolean | The password must contain an upper case character. |
| `maxPasswordLength` | integer (int32) | Maximum password length. No default max length |
| `minPasswordLength` | integer (int32) | Minimum password length. Range from 6 to 30 |

### `GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentRequest`

- Finishes enrolling a second factor for the user.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Display name which is entered by users to distinguish between different second factors with same type or different type. |
| `idToken` | string | Required. ID token. |
| `phoneVerificationInfo` | GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo | Verification info to authorize sending an SMS for phone verification. |
| `tenantId` | string | The ID of the Identity Platform tenant that the user enrolling MFA belongs to. If not set, the user belongs to the default Identity Platform project. |
| `totpVerificationInfo` | GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentRequestInfo | Verification information for TOTP. |

### `GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentResponse`

- FinalizeMfaEnrollment response.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `idToken` | string | ID token updated to reflect MFA enrollment. |
| `phoneAuthInfo` | GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo | Auxiliary auth info specific to phone auth. |
| `refreshToken` | string | Refresh token updated to reflect MFA enrollment. |
| `totpAuthInfo` | GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentResponseInfo | Auxiliary auth info specific to TOTP auth. |

### `GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo`

- Phone Verification info for a FinalizeMfa request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `androidVerificationProof` | string | Android only. Uses for "instant" phone number verification though GmsCore. |
| `code` | string | User-entered verification code. |
| `phoneNumber` | string | Required if Android verification proof is presented. |
| `sessionInfo` | string | An opaque string that represents the enrollment session. |

### `GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo`

- Phone Verification info for a FinalizeMfa response.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `androidVerificationProof` | string | Android only. Long-lived replacement for valid code tied to android device. |
| `androidVerificationProofExpireTime` | string (google-datetime) | Android only. Expiration time of verification proof in seconds. |
| `phoneNumber` | string | For Android verification proof. |

### `GoogleCloudIdentitytoolkitV2FinalizeMfaSignInRequest`

- Finalizes sign-in by verifying MFA challenge.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `mfaEnrollmentId` | string | The MFA enrollment ID from the user's list of current MFA enrollments. |
| `mfaPendingCredential` | string | Required. Pending credential from first factor sign-in. |
| `phoneVerificationInfo` | GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo | Proof of completion of the SMS based MFA challenge. |
| `tenantId` | string | The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. |
| `totpVerificationInfo` | GoogleCloudIdentitytoolkitV2MfaTotpSignInRequestInfo | Proof of completion of the TOTP based MFA challenge. |

### `GoogleCloudIdentitytoolkitV2FinalizeMfaSignInResponse`

- FinalizeMfaSignIn response.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `idToken` | string | ID token for the authenticated user. |
| `phoneAuthInfo` | GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo | Extra phone auth info, including android verification proof. |
| `refreshToken` | string | Refresh token for the authenticated user. |

### `GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentRequestInfo`

- Mfa request info specific to TOTP auth for FinalizeMfa.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `sessionInfo` | string | An opaque string that represents the enrollment session. |
| `verificationCode` | string | User-entered verification code. |

### `GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentResponseInfo`

- Mfa response info specific to TOTP auth for FinalizeMfa.
- Version: v2

### `GoogleCloudIdentitytoolkitV2MfaTotpSignInRequestInfo`

- TOTP verification info for FinalizeMfaSignInRequest.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `verificationCode` | string | User-entered verification code. |

### `GoogleCloudIdentitytoolkitV2PasswordPolicy`

- Configuration for password policy.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowedNonAlphanumericCharacters` | array<string> | Output only. Allowed characters which satisfy the non_alphanumeric requirement. |
| `customStrengthOptions` | GoogleCloudIdentitytoolkitV2CustomStrengthOptions | The custom strength options enforced by the password policy. |
| `enforcementState` | string enum | Output only. Which enforcement mode to use for the password policy. |
| `forceUpgradeOnSignin` | boolean | Users must have a password compliant with the password policy to sign-in. |
| `schemaVersion` | integer (int32) | Output only. schema version number for the password policy |

### `GoogleCloudIdentitytoolkitV2RecaptchaConfig`

- Configuration for reCAPTCHA
- Version: v2

| Field | Type | Description |
|---|---|---|
| `recaptchaEnforcementState` | array<GoogleCloudIdentitytoolkitV2RecaptchaEnforcementState> | The reCAPTCHA enforcement state for the providers that GCIP supports reCAPTCHA protection. |
| `recaptchaKey` | string | The reCAPTCHA Enterprise key resource name, e.g. "projects/{project}/keys/{key}". This will only be returned when the reCAPTCHA enforcement state is AUDIT or ENFORCE on at least one of the reCAPTCHA providers. |
| `useSmsBotScore` | boolean | Whether to use the rCE bot score for reCAPTCHA phone provider. |
| `useSmsTollFraudProtection` | boolean | Whether to use the rCE sms toll fraud protection risk score for reCAPTCHA phone provider. |

### `GoogleCloudIdentitytoolkitV2RecaptchaEnforcementState`

- Enforcement states for reCAPTCHA protection.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enforcementState` | string enum | The reCAPTCHA enforcement state for the provider. |
| `provider` | string enum | The provider that has reCAPTCHA protection. |

### `GoogleCloudIdentitytoolkitV2RevokeTokenRequest`

- Request message for RevokeToken.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `idToken` | string | Required. A valid Identity Platform ID token to link the account. If there was a successful token revocation request on the account and no tokens are generated after the revocation, the duplicate requests will be ignored and returned immediately. |
| `providerId` | string | Required. The idp provider for the token. Currently only supports Apple Idp. The format should be "apple.com". |
| `redirectUri` | string | The redirect URI provided in the initial authorization request made by the client to the IDP. The URI must use the HTTPS protocol, include a domain name, and can't contain an IP address or localhost. Required if token_type is CODE. |
| `tenantId` | string | The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. |
| `token` | string | Required. The token to be revoked. If an authorization_code is passed in, the API will first exchange the code for access token and then revoke the token exchanged. |
| `tokenType` | string enum | Required. The type of the token to be revoked. |

### `GoogleCloudIdentitytoolkitV2RevokeTokenResponse`

- Response message for RevokeToken. Empty for now.
- Version: v2

### `GoogleCloudIdentitytoolkitV2StartMfaEnrollmentRequest`

- Sends MFA enrollment verification SMS for a user.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `idToken` | string | Required. User's ID token. |
| `phoneEnrollmentInfo` | GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo | Verification info to authorize sending an SMS for phone verification. |
| `tenantId` | string | The ID of the Identity Platform tenant that the user enrolling MFA belongs to. If not set, the user belongs to the default Identity Platform project. |
| `totpEnrollmentInfo` | GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentRequestInfo | Sign-in info specific to TOTP auth. |

### `GoogleCloudIdentitytoolkitV2StartMfaEnrollmentResponse`

- StartMfaEnrollment response.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `phoneSessionInfo` | GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo | Verification info to authorize sending an SMS for phone verification. |
| `totpSessionInfo` | GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentResponseInfo | Enrollment response info specific to TOTP auth. |

### `GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo`

- App Verification info for a StartMfa request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `autoRetrievalInfo` | GoogleCloudIdentitytoolkitV2AutoRetrievalInfo | Android only. Used by Google Play Services to identify the app for auto-retrieval. |
| `captchaResponse` | string | The reCAPTCHA Enterprise token provided by the reCAPTCHA client-side integration. Required when reCAPTCHA enterprise is enabled. |
| `clientType` | string enum | The client type, web, android or ios. Required when reCAPTCHA Enterprise is enabled. |
| `iosReceipt` | string | iOS only. Receipt of successful app token validation with APNS. |
| `iosSecret` | string | iOS only. Secret delivered to iOS app via APNS. |
| `phoneNumber` | string | Required for enrollment. Phone number to be enrolled as MFA. |
| `playIntegrityToken` | string | Android only. Used to assert application identity in place of a recaptcha token (or safety net token). A Play Integrity Token can be generated via the \[PlayIntegrity API\] (https://developer.android.com/google/play/integrity) with applying SHA256 to the `phone_number` field as the nonce. |
| `recaptchaToken` | string | Web only. Recaptcha solution. |
| `recaptchaVersion` | string enum | The reCAPTCHA version of the reCAPTCHA token in the captcha_response. Required when reCAPTCHA Enterprise is enabled. |
| `safetyNetToken` | string | Android only. Used to assert application identity in place of a recaptcha token. A SafetyNet Token can be generated via the SafetyNet Android Attestation API (https://developer.android.com/training/safetynet/attestation.html), with the Base64 encoding of the `phone_number` field as the nonce. |

### `GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo`

- Phone Verification info for a StartMfa response.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `sessionInfo` | string | An opaque string that represents the enrollment session. |

### `GoogleCloudIdentitytoolkitV2StartMfaSignInRequest`

- Starts multi-factor sign-in by sending the multi-factor auth challenge.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `mfaEnrollmentId` | string | Required. MFA enrollment id from the user's list of current MFA enrollments. |
| `mfaPendingCredential` | string | Required. Pending credential from first factor sign-in. |
| `phoneSignInInfo` | GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo | Verification info to authorize sending an SMS for phone verification. |
| `tenantId` | string | The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. |

### `GoogleCloudIdentitytoolkitV2StartMfaSignInResponse`

- StartMfaSignIn response.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `phoneResponseInfo` | GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo | MultiFactor sign-in session information specific to SMS-type second factors. Along with the one-time code retrieved from the sent SMS, the contents of this session information should be passed to FinalizeMfaSignIn to complete the sign in. |

### `GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentRequestInfo`

- Mfa request info specific to TOTP auth for StartMfa.
- Version: v2

### `GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentResponseInfo`

- Mfa response info specific to TOTP auth for StartMfa.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finalizeEnrollmentTime` | string (google-datetime) | The time by which the enrollment must finish. |
| `hashingAlgorithm` | string | The hashing algorithm used to generate the verification code. |
| `periodSec` | integer (int32) | Duration in seconds at which the verification code will change. |
| `sessionInfo` | string | An encoded string that represents the enrollment session. |
| `sharedSecretKey` | string | A base 32 encoded string that represents the shared TOTP secret. The base 32 encoding is the one specified by RFC4648#section-6 (https://datatracker.ietf.org/doc/html/rfc4648#section-6). (This is the same as the base 32 encoding from RFC3548#section-5 (https://datatracker.ietf.org/doc/html/rfc3548#section-5).) |
| `verificationCodeLength` | integer (int32) | The length of the verification code that needs to be generated. |

### `GoogleCloudIdentitytoolkitV2WithdrawMfaRequest`

- Withdraws MFA.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `idToken` | string | Required. User's ID token. |
| `mfaEnrollmentId` | string | Required. MFA enrollment id from a current MFA enrollment. |
| `tenantId` | string | The ID of the Identity Platform tenant that the user unenrolling MFA belongs to. If not set, the user belongs to the default Identity Platform project. |

### `GoogleCloudIdentitytoolkitV2WithdrawMfaResponse`

- Withdraws MultiFactorAuth response.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `idToken` | string | ID token updated to reflect removal of the second factor. |
| `refreshToken` | string | Refresh token updated to reflect removal of the second factor. |

### `GoogleIamV1AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<GoogleIamV1AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `GoogleIamV1AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. |

### `GoogleIamV1Binding`

- Associates `members`, or principals, with a `role`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `condition` | GoogleTypeExpr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `GoogleIamV1GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `options` | GoogleIamV1GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GoogleIamV1GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `GoogleIamV1Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<GoogleIamV1AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<GoogleIamV1Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `GoogleIamV1SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `policy` | GoogleIamV1Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `GoogleIamV1TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `GoogleIamV1TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `GoogleTypeExpr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `IdentitytoolkitRelyingpartyCreateAuthUriRequest`

- Request to get the IDP authentication URL.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `appId` | string | The app ID of the mobile app, base64(CERT_SHA1):PACKAGE_NAME for Android, BUNDLE_ID for iOS. |
| `authFlowType` | string | Explicitly specify the auth flow type. Currently only support "CODE_FLOW" type. The field is only used for Google provider. |
| `clientId` | string | The relying party OAuth client ID. |
| `context` | string | The opaque value used by the client to maintain context info between the authentication request and the IDP callback. |
| `continueUri` | string | The URI to which the IDP redirects the user after the federated login flow. |
| `customParameter` | object | The query parameter that client can customize by themselves in auth url. The following parameters are reserved for server so that they cannot be customized by clients: client_id, response_type, scope, redirect_uri, state, oauth_token. |
| `hostedDomain` | string | The hosted domain to restrict sign-in to accounts at that domain for Google Apps hosted accounts. |
| `identifier` | string | The email or federated ID of the user. |
| `oauthConsumerKey` | string | The developer's consumer key for OpenId OAuth Extension |
| `oauthScope` | string | Additional oauth scopes, beyond the basid user profile, that the user would be prompted to grant |
| `openidRealm` | string | Optional realm for OpenID protocol. The sub string "scheme://domain:port" of the param "continueUri" is used if this is not set. |
| `otaApp` | string | The native app package for OTA installation. |
| `providerId` | string | The IdP ID. For white listed IdPs it's a short domain name e.g. google.com, aol.com, live.net and yahoo.com. For other OpenID IdPs it's the OP identifier. |
| `sessionId` | string | The session_id passed by client. |
| `tenantId` | string | For multi-tenant use cases, in order to construct sign-in URL with the correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP configs from. |
| `tenantProjectNumber` | string (uint64) | Tenant project number to be used for idp discovery. |

### `IdentitytoolkitRelyingpartyDeleteAccountRequest`

- Request to delete account.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `delegatedProjectNumber` | string (int64) | GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. |
| `idToken` | string | The GITKit token or STS id token of the authenticated user. |
| `localId` | string | The local ID of the user. |

### `IdentitytoolkitRelyingpartyDownloadAccountRequest`

- Request to download user account in batch.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `delegatedProjectNumber` | string (int64) | GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. |
| `maxResults` | integer (uint32) | The max number of results to return in the response. |
| `nextPageToken` | string | The token for the next page. This should be taken from the previous response. |
| `targetProjectId` | string | Specify which project (field value is actually project id) to operate. Only used when provided credential. |

### `IdentitytoolkitRelyingpartyEmailLinkSigninRequest`

- Request to sign in with email.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `email` | string | The email address of the user. |
| `idToken` | string | Token for linking flow. |
| `oobCode` | string | The confirmation code. |

### `IdentitytoolkitRelyingpartyGetAccountInfoRequest`

- Request to get the account information.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `delegatedProjectNumber` | string (int64) | GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. |
| `email` | array<string> | The list of emails of the users to inquiry. |
| `idToken` | string | The GITKit token of the authenticated user. |
| `localId` | array<string> | The list of local ID's of the users to inquiry. |
| `phoneNumber` | array<string> | Privileged caller can query users by specified phone number. |

### `IdentitytoolkitRelyingpartyGetProjectConfigResponse`

- Response of getting the project configuration.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `allowPasswordUser` | boolean | Whether to allow password user sign in or sign up. |
| `apiKey` | string | Browser API key, needed when making http request to Apiary. |
| `authorizedDomains` | array<string> | Authorized domains. |
| `changeEmailTemplate` | EmailTemplate | Change email template. |
| `dynamicLinksDomain` | string | — |
| `enableAnonymousUser` | boolean | Whether anonymous user is enabled. |
| `idpConfig` | array<IdpConfig> | OAuth2 provider configuration. |
| `legacyResetPasswordTemplate` | EmailTemplate | Legacy reset password email template. |
| `projectId` | string | Project ID of the relying party. |
| `resetPasswordTemplate` | EmailTemplate | Reset password email template. |
| `useEmailSending` | boolean | Whether to use email sending provided by Firebear. |
| `verifyEmailTemplate` | EmailTemplate | Verify email template. |

### `IdentitytoolkitRelyingpartyGetPublicKeysResponse`

- Respone of getting public keys.
- Version: v3
- Map values: string

### `IdentitytoolkitRelyingpartyResetPasswordRequest`

- Request to reset the password.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `email` | string | The email address of the user. |
| `newPassword` | string | The new password inputted by the user. |
| `oldPassword` | string | The old password inputted by the user. |
| `oobCode` | string | The confirmation code. |

### `IdentitytoolkitRelyingpartySendVerificationCodeRequest`

- Request for Identitytoolkit-SendVerificationCode
- Version: v3

| Field | Type | Description |
|---|---|---|
| `iosReceipt` | string | Receipt of successful app token validation with APNS. |
| `iosSecret` | string | Secret delivered to iOS app via APNS. |
| `phoneNumber` | string | The phone number to send the verification code to in E.164 format. |
| `recaptchaToken` | string | Recaptcha solution. |

### `IdentitytoolkitRelyingpartySendVerificationCodeResponse`

- Response for Identitytoolkit-SendVerificationCode
- Version: v3

| Field | Type | Description |
|---|---|---|
| `sessionInfo` | string | Encrypted session information |

### `IdentitytoolkitRelyingpartySetAccountInfoRequest`

- Request to set the account information.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `captchaChallenge` | string | The captcha challenge. |
| `captchaResponse` | string | Response to the captcha. |
| `createdAt` | string (int64) | The timestamp when the account is created. |
| `customAttributes` | string | The custom attributes to be set in the user's id token. |
| `delegatedProjectNumber` | string (int64) | GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. |
| `deleteAttribute` | array<string> | The attributes users request to delete. |
| `deleteProvider` | array<string> | The IDPs the user request to delete. |
| `disableUser` | boolean | Whether to disable the user. |
| `displayName` | string | The name of the user. |
| `email` | string | The email of the user. |
| `emailVerified` | boolean | Mark the email as verified or not. |
| `idToken` | string | The GITKit token of the authenticated user. |
| `instanceId` | string | Instance id token of the app. |
| `lastLoginAt` | string (int64) | Last login timestamp. |
| `localId` | string | The local ID of the user. |
| `oobCode` | string | The out-of-band code of the change email request. |
| `password` | string | The new password of the user. |
| `phoneNumber` | string | Privileged caller can update user with specified phone number. |
| `photoUrl` | string | The photo url of the user. |
| `provider` | array<string> | The associated IDPs of the user. |
| `returnSecureToken` | boolean | Whether return sts id token and refresh token instead of gitkit token. |
| `upgradeToFederatedLogin` | boolean | Mark the user to upgrade to federated login. |
| `validSince` | string (int64) | Timestamp in seconds for valid login token. |

### `IdentitytoolkitRelyingpartySetProjectConfigRequest`

- Request to set the project configuration.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `allowPasswordUser` | boolean | Whether to allow password user sign in or sign up. |
| `apiKey` | string | Browser API key, needed when making http request to Apiary. |
| `authorizedDomains` | array<string> | Authorized domains for widget redirect. |
| `changeEmailTemplate` | EmailTemplate | Change email template. |
| `delegatedProjectNumber` | string (int64) | GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. |
| `enableAnonymousUser` | boolean | Whether to enable anonymous user. |
| `idpConfig` | array<IdpConfig> | Oauth2 provider configuration. |
| `legacyResetPasswordTemplate` | EmailTemplate | Legacy reset password email template. |
| `resetPasswordTemplate` | EmailTemplate | Reset password email template. |
| `useEmailSending` | boolean | Whether to use email sending provided by Firebear. |
| `verifyEmailTemplate` | EmailTemplate | Verify email template. |

### `IdentitytoolkitRelyingpartySetProjectConfigResponse`

- Response of setting the project configuration.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Project ID of the relying party. |

### `IdentitytoolkitRelyingpartySignOutUserRequest`

- Request to sign out user.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `instanceId` | string | Instance id token of the app. |
| `localId` | string | The local ID of the user. |

### `IdentitytoolkitRelyingpartySignOutUserResponse`

- Response of signing out user.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `localId` | string | The local ID of the user. |

### `IdentitytoolkitRelyingpartySignupNewUserRequest`

- Request to signup new user, create anonymous user or anonymous user reauth.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `captchaChallenge` | string | The captcha challenge. |
| `captchaResponse` | string | Response to the captcha. |
| `disabled` | boolean | Whether to disable the user. Only can be used by service account. |
| `displayName` | string | The name of the user. |
| `email` | string | The email of the user. |
| `emailVerified` | boolean | Mark the email as verified or not. Only can be used by service account. |
| `idToken` | string | The GITKit token of the authenticated user. |
| `instanceId` | string | Instance id token of the app. |
| `localId` | string | Privileged caller can create user with specified user id. |
| `password` | string | The new password of the user. |
| `phoneNumber` | string | Privileged caller can create user with specified phone number. |
| `photoUrl` | string | The photo url of the user. |
| `tenantId` | string | For multi-tenant use cases, in order to construct sign-in URL with the correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP configs from. |
| `tenantProjectNumber` | string (uint64) | Tenant project number to be used for idp discovery. |

### `IdentitytoolkitRelyingpartyUploadAccountRequest`

- Request to upload user account in batch.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `allowOverwrite` | boolean | Whether allow overwrite existing account when user local_id exists. |
| `blockSize` | integer (int32) | — |
| `cpuMemCost` | integer (int32) | The following 4 fields are for standard scrypt algorithm. |
| `delegatedProjectNumber` | string (int64) | GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. |
| `dkLen` | integer (int32) | — |
| `hashAlgorithm` | string | The password hash algorithm. |
| `memoryCost` | integer (int32) | Memory cost for hash calculation. Used by scrypt similar algorithms. |
| `parallelization` | integer (int32) | — |
| `rounds` | integer (int32) | Rounds for hash calculation. Used by scrypt and similar algorithms. |
| `saltSeparator` | string (byte) | The salt separator. |
| `sanityCheck` | boolean | If true, backend will do sanity check(including duplicate email and federated id) when uploading account. |
| `signerKey` | string (byte) | The key for to hash the password. |
| `targetProjectId` | string | Specify which project (field value is actually project id) to operate. Only used when provided credential. |
| `users` | array<UserInfo> | The account info to be stored. |

### `IdentitytoolkitRelyingpartyVerifyAssertionRequest`

- Request to verify the IDP assertion.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `autoCreate` | boolean | When it's true, automatically creates a new account if the user doesn't exist. When it's false, allows existing user to sign in normally and throws exception if the user doesn't exist. |
| `delegatedProjectNumber` | string (int64) | GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. |
| `idToken` | string | The GITKit token of the authenticated user. |
| `instanceId` | string | Instance id token of the app. |
| `pendingIdToken` | string | The GITKit token for the non-trusted IDP pending to be confirmed by the user. |
| `postBody` | string | The post body if the request is a HTTP POST. |
| `requestUri` | string | The URI to which the IDP redirects the user back. It may contain federated login result params added by the IDP. |
| `returnIdpCredential` | boolean | Whether return 200 and IDP credential rather than throw exception when federated id is already linked. |
| `returnRefreshToken` | boolean | Whether to return refresh tokens. |
| `returnSecureToken` | boolean | Whether return sts id token and refresh token instead of gitkit token. |
| `sessionId` | string | Session ID, which should match the one in previous createAuthUri request. |
| `tenantId` | string | For multi-tenant use cases, in order to construct sign-in URL with the correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP configs from. |
| `tenantProjectNumber` | string (uint64) | Tenant project number to be used for idp discovery. |

### `IdentitytoolkitRelyingpartyVerifyCustomTokenRequest`

- Request to verify a custom token
- Version: v3

| Field | Type | Description |
|---|---|---|
| `delegatedProjectNumber` | string (int64) | GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. |
| `instanceId` | string | Instance id token of the app. |
| `returnSecureToken` | boolean | Whether return sts id token and refresh token instead of gitkit token. |
| `token` | string | The custom token to verify |

### `IdentitytoolkitRelyingpartyVerifyPasswordRequest`

- Request to verify the password.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `captchaChallenge` | string | The captcha challenge. |
| `captchaResponse` | string | Response to the captcha. |
| `delegatedProjectNumber` | string (int64) | GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. |
| `email` | string | The email of the user. |
| `idToken` | string | The GITKit token of the authenticated user. |
| `instanceId` | string | Instance id token of the app. |
| `password` | string | The password inputed by the user. |
| `pendingIdToken` | string | The GITKit token for the non-trusted IDP, which is to be confirmed by the user. |
| `returnSecureToken` | boolean | Whether return sts id token and refresh token instead of gitkit token. |
| `tenantId` | string | For multi-tenant use cases, in order to construct sign-in URL with the correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP configs from. |
| `tenantProjectNumber` | string (uint64) | Tenant project number to be used for idp discovery. |

### `IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest`

- Request for Identitytoolkit-VerifyPhoneNumber
- Version: v3

| Field | Type | Description |
|---|---|---|
| `code` | string | — |
| `idToken` | string | — |
| `operation` | string | — |
| `phoneNumber` | string | — |
| `sessionInfo` | string | The session info previously returned by IdentityToolkit-SendVerificationCode. |
| `temporaryProof` | string | — |
| `verificationProof` | string | — |

### `IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse`

- Response for Identitytoolkit-VerifyPhoneNumber
- Version: v3

| Field | Type | Description |
|---|---|---|
| `expiresIn` | string (int64) | — |
| `idToken` | string | — |
| `isNewUser` | boolean | — |
| `localId` | string | — |
| `phoneNumber` | string | — |
| `refreshToken` | string | — |
| `temporaryProof` | string | — |
| `temporaryProofExpiresIn` | string (int64) | — |
| `verificationProof` | string | — |
| `verificationProofExpiresIn` | string (int64) | — |

### `IdpConfig`

- Template for a single idp configuration.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clientId` | string | OAuth2 client ID. |
| `enabled` | boolean | Whether this IDP is enabled. |
| `experimentPercent` | integer (int32) | Percent of users who will be prompted/redirected federated login for this IDP. |
| `provider` | string | OAuth2 provider. |
| `secret` | string | OAuth2 client secret. |
| `whitelistedAudiences` | array<string> | Whitelisted client IDs for audience check. |

### `Relyingparty`

- Request of getting a code for user confirmation (reset password, change email etc.)
- Version: v3

| Field | Type | Description |
|---|---|---|
| `androidInstallApp` | boolean | whether or not to install the android app on the device where the link is opened |
| `androidMinimumVersion` | string | minimum version of the app. if the version on the device is lower than this version then the user is taken to the play store to upgrade the app |
| `androidPackageName` | string | android package name of the android app to handle the action code |
| `canHandleCodeInApp` | boolean | whether or not the app can handle the oob code without first going to web |
| `captchaResp` | string | The recaptcha response from the user. |
| `challenge` | string | The recaptcha challenge presented to the user. |
| `continueUrl` | string | The url to continue to the Gitkit app |
| `email` | string | The email of the user. |
| `iOSAppStoreId` | string | iOS app store id to download the app if it's not already installed |
| `iOSBundleId` | string | the iOS bundle id of iOS app to handle the action code |
| `idToken` | string | The user's Gitkit login token for email change. |
| `kind` | string | The fixed string "identitytoolkit#relyingparty". |
| `newEmail` | string | The new email if the code is for email change. |
| `requestType` | string | The request type. |
| `userIp` | string | The IP address of the user. |

### `ResetPasswordResponse`

- Response of resetting the password.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `email` | string | The user's email. If the out-of-band code is for email recovery, the user's original email. |
| `kind` | string | The fixed string "identitytoolkit#ResetPasswordResponse". |
| `newEmail` | string | If the out-of-band code is for email recovery, the user's new email. |
| `requestType` | string | The request type. |

### `SetAccountInfoResponse`

- Respone of setting the account information.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The name of the user. |
| `email` | string | The email of the user. |
| `emailVerified` | boolean | If email has been verified. |
| `expiresIn` | string (int64) | If idToken is STS id token, then this field will be expiration time of STS id token in seconds. |
| `idToken` | string | The Gitkit id token to login the newly sign up user. |
| `kind` | string | The fixed string "identitytoolkit#SetAccountInfoResponse". |
| `localId` | string | The local ID of the user. |
| `newEmail` | string | The new email the user attempts to change to. |
| `passwordHash` | string (byte) | The user's hashed password. |
| `photoUrl` | string | The photo url of the user. |
| `providerUserInfo` | array<object> | The user's profiles at the associated IdPs. |
| `refreshToken` | string | If idToken is STS id token, then this field will be refresh token. |

### `SignupNewUserResponse`

- Response of signing up new user, creating anonymous user or anonymous user reauth.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The name of the user. |
| `email` | string | The email of the user. |
| `expiresIn` | string (int64) | If idToken is STS id token, then this field will be expiration time of STS id token in seconds. |
| `idToken` | string | The Gitkit id token to login the newly sign up user. |
| `kind` | string | The fixed string "identitytoolkit#SignupNewUserResponse". |
| `localId` | string | The RP local ID of the user. |
| `refreshToken` | string | If idToken is STS id token, then this field will be refresh token. |

### `UploadAccountResponse`

- Respone of uploading accounts in batch.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `error` | array<object> | The error encountered while processing the account info. |
| `kind` | string | The fixed string "identitytoolkit#UploadAccountResponse". |

### `UserInfo`

- Template for an individual account info.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `createdAt` | string (int64) | User creation timestamp. |
| `customAttributes` | string | The custom attributes to be set in the user's id token. |
| `customAuth` | boolean | Whether the user is authenticated by the developer. |
| `disabled` | boolean | Whether the user is disabled. |
| `displayName` | string | The name of the user. |
| `email` | string | The email of the user. |
| `emailVerified` | boolean | Whether the email has been verified. |
| `lastLoginAt` | string (int64) | last login timestamp. |
| `localId` | string | The local ID of the user. |
| `passwordHash` | string (byte) | The user's hashed password. |
| `passwordUpdatedAt` | number (double) | The timestamp when the password was last updated. |
| `phoneNumber` | string | User's phone number. |
| `photoUrl` | string | The URL of the user profile photo. |
| `providerUserInfo` | array<object> | The IDP of the user. |
| `rawPassword` | string | The user's plain text password. |
| `salt` | string (byte) | The user's password salt. |
| `screenName` | string | User's screen name at Twitter or login name at Github. |
| `validSince` | string (int64) | Timestamp in seconds for valid login token. |
| `version` | integer (int32) | Version of the user's password. |

### `VerifyAssertionResponse`

- Response of verifying the IDP assertion.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `action` | string | The action code. |
| `appInstallationUrl` | string | URL for OTA app installation. |
| `appScheme` | string | The custom scheme used by mobile app. |
| `context` | string | The opaque value used by the client to maintain context info between the authentication request and the IDP callback. |
| `dateOfBirth` | string | The birth date of the IdP account. |
| `displayName` | string | The display name of the user. |
| `email` | string | The email returned by the IdP. NOTE: The federated login user may not own the email. |
| `emailRecycled` | boolean | It's true if the email is recycled. |
| `emailVerified` | boolean | The value is true if the IDP is also the email provider. It means the user owns the email. |
| `errorMessage` | string | Client error code. |
| `expiresIn` | string (int64) | If idToken is STS id token, then this field will be expiration time of STS id token in seconds. |
| `federatedId` | string | The unique ID identifies the IdP account. |
| `firstName` | string | The first name of the user. |
| `fullName` | string | The full name of the user. |
| `idToken` | string | The ID token. |
| `inputEmail` | string | It's the identifier param in the createAuthUri request if the identifier is an email. It can be used to check whether the user input email is different from the asserted email. |
| `isNewUser` | boolean | True if it's a new user sign-in, false if it's a returning user. |
| `kind` | string | The fixed string "identitytoolkit#VerifyAssertionResponse". |
| `language` | string | The language preference of the user. |
| `lastName` | string | The last name of the user. |
| `localId` | string | The RP local ID if it's already been mapped to the IdP account identified by the federated ID. |
| `needConfirmation` | boolean | Whether the assertion is from a non-trusted IDP and need account linking confirmation. |
| `needEmail` | boolean | Whether need client to supply email to complete the federated login flow. |
| `nickName` | string | The nick name of the user. |
| `oauthAccessToken` | string | The OAuth2 access token. |
| `oauthAuthorizationCode` | string | The OAuth2 authorization code. |
| `oauthExpireIn` | integer (int32) | The lifetime in seconds of the OAuth2 access token. |
| `oauthIdToken` | string | The OIDC id token. |
| `oauthRequestToken` | string | The user approved request token for the OpenID OAuth extension. |
| `oauthScope` | string | The scope for the OpenID OAuth extension. |
| `oauthTokenSecret` | string | The OAuth1 access token secret. |
| `originalEmail` | string | The original email stored in the mapping storage. It's returned when the federated ID is associated to a different email. |
| `photoUrl` | string | The URI of the public accessible profiel picture. |
| `providerId` | string | The IdP ID. For white listed IdPs it's a short domain name e.g. google.com, aol.com, live.net and yahoo.com. If the "providerId" param is set to OpenID OP identifer other than the whilte listed IdPs the OP identifier is returned. If the "identifier" param is federated ID in the createAuthUri request. The domain part of the federated ID is returned. |
| `rawUserInfo` | string | Raw IDP-returned user info. |
| `refreshToken` | string | If idToken is STS id token, then this field will be refresh token. |
| `screenName` | string | The screen_name of a Twitter user or the login name at Github. |
| `timeZone` | string | The timezone of the user. |
| `verifiedProvider` | array<string> | When action is 'map', contains the idps which can be used for confirmation. |

### `VerifyCustomTokenResponse`

- Response from verifying a custom token
- Version: v3

| Field | Type | Description |
|---|---|---|
| `expiresIn` | string (int64) | If idToken is STS id token, then this field will be expiration time of STS id token in seconds. |
| `idToken` | string | The GITKit token for authenticated user. |
| `isNewUser` | boolean | True if it's a new user sign-in, false if it's a returning user. |
| `kind` | string | The fixed string "identitytoolkit#VerifyCustomTokenResponse". |
| `refreshToken` | string | If idToken is STS id token, then this field will be refresh token. |

### `VerifyPasswordResponse`

- Request of verifying the password.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The name of the user. |
| `email` | string | The email returned by the IdP. NOTE: The federated login user may not own the email. |
| `expiresIn` | string (int64) | If idToken is STS id token, then this field will be expiration time of STS id token in seconds. |
| `idToken` | string | The GITKit token for authenticated user. |
| `kind` | string | The fixed string "identitytoolkit#VerifyPasswordResponse". |
| `localId` | string | The RP local ID if it's already been mapped to the IdP account identified by the federated ID. |
| `oauthAccessToken` | string | The OAuth2 access token. |
| `oauthAuthorizationCode` | string | The OAuth2 authorization code. |
| `oauthExpireIn` | integer (int32) | The lifetime in seconds of the OAuth2 access token. |
| `photoUrl` | string | The URI of the user's photo at IdP |
| `refreshToken` | string | If idToken is STS id token, then this field will be refresh token. |
| `registered` | boolean | Whether the email is registered. |

### Shape of `GoogleCloudIdentitytoolkitV1UploadAccountResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "error": "array<GoogleCloudIdentitytoolkitV1ErrorInfo>",
  "kind": "string"
}
```

## Notes

- Generated from the Discovery document(s) of `identitytoolkit` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://identitytoolkit.googleapis.com/$discovery/rest?version=v3 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
