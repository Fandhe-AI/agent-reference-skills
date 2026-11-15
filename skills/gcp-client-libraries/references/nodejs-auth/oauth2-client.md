---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#oauth2
---

# OAuth2 client (OAuth2Client)

`OAuth2Client` retrieves an access token for actions on behalf of an end user. It refreshes the token and retries the request seamlessly when you also provide an `expiry_date` and the token is expired, and it refreshes automatically when a `refresh_token` is present. You need a `CLIENT_ID`, `CLIENT_SECRET` and `REDIRECT_URL` from the Developer Console (project, APIs & auth, credentials).

## Signature / Usage

### Complete authorization-code flow

Adapted (not in the official docs): removed the `console.log` of the authorization code (it is a credential), replaced `console.log(tokenInfo)` with the non-secret `tokenInfo.scopes`, and loaded the ESM-only `open` package with `import()` instead of `require`, added a per-request random `state` that the callback checks before exchanging the code (login CSRF protection), and bound the callback server to `localhost`.

```js
const {OAuth2Client} = require('google-auth-library');
const http = require('http');
const url = require('url');
const crypto = require('crypto');
const destroyer = require('server-destroy');

// Download your OAuth2 configuration from the Google
const keys = require('./oauth2.keys.json');

/**
* Start by acquiring a pre-authenticated oAuth2 client.
*/
async function main() {
  const oAuth2Client = await getAuthenticatedClient();
  // Make a simple request to the People API using our pre-authenticated client. The `fetch` and
  // `request` methods accept a [`GaxiosOptions`](https://github.com/googleapis/gaxios)
  // object.
  const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
  const res = await oAuth2Client.fetch(url);
  console.log(res.data);

  // After acquiring an access_token, you may want to check on the audience, expiration,
  // or original scopes requested.  You can do that with the `getTokenInfo` method.
  const tokenInfo = await oAuth2Client.getTokenInfo(
    oAuth2Client.credentials.access_token
  );
  console.log(tokenInfo.scopes);
}

/**
* Create a new OAuth2Client, and go through the OAuth2 content
* workflow.  Return the full client to the callback.
*/
function getAuthenticatedClient() {
  return new Promise((resolve, reject) => {
    // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
    // which should be downloaded from the Google Developers Console.
    const oAuth2Client = new OAuth2Client({
      clientId: keys.web.client_id,
      clientSecret: keys.web.client_secret,
      redirectUri: keys.web.redirect_uris[0]
    });

    // Generate the url that will be used for the consent dialog.
    const state = crypto.randomBytes(32).toString('hex');
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
      state,
    });

    // Open an http server to accept the oauth callback. In this simple example, the
    // only request to our webserver is to /oauth2callback?code=<code>
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            // acquire the code from the querystring, and close the web server.
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            if (qs.get('state') !== state) {
              res.statusCode = 400;
              res.end('State mismatch.');
              return;
            }
            const code = qs.get('code');
            res.end('Authentication successful! Please return to the console.');
            server.destroy();

            // Now that we have the code, use that to acquire tokens.
            const r = await oAuth2Client.getToken(code);
            // Make sure to set the credentials on the OAuth2 client.
            oAuth2Client.setCredentials(r.tokens);
            console.info('Tokens acquired.');
            resolve(oAuth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, 'localhost', () => {
        // open the browser to the authorize url to start the workflow
        import('open').then(({default: open}) => open(authorizeUrl, {wait: false})).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

main().catch(console.error);
```

### Token events, token info and API keys

See [oauth2-tokens-api-keys.md](./oauth2-tokens-api-keys.md) for the `tokens` event, `getTokenInfo` and API keys.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `clientId` | string | OAuth2 client ID (`keys.web.client_id`). |
| `clientSecret` | string | OAuth2 client secret (`keys.web.client_secret`). |
| `redirectUri` | string | Redirect URI (`keys.web.redirect_uris[0]`). |
| `generateAuthUrl({access_type, scope, prompt})` | method | `access_type: 'offline'` is required to get a refresh token. A refresh token is returned only on the user's first consent; `prompt: 'consent'` forces consent each time so a `refresh_token` is returned again. |

## Notes

- Applies to google-auth-library 11.3.4 (npm), `node>=22`.
- This is the Google Cloud auth library (`google-auth-library`, used by `@google-cloud/*`). It is distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill) and from `googleapis`, the Node.js Google API Client Library for REST discovery APIs.
- Adapted from the official docs: original lines ``console.log(`Code is ${code}`);``, `console.log(tokenInfo);`, `const open = require('open');` and `open(authorizeUrl, {wait: false}).then(cp => cp.unref());`; the original `generateAuthUrl({access_type: 'offline', scope: ...})` call sets no `state`, the callback exchanges any received `code`, and the server uses `.listen(3000, () => {` (all interfaces). `state` is a documented `GenerateAuthUrlOpts` field (`oauth2client.d.ts`). Treat authorization codes, refresh tokens and access tokens as secrets; never log them.
- The downloaded `oauth2.keys.json` contains the OAuth client secret. Keep it out of source control.
- `open` and `server-destroy` are third-party npm packages used by the sample, not part of this library. Not stated in the source: `open` 11.0.4 is an ES module package (`"type": "module"`), and on Node.js 24 `require('open')` returns the module namespace object rather than the function (checked locally), which is why the example uses `import()`.
- The README's separate "Retrieve access token" snippet (`oauth2Client.getToken(code)` then `setCredentials(tokens)`) is not reproduced: it passes the whole response where the complete example passes `r.tokens`.
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)

## Related

- [adc-googleauth.md](./adc-googleauth.md)
- [jwt-service-account.md](./jwt-service-account.md)
- [oauth2-tokens-api-keys.md](./oauth2-tokens-api-keys.md)
- [id-tokens.md](./id-tokens.md)
