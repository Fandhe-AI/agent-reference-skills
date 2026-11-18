---
source: https://docs.cloud.google.com/application-integration/docs/configure-authentication-profiles
---

# Manage authentication profiles

An authentication profile stores the authentication details for a connection to an external application, service or data source. Creating one is a one-time activity and the same profile can be reused in multiple integrations. This page covers roles, the OAuth 2.0 client ID redirect URI, creating / editing / deleting profiles, the eight authentication types, task compatibility and the authentication rules.

## Signature / Usage

### Create an OAuth 2.0 client ID (for OAuth 2.0 authorization code profiles)

In the Console go to **APIs & Services > Credentials**, click **+ Create Credentials > OAuth client ID**, choose application type **Web Application**, enter a name, and under **Authorized redirect URIs** add the following (the `AUTH_PROFILE_REGION` must equal the **Region** you later select for the profile):

```text
https://console.cloud.google.com/integrations/callback/locations/AUTH_PROFILE_REGION
```

### Create a profile with Terraform

The source's Terraform examples create the Application Integration client first and make each `google_integrations_auth_config` depend on it. The client resource (from the source's Auth token example):

```terraform
resource "google_integrations_client" "client" {
  location = "us-central1"
}
```

Adapted (not in the official docs): the source's Service account example requests `cloud-platform` plus the unrelated `adexchange.buyer` and `admob.readonly` scopes; the example keeps only `cloud-platform`.

```terraform
resource "random_id" "default" {
  byte_length = 8
}

resource "google_service_account" "service_account" {
  account_id   = "sa-${random_id.default.hex}"
  display_name = "Service Account"
}
resource "google_integrations_auth_config" "auth_config_service_account" {
  location     = "us-central1"
  display_name = "tf-service-account"
  description  = "Test auth config created via terraform"
  decrypted_credential {
    credential_type = "SERVICE_ACCOUNT"
    service_account_credentials {
    service_account = google_service_account.service_account.email
    scope = "https://www.googleapis.com/auth/cloud-platform"
    }
  }
depends_on = [google_service_account.service_account, google_integrations_client.client]
}
```

### Create, edit and delete a profile

- Create: Application Integration > **Auth Profiles** > **Create**; enter **Profile name**, **Region**, **Description**, then **Continue** and select the **Authentication type** and its fields. Optionally add an SSL/TLS client certificate (**SSL certificate**, **Private key**, **Private key passphrase**). Terraform creates profiles with the `google_integrations_auth_config` resource; each of the source's examples declares `depends_on = [google_integrations_client.client]`, so the `google_integrations_client` resource (the Application Integration client setup) is created first.
- The saved profile appears in the **Authorization profile to use** drop-down of any task that needs authentication; **+ Add new authentication profile** there opens the same dialog.
- Edit: **Auth Profiles** > choose **Region** > Actions menu > **Edit** > **Save**.
- Delete: **Auth Profiles** > choose **Region** > **Delete**.

## Options / Props

### Required roles (granted on an integration)

| Action | IAM role |
|---|---|
| Manage authentication profiles | Application Integration Admin (`roles/integrations.integrationAdmin`) |
| Create authentication profiles | Application Integration Editor (`roles/integrations.integrationEditor`) |
| Edit authentication profiles | Application Integration Editor (`roles/integrations.integrationEditor`) |
| Delete authentication profiles | Application Integration Admin (`roles/integrations.integrationAdmin`) |

### Authentication types

| Type | Properties |
|---|---|
| Auth token | **Type** (`Basic`, `Bearer`, or `MAC`) and **Token**; sent as `Authorization: TYPE CREDENTIALS`. |
| Google OIDC ID Token | **Service account** with permission to access your API; **Audience** (for example the trigger URL for the Cloud Function task). Signed by `accounts.google.com`. |
| JSON Web Token (JWT) | **JWT header** (only the HS256 algorithm), **JWT payload** (registered, public or custom claims), **Secret** (shared key). |
| OAuth 2.0 authorization code | **Authentication endpoint**, **Token endpoint**, **Client ID**, **Secret**, **Scope(s)** (space-separated). |
| OAuth 2.0 client credentials | **Token endpoint**, **Client ID**, **Secret**, **Scope(s)**, **Request types**, **Token parameters** (key-value). |
| OAuth 2.0 resource owner password credentials | Token endpoint, Client ID, Secret, Scope(s), **Username**, **Password**, **Request types**, **Token parameters**. |
| SSL/TLS client certificate only | **SSL certificate** and **Private key** (both PEM-encoded); **Private key passphrase** if required. |
| Service account | **Service account** (principal in your project with permission to access your API); **Scope(s)** (space-separated). |

### Request types (client credentials and resource owner password)

| Request type | Behavior |
|---|---|
| Encoder header | Encodes `CLIENT ID` and `CLIENT SECRET` in Base64 and sends it in the HTTP authorization header; remaining parameters go in the request body. |
| Query parameters | Sends the request parameters in a query string. |
| Request body | Sends the parameters as `application/x-www-form-urlencoded` with `UTF-8` charset in the `entity-body`. |
| Unspecified | Listed for client credentials only. |

### Compatibility of authentication types with tasks

| Authentication type | Compatible tasks and triggers |
|---|---|
| Auth token | Call REST Endpoint |
| Google OIDC ID Token | Call REST Endpoint; Cloud Function |
| JSON Web Token (JWT) | Call REST Endpoint |
| OAuth 2.0 authorization code | Call REST Endpoint; Run Apps Script; Cloud Run functions task |
| OAuth 2.0 client credentials | Call REST Endpoint |
| OAuth 2.0 resource owner password credentials | Call REST Endpoint; Salesforce Trigger |
| SSL/TLS client certificate only | Call REST Endpoint |
| Service account | Call REST Endpoint; Connectors task; Call Integration task; Cloud Run functions task |

## Notes

- Source inconsistency: the Terraform section of the source says "Use the `google_integrations_client` resource.", but every Terraform example on the same page creates the profile with a `google_integrations_auth_config` resource that depends on `google_integrations_client.client`; the page follows the examples.
- Authentication rules: if an integration has both an OAuth 2.0 profile and a user-managed service account, the OAuth 2.0 profile is used by default. If neither is configured, the default service account (`service-PROJECT_NUMBER@gcp-sa-integrations.iam.gserviceaccount.com`) is used; if the task does not use the default service account, the execution fails.
- Run-as authorization change: the authentication rules above are as the source states them. Per https://docs.cloud.google.com/application-integration/docs/prepare-for-authorization-changes, every run must now have an explicit identity (the triggering user or a run-as service account); this already applies to integrations created on or after October 15, 2026 and applies to all existing integrations starting January 15, 2027 (UTC). Do not rely on the default-service-account fallback for new integrations.
- Source: https://docs.cloud.google.com/application-integration/docs/prepare-for-authorization-changes (retrieved 2026-11-18; CC BY 4.0)
- For the Google OIDC ID Token and Service account types, the source says to assign the Service Account Token Creator IAM role to the `service-PROJECT_NUMBER@gcp-sa-integrations.iam.gserviceaccount.com` service account (the Application Integration default service account). Best practices: https://docs.cloud.google.com/iam/docs/best-practices-service-accounts.
- Publishing: after associating a new or updated profile with a task in a draft integration, publish the integration for the change to take effect; testing a draft without publishing still uses the previously published profile. Publish again after editing a profile used by a task with a retry mechanism.
- Deleting an authentication profile is a destructive action (the source gives no undo step); try it on a disposable project first.
- Omitted: the source's other Terraform examples (Auth token, SSL/TLS client certificate, JWT, OAuth 2.0 authorization code, OAuth 2.0 client credentials, OIDC ID token), because they embed sample client secrets, tokens, a certificate and a private key; keep such values out of Terraform source (the source does not say how). Console steps are summarized.
- Adapted from the official docs: the Service account example's `scope` is reduced to `https://www.googleapis.com/auth/cloud-platform`; request only the scopes the tasks that use the profile need.
- Authentication profile credentials are among the data encrypted with CMEK when CMEK is enabled for the region (see the CMEK page).
- Source: https://docs.cloud.google.com/application-integration/docs/cmek (retrieved 2026-11-18; CC BY 4.0)
- Source: https://docs.cloud.google.com/application-integration/docs/configure-authentication-profiles (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [cmek.md](./cmek.md)
- [prepare-for-authorization-changes.md](./prepare-for-authorization-changes.md)
