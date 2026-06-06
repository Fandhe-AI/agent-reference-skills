# CLI

| Name | Description | Path |
|------|-------------|------|
| vercel activity | View activity events for a linked project or team, with filtering by type, date range, and project. | [activity.md](./activity.md) |
| vercel agent | Generate or update a section about Vercel deployment best practices in the project's agent guidance file (`AGENTS.md` or `CLAUDE.md`). | [agent.md](./agent.md) |
| vercel alerts | List recent alerts for a linked project, a specific project, or an entire team. Supports AI investigation summaries and alert rule management. | [alerts.md](./alerts.md) |
| vercel alias | Apply custom domain aliases to Vercel deployments. | [alias.md](./alias.md) |
| vercel api | Make authenticated HTTP requests to the Vercel API from the terminal. Beta command. | [api.md](./api.md) |
| vercel bisect | Binary search through deployments to find when a bug was introduced, similar to `git bisect` but without rebuilding each commit. | [bisect.md](./bisect.md) |
| vercel blob | Interact with Vercel Blob storage: upload, download, list, delete, copy files, and manage stores. | [blob.md](./blob.md) |
| vercel build | Build a Vercel Project locally or in a CI environment. Output is placed in `.vercel/output` (Build Output API v3 format). | [build.md](./build.md) |
| vercel buy | Purchase Vercel products (credits, addons, subscriptions, domains) from the CLI. | [buy.md](./buy.md) |
| vercel cache | Manage CDN cache and Data cache for a project: purge, invalidate, or dangerously delete cached content. | [cache.md](./cache.md) |
| vercel certs | Manage SSL certificates for domains: list, issue, and remove. Vercel manages certificates automatically. | [certs.md](./certs.md) |
| vercel contract | View contract commitment information for your Vercel account: contract periods, commitment types, and values. | [contract.md](./contract.md) |
| vercel curl | Make HTTP requests to Vercel deployments with automatic deployment protection bypass. Beta command. | [curl.md](./curl.md) |
| vercel deploy | Deploy a Vercel project. Default command when no subcommand is specified. | [deploy.md](./deploy.md) |
| vercel dev | Replicate the Vercel deployment environment locally to test Functions and Middleware without deploying. | [dev.md](./dev.md) |
| vercel dns | Manage DNS records for domains: list, add, remove, and import zone files. | [dns.md](./dns.md) |
| vercel domains | Buy, transfer, and manage domains under the current scope. | [domains.md](./domains.md) |
| vercel env | Manage environment variables in Vercel Projects: list, add, update, remove, pull to file, and run commands with env vars. | [env.md](./env.md) |
| vercel firewall | Manage Vercel Firewall: custom rules, IP blocks, system bypass, attack mode, and system mitigations. Custom rule and IP block changes are staged until published. | [firewall.md](./firewall.md) |
| vercel flags | Manage Vercel Flags (feature flags) for a project: create, list, inspect, update, set variants, split traffic, rollout, enable/disable, archive, delete, and manage SDK keys. | [flags.md](./flags.md) |
| vercel git | Manage Git provider repository connections for a Vercel Project. | [git.md](./git.md) |
| Vercel CLI Global Options | Options available across all Vercel CLI commands. | [global-options.md](./global-options.md) |
| vercel guidance | Enable or disable guidance messages shown after CLI commands. | [guidance.md](./guidance.md) |
| vercel help | Display help information for Vercel CLI commands. | [help.md](./help.md) |
| vercel httpstat | Visualize HTTP request timing statistics for Vercel deployments with automatic deployment protection bypass. Beta command. | [httpstat.md](./httpstat.md) |
| vercel init | Initialize a Vercel supported framework example locally from the official examples repository. | [init.md](./init.md) |
| vercel inspect | Retrieve information about a Vercel deployment by URL or ID. | [inspect.md](./inspect.md) |
| vercel install | Alias for `vercel integration add`. Install a marketplace integration and provision a resource. | [install.md](./install.md) |
| vercel integration | Manage marketplace integrations: provision resources, discover integrations, manage installations, and control individual resources. | [integration.md](./integration.md) |
| vercel link | Link a local directory to a Vercel Project. Stores metadata in `.vercel/project.json`. | [link.md](./link.md) |
| vercel list | List recent deployments for the currently-linked Vercel Project. Alias: `vercel ls`. | [list.md](./list.md) |
| vercel login | Authenticate with your Vercel account through the CLI. | [login.md](./login.md) |
| vercel logout | Log out of your Vercel account through the CLI. | [logout.md](./logout.md) |
| vercel logs | Display request logs or stream live runtime logs for a Vercel project. | [logs.md](./logs.md) |
| vercel mcp | Configure MCP clients (Claude Code, Cursor, VS Code with Copilot, Claude.ai) to use Vercel's hosted MCP endpoint at `https://mcp.vercel.com`. | [mcp.md](./mcp.md) |
| vercel metrics | Query observability metrics and inspect available metrics, dimensions, and aggregations. Requires Observability Plus. | [metrics.md](./metrics.md) |
| vercel microfrontends | Manage Vercel Microfrontends: create groups, add/remove projects, pull configuration for local development. Alias: `vercel mf`. | [microfrontends.md](./microfrontends.md) |
| vercel open | Open the current linked project in the Vercel Dashboard in the default browser. | [open.md](./open.md) |
| Vercel CLI Overview | Command-line interface for managing Vercel Projects, deployments, domains, environment variables, and more from a terminal. | [overview.md](./overview.md) |
| vercel project | Manage Vercel Projects: list, add, inspect, rename, remove, and configure checks, protection, access groups, analytics, Speed Insights, and OIDC tokens. Alias: `vercel projects`. | [project.md](./project.md) |
| vercel promote | Promote an existing deployment to be the current production deployment (assign production domains to it). | [promote.md](./promote.md) |
| vercel pull | Sync environment variables and project settings to a local cache under `.vercel/` for use by `vercel build` and `vercel dev`. | [pull.md](./pull.md) |
| vercel redeploy | Rebuild and redeploy an existing deployment. | [redeploy.md](./redeploy.md) |
| vercel redirects | Manage project-level redirects that apply to all deployments and environments without requiring a new deployment. | [redirects.md](./redirects.md) |
| vercel remove | Remove deployments by URL/ID or remove all deployments for a project. Alias: `vercel rm`. | [remove.md](./remove.md) |
| vercel rollback | Roll back production deployments to a previous deployment. | [rollback.md](./rollback.md) |
| vercel rolling-release | Manage rolling releases to gradually roll out new deployments to a fraction of users. Alias: `vercel rr`. | [rolling-release.md](./rolling-release.md) |
| vercel routes | Manage project-level routing rules (rewrites, redirects, header transforms) that apply to all deployments. Changes are staged until published. | [routes.md](./routes.md) |
| vercel sandbox | Entry point for managing Vercel Sandbox from the CLI. Modeled on the Docker CLI. | [sandbox.md](./sandbox.md) |
| vercel skills | Discover agent skills relevant to the current project or search the skill catalog. | [skills-cmd.md](./skills-cmd.md) |
| vercel switch | Switch the active team scope in the Vercel CLI. | [switch.md](./switch.md) |
| vercel target | List and use custom deployment environments (targets) beyond production, preview, and development. | [target.md](./target.md) |
| vercel teams | Manage teams: list, create, invite members, switch scope, inspect SAML/SSO, list members, and check join-request status. Aliases: `vercel team`, `vercel switch`. | [teams.md](./teams.md) |
| vercel telemetry | Enable or disable CLI telemetry collection. | [telemetry.md](./telemetry.md) |
| vercel traces | Inspect request traces for a linked project or a specific deployment. | [traces.md](./traces.md) |
| vercel usage | View billing usage and costs for the current billing period or a custom date range. | [usage.md](./usage.md) |
| vercel webhooks | Manage webhooks for your Vercel account: list, inspect, create, and remove. Beta command. | [webhooks.md](./webhooks.md) |
| vercel whoami | Display the username of the currently logged-in Vercel user. | [whoami.md](./whoami.md) |
