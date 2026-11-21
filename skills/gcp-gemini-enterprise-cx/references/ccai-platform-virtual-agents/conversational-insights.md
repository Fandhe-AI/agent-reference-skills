---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/conversational-insights
---

# Customer Experience Insights with CCAI Platform

Customer Experience Insights (CX Insights) detects and visualizes patterns in contact center data: it runs machine learning analytics (agent and caller sentiment, entity identification, call topics) and lets you review a conversation with audio playback, transcript synchronization and analytics annotations. It can import conversations from Dialogflow CX and Agent Assist. Quality AI builds on CX Insights for quality evaluations of individual conversations, live agents, and virtual agents. This page covers setting CCAI Platform up to send call recordings and chat transcripts to CX Insights.

## Signature / Usage

### Before you begin

- Enable CX Insights on a Google Cloud project (https://docs.cloud.google.com/contact-center/insights/docs/before-you-begin). You must enable the **Speech-to-Text** API (to generate transcripts from call audio recordings) and the **Cloud Storage API** (to access stored call recordings and transcripts; you can use an existing bucket or create a new one). Google recommends creating a new Cloud Storage bucket specifically for CX Insights, with its own service account key.
- Decide where the integration account's Storage Admin grant applies before you create the key. The key is long-lived and is entered in the CCAI Platform portal, and Storage Admin (`roles/storage.admin`) "Grants full control of objects and buckets"; granted on a project, it covers every bucket and object in that project, even when CX Insights has its own bucket. Keep the project that holds CX Insights and its bucket free of unrelated buckets (for example a project used only for CCAI Platform and CX Insights), so a project-level grant reaches no other data; putting CX Insights in a different project from CCAI Platform is not covered by the official docs (see step 4). If you use a pre-existing bucket, the IAM reference says that "When applied to an individual **bucket**, control applies only to the specified bucket and objects within the bucket", so you can grant the role on that bucket only (`gcloud storage buckets add-iam-policy-binding gs://BUCKET --member=PRINCIPAL --role=ROLE`, with `ROLE` set to `roles/storage.admin`). Whether CCAI Platform and CX Insights work with a bucket-level grant, and whether the portal's **New Google Cloud Storage** setup creates the bucket itself (which would need permission on the project), are not stated in the official docs.
- Create a Google Cloud service account and key in the project where you use CX Insights (the integration service account whose key you enter in CCAI Platform), and grant it these IAM roles (the source says "grant the following IAM roles to your service account" and does not say on which resource): Storage Admin (`roles/storage.admin`) and Contact Center AI Insights editor (`roles/contactcenterinsights.editor`). Do not grant the integration service account the Cloud Speech-to-Text Service Agent role (`roles/speech.serviceAgent`): that is a service agent role for the Google-managed Speech-to-Text service agent, not for a service account that you create and hold a key for (see Notes). The minimum permissions for the integration account are not stated in the official docs.

### Configure CX Insights

1. In the CCAI Platform portal, click **Settings > Developer Settings**.
2. Go to the **Customer Experience Insights** pane, and click **Setup Insights**. The **Enable Customer Experience Insights** dialog appears.
3. Turn on **Enable Customer Experience Insights**.
4. In **Customer Experience Insights Project ID**, enter your CCAI Platform project ID (the source's wording). Use lowercase letters. These steps assume CCAI Platform and CX Insights use the same project, where you enabled CX Insights and created the service account, so that one project ID applies. The official docs do not cover CX Insights in a different project from CCAI Platform; before enabling such a setup, confirm with Google (for example your account team or Support) that it is supported and which project ID this field expects (see Notes).
5. In **Region**, select the region.
6. To send call recordings, turn on **Send call recordings**. To send chat transcripts, turn on **Send chat transcripts**.
7. For **Server Setup**, select **New Google Cloud Storage**.
8. In **GCS Bucket Name**, enter a name for your Cloud Storage bucket.
9. In **Service Account Key**, enter the service account key you created.
10. Optional: in **Folder Path**, edit the folder path. Your edits appear in the paths in the **File Destinations** section. Variables are described in https://docs.cloud.google.com/contact-center/ccai-platform/docs/external-storage#dynamic-folder-path-and-file-names.
11. Click **Save**.

### View CX Insights data

View data in the CX Insights Console (https://ccai.cloud.google.com/insights/projects). The conversation ID in CX Insights is either the CCAI Platform call or chat ID, for example `call-123` or `chat-987`. Session metadata is passed when the conversation is uploaded and appears as labels in the CX Insights information section. The session metadata files that CCAI Platform stores in Cloud Storage can also carry SIP header data, for example (from the pass data parameters page):

```text
"sip_headers": {
  "header 1": "value 1",
  "header 2": "value 2"
}
```

## Options / Props

### Imported labels

| Metadata key | Calls | Chats | Description |
|---|---|---|---|
| hold_duration | ✔ |   | Duration that the end-user was put on hold for in seconds. |
| customer_phone_number | ✔ |   | The phone number of the end-user. |
| outbound_number | ✔ |   | The phone number that the outbound call was placed from (outbound calls only). |
| transfers | ✔ | ✔ | The number of times the call was transferred. |
| has_feedback | ✔ | ✔ | Whether the conversation had a feedback response. |
| fail_reason | ✔ | ✔ | The reason for the failure of the conversation. |
| out_ticket_id | ✔ | ✔ | The ticket ID of the conversation. |
| agent_assist_conversation_id_X\* | ✔ | ✔ | The Agent Assist conversation ID of the conversation. |
| dialogflow_conversation_id_X\* | ✔ | ✔ | The Dialogflow CX conversation ID of the conversation. |
| queue_priority_level | ✔ | ✔ | The priority level of the conversation. |
| answer_type | ✔ | ✔ | The type of the answer. |
| session_type_v2 | ✔ | ✔ | The type of the session. |
| menu | ✔ | ✔ | The menu of the conversation. |

### Other metadata values used within CX Insights

| Metadata key | Calls | Chats | Description |
|---|---|---|---|
| id | ✔ | ✔ | The call or chat ID of the session used for the conversation ID. |
| agent_name | ✔ | ✔ | The name of the human agent that handled the conversation. |
| agent_id | ✔ | ✔ | The internal CCaaS ID that identified the human agent. |
| virtual_agent_id | ✔ | ✔ | The internal CCaaS ID that identified the virtual agent. |

## Notes

- `X` in the `agent_assist_conversation_id_X` and `dialogflow_conversation_id_X` keys is a number based on the leg of the conversation where multiple Agent Assist or Dialogflow CX sessions existed.
- You can't use the same CX Insights instance to consume conversations from multiple Google Cloud Contact Center as a Service instances. This leads to duplicate conversation IDs, which is not supported. Conversations with duplicate conversation IDs fail to be uploaded to CX Insights.
- Session metadata stored in Cloud Storage is updated 15 minutes after completion of the session.
- Failure to grant the correct IAM roles prevents CX Insights from functioning correctly. Follow https://docs.cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys for the service account key.
- The source says: "Google recommends creating a new Cloud Storage bucket specifically for CX Insights, with its own service account key." A dedicated bucket in the same project does not limit a project-level grant, which is why the Before you begin steps above choose the grant's scope (a project with no unrelated buckets, or a bucket-level grant) before the key is created. The quotes on Storage Admin are from the IAM roles reference for Cloud Storage; the `gcloud storage buckets add-iam-policy-binding` form follows its SYNOPSIS in the gcloud 593.0.0 help (`gcloud storage buckets add-iam-policy-binding URL --member=PRINCIPAL --role=ROLE`).
- The role names in the source are the display names Storage Admin, Contact Center AI Insights editor and Cloud Speech-to-Text Service Agent; the IAM role IDs come from the IAM role links in the source (`storage.admin`, `contactcenterinsights.editor`, `speech.serviceAgent`). Contact Center AI Insights is the former name of Customer Experience Insights (API `contactcenterinsights`).
- The source lists Cloud Speech-to-Text Service Agent (`roles/speech.serviceAgent`) as the third role to grant to the service account you create and key; it is not granted here because the IAM roles reference describes it as "Gives Speech-to-Text service account access to Cloud Storage resources." with the warning "Do not grant service agent roles to any principals except service agents.", and granting it to a keyed integration account would let anyone holding the key use a service agent's role. Its six permissions (`storage.buckets.get`, `storage.buckets.list`, `storage.objects.create`, `storage.objects.get`, `storage.objects.list`, `storage.objects.update`) are all included in Storage Admin (`roles/storage.admin`), which the source also lists. The Google-managed Speech-to-Text service agent is a different principal from the integration account; whether CCAI Platform or CX Insights needs anything more for the integration account is not stated in the official docs.
- Source inconsistency: step 4 of the source says "In the **Customer Experience Insights Project ID** field, enter your CCAI Platform project ID.", while its Before you begin section enables CX Insights on a Google Cloud project and creates the service account "in the project where you will be using CX Insights". The two agree when CCAI Platform and CX Insights use the same project. The source does not address separate projects, so the page gives the steps for the same-project setup only; whether a separate-project setup is supported, and which project ID the field expects in it, is not stated in the official docs.
- Snippet taken from https://docs.cloud.google.com/contact-center/ccai-platform/docs/va-pass-data-parameters
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/conversational-insights (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/speech (retrieved 2026-11-14; Cloud Speech-to-Text Service Agent role and its permissions)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storage (retrieved 2026-11-14; Storage Admin permissions)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/add-iam-policy-binding (gcloud 593.0.0 help)

## Related

- [create-a-dialogflow-agent.md](./create-a-dialogflow-agent.md)
- [va-pass-data-parameters.md](./va-pass-data-parameters.md)
