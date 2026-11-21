---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started
---

# Get started with CCAI Platform

Contact Center AI Platform (CCAI Platform) is an AI-driven Contact Center as a Service platform that is built natively on Google Cloud and uses the other Gemini Enterprise for Customer Experience products at its core. It is a full-stack contact center platform for queuing and routing customer interactions across voice and digital channels, works alongside CRMs, and reports on contact center agent performance and customer satisfaction. This page covers the instance prerequisites, sizes and quota, non-production instances, billing models, creating an instance, the SDKs, agent workstation requirements, the quickstart for a sample voice-channel contact center (users, teams, IVR, agent assignment to channels), and the portal user roles and permissions.

## Signature / Usage

### Before you begin

- Use the most up-to-date full WebRTC browser. CCAI Platform supports Chrome, Safari, and Firefox, but the most recent version of Chrome is recommended.
- Allow CCAI Platform notifications, permissions and cookies.
- Confirm proper network configuration: firewalls can potentially block incoming support inquiries and other critical capabilities.
- Get quota (see Instance size and quota).

### Set up your Google Cloud project

1. Select an existing project or create a new one.
2. Make sure that billing is enabled for the project.
3. Ask your Google account team to grant quota to your project for CCAI Platform. You can't create an instance without quota. If you don't have a Google account team, connect with an approved CCAI Platform Google partner.
4. Grant the **Contact Center AI Platform Admin** role (`roles/contactcenteraiplatform.admin`) and the **Service Usage Admin** role (`roles/serviceusage.serviceUsageAdmin`) to the identity that creates the instance.

If you haven't enabled the CCAI Platform API for the project, the console shows the **Contact Center AI Platform API** page with an **Enable** button when you open **CCAI Platform**. The service name `contactcenteraiplatform.googleapis.com` is the one used on the audit logging page.

```bash
gcloud services enable my-consumed-service
```

### Create a CCAI Platform instance

Console path: **CCAI Platform** > **Create**. If **Create** is disabled with an insufficient quota message, quota has to be granted; if quota was granted and it is still disabled, make sure the billing ID of the project matches the billing ID the quota was assigned to. Creating the instance can take up to two hours.

- **Region**: can't be changed after you create the instance.
- **Domain prefix**: added to the URL of the instance; can't be changed after you create the instance.
- **Instance size**: depends on the quota you were granted. To change the size later, contact Google Cloud support; changing the size causes downtime lasting between 30 and 60 minutes.
- **Admin information**: name and email address of the administrator; an email with instructions for creating the password is sent to that address. These values cannot be changed after you create the instance.
- **Deployment schedule**: **Rapid** (updates as early as possible), **Regular** (updates at least two days after updates are available with rapid deployment), **Critical** (updates outside your peak business hours, within one week after all regular deployment schedule instances are updated; recommended for production). For **Critical** you must define at least one schedule of peak hours (days, start time and end time in UTC).
- **Login method**: **Email/password** (addresses and passwords specific to this instance) or **SAML** (single sign-on).
- **Private access (Preview)**: restricts public access to the instance from the internet (end-users can still contact your contact center as they normally would). Agents, managers and administrators then need Private Service Connect. Ingress takes **Allowed project IDs** for the Private Service Connect connection; egress takes a service attachment per component type. A private ingress instance gets a service attachment (see **Private access** > **Service attachments** on the instance detail page).
- **Extensions**: optional **Advanced reporting** and **Agent desktop** checkboxes.

### Check the version number of your instance

In the console, open **CCAI Platform** and read the **Version** column; compare it with the CCAI Platform release notes.

### Initial setup areas

Support center details and hours of operation, IVR messages and languages, operation management (timeouts, avatars, agent statuses, target metrics such as SLA and target pick up time, call routing), users and teams, queues and agents, call settings (**Settings** > **Calls** > **Call Details**), chat settings (**Settings** > **Chat**), and **Settings** > **Developer Settings**, which is strictly for developers and holds the information needed for SDKs and custom CRM configurations.

### Quickstart: create a sample contact center

1. Ask your account manager for a demo CCAI Platform instance and provide your project name and ID. After provisioning, verify that you can sign in using the credentials provided.
2. Sign in as an administrator, go to **Settings** > **Users & teams**, and click **+ Add Users**. Fill in **Email** (a valid address that can receive email), **First name**, **Last name** and **Role** (**Agent**). CCAI Platform emails an invitation to set the initial password; if it does not arrive, check spam folders. Repeat to create four users.
3. Create two teams named `Billing Team` and `Support Team` with **+ Add a Team**, then add two agents to each team with **+ Add Agents**.
4. Go to **Settings** > **Queue**, click **Edit/View** under **IVR (Interactive Voice Response)**, edit the **Menu Structure** and add two items, `Support` and `Billing`.
5. For each menu item set **Channel Settings** to **Human Agents**, click **Assign Human Agents**, enter the team in **Cascade Group 1** (`Support Team` for Support) and click **Save**. After a refresh the menu items show numbers in blue boxes; these are the numbered options presented to callers.
6. Test the IVR: go to **Settings** > **Call** and record the **Global Outbound Phone Number**; sign in to the portal as one of the support agents, set the call adapter status to **Available**, and allow microphone access and browser notifications if prompted; from a separate phone line dial the recorded number, press `1` for Support, and answer the call as the agent using the call adapter.
7. Clean up: to avoid charges, delete the project in the console (**Manage resources**, select the project, **Delete**, type the project ID, **Shut down**). Deleting a project triggers the deletion of the CCAI Platform instance.

### Assign agents to channels

- IVR is the standard phone line channel or entry point. Mobile is used once the CCAI Platform SDK is installed in your Android or iOS app. The web channel requires the Web SDK on one or more of your webpages.
- At least one agent must be assigned to a call or chat queue for the queue to be enabled. Agents can only be assigned to a leaf queue, so if a sub-queue exists, assign agents to one of the sub-queues. Queue menus are ready to use when the color turns from red to white.
- IVR: **Settings** > **Queue**, toggle **On**, **Edit / View**, select a queue, check **Instant Voice Call**, **Assign agents**, enter agent or team names and **Save**. For advanced routing use Cascade Groups or Percent Allocation Groups.
- Mobile: **Edit / View** in the Mobile panel. Options per queue are **Email** (sender address and message instructions, **Save Email**), **Chat**, **Scheduled Voice Call** and **Instant Voice Call** (call placed from the app); click **Assign agents** next to each option enabled. Set the fallback to IVR for each queue if you use Mobile calls (Mobile: PSTN Fallback), toggle **Hide Selection from Menu** to hide an option from the SDK, and use Automatic Redirection to send consumers to a message, phone number or voicemail.
- Web: same queue options as Mobile, plus an optional **Enable reCAPTCHA** box for the email option to help prevent spam emails; **Instant Voice Call** here lets customers receive a call-back at the number they enter. To direct an end-user straight to a queue use a Direct Access Point (DAP).

### Portal user roles

Users of the CCAI Platform portal are allocated roles that determine their permissions. There are 6 predefined default roles (Admin, Manager, Manager Data, Manager Teams, Manager Admin, Agent) and any number of custom roles within the limits in Notes. These portal roles are separate from Google Cloud IAM roles.

- **Agent**: the only role that can access the agent adapter (in the portal and in your CRM) and the Agent Desktop (Preview). It has no access to Settings, Monitoring, External storage or Reports. Actions: taking inbound calls, placing outbound calls, listening to voicemails, answering escalation calls.
- **Manager**: for users assigned as team manager to one or more teams; access is partly based on the assigned teams. Queue and call/chat settings by team and queue assignment, team-specific monitoring and reports, chat shortcuts. No agent adapter and no other Settings.
- **Manager: Team**: editable. Assign agents or teams to queues for assigned teams only, queue priority, team-specific monitoring, dashboards and external storage access; no Settings configuration. Can add users and assign or deactivate them.
- **Manager: Data**: editable. As Manager: Team, plus Report Builder with full access to all user data; can configure queues, redirects and per-queue routing options (not enabling the features at the environment level).
- **Manager: Admin**: editable. Assign any agents or teams to queues, full access to Agent & team settings and Target Metrics (**Settings > Operation Management**), full monitoring and Report Builder; no agent adapter, no call and chat settings, no developer settings.
- **Admin**: full access to environment settings, queue configuration, monitoring and reporting, including Developer Settings and the Agent Desktop (Preview) global, queue and team settings. Can modify environment-wide settings (channels, notifications, hours of operation, messages, Auto Answer, Priority routing) and set up technical integrations. No agent adapter.
- Managers must be assigned as team managers under **Settings** > **Users & Team** to see configuration and monitoring data about agents.
- An agent can answer a call or chat only if assigned directly to a queue or to a team that is assigned to a queue.

### Portal custom roles

1. Go to **Settings** > **Users & teams** > **Roles & permissions** > **Add roles**.
2. Enter the role name (20 characters maximum) and the label name shown on **Users & teams** (16 characters maximum), choose a label color, check permissions, and click **Save**.
3. Edit with the pencil icon; users with the edited role need to refresh the browser or sign out and back in. Delete with the **X** icon. The order of the **Roles & permissions** list sets the order in the **Edit User** drop-down (drag to reorder, saved automatically).
4. **Assignable roles** (**Settings** > **Users & Teams** > **Edit User** > **Assignable roles**) limits which roles a user can assign to other users, for example only allowing a Supervisor to assign the agent role.

## Options / Props

### Instance size and concurrent sessions

| Instance size | Concurrent sessions |
|---|---|
| Small | 250. **Note**: The minimum size for a small instance is 25 agents. |
| Medium | 1600 |
| Large | 3800 |
| X-Large | 14,000 |
| 2X-Large | 38,000 |
| 3X-Large | 100,000 |

## Notes

- Non-production instances (trials, development, demonstrations) have a maximum of 250 concurrent sessions and are free except for telephony, which is billed monthly to the billing account of the project. Production traffic on a non-production instance results in the instance being stopped or converted to a production instance, with usage billed to your account. Types: **Trial Small**, **Sandbox Small** (for Google partners), **Dev Small**, and **Time-Limited Trial Small**, which expires after 90 days; when it expires, all configuration settings are lost.
- Billing is monthly under one charging model assigned to the instance: **Concurrent agents** (maximum number of concurrent users with the agent role signed in during the month), **Named agents** (maximum number of users with the agent role during the month), or **Minutes used** (minutes that users with the agent role are signed in during the month). Telephony charges are charged according to consumption.
- SDKs: the Web SDK offers instant web calls, scheduled calls, queue deflection, chat support, proactive triggers (by page URL, time on page, number of visits), mobile web support and Direct Access Points. The iOS and Android SDKs offer VoIP calls, PSTN fallback calls, scheduled calls (15-minute slots based on agent availability), SmartActions, SMS SmartActions, call deflections and Direct Access Points; the Android SDK also converts calls to the main support number made from the device dialer into Mobile calls.
- Working from home: recommended bandwidth is 2 Mbps upload and 2 Mbps download per agent, with a minimum of 1 Mbps per agent. Use a hard-wired connection, a Core i5 or higher processor and at least 8 GB RAM, disable browser extensions that block third-party integrations (for example AdBlock, Ghostery), and use a wired headset. If you use IP allow-listing, see the IP address allow listing page for the CCAI Platform IP addresses.
- The source also shows Console click-paths, headset brands and links to the pages for hours of operation, IVR messages, bulk user management and chat shortcuts; they are omitted here.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/services/enable (gcloud 593.0.0 help); gcloud has no group for CCAI Platform, and the source shows the Console only. Replace `my-consumed-service` with `contactcenteraiplatform.googleapis.com`.
- The role IDs `roles/contactcenteraiplatform.admin` and `roles/serviceusage.serviceUsageAdmin` are the ones the custom constraints page links for these two display names.
- The instance is a tenant of the `contactcenteraiplatform.googleapis.com` API (Discovery document `v1alpha1`: `ContactCenter` resource with `customerDomainPrefix`, `privateAccess`, `advancedReportingEnabled`).
- Quickstart clean up: deleting a project deletes everything in the project, and custom project IDs are lost; to keep URLs that use the project ID, delete selected resources instead of the whole project. Try the quickstart in a disposable project. The quickstart creates test users with real email addresses that receive invitations; use addresses you control.
- The source (mobile section of the channel setup page) writes the menu path as **Settings** > **Queuex**; this appears to be a typo for **Settings** > **Queue**, and the numbered step in that section ends at "See" without a link target.
- Portal role limits: maximum of 100 custom roles per CCAI Platform instance; maximum of 10 roles per user (each user must be given a role upon creation and may be assigned up to 9 more). When multiple roles are assigned, the highest level of permissions is granted. The source says default roles cannot be edited or renamed and that you should create a new role to adjust permissions, but it also says users can now edit the Manager: Team, Manager: Data and Manager: Admin roles (left as written; the two statements conflict).
- Portal permission types: **View** allows viewing the page, **Edit** always grants view access and allows changes. Some permissions have an **assigned teams only** option and dashboard permissions have an **assigned queues only** option; each setting is specific to an individual permission.
- License types (for billing): **Admin** (one or more administrator permissions), **Manager** (one or more manager permissions, no Admin permissions), **Agent** (only agent permissions), **Screen Share agent** (only agent permissions and Screen Share permissions). With several roles the highest impact license type applies: Admin > Manager > Screen Share agent > Agent. Any custom role is assigned a license type. The permission-to-license breakdown is shown as images in the source and is not reproduced here.
- The quickstart, channel setup and user roles pages show the Console only; there are no REST, gcloud or client library examples, and the screenshots are omitted.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs (overview page, retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0). For the countries and Google Cloud regions where CCAI Platform is available, see https://docs.cloud.google.com/contact-center/ccai-platform/docs/localities.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/create-contact-center (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/setup-agents-channels (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/user-roles-permissions (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/ccaip-custom-constraints (role IDs; retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [audit-logging.md](./audit-logging.md)
- [vpc-service-controls.md](./vpc-service-controls.md)
- [ccaip-custom-constraints.md](./ccaip-custom-constraints.md)
