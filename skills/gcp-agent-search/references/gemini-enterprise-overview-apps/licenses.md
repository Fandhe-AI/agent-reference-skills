---
source: https://docs.cloud.google.com/gemini/enterprise/docs/licenses
---

# Get licenses for Gemini Enterprise

How to buy a Gemini Enterprise (formerly Agentspace) subscription, distribute licenses to projects and locations, and assign them to users. The flow is procure (subscription for a billing account), distribute (licenses to projects and locations), assign (licenses to users, manually or automatically).

## Signature / Usage

### View subscription details (billing account license configs, `v1alpha`)

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
  -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_NUMBER" \
  "https://discoveryengine.googleapis.com/v1alpha/billingAccounts/BILLING_ACCOUNT_ID/billingAccountLicenseConfigs" )
```

Sample output:

```text
{
  "billingAccountLicenseConfigs": [{
    "name": "billingAccounts/BILLING_ACCOUNT_ID/billingAccountLicenseConfigs/BILLING_ACCOUNT_LICENSE_CONFIG_ID",
    "licenseCount": "2",
    "licenseConfigDistributions": {"projects/PROJECT_NUMBER/locations/global/licenseConfigs/LICENSE_CONFIG_ID": "1"
    },
    "subscriptionName": "subscriptions/SUBSCRIPTION_NAME",
    "subscriptionTier": "SUBSCRIPTION_TIER",
    "subscriptionTerm": "SUBSCRIPTION_TERM",
    "startDate": ...,
    "endDate": ...,
    "state": "ACTIVE",
    "procurementEntitlementId": "...",
    "subscriptionDisplayName": "...",
    "geminiBundle": true
  }]
}
```

### Distribute licenses to a project (`v1alpha`)

Adapted (not in the official docs): the body is the first-distribution form without the source's `"licenseConfigId": "LICENSE_CONFIG_ID"`; to add seats to an existing project-level license configuration, replace `"licenseCount": LICENSE_COUNT` with `"licenseCount": LICENSE_COUNT, "licenseConfigId": "LICENSE_CONFIG_ID"` (see Notes). The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
  -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_NUMBER" \
  -d '{
    "projectNumber": "TARGET_PROJECT_NUMBER",
    "location": "LOCATION",
    "licenseCount": LICENSE_COUNT
  }' \
  "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/billingAccounts/BILLING_ACCOUNT_ID/billingAccountLicenseConfigs/BILLING_ACCOUNT_LICENSE_CONFIG_ID:distributeLicenseConfig" )
```

### Reclaim unassigned licenses (`v1alpha`)

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
  -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_NUMBER" \
  -d '{
    "licenseConfig": "projects/TARGET_PROJECT_NUMBER/locations/LOCATION/licenseConfigs/LICENSE_CONFIG_ID",
    "licenseCount": LICENSE_COUNT
  }' \
  "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/billingAccounts/BILLING_ACCOUNT_ID/billingAccountLicenseConfigs/BILLING_ACCOUNT_LICENSE_CONFIG_ID:retractLicenseConfig" )
```

### Assign licenses to users manually (`v1`)

Run the command by itself and type each value on its own line at the prompts, in this order: `USER_EMAIL_1`, `USER_EMAIL_2`; `jq` (required) encodes each one as a JSON string, and nothing is sent if a value is missing or empty, or if `jq` fails. A line that follows the command in the same paste or script is read as a value.

Adapted (not in the official docs): the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the values read by one `IFS= read -r` per placeholder (`USER_EMAIL_1`, `USER_EMAIL_2`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"USER_EMAIL_1"` and `"USER_EMAIL_2"` inside the single-quoted `-d '{...}'` argument, so an apostrophe, double quote or backslash in an address cannot break the shell quoting or the JSON. The `licenseConfig` paths end in `LICENSE_CONFIG_ID` instead of the source's `SUBSCRIPTION_ID` (see Notes); every other field is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN USER_EMAIL_1 USER_EMAIL_2 BODY; IFS= read -r USER_EMAIL_1 && IFS= read -r USER_EMAIL_2 &&
[ -n "$USER_EMAIL_1" ] && [ -n "$USER_EMAIL_2" ] &&
BODY=$(printf '%s\n' "$USER_EMAIL_1" "$USER_EMAIL_2" |
jq -Rn '[inputs] as [$user_email_1, $user_email_2] | {
   "inlineSource":{
      "userLicenses":[
         {
            "userPrincipal":$user_email_1,
            "licenseConfig":"projects/PROJECT_NUMBER/locations/LOCATION/licenseConfigs/LICENSE_CONFIG_ID"
         },
         {
            "userPrincipal":$user_email_2,
            "licenseConfig":"projects/PROJECT_NUMBER/locations/LOCATION/licenseConfigs/LICENSE_CONFIG_ID"
         }
      ],
      "updateMask": "userPrincipal,licenseConfig"
   },
   "deleteUnassignedUserLicenses":false
  }') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl -q --fail-with-body -X POST \
  -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/userStores/default_user_store:batchUpdateUserLicenses" \
  --data @- )
```

### List the licenses (`v1`)

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
  -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/userStores/default_user_store/userLicenses" )
```

### Remove users from a license (`v1`)

Run the command by itself and type each value on its own line at the prompts, in this order: `USER_EMAIL_1`, `USER_EMAIL_2`; `jq` (required) encodes each one as a JSON string, and nothing is sent if a value is missing or empty, or if `jq` fails. A line that follows the command in the same paste or script is read as a value.

Adapted (not in the official docs): the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the values read by one `IFS= read -r` per placeholder (`USER_EMAIL_1`, `USER_EMAIL_2`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"USER_EMAIL_1"` and `"USER_EMAIL_2"` inside the single-quoted `-d '{...}'` argument, so an apostrophe, double quote or backslash in an address cannot break the shell quoting or the JSON; every other field is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN USER_EMAIL_1 USER_EMAIL_2 BODY; IFS= read -r USER_EMAIL_1 && IFS= read -r USER_EMAIL_2 &&
[ -n "$USER_EMAIL_1" ] && [ -n "$USER_EMAIL_2" ] &&
BODY=$(printf '%s\n' "$USER_EMAIL_1" "$USER_EMAIL_2" |
jq -Rn '[inputs] as [$user_email_1, $user_email_2] | {
   "inlineSource":{
      "userLicenses":[
         {
            "userPrincipal":$user_email_1
         },
         {
            "userPrincipal":$user_email_2
         }
      ],
      "updateMask": "userPrincipal,licenseConfig"
   },
   "deleteUnassignedUserLicenses":true
  }') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl -q --fail-with-body -X POST \
  -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/userStores/default_user_store:batchUpdateUserLicenses" \
  --data @- )
```

### Request placeholders

- `PROJECT_NUMBER`: the project number or ID that you use to attribute billing and quota for the API call; you must have the Service Usage Consumer role (`roles/serviceusage.serviceUsageConsumer`) on it. For distribute and reclaim you can use `TARGET_PROJECT_NUMBER` if you enabled Discovery Engine on that project. In the `licenseConfig` names of the assign call it is the number of your Google Cloud project.
- `PROJECT_ID`: the ID of your project (user license calls).
- `BILLING_ACCOUNT_ID`: ID of your Google Cloud billing account.
- `BILLING_ACCOUNT_LICENSE_CONFIG_ID`: the Billing Account License Config ID, found in the subscription detail.
- `ENDPOINT_LOCATION`: the multi-region for your API request: `us` for the US multi-region, `eu` for the EU multi-region, `global` for the Global location.
- `LOCATION`: the multi-region of your data store: `global`, `us` or `eu`.
- `TARGET_PROJECT_NUMBER`: the project number you want to distribute licenses to, or reclaim licenses from (the project where you allocated the licenses).
- `LICENSE_COUNT`: the number of licenses to distribute or reclaim.
- `LICENSE_CONFIG_ID`: the ID of an existing project-level license configuration, found in the `licenseConfigDistributions` field of the subscription details. Optional for distribute: if you omit it, the API creates a new license configuration for the specified project number and location; to update an existing one you must include it. Required for reclaim and for assigning users.
- `USER_EMAIL`: the email address of the user to add to or remove from the license.

## Options / Props

### Subscription states

| State | Description |
|---|---|
| Not started | Purchased but not yet active. You can distribute licenses, but users assigned them can't access Gemini Enterprise until the subscription becomes active. |
| Active | Users who have a license in this subscription can access Gemini Enterprise. |
| Deactivating | Licenses are ending early. Users keep access for a grace period of one week; after that the licenses become Expired. |
| Expired | Users lose access when the subscription term ends or when licenses move from Deactivating to Expired. |

### Custom role permissions (instead of Billing Account Administrator)

| Resource | Service | Permissions |
|---|---|---|
| Cloud Billing account | Cloud Billing | `billing.billingAccountPrices.list` |
| Cloud Billing account | Consumer Procurement | `consumerprocurement.orders.get` `consumerprocurement.orders.place` `consumerprocurement.licensePools.assign` `consumerprocurement.licensePools.unassign` `consumerprocurement.licensePools.enumerateLicensedUsers` |
| Cloud Billing account | Discovery Engine | `discoveryengine.billingAccountLicenseConfigs.distribute` `discoveryengine.billingAccountLicenseConfigs.get` `discoveryengine.billingAccountLicenseConfigs.list` `discoveryengine.billingAccountLicenseConfigs.retract` |
| Project | Discovery Engine | `discoveryengine.licenseConfigs.create` `discoveryengine.licenseConfigs.get` `discoveryengine.licenseConfigs.list` `discoveryengine.licenseConfigs.update` `discoveryengine.projects.get` `discoveryengine.projects.provision` `discoveryengine.projects.reportConsentChange` `discoveryengine.userStores.batchUpdateUserLicenses` `discoveryengine.userStores.listUserLicenses` |
| Project | Resource Manager | `resourcemanager.projects.get` `resourcemanager.projects.list` |
| Project | Service Usage | `serviceusage.services.get` `serviceusage.services.list` |

### Exported user CSV columns (up to 1,000,000 user records)

| Column name | Description |
|---|---|
| `user_principal` | The email address of the user. |
| `license_config` | Full resource name of the user's assigned subscription (for example `projects/PROJECT_NUMBER/locations/LOCATION/licenseConfigs/LICENSE_CONFIG_ID`); the ID corresponds to the Gemini Enterprise edition (for example Standard or Plus). |
| `assignment_time` | Timestamp (UTC) when an administrator assigned the license. |
| `last_login_time` | Timestamp (UTC) when the user last signed in. |
| `license_assignment_state` | `ASSIGNED`: the user has an assigned license. `NO_LICENSE`: no license assigned, or an existing one removed. `BLOCKED`: a policy or administrator blocks the user from receiving a license. |

### Troubleshoot export issues

| Issue | Resolution |
|---|---|
| The **Export all users** button is hidden | Make sure that you assigned licenses to users in the selected multi-region. If no users have assigned licenses, the **Export all users** button doesn't appear. |
| The export request fails with a limit-exceeded error | If your user list exceeds the export limit of 1,000,000 users, the Google Cloud console rejects the export request and displays a limit-exceeded error message. |
| The export request fails with a permission denied error | Make sure that your account has the Gemini Enterprise Admin role (`roles/discoveryengine.agentspaceAdmin`), which includes the required `discoveryengine.userStores.listUserLicenses` permission. |

## Notes

- Licenses are specific to a Google Cloud project and a location: users who need an app in both the US and global multi-regions of one project need two separate licenses. Subscriptions are specific to a billing account.
- Required roles: the Gemini Enterprise Admin role (`roles/discoveryengine.agentspaceAdmin`) on the project; to purchase and manage subscriptions, on the Cloud Billing account either Billing Account Administrator (`roles/billing.admin`) or both Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`) and Billing Account Viewer (`roles/billing.viewer`), plus Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) on the project. Users to be licensed need at least the Gemini Enterprise User role (`roles/discoveryengine.agentspaceUser`).
- Console purchase enforces an automatic seat quantity cap that depends on your Cloud Billing account; for more seats or when the maximum-seat error appears, contact Google Cloud sales for an offline order or an allowlist exemption. Standard, Plus and Pay-as-you-go can be bought in the console; subscriptions are monthly or year-long and can renew automatically. Pay-as-you-go licenses can be distributed only to projects linked to the owning billing account; Standard or Plus licenses can go to projects linked to any billing account.
- Cancel a subscription by turning off auto renewal; it stays active until the term ends and Google might charge you until that date.
- Reclaiming licenses (delete a distribution row or lower its count) is limited to once per day.
- Removing a license immediately removes the user's access. `deleteUnassignedUserLicenses` set to `true` deletes the user license instead of leaving it unassigned (the Discovery document: by default `false` updates it to unassigned state). The remove-users example is destructive; try it with a test user first.
- The host pattern `ENDPOINT_LOCATION-discoveryengine.googleapis.com` is the source's; the Discovery documents also list a `us` regional endpoint `https://discoveryengine.us.rep.googleapis.com/`.
- API versions: the `billingAccountLicenseConfigs` get / list calls exist only in `v1alpha`; `distributeLicenseConfig` and `retractLicenseConfig` exist in `v1`, `v1beta` and `v1alpha` but the source uses `v1alpha`; `batchUpdateUserLicenses` and `userLicenses` are used with `v1`. `LICENSE_COUNT` is unquoted in the source JSON bodies (int64).
- The sample output is a fragment (`...` placeholders), so it is tagged `text`. Auto-assignment: when a user without a manual license signs in, a license is taken from the chosen subscription; with no licenses left the user sees a no-access message. "Automatically update expired license" moves users with expired licenses; a previously blocked user gets access within 30 minutes after a new license. Console export (Manage users, select the multi-region, **Export all users**) takes up to 2.5 minutes.
- The source also shows Console steps, FAQs and prepaid-credit purchase steps.
- Source inconsistency (global host): for `ENDPOINT_LOCATION` = `global`, the Gemini Enterprise pages on app IAM policies and ADK / A2A agent registration show example commands with `https://global-discoveryengine.googleapis.com/...`, while the streamAssist page says "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The `discoveryengine` `v1` / `v1beta` / `v1alpha` Discovery documents give the `rootUrl` `https://discoveryengine.googleapis.com/`. Both forms are kept as written. `ENDPOINT_LOCATION` (or the `LOCATION` prefix of the host) sets only the hostname; the `locations/...` segment of the resource path is a separate value.
- Corrected from the official docs: the source's assign and remove commands write `"userPrincipal":"USER_EMAIL_1"` and `"userPrincipal":"USER_EMAIL_2"` inside the single-quoted `curl -d '{...}'` body. An address that contains an apostrophe ends the shell quoting, and `"` or `\` breaks the JSON, so the addresses are read with `IFS= read -r`, passed to `jq -Rn` on standard input by the `printf` builtin (not as arguments) and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Corrected from the official docs: the source's assign command writes `"licenseConfig":"projects/PROJECT_NUMBER/locations/LOCATION/licenseConfigs/SUBSCRIPTION_ID"` and defines `SUBSCRIPTION_ID` as "the ID of your Gemini Enterprise subscription". In the `discoveryengine` Discovery documents (`v1`, `v1alpha`) `UserLicense.licenseConfig` is "The full resource name of the Subscription(LicenseConfig) assigned to the user" and `LicenseConfig.name` has the format `projects/{project}/locations/{location}/licenseConfigs/{license_config}`; in `v1alpha` the `licenseConfigDistributions` keys of `BillingAccountLicenseConfig` are such names. The last segment is therefore the `LicenseConfig` ID, which this page calls `LICENSE_CONFIG_ID` and reads from `licenseConfigDistributions`; the source's own `license_config` field description also writes `licenseConfigs/LICENSE_CONFIG_ID`.
- Adapted from the official docs: the distribute example always sends `licenseConfigId`; `DistributeLicenseConfigRequest.licenseConfigId` (`v1alpha` Discovery) is "Optional. Distribute seats to this license config instead of creating a new one. If not specified, a new license config will be created from the billing account license config."
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/licenses (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [editions.md](./editions.md)
- [create-app.md](./create-app.md)
