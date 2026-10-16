# security-identity

| Name | Description | Path |
|------|-------------|------|
| Age signals (User.GetUserAgeRangeAsync / GetAgeVerificationStatusAsync) | Privacy-preserving Windows Age APIs on Windows.System.User that return a coarse age group and an age-verification status. | [age-signals.md](./age-signals.md) |
| App capability declarations | Packaged apps declare the capability needed for protected APIs or resources in the package manifest (Package.appxmanifest). | [app-capabilities.md](./app-capabilities.md) |
| AppContainer and packaged-app security boundaries | The process-isolation sandbox that packaged apps run in; processes access only resources explicitly granted via declared capabilities. | [appcontainer.md](./appcontainer.md) |
| AsymmetricKeyAlgorithmProvider | Represents a provider of asymmetric (public/private) key algorithms (RSA, ECDSA, ECDH). | [asymmetric-key-algorithm-provider.md](./asymmetric-key-algorithm-provider.md) |
| CertificateEnrollmentManager | Static class for creating PKCS #10 certificate requests, importing PFX data, and installing certificate chains into the app container. | [certificate-enrollment-manager.md](./certificate-enrollment-manager.md) |
| Certificate | Represents a cryptography (X.509) certificate. | [certificate.md](./certificate.md) |
| CryptographicBuffer | Static class with data-management helpers for cryptographic operations: random data generation, encoding conversions, and buffer comparison. | [cryptographic-buffer.md](./cryptographic-buffer.md) |
| DataProtectionProvider | Cryptographic provider that asynchronously encrypts and decrypts static data or data streams, scoped by a protection descriptor. | [data-protection-provider.md](./data-protection-provider.md) |
| Fingerprint biometrics (UserConsentVerifier how-to) | Official fingerprint how-to using UserConsentVerifier; verification uses any Windows Hello method, not fingerprint only. | [fingerprint-biometrics.md](./fingerprint-biometrics.md) |
| HashAlgorithmProvider | Represents a cryptographic hash provider. | [hash-algorithm-provider.md](./hash-algorithm-provider.md) |
| KeyCredentialManager | Static class for basic management of key credentials (RSA 2048-bit asymmetric keys) used for Windows Hello and passwordless authentication. | [key-credential-manager.md](./key-credential-manager.md) |
| KeyCredential | Represents a key credential, an RSA 2048-bit asymmetric key that represents a user's identity for an application. | [key-credential.md](./key-credential.md) |
| OAuth2Manager (Windows App SDK OAuth 2.0) | Performs the OAuth 2.0 authorization code flow with PKCE for desktop apps such as WinUI 3, using the user's default browser. | [oauth2-manager.md](./oauth2-manager.md) |
| PasswordCredential | Represents the password credential store: a single resource / user name / password tuple used with PasswordVault. | [password-credential.md](./password-credential.md) |
| PasswordVault | Represents a Credential Locker of credentials specific to a user. | [password-vault.md](./password-vault.md) |
| Share certificates between Windows apps | Quickstart for authenticating multiple Windows apps to a web service with the same client certificate, including PFX import. | [share-certificates.md](./share-certificates.md) |
| Smart cards | Windows.Devices.SmartCards gets reader and card info, transmits APDU commands, provisions TPM virtual smart cards, and emulates smart cards (HCE) on supported devices. | [smart-cards.md](./smart-cards.md) |
| SymmetricKeyAlgorithmProvider | Represents a provider of symmetric key algorithms (AES, DES, 3DES, RC2, RC4). | [symmetric-key-algorithm-provider.md](./symmetric-key-algorithm-provider.md) |
| UserConsentVerificationResult | Enum describing the result of a UserConsentVerifier verification operation. | [user-consent-verification-result.md](./user-consent-verification-result.md) |
| UserConsentVerifier | Static class that checks for a verification device (Windows Hello PIN, biometric, or fingerprint reader) and performs a verification prompt. | [user-consent-verifier.md](./user-consent-verifier.md) |
| Web Account Manager in WinUI 3 (AccountsSettingsPaneInterop / MSAL.NET + WAM) | How a WinUI 3 desktop app uses Windows Web Account Manager (WAM) via HWND interop to sign in with Microsoft or Microsoft Entra ID accounts and call Microsoft Graph. | [web-account-manager.md](./web-account-manager.md) |
| WebAccountProvider | Represents a web account authentication provider, such as a Microsoft account or a Microsoft Entra ID tenant, used with WebAuthenticationCoreManager. | [web-account-provider.md](./web-account-provider.md) |
| WebAuthenticationBroker | Static class that starts a browser-based OAuth authentication operation and watches for a redirect to a known callback URI. | [web-authentication-broker.md](./web-authentication-broker.md) |
| WebAuthenticationCoreManager | Static class with core methods for obtaining tokens from web account providers; the WinRT API underlying Web Account Manager (WAM). | [web-authentication-core-manager.md](./web-authentication-core-manager.md) |
| Windows Hello and passkeys | Windows Hello replaces reusable passwords with device-bound two-factor authentication; passkeys are the FIDO2/WebAuthn form of the same key-pair model. | [windows-hello-passkeys.md](./windows-hello-passkeys.md) |
