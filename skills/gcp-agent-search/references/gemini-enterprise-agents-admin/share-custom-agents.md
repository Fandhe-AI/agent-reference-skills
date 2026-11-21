---
source: https://docs.cloud.google.com/gemini/enterprise/docs/share-custom-agents
---

# Share agents and transfer agent ownership

Administrators of Gemini Enterprise (formerly Agentspace) can share available agents (Google-made, employee-made and custom-made) with individual users, groups, Workforce Identity Pool groups or all users in the organization, and can transfer ownership of shared employee-made agents to themselves or another user. Both are done on the agent's **User permissions** tab in the Google Cloud console.

## Signature / Usage

### Share an agent (Console)

Gemini Enterprise page > project > app > **Agents** > the agent's **Display name** > **User permissions** tab > **Add user** > choose the **Member type**, enter the member and select a role in **Assign role** > **Save**.

### Workforce Identity Federation principal identifiers

The single-subject principal for **Principal** member type, with or without the `principal:` prefix:

```text
//iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ID
```

```text
principal://iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ID
```

### Transfer ownership (Console)

Agent's **User permissions** tab > **Transfer ownership** > under **Transfer ownership to** choose **Myself** (disabled if you already own the agent) or **Another user** (enter **New owner email** for Google Identity / Cloud Identity, or **New owner principal** for Workforce Identity Federation, using the identifiers above) > **Transfer ownership**.

## Options / Props

### Member types

| Member type | Description |
|---|---|
| User | An individual end user. Enter email addresses in the **Member** field and select a role in **Assign role**. The correct IAM role must be included for this member type to function. |
| Group | A collection of end users. Enter email addresses in the **Member** field and select a role. The correct IAM role must be included. |
| Principal | A single identity in a Workforce Identity Pool (`principal://iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ID`). Enter `//iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ID` or the `principal://` form in **Member**. |
| Workforce Identity Pool | A workforce pool group, custom attribute, or all users in a Workforce Identity Pool (`principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/...`). Enter the principal set identifier (`//iam.googleapis.com/locations/global/workforcePools/POOL_ID/...` or `principalSet://...`) in **Member**. |
| All users | All users in the organization. Select a role in **Assign role**. |

### Principal sets

| Principal or principal set | Description |
|---|---|
| `//iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ID` | A single identity in a workforce identity pool (select the **Principal** member type). |
| `//iam.googleapis.com/locations/global/workforcePools/POOL_ID/group/GROUP_ID` | All workforce identities in a group (select the **Workforce Identity Pool** member type). |
| `//iam.googleapis.com/locations/global/workforcePools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE` | All workforce identities with a specific attribute value (select the **Workforce Identity Pool** member type). |
| `//iam.googleapis.com/locations/global/workforcePools/POOL_ID/*` | All identities in a workforce identity pool (select the **Workforce Identity Pool** member type). |

### Placeholders

| Placeholder | Description |
|---|---|
| `GROUP_ID` | A specific group identifier from an external identity provider (IdP). |
| `POOL_ID` | The unique ID of the workforce identity pool created in Google Cloud. |
| `SUBJECT_ID` | The unique subject identifier (`google.subject`) of a single identity in the pool; case-sensitive and must match the capitalization asserted by the identity provider (for example in the SAML assertion or OIDC token). |
| `ATTRIBUTE_NAME` | A user-defined name of a custom attribute mapped from the IdP. |
| `ATTRIBUTE_VALUE` | The specific value of `ATTRIBUTE_NAME` used to restrict access. |

## Notes

- Requirements: an existing Gemini Enterprise web app. To share custom agents, they must be registered or added through one of: registering A2A agents, registering ADK agents hosted on Agent Runtime (formerly Vertex AI Agent Engine), adding A2A agents from Google Cloud Marketplace, or registering Dialogflow agents. To share employee-made agents, at least one agent must have been created with Workflow Builder in the web app.
- The member types shown depend on the identity provider the app uses: **User** and **Group** for Google identities; **Principal** and **Workforce Identity Pool** for Workforce Identity Federation.
- SCIM: with a third-party identity provider such as Microsoft Entra ID or Okta, configure System for Cross-domain Identity Management (SCIM) provisioning for the workforce identity pool so the **Add user** and **Transfer ownership** dialogs autocomplete users and groups and fill in the exact, case-sensitive `SUBJECT_ID` and `GROUP_ID`. SCIM-based autocomplete requires a dedicated workforce identity pool for each Google Cloud project, and the SCIM attribute mapping must produce the same subject as the pool's `google.subject` mapping. Users and groups appear only after the identity provider has provisioned them through SCIM.
- Sharing with **All users** or a whole pool (`.../workforcePools/POOL_ID/*`) opens the agent to everyone in that scope; choose the role deliberately.
- Ownership transfer: only administrators with the Gemini Enterprise Admin role (`roles/discoveryengine.agentspaceAdmin`) or the Discovery Engine Admin role (`roles/discoveryengine.admin`) can transfer ownership; the current owner cannot unless also an administrator. Only agents that are already shared can be transferred (the **Sharing** column on the **Agents** page must show **Enabled**; private agents cannot). Each agent has exactly one owner. The previous owner becomes a user with the `agentUser` role: can query and run the agent but not edit its configuration or settings. Supported for employee-made agents (low-code and workflow agents created in the web app). A schedule trigger or event trigger on the transferred agent is marked disabled; the new owner must enable it before using the agent.
- Typical transfer scenarios: departing employees, contractor handoffs, team restructuring.
- The source shows Console steps only (no REST or gcloud for this page).
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/share-custom-agents (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [register-and-manage-an-a2a-agent.md](./register-and-manage-an-a2a-agent.md)
- [register-and-manage-an-adk-agent.md](./register-and-manage-an-adk-agent.md)
- [iam-policy-for-apps.md](./iam-policy-for-apps.md)
