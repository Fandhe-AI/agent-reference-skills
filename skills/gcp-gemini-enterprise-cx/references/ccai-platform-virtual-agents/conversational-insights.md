---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/conversational-insights
---

# Customer Experience Insights with CCAI Platform

Customer Experience Insights (CX Insights) detects and visualizes patterns in contact center data: it runs machine learning analytics (agent and caller sentiment, entity identification, call topics) and lets you review a conversation with audio playback, transcript synchronization and analytics annotations. It can import conversations from Dialogflow CX and Agent Assist. Quality AI builds on CX Insights for quality evaluations of individual conversations, live agents, and virtual agents. This page covers setting CCAI Platform up to send call recordings and chat transcripts to CX Insights.

## Signature / Usage

### Before you begin

- Enable CX Insights on a Google Cloud project (https://docs.cloud.google.com/contact-center/insights/docs/before-you-begin). You must enable the **Speech-to-Text** API (to generate transcripts from call audio recordings) and the **Cloud Storage API** (to access stored call recordings and transcripts; you can use an existing bucket or create a new one). Google recommends creating a new Cloud Storage bucket specifically for CX Insights, with its own service account key.
- Create a Google Cloud service account and key in the project where you use CX Insights, and grant these IAM roles: Storage Admin (`roles/storage.admin`), Contact Center AI Insights editor (`roles/contactcenterinsights.editor`), Cloud Speech-to-Text Service Agent (`roles/speech.serviceAgent`).

### Configure CX Insights

1. In the CCAI Platform portal, click **Settings > Developer Settings**.
2. Go to the **Customer Experience Insights** pane, and click **Setup Insights**. The **Enable Customer Experience Insights** dialog appears.
3. Turn on **Enable Customer Experience Insights**.
4. In **Customer Experience Insights Project ID**, enter your CCAI Platform project ID. Use lowercase letters.
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
- The source says: "Google recommends creating a new Cloud Storage bucket specifically for CX Insights, with its own service account key." A dedicated bucket in the same project does not limit a project-level grant: `roles/storage.admin` granted on the project still gives the service account full control of every bucket and object in that project. To isolate it, use a dedicated Google Cloud project for CX Insights and its bucket. Granting `roles/storage.admin` on the target bucket instead of on the project would limit it to that bucket, but whether CCAI Platform and CX Insights work with a bucket-level grant is not confirmed in the official docs.
- The role names in the source are the display names Storage Admin, Contact Center AI Insights editor and Cloud Speech-to-Text Service Agent; the IAM role IDs above come from the IAM role links in the source (`storage.admin`, `contactcenterinsights.editor`, `speech.serviceAgent`). Contact Center AI Insights is the former name of Customer Experience Insights (API `contactcenterinsights`).
- Snippet taken from https://docs.cloud.google.com/contact-center/ccai-platform/docs/va-pass-data-parameters
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/conversational-insights (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-a-dialogflow-agent.md](./create-a-dialogflow-agent.md)
- [va-pass-data-parameters.md](./va-pass-data-parameters.md)
