---
source: https://docs.cloud.google.com/iap/docs/query-parameters-and-headers-howto
---

# Using query parameters and headers

Identity-Aware Proxy (IAP) query parameters (`gcp-iap-mode`) can return the signed-in user's identity, clear the IAP login cookie, or send deliberately invalid JWTs to test your verification logic. IAP also adds a response header to the responses it generates. The parameters work on any path, not just the root URL.

## Signature / Usage

### Get the user identity

Returns a JSON dictionary with the user's identity. Available from any signed-in Google account, even one without access to the app:

```text
YOUR_APP_URL?gcp-iap-mode=IDENTITY
```

Example value returned:

```json
{"email":"accounts.google.com:USER_EMAIL","sub":"accounts.google.com:118133858486581853996"}
```

### Clear the IAP login cookie

Clears all IAP-issued cookies for your app and navigates the browser to `YOUR_APP_URL`:

```text
YOUR_APP_URL?gcp-iap-mode=CLEAR_LOGIN_COOKIE
```

### Test JWT verification

For example, IAP passes a JWT with an invalid signature for any request that contains the query parameters `gcp-iap-mode=SECURE_TOKEN_TEST` and `iap-secure-token-test-type=SIGNATURE`; your verification logic should catch the invalid signature. The other test types are in the table below.

## Options / Props

### `SECURE_TOKEN_TEST` types

| Type | Test case |
|---|---|
| `NOT_SET` | A valid JWT |
| `FUTURE_ISSUE` | Issue date is set in the future |
| `PAST_EXPIRATION` | Expiration date is set in the past |
| `ISSUER` | Incorrect issuer |
| `AUDIENCE` | Incorrect audience |
| `SIGNATURE` | Signed using an incorrect signer |

### `gcp-iap-mode` values

| Value | Effect |
|---|---|
| `IDENTITY` | Returns the user identity as JSON |
| `CLEAR_LOGIN_COOKIE` | Clears IAP cookies; a silent sign-in might happen if one account is in use with the IdP, or an account selection page opens if several are |
| `SECURE_TOKEN_TEST` | Sends a test JWT (see types above) |
| `DO_SESSION_REFRESH` | Establishes the IAP session (described on the sessions page, see [sessions-howto.md](./sessions-howto.md)) |

### Response header

| Header | Meaning |
|---|---|
| `X-Goog-IAP-Generated-Response` | Added when IAP itself generates a response (403 access denied, or 302 / 401 authentication request). Use it to tell IAP errors from app errors, or to detect when IAP credentials must be added to a request. |

## Notes

- `SECURE_TOKEN_TEST` types: Append `?gcp-iap-mode=SECURE_TOKEN_TEST&iap-secure-token-test-type=TYPE`, where `TYPE` is one of:
- The source suggests the `IDENTITY` value for personalizing the app, passing identity to another page or capturing usage data in logs; authorize requests by verifying the signed JWT instead (see [signed-headers-howto.md](./signed-headers-howto.md)).
- Use `SECURE_TOKEN_TEST` only to check that your validation rejects each failure case; every type except `NOT_SET` should be rejected.
- Source: https://docs.cloud.google.com/iap/docs/query-parameters-and-headers-howto (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [signed-headers-howto.md](./signed-headers-howto.md)
- [sessions-howto.md](./sessions-howto.md)
- [authentication-howto.md](./authentication-howto.md)
