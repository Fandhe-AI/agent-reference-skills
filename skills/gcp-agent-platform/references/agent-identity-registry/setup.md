---
source: https://docs.cloud.google.com/agent-registry/setup
---

# Set up Agent Registry

To register and discover agents, MCP servers, standalone skills and endpoints in Agent Registry you must enable the Agent Registry API in a Google Cloud project, which becomes your governance project. You can set it up in a single project, or across several projects by configuring a management boundary whose management project is the governance project.

## Signature / Usage

### Set up the gcloud CLI environment

Update the gcloud CLI to the most recent version:

```bash
gcloud components update
```

To use Preview features, install the `alpha` component:

```bash
gcloud components install alpha
```

### Enable the Agent Registry API (single project)

```bash
gcloud services enable agentregistry.googleapis.com \
    --project=PROJECT_ID
```

### Enable the Resource Manager API (multiple projects with a management boundary)

```bash
gcloud services enable cloudresourcemanager.googleapis.com \
    --project=PROJECT_ID
```

`PROJECT_ID` is the ID of your standalone governance project, or of the project you want to use as the management project for your management boundary.

### Disable the Agent Registry API

```bash
gcloud services disable agentregistry.googleapis.com \
    --project=PROJECT_ID
```

## Options / Props

### Roles required to set up Agent Registry (on your project)

| Role | Purpose |
|---|---|
| Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) | Enable the Agent Registry API. |
| Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) | Grant roles for using the Agent Registry API. |
| Agent Registry API Admin (`roles/agentregistry.admin`) | Get full access to Agent Registry API resources. |

### Agent Registry roles to grant to users

| Role | Description |
|---|---|
| Agent Registry API Viewer (`roles/agentregistry.viewer`) | View and search agents, MCP servers, tools, standalone skills, skill revisions, publishers, endpoints and bindings. |
| Agent Registry API Editor (`roles/agentregistry.editor`) | View and edit Agent Registry resources, including registering, updating and deleting agents, MCP servers, tools, endpoints, standalone skills and skill revisions. |
| Agent Registry API Admin (`roles/agentregistry.admin`) | Perform all actions on Agent Registry resources, including registering and managing agents, MCP servers, tools, endpoints, standalone skills, skill revisions, security findings, bindings and skill IAM policies. |
| Agent Registry User (`roles/agentregistry.user`) | View all Agent Registry resources, and create, update and delete standalone skills, skill revisions and security scan settings, without edit access to agents, MCP servers or endpoints. |

## Notes

- Single project: enable the Agent Registry API on the governance project, grant permissions, and no management boundary is needed.
- Multiple projects (management boundary, Preview): enable the Resource Manager API on the project you use to run configuration commands. Define the boundary in Resource Manager (see https://docs.cloud.google.com/resource-manager/docs/manage-capability-configs). When you create a `CapabilityConfig` resource with `agent-management`, Resource Manager automatically enables `agentregistry.googleapis.com` on the management project. Afterwards, enable the API on member projects if needed for local operations and grant roles on the management project (https://docs.cloud.google.com/agent-registry/roles-permissions#boundary-roles). The management boundary is subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support.
- Listing or searching in a location on the management project aggregates auto-discovered resources in that location from all member projects, alongside registered `Service` resources created directly in that location on the management project. Each returned resource name preserves the component's ID and uses the project specified in the request.
- To enable APIs you need `serviceusage.services.enable` (included in Owner, `roles/owner`, or Service Usage Admin).
- If you integrate with Agent Gateway for policy enforcement, also enable the Identity-Aware Proxy API; the gateway uses it to authenticate and authorize egress traffic from your agents to external destinations.
- Agent Registry and Agent Gateway have limited support for Workforce Identity Federation. If you hit loading or authorization errors in the console, use a standard Google Account managed through Cloud Identity or Google Workspace.
- Changing project: disable the API in the old project, then enable it in another one. Your data isn't migrated and you must recreate your resources in the new project. Disabling the API on a project is a destructive step; try it in a disposable project first.
- The source also shows Console steps (Cloud Shell activation, enable and disable API pages).
- Source: https://docs.cloud.google.com/agent-registry/setup (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [quickstart-register-agent.md](./quickstart-register-agent.md)
- [search-agents-and-tools.md](./search-agents-and-tools.md)
