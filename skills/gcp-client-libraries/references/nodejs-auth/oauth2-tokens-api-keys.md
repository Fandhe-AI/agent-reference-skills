---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#handling-token-events
---

# OAuth2 token events, token info and API keys

The library obtains an `access_token` automatically and refreshes it automatically if a `refresh_token` is present. The `tokens` event delivers the most recent tokens, `getTokenInfo` reports what an access token was provisioned with, and an API key can be passed to `OAuth2Client` or through `GoogleAuth` `clientOptions`.

## Signature / Usage

### Handle token events

The `refresh_token` is only returned on the first authorization, so store it safely. The `tokens` event always delivers the most recent tokens.

Adapted (not in the official docs): the example logged `tokens.refresh_token` and `tokens.access_token`; it now logs only that a token was received.

```js
const auth = new GoogleAuth();
const client = await auth.getClient();

client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log('refresh_token received');
  }
  console.log('access_token received');
});

const projectId = await auth.getProjectId();
const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
// The `tokens` event would now be raised if this was the first request
const res = await client.fetch(url);
```

### Check token information

After obtaining and storing an `access_token`, you can check its expiration date, original scopes or audience later. `getTokenInfo` throws if the token is invalid.

```js
// after acquiring an oAuth2Client...
const tokenInfo = await oAuth2Client.getTokenInfo('my-access-token');

// take a look at the scopes originally provisioned for the access token
console.log(tokenInfo.scopes);
```

### Use an API key

Replace `'my-api-key'` with a key loaded from an environment variable or Secret Manager; do not commit keys. Subclasses such as `JWT` and `UserRefreshClient` accept the same parameter. API key support varies by API.

```js
const client = new OAuth2Client({
  apiKey: 'my-api-key'
});
```

`GoogleAuth` passes `clientOptions.apiKey` to any `OAuth2Client` it generates:

```js
const auth = new GoogleAuth({
  clientOptions: {
    apiKey: 'my-api-key'
  }
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `on('tokens', listener)` | event | Raised with the most recent tokens (`refresh_token` only on the first authorization). |
| `getTokenInfo(accessToken)` | `(string) => Promise<TokenInfo>` | Information about the provisioned access token, "especially useful if you want to check the scopes". `TokenInfo` includes `aud`, `scopes`, `expiry_date` and optional `user_id`, `sub`, `azp`. Throws if the token is invalid. |
| `apiKey` (`OAuth2Client`) | string | API key passed to the constructor. |
| `GoogleAuthOptions.apiKey` | string | Optional. "Cannot be used with `credentials`." |
| `GoogleAuth#fromAPIKey(apiKey, options?)` | method, returns `JWT` | Creates a credentials instance from the API key string. The created client is not cached; to create and cache it, call `getClient` after providing an `apiKey`. |

## Notes

- Applies to google-auth-library 11.3.4 (npm), `node>=22`.
- `googleauth.d.ts` declares the message `GoogleAuthExceptionMessages.API_KEY_WITH_CREDENTIALS`: "API Keys and Credentials are mutually exclusive authentication methods and cannot be used together."
- Corrected from the official docs: original lines `console.log(tokens.refresh_token);` and `console.log(tokens.access_token);`. Treat refresh tokens and access tokens as secrets; never log them. `tokenInfo.scopes` is not a credential.
- Fragments: the `tokens` event block, the `getTokenInfo` block and the two API key blocks use top-level `await` and undefined variables (`oAuth2Client`, `GoogleAuth`, `OAuth2Client` imports).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#handling-token-events (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/oauth2client.ts (pinned at tag google-auth-library-v11.3.4)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/googleauth.ts (pinned at tag google-auth-library-v11.3.4)

## Related

- [oauth2-client.md](./oauth2-client.md)
- [adc-googleauth.md](./adc-googleauth.md)
- [jwt-service-account.md](./jwt-service-account.md)
