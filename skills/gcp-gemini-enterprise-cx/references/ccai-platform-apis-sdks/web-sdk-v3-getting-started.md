---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/web-sdk-v3-getting-started
---

# CCAI Platform web SDK v3: mount, initialize and authenticate

The web SDK builds on the headless web SDK, so all headless client methods are available in the web SDK widget. This page covers mounting, initializing and authenticating the widget, and hiding the start-new-conversation button and the transcript download commands. The basic example needs only `companyId`, `host` and `authenticate`.

## Signature / Usage

### Basic example

Before you use the example, replace `COMPANY_KEY` with the Company Key you copy from the portal (see "Get the company key" below) and `{your_ccaas_host}` with your CCAI Platform host, in both the `<script src>` and the `host` option. A static HTML page does not expand shell-style placeholders such as `$COMPANY_ID`; the browser passes them to the SDK as literal strings.

Adapted (not in the official docs): `{your_ccaas_host}web-sdk/v3/widget.js` became `{your_ccaas_host}/web-sdk/v3/widget.js` because the host is written as `https://{your_ccaas_host}` and the same page's install section uses `https://{your_ccaas_host}/web-sdk/v3/headless.js`; `getAuthToken` throws when the response is not `ok` or has no non-empty `token`, so the promise passed to the SDK rejects instead of resolving with an error body; `companyId: "$COMPANY_ID"` and `host: "$HOST"` became `companyId: "COMPANY_KEY"` and `host: "https://{your_ccaas_host}"`, the placeholders the same page uses in its `new UJET(options)` and headless examples.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Basic demo</title>
</head>
<body>
  <!-- An empty element to mount the CCAI Platform web SDK widget. -->
  <div id="ccaas-widget"></div>

  <!-- Include the CCAI Platform web SDK widget -->
  <script src="https://{your_ccaas_host}/web-sdk/v3/widget.js"></script>
  <script>
    var ccaas = new UJET({
      companyId: "COMPANY_KEY",
      host: "https://{your_ccaas_host}",
      authenticate: getAuthToken
    });
    ccaas.mount("#ccaas-widget");

    function getAuthToken() {
      // YOU SHOULD HAVE THIS KIND OF API ON YOUR SERVER
      return fetch('/auth/token').then(function(resp) {
        // { token: 'a JWT contains user identifier, name, and email' }
        if (!resp.ok) {
          throw new Error('token request failed: ' + resp.status);
        }
        return resp.json();
      }).then(function(data) {
        if (!data || typeof data.token !== 'string' || data.token === '') {
          throw new Error('token response has no token');
        }
        return data;
      });
    }
  </script>
</body>
</html>
```

### Get the company key

Sign in to the CCAI Platform portal with an administrator account, go to **Settings > Developer Settings**, and copy the Company Key as `COMPANY_KEY`. The company secret is on the same page; it is used only in your backend to create the authentication token endpoint.

### Authentication

`getAuthToken` calls a JWT signing endpoint on your backend:

Adapted (not in the official docs): the function throws when the response is not `ok` or has no non-empty `token`, so the returned promise rejects instead of resolving with an error body or `{ token: undefined }`.

```javascript
async function getAuthToken() {
  // YOU SHOULD HAVE THIS KIND OF API ON YOUR SERVER
  const resp = await fetch('/auth/token')
  if (!resp.ok) {
    throw new Error(`token request failed: ${resp.status}`)
  }
  const data = await resp.json()
  if (!data || typeof data.token !== 'string' || data.token === '') {
    throw new Error('token response has no token')
  }
  return { token: data.token }
}
```

### Configure the SDK

Configure with `ccaas.config({...})`; for example, `customData` is set this way. Supported options:

```typescript
export interface ConfigOptions {
  name?: string
  accent?: 'default' | 'blue' | 'green' | 'purple' | 'orange' | 'yellow' | 'gold' | 'red'
  logo?: string
  menuKey?: string
  ticketId?: string
  preferredChannel?: string
  disableAttachment?: boolean
  customData?: Record<string, any>
  signedCustomData?: string
  messages?: Record<string, unknown>
  disableLauncher?: boolean
  launcherOpenIcon?: string
  launcherCloseIcon?: string
  launcherLoadingIcon?: string
  optionsMenuIcon?: string
  confirmationIcon?: string
  enableMuteChat?: boolean
  tooltipIcon?: string
  hideNewConversation?: boolean
  hideDownloadTranscriptOptions?: boolean
  hideDownloadTranscriptPostChat?: boolean
}
```

- `hideNewConversation`: hides the **Start a new conversation** button at the end of a session.
- `hideDownloadTranscriptOptions`: hides the **Download transcript** command in the chat options menu during a session.
- `hideDownloadTranscriptPostChat`: hides the **Download transcript** button at the end of a session.

### Mount the widget

```javascript
ccaas.mount('#ccaas-widget')
```

### Install the headless client

```bash
npm install @ujet/websdk-headless --save
```

Adapted (not in the official docs): the function throws when the response is not `ok` or has no non-empty `token`, so the returned promise rejects instead of resolving with an error body or `{ token: undefined }`.

```javascript
import { Client } from "@ujet/websdk-headless"

async function authenticate() {
  const resp = await fetch("/your-auth-endpoint")
  if (!resp.ok) {
    throw new Error(`token request failed: ${resp.status}`)
  }
  const data = await resp.json()
  if (!data || typeof data.token !== 'string' || data.token === '') {
    throw new Error('token response has no token')
  }
  return { token: data.token }
}

const client = new Client({
  companyId: "COMPANY_KEY",
  host: "https://{your_ccaas_host}",
  authenticate: authenticate,
})

const company = await client.getCompany()
```

## Notes

- Corrected from the official docs: the basic example loads `<script src="https://{your_ccaas_host}web-sdk/v3/widget.js"></script>` (no `/` between the host and the path); the same page writes the host as `https://{your_ccaas_host}` and loads the headless script from `https://{your_ccaas_host}/web-sdk/v3/headless.js`.
- Corrected from the official docs: the basic example passes `companyId: "$COMPANY_ID"` and `host: "$HOST"`. The same page's "Get the company key" steps copy the Company Key as `COMPANY_KEY` ("Initialize the web SDK with your `COMPANY_KEY`"), its `new UJET(options)` snippet uses `companyId: "{COMPANY_KEY}"` and `host: "https://{your_ccaas_host}"`, and the headless install example uses `companyId: "COMPANY_KEY"`; the basic example on this page uses `COMPANY_KEY` and `https://{your_ccaas_host}`.
- Corrected from the official docs: the three token callbacks (`return fetch('/auth/token').then(function(resp) { ... return resp.json(); });` in the basic example, and `const data = await resp.json()` followed by `return { token: data.token }` in the authentication and headless install examples) never check `resp.ok` or the token. `fetch` resolves on HTTP errors such as `401`, so the SDK receives the error JSON or `{ token: undefined }` as the authentication result. The headless guide types the callback as `authenticate: () => Promise<TokenResponse>`, so the page throws (a rejected promise) on a non-`ok` response or a missing token.
- Keep `COMPANY_SECRET` on your server; only `COMPANY_KEY` goes into the widget options. The token endpoint is described in web-sdk-v3-authenticate.md.
- If your production server has a content security policy, add `https://{your_ccaas_host}` to `script-src` and `frame-src`; for the headless install, add `https://{your_ccaas_host}/` to `frame-src`.
- The headless client can alternatively be loaded from the script hosted on your CCAI Platform instance (`https://{your_ccaas_host}/web-sdk/v3/headless.js`).
- The source also shows a custom-data full HTML example, an HTML mount snippet and a hosted-script snippet. Identifiers such as `UJET` and `@ujet/websdk-headless` appear as written in the source.
- Implementation examples: https://github.com/GoogleCloudPlatform/ccaas-web-sdk-v3-examples.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/web-sdk-v3-getting-started (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [web-sdk-v3-authenticate.md](./web-sdk-v3-authenticate.md)
- [headless-web-guide.md](./headless-web-guide.md)
- [ccaas-sdks.md](./ccaas-sdks.md)
