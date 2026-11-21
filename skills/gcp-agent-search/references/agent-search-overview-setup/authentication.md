---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/authentication
---

# Authenticate to Agent Search

How to authenticate programmatically to Agent Search (formerly Vertex AI Search; Discovery Engine API) through client libraries (Application Default Credentials) or REST (gcloud CLI credentials or ADC), where API keys are accepted, and how to set up authentication for local development, on Google Cloud, and on-premises.

## Signature / Usage

### Local development: ADC for client libraries

Install and initialize the Google Cloud CLI:

```bash
gcloud init
```

If you're using an external identity provider (IdP), first sign in to the gcloud CLI with your federated identity. In a local shell, create local authentication credentials for your user account (not needed in Cloud Shell):

```bash
gcloud auth application-default login
```

### Local development: REST requests from the command line

Use gcloud CLI credentials with `gcloud auth print-access-token`. The source's example lists service accounts for a project (the same pattern applies to any REST request); replace `PROJECT_ID`:

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
     -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts" )
```

### Local development: service account impersonation

Requires the `iam.serviceAccounts.getAccessToken` permission, included in the Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) role. Configure gcloud to impersonate:

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

Create a local ADC file with impersonation (supported only for the Go, Java, Node.js and Python client libraries):

```bash
gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### On Google Cloud: attach a service account

For code running on a Google Cloud compute resource, use the service account attached to it (the preferred method). For most services you must attach the service account when you create the resource; Compute Engine lets you attach one at any time. To create the service account and grant it roles, the source says: "Ensure that you have the Create Service Accounts IAM role (`roles/iam.serviceAccountCreator`) and the Project IAM Admin role (`roles/resourcemanager.projectIamAdmin`)." To attach it, the source grants "the required role to the principal that will attach the service account to other resources": Service Account User (`roles/iam.serviceAccountUser`) on the service account (command below). Creating the Compute Engine instance itself also needs the `compute.instances.create` permission, for example through Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`); this is not stated in this page of the official docs (see Notes).

Adapted (not in the official docs): added `--project=PROJECT_ID`, so the service account is created in the project that the next commands use (`SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`) and not in the project set in your gcloud configuration; `--project` is listed under GCLOUD WIDE FLAGS in the gcloud 593.0.0 help.

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME --project=PROJECT_ID
```

Grant a role to the service account (`ROLE` is the role to grant):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

Grant the principal that will attach the service account the Service Account User role (`USER_EMAIL` is a Google Account email):

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

Create a Compute Engine instance with the service account attached. Without `--scopes`, the instance gets the default scopes, which do not include `cloud-platform`; the example sets `--scopes=cloud-platform` and leaves what the service account can do to its IAM roles, so grant only the roles it needs:

Adapted (not in the official docs): added `--scopes=cloud-platform`; gcloud 593.0.0 `compute instances create` help says "the level of access that a service account has is determined by a combination of access scopes and IAM roles so you must configure both access scopes and IAM roles", and its `default` alias list does not include `https://www.googleapis.com/auth/cloud-platform`. Also added `--project=PROJECT_ID` (a GCLOUD WIDE FLAGS entry in the same help), so the instance is created in the project of the service account and not in the project set in your gcloud configuration. `--service-account` names the account created and granted roles above, instead of `SERVICE_ACCOUNT_EMAIL`.

```bash
gcloud compute instances create INSTANCE_NAME --project=PROJECT_ID --zone=ZONE --service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --scopes=cloud-platform
```

## Notes

- API keys: Agent Search supports API keys for these API methods:
  - `userEvents.Collect`: See "Create an API key" in the record user events guide
  - `servingConfigs.searchLite`: See "Get search results for an app with website data (API key)"
- API keys associate an API call with a project (for billing and quota purposes) without determining the identity of the caller, and work only with API methods that support them.
- In production environments, do not grant the Owner, Editor, or Viewer roles to the service account; grant a predefined role or custom role that meets your needs.
- Outside Google Cloud (on-premises or another cloud provider), the preferred method is workload identity federation (see "Set up ADC for on-premises or another cloud provider").
- Authorization: after authenticating you must be authorized through IAM; see access-control.md.
- The twin also shows a PowerShell variant of the REST request, omitted here.
- Client-library code in this skill uses ADC, as the source does. Gemini Developer API keys (Google AI Studio) are a different product and are covered by the `google-gemini-api` skill.
- Corrected from the official docs: the instance example was `gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL`, which leaves the default access scopes; the Discovery Engine API needs the `cloud-platform` scope, and the service account's IAM roles still limit what it can do.
- Corrected from the official docs: the source's `gcloud iam service-accounts create SERVICE_ACCOUNT_NAME` and instance example have no `--project`, so they use the project in the gcloud configuration, while the following commands name `PROJECT_ID`; both examples add `--project=PROJECT_ID`. The source's instance example also writes `--service-account=SERVICE_ACCOUNT_EMAIL`, a placeholder used nowhere else; it is replaced with `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`, the account the steps above create and grant roles to.
- Instance creation permission (not stated in this page of the official docs): the IAM roles and permissions reference for Compute Engine (https://docs.cloud.google.com/iam/docs/roles-permissions/compute, retrieved 2026-11-14 as recorded in the gcp-compute skill) lists `compute.instances.create` in `roles/compute.instanceAdmin.v1`, `roles/compute.instanceAdmin`, `roles/compute.admin` and other roles. The roles above (`roles/iam.serviceAccountCreator`, `roles/resourcemanager.projectIamAdmin`, `roles/iam.serviceAccountUser`) do not include it.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/authentication (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [before-you-begin.md](./before-you-begin.md)
- [access-control.md](./access-control.md)
- [migrate-from-cse.md](./migrate-from-cse.md)
