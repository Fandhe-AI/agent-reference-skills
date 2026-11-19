---
source: https://docs.cloud.google.com/infrastructure-manager/docs/deployment-groups
---

# Deployment groups

A deployment group is a collection of deployments arranged in a directed acyclic graph that Infrastructure Manager manages as one logical unit. You can apply (provision) deployments in topological order or delete (deprovision) them in reverse topological order. Each deployment in a group is a deployment unit. This page uses the REST API (`https://config.googleapis.com/v1`).

## Signature / Usage

### Create a test deployment (prerequisite)

```bash
gcloud infra-manager deployments apply projects/PROJECT_ID/locations/LOCATION/deployments/NEW_DEPLOYMENT_ID \
 --service-account=SERVICE_ACCOUNT \
 --git-source-repo="https://github.com/terraform-google-modules/terraform-google-network" \
 --git-source-directory="examples/simple_project_with_regional_network" \
 --git-source-ref="v6.0.1" \
 --input-values=network_name=test-network,project_id=PROJECT_ID \
 --import-existing-resources
```

A deployment group needs an existing deployment. Replace `EXISTING_DEPLOYMENT_ID` with `NEW_DEPLOYMENT_ID` in the following sections.

### Create and get a deployment group

```bash
curl \
    -X POST \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type: application/json" \
    "https://config.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/deploymentGroups/?deployment_group_id=DEPLOYMENT_GROUP_ID" \
    --data '{
      "deploymentUnits": [
        {
            "id": "DEPLOYMENT_UNIT_ID_1",
            "deployment": "projects/PROJECT_ID/locations/LOCATION/deployments/EXISTING_DEPLOYMENT_ID"
        },
        {
            "id": "DEPLOYMENT_UNIT_ID_2",
            "dependencies": ["DEPENDENT_UNIT_ID"]
        }
      ]
    }'
```

```bash
curl \
    -X GET \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type: application/json" \
    "https://config.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/deploymentGroups/DEPLOYMENT_GROUP_ID"
```

### Provision a deployment group

```bash
curl \
    -X POST \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type: application/json" \
    "https://config.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/deploymentGroups/DEPLOYMENT_GROUP_ID:provision" \
    --data '{
      "deploymentSpecs": {
        "DEPLOYMENT_UNIT_ID_2": {
            "deploymentId": "DEPLOYMENT_ID_2",
            "deployment": {
                "terraformBlueprint": {
                    "gitSource": {
                        "directory": "examples/simple_project_with_regional_network",
                        "ref": "v6.0.1",
                        "repo": "https://github.com/terraform-google-modules/terraform-google-network"
                    },
                    "inputValues": {
                        "network_name": {
                            "inputValue": "test-network"
                        }
                    },
                    "externalValues": {
                        "project_id": {
                            "deploymentSource": {
                                "deployment": "projects/PROJECT_ID/locations/LOCATION/deployments/EXISTING_DEPLOYMENT_ID",
                                "outputName": "project_id"
                            }
                        }
                    }
                },
                "serviceAccount": "SERVICE_ACCOUNT",
                "importExistingResources": true
            }
        }
      }
    }'
```

Poll the long-running operation:

```bash
curl \
    -X GET \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type: application/json" \
    "https://config.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID"
```

### List revisions

```bash
curl \
    -X GET \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type: application/json" \
    "https://config.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/deploymentGroups/DEPLOYMENT_GROUP_ID/revisions"
```

### Update a deployment group

```bash
curl \
    -X PATCH \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type: application/json" \
    "https://config.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/deploymentGroups/DEPLOYMENT_GROUP_ID" \
    --data '{
      "deploymentUnits": [
        {
            "id": "DEPLOYMENT_UNIT_ID_3"
        }
      ]
    }'
```

Optionally provision the updated definition by sending a `POST` to the `:provision` endpoint with `deploymentSpecs` for `DEPLOYMENT_UNIT_ID_3` (same shape as above, with `deploymentId` `EXISTING_DEPLOYMENT_ID`, `inputValues` `network_name` and `project_id`, `serviceAccount`, and `importExistingResources`).

### Deprovision a deployment group

```bash
curl \
    -X POST \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type: application/json" \
    "https://config.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/deploymentGroups/DEPLOYMENT_GROUP_ID:deprovision" \
    --data '{
      "deletePolicy": "DELETE",
      "force": true
    }'
```

### Delete a deployment group

Adapted (not in the official docs): the source sends `force` as a JSON body of the `DELETE` request, but in the Discovery document `force` is a query parameter of `deploymentGroups.delete`; it is moved to the URL, and the `Content-Type` header is dropped because the request has no body.

```bash
curl \
    -X DELETE \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    "https://config.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/deploymentGroups/DEPLOYMENT_GROUP_ID?force=true"
```

## Options / Props

| Field / placeholder | Description |
|---|---|
| `deploymentUnits[].id` | ID of a deployment unit in the group. |
| `deploymentUnits[].deployment` | Existing deployment resource name used for the unit. |
| `deploymentUnits[].dependencies` | Unit IDs provisioned before this unit and deprovisioned after it. |
| `deploymentSpecs` | Map of deployment unit ID to deployment definition, used to create or update a deployment during provision. |
| `externalValues` | Takes values from a source deployment's output; the source deployment must be in the same project and location. |
| `deletePolicy` (deprovision) | `DELETE_POLICY_UNSPECIFIED` (resources deleted), `DELETE` (deletes resources actuated by the deployment), `ABANDON` (deletes only the deployment and its metadata). Applied to all deployments in the group. |
| `force` (deprovision) | Propagated to the deletion of each deployment in the group. |
| `force` (delete, query parameter) | If true, revisions of the group are deleted too; otherwise the request works only if the group has no revisions. |
| `deploymentReferencePolicy` (delete, query parameter) | `FAIL_IF_ANY_REFERENCES_EXIST` (default), `FAIL_IF_METADATA_REFERENCES_EXIST`, `IGNORE_DEPLOYMENT_REFERENCES`. |

## Notes

- Required role: Config Admin (`roles/config.admin`); Infra Manager must be enabled and gcloud installed and initialized.
- All deployment units must be in the same project and location as the group. Groups can be created in a region (such as `us-central1`) or a multi-region (like `us`). Cross-region orchestration within a single group isn't supported.
- Provisioning applies deployments in the order defined by the `deploymentUnits` structure. Changes based on the last successful revision are applied. Caution from the source: deployments removed from the last succeeded revision are deleted by Infra Manager along with their resources; removing a deployment from the group definition and provisioning deletes it with its resources.
- A group revision is created after a `provision` or `deprovision` completes. A successful (`done: true`, `step: SUCCEEDED`) operation response indicates completion; the operation metadata reports `deploymentUnitProgresses` with `state` (for example `APPLYING_DEPLOYMENT`, `QUEUED`, `DELETING_DEPLOYMENT`) and `intent` (for example `UPDATE_DEPLOYMENT`, `CREATE_DEPLOYMENT`, `CLEAN_UP`, `RECREATE_DEPLOYMENT`). A deprovisioned group has `provisioningState: DEPROVISIONED`.
- Deprovisioning deletes all referenced deployments and their resources (the source example uses `"deletePolicy": "DELETE"` and `"force": true`); deleting a group after deprovision removes its remaining metadata. Try these on a disposable project first.
- Corrected from the official docs: the delete example in the source sends `--data '{"force": true}'` with a `Content-Type: application/json` header; in the Discovery document (`config.v1`) `force` and `deploymentReferencePolicy` are query parameters of `deploymentGroups.delete`, which has no request body.
- The create example keeps the query name `deployment_group_id` as the source writes it; the Discovery document names the query parameter `deploymentGroupId`.
- The test deployment uses `--import-existing-resources` and a module pinned to the tag `v6.0.1`; `--service-account` takes a service account resource as in the deployments page.
- Credentials come from Application Default Credentials via `gcloud auth application-default print-access-token`. The access token is passed as a curl argument, where it can show up in the process list; run these commands in a trusted shell and do not share their output.
- The example JSON operation responses on the source page (provision in progress, deprovision succeeded) are not reproduced here.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/deployment-groups (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [preview-deployment.md](./preview-deployment.md)
- [custom-constraints.md](./custom-constraints.md)
