# SSO: SAML providers

Register SAML 2.0 identity providers with the SSO plugin and configure signing, certificates, attribute mapping, callbacks, IdP-initiated SSO, SP metadata, and Single Logout. Better Auth implements the service provider (SP) side of the Web Browser SSO profile: AuthnRequests use the HTTP-Redirect binding, responses use HTTP-POST. Every response goes through the checks on the SAML security page.

## Signature / Usage

### Configure the IdP application

At your IdP, create a SAML application with these values:

- **ACS URL**: `{baseURL}/sso/saml2/sp/acs/{providerId}`. With the default base path, that is `https://app.example.com/api/auth/sso/saml2/sp/acs/acme-saml`.
- **SP entity ID** (audience): the `issuer` you will register.

Then copy the IdP's metadata XML, or its entity ID, SSO URL, and signing certificate. After registration, you can give the IdP the SP metadata URL instead.

### Register a SAML provider

SAML sign-in reserves each assertion ID in the database to block replays. If you configure `secondaryStorage`, also set `verification.storeInDatabase: true`, or every SAML sign-in fails.

Each side names itself with an entity ID. The top-level `issuer` is your SP entity ID. The IdP entity ID comes from `idpMetadata.metadata`, or from `idpMetadata.entityID` when you configure the IdP by hand.

To register a SAML provider, you need:

- `samlConfig.entryPoint`, the IdP sign-in URL. It is **required** even when you pass metadata XML.
- `idpMetadata`, with either `metadata` (the IdP metadata XML) or `entityID`.
- A signing-certificate source: `cert`, `idpMetadata.cert`, or `idpMetadata.metadata`. Without one, registration fails with `CERT_SOURCE_MISSING`.

Metadata XML:

```typescript
const { error } = await authClient.sso.register({
    providerId: "acme-saml",
    issuer: "https://app.example.com",
    domain: "example.com",
    samlConfig: {
        entryPoint: "https://idp.example.com/sso",
        idpMetadata: {
            metadata: idpMetadataXml,
        },
    },
});

if (error) {
    // Show error.message. error.code holds the reason, such as CERT_SOURCE_MISSING.
}
```

Manual:

```typescript
const { error } = await authClient.sso.register({
    providerId: "acme-saml",
    issuer: "https://app.example.com",
    domain: "example.com",
    samlConfig: {
        entryPoint: "https://idp.example.com/sso",
        idpMetadata: {
            entityID: "https://idp.example.com",
            cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
        },
    },
});

if (error) {
    // Show error.message. error.code holds the reason, such as CERT_SOURCE_MISSING.
}
```

On the server, call `auth.api.registerSSOProvider({ body, headers })` with the same body. To store the IdP authority yourself, derive it with the same metadata parser that SAML sign-in uses:

```typescript
import { deriveSAMLIdentityProviderEntityID } from "@better-auth/sso";

const identityProviderEntityID =
    deriveSAMLIdentityProviderEntityID(samlConfig);
```

### Service provider settings

Better Auth generates SP metadata from `issuer` (or `spMetadata.entityID`), the ACS URL, `wantAssertionsSigned`, `authnRequestsSigned`, and `identifierFormat`. To use your own, set `spMetadata.metadata`. It replaces the generated document, and its `WantAssertionsSigned` value becomes the signing policy.

Registration rejects SP metadata that weakens `wantAssertionsSigned: true`, has no HTTP-POST `AssertionConsumerService`, or has a fragment in an ACS URL.

#### Signed assertions

To require that the IdP sign each assertion itself, not only the response that carries it, set `wantAssertionsSigned: true`. The default is `false`. Set it to `true` whenever your IdP supports it, as SAML2Int expects. The setting also advertises `WantAssertionsSigned="true"` in SP metadata.

With the setting on, an assertion without its own signature makes sign-in redirect with `error=invalid_saml_response` and `error_description=SAML assertion signature is required`. To fix it, configure the IdP to sign the assertion.

#### Signed AuthnRequests

To sign AuthnRequests, set `authnRequestsSigned: true` and provide a signing key in `spMetadata.privateKey` or `samlConfig.privateKey`. The default is `false`. The setting also advertises `AuthnRequestsSigned="true"` in SP metadata. Without a key, sign-in returns 400. Set the key only in server code, such as `defaultSSO` or `auth.api.registerSSOProvider`. Never pass it through `authClient.sso.register`, which would put it in your client bundle.

```typescript
samlConfig: {
    authnRequestsSigned: true,
    spMetadata: {
        privateKey: process.env.SAML_SP_PRIVATE_KEY,
    },
}
```

The generated SP metadata has no signing certificate. Give the IdP the certificate that matches the signing key, or supply your own `spMetadata.metadata` with a signing `KeyDescriptor`.

#### Encrypted assertions

To decrypt encrypted assertions, set `idpMetadata.isAssertionEncrypted: true` and pass the decryption key in `spMetadata.encPrivateKey`, with `encPrivateKeyPass` when the key is encrypted. The default is `false`. The generated SP metadata has no encryption certificate. Either give the IdP the certificate that matches `encPrivateKey` directly, or supply your own `spMetadata.metadata` with an encryption `KeyDescriptor`.

Signing and decryption keys in a registered `samlConfig` are stored unencrypted in the `ssoProvider.samlConfig` column. Anyone who can read that column can sign requests as your SP and decrypt its assertions. To keep a key out of the database, define the provider in `defaultSSO`.

### Signing certificates and rotation

To keep users signing in while your IdP rotates its signing certificate, list the old and the new PEM in `idpMetadata.cert`. Better Auth accepts responses signed by either. This works when the IdP embeds its signing certificate in the signature's `KeyInfo`, which most IdPs do. Without `KeyInfo`, only the first certificate in the list is tried.

```typescript
samlConfig: {
    entryPoint: "https://idp.example.com/sso",
    idpMetadata: {
        entityID: "https://idp.example.com",
        cert: [
            "-----BEGIN CERTIFICATE-----\n<current>\n-----END CERTIFICATE-----",
            "-----BEGIN CERTIFICATE-----\n<next>\n-----END CERTIFICATE-----",
        ],
    },
}
```

`samlConfig.cert` and `samlConfig.idpMetadata.cert` each accept one PEM string or an array. When both are set, `idpMetadata.cert` wins. Changing certificates keeps the accounts already linked to the provider, and whoever holds the private key of a listed certificate can sign in as any of those users. To stop organization admins from changing certificates on their own, reject those changes in `guardProviderMutation`.

If you set `idpMetadata.metadata`, Better Auth reads the certificates from that document and ignores `cert` and `idpMetadata.cert`. It does not refetch the document. When the IdP republishes it with a new certificate, update the provider with the new XML.

### Attribute mapping

To choose which SAML attributes fill the user's profile, set `mapping`:

| Field | Default attribute |
| --- | --- |
| `email` | `email`, then the `NameID` |
| `name` | `firstName` and `lastName` joined, using whichever has a value. When neither has one, `displayName`, then the `NameID` |
| `firstName` | `givenName`, joined with `lastName` to build `name` |
| `lastName` | `surname`, joined with `firstName` to build `name` |
| `extraFields` | The attribute named in each entry |

```typescript
samlConfig: {
    mapping: {
        email: "mail",
        firstName: "given_name",
        lastName: "family_name",
        extraFields: { department: "department" },
    },
}
```

Mapping fills the profile, with one exception: for a provider with a verified domain, `email` selects the existing user that a new account is linked to. Map `email` only to an attribute that the IdP administrator controls and users cannot edit. The account is keyed by the provider ID and the signed `NameID`. `email` and `name` take the first value of a multi-valued attribute. `extraFields` and `resolveUser` receive multi-valued attributes as arrays. `mapping.emailVerified` is read only with the deprecated `trustEmailVerified` option.

### ACS and callback URLs

The ACS URL, `{baseURL}/sso/saml2/sp/acs/{providerId}`, accepts GET and POST. Better Auth skips the origin check for it, because the IdP posts from another site.

To keep an ACS URL the IdP already posts to, list it as an HTTP-POST `AssertionConsumerService` in `spMetadata.metadata` and forward its POST requests to the ACS route.

The IdP must send an `AudienceRestriction` that contains the SP entity ID, or `samlConfig.audience` when set. The bearer `Recipient`, and the response `Destination` when present, must match one of the provider's ACS URLs.

After sign-in, Better Auth redirects users to the first of these that is set:

1. The `callbackURL` from `signIn.sso()`.
2. `samlConfig.idpInitiatedCallbackUrl`.
3. The plugin option `saml.idpInitiatedCallbackUrl`.
4. `samlConfig.callbackUrl`.
5. The origin of the base URL.

To stop open redirects, Better Auth skips any entry that is not a relative path or a URL matching `trustedOrigins`, and tries the next one. For example, with `trustedOrigins: ["https://web.example.com"]`, Better Auth uses an entry of `https://web.example.com/dashboard` and skips `https://other.example/dashboard`.

Errors in SP-initiated sign-ins redirect to the `errorCallbackURL` you passed to `signIn.sso()`, else `onAPIError.errorURL`, else `{baseURL}/error`. Errors in IdP-initiated sign-ins use the list above.

Errors that Better Auth raises while matching or creating the user redirect to the sign-in destination above, even if you set `errorCallbackURL`. They include `account_not_linked`, `signup_disabled`, and `unable_to_create_user`, so check for `error` on that page too. A `reject` decision from `resolveUser`, or `SSO_USER_RESOLUTION_FAILED`, follows the error redirects in the previous paragraph instead.

`samlConfig.callbackUrl` sets where users land, not the ACS URL. Before 1.7 it set the ACS URL.

### IdP-initiated SSO

When the user starts at your app, the IdP's response names your request in `InResponseTo`. When the user starts at the IdP, for example from its dashboard, the response has no `InResponseTo` and is unsolicited. Better Auth rejects these by default and redirects with `error=unsolicited_response`. To accept them, set `saml.allowIdpInitiated`:

```typescript
sso({
    saml: {
        allowIdpInitiated: true,
    },
})
```

An unsolicited response cannot be tied to a request your app started. As a result, anyone with an account at the IdP can post their own signed response from a victim's browser and sign the victim into the attacker's account. The option applies to every SAML provider, not only the one that needs it. SAML2Int advises against it; enable this only when the IdP requires it.

IdP-initiated sign-ins have no `callbackURL`. When your frontend is on another origin, set `idpInitiatedCallbackUrl`, or users land on the auth server's origin.

### Service provider metadata

To give the IdP your SP metadata, send it the URL `{baseURL}/sso/saml2/sp/metadata?providerId=…`, or the downloaded file. The URL is a public `GET` endpoint that returns the provider's SP metadata as XML.

```typescript
const response = await auth.api.spMetadata({
    query: { providerId: "acme-saml" },
});
const metadataXml = await response.text();
```

### Single Logout

To log users out of the IdP and your app together, set `saml.enableSingleLogout: true`. It adds SAML Single Logout:

- `{baseURL}/sso/saml2/sp/slo/{providerId}` accepts GET and POST for IdP-initiated logout. SP metadata advertises it when Better Auth generates the metadata.
- `POST /sso/saml2/logout/{providerId}` starts SP-initiated logout for the current session. It ends the Better Auth session and redirects to the IdP, with the optional `callbackURL` as RelayState.

Your IdP must publish a `SingleLogoutService`, in its metadata XML or in `idpMetadata.singleLogoutService`. When you sign users out through `/sign-out`, Better Auth also removes the stored SAML session. These plugin options tune logout:

- `saml.wantLogoutRequestSigned` requires signed LogoutRequests from the IdP, and `saml.wantLogoutResponseSigned` requires signed LogoutResponses. Both default to `false`. Enable each one when your IdP signs that message type.
- `saml.logoutRequestTTL` (default 5 minutes) limits how long a logout request stays valid.

The client plugin does not expose SP-initiated logout, and the endpoint accepts only JSON. To start it from the browser, add a server route that a form POSTs to, and forward the request to `auth.handler` as JSON. Better Auth then runs its origin and CSRF checks, and the browser follows the redirect to the IdP. Do not call `auth.api.initiateSLO` from that route, because a direct call skips those checks. The example uses the default `/api/auth` base path, so change it if you set `basePath`.

```typescript
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const headers = new Headers(request.headers);
  headers.set("content-type", "application/json");
  headers.delete("content-length");
  return auth.handler(
    new Request(new URL("/api/auth/sso/saml2/logout/acme-saml", request.url), {
      method: "POST",
      headers,
      body: JSON.stringify({ callbackURL: "/" }),
    }),
  );
}
```

## Notes

- Source: https://www.better-auth.com/docs/plugins/sso/saml (better-auth v1.7.23 docs)
- The example route above is `app/sign-out/saml/route.ts` in the official docs.
- Changed in 1.7: SAML configuration is simplified. The callback URL is derived automatically, SP metadata is generated, and several fields are removed. The ACS path changed from `/sso/saml2/callback/:providerId` to `/sso/saml2/sp/acs/:providerId`. Set the post-login redirect for SP-initiated logins with `callbackURL` in `signIn.sso()`.
- Changed in 1.7: manual SAML configs without `idpMetadata.metadata` must set `idpMetadata.entityID`; `samlConfig.issuer` identifies the service provider and is no longer an IdP fallback. The account subject is the signed `NameID`; `samlConfig.mapping.id` is removed.
- Changed in 1.7: IdP-initiated SAML is off by default; set `saml.allowIdpInitiated: true` to restore it. Responses are validated for `InResponseTo`, and Single Logout requests are matched by `SessionIndex`.
- Changed in 1.7: SAML signing certificates accept a single value or a list; management endpoints return the certificate as a list or omit it when certificates live in `idpMetadata`. Every SAML config must supply a signing-certificate source (`CERT_SOURCE_MISSING` otherwise).
- Changed in 1.7: SAML signature enforcement verifies the assertion element itself, so an IdP that signs only the response message fails when `wantAssertionsSigned` is on; set `wantAssertionsSigned: false` deliberately for such an IdP.
- SAML endpoints: `/api/auth/sso/saml2/sp/metadata`, `/api/auth/sso/saml2/sp/acs/{providerId}` (GET and POST), `/api/auth/sso/saml2/sp/slo/{providerId}`, `/api/auth/sso/saml2/logout/{providerId}`.
- All `samlConfig` fields: see [sso-reference.md](./sso-reference.md).

## Related

- [sso.md](./sso.md)
- [sso-oidc.md](./sso-oidc.md)
- [sso-saml-security.md](./sso-saml-security.md)
- [sso-provisioning.md](./sso-provisioning.md)
- [sso-domain-verification.md](./sso-domain-verification.md)
- [sso-reference.md](./sso-reference.md)
- [SAML SSO with Okta](../guides/saml-sso-with-okta.md)
