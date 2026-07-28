# security-identity

| Name | Description | Path |
|------|-------------|------|
| PasswordVault | Per-user Credential Locker for storing/retrieving `PasswordCredential` objects. | [password-vault.md](./password-vault.md) |
| PasswordCredential | Resource/user name/password tuple stored in the Credential Locker. | [password-credential.md](./password-credential.md) |
| KeyCredentialManager | Provisions and manages Windows Hello key credentials (RSA 2048-bit). | [key-credential-manager.md](./key-credential-manager.md) |
| KeyCredential | A provisioned key credential; sign/derive operations backed by Windows Hello. | [key-credential.md](./key-credential.md) |
| UserConsentVerifier | Prompts a Windows Hello/PIN/biometric re-verification for a sensitive action. | [user-consent-verifier.md](./user-consent-verifier.md) |
| UserConsentVerificationResult | Result enum for `UserConsentVerifier` verification requests. | [user-consent-verification-result.md](./user-consent-verification-result.md) |
| WebAuthenticationBroker | Browser-based OAuth 2.0 authentication against arbitrary identity providers. | [web-authentication-broker.md](./web-authentication-broker.md) |
| WebAuthenticationCoreManager | Web Account Manager (WAM) broker: tokens for Microsoft account / Microsoft Entra ID. | [web-authentication-core-manager.md](./web-authentication-core-manager.md) |
| WebAccountProvider | Represents a web account authentication provider (MSA, AAD). | [web-account-provider.md](./web-account-provider.md) |
| CryptographicBuffer | Random data generation, encoding conversions, and buffer comparison helpers. | [cryptographic-buffer.md](./cryptographic-buffer.md) |
| HashAlgorithmProvider | Cryptographic hashing (MD5/SHA1/SHA256/SHA384/SHA512). | [hash-algorithm-provider.md](./hash-algorithm-provider.md) |
| SymmetricKeyAlgorithmProvider | Symmetric-key algorithms (AES, DES, 3DES, RC2, RC4). | [symmetric-key-algorithm-provider.md](./symmetric-key-algorithm-provider.md) |
| AsymmetricKeyAlgorithmProvider | Asymmetric-key algorithms (RSA, ECDSA, ECDH). | [asymmetric-key-algorithm-provider.md](./asymmetric-key-algorithm-provider.md) |
| DataProtectionProvider | Descriptor-scoped async encryption/decryption of data or streams. | [data-protection-provider.md](./data-protection-provider.md) |
| Certificate | Represents an X.509 certificate. | [certificate.md](./certificate.md) |
| CertificateEnrollmentManager | Creates certificate requests, imports PFX data, installs certificate chains. | [certificate-enrollment-manager.md](./certificate-enrollment-manager.md) |
| Windows Hello and passkeys | Concept overview tying together `KeyCredentialManager`/`UserConsentVerifier` and FIDO2/WebAuthn passkeys. | [windows-hello-passkeys.md](./windows-hello-passkeys.md) |
| App capability declarations | Manifest capabilities gating access to protected APIs/resources. | [app-capabilities.md](./app-capabilities.md) |
| AppContainer and packaged-app security boundaries | Process isolation and security boundary model for packaged apps. | [appcontainer.md](./appcontainer.md) |
