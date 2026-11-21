---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy/api-access
---

# API access deployment (runSession and BidiRunSession)

Use the API access deployment option when you implement a custom user interface and want to send conversation messages using the API. For each conversational turn at runtime, call the `runSession` method (`https://ces.googleapis.com/v1`) to send a user message and receive the agent application response. `BidiRunSession` is an alternative that opens a bidirectional streaming (WebSocket) connection.

## Signature / Usage

### Create an API access channel

1. Click **Deploy** at the top of the agent builder.
2. Click **New channel**.
3. Select **Set up API access**.
4. Provide a channel name.
5. Select or create an agent application version.
6. Use the optional **channel-specific behavior** setting to override certain agent application settings for this channel.
7. Click **Create channel**.

A dialog shows the deployment ID and a sample `curl` command. The sample command authenticates with your user credentials through `gcloud`; for a production system, use service accounts for authentication.

### Required IDs

You need the static IDs `PROJECT_ID`, `REGION_ID`, `APPLICATION_ID`, and `DEPLOYMENT_ID` (shown in the **Deployment ID** field of the dialog's command sample), defined in named path segments:

```text
projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/deployments/DEPLOYMENT_ID
```

You also need a dynamic `SESSION_ID`, a unique conversation ID of your choosing that matches the regular expression `[a-zA-Z0-9][a-zA-Z0-9-_]{4,62}`.

### Call runSession (REST)

HTTP method and URL:

```text
POST https://ces.googleapis.com/v1/projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/sessions/SESSION_ID:runSession
```

Request JSON body (save as `request.json`):

Adapted (not in the official docs): removed `config.session`, which the `ces` REST request schema does not define (the URL path carries the session), and the trailing comma after the `deployment` field so the body is valid JSON.

```json
{
  "config": {
    "deployment": "projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/deployments/DEPLOYMENT_ID"
  },
  "inputs": [
    {
      "text": "hi"
    }
  ]
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://ces.googleapis.com/v1/projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/sessions/SESSION_ID:runSession"
```

Response shape (the `diagnosticInfo` content is elided in the source):

```text
{
  "outputs": [
    {
      "text": "Hello there!",
      "turnCompleted": true,
      "turnIndex": 1,
      "diagnosticInfo": {...}
    }
  ]
}
```

### Call BidiRunSession (Node.js, WebSocket)

The `console.log` calls that print the sent queries and the received messages are for local debugging with test data only; a deployed client that passes real user input should log only metadata such as the session ID and the connection state, not conversation content.

`SESSION_ID` identifies one conversation: generate a new ID when a new conversation starts, and reuse that ID only for further messages of the same conversation; never share one ID across conversations or users. Each run of the example below starts one new conversation.

Adapted (not in the official docs): the fixed `const sessionId = 'session-name';` is replaced with `const sessionId = randomUUID();` (with `import {randomUUID} from 'node:crypto';`), so each run starts its own session instead of every run sharing one, as the source's Java and Python `BidiRunSession` samples do with `UUID.randomUUID().toString()` and `str(uuid.uuid4())`.

```javascript
import {randomUUID} from 'node:crypto';
import {GoogleAuth} from 'google-gax';
import {WebSocket} from 'ws';

async function main() {
  const sessionId = randomUUID();
  const appResourceName =
      'projects/project-name/locations/us/apps/app-name';
  const sessionName = `${appResourceName}/sessions/${sessionId}`;
  const query = 'Do you have t-shirt with a cat on it?';
  const query2 = 'What is the weather today?';

  console.log(`Starting bidi session with session name: ${sessionName}`);

  const uri =
      'wss://ces.googleapis.com/ws/google.cloud.ces.v1.SessionService/BidiRunSession/locations/us';

  let token;
  try {
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    token = await auth.getAccessToken();
  } catch (e) {
    console.error(`Failed to get credentials: ${e}`);
    return;
  }

  const headers = {Authorization: `Bearer ${token}`};
  const ws = new WebSocket(uri, {headers});

  ws.on('open', () => {
    console.log('WebSocket connection opened');
    try {
      // 1. Send config message
      const configMessage = {
        config: {session: sessionName},
      };
      const configJson = JSON.stringify(configMessage);
      console.log(`Sending config: ${configJson}`);
      ws.send(configJson);

      // 2. Send query message
      const queryMessage = {
        realtimeInput: {text: query},
      };
      const queryJson = JSON.stringify(queryMessage);
      console.log(`Sending query: ${queryJson}`);
      ws.send(queryJson);

      // 3. Send query message 2
      const queryMessage2 = {
        realtimeInput: {text: query2},
      };
      const queryJson2 = JSON.stringify(queryMessage2);
      console.log(`Sending query 2: ${queryJson2}`);
      ws.send(queryJson2);
    } catch (e) {
      console.error(`Error during on_open: ${e}`);
      ws.close();
    }
  });

  ws.on('message', message => {
    console.log('===============');
    console.log(`Received message: ${message}`);
  });

  ws.on('error', err => {
    console.error(`WebSocket error: ${err}`);
  });

  ws.on('close', (code, reason) => {
    console.log(
        `WebSocket connection closed with code ${code} and reason: ${reason}`);
  });

  console.log('Waiting for 10 seconds for messages...');
  await new Promise(resolve => setTimeout(resolve, 10000));
  console.log('10 seconds elapsed, closing connection.');
  ws.close();
}

main();
```

### gRPC client libraries with ces.googleapis.com

If you use `ces.googleapis.com` as the `apiEndpoint` with a gRPC client library, you must also set `x-goog-request-params` in `otherArgs` to a specific location (Node.js client library example):

```text
const sessionClient = new SessionServiceClient({
 apiEndpoint: 'ces.googleapis.com'
});


const grpc = require('@grpc/grpc-js');
const callOptions = {
  otherArgs: {headers: {'x-goog-request-params': `location=locations/us`}}
};

stream = sessionClient.bidiRunSession(callOptions);
```

If you use `ces.us.rep.googleapis.com` or `ces.eu.rep.googleapis.com`, you don't need to set `x-goog-request-params`.

## Notes

- Corrected from the official docs: the source request body sets `"session": "projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/sessions/SESSION_ID"` inside `config` and ends the `deployment` line with a trailing comma (`"deployment": "projects/...deployments/DEPLOYMENT_ID",`), which is invalid JSON. Both were removed: `SessionConfig` in the Discovery document (`ces.v1`, `ces.v1beta`) defines `deployment`, `entryAgent`, `timeZone` and other fields but no `session`, and the URL path carries the session (`v1/{+session}:runSession`). The source fences the body without a language tag.
- The `outputs` response block is tagged `text` because the source elides `diagnosticInfo` with `{...}`.
- The source's client-library samples set the session on the config (Python `config = ces_v1.SessionConfig(session=session_name)`, Node.js `const config = {session: sessionName};`), and so does the Node.js `BidiRunSession` sample below (`config: {session: sessionName}`, its first WebSocket message), which is kept as written. The `config.session` removal applies only to the REST JSON body, whose schema is the Discovery document's `RunSessionRequest`.
- The gRPC `x-goog-request-params` snippet is a fragment and is tagged `text`: it does not import `SessionServiceClient` and assigns `stream` without declaring it. The source's full Node.js `runSession` sample imports the client with `import {AgentServiceClient, SessionServiceClient} from '../src/v1';` (a path inside the client library repository).
- The source also shows a PowerShell form of the request, `runSession` samples in Java, Python and Node.js, and `BidiRunSession` samples in Go, Java and Python. They were omitted; the Python `runSession` sample also updates the app's root agent before running a session.
- The Node.js `BidiRunSession` sample is shown with the `locations/us` endpoint path; replace the app resource name with your own. Its session ID is generated per run (see the next line); to continue an existing conversation, pass that conversation's stored ID instead of generating a new one.
- Corrected from the official docs: the Node.js `BidiRunSession` sample hard-codes `const sessionId = 'session-name';`, so every run and every conversation would use the same session. The source's Java and Python `BidiRunSession` samples also start from a fixed value (`String sessionId = "session-name";`, `session_id = "session_name"`) but generate `UUID.randomUUID().toString()` / `str(uuid.uuid4())` when it is empty; the page uses `randomUUID()` from the Node.js `node:crypto` module. A UUID matches the `SESSION_ID` pattern `[a-zA-Z0-9][a-zA-Z0-9-_]{4,62}`. It authenticates through Application Default Credentials (`GoogleAuth`).
- Logging: the Node.js `BidiRunSession` sample prints the config, both queries (``console.log(`Sending query: ${queryJson}`)``) and every received message (``console.log(`Received message: ${message}`)``). Use these prints only for local debugging with test data; in a deployed client that handles real user conversations, log metadata (session ID, connection open / close, error codes) and not the conversation text, which can contain personal data.
- The sample `curl` command uses user credentials from `gcloud`; use a service account for production (see the CX Agent Studio authentication page).
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy/api-access (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy.md](./deploy.md)
- [version.md](./version.md)
- [access-control.md](./access-control.md)
