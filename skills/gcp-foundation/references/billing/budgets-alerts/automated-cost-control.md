---
source: https://docs.cloud.google.com/billing/docs/how-to/disable-billing-with-notifications
---

# Automated Cost Control with Budget Notifications

Respond to Pub/Sub budget notifications by stopping specific resources or by disabling billing on a project with a Cloud Run function.

## Signature / Usage

Disable billing when cost exceeds budget (Node.js function `stopBilling`, from the official single-script example). The function decodes the base64 Pub/Sub payload, compares `costAmount` with `budgetAmount`, then removes the billing account from the project.

Adapted (not in the official docs): the official sample reads a 1st-gen `pubsubEvent.data`, but the deploy command uses `--gen2` (CloudEvent). The handler is registered with `functions.cloudEvent` and reads `cloudEvent.data.message.data`; it also ignores notifications from budgets other than the dedicated one (`BUDGET_ID`), and `updateProjectBillingInfo` takes `projectBillingInfo` instead of `resource`.

```javascript
const functions = require('@google-cloud/functions-framework');
const {CloudBillingClient} = require('@google-cloud/billing');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const BUDGET_ID = process.env.BUDGET_ID;
const billing = new CloudBillingClient();

functions.cloudEvent('stopBilling', async cloudEvent => {
  const message = cloudEvent.data.message;
  // Only act on notifications of the dedicated budget for this project
  if (!BUDGET_ID || !message.attributes || message.attributes.budgetId !== BUDGET_ID) {
    return 'Ignored: notification from a different budget';
  }
  const pubsubData = JSON.parse(
    Buffer.from(message.data, 'base64').toString()
  );
  if (pubsubData.costAmount <= pubsubData.budgetAmount) {
    return `No action necessary. (Current cost: ${pubsubData.costAmount})`;
  }

  if (!PROJECT_ID) {
    return 'No project specified';
  }

  const billingEnabled = await _isBillingEnabled(PROJECT_NAME);
  if (billingEnabled) {
    return _disableBillingForProject(PROJECT_NAME);
  } else {
    return 'Billing already disabled';
  }
});

const _isBillingEnabled = async projectName => {
  try {
    const [res] = await billing.getProjectBillingInfo({name: projectName});
    return res.billingEnabled;
  } catch (e) {
    console.log(
      'Unable to determine if billing is enabled on specified project, assuming billing is enabled'
    );
    return true;
  }
};

const _disableBillingForProject = async projectName => {
  const [res] = await billing.updateProjectBillingInfo({
    name: projectName,
    projectBillingInfo: {billingAccountName: ''}, // Disable billing
  });
  return `Billing disabled: ${JSON.stringify(res)}`;
};
```

Deploy and wire up (commands from the official script, with the Adapted changes below; the doc comments inside the functions are omitted above). Adapted (not in the official docs): the budget is scoped with `--filter-projects` to the target project only; create it first, then pass its ID to the function as `BUDGET_ID` (the `budgetId` Pub/Sub message attribute is checked by the handler). The `functions-framework` dependency (`@google-cloud/functions-framework`) must be in the function's `package.json`.

```bash
gcloud services enable billingbudgets.googleapis.com \
    cloudbilling.googleapis.com \
    cloudbuild.googleapis.com \
    cloudfunctions.googleapis.com \
    eventarc.googleapis.com \
    run.googleapis.com \
    pubsub.googleapis.com \
    artifactregistry.googleapis.com \
    --project="${PROJECT_ID}"

gcloud pubsub topics create "${TOPIC_ID}" --project="${PROJECT_ID}"

gcloud functions deploy stop-billing-function \
    --gen2 \
    --runtime=nodejs24 \
    --region="${REGION}" \
    --trigger-topic="${TOPIC_ID}" \
    --entry-point=stopBilling \
    --set-env-vars GOOGLE_CLOUD_PROJECT="${PROJECT_ID}",BUDGET_ID="${BUDGET_ID}" \
    --source=./billing_function \
    --project="${PROJECT_ID}"

# Create this dedicated budget (scoped to the target project) BEFORE the deploy above
# and capture its ID as BUDGET_ID.
gcloud billing budgets create \
    --billing-account="${BILLING_ACCOUNT_ID}" \
    --display-name="Budget for ${PROJECT_ID}" \
    --filter-projects="projects/${PROJECT_ID}" \
    --budget-amount="${BUDGET_AMOUNT}" \
    --threshold-rule=percent=1.0 \
    --notifications-rule-pubsub-topic="projects/${PROJECT_ID}/topics/${TOPIC_ID}"
```

The function's service account needs permission to change project billing. The official script grants `roles/billing.admin` on the billing account:

```bash
SERVICE_ACCOUNT=$(gcloud functions describe stop-billing-function --region="${REGION}" --format="value(serviceConfig.serviceAccountEmail)" --project="${PROJECT_ID}")

gcloud billing accounts add-iam-policy-binding "${BILLING_ACCOUNT_ID}" \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/billing.admin"
```

Selective response: stop only Compute Engine instances (Python, entry point `limit_use`, from "Control resource usage with notifications"):

```python
import base64
import json
import os
from googleapiclient import discovery
PROJECT_ID = os.getenv("GCP_PROJECT")
PROJECT_NAME = f"projects/{PROJECT_ID}"
ZONE = "us-west1-b"


def limit_use(data, context):
    pubsub_data = base64.b64decode(data["data"]).decode("utf-8")
    pubsub_json = json.loads(pubsub_data)
    cost_amount = pubsub_json["costAmount"]
    budget_amount = pubsub_json["budgetAmount"]
    if cost_amount <= budget_amount:
        print(f"No action necessary. (Current cost: {cost_amount})")
        return

    compute = discovery.build(
        "compute",
        "v1",
        cache_discovery=False,
    )
    instances = compute.instances()

    instance_names = __list_running_instances(PROJECT_ID, ZONE, instances)
    __stop_instances(PROJECT_ID, ZONE, instance_names, instances)


def __list_running_instances(project_id, zone, instances):
    res = instances.list(project=project_id, zone=zone).execute()

    if "items" not in res:
        return []

    items = res["items"]
    running_names = [i["name"] for i in items if i["status"] == "RUNNING"]
    return running_names


def __stop_instances(project_id, zone, instance_names, instances):
    if not len(instance_names):
        print("No running instances were found.")
        return

    for name in instance_names:
        instances.stop(project=project_id, zone=zone, instance=name).execute()
        print(f"Instance stopped successfully: {name}")
```

## Options / Props

| Item | Value |
|------|-------|
| Prerequisites | Cloud Billing API enabled, budget scoped to a single project, programmatic notifications set up |
| Disable-billing function dependency | `@google-cloud/billing` (Node.js 18+/20+); official Python deps `functions-framework==3.*`, `google-cloud-billing==1.16.2`, `google-cloud-logging==3.12.1` |
| Control-usage dependencies (Python) | `slackclient==2.9.4`, `google-api-python-client==2.131.0` |
| Entry points | `stopBilling` (disable billing), `limitUse` / `limit_use` (stop instances) |
| Suggested role for stopping VMs | Compute Instance Admin (v1), or a narrower custom role |

## Notes

- Warning: disabling billing terminates all Google Cloud services in the project (including Free Tier services); resources may be irretrievably deleted. Re-enabling needs manual configuration with no guarantee of recovery. Use only in disposable or capped projects.
- Warning: the official script grants `roles/billing.admin` to the function's service account, which is very broad (it can manage all billing account settings and IAM). Consider a narrower custom role limited to the permissions needed to unlink a project (see the project-billing-link and managing-access pages), and restrict who can publish to or invoke the function.
- Adapted from the official docs: the official sample uses the 1st-gen `pubsubEvent.data` signature and `resource:` with `--gen2`; corrected to a CloudEvent handler (`cloudEvent.data.message.data`) and `projectBillingInfo`, and the budget is scoped to one project with `--filter-projects` plus a `budgetId` check, so spend in other projects cannot disable this project's billing.
- Doc comments and docstrings of the official samples are omitted for brevity; the code otherwise matches the official text.
- Notifications are delayed, so spend can exceed the budget; set the maximum budget below available funds. Handlers must be idempotent because Pub/Sub is at-least-once.
- A project locked to its billing account cannot have billing disabled; unlock it first.
- The stop-instances sample only stops instances in one zone of one project; adapt for other zones/projects. Check whether `GCP_PROJECT` is set automatically for your runtime.
- Source: https://docs.cloud.google.com/billing/docs/how-to/disable-billing-with-notifications
- Source: https://docs.cloud.google.com/billing/docs/how-to/control-usage
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [programmatic-notifications.md](./programmatic-notifications.md)
- [budgets.md](./budgets.md)
- [../accounts/project-billing-link.md](../accounts/project-billing-link.md)
