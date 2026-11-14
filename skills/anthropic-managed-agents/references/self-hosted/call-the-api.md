<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/call-the-api / last verified: 2026-11-14 -->

# Call the API on a self-hosted server

Point the official SDK, cURL, or the `ant` CLI at your self-hosted Claude Managed Agents server, start a session, and read the agent's reply. Then connect workers of your own, if you need them. The server has the same API as the hosted Managed Agents service; only the base URL (your server's address) and the API key (your server API key) change.

## Signature / Usage

Prerequisites: a running server (quickstart or Kubernetes), access to it (address and how to authenticate), and the latest `ant` CLI.

Point the client at the server. The SDK and `ant` CLI read `ANTHROPIC_BASE_URL` and `ANTHROPIC_API_KEY`. For the quickstart stack, run from the directory that holds `.env`:

```bash
export ANTHROPIC_BASE_URL=http://127.0.0.1:8400
export ANTHROPIC_API_KEY=$(grep '^CMA_SERVER__API_KEY=' .env | cut -d= -f2)
```

Put your agent and environment IDs in the shell (example IDs):

```bash
export AGENT_ID=agent_011CYm1BLqPXpQRk5khsSXrs
export ENVIRONMENT_ID=env_01595EKxaaTTGwwY3kyXdtbs
```

Create a session and send the first message in the same request (cURL):

```bash
curl -sS --fail-with-body "$ANTHROPIC_BASE_URL/v1/sessions" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{
    "agent": "'"$AGENT_ID"'",
    "environment_id": "'"$ENVIRONMENT_ID"'",
    "initial_events": [
      {
        "type": "user.message",
        "content": [{"type": "text", "text": "List the files in the working directory."}]
      }
    ]
  }'
```

Same request with the CLI:

```bash
ant beta:sessions create --agent "$AGENT_ID" --environment-id "$ENVIRONMENT_ID" \
  --initial-event '{type: user.message, content: [{type: text, text: "List the files in the working directory."}]}'
```

Same request with the Python SDK:

```python
import os

from anthropic import Anthropic

client = Anthropic()

session = client.beta.sessions.create(
    agent=os.environ["AGENT_ID"],
    environment_id=os.environ["ENVIRONMENT_ID"],
    initial_events=[
        {
            "type": "user.message",
            "content": [
                {"type": "text", "text": "List the files in the working directory."}
            ],
        },
    ],
)
print(session.id)
```

Follow the session in a terminal (the ID starts with `sesn_`):

```bash
ant beta:sessions connect sesn_011CZkZAtmR3yMPDzynEDxu7
```

Send a message and read the reply. Open the event stream first, because a stream delivers only events that come after it opens. Put the session ID in the shell and wait until the session is idle:

```bash
export SESSION_ID=sesn_011CZkZAtmR3yMPDzynEDxu7
```

```python
import os

from anthropic import Anthropic

client = Anthropic()
session_id = os.environ["SESSION_ID"]

with client.beta.sessions.events.stream(session_id) as stream:
    client.beta.sessions.events.send(
        session_id,
        events=[
            {
                "type": "user.message",
                "content": [
                    {"type": "text", "text": "Summarize what you did in one sentence."}
                ],
            },
        ],
    )

    for event in stream:
        match event.type:
            case "agent.message":
                for block in event.content:
                    if block.type == "text":
                        print(block.text, end="")
            case "session.error":
                error_message = event.error.message if event.error else "unknown"
                print(f"\n[Error: {error_message}]")
            case "session.status_idle":
                if event.stop_reason.type != "requires_action":
                    break
            case "session.status_terminated":
                break
```

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const sessionId = process.env["SESSION_ID"]!;

const stream = await client.beta.sessions.events.stream(sessionId);
await client.beta.sessions.events.send(sessionId, {
  events: [
    {
      type: "user.message",
      content: [{ type: "text", text: "Summarize what you did in one sentence." }]
    }
  ]
});

events: for await (const event of stream) {
  switch (event.type) {
    case "agent.message":
      for (const block of event.content) {
        if (block.type === "text") {
          process.stdout.write(block.text);
        }
      }
      break;
    case "session.error":
      console.log(`\n[Error: ${event.error?.message ?? "unknown"}]`);
      break;
    case "session.status_idle":
      if (event.stop_reason.type !== "requires_action") {
        break events;
      }
      break;
    case "session.status_terminated":
      break events;
  }
}
```

The source page also gives C#, Go, Java, PHP, and Ruby versions of both examples. For the event loop, cURL and CLI are not suitable (use an SDK, or `ant beta:sessions connect`).

Loop behavior:

- `session.status_idle`: loop ends unless `stop_reason.type` is `requires_action`.
- `session.status_terminated`: loop ends.
- `session.error`: print the message and keep reading, because the server can retry a failed model call and finish the turn.

### Run your own workers

The quickstart stack and the Helm charts create an environment and run its workers; skip this if those suffice. Your own workers use the same `ant beta:worker` commands and SDK workers as self-hosted sandboxes (except webhook-triggered workers, since your server sends no webhooks).

Create an environment and an environment key with the admin CLI `cma-server-admin` (top of the release archive), not in the Claude Console. `-base-url` is the address where workers reach the server (`http://127.0.0.1:8400` on the quickstart machine, or the `https` address of your TLS proxy for other machines):

```bash
echo "$ANTHROPIC_API_KEY" | ./cma-server-admin bootstrap \
  -base-url http://127.0.0.1:8400 -name my-env -key-file -
```

Output (the key is shown only once):

```text
export ANTHROPIC_BASE_URL='http://127.0.0.1:8400'
export ANTHROPIC_ENVIRONMENT_ID='env_...'
export ANTHROPIC_ENVIRONMENT_KEY='sk-ant-oat01-...'
# then: histchars= HISTFILE=/dev/null ant beta:worker poll --workdir /workspace
# key id: 'etok_...'  expires: '...'
```

Local experiment: run the three `export` lines, then start the worker with these commands (not the printed one):

```bash
mkdir -p "$HOME/cma-workspace" "$HOME/.config/cma"
cat > "$HOME/.config/cma/worker.inputrc" <<'EOF'
$include /etc/inputrc
set disable-completion on
EOF
histchars= HISTFILE=/dev/null INPUTRC="$HOME/.config/cma/worker.inputrc" \
  ant beta:worker poll --workdir "$HOME/cma-workspace"
```

Dockerfile lines for a custom sandbox image (before any `USER` line):

```dockerfile
ENV histchars=
RUN printf '\nset disable-completion on\n' >> /etc/inputrc
ENV INPUTRC=/etc/inputrc TERMINFO=/etc/terminfo HISTFILE=/dev/null
RUN test -r /etc/terminfo/d/dumb
```

## Options / Props

Shell settings behind the worker's `bash` tool:

| Setting | Effect |
|---------|--------|
| `histchars=` | The shell does not treat `!` as a history reference |
| `INPUTRC` | File that turns off completion (which would consume tab characters). Keep it out of the working directory, where the agent's file tools could rewrite it |
| `HISTFILE=/dev/null` | The shell neither reads nor writes a history file |
| `TERMINFO` | Must name the directory holding `d/dumb` (`/etc/terminfo` on Alpine with `bash`; `/lib/terminfo` or `/usr/share/terminfo` on Debian/Ubuntu) |

Hosted guides applied to your server:

| Task | Hosted guide | On your server |
|------|--------------|----------------|
| Agent model, system prompt, versions | Define your agent (`agent-setup`) | Some fields depend on your inference provider |
| Built-in / custom tools | Tools | Turn on web tools via a server setting first; available tools depend on the inference provider |
| MCP server and token | MCP connector, vaults | Add the MCP host to the MCP allowlist; store the token as a `static_bearer` credential |
| Skills | Skills | Upload each skill as individual files (zip is refused); prebuilt skills are not available |
| Memory | Using agent memory | Give workers a writable `/mnt/memory` directory |
| Multiagent | Multiagent orchestration | Replace the `multiagent_20261001` block with a `coordinator` block |
| Git repository | Accessing GitHub | List the Git host in server settings; the example agent also needs `api.githubcopilot.com` on the MCP allowlist |
| Outcomes / grader | Define outcomes | Send the rubric as text; the Files API is not available, so collect output files from the working directory |
| Event stream | Session event stream | Start from the loop above; the hosted guide's first example closes the stream at any pause |

## Notes

- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/call-the-api.md (fetched 2026-11-14).
- Access to self-hosted Claude Managed Agents is requested through your Anthropic account team.
- Distinction: this page is about self-hosted Claude Managed Agents, where you host the whole service. It is not `self_hosted` environments / self-hosted sandboxes (page family `../environments/self-hosted-sandboxes*.md`), where Anthropic hosts the service and you host only the tool-execution worker.
- Base URL and key: in a terminal with these variables set, every `ant` command reaches your server. Do not run Claude Code or `docker compose` in that terminal, because they read the same variables. For raw HTTP, replace `https://api.anthropic.com` with `$ANTHROPIC_BASE_URL`.
- Environments: the quickstart stack creates `compose-sandbox`; the Helm charts create `default`. `ant beta:environments list` prints names and IDs.
- A session started with the server API key appears only to administrators in the console.
- `requires_action` means the session paused for a tool call. A custom tool call or a tool-confirmation request can only be answered by your code. A call to a worker-run tool such as `bash` normally does not pause; if no worker takes it for about 3 minutes, the session pauses until a worker returns the result, so keep the stream open.
- Data in and out of a session goes through the worker's working directory. On the quickstart stack each session container starts with an empty `/workspace` (apart from clones of the session's repositories); about a minute after a turn ends the container exits and Docker deletes it. A container also exits about an hour after it starts, even mid-turn; the turn continues in a new container (usually after a minute or two, with no client event), interrupted tool calls rerun from the start, background commands are not restarted, and `/workspace` is empty again. Have the agent upload or push work as it goes and avoid commands that harm when run twice.
- On Kubernetes a session keeps one pod for about an hour at most; the new pod finds the session's files in `/workspace` and starts about 6 minutes after the old pod stops.
- For workers you start yourself, put input files in the working directory before the message that needs them and read outputs afterward. With a container per session, mount a directory of input files as the working directory and collect outputs after exit.
- Production workers: start one container per session and run `ant beta:worker run` in it. Do not pass `ANTHROPIC_ENVIRONMENT_KEY` into a session's container (the server accepts it for every session in the environment); pass the work item's secret instead, written to a file only the container's user can read, and set `ANTHROPIC_WORK_SECRET_FILE` to its path. Set `ANTHROPIC_BASE_URL` to an address the container can reach (`http://127.0.0.1:8400` is not one).
- SDK workers: build on the latest SDK version (it waits for approval before a tool call that needs it and never runs a call a policy denies; earlier versions run every call at once). The hosted samples that read the environment key do not work as-is.
- Image requirements: Git 2.38 or later, `curl`, `jq`, ripgrep (used by the worker's `grep` tool), the shell settings above, and two scripts from the archive made executable and placed in front of the worker command: `image-build/with-repositories.sh` as `/usr/local/bin/cma-with-repositories` and `image-build/with-egress.sh` as `/usr/local/bin/cma-with-egress` (e.g. `cma-with-egress cma-with-repositories ant beta:worker run ...`; the archive's `kubernetes/sandbox/worker.sh` already does this). Without `cma-with-repositories` the session runs with no repository and the client gets no error.
- A `poll` worker started locally holds the environment key, runs every session's tools in one process, and does not clone repositories; use it for nothing else.
- Environment keys stop working after 365 days. Store the key, its ID, and expiry in your secret manager; keep the server API key off worker machines.
- Moving workers from the hosted service: give the polling process the three printed `export` values, start it with `histchars`, `HISTFILE`, `INPUTRC` set, apply the production changes, and check each image against the image requirements.

## Related

- [overview](./overview.md)
- [quickstart](./quickstart.md)
- [kubernetes](./kubernetes.md)
- [differences](./differences.md)
- [agent-identity](./agent-identity.md)
- [inference-provider](./inference-provider.md)
- [single-sign-on](./single-sign-on.md)
- [console](./console.md)
