# Templates

Search Vercel templates, check requirements, deploy (create a GitHub repository + create a project), and resume after an interruption

To just create a sample project locally, use `vercel init` (see [setup.md](./setup.md)). `vercel templates` creates a new repository on GitHub and deploys the template's projects. Search results also include types that cannot be deployed from the CLI, such as firewall and routing rules (check feasibility and the reason with `inspect`).

## Signature / Usage

### Searching templates

Search by name and description, and filter with `--framework` / `--type`. Results are a table of slug, name, framework, and deployability; when stdout is not a terminal, output is tab-separated (with a header row). `--limit` defaults to 20 (values over 100 are rounded down to 100).

```sh
vercel templates search "AI chatbot" --framework next.js --limit 10
```

### Checking requirements

Pass a template slug or template ID to check the environment variables, Marketplace resources, Blob stores, and connections required before deploying. `--json` also includes the README (`overview`) and each project's build and install commands.

```sh
vercel templates inspect nextjs-boilerplate --json
```

### Deploying a template

Beforehand, connect your GitHub account to Vercel and install the Vercel GitHub App on the target account. Replace `acme` with your GitHub account or organization and `your-team` with your Vercel team slug. By default a private repository is created (use `--public` to make it public), and the first deployment of a new project goes to production.

```sh
vercel templates deploy nextjs-boilerplate --repo acme/my-site --scope your-team
```

Choose the destination repository and connections interactively (e.g. for templates that require Vercel Connect).

```sh
vercel templates deploy eve-memory-agent
```

### Input via a config file

Pass a JSON file with `--config` to specify project names, resource selections, and environment variable references. Match the key names to the output of `vercel templates inspect <template-slug> --json`. The following `template-inputs.json` is an example for a template with a `starter` project and a `products-0` Marketplace resource (adjust the keys and environment variable names to the template).

```json
{
  "projects": {
    "starter": { "name": "my-site" }
  },
  "env": {
    "API_KEY": { "env": "MY_TEMPLATE_API_KEY" },
    "SIGNING_KEY": { "file": "./secrets/signing-key" },
    "DATABASE_URL": { "resource": "products-0" }
  },
  "resources": {
    "products-0": {
      "integration": "neon",
      "product": "neon",
      "installationId": "icfg_example",
      "plan": "your-plan-id",
      "metadata": { "region": "your-region" },
      "projects": ["starter"]
    }
  }
}
```

Do not write secrets in command arguments; read them from environment variables or files.

### Non-interactive execution

Pass all required inputs and confirm creation with `--yes` (`--yes` does not replace provider authorization or agreement to legal terms). Example with an authorized connector and a private Blob store specified in `eve-inputs.json`.

```sh
vercel templates deploy eve-memory-agent \
  --repo acme/my-eve-agent \
  --scope your-team \
  --config eve-inputs.json \
  --prod --yes --non-interactive --json
```

Exit codes: `0` is success, `1` is an operational failure, invalid configuration, or required setup (`reason` / `message` / `data` are JSON on stderr), `2` is invalid arguments or missing required input, and `130` is a cancelled prompt.

### Resuming after an interruption

If a deployment stops midway, the CLI prints a resume command containing the run ID, team, and config path (`next` in JSON errors). Complete the setup steps shown before running it.

```sh
vercel templates deploy eve-memory-agent \
  --resume <run-id> \
  --scope your-team --config eve-inputs.json --yes
```

If a request times out without an acknowledgment, check the pending operation, then resume with a `reconcile` entry added to the original config (`project:eve-memory-agent` is an example; put the confirmed resource ID in `receipt`).

```json
{
  "reconcile": {
    "operation": "project:eve-memory-agent",
    "receipt": { "id": "prj_your_project_id" }
  }
}
```

## Notes

- Source: https://vercel.com/docs/cli/templates (fetched 2026-11-14)
- Do not retry an uncertain create operation as a new run. Resume uses the same run ID.
