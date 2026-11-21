---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/headless-web-guide
---

# CCAI Platform headless web SDK

The headless web SDK contains all the web SDK features and lets you build your own UI and UX for them. "Headless" means the frontend presentation layer is decoupled from the backend capabilities, which are exposed through APIs. An example is custom workflow automation: when an end user types "Escalate", an `on("chat.message")` handler can escalate the chat session to a higher-level support team.

## Signature / Usage

### Install

```bash
npm install @ujet/websdk-headless --save
```

Or use the script hosted by UJET:

```html
<script src="https://websdk.ujet.co/v3/headless.js"></script>

<script>
  // The hosted script exposes the client as the global `UJETClient`.
  // const client = new UJETClient(...)
</script>
```

### Create a client

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
  companyId: "YOUR-COMPANY-ID",
  tenant: "YOUR-TENANT-NAME",
  authenticate: authenticate,
})

// const company = await client.getCompany()
// const menus = await client.getMenus()
```

The `Client` class accepts these options:

```typescript
interface ClientOption {
  companyId: string;
  authenticate: () => Promise<TokenResponse>;
  tenant?: string;
  host?: string;
  lang?: string;
  bridge?: string;
  version?: string;
  cobrowse?: {
    enabled?: boolean;
    messages?: CobrowseMessages;
    api?: string;
    license?: string;
    trustedOrigins?: string[];
    capabilities?: string[];
    registration?: boolean;
    redactedViews?: string[];
    unredactedViews?: string[];
    template?: string;
  };
}
```

### Enable logging

The source enables the console logger "During implementation and testing"; keep it to local debugging with test data, because the source does not say whether the SDK log records end-user chat content, and do not enable it for real users.

```javascript
import {Logger, consoleLoggerHandler } from '@ujet/websdk-headless'
Logger.addHandler(consoleLoggerHandler)
```

### Configure Screen Share

```javascript
new Client({
  // ...
  cobrowse: {
    enabled: true,
    license: 'YOUR_SCREEN_SHARE_LICENSE'
  }
})
```

Screen Share options:

```typescript
interface CobrowseOption {
  enabled?: boolean
  // Widget-only - the following template + root options have no effect in the Headless SDK:
  template?: string
  confirmSessionTemplate?: string
  confirmRemoteControlTemplate?: string
  confirmFullDeviceTemplate?: string
  sessionControlsTemplate?: string
  root?: Element
  messages?: {
    confirmSessionTitle: string;
    confirmSessionContent: string;
    confirmRemoteControlTitle: string;
    confirmRemoteControlContent: string;
    confirmFullDeviceTitle: string;
    confirmFullDeviceContent: string;
    allowText: string;
    denyText: string;
    endSessionText: string;
  }
  api?: string
  license?: string
  trustedOrigins?: string[]
  capabilities?: string[]
  registration?: boolean
  redactedViews?: string[]
  unredactedViews?: string[]
  // Headless consent callbacks
  confirmSession?: () => Promise<boolean>
  confirmRemoteControl?: () => Promise<boolean>
  confirmFullDevice?: () => Promise<boolean>

  // Headless session-control callbacks
  showSessionControls?: () => void
  hideSessionControls?: () => void

  // Existing CobrowseIO instance
  instance?: any
}
```

### Events

```javascript
client.on('chat.updated', someFunc)
```

```javascript
client.off('chat.updated', someFunc)
```

```javascript
client.destroy()
```

## Options / Props

### Client properties

| Name | Description |
|---|---|
| `deviceId` | The device's id, determined by the headless SDK on initialization. |
| `lang` | The current Client's language configuration. If lang is passed in configuration, it becomes read-only. |
| `chat` | Only has a value when there is an ongoing chat. |
| `cobrowse` | The underlying CobrowseIO client, available after cobrowse has been initialized |

### Client event methods

| Name | Description |
|---|---|
| `destroy` | Destroys the communicator and all event listeners. |
| `on` | Adds event handler for provided event. |
| `off` | Removes event handler for provided event. |

## Notes

- Corrected from the official docs: the `authenticate` example reads `const data = await resp.json()` and returns `{ token: data.token }` without checking `resp.ok` or the token; `fetch` resolves on HTTP errors such as `401`, so on an error response the client receives `{ token: undefined }`. The `ClientOption` type declares `authenticate: () => Promise<TokenResponse>`, so the page throws (a rejected promise) on a non-`ok` response or a missing token.
- "Google only supports the latest three minor versions of the headless web SDK. To receive support, your website must be using one of these versions of the headless web SDK."
- Installing the headless web SDK needs the support of your organization's web development team.
- Logging: the source introduces `Logger.addHandler(consoleLoggerHandler)` for gathering "additional information in the console log" "During implementation and testing" and does not list what is logged. Use it only for local debugging with test data; in production, log metadata (connection state, error codes) and not conversation content.
- Most `Client` methods propagate HTTP errors as thrown exceptions; wrap calls in `try/catch` unless the method's documentation notes otherwise.
- `.destroy` removes the iframe and all event listeners. The list of emitted events is on https://docs.cloud.google.com/contact-center/ccai-platform/docs/headless-web-events and the API on https://docs.cloud.google.com/contact-center/ccai-platform/docs/headless-web-api.
- The source also shows the default Screen Share dialog HTML template, the message-variable mapping (`$title`, `$content`, `$allow`, `$deny`, `$end`) and the default English message JSON.
- Reference implementation: https://github.com/ayushbisaria/ccaas-web-headless-sdk-sample.git (Node.js backend handles authentication and configuration delivery; plain JavaScript frontend).
- Identifiers such as `UJET`, `UJETClient` and `@ujet/websdk-headless` appear as written in the source.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/headless-web-guide (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [web-sdk-v3-getting-started.md](./web-sdk-v3-getting-started.md)
- [web-sdk-v3-authenticate.md](./web-sdk-v3-authenticate.md)
- [ccaas-sdks.md](./ccaas-sdks.md)
