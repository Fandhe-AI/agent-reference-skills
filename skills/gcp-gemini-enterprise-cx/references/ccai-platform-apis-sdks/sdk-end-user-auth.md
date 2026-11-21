---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/sdk-end-user-auth
---

# CCAI Platform SDK end user authentication

CCAI Platform uses end user authentication to identify the people using your host app, so that only authorized users access the CCAI Platform API and their chat sessions and data stay tied to their identity. The host app provides a universally unique identifier (UUID) for the person and a JWT signed with the company secret.

## Signature / Usage

### How authentication works

1. The request: the CCAI Platform SDK requests a signed JWT from your host app when an end user starts using customer service.
2. The signature: your host app signs the JWT with the shared company secret (`company_secret`).
3. The exchange: the host app passes the signed JWT to the SDK, which sends it to the CCAI Platform server.
4. The verification: the server verifies the signature; if valid it issues an auth token, associating the user with their account (or creating one).

If the JWT payload has no identifier, CCAI Platform creates an anonymous guest account for the user.

### Prerequisites

Sign in with an administrator account, go to **Settings > Developer Settings > API Credentials** and locate the SDK key name (`sdk_key_name`), SDK key (`sdk_key`) and company secret (`company_secret`). Keep them secure and share them only with authorized systems and developers.

### JWT payload reserved keys

- `identifier`: optional, but highly recommended UUID
- `name`: optional
- `email`: optional
- `phone`: optional, must use E.164 format
- `iss`: optional, your company name
- `iat`: required, issued at timestamp
- `exp`: required, expiration timestamp

The callback method supplies a default payload (which may include a push token and default name); add user details with these keys.

### Server-side signing (recommended)

Sign the payload on your server so `company_secret` stays hidden from the client; if it is compromised you can revoke it. In production, make sure the JWT signing algorithm suits your security needs. The source's server example is a Ruby on Rails controller with the `jwt` gem (endpoint `/api/ujet/sign`); see Notes for why it is not reproduced. The web client on this page (`UJET.initialize` with `handlers.authentication(callback)`) expects your signing server to accept `POST /api/ujet/sign` with a JSON body `{"payload": {...}}` (the web examples below build the payload themselves with `identifier` and `name`) and to answer with JSON `{"token": "<signed JWT>"}`, which the handler passes on as `result.token`. This is a different contract from web SDK v3 (web-sdk-v3-authenticate.md): there the `new UJET({ authenticate: getAuthToken })` client calls `GET /auth/token` with no body and the server builds the whole payload from its own session. The Express `GET /auth/token` example on that page does not serve this page's client; use it only as a pattern for signing with `jsonwebtoken` and an environment-held secret.

### Web SDK signing

The authentication handler posts the payload to your server and passes the signed token back through the callback:

Adapted (not in the official docs): replaced the fixed host `https://company.com` with the placeholder `YOUR_SIGNING_ENDPOINT` for your own signing server, so user identifiers are not posted to a host you do not control, and added `contentType: 'application/json'` so the `JSON.stringify` body is sent as JSON rather than with jQuery's default form-urlencoded content type.

```javascript
$(function() {
  UJET.initialize({
    // ... other parameters
    handlers: {
      authentication(callback) {
        $.ajax({
          type: 'POST',
          url: 'https://YOUR_SIGNING_ENDPOINT/api/ujet/sign',
          contentType: 'application/json',
          data: JSON.stringify({
            payload: {
              identifier: 'UNIQUE-Identifier',
              name: 'Test user'
            }
          }),
          success: function(result) {
            callback({
              token: result.token,
              user: {
                identifier: 'UNIQUE-IDENTIFIER',
                name: 'Test user'
              }
            });
          }
        });
      }
    }
  }).then(function() {
    // successfully initialized
  }).catch(function(error) {
    // Handle initialization error
  });
});
```

### Mid-session authentication and SDK reinitialization

When a user starts as a guest and verifies identity mid-session (for example through a virtual assistant or a login screen):

1. Initialize the SDK with a temporary (random or guest) identifier.
2. Direct the user to authenticate (a CCAI Platform virtual assistant or your login screen).
3. After authentication, while the user is still in the virtual agent or authentication flow, your backend calls the CCAI Platform Apps API to update the end user's chat session with their true identifier.
4. Generate a new JWT for the authenticated user and reinitialize the SDK by calling the initialization method again.
5. If a virtual assistant was used, it should now escalate the consumer to the final destination queue.

Web SDK reinitialization (call after successful authentication and the Apps API update):

Adapted (not in the official docs): replaced the fixed host `https://your.company.com` with the placeholder `YOUR_SIGNING_ENDPOINT` for your own signing server, so user identifiers are not posted to a host you do not control, and added `contentType: 'application/json'` so the `JSON.stringify` body is sent as JSON rather than with jQuery's default form-urlencoded content type.

```javascript
// Call this after successful authentication and the CCAI Platform Apps API update
UJET.initialize({
  // ...include your existing parameters
  handlers: {
    authentication(callback) {
      // Fetch the new JWT for the newly authenticated user
      $.ajax({
        type: 'POST',
        url: 'https://YOUR_SIGNING_ENDPOINT/api/ujet/sign',
        contentType: 'application/json',
        data: JSON.stringify({
          payload: {
            identifier: 'AUTHENTICATED-USER-UUID',
            name: 'Authenticated User Name'
          }
        }),
        success: function(result) {
          callback({
            token: result.token,
            user: {
              identifier: 'AUTHENTICATED-USER-UUID',
              name: 'Authenticated User Name'
            }
          });
        }
      });
    }
  }
}).then(function() {
  // SDK successfully reinitialized with the authenticated user
}).catch(function(error) {
  // Handle reinitialization errors
});
```

## Options / Props

### Authentication scenarios

| Scenario | Action required |
|---|---|
| User starts authenticated | Initialize SDK with the user's true UUID and JWT. |
| User starts unauthenticated | Initialize SDK with a guest/random identifier. |
| User authenticates mid-session | Update CCAI Platform with the API, generate a new JWT, and reinitialize the SDK. |

## Notes

- "Don't use an email address as the identifier." Email addresses can change and might not be unique; use a UUID.
- Reinitializing keeps routing, history and CRM records tied to the authenticated user instead of an anonymous guest session, and prevents data leakage.
- The source's Ruby on Rails signing example (`routes.rb` with `post 'ujet/sign' => "ujet#sign"` and a `UjetController#sign` that calls `JWT.encode(payload, ujet_secret)`) is left out: it reads `payload = body["payload"]`, and `body` is not defined anywhere in the example, so it does not run as written and the correct accessor is not given by the source. It also sets the identifier, name and email to constants and keeps the secret in a string literal (`ujet_secret = "COMPANY_SECRET"`, with the comment "In production, securely store and call your secret (e.g., via environment variables)").
- Adapted from the official docs: the source web SDK examples post the payload to `https://company.com/api/ujet/sign` (initialization) and `https://your.company.com/api/ujet/sign` (reinitialization); both hosts were replaced with `https://YOUR_SIGNING_ENDPOINT/api/ujet/sign`. `YOUR_SIGNING_ENDPOINT` must be your own server that signs the JWT (the source's server example serves `/api/ujet/sign`), never a host you do not operate, because the request carries the end user's identifier and name.
- Corrected from the official docs: both web SDK `$.ajax` calls send `data: JSON.stringify({ payload: ... })` without `contentType`, so jQuery sends them with its default `Content-Type: application/x-www-form-urlencoded; charset=UTF-8` and a server that parses JSON bodies does not find `payload`; the page adds `contentType: 'application/json'` to both calls.
- The web SDK examples send the `identifier` from the browser to the signing endpoint. Derive the identifier from your authenticated session on the server (the web SDK v3 Express example in web-sdk-v3-authenticate.md uses `req.user`, although its `GET /auth/token` route is a different contract from this page's `POST /api/ujet/sign`) rather than signing whatever the client sends, and load the company secret from environment variables or a secret store.
- The source also shows iOS (Objective-C) and Android (Java, Retrofit) signing callbacks. Identifiers such as `UJET` appear as written in the source.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/sdk-end-user-auth (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [web-sdk-v3-authenticate.md](./web-sdk-v3-authenticate.md)
- [mobilesdk-overview.md](./mobilesdk-overview.md)
- [chat-platform-api-guide.md](./chat-platform-api-guide.md)
