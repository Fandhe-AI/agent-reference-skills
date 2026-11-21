---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/create-a-dialogflow-agent
---

# Integrate CCAI Platform with Dialogflow and CX Agent Studio Agents

Before you can create any virtual agent, you must create a CX Agent Studio agent or a Dialogflow agent and integrate it with CCAI Platform. This page covers Dialogflow ES and Dialogflow CX (channel-specific responses, the conversation profile in the Agent Assist console, the service account and key, the virtual agent platform, platform statuses, and partial response support) and the onboarding of Customer Experience Agent Studio (CX Agent Studio) agents, which CCAI Platform integrates with using the Dialogflow API.

## Signature / Usage

### Dialogflow platforms

- **Dialogflow ES**: only supports agent setup for Chat channels.
- **Dialogflow CX**: supports agent setup for both chat and voice channels. Interactions include advanced functions such as DTMF support, consumer barge-in, call companion, speech analysis, Customer Experience Insights, and many others.

### Channel-specific responses

CCAI Platform automatically sets the channel value when calling the Dialogflow API: voice calls have the channel set to `voice`, chat conversations to `chat`. This applies to mobile chat, web chat, and IVR, and enables channel-specific responses (see https://docs.cloud.google.com/dialogflow/cx/docs/concept/fulfillment#channel-specific).

### Create a conversation profile for Dialogflow CX agents

In the Agent Assist console (https://agentassist.cloud.google.com/):

1. Select **Conversation Profiles** from the menu.
2. In the Project drop-down list, select the project the Dialogflow CX agent was created in.
3. In the Location drop-down list, select the Google Cloud region the agent is located in.
4. Click **Create new**. The **New Conversation Profile** page is displayed.
5. Enter a name for the conversation profile. This is the name shown in the CCAI Platform Portal list of available virtual agents.
6. In the **Choose to use Dialogflow CX** section, turn **ON** the **Enable virtual agent** toggle and enter the `Dialogflow CX Agent ID` in the **Agents** field.
7. In the **Agents** field, select the virtual agent you created in Dialogflow CX.

Conversation profiles can use Dialogflow CX versions and environments (isolated spaces where you deploy different versions of the agent).

### Create a service account and key

Create the service account in the project used to set up the Dialogflow CX agent (IAM & Admin > Service Accounts > **+Create Service Account**). Enter a display name, a unique service account ID, a description, and grant access to a project. In the **Select a role** drop-down, assign the `Dialogflow API Admin` role, then click **Continue**. Create a service account key (https://docs.cloud.google.com/iam/docs/creating-managing-service-account-keys#creating). The account and key are project-specific and can be reused for multiple agents in a single project. A service key must be entered into the CCAI Platform Portal to link a Dialogflow CX virtual agent. Repeat for each Dialogflow CX agent you onboard, or create one platform with many agents.

### Add a virtual agent platform

1. Go to **Settings > Developer settings > Virtual agent platform**.
2. Click **+ Add Platform**. The **Add a virtual agent platform** dialog appears.
3. Enter a name for the new platform (consider the project name the agents were created in).
4. Select **Dialogflow ES** or **Dialogflow CX**.
5. Click **Create**.
6. Toggle the virtual agent platform to **On** in the platforms list.

Virtual agents onboarded using Dialogflow CX use the `StreamingAnalyzeContent` API, which best supports DTMF inputs and future virtual agent upgrades.

### Partial response in Dialogflow CX

CCAI Platform supports the partial response feature in Dialogflow CX: Dialogflow CX can immediately send an initial fulfillment message (such as "One moment while I look that up.") while a slow webhook runs. Dialogflow CX can also cancel playback of the partial response when the final fulfillment returns; CCAI Platform then ends the initial playback if it is still playing and starts the final fulfillment. The following is a Dialogflow CX fulfillment that plays a simulated typing sound with SSML:

```text
<speak>
  One moment while I look up your order.
  <audio src="typing-sound.mp3">
    <desc>Typing sound</desc>
    PURR (sound didn't load)
  </audio>
</speak>
```

### Onboard CX Agent Studio agents

1. Create the agent: see Agents at https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/agent.
2. Create a conversation profile: see "Connect an agent application to a new conversation profile" at https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy/ccaas#connect_an_agent_application_to_a_new_conversation_profile.
3. Create a service account and key in the Google Cloud project used to set up the CX Agent Studio agent, as above (assign the `Dialogflow API Admin` role). If you already have a service key with access to CX Agent Studio, you can skip this step. A service key must be entered into the CCAI Platform Portal to link a CX Agent Studio virtual agent. You can create multiple virtual agent platform entries with specific agents, or one platform with many agents.
4. Add a virtual agent platform as above, but select the service **Conversational Agents / CX Agent Studio**, then toggle it to **On**.

Virtual agents onboarded using CX Agent Studio use the `BidiStreamingAnalyzeContent` method, which requires bidirectional streaming (`useBidiStreaming`) to be enabled on the conversation profile.

## Notes

- Platform statuses (CCAI Platform validates service account keys by JSON structure and key validity; an agent is fully authenticated only when its key is **Valid**): **Valid** = all workflows in the platform are valid. **Needs Attention** = one or more workflows are Invalid; replace with valid keys. **Invalid** = all workflows are Invalid; the platform is automatically disabled; replace invalid keys. The same statuses apply to CX Agent Studio platforms.
- Dialogflow CX: when bidirectional streaming (`useBidiStreaming`) is enabled on a conversation profile, conversations use the `BidiStreamingAnalyzeContent` method and the conversation profile determines the language rather than the CCAI Platform queue. When a conversation uses the `StreamingAnalyzeContent` method (the default), CCAI Platform sets the language in the `StreamingAnalyzeContentRequest` message based on the queue language.
- CX Agent Studio: when a conversation uses the `BidiStreamingAnalyzeContent` method, CCAI Platform doesn't pass the queue language in the request; the conversation language is determined by the agent's language settings (make sure the conversation profile language matches).
- You can reuse the earlier service account key file, but the source recommends generating new keys to avoid expired or deactivated keys. The Google Cloud service accounts page might display multiple service accounts; verify the service account `Name` before selecting it.
- The `Dialogflow API Admin` role grants administrative access to Dialogflow resources in the project, and a service account key is a long-lived credential. Follow https://docs.cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys and https://docs.cloud.google.com/iam/docs/keys-create-delete.
- `useBidiStreaming` is a boolean field of `ConversationProfile` in the `dialogflow.v2beta1` Discovery document (`GoogleCloudDialogflowV2beta1ConversationProfile`); it is not in the `dialogflow.v2`, `v3` or `v3beta1` documents. `StreamingAnalyzeContent` and `BidiStreamingAnalyzeContent` are streaming methods that do not appear in any of these Discovery documents.
- Gemini Enterprise for Customer Experience is the product that CX Agent Studio belongs to.
- Create Dialogflow CX agents: https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent; Dialogflow ES agents: https://docs.cloud.google.com/dialogflow/es/docs/quick/build-agent.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/create-a-dialogflow-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/create-a-cx-agent-studio-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [assign-virtual-agents-to-queues.md](./assign-virtual-agents-to-queues.md)
- [virtual-agent.md](./virtual-agent.md)
