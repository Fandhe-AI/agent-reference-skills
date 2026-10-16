# Vercel for Azure Pipelines

The Vercel Deployment Extension deploys from Azure DevOps (Azure Pipelines) to Vercel automatically. It works with any Git repository that can integrate with Azure Pipelines, commonly Azure Repos.

## Signature / Usage

```yaml
# vercel-pipeline.yml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: vercel-deployment-task@3
  inputs:
    vercelProjectId: 'prj_mtYj0MP83muZkYDs2DIDfasdas' # Example Vercel Project ID
    vercelTeamId: 'team_ZWx5eW91dGh0b25BvcnRhbnRlYn' # Example Vercel Team ID
    vercelToken: $(VERCEL_TOKEN)
    production: true
```

Full-featured pipeline (preview on pull requests, production on `main`, PR comment):

```yaml
trigger:
- main

pool:
  vmImage: ubuntu-latest

variables:
  isMain: $[eq(variables['Build.SourceBranch'], 'refs/heads/main')]
  isPR: $[eq(variables['Build.Reason'], 'PullRequest')]

steps:
- task: vercel-deployment-task@3
  name: 'Deploy'
  condition: or(eq(variables.isMain, true), eq(variables.isPR, true))
  inputs:
    vercelProjectId: 'prj_mtYj0MP83muZkYDs2DIDfasdas'
    vercelTeamId: 'team_ZWx5eW91dGh0b25BvcnRhbnRlYn'
    vercelToken: $(VERCEL_TOKEN)
    production: $(isMain)
- task: vercel-azdo-pr-comment-task@3
  condition: eq(variables.isPR, true)
  inputs:
    azureToken: $(AZURE_TOKEN)
    deploymentTaskMessage: $(Deploy.deploymentTaskMessage)
```

## Setup steps

1. Create an **empty** Vercel Project with no Git integration: `vercel project add <project-name>` (or create in the dashboard and disconnect Git).
2. Create a Vercel Personal Access Token scoped to the team that owns the project.
3. Store it as a secret pipeline variable `VERCEL_TOKEN`.
4. Install the Vercel Deployment Extension from the Visual Studio marketplace into the Azure DevOps organization.
5. Add the pipeline YAML. `vercelProjectId` is the **Project ID** in **Project Settings > General**; `vercelTeamId` is **Your ID** (Hobby, personal account Settings) or **Team ID** (**Team Settings > General**).

For PR deployments and comments, also create an Azure DevOps Personal Access Token (custom scopes, **Pull Request Threads** Read & Write), store it as secret `AZURE_TOKEN`, and add a **Build Validation** branch policy (Required) on `main`.

## Options / Props

### `vercel-deployment-task` inputs

| Name | Type | Description |
|------|------|-------------|
| `vercelProjectId` | string | Vercel Project ID (starts with `prj_`). Optional; alternatively env `VERCEL_PROJECT_ID` |
| `vercelTeamId` | string | Vercel Team ID (starts with `team_`). Optional; alternatively env `VERCEL_TEAM_ID` |
| `vercelToken` | string | Vercel personal access token with deploy permissions. Optional; alternatively env `VERCEL_TOKEN` |
| `vercelCWD` | string | Working directory for the task; defaults to `System.DefaultWorkingDirectory`. Alternatively env `VERCEL_CWD` |
| `production` | boolean | Create a production deployment; omitted or `false` creates preview deployments |
| `target` | string | Environment to deploy to (production, preview, or custom environment); equivalent to CLI `--target` |
| `archive` | boolean | Enables `--archive=tgz` for the internal Vercel CLI operations |
| `env` | string | Runtime environment variables via CLI `--env` |
| `buildEnv` | string | Build environment variables via CLI `--build-env` |
| `debug` | boolean | Enables `--debug` for the internal Vercel CLI operations |
| `logs` | boolean | Enables `--logs` for the internal Vercel CLI operations |

### `vercel-deployment-task` output variables

| Name | Type | Description |
|------|------|-------------|
| `deploymentTaskMessage` | string | Message from the deployment; pass to the PR comment task |
| `deploymentURL` | string | URL of the deployment |
| `originalDeploymentURL` | string | Original URL of the deployment; usable to create your own alias in a dependent task |

### `vercel-azdo-pr-comment-task` inputs

| Name | Type | Description |
|------|------|-------------|
| `azureToken` | string (required) | Azure Personal Access Token with `PullRequestContribute` permission |
| `deploymentTaskMessage` | string (required) | Comment text added to the pull request, normally produced by the deployment task |

## Notes

- The step must have `name: 'Deploy'` (or similar) so `$(Deploy.deploymentTaskMessage)` can be referenced by the comment task.
- The Vercel project must have no Git integration; deployments are triggered by Azure Pipelines instead.
- Use secret variables (variable group or Azure Key Vault also possible) for tokens.

## Related

- [vercel-for-gitlab.md](./vercel-for-gitlab.md)
- [vercel-for-bitbucket.md](./vercel-for-bitbucket.md)
- [git-integration.md](./git-integration.md)
