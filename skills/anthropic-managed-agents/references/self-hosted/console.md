<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/console / last verified: 2026-11-14 -->

# Use the console on your server

The console is a webpage that a self-hosted Claude Managed Agents server serves at the same address as its API. In it you create agents, run sessions, and manage environments, credential vaults, memory stores, and skills, with no SDK or CLI.

## Signature / Usage

Redirect URI to add to the identity provider application (trailing slash), with its origin allowed for CORS:

```text
https://cma.example.com/
https://cma.example.com
```

Turn off the console in the settings file, then restart the server:

```yaml
console.serve: false
```

## Options / Props

Who sees what:

| Role | Console shows |
|------|---------------|
| Administrators | Everything on the server, and can change it |
| `developer` or `user` | Every environment; of agents, sessions, vaults, memory stores, and skills, only what they created under their own sign-in |

## Notes

- This is not the Claude Console at platform.claude.com; it shows only what is on your server.
- Set up sign-in (administrator, once): (1) set up single sign-on and the terminal login; the console signs people in through the application registered for the terminal login and checks each token against the first entry of `audiences` in the issuer entry, so list that application's audience first; (2) serve the console over HTTPS with a TLS-terminating proxy in front of port 8400 (over plain HTTP, sign-in works only at `localhost` or `127.0.0.1`); (3) add the server's HTTPS address as a second redirect URI of that application.
- Open `https://cma.example.com/` (the address your applications call) and click **Continue with SSO**. The console doesn't accept the server API key. If it says logging in isn't set up, an administrator must set up sign-in.
- Run an agent: sidebar **Agents** > **Create agent** > choose a starting point such as **Blank agent** and name it > **Create agent**; on the agent's page click **Start session**, select an environment, click **Create session**; send a message in the box at the bottom. Tool calls waiting for you show **Approve** and **Deny**, and the session badge says **Idle** meanwhile.
- A blank agent's built-in tools such as `bash` run on a worker, so select an environment that a worker is polling; with no worker the first tool call waits. Administrators create environments and see an environment's workers on its **Workers** tab.
- Other sessions (for example started through the API) are under **Sessions** in the sidebar.
- An agent or session created with the server API key appears only to administrators.
- The server serves the console by default; with `console.serve: false` agents and sessions keep working through the API.
- Distinct from `self_hosted` environments / self-hosted sandboxes (workers; `../environments/self-hosted-sandboxes*.md`): here you host the whole service; with self-hosted sandboxes Anthropic hosts the service and you host only the tool-execution worker. Access to self-hosted Claude Managed Agents is requested through your Anthropic account team.
- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/console.md (fetched 2026-11-14).

## Related

- [Overview](./overview.md)
- [Single sign-on](./single-sign-on.md)
- [Get started](./quickstart.md)
- [Data and access](./data-and-access.md)
