---
source: https://docs.cloud.google.com/identity-platform/docs/web/oidc
---

# Signing in users with OIDC

Configure an OpenID Connect (OIDC) provider in Identity Platform (Authorization Code Flow or Implicit Flow) and sign users in from a web app, either through the OAuth flow (popup or redirect) or directly with the provider's ID token.

## Signature / Usage

### Create the provider instance

The provider ID must start with `oidc.`.

```javascript
import { OAuthProvider } from "firebase/auth";

const provider = new OAuthProvider("oidc.myProvider");
```

### Sign in with a popup

```javascript
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // User is signed in.
    const credential = OAuthProvider.credentialFromResult(result);
    // This gives you an access token for the OIDC provider. You can use it to directly interact with that provider
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = OAuthProvider.credentialFromError(error);
    // Handle / display error.
    // ...
  });
```

### Sign in with a redirect

```javascript
import { getAuth, signInWithRedirect } from "firebase/auth";

const auth = getAuth();
signInWithRedirect(auth, provider);
```

Then read the result when the user returns:

```javascript
import { getAuth, getRedirectResult, OAuthProvider } from "firebase/auth";

const auth = getAuth();
getRedirectResult(auth)
  .then((result) => {
    // User is signed in.
    const credential = OAuthProvider.credentialFromResult(result);
    // This gives you an access token for the OIDC provider. You can use it to directly interact with that provider
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = OAuthProvider.credentialFromError(error);
    // Handle / display error.
    // ...
  });
```

### Sign in directly with an OIDC ID token

```javascript
import { getAuth, OAuthProvider, signInWithCredential } from "firebase/auth";

const auth = getAuth();
const credential = provider.credential({
  idToken: oidcIdToken,
});
signInWithCredential(auth, credential)
  .then((result) => {
    // User is signed in.
    const newCredential = OAuthProvider.credentialFromResult(result);
    // This gives you a new access token for the OIDC provider. You can use it to directly interact with that provider.
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = OAuthProvider.credentialFromError(error);
    // Handle / display error.
    // ...
  });
```

### Link an existing account

```javascript
import { getAuth, linkWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

const auth = getAuth();
linkWithPopup(auth.currentUser, provider).then((result) => {
  // Accounts successfully linked.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const user = result.user;
  // ...
}).catch((error) => {
  // Handle Errors here.
  // ...
});
```

## Options / Props

### Provider configuration (Google Cloud console, Identity Providers page, Add a Provider, OpenID Connect)

| Setting | Authorization Code Flow | Implicit Flow |
|---|---|---|
| Grant type | **Code Flow** | **Implicit Flow** |
| Name / Provider ID | Provider name; a custom name needs a Provider ID beginning with `oidc.` | Same |
| Client ID | Required | Required |
| Issuer | Required, for example `https://example.com`; used to locate the discovery document (typically `/.well-known/openid-configuration`) with OAuth endpoints and public keys | Required, same |
| Client Secret | Required | Not listed in the source |
| Authorized Domains | Add your app's domain (for `https://example.com/login` add `example.com`) | Same |
| Redirect URL at the OIDC provider | Identity Platform callback URL, similar to `https://[PROJECT-ID].firebaseapp.com/__/auth/handler` | Same |

## Notes

- An OIDC provider that does not comply with the OIDC discovery specification will not work with Identity Platform.
- The flow selected at configuration (Authorization Code or Implicit) is the one the Identity Platform server uses with the provider when you sign in with OAuth. Direct sign-in assumes you already have an OIDC token.
- At the end of either OAuth flow the OIDC ID token is available in `result.credential.idToken` (v8 form in the source); `oidcIdToken` in the direct sign-in sample is a variable holding the OIDC token you already have.
- The Web SDK v8 variants of each call and the Console steps are omitted; see the source page.
- The final link example in the source links a Google account (`GoogleAuthProvider`) to illustrate linking.
- Source: https://docs.cloud.google.com/identity-platform/docs/web/oidc (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [sign-in-user-email.md](./sign-in-user-email.md)
- [blocking-functions.md](./blocking-functions.md)
- [concepts-manage-users.md](./concepts-manage-users.md)
