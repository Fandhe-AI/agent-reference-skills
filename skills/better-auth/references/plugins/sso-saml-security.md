# SSO: SAML response validation

How the SSO plugin validates SAML responses and which checks you can tune. Every option sits under `saml` in the plugin options.

## Signature / Usage

The ACS endpoint, `{baseURL}/sso/saml2/sp/acs/{providerId}`, runs these checks on every SAML response before it signs anyone in:

1. **Size limit**: the encoded response must fit within `maxResponseSize`.
2. **One assertion**: the response must contain exactly one assertion.
3. **Signature**: the response or assertion signature must verify against the IdP certificate. When the provider sets `wantAssertionsSigned`, the assertion must carry its own signature as well.
4. **Algorithms**: the response's algorithms must be allowed.
5. **Timestamps**: the current time must fall between `NotBefore` and `NotOnOrAfter`.
6. **Audience, recipient, and destination**: the response must be addressed to this service provider and its ACS URL.
7. **InResponseTo**: the response must answer an AuthnRequest this server sent, unless IdP-initiated SSO is allowed or `enableInResponseToValidation` is `false`.
8. **Replay**: the assertion ID must not have been used before.

A failed check redirects to the error URL with `error` set to the lowercased error code (`saml_error` when the error has none) and `error_description` set to the message.

### InResponseTo validation

InResponseTo validation stops injected unsolicited responses, replayed responses, and responses swapped in from another provider. It is on by default. With `allowIdpInitiated: true`, it still checks every response that carries `InResponseTo`, but it accepts responses without one. Better Auth stores each AuthnRequest ID as a verification value for `requestTTL` (default 5 minutes), and the matching response consumes it once. Verification values live in secondary storage if you configure it, and in the database if you don't, so validation works across multiple instances. Replay protection always needs the database.

A response without `InResponseTo` is IdP-initiated, and Better Auth rejects it until you enable IdP-initiated SSO. To accept IdP-initiated sign-in, keep validation on and set `allowIdpInitiated: true`.

Do not set `enableInResponseToValidation: false` to get there. It turns correlation off for every SAML provider:

- Unsolicited responses are accepted even when `allowIdpInitiated` is `false`.
- Responses that cite an unknown, expired, or already used request ID are accepted.
- The check that a response belongs to the provider that started sign-in is skipped.

To give users more time at the IdP login page, raise `requestTTL`:

```typescript
sso({
  saml: {
    requestTTL: 10 * 60 * 1000, // 10 minutes, in milliseconds
  },
})
```

| `error` | `error_description` | Cause | Fix |
| --- | --- | --- | --- |
| `invalid_saml_response` | `Unknown or expired request ID` | The response cites an unknown or already used request ID, or the request is older than `requestTTL`. | Have the user start sign-in again from your app. If users often need longer than `requestTTL` at the IdP, raise `requestTTL`. |
| `invalid_saml_response` | `Provider mismatch` | The response reached the ACS of a provider other than the one that started sign-in. | Configure the IdP to post to the ACS URL of the provider that started sign-in. |
| `unsolicited_response` | `IdP-initiated SSO not allowed` | The response has no `InResponseTo`, and `allowIdpInitiated` is `false`. | Have the user start sign-in from your app, or set `allowIdpInitiated: true`. |
| `invalid_state` | `SSO provider reference missing or invalid` | The stored request has no valid provider reference. | Have the user start sign-in again from your app. |

### Assertion replay protection

Replay protection stops an attacker from submitting a captured assertion a second time. It is **always on**. Each assertion ID is reserved until `NotOnOrAfter` plus `clockSkew`.

The reservation needs database-backed verification storage. With `secondaryStorage` configured, set `verification.storeInDatabase: true`, or every SAML sign-in fails at this step.

| `error` | `error_description` | Cause | Fix |
| --- | --- | --- | --- |
| `replay_detected` | `SAML assertion has already been used` | The assertion ID was already used. | Have the user start sign-in again from your app. |

### Timestamp validation

Timestamp validation stops expired and future-dated assertions. It rejects a response when the current time is before `NotBefore` minus `clockSkew`, or after `NotOnOrAfter` plus `clockSkew`. `clockSkew` allows for small time differences between your server and the IdP, and defaults to 5 minutes.

Set `requireTimestamps: true` unless an IdP you rely on sends neither `NotBefore` nor `NotOnOrAfter`. SAML2Int requires them, although SAML Core makes them optional. With the default, `false`, Better Auth accepts an assertion with neither condition and logs a warning.

```typescript
sso({
  saml: {
    clockSkew: 60_000, // 1 minute, in milliseconds
    requireTimestamps: true,
  },
})
```

| `error` | `error_description` | Cause | Fix |
| --- | --- | --- | --- |
| `saml_error` | `SAML assertion is not yet valid` | The current time is before `NotBefore` minus `clockSkew`. | If your server's clock and the IdP's differ, sync them, or raise `clockSkew` to cover the difference. |
| `saml_error` | `SAML assertion has expired` | The current time is after `NotOnOrAfter` plus `clockSkew`. | If your server's clock and the IdP's differ, sync them, or raise `clockSkew` to cover the difference. |
| `saml_error` | `SAML assertion missing required timestamp conditions` | `requireTimestamps` is on and the assertion has neither. | Configure the IdP to send `NotOnOrAfter`. |

### Algorithm validation

Algorithm validation flags weak algorithms, such as RSA-SHA1, and can reject them. It also rejects unknown signature and digest algorithms. Registration and provider updates check the config's `signatureAlgorithm` and `digestAlgorithm`, and a rejected value fails the request with a 400 error.

Configure each IdP to sign with RSA-SHA256 or stronger and, when it encrypts assertions, to use RSA-OAEP and AES-GCM.

| Kind | Accepted | Deprecated |
| --- | --- | --- |
| Signature | RSA and ECDSA with SHA-256, SHA-384, SHA-512 | RSA-SHA1 |
| Digest | SHA-256, SHA-384, SHA-512 | SHA-1 |
| Key encryption | RSA-OAEP | RSA 1.5 |
| Data encryption | AES-CBC, AES-GCM | 3DES |

To control what happens when a deprecated algorithm appears, set `algorithms.onDeprecated`:

- `"warn"` (default): log a warning and continue.
- `"reject"`: fail the request.
- `"allow"`: continue silently.

In production, set `onDeprecated: "reject"` once your IdPs use only the accepted algorithms above.

To accept only specific algorithms, set `allowedSignatureAlgorithms`, `allowedDigestAlgorithms`, `allowedKeyEncryptionAlgorithms`, or `allowedDataEncryptionAlgorithms` to a list of algorithm URIs. The `SignatureAlgorithm`, `DigestAlgorithm`, `KeyEncryptionAlgorithm`, and `DataEncryptionAlgorithm` constants exported from `@better-auth/sso` hold these URIs.

```typescript
import { sso, SignatureAlgorithm } from "@better-auth/sso";

sso({
  saml: {
    algorithms: {
      onDeprecated: "reject",
      allowedSignatureAlgorithms: [SignatureAlgorithm.RSA_SHA256],
    },
  },
})
```

An allowlist replaces the deprecation and unknown-algorithm checks for its kind. A deprecated URI you list is accepted without a warning.

| Code | Cause | Fix |
| --- | --- | --- |
| `SAML_UNKNOWN_ALGORITHM` | No allowlist is set, and a signature or digest algorithm is in neither column. | Use an accepted algorithm at the IdP or in the provider config, or list its URI in the matching allowlist. |
| `SAML_ALGORITHM_NOT_ALLOWED` | The algorithm is not in the allowlist for its kind. | Add its URI to the allowlist, or use a listed algorithm at the IdP or in the provider config. |
| `SAML_DEPRECATED_ALGORITHM` | At the ACS, `onDeprecated` is `"reject"` and the response uses a deprecated algorithm. | Configure the IdP to use an accepted algorithm. |
| `SAML_DEPRECATED_CONFIG_ALGORITHM` | At registration or update, `onDeprecated` is `"reject"` and the config sets a deprecated algorithm. | Set `signatureAlgorithm` or `digestAlgorithm` to an accepted value. |

### Size limits

`maxResponseSize` caps the SAML response (default 256 KB). `maxMetadataSize` caps IdP and SP metadata (default 100 KB), and registration and provider updates enforce it.

To accept IdPs that send large group claims, raise the response limit:

```typescript
sso({
  saml: {
    maxResponseSize: 512 * 1024, // 512 KB, in bytes
  },
})
```

These limits apply after your app has read the request body. To reject oversized bodies before they reach your app, cap the body size at your reverse proxy or load balancer.

| `error` | `error_description` | Cause | Fix |
| --- | --- | --- | --- |
| `saml_error` | `SAML response exceeds maximum allowed size ({n} bytes)` | The encoded response is larger than `maxResponseSize`, which `{n}` reports. | Raise `maxResponseSize`, or configure the IdP to send fewer attributes. |

## Notes

- Source: https://www.better-auth.com/docs/plugins/sso/saml-security (better-auth v1.7.23 docs)
- SAML assertion replay protection is always enabled.
- Supported algorithms: RSA and ECDSA with SHA-256/384/512; deprecated ones (SHA-1, RSA 1.5, 3DES) are controlled via `algorithms.onDeprecated`.
- Changed in 1.7: IdP-initiated SAML is off by default; responses are validated for `InResponseTo`. SAML signature enforcement verifies the assertion element itself when `wantAssertionsSigned` is on.
- All `saml.*` options with defaults: see [sso-reference.md](./sso-reference.md).

## Related

- [sso.md](./sso.md)
- [sso-oidc.md](./sso-oidc.md)
- [sso-saml.md](./sso-saml.md)
- [sso-provisioning.md](./sso-provisioning.md)
- [sso-domain-verification.md](./sso-domain-verification.md)
- [sso-reference.md](./sso-reference.md)
- [SAML SSO with Okta](../guides/saml-sso-with-okta.md)
- [SAML SSO with Okta](../guides/saml-sso-with-okta.md)
