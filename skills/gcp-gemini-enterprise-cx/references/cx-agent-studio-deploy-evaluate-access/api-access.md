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

Adapted (not in the official docs): the fixed `const sessionId = 'session-name';` is replaced with `const sessionId = randomUUID();` (with `import {randomUUID} from 'node:crypto';`), so each run starts its own session instead of every run sharing one, as the source's Java and Python `BidiRunSession` samples do with `UUID.randomUUID().toString()` and `str(uuid.uuid4())`; and the first `config` message also sets `deployment` to the API access channel's deployment (`${appResourceName}/deployments/DEPLOYMENT_ID`), as the source's Go `BidiRunSession` sample does, so the session uses the version and channel-specific settings of the deployment you created; and the location `us`, written twice in the source (in the app resource name and at the end of the WebSocket path), is defined once as `const location = 'us';` and used in both, so the WebSocket endpoint and the app, session and deployment always name the same location, as the source's Go `BidiRunSession` sample does with its `-location` flag (`"/ws/google.cloud.ces.v1.SessionService/BidiRunSession/locations/" + *location`); and instead of closing after a fixed 10 seconds, the client sends the second query after the first turn completes, exits normally after the second turn completes (`sessionOutput.turnCompleted`) and logs an error with a non-zero exit code on a credentials failure, a 60-second timeout, an early close, or an `endSession` (top level or in `sessionOutput`) before the second turn completes.

```javascript
import {randomUUID} from 'node:crypto';
import {GoogleAuth} from 'google-gax';
import {WebSocket} from 'ws';

async function main() {
  const sessionId = randomUUID();
  const location = 'us';
  const appResourceName =
      `projects/project-name/locations/${location}/apps/app-name`;
  const sessionName = `${appResourceName}/sessions/${sessionId}`;
  const query = 'Do you have t-shirt with a cat on it?';
  const query2 = 'What is the weather today?';

  console.log(`Starting bidi session with session name: ${sessionName}`);

  const uri =
      `wss://ces.googleapis.com/ws/google.cloud.ces.v1.SessionService/BidiRunSession/locations/${location}`;

  let token;
  try {
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    token = await auth.getAccessToken();
  } catch (e) {
    console.error(`Failed to get credentials: ${e}`);
    process.exitCode = 1;
    return;
  }

  const headers = {Authorization: `Bearer ${token}`};
  const ws = new WebSocket(uri, {headers});

  ws.on('open', () => {
    console.log('WebSocket connection opened');
    try {
      // 1. Send config message
      const configMessage = {
        config: {
          session: sessionName,
          deployment: `${appResourceName}/deployments/DEPLOYMENT_ID`,
        },
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
    } catch (e) {
      console.error(`Error during on_open: ${e}`);
      ws.close();
    }
  });

  let turns = 0;
  let done = false;
  const finish = (ok, why) => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    if (!ok) {
      console.error(why);
      process.exitCode = 1;
    }
    ws.close();
  };
  const timer = setTimeout(
      () => finish(false, 'Timed out before the last turn completed'), 60000);

  ws.on('message', message => {
    console.log('===============');
    console.log(`Received message: ${message}`);
    let msg;
    try {
      msg = JSON.parse(message);
    } catch (e) {
      return;
    }
    const out = msg.sessionOutput || {};
    if (out.turnCompleted) {
      turns += 1;
    }
    if (msg.endSession || out.endSession || turns === 2) {
      if (turns === 2) {
        finish(true);
      } else {
        finish(false, 'Session ended before the last turn completed');
      }
    } else if (out.turnCompleted) {
      // 3. Send query message 2 after the first turn completed
      const queryMessage2 = {
        realtimeInput: {text: query2},
      };
      const queryJson2 = JSON.stringify(queryMessage2);
      console.log(`Sending query 2: ${queryJson2}`);
      ws.send(queryJson2);
    }
  });

  ws.on('error', err => {
    console.error(`WebSocket error: ${err}`);
  });

  ws.on('close', (code, reason) => {
    console.log(
        `WebSocket connection closed with code ${code} and reason: ${reason}`);
    if (!done) {
      finish(false, 'Connection closed before the last turn completed');
    }
  });
}

main();
```

### gRPC client libraries with ces.googleapis.com

If you use `ces.googleapis.com` as the `apiEndpoint` with a gRPC client library, you must also set `x-goog-request-params` in `otherArgs` to a specific location (Node.js client library example). The example uses `locations/us`; use the location of the app you call, the same location as in its resource name:

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
- The source's client-library samples set the session on the config (Python `config = ces_v1.SessionConfig(session=session_name)`, Node.js `const config = {session: sessionName};`), and so does the Node.js `BidiRunSession` sample below (its first WebSocket message keeps `session: sessionName` and adds `deployment`; see the Corrected line below). The `config.session` removal applies only to the REST JSON body, whose schema is the Discovery document's `RunSessionRequest`.
- The gRPC `x-goog-request-params` snippet is a fragment and is tagged `text`: it does not import `SessionServiceClient` and assigns `stream` without declaring it. The source's full Node.js `runSession` sample imports the client with `import {AgentServiceClient, SessionServiceClient} from '../src/v1';` (a path inside the client library repository).
- The source also shows a PowerShell form of the request, `runSession` samples in Java, Python and Node.js, and `BidiRunSession` samples in Go, Java and Python. They were omitted; the Python `runSession` sample also updates the app's root agent before running a session.
- The Node.js `BidiRunSession` sample uses the location `us`; set `location` to your app's location (the location in its resource name) and replace `project-name` and `app-name` with your own. The `ces` Discovery document lists the regional endpoints `https://ces.us.rep.googleapis.com/` (`us`) and `https://ces.eu.rep.googleapis.com/` (`eu`); the WebSocket samples in the source connect to `ces.googleapis.com` with the location at the end of the path.
- Corrected from the official docs: the Node.js `BidiRunSession` sample sends both queries on open, then `await new Promise(resolve => setTimeout(resolve, 10000));` and `ws.close();` whatever has arrived, so slow replies are lost and a cut-off run logs like a normal one. The page uses `sessionOutput` (the Go sample's `BidiSessionServerMessage`) and `turnCompleted` (Discovery `SessionOutput`: "will provide no further output for this turn"); the 60-second timeout is the page's choice. `SessionOutput.endSession` ("Indicates the session has ended.") is checked as well as the Go sample's top-level `endSession`. The source's credentials failure path returns with exit code 0.
- Corrected from the official docs: the Node.js `BidiRunSession` sample writes the location twice, as `'projects/project-name/locations/us/apps/app-name'` and `'wss://ces.googleapis.com/ws/google.cloud.ces.v1.SessionService/BidiRunSession/locations/us'`, so changing only the app resource name to another location (for example `eu`) leaves the WebSocket endpoint at `us`. Its session ID is generated per run (see the next line); to continue an existing conversation, pass that conversation's stored ID instead of generating a new one.
- Corrected from the official docs: the Node.js `BidiRunSession` sample's first message is `config: {session: sessionName},` with no deployment, so it does not select the API access channel created above. `SessionConfig` in the Discovery document (`ces.v1`, `ces.v1beta`) defines `deployment` ("Optional. The deployment of the app to use for the session. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}`"), and the source's Go `BidiRunSession` sample sends `"deployment": *deployment` in its config message; the page adds `deployment` with `DEPLOYMENT_ID` from the channel dialog. The REST `runSession` body above already sets `config.deployment`.
- Corrected from the official docs: the Node.js `BidiRunSession` sample hard-codes `const sessionId = 'session-name';`, so every run and every conversation would use the same session. The source's Java and Python `BidiRunSession` samples also start from a fixed value (`String sessionId = "session-name";`, `session_id = "session_name"`) but generate `UUID.randomUUID().toString()` / `str(uuid.uuid4())` when it is empty; the page uses `randomUUID()` from the Node.js `node:crypto` module. A UUID matches the `SESSION_ID` pattern `[a-zA-Z0-9][a-zA-Z0-9-_]{4,62}`. It authenticates through Application Default Credentials (`GoogleAuth`).
- Logging: the Node.js `BidiRunSession` sample prints the config, both queries (``console.log(`Sending query: ${queryJson}`)``) and every received message (``console.log(`Received message: ${message}`)``). Use these prints only for local debugging with test data; in a deployed client that handles real user conversations, log metadata (session ID, connection open / close, error codes) and not the conversation text, which can contain personal data.
- The sample `curl` command uses user credentials from `gcloud`; use a service account for production (see the CX Agent Studio authentication page).
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy/api-access (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy.md](./deploy.md)
- [version.md](./version.md)
- [access-control.md](./access-control.md)
