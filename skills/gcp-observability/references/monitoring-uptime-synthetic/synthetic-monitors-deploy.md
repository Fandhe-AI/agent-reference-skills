---
source: https://docs.cloud.google.com/monitoring/synthetic-monitors/create
---

# Create a synthetic monitor with gcloud or REST

With gcloud or the API you deploy a 2nd gen Cloud Run function first, then create the monitor by passing the function's fully qualified name. Only an existing Cloud Run function can be monitored this way.

## Signature / Usage

### Deploy the sample function

```bash
git clone https://github.com/GoogleCloudPlatform/synthetics-sdk-nodejs.git
cd synthetics-sdk-nodejs/samples/generic-synthetic-nodejs
```

Adapted (not in the official docs): `--runtime=nodejs18` changed to `--runtime=nodejs24` because the `nodejs18` runtime was decommissioned on 2025-10-30.

```bash
gcloud functions deploy FUNCTION_NAME \
--gen2 --region="us-west2" --source="." \
--entry-point=SyntheticFunction --trigger-http --runtime=nodejs24
```

The output includes the fully qualified name:

```text
name: projects/PROJECT_ID/locations/REGION/functions/FUNCTION_NAME
```

List functions:

```bash
gcloud functions list
```

```text
NAME: function-1
STATE: ACTIVE
TRIGGER: HTTP Trigger
REGION: us-west2
ENVIRONMENT: 2nd gen
```

### Create the monitor (gcloud)

```bash
gcloud monitoring uptime create DISPLAY_NAME --synthetic-target=TARGET
```

`TARGET` is the fully qualified name of the Cloud Run function; `gcloud monitoring uptime describe` finds the name of a specific function.

### Create the monitor (REST)

Call `projects.uptimeCheckConfigs.create` with parent `projects/PROJECT_ID` and a body that sets `displayName` and `syntheticMonitor` (the function's fully qualified name). Example response (abbreviated in the source):

```text
{
"name": "projects/myproject/uptimeCheckConfigs/17272586127463315332",
"displayName": "MyMonitor",
...
"syntheticMonitor": {
"cloudFunctionV2": {
   "name": "projects/myproject/locations/us-west2/functions/function-1",
   "cloudRunRevision": {
   "type": "cloud_run_revision",
   "labels": {
      "project_id": "myproject",
      "configuration_name": "",
      "location": "us-west2",
      "revision_name": "",
      "service_name": "function-1"
   }
   }
}
}
}
```

### Alerting policy filter

Use the condition filter from synthetic-monitors-create.md with the `CHECK_ID` from the create response; recommended path is Create policy from the Synthetic monitors page in the console.

## Options / Props

### `gcloud functions deploy` settings

| Flag | Value |
|---|---|
| `FUNCTION_NAME` | Unique within its deployment region; no underscore |
| `--gen2` | Required; also set the region |
| `--entry-point` | Mocha: `SyntheticMochaSuite`; not Mocha: `SyntheticFunction` |
| `--runtime` | Source sets `nodejs18` (decommissioned); `nodejs24` above |
| `--trigger-http` | Required |
| `--ingress-settings` | Set when you do not want the default (allow all traffic) |

## Notes

- Corrected from the official docs: `--runtime=nodejs18` (also "Set the `--runtime` field to `nodejs18`.") was changed to `--runtime=nodejs24`. The Cloud Run functions runtime support page (https://docs.cloud.google.com/run/docs/runtime-support, retrieved 2026-11-15) lists `nodejs18` with deprecation 2025-04-30 and decommission 2025-10-30, and `nodejs24` with deprecation 2028-04-30 and decommission 2028-10-31.
- Runtime version: the source says the runtime environment is restricted to Node.js and points to Runtime support for the supported versions. The Terraform sample in the source uses `nodejs20`, which the same runtime support page lists as decommissioned on 2026-10-30, so do not use it either. The source does not state which Node.js versions the `synthetics-sdk-nodejs` sample itself supports.
- Source: https://docs.cloud.google.com/run/docs/runtime-support (retrieved 2026-11-15)
- The sample deploys a function whose default ingress allows all traffic; access still requires IAM permission (Cloud Monitoring is granted it by default). Test only targets you own.
- Console-created monitors deploy their own function and add a default alerting policy; API / gcloud creation requires you to create the alerting policy.
- Verified against gcloud 593.0.0 help: `gcloud monitoring uptime create` accepts `--synthetic-target`; `gcloud functions deploy` accepts `--gen2`, `--entry-point`, `--trigger-http`, `--runtime`, `--source`, `--region` and `--ingress-settings`.
- The source also shows Console steps, Terraform, and an APIs Explorer flow.
- Source inconsistency: the source says "To find the fully qualified name for a specific Cloud Run function, run the `gcloud monitoring uptime describe` command." In gcloud 593.0.0 help, `gcloud monitoring uptime describe CHECK_ID` describes "an uptime check or synthetic monitor", so it takes a check ID and shows the function name only for a monitor that already exists. For a function that is not yet monitored, the fully qualified name is in the `gcloud functions deploy` output shown above (`name: projects/PROJECT_ID/locations/REGION/functions/FUNCTION_NAME`).
- Source: https://docs.cloud.google.com/monitoring/synthetic-monitors/create (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [synthetic-monitors-create.md](./synthetic-monitors-create.md)
- [synthetic-monitors-troubleshooting.md](./synthetic-monitors-troubleshooting.md)
