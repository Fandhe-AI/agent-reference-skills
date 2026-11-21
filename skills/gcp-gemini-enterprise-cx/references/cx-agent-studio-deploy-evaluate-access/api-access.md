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

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments; the command runs in a subshell that starts with `set +x`, so a shell trace (`set -x`) does not print the token and `TOKEN` does not stay in your shell. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `-q` (the first argument) makes curl skip `.curlrc`, so a `trace` or `trace-ascii` set there cannot record the credential headers.

```bash
( set +x; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
     -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://ces.googleapis.com/v1/projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/sessions/SESSION_ID:runSession" )
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

The example logs only metadata (connection state, message sizes, turn completion), not the queries or the received conversation content.

`SESSION_ID` identifies one conversation: generate a new ID when a new conversation starts, and reuse that ID only for further messages of the same conversation; never share one ID across conversations or users. The Node.js example below generates a new UUID on every run, so each run starts one new conversation. The source's Java and Python samples instead start from a fixed value (`"session-name"`, `"session_name"`) and generate a UUID only when that value is empty; give them an empty or per-conversation ID before running them, or every run reuses one session.

Adapted (not in the official docs): the fixed `const sessionId = 'session-name';` is replaced with `const sessionId = randomUUID();` (with `import {randomUUID} from 'node:crypto';`), so each run starts its own session instead of every run sharing one, as the source's Java and Python `BidiRunSession` samples do with `UUID.randomUUID().toString()` and `str(uuid.uuid4())`; and the first `config` message also sets `deployment` to the API access channel's deployment (`${appResourceName}/deployments/DEPLOYMENT_ID`), as the source's Go `BidiRunSession` sample does, so the session uses the version and channel-specific settings of the deployment you created; and the location `us`, written twice in the source (in the app resource name and at the end of the WebSocket path), is defined once as `const location = 'us';` and used in both, so the WebSocket endpoint and the app, session and deployment always name the same location, as the source's Go `BidiRunSession` sample does with its `-location` flag (`"/ws/google.cloud.ces.v1.SessionService/BidiRunSession/locations/" + *location`); and instead of closing after a fixed 10 seconds, the client sends the second query after the first turn completes, exits normally after the second turn completes (`sessionOutput.turnCompleted`) and logs an error with a non-zero exit code on a credentials failure, a 60-second timeout, an early close, or an `endSession` (top level or in `sessionOutput`) before the second turn completes; and the query and received-message logs print only the query number, the message size and turn completion instead of the full text, and each `sessionOutput` (Discovery `SessionOutput`: `text`, `audio`, `payload`, `turnCompleted` and other fields) is passed to `onAgentOutput`, an empty placeholder for your own display code; an empty token from `getAccessToken()` (no exception) is handled like a credentials failure; and the `close` log prints only the close code, not the server-supplied `reason`; a received message that is not valid JSON or not a JSON object (for example `null` or an array) ends the run with an error; a failure (including the timeout) ends the connection with `ws.terminate()` instead of waiting for the closing handshake, and messages that arrive after the run has ended are ignored; an exception from `ws.send()` (the config, query 1 or query 2) also ends the run through `finish(false, ...)`.

```javascript
import {randomUUID} from 'node:crypto';
import {GoogleAuth} from 'google-gax';
import {WebSocket} from 'ws';

// Your own display function (not part of any library): show the agent's
// reply in your UI, for example output.text or output.payload.
function onAgentOutput(output) {}

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
  if (typeof token !== 'string' || token === '') {
    console.error('Failed to get credentials: no access token');
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
      console.log('Sending query 1');
      ws.send(queryJson);
    } catch (e) {
      finish(false, `Error during on_open: ${e}`);
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
      ws.terminate();
      return;
    }
    ws.close();
  };
  const timer = setTimeout(
      () => finish(false, 'Timed out before the last turn completed'), 60000);

  ws.on('message', message => {
    if (done) return;
    console.log(`Received message (${message.length} bytes)`);
    let msg;
    try {
      msg = JSON.parse(message);
    } catch (e) {
      finish(false, 'Received a message that is not valid JSON');
      return;
    }
    if (msg === null || typeof msg !== 'object' || Array.isArray(msg)) {
      finish(false, 'Received a message that is not a JSON object');
      return;
    }
    const out = msg.sessionOutput || {};
    if (msg.sessionOutput) {
      onAgentOutput(msg.sessionOutput);
    }
    if (out.turnCompleted) {
      turns += 1;
      console.log(`Turn ${turns} completed`);
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
      console.log('Sending query 2');
      try {
        ws.send(queryJson2);
      } catch (e) {
        finish(false, `Error sending query 2: ${e}`);
      }
    }
  });

  ws.on('error', err => {
    console.error(`WebSocket error: ${err}`);
  });

  ws.on('close', code => {
    console.log(`WebSocket connection closed with code ${code}`);
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
- Corrected from the official docs: the Node.js `BidiRunSession` sample sends both queries on open, then `await new Promise(resolve => setTimeout(resolve, 10000));` and `ws.close();` whatever has arrived, so slow replies are lost and a cut-off run logs like a normal one. The page uses `sessionOutput` (the Go sample's `BidiSessionServerMessage`) and `turnCompleted` (Discovery `SessionOutput`: "will provide no further output for this turn"); the 60-second timeout is the page's choice. `SessionOutput.endSession` ("Indicates the session has ended.") is checked as well as the Go sample's top-level `endSession`. The source's credentials failure path returns with exit code 0. The source does not parse received messages (it prints them); the page parses each one, and because `JSON.parse` accepts `null` and arrays, it ends the run with `finish(false, ...)` unless the result is a non-null, non-array object, so `msg.sessionOutput` cannot throw a `TypeError` outside the finish paths. On failure the page calls `ws.terminate()` (ws 8.23.0 `doc/ws.md`: "Forcibly close the connection. Internally, this calls `socket.destroy()`."), because `ws.close()` is documented as "Initiate a closing handshake." and a peer that does not answer would keep the connection open past the 60-second limit; the `message` handler returns at once when the run is finished, so a late turn completion cannot send the second query. The successful path still uses `ws.close()`. The source's `on_open` handler catches a send error with ``console.error(`Error during on_open: ${e}`); ws.close();``, which leaves the exit code at 0 and the message handler running; the page passes it to `finish(false, ...)`, and wraps the second `ws.send()` the same way. The source also sends `Bearer ${token}` without checking the token. google-gax 6.17.0 re-exports `GoogleAuth` from google-auth-library (`export {GoogleAuth, GoogleAuthOptions} from 'google-auth-library';` in https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/index.ts, dependency `^11.3.1`); in google-auth-library 11.3.4, `GoogleAuth.getAccessToken()` returns `(await client.getAccessToken()).token` (https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/googleauth.ts) and `GetAccessTokenResponse` declares `token?: string | null;` (`src/auth/authclient.ts` at the same tag), so the token can be missing without an exception. The page treats a missing or empty token as a credentials failure and does not open the connection.
- Corrected from the official docs: the Node.js `BidiRunSession` sample writes the location twice, as `'projects/project-name/locations/us/apps/app-name'` and `'wss://ces.googleapis.com/ws/google.cloud.ces.v1.SessionService/BidiRunSession/locations/us'`, so changing only the app resource name to another location (for example `eu`) leaves the WebSocket endpoint at `us`. Its session ID is generated per run (see the next line); to continue an existing conversation, pass that conversation's stored ID instead of generating a new one.
- Corrected from the official docs: the Node.js `BidiRunSession` sample's first message is `config: {session: sessionName},` with no deployment, so it does not select the API access channel created above. `SessionConfig` in the Discovery document (`ces.v1`, `ces.v1beta`) defines `deployment` ("Optional. The deployment of the app to use for the session. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}`"), and the source's Go `BidiRunSession` sample sends `"deployment": *deployment` in its config message; the page adds `deployment` with `DEPLOYMENT_ID` from the channel dialog. The REST `runSession` body above already sets `config.deployment`.
- Corrected from the official docs: the Node.js `BidiRunSession` sample hard-codes `const sessionId = 'session-name';`, so every run and every conversation would use the same session. The source's Java and Python `BidiRunSession` samples also start from a fixed value (`String sessionId = "session-name";`, `session_id = "session_name"`) but generate `UUID.randomUUID().toString()` / `str(uuid.uuid4())` when it is empty; the page uses `randomUUID()` from the Node.js `node:crypto` module. A UUID matches the `SESSION_ID` pattern `[a-zA-Z0-9][a-zA-Z0-9-_]{4,62}`. It authenticates through Application Default Credentials (`GoogleAuth`).
- Logging: the Node.js `BidiRunSession` sample prints the config, both queries (``console.log(`Sending query: ${queryJson}`)``) and every received message (``console.log(`Received message: ${message}`)``). The page logs metadata instead, because conversation text can contain personal data. The source's close handler also prints the server-supplied `reason` (`` `WebSocket connection closed with code ${code} and reason: ${reason}` ``); the page prints only the close code, so free-form text from the server cannot add lines or control characters to the log.
- The sample `curl` command uses user credentials from `gcloud`; use a service account for production (see the CX Agent Studio authentication page).
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). The subshell with `set +x` keeps the token out of `set -x` / `bash -x` traces. `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. `-q` is placed first (`man curl` 8.7.1, `-q, --disable`: "If used as the first parameter on the command line, the curlrc config file is not read or used."), because a `trace` / `trace-ascii` in `.curlrc` ("Enables a full trace dump of all incoming and outgoing data") would write the `Authorization` header to a file.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy/api-access (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://github.com/websockets/ws/blob/8.23.0/doc/ws.md (`websocket.close()` and `websocket.terminate()`; retrieved 2026-11-21, pinned at tag 8.23.0)
- Source: https://ces.googleapis.com/$discovery/rest?version=v1 (Discovery document `ces.v1`, revision 20261016)
- Source: https://ces.googleapis.com/$discovery/rest?version=v1beta (Discovery document `ces.v1beta`, revision 20261016)

## Related

- [deploy.md](./deploy.md)
- [version.md](./version.md)
- [access-control.md](./access-control.md)
