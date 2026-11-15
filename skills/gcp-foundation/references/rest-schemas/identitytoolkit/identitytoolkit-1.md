---
source: https://identitytoolkit.googleapis.com/$discovery/rest?version=v3
---

# Google Identity Toolkit API message schemas (identitytoolkit) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/identitytoolkit/`.

### `CreateAuthUriResponse`

- Response of creating the IDP authentication URL.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `allProviders` | array<string> | all providers the user has once used to do federated login |
| `authUri` | string | The URI used by the IDP to authenticate the user. |
| `captchaRequired` | boolean | True if captcha is required. |
| `forExistingProvider` | boolean | True if the authUri is for user's existing provider. |
| `kind` | string | The fixed string identitytoolkit#CreateAuthUriResponse". |
| `providerId` | string | The provider ID of the auth URI. |
| `registered` | boolean | Whether the user is registered if the identifier is an email. |
| `sessionId` | string | Session ID which should be passed in the following verifyAssertion request. |
| `signinMethods` | array<string> | All sign-in methods this user has used. |

### `DeleteAccountResponse`

- Respone of deleting account.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `kind` | string | The fixed string "identitytoolkit#DeleteAccountResponse". |

### `DownloadAccountResponse`

- Response of downloading accounts in batch.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `kind` | string | The fixed string "identitytoolkit#DownloadAccountResponse". |
| `nextPageToken` | string | The next page token. To be used in a subsequent request to return the next page of results. |
| `users` | array<UserInfo> | The user accounts data. |

### `EmailLinkSigninResponse`

- Response of email signIn.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `email` | string | The user's email. |
| `expiresIn` | string (int64) | Expiration time of STS id token in seconds. |
| `idToken` | string | The STS id token to login the newly signed in user. |
| `isNewUser` | boolean | Whether the user is new. |
| `kind` | string | The fixed string "identitytoolkit#EmailLinkSigninResponse". |
| `localId` | string | The RP local ID of the user. |
| `refreshToken` | string | The refresh token for the signed in user. |

### `EmailTemplate`

- Template for an email template.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `body` | string | Email body. |
| `format` | string | Email body format. |
| `from` | string | From address of the email. |
| `fromDisplayName` | string | From display name. |
| `replyTo` | string | Reply-to address. |
| `subject` | string | Subject of the email. |

### `GetAccountInfoResponse`

- Response of getting account information.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `kind` | string | The fixed string "identitytoolkit#GetAccountInfoResponse". |
| `users` | array<UserInfo> | The info of the users. |

### `GetOobConfirmationCodeResponse`

- Response of getting a code for user confirmation (reset password, change email etc.).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `email` | string | The email address that the email is sent to. |
| `kind` | string | The fixed string "identitytoolkit#GetOobConfirmationCodeResponse". |
| `oobCode` | string | The code to be send to the user. |

### `GetRecaptchaParamResponse`

- Response of getting recaptcha param.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `kind` | string | The fixed string "identitytoolkit#GetRecaptchaParamResponse". |
| `recaptchaSiteKey` | string | Site key registered at recaptcha. |
| `recaptchaStoken` | string | The stoken field for the recaptcha widget, used to request captcha challenge. |

### `GoogleCloudIdentitytoolkitAdminV2AllowByDefault`

- Defines a policy of allowing every region by default and adding disallowed regions to a disallow list.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `disallowedRegions` | array<string> | Two letter unicode region codes to disallow as defined by https://cldr.unicode.org/ The full list of these region codes is here: https://github.com/unicode-cldr/cldr-localenames-full/blob/master/main/en/territories.json |

### `GoogleCloudIdentitytoolkitAdminV2AllowlistOnly`

- Defines a policy of only allowing regions by explicitly adding them to an allowlist.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowedRegions` | array<string> | Two letter unicode region codes to allow as defined by https://cldr.unicode.org/ The full list of these region codes is here: https://github.com/unicode-cldr/cldr-localenames-full/blob/master/main/en/territories.json |

### `GoogleCloudIdentitytoolkitAdminV2Anonymous`

- Configuration options related to authenticating an anonymous user.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether anonymous user auth is enabled for the project or not. |

### `GoogleCloudIdentitytoolkitAdminV2AppleSignInConfig`

- Additional config for SignInWithApple.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bundleIds` | array<string> | A list of Bundle ID's usable by this project |
| `codeFlowConfig` | GoogleCloudIdentitytoolkitAdminV2CodeFlowConfig | Additional config for Apple for code flow. |

### `GoogleCloudIdentitytoolkitAdminV2BlockingFunctionsConfig`

- Configuration related to Blocking Functions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `forwardInboundCredentials` | GoogleCloudIdentitytoolkitAdminV2ForwardInboundCredentials | The user credentials to include in the JWT payload that is sent to the registered Blocking Functions. |
| `triggers` | object | Map of Trigger to event type. Key should be one of the supported event types: "beforeCreate", "beforeSignIn" |

### `GoogleCloudIdentitytoolkitAdminV2ClientConfig`

- Options related to how clients making requests on behalf of a project should be configured.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiKey` | string | Output only. API key that can be used when making requests for this project. |
| `firebaseSubdomain` | string | Output only. Firebase subdomain. |
| `permissions` | GoogleCloudIdentitytoolkitAdminV2Permissions | Configuration related to restricting a user's ability to affect their account. |

### `GoogleCloudIdentitytoolkitAdminV2ClientPermissionConfig`

- Options related to how clients making requests on behalf of a tenant should be configured.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | GoogleCloudIdentitytoolkitAdminV2ClientPermissions | Configuration related to restricting a user's ability to affect their account. |

### `GoogleCloudIdentitytoolkitAdminV2ClientPermissions`

- Configuration related to restricting a user's ability to affect their account.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `disabledUserDeletion` | boolean | When true, end users cannot delete their account on the associated project through any of our API methods |
| `disabledUserSignup` | boolean | When true, end users cannot sign up for a new account on the associated project through any of our API methods |

### `GoogleCloudIdentitytoolkitAdminV2CodeFlowConfig`

- Additional config for Apple for code flow.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `keyId` | string | Key ID for the private key. |
| `privateKey` | string | Private key used for signing the client secret JWT. |
| `teamId` | string | Apple Developer Team ID. |

### `GoogleCloudIdentitytoolkitAdminV2Config`

- Represents an Identity Toolkit project.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authorizedDomains` | array<string> | List of domains authorized for OAuth redirects |
| `autodeleteAnonymousUsers` | boolean | Whether anonymous users will be auto-deleted after a period of 30 days. |
| `blockingFunctions` | GoogleCloudIdentitytoolkitAdminV2BlockingFunctionsConfig | Configuration related to blocking functions. |
| `client` | GoogleCloudIdentitytoolkitAdminV2ClientConfig | Options related to how clients making requests on behalf of a project should be configured. |
| `defaultHostingSite` | string | Output only. Default Firebase hosting site name |
| `emailPrivacyConfig` | GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig | Configuration for settings related to email privacy and public visibility. |
| `mfa` | GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig | Configuration for this project's multi-factor authentication, including whether it is active and what factors can be used for the second factor |
| `mobileLinksConfig` | GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig | Configuration for settings related to univeral links (iOS) and app links (Android). |
| `monitoring` | GoogleCloudIdentitytoolkitAdminV2MonitoringConfig | Configuration related to monitoring project activity. |
| `multiTenant` | GoogleCloudIdentitytoolkitAdminV2MultiTenantConfig | Configuration related to multi-tenant functionality. |
| `name` | string | Output only. The name of the Config resource. Example: "projects/my-awesome-project/config" |
| `notification` | GoogleCloudIdentitytoolkitAdminV2NotificationConfig | Configuration related to sending notifications to users. |
| `passwordPolicyConfig` | GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig | The project level password policy configuration. |
| `quota` | GoogleCloudIdentitytoolkitAdminV2QuotaConfig | Configuration related to quotas. |
| `recaptchaConfig` | GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig | The project-level reCAPTCHA config. |
| `signIn` | GoogleCloudIdentitytoolkitAdminV2SignInConfig | Configuration related to local sign in methods. |
| `smsRegionConfig` | GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig | Configures which regions are enabled for SMS verification code sending. |
| `subtype` | string enum | Output only. The subtype of this config. |

### `GoogleCloudIdentitytoolkitAdminV2CustomStrengthOptions`

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

### `GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdp`

- Standard Identity Toolkit-trusted IDPs.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of the Idp |
| `idpId` | string | Id the of Idp |

### `GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig`

- Configurations options for authenticating with a the standard set of Identity Toolkit-trusted IDPs.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `appleSignInConfig` | GoogleCloudIdentitytoolkitAdminV2AppleSignInConfig | Additional config for Apple-based projects. |
| `clientId` | string | OAuth client ID. |
| `clientSecret` | string | OAuth client secret. |
| `enabled` | boolean | True if allows the user to sign in with the provider. |
| `name` | string | The name of the DefaultSupportedIdpConfig resource, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com" |

### `GoogleCloudIdentitytoolkitAdminV2DnsInfo`

- Information of custom domain DNS verification. By default, default_domain will be used. A custom domain can be configured using VerifyCustomDomain.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `customDomain` | string | Output only. The applied verified custom domain. |
| `customDomainState` | string enum | Output only. The current verification state of the custom domain. The custom domain will only be used once the domain verification is successful. |
| `domainVerificationRequestTime` | string (google-datetime) | Output only. The timestamp of initial request for the current domain verification. |
| `pendingCustomDomain` | string | Output only. The custom domain that's to be verified. |
| `useCustomDomain` | boolean | Whether to use custom domain. |

### `GoogleCloudIdentitytoolkitAdminV2Email`

- Configuration options related to authenticating a user by their email address.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether email auth is enabled for the project or not. |
| `passwordRequired` | boolean | Whether a password is required for email auth or not. If true, both an email and password must be provided to sign in. If false, a user may sign in via either email/password or email link. |

### `GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig`

- Configuration for settings related to email privacy and public visibility. Settings in this config protect against email enumeration, but may make some trade-offs in user-friendliness.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enableImprovedEmailPrivacy` | boolean | Migrates the project to a state of improved email privacy. For example certain error codes are more generic to avoid giving away information on whether the account exists. In addition, this disables certain features that as a side-effect allow user enumeration. Enabling this toggle disables the fetchSignInMethodsForEmail functionality and changing the user's email to an unverified email. It is recommended to remove dependence on this functionality and enable this toggle to improve user privacy. |

### `GoogleCloudIdentitytoolkitAdminV2EmailTemplate`

- Email template. The subject and body fields can contain the following placeholders which will be replaced with the appropriate values: %LINK% - The link to use to redeem the send OOB code. %EMAIL% - The email where the email is being sent. %NEW_EMAIL% - The new email being set for the account (when applicable). %APP_NAME% - The Google Cloud project's display name. %DISPLAY_NAME% - The user's display name.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `body` | string | Email body |
| `bodyFormat` | string enum | Email body format |
| `customized` | boolean | Output only. Whether the body or subject of the email is customized. |
| `replyTo` | string | Reply-to address |
| `senderDisplayName` | string | Sender display name |
| `senderLocalPart` | string | Local part of From address |
| `subject` | string | Subject of the email |

### `GoogleCloudIdentitytoolkitAdminV2ForwardInboundCredentials`

- Indicates which credentials to pass to the registered Blocking Functions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `accessToken` | boolean | Whether to pass the user's OAuth identity provider's access token. |
| `idToken` | boolean | Whether to pass the user's OIDC identity provider's ID token. |
| `refreshToken` | boolean | Whether to pass the user's OAuth identity provider's refresh token. |

### `GoogleCloudIdentitytoolkitAdminV2HashConfig`

- History information of the hash algorithm and key. Different accounts' passwords may be generated by different version.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | Output only. Different password hash algorithms used in Identity Toolkit. |
| `memoryCost` | integer (int32) | Output only. Memory cost for hash calculation. Used by scrypt and other similar password derivation algorithms. See https://tools.ietf.org/html/rfc7914 for explanation of field. |
| `rounds` | integer (int32) | Output only. How many rounds for hash calculation. Used by scrypt and other similar password derivation algorithms. |
| `saltSeparator` | string | Output only. Non-printable character to be inserted between the salt and plain text password in base64. |
| `signerKey` | string | Output only. Signer key in base64. |

### `GoogleCloudIdentitytoolkitAdminV2IdpCertificate`

- The IDP's certificate data to verify the signature in the SAMLResponse issued by the IDP.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `x509Certificate` | string | The x509 certificate |

### `GoogleCloudIdentitytoolkitAdminV2IdpConfig`

- The SAML IdP (Identity Provider) configuration when the project acts as the relying party.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `idpCertificates` | array<GoogleCloudIdentitytoolkitAdminV2IdpCertificate> | IDP's public keys for verifying signature in the assertions. |
| `idpEntityId` | string | Unique identifier for all SAML entities. |
| `signRequest` | boolean | Indicates if outbounding SAMLRequest should be signed. |
| `ssoUrl` | string | URL to send Authentication request to. |

### `GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig`

- A pair of SAML RP-IDP configurations when the project acts as the relying party.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The config's display name set by developers. |
| `enabled` | boolean | True if allows the user to sign in with the provider. |
| `idpConfig` | GoogleCloudIdentitytoolkitAdminV2IdpConfig | The SAML IdP (Identity Provider) configuration when the project acts as the relying party. |
| `name` | string | The name of the InboundSamlConfig resource, for example: 'projects/my-awesome-project/inboundSamlConfigs/my-config-id'. Ignored during create requests. |
| `spConfig` | GoogleCloudIdentitytoolkitAdminV2SpConfig | The SAML SP (Service Provider) configuration when the project acts as the relying party to receive and accept an authentication assertion issued by a SAML identity provider. |

### `GoogleCloudIdentitytoolkitAdminV2Inheritance`

- Settings that the tenants will inherit from project level.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `emailSendingConfig` | boolean | Whether to allow the tenant to inherit custom domains, email templates, and custom SMTP settings. If true, email sent from tenant will follow the project level email sending configurations. If false (by default), emails will go with the default settings with no customizations. |

### `GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformRequest`

- Request for InitializeIdentityPlatform.
- Version: v2

### `GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformResponse`

- Response for InitializeIdentityPlatform. Empty for now.
- Version: v2

### `GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse`

- Response for DefaultSupportedIdpConfigs
- Version: v2

| Field | Type | Description |
|---|---|---|
| `defaultSupportedIdpConfigs` | array<GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig> | The set of configs. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpsResponse`

- Response for ListDefaultSupportedIdps
- Version: v2

| Field | Type | Description |
|---|---|---|
| `defaultSupportedIdps` | array<GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdp> | The set of configs. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse`

- Response for ListInboundSamlConfigs
- Version: v2

| Field | Type | Description |
|---|---|---|
| `inboundSamlConfigs` | array<GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig> | The set of configs. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse`

- Response for ListOAuthIdpConfigs
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `oauthIdpConfigs` | array<GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig> | The set of configs. |

### `GoogleCloudIdentitytoolkitAdminV2ListTenantsResponse`

- Response message for ListTenants.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to get the next page of results. |
| `tenants` | array<GoogleCloudIdentitytoolkitAdminV2Tenant> | A list of tenants under the given agent project. |

### `GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig`

- Configuration mobile links.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `domain` | string enum | Open code in app domain to use for app links and universal links. |

### `GoogleCloudIdentitytoolkitAdminV2MonitoringConfig`

- Configuration related to monitoring project activity.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `requestLogging` | GoogleCloudIdentitytoolkitAdminV2RequestLogging | Configuration for logging requests made to this project to Stackdriver Logging |

### `GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig`

- Options related to MultiFactor Authentication for the project.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enabledProviders` | array<string> | A list of usable second factors for this project. |
| `providerConfigs` | array<GoogleCloudIdentitytoolkitAdminV2ProviderConfig> | A list of usable second factors for this project along with their configurations. This field does not support phone based MFA, for that use the 'enabled_providers' field. |
| `state` | string enum | Whether MultiFactor Authentication has been enabled for this project. |

### `GoogleCloudIdentitytoolkitAdminV2MultiTenantConfig`

- Configuration related to multi-tenant functionality.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowTenants` | boolean | Whether this project can have tenants or not. |
| `defaultTenantLocation` | string | The default cloud parent org or folder that the tenant project should be created under. The parent resource name should be in the format of "/", such as "folders/123" or "organizations/456". If the value is not set, the tenant will be created under the same organization or folder as the agent project. |

### `GoogleCloudIdentitytoolkitAdminV2NotificationConfig`

- Configuration related to sending notifications to users.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `defaultLocale` | string | Default locale used for email and SMS in IETF BCP 47 format. |
| `sendEmail` | GoogleCloudIdentitytoolkitAdminV2SendEmail | Options for email sending. |
| `sendSms` | GoogleCloudIdentitytoolkitAdminV2SendSms | Options for SMS sending. |

### `GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig`

- Configuration options for authenticating with an OAuth IDP.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clientId` | string | The client id of an OAuth client. |
| `clientSecret` | string | The client secret of the OAuth client, to enable OIDC code flow. |
| `displayName` | string | The config's display name set by developers. |
| `enabled` | boolean | True if allows the user to sign in with the provider. |
| `issuer` | string | For OIDC Idps, the issuer identifier. |
| `name` | string | The name of the OAuthIdpConfig resource, for example: 'projects/my-awesome-project/oauthIdpConfigs/oauth-config-id'. Ignored during create requests. |
| `responseType` | GoogleCloudIdentitytoolkitAdminV2OAuthResponseType | The response type to request for in the OAuth authorization flow. You can set either `id_token` or `code` to true, but not both. Setting both types to be simultaneously true (`{code: true, id_token: true}`) is not yet supported. |

### `GoogleCloudIdentitytoolkitAdminV2OAuthResponseType`

- The response type to request for in the OAuth authorization flow. You can set either `id_token` or `code` to true, but not both. Setting both types to be simultaneously true (`{code: true, id_token: true}`) is not yet supported. See https://openid.net/specs/openid-connect-core-1_0.html#Authentication for a mapping of response type to OAuth 2.0 flow.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | boolean | If true, authorization code is returned from IdP's authorization endpoint. |
| `idToken` | boolean | If true, ID token is returned from IdP's authorization endpoint. |
| `token` | boolean | Do not use. The `token` response type is not supported at the moment. |

### `GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig`

- The configuration for the password policy on the project.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `forceUpgradeOnSignin` | boolean | Users must have a password compliant with the password policy to sign-in. |
| `lastUpdateTime` | string (google-datetime) | Output only. The last time the password policy on the project was updated. |
| `passwordPolicyEnforcementState` | string enum | Which enforcement mode to use for the password policy. |
| `passwordPolicyVersions` | array<GoogleCloudIdentitytoolkitAdminV2PasswordPolicyVersion> | Must be of length 1. Contains the strength attributes for the password policy. |

### `GoogleCloudIdentitytoolkitAdminV2PasswordPolicyVersion`

- The strength attributes for the password policy on the project.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `customStrengthOptions` | GoogleCloudIdentitytoolkitAdminV2CustomStrengthOptions | The custom strength options enforced by the password policy. |
| `schemaVersion` | integer (int32) | Output only. schema version number for the password policy |

### `GoogleCloudIdentitytoolkitAdminV2Permissions`

- Configuration related to restricting a user's ability to affect their account.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `disabledUserDeletion` | boolean | When true, end users cannot delete their account on the associated project through any of our API methods |
| `disabledUserSignup` | boolean | When true, end users cannot sign up for a new account on the associated project through any of our API methods |

### `GoogleCloudIdentitytoolkitAdminV2PhoneNumber`

- Configuration options related to authenticated a user by their phone number.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether phone number auth is enabled for the project or not. |
| `testPhoneNumbers` | object | A map of that can be used for phone auth testing. |

### `GoogleCloudIdentitytoolkitAdminV2ProviderConfig`

- ProviderConfig describes the supported MFA providers along with their configurations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Describes the state of the MultiFactor Authentication type. |
| `totpProviderConfig` | GoogleCloudIdentitytoolkitAdminV2TotpMfaProviderConfig | TOTP MFA provider config for this project. |

### `GoogleCloudIdentitytoolkitAdminV2QuotaConfig`

- Configuration related to quotas.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `signUpQuotaConfig` | GoogleCloudIdentitytoolkitAdminV2TemporaryQuota | Quota for the Signup endpoint, if overwritten. Signup quota is measured in sign ups per project per hour per IP. |

### `GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig`

- The reCAPTCHA Enterprise integration config.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `emailPasswordEnforcementState` | string enum | The reCAPTCHA config for email/password provider, containing the enforcement status. The email/password provider contains all email related user flows protected by reCAPTCHA. |
| `managedRules` | array<GoogleCloudIdentitytoolkitAdminV2RecaptchaManagedRule> | The managed rules for authentication action based on reCAPTCHA scores. The rules are shared across providers for a given tenant project. |
| `phoneEnforcementState` | string enum | The reCAPTCHA config for phone provider, containing the enforcement status. The phone provider contains all SMS related user flows protected by reCAPTCHA. |
| `recaptchaKeys` | array<GoogleCloudIdentitytoolkitAdminV2RecaptchaKey> | The reCAPTCHA keys. |
| `tollFraudManagedRules` | array<GoogleCloudIdentitytoolkitAdminV2RecaptchaTollFraudManagedRule> | The managed rules for the authentication action based on reCAPTCHA toll fraud risk scores. Toll fraud managed rules will only take effect when the phone_enforcement_state is AUDIT or ENFORCE and use_sms_toll_fraud_protection is true. |
| `useAccountDefender` | boolean | Whether to use the account defender for reCAPTCHA assessment. Defaults to `false`. |
| `useSmsBotScore` | boolean | Whether to use the rCE bot score for reCAPTCHA phone provider. Can only be true when the phone_enforcement_state is AUDIT or ENFORCE. |
| `useSmsTollFraudProtection` | boolean | Whether to use the rCE sms toll fraud protection risk score for reCAPTCHA phone provider. Can only be true when the phone_enforcement_state is AUDIT or ENFORCE. |

### `GoogleCloudIdentitytoolkitAdminV2RecaptchaKey`

- The reCAPTCHA key config. reCAPTCHA Enterprise offers different keys for different client platforms.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | string | The reCAPTCHA Enterprise key resource name, e.g. "projects/{project}/keys/{key}" |
| `type` | string enum | The client's platform type. |

### `GoogleCloudIdentitytoolkitAdminV2RecaptchaManagedRule`

- The config for a reCAPTCHA managed rule. Models a single interval \[start_score, end_score\]. The start_score is implicit. It is either the closest smaller end_score (if one is available) or 0. Intervals in aggregate span \[0, 1\] without overlapping.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `action` | string enum | The action taken if the reCAPTCHA score of a request is within the interval \[start_score, end_score\]. |
| `endScore` | number (float) | The end score (inclusive) of the score range for an action. Must be a value between 0.0 and 1.0, at 11 discrete values; e.g. 0, 0.1, 0.2, 0.3, ... 0.9, 1.0. A score of 0.0 indicates the riskiest request (likely a bot), whereas 1.0 indicates the safest request (likely a human). See https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment. |

### `GoogleCloudIdentitytoolkitAdminV2RecaptchaTollFraudManagedRule`

- The config for a reCAPTCHA toll fraud assessment managed rule. Models a single interval \[start_score, end_score\]. The end_score is implicit. It is either the closest smaller end_score (if one is available) or 0. Intervals in aggregate span \[0, 1\] without overlapping.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `action` | string enum | The action taken if the reCAPTCHA score of a request is within the interval \[start_score, end_score\]. |
| `startScore` | number (float) | The start score (inclusive) for an action. Must be a value between 0.0 and 1.0, at 11 discrete values; e.g. 0, 0.1, 0.2, 0.3, ... 0.9, 1.0. A score of 0.0 indicates the safest request (likely legitimate), whereas 1.0 indicates the riskiest request (likely toll fraud). See https://cloud.google.com/recaptcha-enterprise/docs/sms-fraud-detection#create-assessment-sms. |

### `GoogleCloudIdentitytoolkitAdminV2RequestLogging`

- Configuration for logging requests made to this project to Stackdriver Logging
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether logging is enabled for this project or not. |

### `GoogleCloudIdentitytoolkitAdminV2SendEmail`

- Options for email sending.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `callbackUri` | string | action url in email template. |
| `changeEmailTemplate` | GoogleCloudIdentitytoolkitAdminV2EmailTemplate | Email template for change email |
| `dnsInfo` | GoogleCloudIdentitytoolkitAdminV2DnsInfo | Information of custom domain DNS verification. |
| `legacyResetPasswordTemplate` | GoogleCloudIdentitytoolkitAdminV2EmailTemplate | Reset password email template for legacy Firebase V1 app. |
| `method` | string enum | The method used for sending an email. |
| `resetPasswordTemplate` | GoogleCloudIdentitytoolkitAdminV2EmailTemplate | Email template for reset password |
| `revertSecondFactorAdditionTemplate` | GoogleCloudIdentitytoolkitAdminV2EmailTemplate | Email template for reverting second factor addition emails |
| `smtp` | GoogleCloudIdentitytoolkitAdminV2Smtp | Use a custom SMTP relay |
| `verifyEmailTemplate` | GoogleCloudIdentitytoolkitAdminV2EmailTemplate | Email template for verify email |

### `GoogleCloudIdentitytoolkitAdminV2SendSms`

- Options for SMS sending.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `smsTemplate` | GoogleCloudIdentitytoolkitAdminV2SmsTemplate | Output only. The template to use when sending an SMS. |
| `useDeviceLocale` | boolean | Whether to use the accept_language header for SMS. |

### `GoogleCloudIdentitytoolkitAdminV2SignInConfig`

- Configuration related to local sign in methods.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowDuplicateEmails` | boolean | Whether to allow more than one account to have the same email. |
| `anonymous` | GoogleCloudIdentitytoolkitAdminV2Anonymous | Configuration options related to authenticating an anonymous user. |
| `email` | GoogleCloudIdentitytoolkitAdminV2Email | Configuration options related to authenticating a user by their email address. |
| `hashConfig` | GoogleCloudIdentitytoolkitAdminV2HashConfig | Output only. Hash config information. |
| `phoneNumber` | GoogleCloudIdentitytoolkitAdminV2PhoneNumber | Configuration options related to authenticated a user by their phone number. |

### `GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig`

- Configures the regions where users are allowed to send verification SMS for the project or tenant. This is based on the calling code of the destination phone number.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowByDefault` | GoogleCloudIdentitytoolkitAdminV2AllowByDefault | A policy of allowing SMS to every region by default and adding disallowed regions to a disallow list. |
| `allowlistOnly` | GoogleCloudIdentitytoolkitAdminV2AllowlistOnly | A policy of only allowing regions by explicitly adding them to an allowlist. |

### `GoogleCloudIdentitytoolkitAdminV2SmsTemplate`

- The template to use when sending an SMS.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `content` | string | Output only. The SMS's content. Can contain the following placeholders which will be replaced with the appropriate values: %APP_NAME% - For Android or iOS apps, the app's display name. For web apps, the domain hosting the application. %LOGIN_CODE% - The OOB code being sent in the SMS. |

### `GoogleCloudIdentitytoolkitAdminV2Smtp`

- Configuration for SMTP relay
- Version: v2

| Field | Type | Description |
|---|---|---|
| `host` | string | SMTP relay host |
| `password` | string | SMTP relay password |
| `port` | integer (int32) | SMTP relay port |
| `securityMode` | string enum | SMTP security mode. |
| `senderEmail` | string | Sender email for the SMTP relay |
| `username` | string | SMTP relay username |

### `GoogleCloudIdentitytoolkitAdminV2SpCertificate`

- The SP's certificate data for IDP to verify the SAMLRequest generated by the SP.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `expiresAt` | string (google-datetime) | Timestamp of the cert expiration instance. |
| `x509Certificate` | string | Self-signed public certificate. |

### `GoogleCloudIdentitytoolkitAdminV2SpConfig`

- The SAML SP (Service Provider) configuration when the project acts as the relying party to receive and accept an authentication assertion issued by a SAML identity provider.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `callbackUri` | string | Callback URI where responses from IDP are handled. |
| `spCertificates` | array<GoogleCloudIdentitytoolkitAdminV2SpCertificate> | Output only. Public certificates generated by the server to verify the signature in SAMLRequest in the SP-initiated flow. |
| `spEntityId` | string | Unique identifier for all SAML entities. |

### `GoogleCloudIdentitytoolkitAdminV2TemporaryQuota`

- Temporary quota increase / decrease
- Version: v2

| Field | Type | Description |
|---|---|---|
| `quota` | string (int64) | Corresponds to the 'refill_token_count' field in QuotaServer config |
| `quotaDuration` | string (google-duration) | How long this quota will be active for |
| `startTime` | string (google-datetime) | When this quota will take effect |

### `GoogleCloudIdentitytoolkitAdminV2Tenant`

- A Tenant contains configuration for the tenant in a multi-tenant project.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowPasswordSignup` | boolean | Whether to allow email/password user authentication. |
| `autodeleteAnonymousUsers` | boolean | Whether anonymous users will be auto-deleted after a period of 30 days. |
| `client` | GoogleCloudIdentitytoolkitAdminV2ClientPermissionConfig | Options related to how clients making requests on behalf of a project should be configured. |
| `disableAuth` | boolean | Whether authentication is disabled for the tenant. If true, the users under the disabled tenant are not allowed to sign-in. Admins of the disabled tenant are not able to manage its users. |
| `displayName` | string | Display name of the tenant. |
| `emailPrivacyConfig` | GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig | Configuration for settings related to email privacy and public visibility. |
| `enableAnonymousUser` | boolean | Whether to enable anonymous user authentication. |
| `enableEmailLinkSignin` | boolean | Whether to enable email link user authentication. |
| `hashConfig` | GoogleCloudIdentitytoolkitAdminV2HashConfig | Output only. Hash config information of a tenant for display on Pantheon. This can only be displayed on Pantheon to avoid the sensitive information to get accidentally leaked. Only returned in GetTenant response to restrict reading of this information. Requires firebaseauth.configs.getHashConfig permission on the agent project for returning this field. |
| `inheritance` | GoogleCloudIdentitytoolkitAdminV2Inheritance | Specify the settings that the tenant could inherit. |
| `mfaConfig` | GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig | The tenant-level configuration of MFA options. |
| `mobileLinksConfig` | GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig | Optional. Deprecated. Never launched. Configuration for settings related to univeral links (iOS) and app links (Android). |
| `monitoring` | GoogleCloudIdentitytoolkitAdminV2MonitoringConfig | Configuration related to monitoring project activity. |
| `name` | string | Output only. Resource name of a tenant. For example: "projects/{project-id}/tenants/{tenant-id}" |
| `passwordPolicyConfig` | GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig | The tenant-level password policy config |
| `recaptchaConfig` | GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig | The tenant-level reCAPTCHA config. |
| `smsRegionConfig` | GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig | Configures which regions are enabled for SMS verification code sending. |
| `testPhoneNumbers` | object | A map of pairs that can be used for MFA. The phone number should be in E.164 format (https://www.itu.int/rec/T-REC-E.164/) and a maximum of 10 pairs can be added (error will be thrown once exceeded). |

### `GoogleCloudIdentitytoolkitAdminV2TotpMfaProviderConfig`

- TotpMFAProviderConfig represents the TOTP based MFA provider.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `adjacentIntervals` | integer (int32) | The allowed number of adjacent intervals that will be used for verification to avoid clock skew. |

### `GoogleCloudIdentitytoolkitAdminV2Trigger`

- Synchronous Cloud Function with HTTP Trigger
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionUri` | string | HTTP URI trigger for the Cloud Function. |
| `updateTime` | string (google-datetime) | When the trigger was changed. |

### `GoogleCloudIdentitytoolkitV1Argon2Parameters`

- The parameters for Argon2 hashing algorithm.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associatedData` | string (byte) | The additional associated data, if provided, is appended to the hash value to provide an additional layer of security. A base64-encoded string if specified via JSON. |
| `hashLengthBytes` | integer (int32) | Required. The desired hash length in bytes. Minimum is 4 and maximum is 1024. |
| `hashType` | string enum | Required. Must not be HASH_TYPE_UNSPECIFIED. |
| `iterations` | integer (int32) | Required. The number of iterations to perform. Minimum is 1, maximum is 16. |
| `memoryCostKib` | integer (int32) | Required. The memory cost in kibibytes. Maximum is 32768. |
| `parallelism` | integer (int32) | Required. The degree of parallelism, also called threads or lanes. Minimum is 1, maximum is 16. |
| `version` | string enum | The version of the Argon2 algorithm. This defaults to VERSION_13 if not specified. |

### `GoogleCloudIdentitytoolkitV1AutoRetrievalInfo`

- The information required to auto-retrieve an SMS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appSignatureHash` | string | The Android app's signature hash for Google Play Service's SMS Retriever API. |

### `GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest`

- Request message for BatchDeleteAccounts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `force` | boolean | Whether to force deleting accounts that are not in disabled state. If false, only disabled accounts will be deleted, and accounts that are not disabled will be added to the `errors`. |
| `localIds` | array<string> | Required. List of user IDs to be deleted. |
| `tenantId` | string | If the accounts belong to an Identity Platform tenant, the ID of the tenant. If the accounts belong to a default Identity Platform project, the field is not needed. |

### `GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse`

- Response message to BatchDeleteAccounts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errors` | array<GoogleCloudIdentitytoolkitV1BatchDeleteErrorInfo> | Detailed error info for accounts that cannot be deleted. |

### `GoogleCloudIdentitytoolkitV1BatchDeleteErrorInfo`

- Error info for account failed to be deleted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `index` | integer (int32) | The index of the errored item in the original local_ids field. |
| `localId` | string | The corresponding user ID. |
| `message` | string | Detailed error message. |

### `GoogleCloudIdentitytoolkitV1CreateAuthUriRequest`

- Request message for CreateAuthUri.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appId` | string | — |
| `authFlowType` | string | Used for the Google provider. The type of the authentication flow to be used. If present, this should be `CODE_FLOW` to specify the authorization code flow. Otherwise, the default ID Token flow will be used. |
| `context` | string | An opaque string used to maintain contextual information between the authentication request and the callback from the IdP. |
| `continueUri` | string | A valid URL for the IdP to redirect the user back to. The URL cannot contain fragments or the reserved `state` query parameter. |
| `customParameter` | object | Additional customized query parameters to be added to the authorization URI. The following parameters are reserved and cannot be added: `client_id`, `response_type`, `scope`, `redirect_uri`, `state`. For the Microsoft provider, the Azure AD tenant to sign-in to can be specified in the `tenant` custom parameter. |
| `hostedDomain` | string | Used for the Google provider. The G Suite hosted domain of the user in order to restrict sign-in to users at that domain. |
| `identifier` | string | The email identifier of the user account to fetch associated providers for. At least one of the fields `identifier` and `provider_id` must be set. The length of the email address should be less than 256 characters and in the format of `name@domain.tld`. The email address should also match the RFC 822 (https://tools.ietf.org/html/rfc822) addr-spec production. |
| `oauthConsumerKey` | string | — |
| `oauthScope` | string | Additional space-delimited OAuth 2.0 scopes specifying the scope of the authentication request with the IdP. Used for OAuth 2.0 IdPs. For the Google provider, the authorization code flow will be used if this field is set. |
| `openidRealm` | string | — |
| `otaApp` | string | — |
| `providerId` | string | The provider ID of the IdP for the user to sign in with. This should be a provider ID enabled for sign-in, which is either from the list of default supported IdPs (https://cloud.google.com/identity-platform/docs/reference/rest/v2/defaultSupportedIdps/list), or of the format `oidc.*` or `saml.*`. Some examples are `google.com`, `facebook.com`, `oidc.testapp`, and `saml.testapp`. At least one of the fields `identifier` and `provider_id` must be set. |
| `sessionId` | string | A session ID that can be verified against in SignInWithIdp to prevent session fixation attacks. If absent, a random string will be generated and returned as the session ID. |
| `tenantId` | string | The ID of the Identity Platform tenant to create an authorization URI or lookup an email identifier for. If not set, the operation will be performed in the default Identity Platform instance in the project. |

### `GoogleCloudIdentitytoolkitV1CreateAuthUriResponse`

- Response message for CreateAuthUri.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allProviders` | array<string> | — |
| `authUri` | string | The authorization URI for the requested provider. Present only when a provider ID is set in the request. |
| `captchaRequired` | boolean | Whether a CAPTCHA is needed because there have been too many failed login attempts by the user. Present only when a registered email identifier is set in the request. |
| `forExistingProvider` | boolean | Whether the user has previously signed in with the provider ID in the request. Present only when a registered email identifier is set in the request. |
| `kind` | string | — |
| `providerId` | string | The provider ID from the request, if provided. |
| `registered` | boolean | Whether the email identifier represents an existing account. Present only when an email identifier is set in the request. |
| `sessionId` | string | The session ID from the request, or a random string generated by CreateAuthUri if absent. It is used to prevent session fixation attacks. |
| `signinMethods` | array<string> | The list of sign-in methods that the user has previously used. Each element is one of `password`, `emailLink`, or the provider ID of an IdP. Present only when a registered email identifier is set in the request. If email enumeration protection (https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection) is enabled, this method returns an empty list. |

### `GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest`

- Request message for CreateSessionCookie.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `idToken` | string | Required. A valid Identity Platform ID token. |
| `tenantId` | string | The tenant ID of the Identity Platform tenant the account belongs to. |
| `validDuration` | string (int64) | The number of seconds until the session cookie expires. Specify a duration in seconds, between five minutes and fourteen days, inclusively. |

### `GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse`

- Response message for CreateSessionCookie.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sessionCookie` | string | The session cookie that has been created from the Identity Platform ID token specified in the request. It is in the form of a JSON Web Token (JWT). Always present. |

### `GoogleCloudIdentitytoolkitV1DeleteAccountRequest`

- Request message for DeleteAccount.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delegatedProjectNumber` | string (int64) | — |
| `idToken` | string | The Identity Platform ID token of the account to delete. Require to be specified for requests from end users that lack Google OAuth 2.0 credential. Authenticated requests bearing a Google OAuth2 credential with proper permissions may pass local_id to specify the account to delete alternatively. |
| `localId` | string | The ID of user account to delete. Specifying this field requires a Google OAuth 2.0 credential with proper permissions (https://cloud.google.com/identity-platform/docs/access-control). Requests from users lacking the credential should pass an ID token instead. |
| `targetProjectId` | string | The ID of the project which the account belongs to. Should only be specified in authenticated requests that specify local_id of an account. |
| `tenantId` | string | The ID of the tenant that the account belongs to, if applicable. Only require to be specified for authenticated requests bearing a Google OAuth 2.0 credential that specify local_id of an account that belongs to an Identity Platform tenant. |

### `GoogleCloudIdentitytoolkitV1DeleteAccountResponse`

- Response message for DeleteAccount.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |

### `GoogleCloudIdentitytoolkitV1DownloadAccountResponse`

- Response message for DownloadAccount.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `nextPageToken` | string | If there are more accounts to be downloaded, a token that can be passed back to DownloadAccount to get more accounts. Otherwise, this is blank. |
| `users` | array<GoogleCloudIdentitytoolkitV1UserInfo> | All accounts belonging to the project/tenant limited by max_results in the request. |

### `GoogleCloudIdentitytoolkitV1EmailInfo`

- Information about email MFA.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `emailAddress` | string | Email address that a MFA verification should be sent to. |

### `GoogleCloudIdentitytoolkitV1EmailTemplate`

- Email template
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | string | Email body |
| `customized` | boolean | Whether the body or subject of the email is customized. |
| `disabled` | boolean | Whether the template is disabled. If true, a default template will be used. |
| `format` | string enum | Email body format |
| `from` | string | From address of the email |
| `fromDisplayName` | string | From display name |
| `fromLocalPart` | string | Local part of From address |
| `locale` | string | Value is in III language code format (e.g. "zh-CN", "es"). Both '-' and '\_' separators are accepted. |
| `replyTo` | string | Reply-to address |
| `subject` | string | Subject of the email |

### `GoogleCloudIdentitytoolkitV1ErrorInfo`

- Error information explaining why an account cannot be uploaded. batch upload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `index` | integer (int32) | The index of the item, range is \[0, request.size - 1\] |
| `message` | string | Detailed error message |

### `GoogleCloudIdentitytoolkitV1FederatedUserIdentifier`

- Federated user identifier at an Identity Provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `providerId` | string | The ID of supported identity providers. This should be a provider ID enabled for sign-in, which is either from the list of default supported IdPs (https://cloud.google.com/identity-platform/docs/reference/rest/v2/defaultSupportedIdps/list), or of the format `oidc.*` or `saml.*`. Some examples are `google.com`, `facebook.com`, `oidc.testapp`, and `saml.testapp`. |
| `rawId` | string | The user ID of the account at the third-party Identity Provider specified by `provider_id`. |

### `GoogleCloudIdentitytoolkitV1GetAccountInfoRequest`

- Request message for GetAccountInfo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delegatedProjectNumber` | string (int64) | — |
| `email` | array<string> | The email address of one or more accounts to fetch. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the RFC 822 (https://tools.ietf.org/html/rfc822) addr-spec production. Should only be specified by authenticated requests from a developer. |
| `federatedUserId` | array<GoogleCloudIdentitytoolkitV1FederatedUserIdentifier> | The federated user identifier of one or more accounts to fetch. Should only be specified by authenticated requests bearing a Google OAuth 2.0 credential with proper permissions (https://cloud.google.com/identity-platform/docs/access-control). |
| `idToken` | string | The Identity Platform ID token of the account to fetch. Require to be specified for requests from end users. |
| `initialEmail` | array<string> | The initial email of one or more accounts to fetch. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the RFC 822 (https://tools.ietf.org/html/rfc822) addr-spec production. Should only be specified by authenticated requests from a developer. |
| `localId` | array<string> | The ID of one or more accounts to fetch. Should only be specified by authenticated requests bearing a Google OAuth 2.0 credential with proper permissions (https://cloud.google.com/identity-platform/docs/access-control). |
| `phoneNumber` | array<string> | The phone number of one or more accounts to fetch. Should only be specified by authenticated requests from a developer and should be in E.164 format, for example, +15555555555. |
| `targetProjectId` | string | The ID of the Google Cloud project that the account or the Identity Platform tenant specified by `tenant_id` belongs to. Should only be specified by authenticated requests bearing a Google OAuth 2.0 credential with proper permissions (https://cloud.google.com/identity-platform/docs/access-control). |
| `tenantId` | string | The ID of the tenant that the account belongs to. Should only be specified by authenticated requests from a developer. |

### `GoogleCloudIdentitytoolkitV1GetAccountInfoResponse`

- Response message for GetAccountInfo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `users` | array<GoogleCloudIdentitytoolkitV1UserInfo> | The information of specific user account(s) matching the parameters in the request. |

### `GoogleCloudIdentitytoolkitV1GetOobCodeRequest`

- Request message for GetOobCode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `androidInstallApp` | boolean | If an associated android app can handle the OOB code, whether or not to install the android app on the device where the link is opened if the app is not already installed. |
| `androidMinimumVersion` | string | If an associated android app can handle the OOB code, the minimum version of the app. If the version on the device is lower than this version then the user is taken to Google Play Store to upgrade the app. |
| `androidPackageName` | string | If an associated android app can handle the OOB code, the Android package name of the android app that will handle the callback when this OOB code is used. This will allow the correct app to open if it is already installed, or allow Google Play Store to open to the correct app if it is not yet installed. |
| `canHandleCodeInApp` | boolean | When set to true, the OOB code link will be be sent as a Universal Link or an Android App Link and will be opened by the corresponding app if installed. If not set, or set to false, the OOB code will be sent to the web widget first and then on continue will redirect to the app if installed. |
| `captchaResp` | string | For a PASSWORD_RESET request, a reCaptcha response is required when the system detects possible abuse activity. In those cases, this is the response from the reCaptcha challenge used to verify the caller. |
| `challenge` | string | — |
| `clientType` | string enum | The client type: web, Android or iOS. Required when reCAPTCHA Enterprise protection is enabled. |
| `continueUrl` | string | The Url to continue after user clicks the link sent in email. This is the url that will allow the web widget to handle the OOB code. |
| `dynamicLinkDomain` | string | In order to ensure that the url used can be easily opened up in iOS or android, we create a Firebase Dynamic Link (https://firebase.google.com/docs/dynamic-links). Most Identity Platform projects will only have one Dynamic Link domain enabled, and can leave this field blank. This field contains a specified Dynamic Link domain for projects that have multiple enabled. |
| `email` | string | The account's email address to send the OOB code to, and generally the email address of the account that needs to be updated. Required for PASSWORD_RESET, EMAIL_SIGNIN, and VERIFY_EMAIL. Only required for VERIFY_AND_CHANGE_EMAIL requests when return_oob_link is set to true. In this case, it is the original email of the user. |
| `iOSAppStoreId` | string | If an associated iOS app can handle the OOB code, the App Store id of this app. This will allow App Store to open to the correct app if the app is not yet installed. |
| `iOSBundleId` | string | If an associated iOS app can handle the OOB code, the iOS bundle id of this app. This will allow the correct app to open if it is already installed. |
| `idToken` | string | An ID token for the account. It is required for VERIFY_AND_CHANGE_EMAIL and VERIFY_EMAIL requests unless return_oob_link is set to true. |
| `linkDomain` | string | Optional. In order to ensure that the url used can be easily opened in iOS or Android, we create a Hosting link '/\_\_/auth/links'. This optional field contains the domain to use when constructing a Hosting link. If not set, '.firebaseapp.com' domain will be used. |
| `newEmail` | string | The email address the account is being updated to. Required only for VERIFY_AND_CHANGE_EMAIL requests. |
| `recaptchaVersion` | string enum | The reCAPTCHA version of the reCAPTCHA token in the captcha_response. |
| `requestType` | string enum | Required. The type of out-of-band (OOB) code to send. Depending on this value, other fields in this request will be required and/or have different meanings. There are 4 different OOB codes that can be sent: \* PASSWORD_RESET \* EMAIL_SIGNIN \* VERIFY_EMAIL \* VERIFY_AND_CHANGE_EMAIL |
| `returnOobLink` | boolean | Whether the confirmation link containing the OOB code should be returned in the response (no email is sent). Used when a developer wants to construct the email template and send it on their own. By default this is false; to specify this field, and to set it to true, it requires a Google OAuth 2.0 credential with proper permissions (https://cloud.google.com/identity-platform/docs/access-control) |
| `targetProjectId` | string | The Project ID of the Identity Platform project which the account belongs to. To specify this field, it requires a Google OAuth 2.0 credential with proper permissions (https://cloud.google.com/identity-platform/docs/access-control). |
| `tenantId` | string | The tenant ID of the Identity Platform tenant the account belongs to. |
| `userIp` | string | The IP address of the caller. Required only for PASSWORD_RESET requests. |

### `GoogleCloudIdentitytoolkitV1GetOobCodeResponse`

- Response message for GetOobCode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | If return_oob_link is false in the request, the email address the verification was sent to. |
| `kind` | string | — |
| `oobCode` | string | If return_oob_link is true in the request, the OOB code to send. |
| `oobLink` | string | If return_oob_link is true in the request, the OOB link to be sent to the user. This returns the constructed link including Firebase Dynamic Link (https://firebase.google.com/docs/dynamic-links) related parameters. |

### `GoogleCloudIdentitytoolkitV1GetProjectConfigResponse`

- Response message for GetProjectConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowPasswordUser` | boolean | Whether to allow password account sign up. This field is only returned for authenticated calls from a developer. |
| `apiKey` | string | Google Cloud API key. This field is only returned for authenticated calls from a developer. |
| `authorizedDomains` | array<string> | Authorized domains for widget redirect. |
| `changeEmailTemplate` | GoogleCloudIdentitytoolkitV1EmailTemplate | Email template for change email. This field is only returned for authenticated calls from a developer. |
| `dynamicLinksDomain` | string | The Firebase Dynamic Links domain used to construct links for redirects to native apps. |
| `enableAnonymousUser` | boolean | Whether anonymous user is enabled. This field is only returned for authenticated calls from a developer. |
| `idpConfig` | array<GoogleCloudIdentitytoolkitV1IdpConfig> | OAuth2 provider config. This field is only returned for authenticated calls from a developer. |
| `legacyResetPasswordTemplate` | GoogleCloudIdentitytoolkitV1EmailTemplate | Reset password email template for legacy Firebase V1 app. This field is only returned for authenticated calls from a developer. |
| `projectId` | string | The project id of the retrieved configuration. |
| `resetPasswordTemplate` | GoogleCloudIdentitytoolkitV1EmailTemplate | Email template for reset password. This field is only returned for authenticated calls from a developer. |
| `revertSecondFactorAdditionTemplate` | GoogleCloudIdentitytoolkitV1EmailTemplate | Email template for reverting second factor additions. This field is only returned for authenticated calls from a developer. |
| `useEmailSending` | boolean | Whether to use email sending. This field is only returned for authenticated calls from a developer. |
| `verifyEmailTemplate` | GoogleCloudIdentitytoolkitV1EmailTemplate | Email template for verify email. This field is only returned for authenticated calls from a developer. |

### `GoogleCloudIdentitytoolkitV1GetRecaptchaParamResponse`

- Response message for GetRecaptchaParam.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `producerProjectNumber` | string | The producer project number used to generate PIA tokens |
| `recaptchaSiteKey` | string | The reCAPTCHA v2 site key used to invoke the reCAPTCHA service. Always present. |
| `recaptchaStoken` | string | — |

### `GoogleCloudIdentitytoolkitV1GetSessionCookiePublicKeysResponse`

- Response message for GetSessionCookiePublicKeys.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keys` | array<GoogleCloudIdentitytoolkitV1OpenIdConnectKey> | Public keys of the session cookie signer, formatted as JSON Web Keys (JWK) (https://tools.ietf.org/html/rfc7517). |

### `GoogleCloudIdentitytoolkitV1IdpConfig`

- Config of an identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | OAuth2 client ID. |
| `enabled` | boolean | True if allows the user to sign in with the provider. |
| `experimentPercent` | integer (int32) | Percent of users who will be prompted/redirected federated login for this IdP |
| `provider` | string enum | — |
| `secret` | string | OAuth2 client secret. |
| `whitelistedAudiences` | array<string> | Whitelisted client IDs for audience check. |

### `GoogleCloudIdentitytoolkitV1IssueSamlResponseRequest`

- Request message for IssueSamlResponse.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `idToken` | string | The Identity Platform ID token. It will be verified and then converted to a new SAMLResponse. |
| `rpId` | string | Relying Party identifier, which is the audience of issued SAMLResponse. |
| `samlAppEntityId` | string | SAML app entity id specified in Google Admin Console for each app. If developers want to redirect to a third-party app rather than a G Suite app, they'll probably they need this. When it's used, we'll return a RelayState. This includes a SAMLRequest, which can be used to trigger a SP-initiated SAML flow to redirect to the real app. |

### `GoogleCloudIdentitytoolkitV1IssueSamlResponseResponse`

- Response for IssueSamlResponse request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acsEndpoint` | string | The ACS endpoint which consumes the returned SAMLResponse. |
| `email` | string | Email of the user. |
| `firstName` | string | First name of the user. |
| `isNewUser` | boolean | Whether the logged in user was created by this request. |
| `lastName` | string | Last name of the user. |
| `relayState` | string | Generated RelayState. |
| `samlResponse` | string | Signed SAMLResponse created for the Relying Party. |

### `GoogleCloudIdentitytoolkitV1MfaEnrollment`

- Information on which multi-factor authentication (MFA) providers are enabled for an account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Display name for this mfa option e.g. "corp cell phone". |
| `emailInfo` | GoogleCloudIdentitytoolkitV1EmailInfo | Contains information specific to email MFA. |
| `enrolledAt` | string (google-datetime) | Timestamp when the account enrolled this second factor. |
| `mfaEnrollmentId` | string | ID of this MFA option. |
| `phoneInfo` | string | Normally this will show the phone number associated with this enrollment. In some situations, such as after a first factor sign in, it will only show the obfuscated version of the associated phone number. |
| `totpInfo` | GoogleCloudIdentitytoolkitV1TotpInfo | Contains information specific to TOTP MFA. |
| `unobfuscatedPhoneInfo` | string | Output only. Unobfuscated phone_info. |

### `GoogleCloudIdentitytoolkitV1MfaFactor`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Display name for this mfa option e.g. "corp cell phone". |
| `phoneInfo` | string | Phone number to receive OTP for MFA. |

### `GoogleCloudIdentitytoolkitV1MfaInfo`

- Multi-factor authentication related information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enrollments` | array<GoogleCloudIdentitytoolkitV1MfaEnrollment> | The second factors the user has enrolled. |

### `GoogleCloudIdentitytoolkitV1OpenIdConnectKey`

- Represents a public key of the session cookie signer, formatted as a JSON Web Key (JWK) (https://tools.ietf.org/html/rfc7517).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alg` | string | Signature algorithm. |
| `e` | string | Exponent for the RSA public key, it is represented as the base64url encoding of the value's big endian representation. |
| `kid` | string | Unique string to identify this key. |
| `kty` | string | Key type. |
| `n` | string | Modulus for the RSA public key, it is represented as the base64url encoding of the value's big endian representation. |
| `use` | string | Key use. |

### `GoogleCloudIdentitytoolkitV1ProviderUserInfo`

- Information about the user as provided by various Identity Providers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The user's display name at the Identity Provider. |
| `email` | string | The user's email address at the Identity Provider. |
| `federatedId` | string | The user's identifier at the Identity Provider. |
| `phoneNumber` | string | The user's phone number at the Identity Provider. |
| `photoUrl` | string | The user's profile photo URL at the Identity Provider. |
| `providerId` | string | The ID of the Identity Provider. |
| `rawId` | string | The user's raw identifier directly returned from Identity Provider. |
| `screenName` | string | The user's screen_name at Twitter or login name at GitHub. |

### `GoogleCloudIdentitytoolkitV1QueryUserInfoRequest`

- Request message for QueryUserInfo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expression` | array<GoogleCloudIdentitytoolkitV1SqlExpression> | Query conditions used to filter results. If more than one is passed, only the first SqlExpression is evaluated. |
| `limit` | string (int64) | The maximum number of accounts to return with an upper limit of \__500_\_. Defaults to \_500\_. Only valid when `return_user_info` is set to `true`. |
| `offset` | string (int64) | The number of accounts to skip from the beginning of matching records. Only valid when `return_user_info` is set to `true`. |
| `order` | string enum | The order for sorting query result. Defaults to \__ascending_\_ order. Only valid when `return_user_info` is set to `true`. |
| `returnUserInfo` | boolean | If `true`, this request will return the accounts matching the query. If `false`, only the \__count_\_ of accounts matching the query will be returned. Defaults to `true`. |
| `sortBy` | string enum | The field to use for sorting user accounts. Defaults to `USER_ID`. Note: when `phone_number` is specified in `expression`, the result ignores the sorting. Only valid when `return_user_info` is set to `true`. |
| `tenantId` | string | The ID of the tenant to which the result is scoped. |

### `GoogleCloudIdentitytoolkitV1QueryUserInfoResponse`

- Response message for QueryUserInfo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `recordsCount` | string (int64) | If `return_user_info` in the request is true, this is the number of returned accounts in this message. Otherwise, this is the total number of accounts matching the query. |
| `userInfo` | array<GoogleCloudIdentitytoolkitV1UserInfo> | If `return_user_info` in the request is true, this is the accounts matching the query. |

### `GoogleCloudIdentitytoolkitV1ResetPasswordRequest`

- Request message for ResetPassword.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Optional. The email of the account to be modified. Specify this and the old password in order to change an account's password without using an out-of-band code. |
| `newPassword` | string | The new password to be set for this account. Specifying this field will result in a change to the account and consume the out-of-band code if one was specified and it was of type PASSWORD_RESET. |
| `oldPassword` | string | The current password of the account to be modified. Specify this and email to change an account's password without using an out-of-band code. |
| `oobCode` | string | An out-of-band (OOB) code generated by GetOobCode request. Specify only this parameter (or only this parameter and a tenant ID) to get the out-of-band code's type in the response without mutating the account's state. Only a PASSWORD_RESET out-of-band code can be consumed via this method. |
| `tenantId` | string | Optional. The tenant ID of the Identity Platform tenant the account belongs to. |

### `GoogleCloudIdentitytoolkitV1ResetPasswordResponse`

- Response message for ResetPassword.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | The email associated with the out-of-band code that was used. |
| `kind` | string | — |
| `mfaInfo` | GoogleCloudIdentitytoolkitV1MfaEnrollment | — |
| `newEmail` | string | — |
| `requestType` | string enum | — |

### `GoogleCloudIdentitytoolkitV1SendVerificationCodeRequest`

- Request message for SendVerificationCode. 'captcha_response' is required when reCAPTCHA enterprise is enabled, or otherwise at least one of (`ios_receipt` and `ios_secret`), `recaptcha_token`, or `play_integrity_token` must be specified to verify the verification code is being sent on behalf of a real app and not an emulator.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoRetrievalInfo` | GoogleCloudIdentitytoolkitV1AutoRetrievalInfo | Android only. Used by Google Play Services to identify the app for auto-retrieval. |
| `captchaResponse` | string | Optional. The reCAPTCHA Enterprise token provided by the reCAPTCHA client-side integration. Required when reCAPTCHA enterprise is enabled. |
| `clientType` | string enum | Optional. The client type, web, android or ios. Required when reCAPTCHA Enterprise is enabled. |
| `iosReceipt` | string | Receipt of successful iOS app token validation. At least one of (`ios_receipt` and `ios_secret`), `recaptcha_token`, or `play_integrity_token` must be specified to verify the verification code is being sent on behalf of a real app and not an emulator, if 'captcha_response' is not used (reCAPTCHA enterprise is not enabled). This should come from the response of verifyIosClient. If present, the caller should also provide the `ios_secret`, as well as a bundle ID in the `x-ios-bundle-identifier` header, which must match the bundle ID from the verifyIosClient request. |
| `iosSecret` | string | Secret delivered to iOS app as a push notification. Should be passed with an `ios_receipt` as well as the `x-ios-bundle-identifier` header. |
| `phoneNumber` | string | The phone number to send the verification code to in E.164 format. |
| `playIntegrityToken` | string | Android only. Used to assert application identity in place of a recaptcha token (and safety_net_token). At least one of (`ios_receipt` and `ios_secret`), `recaptcha_token`, , or `play_integrity_token` must be specified to verify the verification code is being sent on behalf of a real app and not an emulator, if 'captcha_response' is not used (reCAPTCHA enterprise is not enabled). A Play Integrity Token can be generated via the PlayIntegrity API (https://developer.android.com/google/play/integrity) with applying SHA256 to the `phone_number` field as the nonce. |
| `recaptchaToken` | string | Recaptcha token for app verification. At least one of (`ios_receipt` and `ios_secret`), `recaptcha_token`, or `play_integrity_token` must be specified to verify the verification code is being sent on behalf of a real app and not an emulator, if 'captcha_response' is not used (reCAPTCHA enterprise is not enabled). The recaptcha should be generated by calling getRecaptchaParams and the recaptcha token will be generated on user completion of the recaptcha challenge. |
| `recaptchaVersion` | string enum | Optional. The reCAPTCHA version of the reCAPTCHA token in the captcha_response. Required when reCAPTCHA Enterprise is enabled. |
| `safetyNetToken` | string | Android only. Safety Net has been deprecated. Use play_integrity_token instead. |
| `tenantId` | string | Tenant ID of the Identity Platform tenant the user is signing in to. |

### `GoogleCloudIdentitytoolkitV1SendVerificationCodeResponse`

- Response message for SendVerificationCode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sessionInfo` | string | Encrypted session information. This can be used in signInWithPhoneNumber to authenticate the phone number. |

### `GoogleCloudIdentitytoolkitV1SetAccountInfoRequest`

- Request message for SetAccountInfo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `captchaChallenge` | string | — |
| `captchaResponse` | string | The response from reCaptcha challenge. This is required when the system detects possible abuse activities. |
| `createdAt` | string (int64) | The timestamp in milliseconds when the account was created. |
| `customAttributes` | string | JSON formatted custom attributes to be stored in the Identity Platform ID token. Specifying this field requires a Google OAuth 2.0 credential with proper \[permissions\] (https://cloud.google.com/identity-platform/docs/access-control). |
| `delegatedProjectNumber` | string (int64) | — |
| `deleteAttribute` | array<string> | The account's attributes to be deleted. |
| `deleteProvider` | array<string> | The Identity Providers to unlink from the user's account. |
| `disableUser` | boolean | If true, marks the account as disabled, meaning the user will no longer be able to sign-in. |
| `displayName` | string | The user's new display name to be updated in the account's attributes. The length of the display name must be less than or equal to 256 characters. |
| `email` | string | The user's new email to be updated in the account's attributes. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the RFC 822 (https://tools.ietf.org/html/rfc822) addr-spec production. If email enumeration protection (https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection) is enabled, the email cannot be changed by the user without verifying the email first, but it can be changed by an administrator. |
| `emailVerified` | boolean | Whether the user's email has been verified. Specifying this field requires a Google OAuth 2.0 credential with proper \[permissions\] (https://cloud.google.com/identity-platform/docs/access-control). |
| `idToken` | string | A valid Identity Platform ID token. Required when attempting to change user-related information. |
| `instanceId` | string | — |
| `lastLoginAt` | string (int64) | The timestamp in milliseconds when the account last logged in. |
| `linkProviderUserInfo` | GoogleCloudIdentitytoolkitV1ProviderUserInfo | The provider to be linked to the user's account. Specifying this field requires a Google OAuth 2.0 credential with proper \[permissions\] (https://cloud.google.com/identity-platform/docs/access-control). |
| `localId` | string | The ID of the user. Specifying this field requires a Google OAuth 2.0 credential with proper \[permissions\] (https://cloud.google.com/identity-platform/docs/access-control). For requests from end-users, an ID token should be passed instead. |
| `mfa` | GoogleCloudIdentitytoolkitV1MfaInfo | The multi-factor authentication related information to be set on the user's account. This will overwrite any previous multi-factor related information on the account. Specifying this field requires a Google OAuth 2.0 credential with proper \[permissions\] (https://cloud.google.com/identity-platform/docs/access-control). |
| `oobCode` | string | The out-of-band code to be applied on the user's account. The following out-of-band code types are supported: \* VERIFY_EMAIL \* RECOVER_EMAIL \* REVERT_SECOND_FACTOR_ADDITION \* VERIFY_AND_CHANGE_EMAIL |
| `password` | string | The user's new password to be updated in the account's attributes. The password must be at least 6 characters long. |
| `phoneNumber` | string | The phone number to be updated in the account's attributes. |
| `photoUrl` | string | The user's new photo URL for the account's profile photo to be updated in the account's attributes. The length of the URL must be less than or equal to 2048 characters. |
| `provider` | array<string> | The Identity Providers that the account should be associated with. |
| `returnSecureToken` | boolean | Whether or not to return an ID and refresh token. Should always be true. |
| `targetProjectId` | string | The project ID for the project that the account belongs to. Specifying this field requires Google OAuth 2.0 credential with proper \[permissions\] (https://cloud.google.com/identity-platform/docs/access-control). Requests from end users should pass an Identity Platform ID token instead. |
| `tenantId` | string | The tenant ID of the Identity Platform tenant that the account belongs to. Requests from end users should pass an Identity Platform ID token rather than setting this field. |
| `upgradeToFederatedLogin` | boolean | Whether the account should be restricted to only using federated login. |
| `validSince` | string (int64) | Specifies the minimum timestamp in seconds for an Identity Platform ID token to be considered valid. |

### `GoogleCloudIdentitytoolkitV1SetAccountInfoResponse`

- Response message for SetAccountInfo
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The account's display name. |
| `email` | string | The account's email address. |
| `emailVerified` | boolean | Whether the account's email has been verified. |
| `expiresIn` | string (int64) | The number of seconds until the Identity Platform ID token expires. |
| `idToken` | string | An Identity Platform ID token for the account. This is used for legacy user sign up. |
| `kind` | string | — |
| `localId` | string | The ID of the authenticated user. |
| `newEmail` | string | The new email that has been set on the user's account attributes. |
| `passwordHash` | string | Deprecated. No actual password hash is currently returned. |
| `photoUrl` | string | The user's photo URL for the account's profile photo. |
| `providerUserInfo` | array<GoogleCloudIdentitytoolkitV1ProviderUserInfo> | The linked Identity Providers on the account. |
| `refreshToken` | string | A refresh token for the account. This is used for legacy user sign up. |

### `GoogleCloudIdentitytoolkitV1SignInWithCustomTokenRequest`

- Request message for SignInWithCustomToken.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delegatedProjectNumber` | string (int64) | — |
| `instanceId` | string | — |
| `returnSecureToken` | boolean | Should always be true. |
| `tenantId` | string | The ID of the Identity Platform tenant the user is signing in to. If present, the ID should match the tenant_id in the token. |
| `token` | string | Required. The custom Auth token asserted by the developer. The token should be a JSON Web Token (JWT) (https://tools.ietf.org/html/rfc7519) that includes the claims listed in the API reference (https://cloud.google.com/identity-platform/docs/reference/rest/client/) under the "Custom Token Claims" section. |

### `GoogleCloudIdentitytoolkitV1SignInWithCustomTokenResponse`

- Response message for SignInWithCustomToken.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expiresIn` | string (int64) | The number of seconds until the ID token expires. |
| `idToken` | string | An Identity Platform ID token for the authenticated user. |
| `isNewUser` | boolean | Whether the authenticated user was created by this request. |
| `kind` | string | — |
| `refreshToken` | string | An Identity Platform refresh token for the authenticated user. |

### `GoogleCloudIdentitytoolkitV1SignInWithEmailLinkRequest`

- Request message for SignInWithEmailLink
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Required. The email address the sign-in link was sent to. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the RFC 822 (https://tools.ietf.org/html/rfc822) addr-spec production. |
| `idToken` | string | A valid ID token for an Identity Platform account. If passed, this request will link the email address to the user represented by this ID token and enable sign-in with email link on the account for the future. |
| `oobCode` | string | Required. The out-of-band code from the email link. |
| `tenantId` | string | The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. |

### `GoogleCloudIdentitytoolkitV1SignInWithEmailLinkResponse`

- Response message for SignInWithEmailLink.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | The email the user signed in with. Always present in the response. |
| `expiresIn` | string (int64) | The number of seconds until the ID token expires. |
| `idToken` | string | An Identity Platform ID token for the authenticated user. |
| `isNewUser` | boolean | Whether the authenticated user was created by this request. |
| `kind` | string | — |
| `localId` | string | The ID of the authenticated user. Always present in the response. |
| `mfaInfo` | array<GoogleCloudIdentitytoolkitV1MfaEnrollment> | Info on which multi-factor authentication providers are enabled. Present if the user needs to complete the sign-in using multi-factor authentication. |
| `mfaPendingCredential` | string | An opaque string that functions as proof that the user has successfully passed the first factor check. |
| `refreshToken` | string | Refresh token for the authenticated user. |

### `GoogleCloudIdentitytoolkitV1SignInWithGameCenterRequest`

- Request message for SignInWithGameCenter
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The user's Game Center display name. |
| `gamePlayerId` | string | The user's Game Center game player ID. A unique identifier for a player of the game. https://developer.apple.com/documentation/gamekit/gkplayer/3113960-gameplayerid |
| `idToken` | string | A valid ID token for an Identity Platform account. If present, this request will link the Game Center player ID to the account represented by this ID token. |
| `playerId` | string | Required. The user's Game Center player ID. Deprecated by Apple. Pass `playerID` along with `gamePlayerID` and `teamPlayerID` to initiate the migration of a user's Game Center player ID to `gamePlayerID`. |
| `publicKeyUrl` | string | Required. The URL to fetch the Apple public key in order to verify the given signature is signed by Apple. |
| `salt` | string | Required. A random string used to generate the given signature. |
| `signature` | string | Required. The verification signature data generated by Apple. |
| `teamPlayerId` | string | The user's Game Center team player ID. A unique identifier for a player of all the games that you distribute using your developer account. https://developer.apple.com/documentation/gamekit/gkplayer/3174857-teamplayerid |
| `tenantId` | string | The ID of the Identity Platform tenant the user is signing in to. |
| `timestamp` | string (int64) | Required. The time when the signature was created by Apple, in milliseconds since the epoch. |

### `GoogleCloudIdentitytoolkitV1SignInWithGameCenterResponse`

- Response message for SignInWithGameCenter
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Display name of the authenticated user. |
| `expiresIn` | string (int64) | The number of seconds until the ID token expires. |
| `gamePlayerId` | string | The user's Game Center game player ID. A unique identifier for a player of the game. https://developer.apple.com/documentation/gamekit/gkplayer/3113960-gameplayerid |
| `idToken` | string | An Identity Platform ID token for the authenticated user. |
| `isNewUser` | boolean | Whether the logged in user was created by this request. |
| `localId` | string | The ID of the authenticated user. Always present in the response. |
| `playerId` | string | The user's Game Center player ID. Pass `playerID` along with `gamePlayerID` and `teamPlayerID` to initiate the migration of a user's Game Center player ID to `gamePlayerID`. |
| `refreshToken` | string | An Identity Platform refresh token for the authenticated user. |
| `teamPlayerId` | string | The user's Game Center team player ID. A unique identifier for a player of all the games that you distribute using your developer account. https://developer.apple.com/documentation/gamekit/gkplayer/3174857-teamplayerid |

### `GoogleCloudIdentitytoolkitV1SignInWithIdpRequest`

- Request message for SignInWithIdp.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCreate` | boolean | — |
| `delegatedProjectNumber` | string (int64) | — |
| `idToken` | string | A valid Identity Platform ID token. If passed, the user's account at the IdP will be linked to the account represented by this ID token. |
| `pendingIdToken` | string | — |
| `pendingToken` | string | An opaque string from a previous SignInWithIdp response. If set, it can be used to repeat the sign-in operation from the previous SignInWithIdp operation. This may be present if the user needs to confirm their account information as part of a previous federated login attempt, or perform account linking. |
| `postBody` | string | If the user is signing in with an authorization response obtained via a previous CreateAuthUri authorization request, this is the body of the HTTP POST callback from the IdP, if present. Otherwise, if the user is signing in with a manually provided IdP credential, this should be a URL-encoded form that contains the credential (e.g. an ID token or access token for OAuth 2.0 IdPs) and the provider ID of the IdP that issued the credential. For example, if the user is signing in to the Google provider using a Google ID token, this should be set to id_token`=[GOOGLE_ID_TOKEN]&providerId=google.com`, where `[GOOGLE_ID_TOKEN]` should be replaced with the Google ID token. If the user is signing in to the Facebook provider using a Facebook authentication token, this should be set to id_token`=[FACEBOOK_AUTHENTICATION_TOKEN]&providerId=facebook. com&nonce= [NONCE]`, where `[FACEBOOK_AUTHENTICATION_TOKEN]` should be replaced with the Facebook authentication token. Nonce is required for validating the token. The request will fail if no nonce is provided. If the user is signing in to the Facebook provider using a Facebook access token, this should be set to access_token`=[FACEBOOK_ACCESS_TOKEN]&providerId=facebook. com`, where `[FACEBOOK_ACCESS_TOKEN]` should be replaced with the Facebook access token. If the user is signing in to the Twitter provider using a Twitter OAuth 1.0 credential, this should be set to access_token`=[TWITTER_ACCESS_TOKEN]&oauth_token_secret= [TWITTER_TOKEN_SECRET]&providerId=twitter.com`, where `[TWITTER_ACCESS_TOKEN]` and `[TWITTER_TOKEN_SECRET]` should be replaced with the Twitter OAuth access token and Twitter OAuth token secret respectively. |
| `requestUri` | string | Required. The URL to which the IdP redirects the user back. This can be set to `http://localhost` if the user is signing in with a manually provided IdP credential. |
| `returnIdpCredential` | boolean | Whether or not to return OAuth credentials from the IdP on the following errors: `FEDERATED_USER_ID_ALREADY_LINKED` and `EMAIL_EXISTS`. |
| `returnRefreshToken` | boolean | Whether or not to return the OAuth refresh token from the IdP, if available. |
| `returnSecureToken` | boolean | Should always be true. |
| `sessionId` | string | The session ID returned from a previous CreateAuthUri call. This field is verified against that session ID to prevent session fixation attacks. Required if the user is signing in with an authorization response from a previous CreateAuthUri authorization request. |
| `tenantId` | string | The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. |

### `GoogleCloudIdentitytoolkitV1SignInWithIdpResponse`

- Response message for SignInWithIdp.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `context` | string | The opaque string set in CreateAuthUri that is used to maintain contextual information between the authentication request and the callback from the IdP. |
| `dateOfBirth` | string | The date of birth for the user's account at the IdP. |
| `displayName` | string | The display name for the user's account at the IdP. |
| `email` | string | The email address of the user's account at the IdP. |
| `emailRecycled` | boolean | Whether or not there is an existing Identity Platform user account with the same email address but linked to a different account at the same IdP. Only present if the "One account per email address" setting is enabled and the email address at the IdP is verified. |
| `emailVerified` | boolean | Whether the user account's email address is verified. |
| `errorMessage` | string | The error message returned if `return_idp_credential` is set to `true` and either the `FEDERATED_USER_ID_ALREADY_LINKED` or `EMAIL_EXISTS` error is encountered. This field's value is either `FEDERATED_USER_ID_ALREADY_LINKED` or `EMAIL_EXISTS`. |
| `expiresIn` | string (int64) | The number of seconds until the Identity Platform ID token expires. |
| `federatedId` | string | The user's account ID at the IdP. Always present in the response. |
| `firstName` | string | The first name for the user's account at the IdP. |
| `fullName` | string | The full name for the user's account at the IdP. |
| `idToken` | string | An Identity Platform ID token for the authenticated user. |
| `inputEmail` | string | — |
| `isNewUser` | boolean | Whether or not a new Identity Platform account was created for the authenticated user. |
| `kind` | string | — |
| `language` | string | The language preference for the user's account at the IdP. |
| `lastName` | string | The last name for the user's account at the IdP. |
| `localId` | string | The ID of the authenticated Identity Platform user. Always present in the response. |
| `mfaInfo` | array<GoogleCloudIdentitytoolkitV1MfaEnrollment> | Info on which multi-factor authentication providers are enabled for the account. Present if the user needs to complete the sign-in using multi-factor authentication. |
| `mfaPendingCredential` | string | An opaque string that functions as proof that the user has successfully passed the first factor authentication. |
| `needConfirmation` | boolean | Whether or not there is an existing Identity Platform user account with the same email address as the current account signed in at the IdP, and the account's email address is not verified at the IdP. The user will need to sign in to the existing Identity Platform account and then link the current credential from the IdP to it. Only present if the "One account per email address" setting is enabled. |
| `needEmail` | boolean | — |
| `nickName` | string | The nickname for the user's account at the IdP. |
| `oauthAccessToken` | string | The OAuth access token from the IdP, if available. |
| `oauthAuthorizationCode` | string | The OAuth 2.0 authorization code, if available. Only present for the Google provider. |
| `oauthExpireIn` | integer (int32) | The number of seconds until the OAuth access token from the IdP expires. |
| `oauthIdToken` | string | The OpenID Connect ID token from the IdP, if available. |
| `oauthRefreshToken` | string | The OAuth 2.0 refresh token from the IdP, if available and `return_refresh_token` is set to `true`. |
| `oauthTokenSecret` | string | The OAuth 1.0 token secret from the IdP, if available. Only present for the Twitter provider. |
| `originalEmail` | string | The main (top-level) email address of the user's Identity Platform account, if different from the email address at the IdP. Only present if the "One account per email address" setting is enabled. |
| `pendingToken` | string | An opaque string that can be used as a credential from the IdP the user is signing into. The pending token obtained here can be set in a future SignInWithIdp request to sign the same user in with the IdP again. |
| `photoUrl` | string | The URL of the user's profile picture at the IdP. |
| `providerId` | string | The provider ID of the IdP that the user is signing in to. Always present in the response. |
| `rawUserInfo` | string | The stringified JSON response containing all the data corresponding to the user's account at the IdP. |
| `refreshToken` | string | An Identity Platform refresh token for the authenticated user. |
| `screenName` | string | The screen name for the user's account at the Twitter IdP or the login name for the user's account at the GitHub IdP. |
| `tenantId` | string | The value of the `tenant_id` field in the request. |
| `timeZone` | string | The time zone for the user's account at the IdP. |
| `verifiedProvider` | array<string> | A list of provider IDs that the user can sign in to in order to resolve a `need_confirmation` error. Only present if `need_confirmation` is set to `true`. |

### `GoogleCloudIdentitytoolkitV1SignInWithPasswordRequest`

- Request message for SignInWithPassword.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `captchaChallenge` | string | — |
| `captchaResponse` | string | The reCAPTCHA token provided by the reCAPTCHA client-side integration. reCAPTCHA Enterprise uses it for risk assessment. Required when reCAPTCHA Enterprise is enabled. |
| `clientType` | string enum | The client type, web, android or ios. Required when reCAPTCHA Enterprise is enabled. |
| `delegatedProjectNumber` | string (int64) | — |
| `email` | string | Required. The email the user is signing in with. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the RFC 822 (https://tools.ietf.org/html/rfc822) addr-spec production. |
| `idToken` | string | — |
| `instanceId` | string | — |
| `password` | string | Required. The password the user provides to sign in to the account. |
| `pendingIdToken` | string | — |
| `recaptchaVersion` | string enum | The reCAPTCHA version of the reCAPTCHA token in the captcha_response. |
| `returnSecureToken` | boolean | Should always be true. |
| `tenantId` | string | The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform instance in the project. |

### `GoogleCloudIdentitytoolkitV1SignInWithPasswordResponse`

- Response message for SignInWithPassword.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The user's display name stored in the account's attributes. |
| `email` | string | The email of the authenticated user. Always present in the response. |
| `expiresIn` | string (int64) | The number of seconds until the Identity Platform ID token expires. |
| `idToken` | string | An Identity Platform ID token for the authenticated user. |
| `kind` | string | — |
| `localId` | string | The ID of the authenticated user. Always present in the response. |
| `mfaInfo` | array<GoogleCloudIdentitytoolkitV1MfaEnrollment> | Info on which multi-factor authentication providers are enabled for the account. Present if the user needs to complete the sign-in using multi-factor authentication. |
| `mfaPendingCredential` | string | An opaque string that functions as proof that the user has successfully passed the first factor authentication. |
| `oauthAccessToken` | string | The OAuth2 access token. |
| `oauthAuthorizationCode` | string | — |
| `oauthExpireIn` | integer (int32) | The access token expiration time in seconds. |
| `profilePicture` | string | The user's profile picture stored in the account's attributes. |
| `refreshToken` | string | An Identity Platform refresh token for the authenticated user. |
| `registered` | boolean | Whether the email is for an existing account. Always true. |
| `userNotifications` | array<GoogleCloudIdentitytoolkitV1UserNotification> | Warning notifications for the user. |

### `GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberRequest`

- Request message for SignInWithPhoneNumber.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | User-entered verification code from an SMS sent to the user's phone. |
| `idToken` | string | A valid ID token for an Identity Platform account. If passed, this request will link the phone number to the user represented by this ID token if the phone number is not in use, or will reauthenticate the user if the phone number is already linked to the user. |
| `operation` | string enum | — |
| `phoneNumber` | string | The user's phone number to sign in with. This is necessary in the case of uing a temporary proof, in which case it must match the phone number that was authenticated in the request that generated the temporary proof. This field is ignored if a session info is passed. |
| `sessionInfo` | string | Encrypted session information from the response of sendVerificationCode. In the case of authenticating with an SMS code this must be specified, but in the case of using a temporary proof it can be unspecified. |
| `temporaryProof` | string | A proof of the phone number verification, provided from a previous signInWithPhoneNumber request. If this is passed, the caller must also pass in the phone_number field the phone number that was verified in the previous request. |
| `tenantId` | string | The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. |
| `verificationProof` | string | Do not use. |

### `GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberResponse`

- Response message for SignInWithPhoneNumber.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expiresIn` | string (int64) | The number of seconds until the ID token expires. |
| `idToken` | string | Identity Platform ID token for the authenticated user. |
| `isNewUser` | boolean | Whether the authenticated user was created by this request. |
| `localId` | string | The id of the authenticated user. Present in the case of a successful authentication. In the case when the phone could be verified but the account operation could not be performed, a temporary proof will be returned instead. |
| `phoneNumber` | string | Phone number of the authenticated user. Always present in the response. |
| `refreshToken` | string | Refresh token for the authenticated user. |
| `temporaryProof` | string | A proof of the phone number verification, provided if a phone authentication is successful but the user operation fails. This happens when the request tries to link a phone number to a user with an ID token or reauthenticate with an ID token but the phone number is linked to a different user. |
| `temporaryProofExpiresIn` | string (int64) | The number of seconds until the temporary proof expires. |
| `verificationProof` | string | Do not use. |
| `verificationProofExpiresIn` | string (int64) | Do not use. |

### `GoogleCloudIdentitytoolkitV1SignUpRequest`

- Request message for SignUp.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `captchaChallenge` | string | — |
| `captchaResponse` | string | The reCAPTCHA token provided by the reCAPTCHA client-side integration. reCAPTCHA Enterprise uses it for assessment. Required when reCAPTCHA enterprise is enabled. |
| `clientType` | string enum | The client type: web, Android or iOS. Required when enabling reCAPTCHA enterprise protection. |
| `disabled` | boolean | Whether the user will be disabled upon creation. Disabled accounts are inaccessible except for requests bearing a Google OAuth2 credential with proper permissions (https://cloud.google.com/identity-platform/docs/access-control). |
| `displayName` | string | The display name of the user to be created. |
| `email` | string | The email to assign to the created user. The length of the email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the RFC 822 (https://tools.ietf.org/html/rfc822) addr-spec production. An anonymous user will be created if not provided. |
| `emailVerified` | boolean | Whether the user's email is verified. Specifying this field requires a Google OAuth 2.0 credential with the proper permissions (https://cloud.google.com/identity-platform/docs/access-control). |
| `idToken` | string | A valid ID token for an Identity Platform user. If set, this request will link the authentication credential to the user represented by this ID token. For a non-admin request, both the `email` and `password` fields must be set. For an admin request, `local_id` must not be set. |
| `instanceId` | string | — |
| `localId` | string | The ID of the user to create. The ID must be unique within the project that the user is being created under. Specifying this field requires a Google OAuth 2.0 credential with the proper permissions (https://cloud.google.com/identity-platform/docs/access-control). |
| `mfaInfo` | array<GoogleCloudIdentitytoolkitV1MfaFactor> | The multi-factor authentication providers for the user to create. |
| `password` | string | The password to assign to the created user. The password must be be at least 6 characters long. If set, the `email` field must also be set. |
| `phoneNumber` | string | The phone number of the user to create. Specifying this field requires a Google OAuth 2.0 credential with the proper permissions (https://cloud.google.com/identity-platform/docs/access-control). |
| `photoUrl` | string | The profile photo url of the user to create. |
| `recaptchaVersion` | string enum | The reCAPTCHA version of the reCAPTCHA token in the captcha_response. |
| `targetProjectId` | string | The project ID of the project which the user should belong to. Specifying this field requires a Google OAuth 2.0 credential with the proper permissions (https://cloud.google.com/identity-platform/docs/access-control). If this is not set, the target project is inferred from the scope associated to the Bearer access token. |
| `tenantId` | string | The ID of the Identity Platform tenant to create a user under. If not set, the user will be created under the default Identity Platform project. |

### `GoogleCloudIdentitytoolkitV1SignUpResponse`

- Response message for SignUp.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The created user's display name. |
| `email` | string | The created user's email. |
| `expiresIn` | string (int64) | The number of seconds until the ID token expires. |
| `idToken` | string | An Identity Platform ID token for the created user. This field is only set for non-admin requests. |
| `kind` | string | — |
| `localId` | string | The ID of the created user. Always present in the response. |
| `refreshToken` | string | An Identity Platform refresh token for the created user. This field is only set for non-admin requests. |

### `GoogleCloudIdentitytoolkitV1SqlExpression`

- Query conditions used to filter results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | A case insensitive string that the account's email should match. Only one of `email`, `phone_number`, or `user_id` should be specified in a SqlExpression. If more than one is specified, only the first (in that order) will be applied. |
| `phoneNumber` | string | A string that the account's phone number should match. Only one of `email`, `phone_number`, or `user_id` should be specified in a SqlExpression. If more than one is specified, only the first (in that order) will be applied. |
| `userId` | string | A string that the account's local ID should match. Only one of `email`, `phone_number`, or `user_id` should be specified in a SqlExpression If more than one is specified, only the first (in that order) will be applied. |

### `GoogleCloudIdentitytoolkitV1TotpInfo`

- Information about TOTP MFA.
- Version: v1

### `GoogleCloudIdentitytoolkitV1UploadAccountRequest`

- Request message for UploadAccount.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowOverwrite` | boolean | Whether to overwrite an existing account in Identity Platform with a matching `local_id` in the request. If true, the existing account will be overwritten. If false, an error will be returned. |
| `argon2Parameters` | GoogleCloudIdentitytoolkitV1Argon2Parameters | The parameters for Argon2 hashing algorithm. |
| `blockSize` | integer (int32) | The block size parameter used by the STANDARD_SCRYPT hashing function. This parameter, along with parallelization and cpu_mem_cost help tune the resources needed to hash a password, and should be tuned as processor speeds and memory technologies advance. |
| `cpuMemCost` | integer (int32) | The CPU memory cost parameter to be used by the STANDARD_SCRYPT hashing function. This parameter, along with block_size and cpu_mem_cost help tune the resources needed to hash a password, and should be tuned as processor speeds and memory technologies advance. |
| `delegatedProjectNumber` | string (int64) | — |
| `dkLen` | integer (int32) | The desired key length for the STANDARD_SCRYPT hashing function. Must be at least 1. |
| `hashAlgorithm` | string | Required. The hashing function used to hash the account passwords. Must be one of the following: \* HMAC_SHA256 \* HMAC_SHA1 \* HMAC_MD5 \* SCRYPT \* PBKDF_SHA1 \* MD5 \* HMAC_SHA512 \* SHA1 \* BCRYPT \* PBKDF2_SHA256 \* SHA256 \* SHA512 \* STANDARD_SCRYPT \* ARGON2 |
| `memoryCost` | integer (int32) | Memory cost for hash calculation. Only required when the hashing function is SCRYPT. |
| `parallelization` | integer (int32) | The parallelization cost parameter to be used by the STANDARD_SCRYPT hashing function. This parameter, along with block_size and cpu_mem_cost help tune the resources needed to hash a password, and should be tuned as processor speeds and memory technologies advance. |
| `passwordHashOrder` | string enum | Password and salt order when verify password. |
| `rounds` | integer (int32) | The number of rounds used for hash calculation. Only required for the following hashing functions: \* MD5 \* SHA1 \* SHA256 \* SHA512 \* PBKDF_SHA1 \* PBKDF2_SHA256 \* SCRYPT |
| `saltSeparator` | string (byte) | One or more bytes to be inserted between the salt and plain text password. For stronger security, this should be a single non-printable character. |
| `sanityCheck` | boolean | If true, the service will do the following list of checks before an account is uploaded: \* Duplicate emails \* Duplicate federated IDs \* Federated ID provider validation If the duplication exists within the list of accounts to be uploaded, it will prevent the entire list from being uploaded. If the email or federated ID is a duplicate of a user already within the project/tenant, the account will not be uploaded, but the rest of the accounts will be unaffected. If false, these checks will be skipped. |
| `signerKey` | string (byte) | The signer key used to hash the password. Required for the following hashing functions: \* SCRYPT, \* HMAC_MD5, \* HMAC_SHA1, \* HMAC_SHA256, \* HMAC_SHA512 |
| `tenantId` | string | The ID of the Identity Platform tenant the account belongs to. |
| `users` | array<GoogleCloudIdentitytoolkitV1UserInfo> | A list of accounts to upload. `local_id` is required for each user; everything else is optional. |

### Shape of `CreateAuthUriResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "allProviders": "array<string>",
  "authUri": "string",
  "captchaRequired": "boolean",
  "forExistingProvider": "boolean",
  "kind": "string",
  "providerId": "string",
  "registered": "boolean",
  "sessionId": "string",
  "signinMethods": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) of `identitytoolkit` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://identitytoolkit.googleapis.com/$discovery/rest?version=v3 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
